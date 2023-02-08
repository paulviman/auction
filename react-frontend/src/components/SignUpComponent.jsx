import React, {Component} from 'react';
import UserService from "../services/UserService";

class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value})
    }
    changePasswordHandler = (event) => {
        this.setState({password: event.target.value})
    }
    changeEmailHandler = (event) => {
        this.setState({email: event.target.value})
    }
    singUp = (e) => {
        e.preventDefault()
        let user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        console.log("user=>" + JSON.stringify(user));
        UserService.SignUp(user).then(res=>{
            this.props.history.push("/signin")
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Register</h3>
                            <div className="card-body">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="">username:</label>
                                        <input type="text" placeholder="username" name="username"
                                               className="form-control"
                                               value={this.state.username} onChange={this.changeUsernameHandler}/>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">email:</label>
                                        <input type="email" placeholder="email" name="email"
                                               className="form-control"
                                               value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">password:</label>
                                        <input type="password" placeholder="password" name="password"
                                               className="form-control"
                                               value={this.state.password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.singUp}>Register</button>
                                    {/*<button className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>*/}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SignUpComponent;