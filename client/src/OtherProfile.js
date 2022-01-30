import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import FriendBtn from "./FriendBtn";

export default function OtherProfile({ userId }) {
    console.log(userId, "hhhhh");
    const [person, setPerson] = useState({});

    const { id } = useParams();
    const history = useHistory();
    console.log(id, " ia a id u enter");
    console.log(history, " i am history");

    useEffect(() => {
        if (id == userId) {
            return history.push("/");
        }
        let ignore = false;
        fetch(`/user/${id}.json`)
            .then((res) => {
                if (!res.ok) {
                    return <h1>Something went wrong.</h1>;
                } else {
                    console.log(res, " iam responses, balangza");
                    return res.json();
                }
            })
            .then((info) => {
                if (!ignore) {
                    setPerson(info);
                }
            })
            .catch(() => {
                setPerson({});
            });
        return () => {
            ignore = true;
        };
    }, [id]);

    return (
        <div className="otherprofile">
            <h4> Profile</h4>
            <div key={person.firstname}>
                <div className="pic-button">
                    <img src={person.pic_url} alt={person.firstname} />
                    <FriendBtn userId={userId} />
                </div>
                <div className="name-bio">
                    <p>
                        {person.firstname} {person.lastname}{" "}
                    </p>
                    <p className="person-bio"> {person.bio}</p>
                </div>
            </div>
        </div>
    );
}
