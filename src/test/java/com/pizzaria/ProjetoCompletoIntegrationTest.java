package com.pizzaria;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProjetoCompletoIntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testHealthCheck() {
        ResponseEntity<String> response = restTemplate.getForEntity("/actuator/health", String.class);
        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
    }

    @Test
    void testCardapioEndpoint() {
        ResponseEntity<String> response = restTemplate.getForEntity("/api/cardapio", String.class);
        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
    }

    @Test
    void testClienteCadastroELogin() {
        // Cadastro de usuário
        var usuario = new java.util.HashMap<String, Object>();
        usuario.put("nome", "Teste Usuário");
        usuario.put("email", "testeuser@email.com");
        usuario.put("senha", "123456");
        ResponseEntity<String> cadastroResponse = restTemplate.postForEntity("/usuarios", usuario, String.class);
        assertThat(cadastroResponse.getStatusCode().is2xxSuccessful()).isTrue();

        // Login de usuário
        var credenciais = new java.util.HashMap<String, Object>();
        credenciais.put("email", "testeuser@email.com");
        credenciais.put("senha", "123456");
        ResponseEntity<String> loginResponse = restTemplate.postForEntity("/usuarios/login", credenciais, String.class);
        assertThat(loginResponse.getStatusCode().is2xxSuccessful()).isTrue();
    }

    @Test
    void testPedidoCompleto() {
        // Simulação de fluxo completo de pedido
        // ...implementar conforme endpoints reais...
    }

    @Test
    void testAdminEndpoints() {
        // Testar endpoints de administração
        // ...implementar conforme endpoints reais...
    }
}
