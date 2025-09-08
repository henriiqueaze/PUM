package com.PUM.services;

import com.PUM.exceptions.IdNotFoundException;
import com.PUM.infra.repositories.CoordinatorRepository;
import com.PUM.mapper.Mapper;
import com.PUM.entities.Coordinator;
import com.PUM.transfer.DTOs.CoordinatorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoordinatorService {

    @Autowired
    private CoordinatorRepository repository;

    public CoordinatorDTO getCoordinatorById(Long id) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Coordinator not found!"));
        return Mapper.parseObject(entity, CoordinatorDTO.class);
    }

    public List<CoordinatorDTO> getAllCoordinators() {
        var coordinators = repository.findAll();
        return Mapper.parseObjectsList(coordinators, CoordinatorDTO.class);
    }

    public CoordinatorDTO postCoordinator(CoordinatorDTO coordinator) {
        var entity = Mapper.parseObject(coordinator, Coordinator.class);
        repository.save(entity);

        return Mapper.parseObject(entity, CoordinatorDTO.class);
    }

    public CoordinatorDTO putCoordinator(CoordinatorDTO coordinator) {
        var entity = repository.findById(coordinator.getId()).orElseThrow(() -> new IdNotFoundException("Coordinator not found!"));
        Mapper.mapNonNullFields(coordinator, entity);

        repository.save(entity);
        return Mapper.parseObject(entity, CoordinatorDTO.class);
    }

    public CoordinatorDTO patchCoordinator(Long id, CoordinatorDTO coordinator) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Coordinator not found!"));
        Mapper.mapNonNullFields(coordinator, entity);

        repository.save(entity);
        return Mapper.parseObject(entity, CoordinatorDTO.class);
    }

    public void deleteCoordinator(Long id) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Coordinator not found!"));
        repository.delete(entity);
    }
}
