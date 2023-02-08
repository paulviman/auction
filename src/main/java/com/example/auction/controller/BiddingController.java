package com.example.auction.controller;

import com.example.auction.entities.Product;
import com.example.auction.repository.ProductRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class BiddingController {

    private final ProductRepository productRepository;

    public BiddingController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @MessageMapping("/bid")
    @SendTo("/topic/bids")
    public Long handleBid(long productId, Long bid) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new IllegalArgumentException("Product not found"));
        product.setCurrentBid(bid);
        productRepository.save(product);
        return bid;
    }

}