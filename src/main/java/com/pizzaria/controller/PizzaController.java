package com.pizzaria.controller;

import com.pizzaria.dto.PizzaDTO;
import com.pizzaria.model.Pizza;
import com.pizzaria.service.PizzaService;
import com.pizzaria.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pizzas")
public class PizzaController {

    @Autowired
    private PizzaService service;

    @Autowired
    private OpenAIService openAIService;

    @GetMapping
    public List<PizzaDTO> listar() {
        return service.listar().stream()
            .map(p -> new PizzaDTO(
                p.getId(),
                p.getNome(),
                p.getDescricao(),
                p.getPreco(),
                p.getIngredientes()
            ))
            .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PizzaDTO> detalhar(@PathVariable Long id) {
        return service.buscar(id)
            .map(p -> ResponseEntity.ok(new PizzaDTO(
                p.getId(),
                p.getNome(),
                p.getDescricao(),
                p.getPreco(),
                p.getIngredientes()
            )))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PizzaDTO criar(@RequestBody PizzaDTO pizzaDTO) {
        Pizza pizza = new Pizza();
        pizza.setNome(pizzaDTO.nome());
        pizza.setPreco(pizzaDTO.preco());
        pizza.setIngredientes(pizzaDTO.ingredientes());

        // Gera descrição com IA se não vier no DTO
        if (pizzaDTO.descricao() == null || pizzaDTO.descricao().isEmpty()) {
            String ingredientesStr = pizzaDTO.ingredientes().isEmpty()
                ? "ingredientes selecionados"
                : String.join(", ", pizzaDTO.ingredientes());

            String descricaoGerada = openAIService.gerarDescricaoPizza(
                (pizzaDTO.nome() == null ? "Pizza" : pizzaDTO.nome()) + " com " + ingredientesStr
            );
            pizza.setDescricao(descricaoGerada);
        } else {
            pizza.setDescricao(pizzaDTO.descricao());
        }

        Pizza saved = service.salvar(pizza);
        return new PizzaDTO(
            saved.getId(),
            saved.getNome(),
            saved.getDescricao(),
            saved.getPreco(),
            saved.getIngredientes()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pizza> atualizar(@PathVariable Long id, @RequestBody Pizza nova) {
        return service.buscar(id).map(p -> {
            p.setNome(nova.getNome());
            p.setPreco(nova.getPreco());
            p.setIngredientes(nova.getIngredientes());

            if (nova.getDescricao() == null || nova.getDescricao().isEmpty()) {
                String ingredientesStr = (nova.getIngredientes() == null || nova.getIngredientes().isEmpty())
                    ? "ingredientes selecionados"
                    : String.join(", ", nova.getIngredientes());

                String descricaoGerada = openAIService.gerarDescricaoPizza(
                    (nova.getNome() == null ? "Pizza" : nova.getNome()) + " com " + ingredientesStr
                );
                p.setDescricao(descricaoGerada);
            } else {
                p.setDescricao(nova.getDescricao());
            }

            return ResponseEntity.ok(service.salvar(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
