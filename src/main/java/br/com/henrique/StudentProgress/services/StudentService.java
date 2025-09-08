package br.com.henrique.StudentProgress.services;

import br.com.henrique.StudentProgress.infra.repositories.StudentRepository;
import br.com.henrique.StudentProgress.mapper.Mapper;
import br.com.henrique.StudentProgress.model.entities.Student;
import br.com.henrique.StudentProgress.transfer.DTOs.StudentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public StudentDTO getStudentById(Long id) {
        var entity = repository.findById(id).orElseThrow();//colocar exceção
        return Mapper.parseObject(entity, StudentDTO.class);
    }

    public List<StudentDTO> getAllStudents() {
        var students = repository.findAll();
        return Mapper.parseObjectsList(students, StudentDTO.class);
    }

    public StudentDTO postStudent(StudentDTO student) {
        var entity = Mapper.parseObject(student, Student.class);
        repository.save(entity);

        return Mapper.parseObject(entity, StudentDTO.class);
    }

    public StudentDTO putStudent(StudentDTO student) {
        var entity = repository.findById(student.getId()).orElseThrow(); //colocar exceção
        Mapper.mapNonNullFields(student, entity);

        repository.save(entity);
        return Mapper.parseObject(entity, StudentDTO.class);
    }

    public StudentDTO patchStudent(Long id, StudentDTO student) {
        var entity = repository.findById(id).orElseThrow(); //colocar exceção
        Mapper.mapNonNullFields(student, entity);

        repository.save(entity);
        return Mapper.parseObject(entity, StudentDTO.class);
    }

    public void deleteStudent(Long id) {
        var entity = repository.findById(id).orElseThrow(); //colocar exceção
        repository.delete(entity);
    }
}
