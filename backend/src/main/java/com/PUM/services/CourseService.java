package com.PUM.services;

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
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository repository;

    @Autowired
    private StudentRepository studentRepository;

    public CourseDTO getCourseById(Long id) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Course not found!"));
        return Mapper.parseObject(entity, CourseDTO.class);
    }

    public List<CourseDTO> getAllCourses() {
        var courses = repository.findAll();
        return Mapper.parseObjectsList(courses, CourseDTO.class);
    }

    public CourseDTO postCourse(CourseDTO course) {
        validateFields(course);
        var entity = Mapper.parseObject(course, Course.class);
        repository.save(entity);

        return Mapper.parseObject(entity, CourseDTO.class);
    }

    public CourseDTO putCourse(CourseDTO course) {
        validateFields(course);
        var entity = repository.findById(course.getId()).orElseThrow(() -> new IdNotFoundException("Course not found!"));
        Mapper.mapNonNullFields(course, entity);

        repository.save(entity);
        return Mapper.parseObject(entity, CourseDTO.class);
    }

    public CourseDTO patchCourse(Long id, CourseDTO course) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Course not found!"));
        Mapper.mapNonNullFields(course, entity);

        repository.save(entity);
        return Mapper.parseObject(entity, CourseDTO.class);
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
}
