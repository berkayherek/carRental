import "../styles/Profile.css";

const ProfileView = ({ user, onLogout }) => {
    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h2>Welcome, {user.name}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Country:</strong> {user.country}</p>
                <p><strong>City:</strong> {user.city}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <button onClick={onLogout} className="logout-button">Logout</button>
            </div>
        </div>
    );
};

export default ProfileView;
