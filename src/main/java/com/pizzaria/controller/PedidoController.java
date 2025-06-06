package com.pizzaria.controller;

import com.pizzaria.model.Pedido;
import com.pizzaria.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {
    @Autowired
    private PedidoService service;

    @PostMapping
    public Pedido criar(@RequestBody Pedido pedido) {
        return service.criar(pedido);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> detalhar(@PathVariable Long id) {
        return service.buscar(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuarios/{id}/pedidos")
    public List<Pedido> historico(@PathVariable Long id) {
        return service.historico(id);
    }
}