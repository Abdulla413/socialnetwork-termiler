import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

export default function FindPeople() {
    const [query, setQuery] = useState();
    const [latestPeoples, setLatestPeoples] = useState([]);
    const [peoples, setPeoples] = useState([]);

    useEffect(() => {
        fetch("/newusers.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setLatestPeoples(data);
                console.log(data, "i am data");
            });
    }, []);

    useEffect(() => {
        let ignore = false;

        fetch(`/users.json/?q=${query}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (!ignore) {
                    setPeoples(data);
                }
            })
            .catch(() => {
                setPeoples([]);
            });
        return () => {
            ignore = true;
        };
    }, [query]);

    return (
        <>
            <h3 className="profileh3"> There are some new people is here </h3>
            <div>
                {latestPeoples.map((latestPeople) => (
                    <div
                        className="profile-pic-container"
                        key={latestPeople.firstname}
                    >
                        <div className="profileimage">
                            <img src={latestPeople.pic_url} alt="" />
                            <div>
                                {" "}
                                {latestPeople.firstname} {latestPeople.lastname}{" "}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="searchcontainer">
                <p> Find the people </p>
                <input
                    className="search"
                    type="text"
                    name="people"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div>
                {peoples.map((people) => (
                    <div className="profile-pic-container" key={people.id}>
                        <Route>
                            <Link to={`/user/${people.id}`} key={people.id}>
                                <div className="profileimage">
                                    <img
                                        src={people.pic_url}
                                        alt={people.firstname}
                                        onClick="handleClick"
                                    />
                                    {people.firstname} {people.lastname}
                                </div>
                            </Link>
                        </Route>
                    </div>
                ))}
            </div>
        </>
    );
}
