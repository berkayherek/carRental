import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";  // ✅ Correct path
import "../styles/login.css"; // ✅ Make sure this file exists!

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("🔄 Login button clicked!");
    
        setLoading(true);
        setError("");

        try {
            const session = await login(email, password);
            console.log("✅ Appwrite Session:", session);

            if (session) {
                localStorage.setItem("token", session.$id); // Store session ID
                localStorage.setItem("userId", session.userId); // Store user ID
                navigate("/profile");  // Redirect to profile
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (err) {
            console.error("❌ Login failed:", err.message);
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
