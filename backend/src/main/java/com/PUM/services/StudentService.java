package com.PUM.services;

import com.PUM.controllers.StudentController;
import com.PUM.exceptions.IdNotFoundException;
import com.PUM.exceptions.MandatoryValuesNotFilledInException;
import com.PUM.infra.repositories.StudentRepository;
import com.PUM.mapper.Mapper;
import com.PUM.model.entities.Student;
import com.PUM.transfer.DTOs.StudentDTO;
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

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    @Autowired
    private PagedResourcesAssembler<StudentDTO> assembler;

    public StudentDTO getStudentById(Long id) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Student not found!"));

        var dto = Mapper.parseObject(entity, StudentDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    public PagedModel<EntityModel<StudentDTO>> getAllStudents(Pageable pageable) {
        var students = repository.findAll(pageable);

        var studentsWithLinks = students.map(student -> {
           var dto = Mapper.parseObject(student, StudentDTO.class);
           addHateoasLinks(dto);
           return dto;
        });

        Link findAllLinks = WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(StudentController.class).getAllStudents(pageable.getPageNumber(), pageable.getPageSize(), String.valueOf(pageable.getSort()))).withSelfRel();
        return assembler.toModel(studentsWithLinks, findAllLinks);
    }

    public StudentDTO postStudent(StudentDTO student) {
        validateFields(student);

        var entity = Mapper.parseObject(student, Student.class);
        repository.save(entity);

        var dto = Mapper.parseObject(entity, StudentDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    public StudentDTO putStudent(StudentDTO student) {
        validateFields(student);

        var entity = repository.findById(student.getId()).orElseThrow(() -> new IdNotFoundException("Student not found!"));
        Mapper.mapNonNullFields(student, entity);
        repository.save(entity);

        var dto = Mapper.parseObject(entity, StudentDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    public StudentDTO patchStudent(Long id, StudentDTO student) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Student not found!"));
        Mapper.mapNonNullFields(student, entity);

        repository.save(entity);

        var dto = Mapper.parseObject(entity, StudentDTO.class);
        addHateoasLinks(dto);
        return dto;
    }

    @Transactional
    public void deleteStudent(Long id) {
        Student student = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Student not found!"));

        student.setCourse(null);
        repository.save(student);

        repository.delete(student);
    }

    private void validateFields(StudentDTO studentDTO) {
        if (StringUtils.isBlank(studentDTO.getName()) || StringUtils.isBlank(studentDTO.getAcademicEmail()) || StringUtils.isBlank(studentDTO.getCpf()) || StringUtils.isBlank(studentDTO.getRegistrationNumber())) {
            throw new MandatoryValuesNotFilledInException("Mandatory fields not filled in!");
        }
    }

    private void addHateoasLinks(StudentDTO dto) {
        dto.add(linkTo(methodOn(StudentController.class).getStudentById(dto.getId())).withSelfRel().withType("GET"));
        dto.add(linkTo(methodOn(StudentController.class).getAllStudents(0, 12, "asc")).withRel("students").withType("GET"));
        dto.add(linkTo(methodOn(StudentController.class).postStudent(dto)).withRel("create").withType("POST"));
        dto.add(linkTo(methodOn(StudentController.class).putStudent(dto)).withRel("update").withType("PUT"));
        dto.add(linkTo(methodOn(StudentController.class).patchStudent(dto.getId(), dto)).withRel("partialUpdate").withType("PATCH"));
        dto.add(linkTo(methodOn(StudentController.class).deleteStudent(dto.getId())).withRel("delete").withType("DELETE"));
    }
}
