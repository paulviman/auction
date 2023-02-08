import React, { Component } from "react";
import ProductService from "../services/ProductService";
import io from "socket.io-client";
import { Client } from "@stomp/stompjs";
import jwt_decode from "jwt-decode";

const SOCKET_URL = "ws://localhost:8080/ws-message";

class ViewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      //product: [],
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      price: "",
      currentBid: "",
      userId: "",
      connected: "",
    };
    this.socket = io("http://localhost:3000");
  }
  client;
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
    let onConnected = () => {
      console.log("Connected!!");
      this.setState({ connected: true });
      this.client.subscribe(
        `/product_update/${this.props.match.params.id}`,
        (msg) => {
          console.log(msg);
          if (msg.body) {
            const product = JSON.parse(msg.body);
            // console.log("Price:" + product.price);
            // console.log("Current:" + product.currentBid);
            // console.log(product);
            this.setState({ currentBid: product.currentBid });
            //this.state.currentBid = product.bid;
          }
        }
      );
    };

    let onDisconnected = () => {
      console.log("Disconnected!!");
    };

    this.client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: onConnected,
      onDisconnect: onDisconnected,
    });

    this.client.activate();
  }
  componentWillUnmount() {
    this.socket.close();
  }

  bidProduct = (e) => {
    e.preventDefault();
    let product = {
      name: this.state.name,
      description: this.state.description,
      startDate: this.state.start_date,
      endDate: this.state.end_date,
      price: this.state.price,
      //currentBid: this.bid,
      userId: this.state.userId,
    };
    if (this.state.currentBid > this.bid) {
      product.currentBid = this.state.currentBid;
      alert("bid is too low!");
    } else {
      product.currentBid = this.bid;
    }

    ProductService.updateProduct(this.state.id, product).then((res) => {
      this.state = res.data;
      //this.props.history.push(this);
      this.props.history.push("/products");
    });
    if (this.state.connected) {
      this.client.publish({
        destination: `/product_update/${this.props.match.params.id}`,
        headers: {},
        body: JSON.stringify({
          id: this.props.match.params.id,
          price: this.state.price,
          currentBid: product.currentBid,
        }),
      });
    } else console.log("Web socket connection not established");
  };
  bid;
  changeBid = (event) => {
    // if (this.state.currentBid > event.target.value) {
    // } else {
    //   alert("Bid is too low!");
    // }
    this.bid = event.target.value;
    //this.setState({ currentBid: event.target.value });
  };
  getUserId() {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const userId = decode.id;
    console.log(userId);
    return userId;
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center"> View Product Details</h3>
          <div className="card-body">
            <div className="row">
              <label> Product Name: </label>
              <div> {this.state.name}</div>
            </div>
            <div className="row">
              <label> Product description: </label>
              <div> {this.state.description}</div>
            </div>
            <div className="row">
              <label> Product start date: </label>
              <div> {new Date(this.state.start_date).toLocaleString()}</div>
            </div>
            <div className="row">
              <label> Product end date: </label>
              <div> {new Date(this.state.end_date).toLocaleString()}</div>
            </div>
            <div className="row">
              <label> Price: </label>
              <div> {this.state.price}</div>
            </div>
            <div className="row">
              <label> Current bid: </label>
              <div> {this.state.currentBid}</div>
            </div>
            {this.getUserId() !== this.state.userId && (
              <>
                <form action="submit" onSubmit={this.bidProduct}>
                  <input
                    type="number"
                    value={this.bid}
                    onChange={this.changeBid}
                  />
                  <button className="btn btn-primary" type={"submit"}>
                    Bid
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProduct;
