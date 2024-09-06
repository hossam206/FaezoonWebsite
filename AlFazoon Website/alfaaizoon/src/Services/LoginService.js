import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();

  const VerifyLogin = (UserData) => {
    // Log UserData before sending
    try {
      axios.post(
        "http://localhost:3000/api/v1/login",
        UserData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(
        (response) => {
          const decodedToken = jwtDecode(response.data.token);
          localStorage.setItem("token", JSON.stringify(decodedToken));
          localStorage.setItem("Maintoken", JSON.stringify(response.data.token));

          if (decodedToken.role == "admin") {
            navigate("/Dashboard");
          } else if (decodedToken.role == "user") {
            navigate("/UserPage");
          }
        }
      )

    } catch (error) {
      console.error("Error message:", error.message); // Log the error message
      // throw error; // Rethrow the error to handle it in the calling function
    }
  };

  return { VerifyLogin }
}

export default useLogin