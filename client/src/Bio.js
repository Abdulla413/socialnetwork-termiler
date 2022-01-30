import { Component } from "react";

export default class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: true,
            draft: this.props.bio,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.bio !== this.props.bio) {
            this.setState({ draft: this.props.bio });
        }
    }
    handleChange(e) {
        this.setState({ draft: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const body = {
            bio: this.state.draft,
        };
        await fetch("/upload/profile/bio.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        this.props.updateUser({ bio: this.state.draft });

        this.setState({ editing: false });
    }

    toggleEditing() {
        this.setState({ editing: !this.state.editing });
    }

    render() {
        if (this.state.editing) {
            return (
                <form className="bioform" onSubmit={this.handleSubmit}>
                    <textarea
                        value={this.state.draft}
                        name="bio"
                        cols="30"
                        rows="5"
                        onChange={this.handleChange}
                    ></textarea>
                    <button type="submit" className="bnt">
                        Save
                    </button>
                </form>
            );
        } else if (this.props.bio) {
            return (
                <div className="edited">
                    <p>{this.props.bio}</p>
                    <button onClick={this.toggleEditing} className="bnt">
                        Edit
                    </button>
                </div>
            );
        } else {
            return (
                <button onClick={this.toggleEditing} className="bnt addbio">
                    Add Bio{" "}
                </button>
            );
        }
    }
}
