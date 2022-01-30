import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriend,
    unFriend,
} from "./redux/friends/slice.js";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector((state) => {
        if (state.friends) {
            return state.friends.filter((friend) => friend.accepted == true);
        }
    });
    console.log(friends, "friends line 18, friends");

    const notFriends = useSelector((state) => {
        if (state.friends) {
            return state.friends.filter((sender) => sender.accepted == false);
        }
    });

    useEffect(() => {
        let ignore = false;
        fetch("/friends-wannabes.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data, "friends line 35");
                if (!ignore) {
                    dispatch(receiveFriendsWannabes(data));
                }
            })
            .catch(() => {});
        return () => {
            ignore = true;
        };
    }, []);

    function handleUnfriend(friend) {
        console.log(friend.id, "|i ma from friends line 43");
        console.log(`${friend.id}`, "|i ma from friends line 43");
        fetch(`/delete-friend-request/${friend.id}.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        });
        // .then((data) => dispatch())
        // .catch(() => {});
    }

    return (
        <div id="wannabefriends">
            <p> Those people are your Friends</p>

            {(friends || []).map((friend) => (
                <div className="profile-pic-container" key={friend.id}>
                    <div className="profileimage">
                        <img src={friend.pic_url} alt={friend.firstname} />
                        {friend.firstname} {friend.lastname}
                    </div>
                    <button>Unfriend </button>
                </div>
            ))}
            <p> Those people want to be your friends</p>
            {(notFriends || []).map((sender) => (
                <div className="profile-pic-container" key={sender.id}>
                    <div className="profileimage">
                        <div className="friendsprofilepic">
                            <div className=" fried_pic">
                                <img
                                    src={sender.pic_url}
                                    alt={sender.firstname}
                                />
                            </div>
                            {sender.firstname} {sender.lastname}
                            <button>Accept </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
