import React, {Component} from 'react';
import UserService from "../services/UserService"

class SingInComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.goToSignUp=this.goToSignUp.bind(this);
    }

    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value})
    }
    changePasswordHandler = (event) => {
        this.setState({password: event.target.value})
    }
    logIN = (e) => {
        e.preventDefault()
        let user = {
            username: this.state.username,
            password: this.state.password
        };
        console.log("user=>" + JSON.stringify(user));
        UserService.SignIn(user).then(res => {
            const token = res.data.token;
            localStorage.setItem("token", token);
            this.props.history.push("/products");
        }).catch(err => {
            if (err) {
                alert("Bad credentials")
            }
        })

    }
    goToSignUp(){
        this.props.history.push('/signup');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Log In</h3>
                            <div className="card-body">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="">username:</label>
                                        <input type="text" placeholder="username" name="username"
                                               className="form-control"
                                               value={this.state.username} onChange={this.changeUsernameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">password:</label>
                                        <input type="password" placeholder="password" name="password"
                                               className="form-control"
                                               value={this.state.password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    <div className="row">
                                        <div className="col md-2">
                                            <button className="btn btn-success" onClick={this.logIN}>Log In</button>
                                        </div>
                                        <div className="col mb-2">
                                            <button className="btn btn-primary" onClick={this.goToSignUp}>Sign Up
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingInComponent;