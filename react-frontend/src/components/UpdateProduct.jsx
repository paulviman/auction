import React, { Component } from "react";
import * as events from "events";
import ProductService from "../services/ProductService";
import { withRouter } from "react-router-dom";

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      price: "",
    };

    //this.editProduct() = this.editProduct.bind(this);
    // this.changeNameHandler = this.changeNameHandler.bind(this);
    // this.changeDescriptionHandler() = this.changeDescriptionHandler.bind(this);
    // this.changeEndDateHandler() = this.changeEndDateHandler.bind(this);
    // this.changePriceHandler() = this.changePriceHandler.bind(this);
  }

  // getCurrentDate() {
  //     const t = new Date();
  //     const date = ('0' + t.getDate()).slice(-2);
  //     const month = ('0' + (t.getMonth() + 1)).slice(-2);
  //     const year = t.getFullYear();
  //     return `${year}-${month}-${date}`;
  // }

  componentDidMount() {
    ProductService.getProductById(this.state.id).then((res) => {
      let product = res.data;
      this.setState({
        name: product.name,
        description: product.description,
        start_date: product.startDate,
        end_date: product.endDate,
        price: product.price,
        currentBid: product.currentBid,
        userId: product.userId,
      });
    });
  }

  editProduct = (e) => {
    e.preventDefault();
    let product = {
      name: this.state.name,
      description: this.state.description,
      startDate: this.state.start_date,
      endDate: this.state.end_date,
      price: this.state.price,
      currentBid: this.state.currentBid,
      userId: this.state.userId,
    };
    console.log("product=> " + JSON.stringify(product));

    ProductService.updateProduct(this.state.id, product).then((res) => {
      //this.state = res.data;
      this.props.history.push("/products");
    });
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
              <h3 className="text-center">Edit Product</h3>
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
                    <label htmlFor="">Description:</label>
                    <input
                      type="date"
                      placeholder="End Date"
                      name="end_date"
                      className="form-control"
                      value={new Date(this.state.endDate).toLocaleString()}
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
                    onClick={this.editProduct}
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

export default UpdateProduct;
