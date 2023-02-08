import React, { Component, useState } from "react";
import ProductService from "../services/ProductService";
import jwt_decode from "jwt-decode";

import addProduct from "./AddProduct";
import { connect } from "react-redux";

class ListProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      searchQuery: "",
      currentUserId: this.getUserId(),
      currentBid: "",
    };
    this.addProduct = this.addProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    ProductService.getProducts().then((res) => {
      this.setState({ products: res.data });
    });
  }

  getUserId() {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const userId = decode.id;
    console.log(userId);
    return userId;
  }
  handleSearch(event) {
    this.setState({
      searchQuery: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    const filteredProducts = this.state.products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(this.state.searchQuery.toLowerCase());
    });

    this.setState({
      filteredProducts: filteredProducts,
    });
  }

  addProduct() {
    this.props.history.push("add-product");
  }

  editProduct(id) {
    console.log(id);
    this.props.history.push(`/update-product/${id}`);
  }

  deleteProduct(id) {
    alert("Are you sure ???");
    ProductService.deleteProduct(id).then((res) => {});
    this.setState({
      products: this.state.products.filter((product) => product.id !== id),
    });
  }

  viewProduct(id) {
    this.props.history.push(`/view-product/${id}`);
  }

  logOut() {
    localStorage.removeItem("token");
    this.props.history.push("/list");
  }

  render() {
    const filteredProducts = this.state.products.filter((product) =>
      product.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );
    return (
      <div>
        <h2 className="text-center">Products</h2>

        <div className="container" style={{ marginBottom: "100px" }}>
          <div className="row my-5">
            <div className="col">
              <div className="btn btn-danger" onClick={this.logOut}>
                Log Out
              </div>
            </div>
            <div className="col">
              <button className="btn btn-primary" onClick={this.addProduct}>
                Add product
              </button>
            </div>
            <div className="col">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="Search for a product..."
                  value={this.state.searchQuery}
                  onChange={(e) =>
                    this.setState({ searchQuery: e.target.value })
                  }
                />
                {/* <button type="submit">Search</button> */}
              </form>
            </div>
          </div>

          {filteredProducts.map((product) => (
            // {this.state.products.map((product) => (
            // {searchbarFilterItems.map((product) => (
            <div
              className="card my-5"
              key={product.id}
              //
            >
              <div className="card-header">
                <h3 className="card-title">{product.name}</h3>
              </div>
              <div className="card-body">
                <h5 className="card-text">{product.description}</h5>
                <div className="row">
                  <div className="col">
                    <p className="card-text bold">Start date:</p>
                    <p className="card-text">
                      {new Date(product.startDate).toISOString().slice(0, 10)}
                    </p>
                  </div>
                  <div className="col">
                    <p className="card-text bold">End date:</p>
                    <p className="card-text">
                      {new Date(product.endDate).toISOString().slice(0, 10)}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-md-6"></div>
                  <div className="col col-md-6">
                    <p className="card-text bold">Price:</p>
                    <p className="card-text">{product.price}</p>
                  </div>
                  <div className="col bold">
                    Current bid: {product.currentBid}
                  </div>
                </div>
                {product.userId === this.state.currentUserId && (
                  <>
                    <button
                      className="btn btn-info"
                      onClick={() => this.editProduct(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-danger"
                      onClick={() => this.deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </>
                )}

                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-success"
                  onClick={() => this.viewProduct(product.id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ListProductComponent;
