import axios from "axios";
//import {jwt} from 'jwt-decode'

const Token = JSON.parse(localStorage?.getItem("Maintoken"));
// const Token = localStorage.getItem("Maintoken");


export const GetAllTeachers = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/teachers",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data; // Assuming response.data contains the list of teachers
  } catch (error) {
    // console.error("Failed to fetch teachers:", error); // Use console.error for errors
    // throw error; // Rethrow error to handle it in the calling function if needed
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
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    console.log("Response:", response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    // console.error("Error:", error.data);
    // throw error; // Rethrow error to handle it in the calling function
  }
};

// start Function Edit Teacher
export const updateTeacher = async (TeacherId, UpdatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/teacher/${TeacherId}`,
      UpdatedData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    GetAllTeachers();
    // console.log("Item updated successfully:", response.data);
  } catch (error) {
    // console.log(error);
  }
};
// Function Delete Teacher
export const DeleteTeacher = async (TeacherId) => {
  try {
    let Token = localStorage.getItem("Maintoken");
    Token = Token.slice(1, -1)
    //console.log(`Bearer ${Token}`) // Ensure token is retrieved from localStorage
    //Log token for debugging

    const response = await axios.delete(
      `http://localhost:3000/api/v1/teacher/d/${TeacherId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`
        },
      }
    );
    // console.log("Response data:", response.data); // Log response data
    return response.data;

  } catch (error) {
    console.error(
      "Failed to delete teacher:",
      error.response ? error.response.data : error
    );
    throw error; // Optionally rethrow the error to handle it elsewhere
  }
};

// start get all Students Count
export const getTeachersCount = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/teachers/Count",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    return response.data; // Assuming response.data contains the list of students
  } catch (error) {
    // console.error("Failed to fetch students:", error.data); // Use console.error for errors
    // throw error; // Rethrow error to handle it in the calling function if needed
  }
};
