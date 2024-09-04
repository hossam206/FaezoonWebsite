import axios from "axios";

export const VerifyLogin = async (UserData) => {
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
    console.log("Response:", response);
    return response.data; // Return only the response data
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};
