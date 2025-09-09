package com.PUM.services;

import com.PUM.controllers.CoordinatorController;
import com.PUM.exceptions.IdNotFoundException;
import com.PUM.exceptions.MandatoryValuesNotFilledInException;
import com.PUM.infra.repositories.CoordinatorRepository;
import com.PUM.infra.repositories.CourseRepository;
import com.PUM.mapper.Mapper;
import com.PUM.model.entities.Coordinator;
import com.PUM.model.entities.Course;
import com.PUM.transfer.DTOs.CoordinatorDTO;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Service;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;

@Service
public class CoordinatorService {

    @Autowired
    private CoordinatorRepository repository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private PagedResourcesAssembler<CoordinatorDTO> assembler;

    public CoordinatorDTO getCoordinatorById(Long id) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Coordinator not found!"));

        var dto = Mapper.parseObject(entity, CoordinatorDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    public PagedModel<EntityModel<CoordinatorDTO>> getAllCoordinators(Pageable pageable) {
        var coordinators = repository.findAll(pageable);

        var coordinatorsWithLinks = coordinators.map(coordinator -> {
           var dto = Mapper.parseObject(coordinator, CoordinatorDTO.class);
           addHateoasLinks(dto);
           return dto;
        });

        Link findAllLinks = WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(CoordinatorController.class).getAllCoordinators(pageable.getPageNumber(), pageable.getPageSize(), String.valueOf(pageable.getSort()))).withSelfRel();
        return assembler.toModel(coordinatorsWithLinks, findAllLinks);
    }

    public CoordinatorDTO postCoordinator(CoordinatorDTO coordinator) {
        validateFields(coordinator);

        var entity = Mapper.parseObject(coordinator, Coordinator.class);
        repository.save(entity);

        var dto = Mapper.parseObject(entity, CoordinatorDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    public CoordinatorDTO putCoordinator(CoordinatorDTO coordinator) {
        validateFields(coordinator);

        var entity = repository.findById(coordinator.getId()).orElseThrow(() -> new IdNotFoundException("Coordinator not found!"));
        Mapper.mapNonNullFields(coordinator, entity);
        repository.save(entity);

        var dto = Mapper.parseObject(entity, CoordinatorDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    public CoordinatorDTO patchCoordinator(Long id, CoordinatorDTO coordinator) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Coordinator not found!"));
        Mapper.mapNonNullFields(coordinator, entity);

        repository.save(entity);

        var dto = Mapper.parseObject(entity, CoordinatorDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    @Transactional
    public void deleteCoordinator(Long id) {
        Coordinator coordinator = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Coordinator not found!"));

        List<Course> courses = courseRepository.findByCoordinator(coordinator);
        for (Course c : courses) {
            c.setCoordinator(null);
        }
        courseRepository.saveAll(courses);

        repository.delete(coordinator);
    }

    private void validateFields(CoordinatorDTO coordinator) {
        if (StringUtils.isBlank(coordinator.getAcademicEmail()) || StringUtils.isBlank(coordinator.getCpf()) || StringUtils.isBlank(coordinator.getName())) {
            throw new MandatoryValuesNotFilledInException("Mandatory fields not filled in!");
        }
    }

    private void addHateoasLinks(CoordinatorDTO dto) {
        dto.add(linkTo(methodOn(CoordinatorController.class).getCoordinatorById(dto.getId())).withSelfRel().withType("GET"));
        dto.add(linkTo(methodOn(CoordinatorController.class).getAllCoordinators(0, 12, "asc")).withRel("coordinators").withType("GET"));
        dto.add(linkTo(methodOn(CoordinatorController.class).postCoordinator(dto)).withRel("create").withType("POST"));
        dto.add(linkTo(methodOn(CoordinatorController.class).putCoordinator(dto)).withRel("update").withType("PUT"));
        dto.add(linkTo(methodOn(CoordinatorController.class).patchCoordinator(dto.getId(), dto)).withRel("partialUpdate").withType("PATCH"));
        dto.add(linkTo(methodOn(CoordinatorController.class).deleteCoordinator(dto.getId())).withRel("delete").withType("DELETE"));
    }
}
