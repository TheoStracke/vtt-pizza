package com.pizzaria.service;

import com.pizzaria.model.Carrinho;
import com.pizzaria.model.ItemCarrinho;
import com.pizzaria.repository.CarrinhoRepository;
import com.pizzaria.repository.ItemCarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarrinhoService {
    @Autowired
    private CarrinhoRepository carrinhoRepository;
    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;

    public Carrinho salvar(Carrinho carrinho) {
        return carrinhoRepository.save(carrinho);
    }

    public List<ItemCarrinho> listarItens(Long carrinhoId) {
        Optional<Carrinho> carrinho = carrinhoRepository.findById(carrinhoId);
        return carrinho.map(Carrinho::getItens).orElse(null);
    }

    public void removerItem(Long itemId) {
        itemCarrinhoRepository.deleteById(itemId);
    }

    public ItemCarrinho atualizarItem(ItemCarrinho item) {
        return itemCarrinhoRepository.save(item);
    }

    public ItemCarrinho adicionarItem(ItemCarrinho item) {
        return itemCarrinhoRepository.save(item);
    }
}
