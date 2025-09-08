package com.PUM.services;

import com.PUM.exceptions.IdNotFoundException;
import com.PUM.exceptions.MandatoryValuesNotFilledInException;
import com.PUM.infra.repositories.StudentRepository;
import com.PUM.mapper.Mapper;
import com.PUM.model.entities.Student;
import com.PUM.transfer.DTOs.StudentDTO;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public StudentDTO getStudentById(Long id) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Student not found!"));
        return Mapper.parseObject(entity, StudentDTO.class);
    }

    public List<StudentDTO> getAllStudents() {
        var students = repository.findAll();
        return Mapper.parseObjectsList(students, StudentDTO.class);
    }

    public StudentDTO postStudent(StudentDTO student) {
        validateFields(student);

        var entity = Mapper.parseObject(student, Student.class);
        repository.save(entity);

        return Mapper.parseObject(entity, StudentDTO.class);
    }

    public StudentDTO putStudent(StudentDTO student) {
        validateFields(student);

        var entity = repository.findById(student.getId()).orElseThrow(() -> new IdNotFoundException("Student not found!"));
        Mapper.mapNonNullFields(student, entity);

        repository.save(entity);
        return Mapper.parseObject(entity, StudentDTO.class);
    }

    public StudentDTO patchStudent(Long id, StudentDTO student) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Student not found!"));
        Mapper.mapNonNullFields(student, entity);

        repository.save(entity);
        return Mapper.parseObject(entity, StudentDTO.class);
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
}
