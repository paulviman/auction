package com.example.auction.webController;

import com.example.auction.dto.ProductDTO;
import com.example.auction.service.ProductService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
//@RestController
public class ProductController {
private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(value = "/products")
    public String listProducts(Model model) {
        model.addAttribute("products",productService.getAllProducts());
        //log.info("hai salut am primit requistu de la tn");
        return "products";
    }
}
