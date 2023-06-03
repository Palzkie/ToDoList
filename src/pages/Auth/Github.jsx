import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Github() {
  const [params] = useSearchParams();
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const getToken = async () => {
    try {
      const code = params.get("code");
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/github?code=${code}`,
        {
          method: "GET",
          headers: { "Content-Type": "aplication/json" }
        }
      );
      const json = await res.json();

      if (!res.ok) {
        toast.error("Authentication Failed! Please try again. Error: " + json);
        navigate("/auth/login");
        return;
      }

      //   Save jwt to localstorage
      localStorage.setItem("user", JSON.stringify(json));

      //   update auth context
      dispatch({ type: "LOGIN", payload: json });
    } catch (e) {
      toast.error("Authentication Failed!");
      console.log(e);
      navigate("/auth/login");
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return <LoadingScreen />;
}
