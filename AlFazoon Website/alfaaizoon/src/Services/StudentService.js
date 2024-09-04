import axios from "axios";
import { useState } from "react";

// Get all students
export const getStudents = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/Students");
    return response.data; // Assuming response.data contains the list of students
  } catch (error) {
    console.error("Failed to fetch students:", error.data); // Use console.error for errors
    throw error; // Rethrow error to handle it in the calling function if needed
  }
};
// Add student
export const addStudent = async (newData) => {
  console.log(newData);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/Student",
      newData,
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

// Edit student
export const editStudent = async (studentId, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/Student/${studentId}`,
      updatedData
    );
    getStudents();
    console.log("Item updated successfully:", response.data);
  } catch (error) {
    console.log(error);
  }
};

// Delete student
export const deleteStudent = async (studentId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/Student/${studentId}`
    );
    return response.data;
  } catch (error) {
    console.log(error.data);
  }
};

// start get all Students Count
export const getStudentsCount = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/Students/Count"
    );
    return response.data; // Assuming response.data contains the list of students
  } catch (error) {
    console.error("Failed to fetch students:", error.data); // Use console.error for errors
    throw error; // Rethrow error to handle it in the calling function if needed
  }
};

