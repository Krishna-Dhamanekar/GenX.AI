package com.genxai.backend.controller;

import com.genxai.backend.dto.ChatRequest;
import com.genxai.backend.dto.ChatResponse;
import com.genxai.backend.service.ChatService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponse chat(@Valid @RequestBody ChatRequest request) {

        String aiResponse = chatService.chat(
                request.message(),
                request.conversationId()
        );

        return new ChatResponse(
                request.conversationId(),
                request.message(),
                aiResponse
        );
    }
}