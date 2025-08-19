package com.pizzaria.dto;

import java.util.List;

public record PizzaDTO(
    Long id,
    String nome,
    String descricao,
    Double preco,
    List<String> ingredientes
) {
    public PizzaDTO {
        if (ingredientes == null) ingredientes = List.of();
    }
}
