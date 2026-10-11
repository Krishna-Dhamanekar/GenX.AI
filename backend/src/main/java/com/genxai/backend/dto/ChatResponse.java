
package com.genxai.backend.dto;

public record ChatResponse(
        String conversationId,
        String message,
        String response
) {

}