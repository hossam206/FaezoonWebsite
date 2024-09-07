import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();

  const VerifyLogin = (UserData) => {
    // Log UserData before sending
    try {
      axios
        .post("http://localhost:3000/api/v1/login", UserData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const decodedToken = jwtDecode(response.data.token);
            localStorage.setItem("token", JSON.stringify(decodedToken));
            localStorage.setItem("Maintoken", response.data.token); // Store token as a string, not JSON
            // console.log("Token stored:", localStorage.getItem("Maintoken"));
            // Force re-fetch or re-render
            if (decodedToken.role === "admin") {
              navigate("/Dashboard");
              window.location.reload(); // This forces a full page reload to ensure the token is accessed
            } else if (decodedToken.role === "user") {
              navigate("/UserPage");
              window.location.reload(); // This forces a full page reload
            }
          } else {
            throw new Error("Invalid credentials or server error");
          }
        });
    } catch (error) {
      // console.error("Error message:", error.message); // Log the error message
      // throw error; // Rethrow the error to handle it in the calling function
    }
  };

  return { VerifyLogin };
};

export default useLogin;
