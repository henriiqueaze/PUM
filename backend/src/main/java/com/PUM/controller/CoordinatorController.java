package com.PUM.controller;

import com.PUM.services.CoordinatorService;
import com.PUM.transfer.DTOs.CoordinatorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coordinator")
public class CoordinatorController {

    @Autowired
    private CoordinatorService service;

    @GetMapping(value = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_YAML_VALUE, MediaType.APPLICATION_XML_VALUE})
    public CoordinatorDTO getCoordinatorById(@PathVariable Long id) {
        return service.getCoordinatorById(id);
    }

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_YAML_VALUE, MediaType.APPLICATION_XML_VALUE})
    public List<CoordinatorDTO> getAllCoordinators() {
        return service.getAllCoordinators();
    }

    @PostMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_YAML_VALUE, MediaType.APPLICATION_XML_VALUE}, consumes  = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_YAML_VALUE, MediaType.APPLICATION_XML_VALUE})
    public CoordinatorDTO postCoordinator(@RequestBody CoordinatorDTO coordinator) {
        return service.postCoordinator(coordinator);
    }

    @PutMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_YAML_VALUE, MediaType.APPLICATION_XML_VALUE}, consumes  = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_YAML_VALUE, MediaType.APPLICATION_XML_VALUE})
    public CoordinatorDTO putCoordinator(@RequestBody CoordinatorDTO coordinator) {
        return service.putCoordinator(coordinator);
    }

    @PatchMapping(value = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_YAML_VALUE, MediaType.APPLICATION_XML_VALUE}, consumes  = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_YAML_VALUE, MediaType.APPLICATION_XML_VALUE})
    public CoordinatorDTO patchCoordinator(@PathVariable Long id, @RequestBody CoordinatorDTO Coordinator) {
        return service.patchCoordinator(id, Coordinator);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        service.deleteCoordinator(id);
        return ResponseEntity.noContent().build();
    }
}
