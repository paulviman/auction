import axios from "axios";

const productURLServer = "http://localhost:8080/products"

class ProductService {
    // handleSearchSubmit = (searchTerm) => {
    //     axios.get(`/search?search=${searchTerm}`)
    //         .then(response => {
    //             // update the state with the search results
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }

    getProducts() {
        // return axios.get(productURLServer);
        const token = localStorage.getItem("token");
        const header = "Bearer " + token;
        return axios({
            method: "get",
            url: "http://localhost:8080/products/list",
            headers: {
                Authorization: header
            }
        })
    }

    createProduct(product) {
        //return axios.post(productURLServer,product)
        const token = localStorage.getItem("token");
        const header = "Bearer " + token;
        return axios({
            method: "post",
            url: "http://localhost:8080/products/add",
            data: product,
            headers: {
                Authorization: header
            }
        })
    }

    // getProductById(productId) {
    //     return axios.get("http://localhost:8080/product/" + productId);
    // }
    getProductById(productId) {
        //return axios.post(productURLServer,product)
        const token = localStorage.getItem("token");
        const header = "Bearer " + token;
        return axios({
            method: "get",
            url: "http://localhost:8080/products/" + productId,
            data: productId,
            headers: {
                "Content-Type": "application/json",
                Authorization: header
            }
        })
    }

    updateProduct(productId, product) {
        const token = localStorage.getItem("token");
        const header = "Bearer " + token;
        return axios({
            method: "put",
            url: "http://localhost:8080/product/" + productId,
            data: product,
            headers: {
                "Content-Type": "application/json",
                Authorization: header
            }
        });
    }

    deleteProduct(productId) {
        const token = localStorage.getItem("token");
        const header = "Bearer " + token;
        return axios({
            method: "delete",
            url: "http://localhost:8080/product/" + productId,
            headers: {
                "Content-Type": "application/json",
                Authorization: header
            }
        })
    }
}

export default new ProductService()