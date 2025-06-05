package com.senac.pizzademo.controller;

import com.senac.pizzademo.model.Ingredientes;
import com.senac.pizzademo.repository.IngredientesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class IngredientesControllerTest {
    private MockMvc mockMvc;

    @Mock
    private IngredientesRepository ingredientesRepository;

    @InjectMocks
    private IngredientesController ingredientesController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(ingredientesController).build();
    }

    @Test
    void testGetAllIngredientes() throws Exception {
        Ingredientes ing1 = new Ingredientes();
        ing1.setIngrediente("Queijo");
        Ingredientes ing2 = new Ingredientes();
        ing2.setIngrediente("Presunto");
        List<Ingredientes> ingredientesList = Arrays.asList(ing1, ing2);
        when(ingredientesRepository.findAll()).thenReturn(ingredientesList);

        mockMvc.perform(get("/ingredientes"))
                .andExpect(status().isOk());
        verify(ingredientesRepository, times(1)).findAll();
    }

    @Test
    void testCreateIngrediente() throws Exception {
        Ingredientes ing = new Ingredientes();
        ing.setIngrediente("Queijo");
        ing.setQuantidade("200g");
        when(ingredientesRepository.save(any(Ingredientes.class))).thenReturn(ing);

        String json = "{\"ingrediente\":\"Queijo\",\"quantidade\":\"200g\"}";
        mockMvc.perform(post("/ingredientes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
        verify(ingredientesRepository, times(1)).save(any(Ingredientes.class));
    }

    @Test
    void testCreateMultiplosIngredientes() throws Exception {
        Ingredientes ing1 = new Ingredientes();
        ing1.setIngrediente("Queijo");
        Ingredientes ing2 = new Ingredientes();
        ing2.setIngrediente("Presunto");
        List<Ingredientes> ingredientesList = Arrays.asList(ing1, ing2);
        when(ingredientesRepository.saveAll(any())).thenReturn(ingredientesList);

        String json = "[{\"ingrediente\":\"Queijo\"},{\"ingrediente\":\"Presunto\"}]";
        mockMvc.perform(post("/ingredientes/batch")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
        verify(ingredientesRepository, times(1)).saveAll(any());
    }

    @Test
    void testUpdateIngrediente() throws Exception {
        Ingredientes existing = new Ingredientes();
        existing.setIngrediente("Queijo");
        Ingredientes updated = new Ingredientes();
        updated.setIngrediente("Presunto");
        when(ingredientesRepository.findById(eq(1L))).thenReturn(Optional.of(existing));
        when(ingredientesRepository.save(any(Ingredientes.class))).thenReturn(updated);

        String json = "{\"ingrediente\":\"Presunto\"}";
        mockMvc.perform(put("/ingredientes/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
        verify(ingredientesRepository, times(1)).findById(1L);
        verify(ingredientesRepository, times(1)).save(any(Ingredientes.class));
    }

    @Test
    void testUpdateIngredienteParcial() throws Exception {
        Ingredientes existing = new Ingredientes();
        existing.setIngrediente("Queijo");
        Ingredientes updated = new Ingredientes();
        updated.setIngrediente("Presunto");
        when(ingredientesRepository.findById(eq(1L))).thenReturn(Optional.of(existing));
        when(ingredientesRepository.save(any(Ingredientes.class))).thenReturn(updated);

        String json = "{\"ingrediente\":\"Presunto\"}";
        mockMvc.perform(patch("/ingredientes/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
        verify(ingredientesRepository, times(1)).findById(1L);
        verify(ingredientesRepository, times(1)).save(any(Ingredientes.class));
    }

    @Test
    void testDeleteIngrediente() throws Exception {
        doNothing().when(ingredientesRepository).deleteById(1L);
        mockMvc.perform(delete("/ingredientes/1"))
                .andExpect(status().isOk());
        verify(ingredientesRepository, times(1)).deleteById(1L);
    }
}
