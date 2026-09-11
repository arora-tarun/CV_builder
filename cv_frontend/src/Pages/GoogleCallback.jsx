import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios.js";

export default function GoogleCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("cv_token", token);

    // Fetch logged-in user
    API.get("/auth/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const user = res.data.user;
        localStorage.setItem("cv_user", JSON.stringify(user));
        dispatch(setUser({ user, token }));
        navigate("/dashboard");
      })
      .catch(() => {
        navigate("/login");
      });
  }, [
    dispatch,
    navigate
  ]);

  return <p className="text-center mt-20">Signing you in...</p>;
}
