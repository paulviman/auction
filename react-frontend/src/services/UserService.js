import axios from "axios";

class UserService {

    SignIn(user) {
        return axios({
            method: "post",
            url: "http://localhost:8080/api/auth/signin",
            data: user
        })

    }

    SignUp(user) {
        return axios({
            method: "post",
            url: "http://localhost:8080/api/auth/signup",
            data: user
        }).then(res=>{
            console.log(res)
        })
    }
}

export default new UserService()