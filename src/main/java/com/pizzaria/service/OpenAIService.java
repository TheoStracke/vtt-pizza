package com.pizzaria.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.List;

@Service
public class OpenAIService {

    private final String OPENAI_API_KEY = "SUA_API_KEY_AQUI"; // <-- coloque sua chave
    private final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    public String gerarDescricaoPizza(String ingredientes) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(OPENAI_API_KEY);

        Map<String, Object> body = Map.of(
            "model", "gpt-4o-mini",
            "messages", List.of(
                Map.of("role", "system", "content", "Você é um gerador de descrições criativas e apetitosas de pizzas."),
                Map.of("role", "user", "content", "Crie uma descrição criativa para uma pizza com: " + ingredientes)
            )
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_URL, request, Map.class);

        Map<String, Object> resposta = (Map<String, Object>) response.getBody();
        List<Map<String, Object>> choices = (List<Map<String, Object>>) resposta.get("choices");

        if (choices != null && !choices.isEmpty()) {
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");
        }

        return "Descrição indisponível no momento.";
    }
}