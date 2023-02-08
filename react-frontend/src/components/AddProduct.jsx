import React, { Component } from "react";
import * as events from "events";
import ProductService from "../services/ProductService";
import jwt_decode from "jwt-decode";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      start_date: this.getCurrentDate(),
      end_date: "",
      price: "",
      currentBid: "",
      userId: this.getUserId(),
    };

    //this.saveProduct() = this.saveProduct.bind(this);
    // this.changeNameHandler = this.changeNameHandler.bind(this);
    // this.changeDescriptionHandler() = this.changeDescriptionHandler.bind(this);
    // this.changeEndDateHandler() = this.changeEndDateHandler.bind(this);
    // this.changePriceHandler() = this.changePriceHandler.bind(this);
  }
  getUserId() {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const userId = decode.id;
    console.log(userId);
    return userId;
  }
  getCurrentDate() {
    const t = new Date();
    const date = ("0" + t.getDate()).slice(-2);
    const month = ("0" + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${year}-${month}-${date}`;
  }

  saveProduct = (e) => {
    e.preventDefault();

    if (this.state.start_date > this.state.end_date) {
      alert("End date is in the past :(");
    } else {
      let product = {
        name: this.state.name,
        description: this.state.description,
        startDate: this.state.start_date,
        endDate: this.state.end_date,
        price: this.state.price,
        currentBid: this.state.price,
        userId: this.state.userId,
      };
      console.log("product=> " + JSON.stringify(product));

      ProductService.createProduct(product).then((res) => {
        this.props.history.push("/products");
      });
    }
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };
  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };
  changeEndDateHandler = (event) => {
    this.setState({ end_date: event.target.value });
  };
  changePriceHandler = (event) => {
    this.setState({ price: event.target.value });
  };

  cancel() {
    this.props.history.push("/products");
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3">
              <h3 className="text-center">Add Product</h3>
              <div className="card-body">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="">Name:</label>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Description:</label>
                    <input
                      type="text"
                      placeholder="Description"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.changeDescriptionHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">End date:</label>
                    <input
                      type="date"
                      placeholder="End Date"
                      name="end_date"
                      className="form-control"
                      value={this.state.end_date}
                      onChange={this.changeEndDateHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Price:</label>
                    <input
                      type="number"
                      placeholder="Price"
                      name="price"
                      className="form-control"
                      value={this.state.price}
                      onChange={this.changePriceHandler}
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveProduct}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProduct;
