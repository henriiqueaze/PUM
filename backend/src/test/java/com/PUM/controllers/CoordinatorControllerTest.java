package com.PUM.controllers;

import com.PUM.services.CoordinatorService;
import com.PUM.transfer.DTOs.CoordinatorDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.PagedModel.PageMetadata;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CoordinatorController.class)
class CoordinatorControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private CoordinatorService service;

    private CoordinatorDTO dto(Long id, String name, String cpf, String email) {
        CoordinatorDTO d = new CoordinatorDTO();
        d.setId(id);
        d.setName(name);
        d.setCpf(cpf);
        d.setAcademicEmail(email);
        return d;
    }

    @Test
    void getCoordinatorById_returnsDto() throws Exception {
        when(service.getCoordinatorById(1L)).thenReturn(dto(1L, "henriquinho", "12345678900", "henriquinho@uni.edu"));

        mvc.perform(get("/coordinator/{id}", 1L).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("henriquinho"));

        verify(service).getCoordinatorById(1L);
    }

    @Test
    void getAllCoordinators_returnsPaged() throws Exception {
        CoordinatorDTO sample = dto(1L, "thiago porto", "12345678901", "thiago@uni.edu");
        EntityModel<CoordinatorDTO> em = EntityModel.of(sample);
        PageMetadata meta = new PageMetadata(12, 0, 1);
        PagedModel<EntityModel<CoordinatorDTO>> paged = PagedModel.of(List.of(em), meta);

        when(service.getAllCoordinators(any(Pageable.class))).thenReturn(paged);

        mvc.perform(get("/coordinator")
                        .param("page", "0")
                        .param("size", "12")
                        .param("direction", "asc")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("thiago porto")));

        verify(service).getAllCoordinators(any(Pageable.class));
    }

    @Test
    void postCoordinator_createsAndReturnsDto() throws Exception {
        CoordinatorDTO toCreate = dto(null, "joselucasapp", "98765432100", "joselucasapp@uni.edu");
        CoordinatorDTO created = dto(2L, "joselucasapp", "98765432100", "joselucasapp@uni.edu");

        when(service.postCoordinator(any(CoordinatorDTO.class))).thenReturn(created);

        mvc.perform(post("/coordinator")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(toCreate))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.name").value("joselucasapp"));

        verify(service).postCoordinator(any(CoordinatorDTO.class));
    }

    @Test
    void putCoordinator_updatesAndReturnsDto() throws Exception {
        CoordinatorDTO toUpdate = dto(1L, "joao bacurin", "12345678900", "joaobacurin@uni.edu");
        when(service.putCoordinator(any(CoordinatorDTO.class))).thenReturn(toUpdate);

        mvc.perform(put("/coordinator")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(toUpdate))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("joao bacurin"));

        verify(service).putCoordinator(any(CoordinatorDTO.class));
    }

    @Test
    void patchCoordinator_updatesAndReturnsDto() throws Exception {
        CoordinatorDTO partial = new CoordinatorDTO();
        partial.setName("henriquinho");

        CoordinatorDTO patched = dto(1L, "henriquinho", "12345678900", "henriquinho@uni.edu");
        when(service.patchCoordinator(eq(1L), any(CoordinatorDTO.class))).thenReturn(patched);

        mvc.perform(patch("/coordinator/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(partial))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("henriquinho"));

        verify(service).patchCoordinator(eq(1L), any(CoordinatorDTO.class));
    }

    @Test
    void deleteCoordinator_returnsNoContent() throws Exception {
        doNothing().when(service).deleteCoordinator(1L);

        mvc.perform(delete("/coordinator/{id}", 1L))
                .andExpect(status().isNoContent());

        verify(service).deleteCoordinator(1L);
    }
}
