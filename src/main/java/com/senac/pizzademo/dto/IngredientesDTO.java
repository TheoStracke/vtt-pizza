package com.senac.pizzademo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class IngredientesDTO {
    private Long id;

    @NotBlank(message = "O nome do ingrediente é obrigatório.")
    @Size(min = 2, max = 50, message = "O nome do ingrediente deve ter entre 2 e 50 caracteres.")
    private String ingrediente;

    @NotBlank(message = "A quantidade é obrigatória.")
    private String quantidade;

    private Long pizzaId;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getIngrediente() { return ingrediente; }
    public void setIngrediente(String ingrediente) { this.ingrediente = ingrediente; }
    public String getQuantidade() { return quantidade; }
    public void setQuantidade(String quantidade) { this.quantidade = quantidade; }
    public Long getPizzaId() { return pizzaId; }
    public void setPizzaId(Long pizzaId) { this.pizzaId = pizzaId; }
}
