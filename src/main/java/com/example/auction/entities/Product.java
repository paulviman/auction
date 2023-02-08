package com.example.auction.entities;

import javax.persistence.*;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "product")
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private String description;

    private Date startDate;


    private Date endDate;
    @Column()
    private Long price;

    private Long currentBid;
    private Long userId;


//    public Product(String name, String description, Date startDate, Date endDate, Long price) {
//        this.name = name;
//        this.description = description;
//        this.startDate = startDate;
//        this.endDate = endDate;
//        this.price = price;
//    }

//    public Product() {
//
//    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public Long getPrice() {
        return price;
    }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public Long getCurrentBid() {
        return currentBid;
    }

    public void setCurrentBid(Long currentBid) {
        this.currentBid = currentBid;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}