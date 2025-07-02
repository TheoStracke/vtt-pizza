package com.pizzaria.controller;

import com.pizzaria.model.Carrinho;
import com.pizzaria.model.ItemCarrinho;
import com.pizzaria.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrinho")
@CrossOrigin(origins = "*")
public class CarrinhoController {
    @Autowired
    private CarrinhoService carrinhoService;

    @PostMapping
    public ResponseEntity<ItemCarrinho> adicionarItem(@RequestBody ItemCarrinho item) {
        ItemCarrinho novoItem = carrinhoService.adicionarItem(item);
        return ResponseEntity.ok(novoItem);
    }

    @GetMapping("/{carrinhoId}")
    public ResponseEntity<List<ItemCarrinho>> listarItens(@PathVariable Long carrinhoId) {
        List<ItemCarrinho> itens = carrinhoService.listarItens(carrinhoId);
        return ResponseEntity.ok(itens);
    }

    // Novo endpoint: listar itens do carrinho por clienteId
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<ItemCarrinho>> listarItensPorCliente(@PathVariable Long clienteId) {
        List<ItemCarrinho> itens = carrinhoService.listarItensPorCliente(clienteId);
        return ResponseEntity.ok(itens);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removerItem(@PathVariable Long itemId) {
        carrinhoService.removerItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<ItemCarrinho> atualizarItem(@RequestBody ItemCarrinho item) {
        ItemCarrinho atualizado = carrinhoService.atualizarItem(item);
        return ResponseEntity.ok(atualizado);
    }
}
