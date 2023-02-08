package com.example.auction.repository;

import com.example.auction.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAll();

    List<Product> findByNameContainingIgnoreCase(String name);
    @Query("SELECT p FROM Product p ORDER BY p.id ASC")
    List<Product> findAllOrderByIdAsc();

@Query("SELECT p FROM Product p ORDER BY p.id desc")
    List<Product> findAllOrderByIdDesc();
    Optional<Product> findById(Long id);

    Optional<Product> findByName(String name);
}