package com.PUM.services;

import com.PUM.controllers.CourseController;
import com.PUM.exceptions.IdNotFoundException;
import com.PUM.exceptions.MandatoryValuesNotFilledInException;
import com.PUM.infra.repositories.CourseRepository;
import com.PUM.infra.repositories.StudentRepository;
import com.PUM.mapper.Mapper;
import com.PUM.model.entities.Course;
import com.PUM.model.entities.Student;
import com.PUM.transfer.DTOs.CourseDTO;
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
public class CourseService {

    @Autowired
    private CourseRepository repository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PagedResourcesAssembler<CourseDTO> assembler;

    public CourseDTO getCourseById(Long id) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Course not found!"));

        var dto = Mapper.parseObject(entity, CourseDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    public PagedModel<EntityModel<CourseDTO>> getAllCourses(Pageable pageable) {
        var courses = repository.findAll(pageable);

        var coursesWithLinks = courses.map(course -> {
           var dto = Mapper.parseObject(course, CourseDTO.class);
           addHateoasLinks(dto);
           return dto;
        });

        Link findAllLinks = WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(CourseController.class).getAllCourses(pageable.getPageNumber(), pageable.getPageSize(), String.valueOf(pageable.getSort()))).withSelfRel();
        return assembler.toModel(coursesWithLinks, findAllLinks);
    }

    public CourseDTO postCourse(CourseDTO course) {
        validateFields(course);

        var entity = Mapper.parseObject(course, Course.class);
        repository.save(entity);

        var dto = Mapper.parseObject(entity, CourseDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    public CourseDTO putCourse(CourseDTO course) {
        validateFields(course);

        var entity = repository.findById(course.getId()).orElseThrow(() -> new IdNotFoundException("Course not found!"));
        Mapper.mapNonNullFields(course, entity);

        repository.save(entity);

        var dto = Mapper.parseObject(entity, CourseDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    public CourseDTO patchCourse(Long id, CourseDTO course) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Course not found!"));
        Mapper.mapNonNullFields(course, entity);

        repository.save(entity);

        var dto = Mapper.parseObject(entity, CourseDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    @Transactional
    public void deleteCourse(Long id) {
        var course = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Course not found!"));

        List<Student> students = studentRepository.findByCourse(course);
        for (Student student : students) {
            student.setCourse(null);
        }
        studentRepository.saveAll(students);

        if (course.getCoordinator() != null) {
            course.getCoordinator().getCourses().remove(course);
        }

        repository.delete(course);
    }

    private void validateFields(CourseDTO courseDTO) {
        if (StringUtils.isBlank(courseDTO.getName())) {
            throw new MandatoryValuesNotFilledInException("Mandatory fields not filled in!");
        }
    }

    private void addHateoasLinks(CourseDTO dto) {
        dto.add(linkTo(methodOn(CourseController.class).getCourseById(dto.getId())).withSelfRel().withType("GET"));
        dto.add(linkTo(methodOn(CourseController.class).getAllCourses(0, 12, "asc")).withRel("courses").withType("GET"));
        dto.add(linkTo(methodOn(CourseController.class).postCourse(dto)).withRel("create").withType("POST"));
        dto.add(linkTo(methodOn(CourseController.class).putCourse(dto)).withRel("update").withType("PUT"));
        dto.add(linkTo(methodOn(CourseController.class).patchCourse(dto.getId(), dto)).withRel("partialUpdate").withType("PATCH"));
        dto.add(linkTo(methodOn(CourseController.class).deleteCourse(dto.getId())).withRel("delete").withType("DELETE"));
    }
}
