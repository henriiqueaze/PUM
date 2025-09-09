package com.PUM.controllers;

import com.PUM.services.CourseService;
import com.PUM.transfer.DTOs.CourseDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.PagedModel.PageMetadata;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CourseController.class)
class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private CourseService service;

    private CourseDTO dto(Long id, String name) {
        CourseDTO d = new CourseDTO();
        d.setId(id);
        d.setName(name);
        return d;
    }

    @Test
    void getCourseById_returnsDto() throws Exception {
        when(service.getCourseById(1L)).thenReturn(dto(1L, "henriquinho"));

        mockMvc.perform(get("/course/{id}", 1L).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("henriquinho"));

        verify(service).getCourseById(1L);
    }

    @Test
    void getAllCourses_returnsPaged() throws Exception {
        CourseDTO sample = dto(1L, "thiago porto");
        EntityModel<CourseDTO> em = EntityModel.of(sample);
        PageMetadata meta = new PageMetadata(12, 0, 1);
        PagedModel<EntityModel<CourseDTO>> paged = PagedModel.of(List.of(em), meta);

        when(service.getAllCourses(any(Pageable.class))).thenReturn(paged);

        mockMvc.perform(get("/course")
                        .param("page", "0")
                        .param("size", "12")
                        .param("direction", "asc")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("thiago porto")));

        verify(service).getAllCourses(any(Pageable.class));
    }

    @Test
    void postCourse_createsAndReturnsDto() throws Exception {
        CourseDTO toCreate = dto(null, "joselucasapp");
        CourseDTO created = dto(2L, "joselucasapp");

        when(service.postCourse(any(CourseDTO.class))).thenReturn(created);

        mockMvc.perform(post("/course")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(toCreate))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.name").value("joselucasapp"));

        verify(service).postCourse(any(CourseDTO.class));
    }

    @Test
    void putCourse_updatesAndReturnsDto() throws Exception {
        CourseDTO toUpdate = dto(1L, "joao bacurin");
        when(service.putCourse(any(CourseDTO.class))).thenReturn(toUpdate);

        mockMvc.perform(put("/course")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(toUpdate))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("joao bacurin"));

        verify(service).putCourse(any(CourseDTO.class));
    }

    @Test
    void patchCourse_updatesAndReturnsDto() throws Exception {
        CourseDTO partial = new CourseDTO();
        partial.setName("henriquinho");

        CourseDTO patched = dto(1L, "henriquinho");
        when(service.patchCourse(eq(1L), any(CourseDTO.class))).thenReturn(patched);

        mockMvc.perform(patch("/course/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(partial))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("henriquinho"));

        verify(service).patchCourse(eq(1L), any(CourseDTO.class));
    }

    @Test
    void deleteCourse_returnsNoContent() throws Exception {
        doNothing().when(service).deleteCourse(1L);

        mockMvc.perform(delete("/course/{id}", 1L))
                .andExpect(status().isNoContent());

        verify(service).deleteCourse(1L);
    }
}
