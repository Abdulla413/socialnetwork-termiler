export default function ProfilePicture(props) {
    console.log(props, "profile pictur");
    return (
        <div className="profile-picture">
            <img
                src={props.pic_url || "/profile_pic.png"}
                alt={`${props.firstname} ${props.lastname}`}
                onClick={props.toggleUploader}
            />
        </div>
    );
}
