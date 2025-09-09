package com.PUM.services;

import com.PUM.exceptions.IdNotFoundException;
import com.PUM.exceptions.MandatoryValuesNotFilledInException;
import com.PUM.infra.repositories.CoordinatorRepository;
import com.PUM.infra.repositories.CourseRepository;
import com.PUM.model.entities.Coordinator;
import com.PUM.model.entities.Course;
import com.PUM.transfer.DTOs.CoordinatorDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.data.domain.*;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.data.web.PagedResourcesAssembler;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class CoordinatorServiceTest {

    @InjectMocks
    private CoordinatorService service;

    @Mock
    private CoordinatorRepository repository;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private PagedResourcesAssembler<CoordinatorDTO> assembler;

    private Coordinator makeEntity(Long id, String name, String cpf, String email) {
        Coordinator c = new Coordinator();
        c.setId(id);
        c.setName(name);
        c.setCpf(cpf);
        c.setAcademicEmail(email);
        return c;
    }

    private CoordinatorDTO makeDto(Long id, String name, String cpf, String email) {
        CoordinatorDTO d = new CoordinatorDTO();
        d.setId(id);
        d.setName(name);
        d.setCpf(cpf);
        d.setAcademicEmail(email);
        return d;
    }

    @Test
    void getCoordinatorById_whenExists_returnsDto() {
        Coordinator entity = makeEntity(1L, "henriquinho", "12345678900", "henriquinho@uni.edu");
        when(repository.findById(1L)).thenReturn(Optional.of(entity));

        CoordinatorDTO dto = service.getCoordinatorById(1L);

        assertNotNull(dto);
        assertEquals(1L, dto.getId());
        assertEquals("henriquinho", dto.getName());
        verify(repository).findById(1L);
    }

    @Test
    void getCoordinatorById_whenNotFound_throws() {
        when(repository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(IdNotFoundException.class, () -> service.getCoordinatorById(999L));
        verify(repository).findById(999L);
    }

    @Test
    void getAllCoordinators_returnsPagedModel() {
        Pageable pageReq = PageRequest.of(0, 10);
        Coordinator entity = makeEntity(1L, "thiago porto", "11122233344", "thiago@uni.edu");
        Page<Coordinator> page = new PageImpl<>(List.of(entity), pageReq, 1);

        when(repository.findAll(pageReq)).thenReturn(page);

        CoordinatorDTO dto = makeDto(1L, "thiago porto", "11122233344", "thiago@uni.edu");
        EntityModel<CoordinatorDTO> em = EntityModel.of(dto);
        PagedModel<EntityModel<CoordinatorDTO>> expected = PagedModel.of(List.of(em), new PagedModel.PageMetadata(10, 0, 1));

        when(assembler.toModel((Page<CoordinatorDTO>) any(Page.class), (Link) any())).thenReturn(expected);

        PagedModel<EntityModel<CoordinatorDTO>> res = service.getAllCoordinators(pageReq);

        assertNotNull(res);
        assertEquals(1, res.getContent().size());
        verify(repository).findAll(pageReq);
        verify(assembler).toModel((Page<CoordinatorDTO>) any(Page.class), (Link) any());
    }

    @Test
    void postCoordinator_withValidDto_savesAndReturnsDto() {
        CoordinatorDTO toSave = makeDto(null, "joselucasapp", "98765432100", "joselucasapp@uni.edu");
        Coordinator saved = makeEntity(2L, "joselucasapp", "98765432100", "joselucasapp@uni.edu");

        when(repository.save(any(Coordinator.class))).thenReturn(saved);

        CoordinatorDTO result = service.postCoordinator(toSave);

        assertNotNull(result);
        assertEquals(2L, result.getId());
        assertEquals("joselucasapp", result.getName());
        verify(repository).save(any(Coordinator.class));
    }

    @Test
    void postCoordinator_withMissingMandatory_throws() {
        CoordinatorDTO invalid = makeDto(null, "", "11122233344", "a@b.com"); // name blank

        assertThrows(MandatoryValuesNotFilledInException.class, () -> service.postCoordinator(invalid));
        verify(repository, never()).save(any());
    }

    @Test
    void putCoordinator_whenExists_updatesAndReturns() {
        CoordinatorDTO toUpdate = makeDto(1L, "joao bacurin", "12345678900", "joaobacurin@uni.edu");
        Coordinator existing = makeEntity(1L, "Old", "12345678900", "old@uni.edu");

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any(Coordinator.class))).thenAnswer(inv -> inv.getArgument(0));

        CoordinatorDTO res = service.putCoordinator(toUpdate);

        assertNotNull(res);
        assertEquals(1L, res.getId());
        assertEquals("joao bacurin", res.getName());
        verify(repository).findById(1L);
        verify(repository).save(any(Coordinator.class));
    }

    @Test
    void putCoordinator_whenNotFound_throws() {
        CoordinatorDTO toUpdate = makeDto(999L, "X", "000", "x@x.com");
        when(repository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(IdNotFoundException.class, () -> service.putCoordinator(toUpdate));
        verify(repository).findById(999L);
        verify(repository, never()).save(any());
    }

    @Test
    void patchCoordinator_whenExists_appliesPatch() {
        CoordinatorDTO patch = new CoordinatorDTO();
        patch.setName("henriquinho");

        Coordinator existing = makeEntity(1L, "OldName", "00011122233", "old@uni.edu");
        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any(Coordinator.class))).thenAnswer(inv -> inv.getArgument(0));

        CoordinatorDTO res = service.patchCoordinator(1L, patch);

        assertNotNull(res);
        assertEquals(1L, res.getId());
        assertEquals("henriquinho", res.getName());
        verify(repository).findById(1L);
        verify(repository).save(any(Coordinator.class));
    }

    @Test
    void patchCoordinator_whenNotFound_throws() {
        CoordinatorDTO patch = new CoordinatorDTO();
        when(repository.findById(5L)).thenReturn(Optional.empty());

        assertThrows(IdNotFoundException.class, () -> service.patchCoordinator(5L, patch));
        verify(repository).findById(5L);
    }

    @Test
    void deleteCoordinator_whenExists_unlinksCoursesAndDeletes() {
        Coordinator coordinator = makeEntity(3L, "joao bacurin", "000", "joao@uni.edu");
        Course course = new Course();
        course.setId(10L);
        course.setCoordinator(coordinator);
        List<Course> courses = List.of(course);

        when(repository.findById(3L)).thenReturn(Optional.of(coordinator));
        when(courseRepository.findByCoordinator(coordinator)).thenReturn(courses);

        service.deleteCoordinator(3L);

        assertNull(course.getCoordinator());
        verify(courseRepository).saveAll(courses);
        verify(repository).delete(coordinator);
    }

    @Test
    void deleteCoordinator_whenNotFound_throws() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(IdNotFoundException.class, () -> service.deleteCoordinator(99L));
        verify(repository).findById(99L);
        verify(courseRepository, never()).findByCoordinator(any());
        verify(repository, never()).delete(any());
    }
}
