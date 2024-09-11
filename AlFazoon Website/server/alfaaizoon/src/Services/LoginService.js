import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { config } from "./../../config";
// import dotenv from "dotenv";
// dotenv.config();
// const host = process.env.REACT_APP_HOST;


const useLogin = () => {

  const navigate = useNavigate();

  // const VerifyLogin = (UserData) => {
  //   // Log UserData before sending
  //   try {
  //     axios
  //       .post("http://localhost:3000/api/v1/login", UserData, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           const decodedToken = jwtDecode(response.data.token);
  //           localStorage.setItem("token", JSON.stringify(decodedToken));
  //           localStorage.setItem("Maintoken", response.data.token); // Store token as a string, not JSON

  //           if (decodedToken.role == "admin") {
  //             navigate("/Dashboard");
  //             // window.location.reload(); // This forces a full page reload to ensure the token is accessed
  //           } else if (decodedToken.role == "user") {
  //             navigate("/UserPage");
  //             // window.location.reload(); // This forces a full page reload
  //           }
  //         } else {
  //           throw new Error("Invalid credentials or server error");
  //         }
  //       });
  //   } catch (error) {
  //     console.error("Error message:", error.message); // Log the error message
  //     throw error; // Rethrow the error to handle it in the calling function
  //   }
  // };

  const VerifyLogin = (UserData) => {
  //  console.log(config.REACT_APP_HOST)
    // console.log(host)
    return new Promise((resolve, reject) => {
      console.log(`${config.REACT_APP_HOST}:${config.REACT_APP_PORT}`)
     // console.log(`http://localhost:3000/api/v1/login`)
      //console.log(`${config.API_URI}/api/v1/login`)

      //  console.error(process.env.REACT_APP_HOST)
      axios
        .post(`${config.REACT_APP_HOST}:${config.REACT_APP_PORT}/api/v1/login`, UserData, {
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
              resolve("admin");
              // navigate("/Dashboard"); // Resolve the promise for an admin role
            } else if (decodedToken.role === "user") {
              resolve("user");
              // navigate("/UserPage"); // Resolve the promise for a user role
            }
          } else {
            reject(new Error("Invalid credentials or server error")); // Reject the promise
          }
        })
        .catch((error) => {
          reject(error); // Reject the promise with any network or server errors
        });
    });
  };

  return { VerifyLogin };
};

export default useLogin;
