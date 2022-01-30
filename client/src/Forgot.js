import { Component } from "react";
import { Link } from "react-router-dom";
export default class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            email: "",
            code: "",
            password: "",
            error: null,
        };
        this.sendResetEmail = this.sendResetEmail.bind(this);
        this.handleChange = this.handleChange1.bind(this);
    }

    sendResetEmail(e) {
        e.preventDefault();
        console.log(this.state, "iama e");

        fetch("/password/reset/start.json", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
            }),
        }).then((res) => {
            if (res.ok) {
                this.setState({ step: 1, error: null });
            } else {
                this.setState({ error: true });
            }
        });
    }

    render() {
        if (this.state.step === 0) {
            return (
                <>
                    <h2> Reset Password Step 1 </h2>
                    {this.state.error && (
                        <p className="error">Oops, Songthing went wrong</p>
                    )}
                    <form
                        method="POST"
                        className="form"
                        onSubmit={this.sendResetEmail}
                    >
                        <label>E-Mail</label>

                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange1}
                        />
                        <button
                            onClick={() => (this.setState = { step: 1 })}
                            type="submit"
                            className="bnt"
                        >
                            Next
                        </button>
                    </form>
                </>
            );
        } else if (this.state.step === 1) {
            return (
                <>
                    <h2> Resetpassword Step 2 </h2>
                    <form
                        method="POST"
                        className="form"
                        onSubmit={this.handleSubmit}
                    >
                        <label>Code</label>

                        <input
                            type="text"
                            name="code"
                            value={this.state.code}
                            onChange={this.handleChange}
                        />
                        <label>New Password</label>

                        <input
                            type="text"
                            name="password"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />

                        <button type="submit" className="bnt">
                            Submit
                        </button>
                    </form>
                </>
            );
        } else {
            <>
                <h2>Reset Password Step 3 </h2>
                <p> You successfuly reset your password</p>
                <p>
                    Please <Link to="/login"> Log in </Link> your Termiler
                    account.{" "}
                </p>
            </>;
        }
    }
}
