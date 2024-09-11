import axios from "axios";
import { config } from "./../../config";
//import {jwt} from 'jwt-decode'

// const Token = localStorage.getItem("Maintoken");

export const GetAllTeachers = async () => {
  try {
    const Token = localStorage.getItem("Maintoken");
    const response = await axios.post(
      `${config.REACT_APP_HOST}:${config.REACT_APP_PORT}/api/v1/teachers`,
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
  const Token = localStorage.getItem("Maintoken");
  try {
    const response = await axios.post(
      `${config.REACT_APP_HOST}:${config.REACT_APP_PORT}/api/v1/teacher`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return { success: true, data: response.data }; // Return success
  } catch (error) {
    // console.error("Error:", error.response?.data || error.message);
    return {
      success: false,

      message: error.response?.data?.message || "Failed to add teacher",
    }; // Return error
  }
};

// start Function Edit Teacher
export const updateTeacher = async (TeacherId, UpdatedData) => {
  const Token = localStorage.getItem("Maintoken");
  try {
    const response = await axios.put(
      `${config.REACT_APP_HOST}:${config.REACT_APP_PORT}/api/v1/teacher/${TeacherId}`,
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


    const response = await axios.delete(
      `${config.REACT_APP_HOST}:${config.REACT_APP_PORT}/api/v1/teacher/d/${TeacherId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    // console.log("Response data:", response.data); // Log response data
    return response.data;
  } catch (error) {
    console.error(
      "Failed to delete teacher:",
      // error.response ? error.response.data : error
    );
    throw error; // Optionally rethrow the error to handle it elsewhere
  }
};
// start get all Students Count
export const getTeachersCount = async () => {
  const Token = localStorage.getItem("Maintoken");
  try {
    const response = await axios.post(
      `${config.REACT_APP_HOST}:${config.REACT_APP_PORT}/api/v1/teachers/Count`,
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
