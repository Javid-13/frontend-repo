import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("https://backend-repo-xd30.onrender.com/", {
                email, password
            });

            if (response.data.exits === true) {
                navigate(`/home/${response.data.data._id}`);
            } else {
                alert("User has not signed up");
            }
        } catch (error) {
            alert("Wrong details. Please try again.");
            console.error(error);
        }
    }

    return (
        <div className="login container">
            <h1>Login</h1>
            <form>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="showPassword"
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="form-check-label" htmlFor="showPassword">Show Password</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={submit}>Log In</button>
            </form>
            <div className="mt-4">
                <p>OR</p>
                <Link to="/signup" className="btn btn-secondary">Signup Page</Link>
            </div>
        </div>
    );
}

export default Login;
