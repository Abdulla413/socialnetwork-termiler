import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function FriendBtn({ userId }) {
    const [r, setR] = useState(false);
    const [isSender, setIsSender] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [isAccept, setIsAccept] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { id } = useParams();

    useEffect(() => {
        let ignore = false;
        fetch(`/friendshipstatus/${id}.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id,
                userId,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return setErrorMessage("Something went wrong.");
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                if (!ignore) {
                    const { sender, accept, sent } = data;
                    if (!sent) {
                        return setIsSent(false);
                    } else {
                        setIsSent(true);
                        if (userId === sender) {
                            setIsSender(true);
                        }
                        if (accept) {
                            setIsAccept(true);
                        }
                    }
                }
            })
            .catch(() => {});

        return () => {
            ignore = true;
        };
    }, [r]);

    function makeFriendRequest(e) {
        e.preventDefault();
        fetch(`/send-friend-request/${id}.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id,
                userId,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return setErrorMessage(<>Something went wrong.</>);
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                setR((r) => !r);
                return;
            })
            .catch(() => {});
    }

    function cancelRequest(e) {
        e.preventDefault();
        fetch(`/cancel-friend-request/${id}.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id,
                userId,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return setErrorMessage(<>Something went wrong.</>);
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                console.log(data);
                setR((r) => !r);
                return;
            })
            .catch(() => {});
    }

    function handleDelete(e) {
        e.preventDefault();
        fetch(`/delete-friend-request/${id}.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id,
                userId,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return setErrorMessage(<>Something went wrong.</>);
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                console.log(data);
                setR((r) => !r);
                return;
            })
            .catch(() => {});
    }

    function handleAccept(e) {
        e.preventDefault();
        fetch(`/accept-friend-request/${id}.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id,
                userId,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return setErrorMessage(<>Something went wrong.</>);
                } else {
                    return res.json();
                }
            })
            .then((data) => setR((r) => !r))
            .catch(() => {});
    }

    function handleReject(e) {
        e.preventDefault();
        fetch(`/reject-friend-request/${id}.json`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id,
                userId,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return setErrorMessage(<>Something went wrong.</>);
                } else {
                    return res.json();
                }
            })
            .then((data) => setR((r) => !r))
            .catch(() => {});
    }

    const Button = () => {
        if (!isSent) {
            return (
                <button onClick={makeFriendRequest}>Make friend request</button>
            );
        }
        if (isAccept) {
            return <button onClick={handleDelete}>Unfriend</button>;
        } else {
            if (isSender) {
                return <button onClick={cancelRequest}>Cancel Request</button>;
            }
            return (
                <div>
                    <button onClick={handleAccept}>Accept </button>
                    <button onClick={handleReject}>Reject </button>
                </div>
            );
        }
    };
    return (
        <>
            <h3> {errorMessage} </h3>
            <Button />
        </>
    );
}
