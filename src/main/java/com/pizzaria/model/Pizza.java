package com.pizzaria.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Pizza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Double preco;

    @ElementCollection
    @CollectionTable(name = "pizza_ingredientes", joinColumns = @JoinColumn(name = "pizza_id"))
    @Column(name = "ingrediente")
    private List<String> ingredientes = new ArrayList<>();

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "cardapio_id") // FK para Cardapio
    private Cardapio cardapio;

    // getters e setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Double getPreco() { return preco; }
    public void setPreco(Double preco) { this.preco = preco; }

    public List<String> getIngredientes() { return ingredientes; }
    public void setIngredientes(List<String> ingredientes) { this.ingredientes = ingredientes; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Cardapio getCardapio() { return cardapio; }
    public void setCardapio(Cardapio cardapio) { this.cardapio = cardapio; }
}
