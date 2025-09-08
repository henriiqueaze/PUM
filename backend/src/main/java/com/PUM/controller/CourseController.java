package com.PUM.controller;

import com.PUM.services.CourseService;
import com.PUM.transfer.DTOs.CourseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseService service;

    @GetMapping(value = "/{id}")
    public CourseDTO getCourseById(@PathVariable Long id) {
        return service.getCourseById(id);
    }

    @GetMapping()
    public List<CourseDTO> getAllCourses() {
        return service.getAllCourses();
    }

    @PostMapping
    public CourseDTO postCourse(@RequestBody CourseDTO course) {
        return service.postCourse(course);
    }

    @PutMapping
    public CourseDTO putCourse(@RequestBody CourseDTO course) {
        return service.putCourse(course);
    }

    @PatchMapping(value = "/{id}")
    public CourseDTO patchCourse(@PathVariable Long id, @RequestBody CourseDTO course) {
        return service.patchCourse(id, course);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        service.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
