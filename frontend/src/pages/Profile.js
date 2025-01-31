import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/userService";
import ProfileView from "../components/profileView";
import Navbar from "../components/Navbar";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            if (!userData) {
                navigate("/login"); // Redirect if not logged in
            } else {
                setUser(userData);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div>
             <div>
             <Navbar />
            <h1>Profile</h1>
            <ProfileView user={user} onLogout={handleLogout} />
        </div>
        </div>
    );
};

export default Profile;
