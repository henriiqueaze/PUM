package br.com.henrique.StudentProgress.services;

import br.com.henrique.StudentProgress.infra.repositories.CoordinatorRepository;
import br.com.henrique.StudentProgress.mapper.Mapper;
import br.com.henrique.StudentProgress.model.entities.Coordinator;
import br.com.henrique.StudentProgress.transfer.DTOs.CoordinatorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoordinatorService {

    @Autowired
    private CoordinatorRepository repository;

    public CoordinatorDTO getCoordinatorById(Long id) {
        var entity = repository.findById(id).orElseThrow();//colocar exceção
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
        var entity = repository.findById(coordinator.getId()).orElseThrow(); //colocar exceção
        Mapper.mapNonNullFields(coordinator, entity);

        repository.save(entity);
        return Mapper.parseObject(entity, CoordinatorDTO.class);
    }

    public CoordinatorDTO patchCoordinator(Long id, CoordinatorDTO coordinator) {
        var entity = repository.findById(id).orElseThrow(); //colocar exceção
        Mapper.mapNonNullFields(coordinator, entity);

        repository.save(entity);
        return Mapper.parseObject(entity, CoordinatorDTO.class);
    }

    public void deleteCoordinator(Long id) {
        var entity = repository.findById(id).orElseThrow(); //colocar exceção
        repository.delete(entity);
    }
}
