import ProfilePicture from "./Profilepicture.js";
import Bio from "./Bio.js";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function Profile(props) {
    console.log(props.id, "id form profile page");
    console.log(props, " i am profile's props");
    const [errorMessage, setErrorMessage] = useState("");

    function handleClick(e) {
        e.preventDefault();
        fetch(`/delete-all-profile.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return setErrorMessage(<>Something went wrong.</>);
                } else {
                    return res.json();
                }
            })
            .catch(() => {});
    }

    return (
        <section className="profile-bio">
            <div className="profile">
                <ProfilePicture
                    firstname={props.firstname}
                    lastname={props.lastname}
                    pic_url={props.pic_url}
                    toggleUploader={props.toggleUploader}
                />
                <p>
                    {props.firstname} {props.lastname}
                </p>
                <button onClick={handleClick}>Delete Profile</button>
            </div>
            <div className="profile-bio-container">
                <Bio
                    bio={props.bio}
                    userId={props.userId}
                    updateUser={(user) => {
                        props.updateUser(user);
                    }}
                />
            </div>
        </section>
    );
}
