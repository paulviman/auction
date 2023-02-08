import React, { Component } from "react";
import ProductService from "../services/ProductService";
import { useHistory } from "react-router-dom";
import "../App.css";

class FirstPageListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.goToSignIn = this.goToSignIn.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
  }

  componentDidMount() {
    ProductService.getProducts().then((res) => {
      this.setState({ products: res.data });
    });
  }

  goToSignIn() {
    this.props.history.push("/signin");
  }
  goToSignUp() {
    this.props.history.push("/signup");
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Products</h2>
        {/*<div className="row">*/}
        {/*    <button className="btn btn-primary" onClick={this.addProduct}>Add product</button>*/}
        {/*</div>*/}
        <div className="col mb-2">
          <button className="btn btn-primary" onClick={this.goToSignIn}>
            Log In
          </button>
        </div>
        <div className="col mb-2">
          <button className="btn btn-primary" onClick={this.goToSignUp}>
            Sign Up
          </button>
        </div>

        <div className="container">
          {this.state.products.map((product) => (
            <div className="card mb-5" key={product.id}>
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

                {/*<button*/}
                {/*    className="btn btn-info"*/}
                {/*    onClick={() => this.editProduct(product.id)}*/}
                {/*>*/}
                {/*    Edit*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    style={{marginLeft: "10px"}}*/}
                {/*    className="btn btn-danger"*/}
                {/*    onClick={() => this.deleteProduct(product.id)}*/}
                {/*>*/}
                {/*    Delete*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    style={{marginLeft: "10px"}}*/}
                {/*    className="btn btn-info"*/}
                {/*    onClick={() => this.viewProduct(product.id)}*/}
                {/*>*/}
                {/*    View*/}
                {/*</button>*/}
              </div>
            </div>
          ))}
        </div>

        {/*<div className="row">*/}
        {/*    <table className="table table-striped table-bordered">*/}
        {/*        <thead>*/}
        {/*        <tr>*/}
        {/*            <th>Name</th>*/}
        {/*            <th>Description</th>*/}
        {/*            <th>Start Date</th>*/}
        {/*            <th>End Date</th>*/}
        {/*            <th>Price</th>*/}
        {/*        </tr>*/}
        {/*        </thead>*/}
        {/*        <tbody>*/}
        {/*        {*/}
        {/*            this.state.products.map(*/}
        {/*                product => <tr key={product.id}>*/}
        {/*                    <td>{product.name}</td>*/}
        {/*                    <td>{product.description}</td>*/}
        {/*                    <td>{new Date(product.startDate).toLocaleString()}</td>*/}
        {/*                    <td>{new Date(product.endDate).toLocaleString()}</td>*/}
        {/*                    <td>{product.price}</td>*/}
        {/*                </tr>*/}
        {/*            )*/}
        {/*        }*/}

        {/*        </tbody>*/}
        {/*    </table>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default FirstPageListComponent;
// export default connect(
//     mapStateToProps,
// )(ListProductComponent);
