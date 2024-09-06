import axios from "axios";

export const VerifyLogin = async (UserData) => {
  // Log UserData before sending
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/login",
      UserData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    // console.error("Error message:", error.message); // Log the error message
 

    // throw error; // Rethrow the error to handle it in the calling function
  }
};
