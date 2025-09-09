package com.PUM.services;

import com.PUM.exceptions.IdNotFoundException;
import com.PUM.exceptions.MandatoryValuesNotFilledInException;
import com.PUM.infra.repositories.StudentRepository;
import com.PUM.model.entities.Course;
import com.PUM.model.entities.Student;
import com.PUM.transfer.DTOs.StudentDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.data.domain.*;
import org.springframework.hateoas.*;
import org.springframework.data.web.PagedResourcesAssembler;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class StudentServiceTest {

    @InjectMocks
    private StudentService service;

    @Mock
    private StudentRepository repository;

    @Mock
    private PagedResourcesAssembler<StudentDTO> assembler;

    private Student makeEntity(Long id, String name, String cpf, String email, String reg) {
        Student s = new Student();
        s.setId(id);
        s.setName(name);
        s.setCpf(cpf);
        s.setAcademicEmail(email);
        s.setRegistrationNumber(reg);
        return s;
    }

    private StudentDTO makeDto(Long id, String name, String cpf, String email, String reg) {
        StudentDTO d = new StudentDTO();
        d.setId(id);
        d.setName(name);
        d.setCpf(cpf);
        d.setAcademicEmail(email);
        d.setRegistrationNumber(reg);
        return d;
    }

    @Test
    void getStudentById_whenExists_returnsDto() {
        Student entity = makeEntity(1L, "henrique", "12345678900", "henrique@uni.edu", "2025001");
        when(repository.findById(1L)).thenReturn(Optional.of(entity));

        StudentDTO dto = service.getStudentById(1L);

        assertNotNull(dto);
        assertEquals(1L, dto.getId());
        assertEquals("henrique", dto.getName());
        verify(repository).findById(1L);
    }

    @Test
    void getStudentById_whenNotFound_throws() {
        when(repository.findById(999L)).thenReturn(Optional.empty());
        assertThrows(IdNotFoundException.class, () -> service.getStudentById(999L));
        verify(repository).findById(999L);
    }

    @Test
    void getAllStudents_returnsPagedModel() {
        Pageable pageReq = PageRequest.of(0, 10);
        Student entity = makeEntity(1L, "thiago porto", "11122233344", "thiago@uni.edu", "2025001");
        Page<Student> page = new PageImpl<>(List.of(entity), pageReq, 1);

        when(repository.findAll(pageReq)).thenReturn(page);

        StudentDTO dto = makeDto(1L, "thiago porto", "11122233344", "thiago@uni.edu", "2025001");
        EntityModel<StudentDTO> em = EntityModel.of(dto);
        PagedModel<EntityModel<StudentDTO>> expected = PagedModel.of(List.of(em), new PagedModel.PageMetadata(10, 0, 1));
        when(assembler.toModel((Page<StudentDTO>) any(Page.class), (Link) any())).thenReturn(expected);

        PagedModel<EntityModel<StudentDTO>> res = service.getAllStudents(pageReq);

        assertNotNull(res);
        assertEquals(1, res.getContent().size());
        verify(repository).findAll(pageReq);
        verify(assembler).toModel((Page<StudentDTO>) any(Page.class), (Link) any());
    }

    @Test
    void postStudent_withValidDto_savesAndReturnsDto() {
        StudentDTO toSave = makeDto(null, "joselucasapp", "98765432100", "joselucasapp@uni.edu", "2025002");
        Student saved = makeEntity(2L, "joselucasapp", "98765432100", "joselucasapp@uni.edu", "2025002");

        when(repository.save(any(Student.class))).thenReturn(saved);

        StudentDTO res = service.postStudent(toSave);

        assertNotNull(res);
        assertEquals(2L, res.getId());
        assertEquals("joselucasapp", res.getName());
        verify(repository).save(any(Student.class));
    }

    @Test
    void postStudent_withMissingMandatory_throws() {
        StudentDTO invalid = makeDto(null, "", "00011122233", "x@x.com", "2025003"); // name blank
        assertThrows(MandatoryValuesNotFilledInException.class, () -> service.postStudent(invalid));
        verify(repository, never()).save(any());
    }

    @Test
    void putStudent_whenExists_updatesAndReturns() {
        StudentDTO toUpdate = makeDto(1L, "joao bacurin", "12345678900", "joaobacurin@uni.edu", "2025001");
        Student existing = makeEntity(1L, "Ana", "12345678900", "ana@uni.edu", "2025001");

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any(Student.class))).thenAnswer(inv -> inv.getArgument(0));

        StudentDTO res = service.putStudent(toUpdate);

        assertNotNull(res);
        assertEquals(1L, res.getId());
        assertEquals("joao bacurin", res.getName());
        verify(repository).findById(1L);
        verify(repository).save(any(Student.class));
    }

    @Test
    void putStudent_whenNotFound_throws() {
        StudentDTO toUpdate = makeDto(999L, "X", "000", "x@x.com", "0000");
        when(repository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(IdNotFoundException.class, () -> service.putStudent(toUpdate));
        verify(repository).findById(999L);
        verify(repository, never()).save(any());
    }

    @Test
    void patchStudent_whenExists_appliesPatch() {
        StudentDTO patch = new StudentDTO();
        patch.setName("henriquinho");

        Student existing = makeEntity(1L, "OldName", "00011122233", "old@uni.edu", "2022001");
        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any(Student.class))).thenAnswer(inv -> inv.getArgument(0));

        StudentDTO res = service.patchStudent(1L, patch);

        assertNotNull(res);
        assertEquals(1L, res.getId());
        assertEquals("henriquinho", res.getName());
        verify(repository).findById(1L);
        verify(repository).save(any(Student.class));
    }

    @Test
    void patchStudent_whenNotFound_throws() {
        StudentDTO patch = new StudentDTO();
        when(repository.findById(5L)).thenReturn(Optional.empty());
        assertThrows(IdNotFoundException.class, () -> service.patchStudent(5L, patch));
        verify(repository).findById(5L);
    }

    @Test
    void deleteStudent_whenExists_unlinksCourseAndDeletes() {
        Student student = makeEntity(3L, "Carlos", "22233344455", "carlos@uni.edu", "2025004");
        Course course = new Course();
        course.setId(20L);
        student.setCourse(course);

        when(repository.findById(3L)).thenReturn(Optional.of(student));

        service.deleteStudent(3L);

        assertNull(student.getCourse());
        verify(repository).save(student);
        verify(repository).delete(student);
    }

    @Test
    void deleteStudent_whenNotFound_throws() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(IdNotFoundException.class, () -> service.deleteStudent(99L));
        verify(repository).findById(99L);
        verify(repository, never()).save(any());
        verify(repository, never()).delete(any());
    }
}
