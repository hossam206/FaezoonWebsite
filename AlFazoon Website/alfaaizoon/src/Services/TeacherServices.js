import axios from "axios";

// Function to get all teachers
export const GetAllTeachers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/teachers");
    return response.data; // Assuming response.data contains the list of teachers
  } catch (error) {
    console.error("Failed to fetch teachers:", error); // Use console.error for errors
    throw error; // Rethrow error to handle it in the calling function if needed
  }
};

// start Function Add New Teacher Data
export const addNewTeacher = async (postData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/teacher",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error:", error.data);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// start Function Edit Teacher
export const updateTeacher = async (TeacherId, UpdatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/teacher/${TeacherId}`,
      UpdatedData
    );
    GetAllTeachers();
    console.log("Item updated successfully:", response.data);
  } catch (error) {
    console.log(error);
  }
};
// Function Delete Teacher
export const DeleteTeacher = async (TeacherId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/teacher/${TeacherId}`
    );
    return response.data;
  } catch (error) {
    console.log(error.data);
  }
};

// start get all Students Count
export const getTeachersCount = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/teachers/Count"
    );
    return response.data; // Assuming response.data contains the list of students
  } catch (error) {
    console.error("Failed to fetch students:", error.data); // Use console.error for errors
    throw error; // Rethrow error to handle it in the calling function if needed
  }
};
