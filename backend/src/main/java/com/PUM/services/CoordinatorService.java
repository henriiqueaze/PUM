package com.PUM.services;

import com.PUM.exceptions.IdNotFoundException;
import com.PUM.exceptions.MandatoryValuesNotFilledInException;
import com.PUM.infra.repositories.CoordinatorRepository;
import com.PUM.infra.repositories.CourseRepository;
import com.PUM.mapper.Mapper;
import com.PUM.model.entities.Coordinator;
import com.PUM.model.entities.Course;
import com.PUM.transfer.DTOs.CoordinatorDTO;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoordinatorService {

    @Autowired
    private CoordinatorRepository repository;

    @Autowired
    private CourseRepository courseRepository;

    public CoordinatorDTO getCoordinatorById(Long id) {
        var entity = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Coordinator not found!"));
        return Mapper.parseObject(entity, CoordinatorDTO.class);
    }

    public List<CoordinatorDTO> getAllCoordinators() {
        var coordinators = repository.findAll();
        return Mapper.parseObjectsList(coordinators, CoordinatorDTO.class);
    }

    public CoordinatorDTO postCoordinator(CoordinatorDTO coordinator) {
        validateFields(coordinator);
        var entity = Mapper.parseObject(coordinator, Coordinator.class);
        repository.save(entity);

        return Mapper.parseObject(entity, CoordinatorDTO.class);
    }

    public CoordinatorDTO putCoordinator(CoordinatorDTO coordinator) {
        validateFields(coordinator);
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

    @Transactional
    public void deleteCoordinator(Long id) {
        Coordinator coordinator = repository.findById(id).orElseThrow(() -> new IdNotFoundException("Coordinator not found!"));

        List<Course> courses = courseRepository.findByCoordinator(coordinator);
        for (Course c : courses) {
            c.setCoordinator(null);
        }
        courseRepository.saveAll(courses);

        repository.delete(coordinator);
    }

    private void validateFields(CoordinatorDTO coordinator) {
        if (StringUtils.isBlank(coordinator.getAcademicEmail()) || StringUtils.isBlank(coordinator.getCpf()) || StringUtils.isBlank(coordinator.getName())) {
            throw new MandatoryValuesNotFilledInException("Mandatory fields not filled in!");
        }
    }
}
