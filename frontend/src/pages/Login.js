import LoginForm from "../components/loginForm";
import Navbar from "../components/Navbar";

const LoginPage = () => {
    return (
        <div>
           <Navbar />
           <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
        </div>
    );
};

export default LoginPage;
