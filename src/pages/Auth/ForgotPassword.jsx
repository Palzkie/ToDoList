import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import useResetPass from "../../hooks/useResetPass";
import { useState } from "react";
import FetchLoading from "../../components/FetchLoading/FetchLoading";

export default function ForgotPassword() {
  const { isLoading, sendResetCode } = useResetPass();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSendMail = (e) => {
    e.preventDefault();
    sendResetCode(email, () => navigate(`/auth/forgot-password/code/${email}`));
  };
  return (
    <div className="forgot_password center col">
      {isLoading ? <FetchLoading /> : null}
      <h1>Forgot Password</h1>
      <div>
        Enter the email address associated with your
        <br /> account and we'll send you a link to reset
        <br /> your password.
      </div>

      <form onSubmit={handleSendMail}>
        <div className="grp center col">
          <label>EMAIL</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <button>SEND</button>
        </div>
      </form>
      <Link to={-1}>Back</Link>
    </div>
  );
}
