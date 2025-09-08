package br.com.henrique.StudentProgress.model.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "coordinator_db")
public class Coordinator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String academicEmail;

    private String cpf;

    //coloquei aqui uma lista de cursos que o coordenador gerencia
    @OneToMany(mappedBy = "coordinator", fetch = FetchType.LAZY)
    private List<Course> courses;

    public Coordinator() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAcademicEmail() {
        return academicEmail;
    }

    public void setAcademicEmail(String academicEmail) {
        this.academicEmail = academicEmail;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}
