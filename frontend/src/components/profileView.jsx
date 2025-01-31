import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProfileView = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Country: {user.country}</p>
            <p>City: {user.city}</p>
            <p>Phone: {user.phone}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default ProfileView;
