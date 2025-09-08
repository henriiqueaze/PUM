package br.com.henrique.StudentProgress.transfer.DTOs;

import br.com.henrique.StudentProgress.model.entities.Coordinator;

public class CourseDTO {

    private Long id;

    private String name;

    private Coordinator coordinator;

    public CourseDTO() {
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

    public Coordinator getCoordinator() {
        return coordinator;
    }

    public void setCoordinator(Coordinator coordinator) {
        this.coordinator = coordinator;
    }
}
