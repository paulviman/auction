package com.example.auction.websocket;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.auction.websocket.ProductWebSocketDTO;

import java.util.logging.Logger;

@RestController
public class WebSocketController {

    private static final Logger log = Logger.getLogger(WebSocketController.class.getCanonicalName());
    SimpMessagingTemplate template;

    public WebSocketController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @PostMapping("send_update")
    public ResponseEntity<String> sendUpdate(@RequestBody ProductWebSocketDTO productWebSocketDTO) {
        template.convertAndSend("/product_update/" + productWebSocketDTO.getId(), productWebSocketDTO);
        return new ResponseEntity<>("Product Updated", HttpStatus.OK);
    }

    @MessageMapping("/product_update/{productId}")
    public void receiveMessage(@Payload ProductWebSocketDTO textMessageDTO) {
        log.info("Receive message:" + textMessageDTO);
        // receive message from client
    }

}