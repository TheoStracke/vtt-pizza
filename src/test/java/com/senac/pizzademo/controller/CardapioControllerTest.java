package com.senac.pizzademo.controller;

import com.senac.pizzademo.model.Cardapio;
import com.senac.pizzademo.repository.CardapioRepository;
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

public class CardapioControllerTest {
    private MockMvc mockMvc;

    @Mock
    private CardapioRepository cardapioRepository;

    @InjectMocks
    private CardapioController cardapioController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(cardapioController).build();
    }

    @Test
    void testGetAllCardapios() throws Exception {
        Cardapio c1 = new Cardapio();
        c1.setTamanho("Grande");
        c1.setValor(50.0f);
        Cardapio c2 = new Cardapio();
        c2.setTamanho("Média");
        c2.setValor(35.0f);
        List<Cardapio> cardapioList = Arrays.asList(c1, c2);
        when(cardapioRepository.findAll()).thenReturn(cardapioList);

        mockMvc.perform(get("/cardapio"))
                .andExpect(status().isOk());
        verify(cardapioRepository, times(1)).findAll();
    }

    @Test
    void testCreateCardapio() throws Exception {
        Cardapio c = new Cardapio();
        c.setTamanho("Grande");
        c.setValor(50.0f);
        when(cardapioRepository.save(any(Cardapio.class))).thenReturn(c);

        String json = "{\"tamanho\":\"Grande\",\"valor\":50.0}";
        mockMvc.perform(post("/cardapio")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
        verify(cardapioRepository, times(1)).save(any(Cardapio.class));
    }

    @Test
    void testCreateMultiplosCardapios() throws Exception {
        Cardapio c1 = new Cardapio();
        c1.setTamanho("Grande");
        c1.setValor(50.0f);
        Cardapio c2 = new Cardapio();
        c2.setTamanho("Média");
        c2.setValor(35.0f);
        List<Cardapio> cardapioList = Arrays.asList(c1, c2);
        when(cardapioRepository.saveAll(any())).thenReturn(cardapioList);

        String json = "[{\"tamanho\":\"Grande\",\"valor\":50.0},{\"tamanho\":\"Média\",\"valor\":35.0}]";
        mockMvc.perform(post("/cardapio/batch")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
        verify(cardapioRepository, times(1)).saveAll(any());
    }

    @Test
    void testUpdateCardapio() throws Exception {
        Cardapio existing = new Cardapio();
        existing.setTamanho("Grande");
        existing.setValor(50.0f);
        Cardapio updated = new Cardapio();
        updated.setTamanho("Média");
        updated.setValor(35.0f);
        when(cardapioRepository.findById(eq(1L))).thenReturn(Optional.of(existing));
        when(cardapioRepository.save(any(Cardapio.class))).thenReturn(updated);

        String json = "{\"tamanho\":\"Média\",\"valor\":35.0}";
        mockMvc.perform(put("/cardapio/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
        verify(cardapioRepository, times(1)).findById(1L);
        verify(cardapioRepository, times(1)).save(any(Cardapio.class));
    }

    @Test
    void testUpdateCardapioParcial() throws Exception {
        Cardapio existing = new Cardapio();
        existing.setTamanho("Grande");
        existing.setValor(50.0f);
        Cardapio updated = new Cardapio();
        updated.setTamanho("Média");
        updated.setValor(35.0f);
        when(cardapioRepository.findById(eq(1L))).thenReturn(Optional.of(existing));
        when(cardapioRepository.save(any(Cardapio.class))).thenReturn(updated);

        String json = "{\"tamanho\":\"Média\"}";
        mockMvc.perform(patch("/cardapio/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
        verify(cardapioRepository, times(1)).findById(1L);
        verify(cardapioRepository, times(1)).save(any(Cardapio.class));
    }

    @Test
    void testDeleteCardapio() throws Exception {
        doNothing().when(cardapioRepository).deleteById(1L);
        mockMvc.perform(delete("/cardapio/1"))
                .andExpect(status().isOk());
        verify(cardapioRepository, times(1)).deleteById(1L);
    }
}
