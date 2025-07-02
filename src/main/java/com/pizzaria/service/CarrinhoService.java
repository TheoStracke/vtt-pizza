package com.pizzaria.service;

import com.pizzaria.model.Carrinho;
import com.pizzaria.model.Cliente;
import com.pizzaria.model.ItemCarrinho;
import com.pizzaria.model.Pizza;
import com.pizzaria.repository.CarrinhoRepository;
import com.pizzaria.repository.ClienteRepository;
import com.pizzaria.repository.ItemCarrinhoRepository;
import com.pizzaria.repository.PizzaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CarrinhoService {
    @Autowired
    private CarrinhoRepository carrinhoRepository;
    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private PizzaRepository pizzaRepository;

    public Carrinho salvar(Carrinho carrinho) {
        return carrinhoRepository.save(carrinho);
    }

    public List<ItemCarrinho> listarItens(Long carrinhoId) {
        Optional<Carrinho> carrinho = carrinhoRepository.findById(carrinhoId);
        return carrinho.map(Carrinho::getItens).orElse(null);
    }

    // Novo método para listar itens do carrinho por clienteId
    public List<ItemCarrinho> listarItensPorCliente(Long clienteId) {
        Carrinho carrinho = carrinhoRepository.findByClienteId(clienteId).orElse(null);
        if (carrinho == null) return List.of();
        // Garante que os itens estão carregados (evita LazyInitializationException)
        if (carrinho.getItens() == null) return List.of();
        return carrinho.getItens().stream().filter(ic -> ic.getQuantidade() > 0).toList();
    }

    public void removerItem(Long itemId) {
        itemCarrinhoRepository.deleteById(itemId);
    }

    public ItemCarrinho atualizarItem(ItemCarrinho item) {
        return itemCarrinhoRepository.save(item);
    }

    @Transactional
    public ItemCarrinho adicionarItem(ItemCarrinho item) {
        // Busca cliente e pizza
        Cliente cliente = null;
        if (item.getCarrinho() != null && item.getCarrinho().getCliente() != null) {
            cliente = clienteRepository.findById(item.getCarrinho().getCliente().getId()).orElse(null);
        } else if (item.getCliente() != null) { // Se vier direto no JSON
            cliente = clienteRepository.findById(item.getCliente().getId()).orElse(null);
        }
        Pizza pizza = item.getPizza() != null && item.getPizza().getId() != null
            ? pizzaRepository.findById(item.getPizza().getId()).orElse(null)
            : null;
        if (cliente == null || pizza == null) return null;
        // Busca ou cria carrinho do cliente
        Carrinho carrinho = carrinhoRepository.findByClienteId(cliente.getId()).orElse(null);
        if (carrinho == null) {
            carrinho = new Carrinho();
            carrinho.setCliente(cliente);
            carrinho = carrinhoRepository.save(carrinho);
        }
        // Verifica se já existe o item dessa pizza no carrinho
        ItemCarrinho existente = carrinho.getItens() != null ?
            carrinho.getItens().stream().filter(ic -> ic.getPizza().getId().equals(pizza.getId())).findFirst().orElse(null) : null;
        if (existente != null) {
            existente.setQuantidade(existente.getQuantidade() + item.getQuantidade());
            existente.setSubtotal(existente.getQuantidade() * pizza.getPreco());
            return itemCarrinhoRepository.save(existente);
        } else {
            item.setCarrinho(carrinho);
            item.setPizza(pizza);
            item.setSubtotal(item.getQuantidade() * pizza.getPreco());
            return itemCarrinhoRepository.save(item);
        }
    }
}
