package com.PUM.controller;

import com.PUM.services.StudentService;
import com.PUM.transfer.DTOs.StudentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService service;

    @GetMapping(value = "/{id}")
    public StudentDTO getStudentById(@PathVariable Long id) {
        return service.getStudentById(id);
    }

    @GetMapping()
    public List<StudentDTO> getAllStudents() {
        return service.getAllStudents();
    }

    @PostMapping
    public StudentDTO postStudent(@RequestBody StudentDTO student) {
        return service.postStudent(student);
    }

    @PutMapping
    public StudentDTO putStudent(@RequestBody StudentDTO student) {
        return service.putStudent(student);
    }

    @PatchMapping(value = "/{id}")
    public StudentDTO patchStudent(@PathVariable Long id, @RequestBody StudentDTO student) {
        return service.patchStudent(id, student);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
