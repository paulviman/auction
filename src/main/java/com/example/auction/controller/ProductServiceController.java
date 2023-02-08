package com.example.auction.controller;


import com.example.auction.dto.ProductDTO;
import com.example.auction.entities.Product;
import com.example.auction.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@Slf4j
public class ProductServiceController {
    private static Map<Long, ProductDTO> productsMap = new HashMap<>();
    @Autowired
    private ProductService productService;


//    static {
//        ProductDTO p1 = new ProductDTO();
//        p1.setId(1l);
//        p1.setName("Mere");
//        productsMap.put(p1.getId(), p1);
//
//        ProductDTO p2 = new ProductDTO();
//        p2.setId(2l);
//        p2.setName("Pere");
//        productsMap.put(p2.getId(), p2);
//
//    }

    @GetMapping(value = "/products/list")
    public List<ProductDTO> getProducts() {
        //log.info("hai salut am primit requistu de la tn");
        return productService.getAllProducts();
    }


    @PostMapping("/products/add")
    public void addProduct(@RequestBody ProductDTO productDTO) {
        productService.addProduct(productDTO);
    }

    @GetMapping("/products/{id}")
    public ProductDTO getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PutMapping(value = "/product/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateProduct(@PathVariable Long id, @RequestBody ProductDTO productUpdated) {
        productService.updateProduct(id, productUpdated);
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam("search") String search) {
        return productService.searchProducts(search);
    }
    @DeleteMapping(value = "/product/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
//
//    @PostMapping(value = "/products")
//    public ResponseEntity<Object> createProduct(@RequestBody ProductDTO productDTO) {
//        productsMap.put(productDTO.getId(), productDTO);
//        Product product = new Product();
//        product.setName(productDTO.getName());
//        productRepository.save(product);
//        return new ResponseEntity<>("Product created", HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/products/{id}", method = RequestMethod.GET)
//    public ResponseEntity<Object> getProduct(@PathVariable("id") Long id) {
//        return new ResponseEntity<>(productRepository.findById(id).map(p -> new ProductDTO(p.getId(), p.getName())).orElse(null), HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/products/{id}", method = RequestMethod.PUT)
//    public ResponseEntity<Object> updateProduct(@PathVariable("id") Long id, @RequestBody ProductDTO productDTO) {
//        productRepository.findById(id).ifPresent(p -> {
//            p.setName(productDTO.getName());
//            productRepository.save(p);
//        });
//        productsMap.remove(id);
//        productsMap.put(id, productDTO);
//        return new ResponseEntity<>("Product updated", HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/products/{id}", method = RequestMethod.DELETE)
//    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id) {
//        ProductDTO remove = productsMap.remove(id);
//        productRepository.deleteById(id);
//        return new ResponseEntity<>(Optional.ofNullable(remove).map(p -> "Product deleted").orElse("Product not found"), HttpStatus.OK);
//    }
//
//    @GetMapping(value = "/bulk_create")
//    public String bulkCreate() {
//        productRepository.saveAll(Arrays.asList(new Product("Mere"), new Product("Pere")));
//        return "Products created";
//    }
//

}