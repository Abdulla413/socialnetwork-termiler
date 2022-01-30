import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import Registration from "./Registration.js";
import Forgot from "./Forgot.js";

export default function welcome() {
    return (
        <div>
            <div className="welcomeheader">
                <p>Welcome To TERMILER</p>
            </div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/Forgot">
                        <Forgot />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
