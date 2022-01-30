export default function friendsReducer(state = null, action) {
    if (action.type === "RECEIVE_FRIENDS_WANNABES") {
        state = action.payload;
        console.log(state, "friends line 6");
        return state;
    }

    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        state = state.map((friend) => {
            console.log(friend, "slice in 12 ");
            if (friend.id === action.payload) {
                return { ...friend, accepted: true };
            }
            return friend;
        });
    }

    if (action.type === "unfriend") {
        state = state.map((friend) => {
            console.log(state, "i am unfriends ");
            if (friend.id != action.payload) {
                return { ...friend, accepted: false };
            }
            return friend;
        });
    }

    return state;
}

export function receiveFriendsWannabes(friendsWannabes) {
    console.log(friendsWannabes, "friendsWannabes");
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        payload: friendsWannabes,
    };
}

export function acceptFriend(friendId) {
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        payload: friendId,
    };
}

export function unFriend(friendId) {
    return {
        type: "unfriend",
        payload: friendId,
    };
}
