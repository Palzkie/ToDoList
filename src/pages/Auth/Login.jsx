import "./auth.css";
import bg_image from "../../assets/bg_image.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import FetchLoading from "../../components/FetchLoading/FetchLoading";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function App() {
  const { isLoading, login, loginToGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleGithubLogin = async () => {
    const githubURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT}&scope=user`;
    window.open(githubURL, "_self");
  };

  const responseGoogle = (response) => {
    try {
      const userObject = jwt_decode(response.credential);
      const { name, email, jti } = userObject;
      const doc = {
        name,
        email,
        password: jti
      };
      loginToGoogle(doc);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login_page">
      {isLoading ? <FetchLoading text="Logging In" /> : null}
      <div className="left center">
        <img src={bg_image} alt="todolist" />
      </div>
      <div className="right center">
        <h1>Welcome to</h1>
        <h1>To Do List</h1>
        <form onSubmit={handleLogin} className="center col">
          <div className="grp center col">
            <label>EMAIL</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </div>
          <div className="grp center col">
            <label>PASSWORD</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <Link to="/auth/forgot-password">Forgot password?</Link>

          <button>LOGIN</button>

          <span>
            Don't have an account? <Link to="/auth/register">Register now</Link>
          </span>
        </form>
        <h4 style={{ marginTop: 20 }}>OR</h4>

        <div
          className="center"
          style={{ gap: 10, alignItems: "center", flexDirection: "column" }}
        >
          <GoogleLogin
            text="continue_with"
            locale="en"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />

          <button onClick={handleGithubLogin} className="auth-btn github-btn">
            {/* <img src={githubSVG} alt="Github" /> */}
            <BsGithub />
            <span>Continue with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}
