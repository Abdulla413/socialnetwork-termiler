import { Component } from "react";
import { Link } from "react-router-dom";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state, "iama e");

        fetch("/login.json", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then((res) => {
            if (res.ok) {
                location.replace("/");
            } else {
                this.setState({ error: true });
            }
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            console.log("new state", this.state);
        });
        console.log("old state", this.state);
    }

    render() {
        return (
            <div className="loginmobile">
                <h2> Login </h2>
                {this.state.error && (
                    <p className="error">Oops, Songthing went wrong</p>
                )}
                <form
                    className="login-signup-form "
                    method="POST"
                    onSubmit={this.handleSubmit}
                >
                    <label>E-Mail</label>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button type="submit" className="bnt">
                        Login
                    </button>
                </form>
                <p>
                    Please <Link to="/Registration">Sign Up</Link> if you have
                    Not Registered
                </p>

                {/* <Link to="/Forgot"> Forgot password? </Link> */}
            </div>
        );
    }
}
