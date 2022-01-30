import { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import ProfilePicture from "./Profilepicture.js";
import Uploader from "./Uploader.js";
import Profile from "./Profile.js";
import FindPeople from "./FindPeople.js";
import OtherProfile from "./OtherProfile.js";
import Friends from "./Friends.js";
import Chat from "./Chat.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: null,
            lastname: null,
            pic_url: null,
            bio: "",
            uploaderVisable: false,
            error: null,
        };

        this.toggelUploader = this.toggelUploader.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        console.log("App just mounted");
        fetch("/upload/profile/pictur/id.json")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                this.setState({ ...data });
                console.log(data, " i am data in app line 37");
            });
    }

    toggelUploader() {
        this.setState({ uploaderVisable: !this.state.uploaderVisable });
    }
    updateUser(user) {
        this.setState(user);
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <header>
                        <img src="/logo.png" alt="Logo" className="logo" />
                        <div className="threelink">
                            <h1>Welcome to Termiler</h1>
                            <div className="lingtree">
                                <Link to="/users">Search</Link>
                                <Link to="/friends"> Friends </Link>
                                <Link to="/chat"> Chat Room </Link>
                            </div>
                        </div>
                        <Link to={`/uploader`}>
                            <ProfilePicture
                                className="headerpropic"
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                                pic_url={this.state.pic_url}
                                toggelUploader={this.toggelUploader}
                            />
                        </Link>
                    </header>

                    <Switch>
                        <Route exact path="/">
                            <Profile
                                bio={this.state.bio}
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                                pic_url={this.state.pic_url}
                                toggelUploader={this.toggelUploader}
                                updateUser={this.updateUser}
                            />
                        </Route>
                        <Route path="/users">
                            <FindPeople />
                        </Route>
                        <Route path="/user/:id">
                            <OtherProfile userId={this.state.id} />
                        </Route>
                        <Route path="/friends">
                            <Friends />
                        </Route>
                        <Route path="/chat">
                            <Chat />
                        </Route>

                        <Route path="/uploader">
                            <Uploader
                                updateUser={(user) => this.updateUser(user)}
                            />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

//{this.state.uploaderVisable && (toggelUploader={this.toggelUploader} )}
