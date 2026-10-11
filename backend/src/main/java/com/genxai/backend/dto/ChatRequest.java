package com.genxai.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record ChatRequest(
        @NotBlank(message = "Message cannot be empty ")
        String message,
        @NotBlank(message = "Conversation ID cannot be empty")
        String conversationId)
{
}
