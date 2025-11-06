package com.PUM.transfer.DTOs;

import com.PUM.model.entities.Coordinator;
import org.springframework.hateoas.RepresentationModel;

public class CourseDTO extends RepresentationModel<CourseDTO> {

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
