package com.pizzaria.controller;

import com.pizzaria.model.Pizza;
import com.pizzaria.service.OpenAIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ia")
public class IADescriptionController {

    private final OpenAIService openAIService;

    public IADescriptionController(OpenAIService openAIService) {
        this.openAIService = openAIService;
    }

    @PostMapping("/gerar-descricao")
    public ResponseEntity<String> gerarDescricao(@RequestBody Pizza pizza) {
        String descricao = openAIService.gerarDescricaoPizza(String.join(", ", pizza.getIngredientes()));
        return ResponseEntity.ok(descricao);
    }
}