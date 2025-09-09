package com.PUM.services;

import com.PUM.exceptions.IdNotFoundException;
import com.PUM.exceptions.MandatoryValuesNotFilledInException;
import com.PUM.infra.repositories.CourseRepository;
import com.PUM.infra.repositories.StudentRepository;
import com.PUM.model.entities.Course;
import com.PUM.model.entities.Student;
import com.PUM.transfer.DTOs.CourseDTO;
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
class CourseServiceTest {

    @InjectMocks
    private CourseService service;

    @Mock
    private CourseRepository repository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private PagedResourcesAssembler<CourseDTO> assembler;

    private Course makeEntity(Long id, String name) {
        Course c = new Course();
        c.setId(id);
        c.setName(name);
        return c;
    }

    private CourseDTO makeDto(Long id, String name) {
        CourseDTO d = new CourseDTO();
        d.setId(id);
        d.setName(name);
        return d;
    }

    @Test
    void getCourseById_whenExists_returnsDto() {
        Course c = makeEntity(1L, "henriquinho");
        when(repository.findById(1L)).thenReturn(Optional.of(c));

        CourseDTO dto = service.getCourseById(1L);

        assertNotNull(dto);
        assertEquals(1L, dto.getId());
        assertEquals("henriquinho", dto.getName());
        verify(repository).findById(1L);
    }

    @Test
    void getCourseById_whenNotFound_throws() {
        when(repository.findById(999L)).thenReturn(Optional.empty());
        assertThrows(IdNotFoundException.class, () -> service.getCourseById(999L));
        verify(repository).findById(999L);
    }

    @Test
    void getAllCourses_returnsPagedModel() {
        Pageable pageReq = PageRequest.of(0, 10);
        Course c = makeEntity(1L, "thiago porto");
        Page<Course> page = new PageImpl<>(List.of(c), pageReq, 1);

        when(repository.findAll(pageReq)).thenReturn(page);

        CourseDTO dto = makeDto(1L, "thiago porto");
        EntityModel<CourseDTO> em = EntityModel.of(dto);
        PagedModel<EntityModel<CourseDTO>> expected = PagedModel.of(List.of(em), new PagedModel.PageMetadata(10, 0, 1));
        when(assembler.toModel((Page<CourseDTO>) any(Page.class), (Link) any())).thenReturn(expected);

        PagedModel<EntityModel<CourseDTO>> res = service.getAllCourses(pageReq);

        assertNotNull(res);
        assertEquals(1, res.getContent().size());
        verify(repository).findAll(pageReq);
        verify(assembler).toModel((Page<CourseDTO>) any(Page.class), (Link) any());
    }

    @Test
    void postCourse_withValidDto_savesAndReturnsDto() {
        CourseDTO toSave = makeDto(null, "joselucasapp");
        Course saved = makeEntity(2L, "joselucasapp");

        when(repository.save(any(Course.class))).thenReturn(saved);

        CourseDTO res = service.postCourse(toSave);

        assertNotNull(res);
        assertEquals(2L, res.getId());
        assertEquals("joselucasapp", res.getName());
        verify(repository).save(any(Course.class));
    }

    @Test
    void postCourse_withMissingMandatory_throws() {
        CourseDTO invalid = makeDto(null, ""); // nome obrigatório em branco
        assertThrows(MandatoryValuesNotFilledInException.class, () -> service.postCourse(invalid));
        verify(repository, never()).save(any());
    }

    @Test
    void putCourse_whenExists_updatesAndReturns() {
        CourseDTO toUpdate = makeDto(1L, "joao bacurin");
        Course existing = makeEntity(1L, "OldName");

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any(Course.class))).thenAnswer(inv -> inv.getArgument(0));

        CourseDTO res = service.putCourse(toUpdate);

        assertNotNull(res);
        assertEquals(1L, res.getId());
        assertEquals("joao bacurin", res.getName());
        verify(repository).findById(1L);
        verify(repository).save(any(Course.class));
    }

    @Test
    void putCourse_whenNotFound_throws() {
        CourseDTO toUpdate = makeDto(999L, "X");
        when(repository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(IdNotFoundException.class, () -> service.putCourse(toUpdate));
        verify(repository).findById(999L);
        verify(repository, never()).save(any());
    }

    @Test
    void patchCourse_whenExists_appliesPatch() {
        CourseDTO patch = new CourseDTO();
        patch.setName("henriquinho");

        Course existing = makeEntity(1L, "Old");
        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any(Course.class))).thenAnswer(inv -> inv.getArgument(0));

        CourseDTO res = service.patchCourse(1L, patch);

        assertNotNull(res);
        assertEquals(1L, res.getId());
        assertEquals("henriquinho", res.getName());
        verify(repository).findById(1L);
        verify(repository).save(any(Course.class));
    }

    @Test
    void patchCourse_whenNotFound_throws() {
        CourseDTO patch = new CourseDTO();
        when(repository.findById(5L)).thenReturn(Optional.empty());
        assertThrows(IdNotFoundException.class, () -> service.patchCourse(5L, patch));
        verify(repository).findById(5L);
    }

    @Test
    void deleteCourse_whenExists_unlinksStudentsAndCoordinatorAndDeletes() {
        Course course = makeEntity(3L, "BD");
        Student student = new Student();
        student.setId(10L);
        student.setCourse(course);
        List<Student> students = new ArrayList<>();
        students.add(student);

        // course has a coordinator with the course in list
        com.PUM.model.entities.Coordinator coordinator = new com.PUM.model.entities.Coordinator();
        coordinator.setId(7L);
        coordinator.setCourses(new ArrayList<>(List.of(course)));
        course.setCoordinator(coordinator);

        when(repository.findById(3L)).thenReturn(Optional.of(course));
        when(studentRepository.findByCourse(course)).thenReturn(students);

        service.deleteCourse(3L);

        assertNull(student.getCourse(), "Aluno deve ficar sem curso");
        assertFalse(coordinator.getCourses().contains(course), "Curso deve ser removido da lista do coordenador");
        verify(studentRepository).saveAll(students);
        verify(repository).delete(course);
    }

    @Test
    void deleteCourse_whenNotFound_throws() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(IdNotFoundException.class, () -> service.deleteCourse(99L));
        verify(repository).findById(99L);
        verify(studentRepository, never()).findByCourse(any());
        verify(repository, never()).delete(any());
    }
}
