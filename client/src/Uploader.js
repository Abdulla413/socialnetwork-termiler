import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
        };
        this.handleChangeFile = this.handleChangeFile.bind(this);
    }

    uploadPicture(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file);
        fetch("/upload/profile/pictur.json", { method: "POST", body: formData })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.props.updateState(data);
                console.log(data, " this is data from db");
            });
    }

    handleChangeFile(e) {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <div className="picture-uploader">
                <p>Please Upload your profile picture. </p>
                <form method="POST">
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={this.handleChangeFile}
                    />

                    <button
                        type="submit"
                        onClick={(e) => {
                            console.log(e);
                            this.uploadPicture(e);
                        }}
                    >
                        {" "}
                        Upload{" "}
                    </button>
                </form>
            </div>
        );
    }
}
