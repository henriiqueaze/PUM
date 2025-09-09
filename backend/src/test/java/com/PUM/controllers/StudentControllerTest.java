package com.PUM.controllers;

import com.PUM.services.StudentService;
import com.PUM.transfer.DTOs.StudentDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StudentController.class)
class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private StudentService service;

    private StudentDTO dto(Long id, String name, String email, String cpf, String reg) {
        StudentDTO s = new StudentDTO();
        s.setId(id);
        s.setName(name);
        s.setAcademicEmail(email);
        s.setCpf(cpf);
        s.setRegistrationNumber(reg);
        return s;
    }

    @Test
    void getStudentById_returnsDto() throws Exception {
        when(service.getStudentById(1L)).thenReturn(dto(1L, "henrique", "henrique@pum.edu", "12345678900", "2025001"));

        mockMvc.perform(get("/student/{id}", 1L).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("henrique"));

        verify(service).getStudentById(1L);
    }

    @Test
    void getAllStudents_returnsPaged() throws Exception {
        StudentDTO sample = dto(1L, "thiago porto", "thiago@pum.edu", "11122233344", "2025001");
        EntityModel<StudentDTO> em = EntityModel.of(sample);
        PageMetadata meta = new PageMetadata(12, 0, 1);
        PagedModel<EntityModel<StudentDTO>> paged = PagedModel.of(List.of(em), meta);

        when(service.getAllStudents(any(Pageable.class))).thenReturn(paged);

        mockMvc.perform(get("/student")
                        .param("page", "0")
                        .param("size", "12")
                        .param("direction", "asc")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("thiago porto")));

        verify(service).getAllStudents(any(Pageable.class));
    }

    @Test
    void postStudent_createsAndReturnsDto() throws Exception {
        StudentDTO toCreate = dto(null, "joselucasapp", "joselucasapp@pum.edu", "98765432100", "2025002");
        StudentDTO created = dto(2L, "joselucasapp", "joselucasapp@pum.edu", "98765432100", "2025002");

        when(service.postStudent(any(StudentDTO.class))).thenReturn(created);

        mockMvc.perform(post("/student")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(toCreate))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.name").value("joselucasapp"));

        verify(service).postStudent(any(StudentDTO.class));
    }

    @Test
    void putStudent_updatesAndReturnsDto() throws Exception {
        StudentDTO toUpdate = dto(1L, "joao bacurin", "joaobacurin@pum.edu", "12345678900", "2025001");
        when(service.putStudent(any(StudentDTO.class))).thenReturn(toUpdate);

        mockMvc.perform(put("/student")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(toUpdate))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("joao bacurin"));

        verify(service).putStudent(any(StudentDTO.class));
    }

    @Test
    void patchStudent_updatesAndReturnsDto() throws Exception {
        StudentDTO partial = new StudentDTO();
        partial.setName("henriquinho");

        StudentDTO patched = dto(1L, "henriquinho", "henrique@pum.edu", "12345678900", "2025001");
        when(service.patchStudent(eq(1L), any(StudentDTO.class))).thenReturn(patched);

        mockMvc.perform(patch("/student/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(partial))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("henriquinho"));

        verify(service).patchStudent(eq(1L), any(StudentDTO.class));
    }

    @Test
    void deleteStudent_returnsNoContent() throws Exception {
        doNothing().when(service).deleteStudent(1L);

        mockMvc.perform(delete("/student/{id}", 1L))
                .andExpect(status().isNoContent());

        verify(service).deleteStudent(1L);
    }
}
