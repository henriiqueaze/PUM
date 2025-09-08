package br.com.henrique.StudentProgress.transfer.DTOs;

import br.com.henrique.StudentProgress.model.entities.Course;

public class StudentDTO {

    private Long id;

    private String name;

    private String academicEmail;

    private String registrationNumber;

    private String cpf;

    private Course course;

    public StudentDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAcademicEmail() {
        return academicEmail;
    }

    public void setAcademicEmail(String academicEmail) {
        this.academicEmail = academicEmail;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
