package com.example.auction.service;

import com.example.auction.Kafka.Model.KafkaModel;
import com.example.auction.dto.ProductDTO;
import com.example.auction.repository.ProductRepository;
import com.example.auction.entities.Product;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import com.example.auction.Kafka.Constants.KafkaConstants;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private KafkaTemplate<String, KafkaModel> kafkaTemplate;

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAllOrderByIdDesc();
        List<ProductDTO> productDTOList = new ArrayList<>();
        Date date = new Date();
        products.forEach((product) -> {
            if (date.before(product.getEndDate())) {
                productDTOList.add(new ProductDTO(product.getId(), product.getName(), product.getDescription(), product.getStartDate(), product.getEndDate(), product.getPrice(), product.getCurrentBid(), product.getUserId()));
            }
        });
        return productDTOList;
    }

    public void addProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setStartDate(productDTO.getStartDate());
        product.setEndDate(productDTO.getEndDate());
        product.setPrice(productDTO.getPrice());
        product.setCurrentBid(productDTO.getCurrentBid());
        product.setUserId(productDTO.getUserId());

        //log.info("product"+product.getName());
        productRepository.save(product);
    }
    public List<Product> searchProducts(String search) {
        return productRepository.findByNameContainingIgnoreCase(search);
    }

    public void updateProduct(Long id, ProductDTO productUpdated) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found " + id));
        product.setName(productUpdated.getName());
        product.setDescription(productUpdated.getDescription());
        product.setEndDate(productUpdated.getEndDate());
        product.setPrice(productUpdated.getPrice());
        product.setCurrentBid(productUpdated.getCurrentBid());
        product.setUserId(productUpdated.getUserId());

        productRepository.save(product);

        var model = new KafkaModel(product.getId(), productUpdated.getName());
        kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, model);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found " + id));
        productRepository.delete(product);
    }

    public ProductDTO getProductById(long id) {
        Product product = productRepository.findById(id).orElseThrow();
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setStartDate(product.getStartDate());
        productDTO.setEndDate(product.getEndDate());
        productDTO.setPrice(product.getPrice());
        productDTO.setCurrentBid(product.getCurrentBid());
        productDTO.setUserId(product.getUserId());
        return productDTO;
    }

    public ProductDTO getProductByName(String name) {
        Product product = productRepository.findByName(name).orElseThrow();
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setStartDate(product.getStartDate());
        productDTO.setEndDate(product.getEndDate());
        productDTO.setPrice(product.getPrice());
        productDTO.setCurrentBid(product.getCurrentBid());
        productDTO.setUserId(product.getUserId());
        return productDTO;
    }


}
