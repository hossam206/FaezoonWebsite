import React, { useRef, useState, useEffect } from "react";
import PopUpMassage from "./PopUpMassage";
import swal from "sweetalert2";
import {
  addStudent,
  editStudent,
  getStudents,
  deleteStudent,
} from "../Services/StudentService";
const initialContent = {
  firstName: "",
  middleName: "",
  lastName: "",
  age: "",
  birthDay: "",
  address: "",
  nationality: "",
  ClassNum: "",
  TeacherName: "",
  whatsapp: "",
  phone: "",
};

export default function Students() {
  const FormRef = useRef(null);
  const [formData, setFormData] = useState(initialContent);
  const [selectedStudent, setselectedStudent] = useState("");
  const [AllStudents, setStudents] = useState([]);

  // start function to get student data to updata on clicking
  const handleStudentClick = (e, StudentDetails) => {
    e.preventDefault();
    setselectedStudent(StudentDetails);
    setFormData({
      ...initialContent,
      ...StudentDetails,
    });
  };

  // Load all teachers
  const fetchStudents = async () => {
    try {
      const Students = await getStudents(); // Ensure GetAllTeachers returns a promise
      setStudents(Students);
    } catch (error) {
      console.error("Failed to fetch Students:", error);
    }
  };
  // start function collect data from form
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Function to format the date as YYYY/MM/DD
  const formatDate = (inputDate) => {
    console.log(inputDate);

    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };
  // function to execute an action
  const handleSubmit = async (e) => {
    const formattedDate = formatDate(formData.birthDay);
    const dataToSubmit = { ...formData, birthDay: formattedDate };
    try {
      e.preventDefault();
      if (selectedStudent) {
        await editStudent(selectedStudent._id, dataToSubmit);
        fetchStudents();
      } else {
        await addStudent(dataToSubmit);
        fetchStudents();
      }

      FormRef.current.reset();
      setFormData(initialContent);
      setselectedStudent(null);
    } catch (error) {
      console.log(error);
    }
  };
 

  // Confirm delete Student
  const confirmDelete = (e, StudentId) => {
    e.preventDefault();
    swal
      .fire({
        title: "Are You Sure You Want To Delete?",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Implement Delete Student function as needed
          deleteStudent(StudentId);
          fetchStudents();
        }
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8">
        <div className="mx-auto ">
          <h1 className="text-textColor text-xl font-medium py-2">Students</h1>
          <div className="bg-gray-100  p-4 rounded-lg">
            <div className="overflow-x-auto">
              {!AllStudents.length == 0 ? (
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-200 ">
                    <tr>
                      <th className="px-4 py-2 border-b-2 border-gray-300 text-center">
                        name
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-300 text-center">
                        Age
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-300 text-center">
                        Class Num
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-300 text-center">
                        Joining Date
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-300 text-center">
                        Nationality
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-300 text-center">
                        parent Number
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-300 text-center">
                        Whats Number
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-300 text-center">
                        Update
                      </th>
                      <th className="px-4 py-2 border-b-2 border-gray-300 text-center">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {AllStudents?.map((student) => (
                      <tr className="odd:bg-gray-50" key={student._id}>
                        <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">
                          {student.firstName} {student.middleName}{" "}
                          {student.lastName}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                          {student.age}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                          {student.ClassNum}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                          {student.birthDay}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                          {student.nationality}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                          {student.phone}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                          {student.whatsapp}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                          <a
                            href="#"
                            onClick={(e) => handleStudentClick(e, student)}
                            className="inline-block w-full rounded hover:shadow-2xl text-xs  bg-sky-600  hover:bg-sky-500  px-4 py-2 font-medium text-white sm:w-auto"
                          >
                            Update
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                          <a
                            onClick={(e) => confirmDelete(e, student._id)}
                            href="#"
                            className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-400"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-xl font-bold text-textColor">
                  There is No Students
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" gap-x-16 gap-y-8  md:py-8 py-4">
          <h1 className="text-textColor text-xl font-medium py-2">
            Student Form
          </h1>
          <div className="rounded-lg bg-gray-100 p-8 shadow-lg   lg:p-12">
            <form
              action="#"
              className="space-y-4"
              onSubmit={handleSubmit}
              ref={FormRef}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="">
                  <input
                    onChange={handleChange}
                    value={formData.firstName}
                    name="firstName"
                    className="Dashboardinput"
                    placeholder="First Name"
                    type="text"
                    required
                  />
                </div>
                <div className="">
                  <input
                    onChange={handleChange}
                    value={formData.middleName}
                    name="middleName"
                    className="Dashboardinput"
                    placeholder="Second Name"
                    type="text"
                    required
                  />
                </div>
                <div className="">
                  <input
                    onChange={handleChange}
                    value={formData.lastName}
                    name="lastName"
                    className="Dashboardinput"
                    placeholder="Last Name"
                    type="text"
                    required
                  />
                </div>

                <div>
                  <input
                    onChange={handleChange}
                    value={formData.age}
                    name="age"
                    className="Dashboardinput"
                    placeholder="Age"
                    type="number"
                    required
                    min={0}
                  />
                </div>

                <div>
                  <input
                    onChange={handleChange}
                    value={formData.TeacherName}
                    name="TeacherName"
                    className="Dashboardinput"
                    placeholder="Teacher Name"
                    type="text"
                    required
                  />
                </div>

                <div>
                  <input
                    onChange={handleChange}
                    value={formData.ClassNum}
                    name="ClassNum"
                    className="Dashboardinput"
                    placeholder="Class Num "
                    type="number"
                    required
                    min={0}
                  />
                </div>
                <div>
                  <input
                    onChange={handleChange}
                    value={formData.nationality}
                    name="nationality"
                    className="Dashboardinput"
                    placeholder="Nationality"
                    type="text"
                    required
                  />
                </div>

                <div>
                  <input
                    className="Dashboardinput"
                    value={formData.address}
                    placeholder="Address"
                    type="text"
                    onChange={handleChange}
                    name="address"
                    required
                  />
                </div>
                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="Whats app Number"
                    value={formData.whatsapp}
                    type="number"
                    required
                    min={0}
                    onChange={handleChange}
                    name="whatsapp"
                  />
                </div>
                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="Parent Number"
                    value={formData.phone}
                    name="phone"
                    type="number"
                    required
                    min={0}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="Dashboardinput"
                    value={formData.birthDay}
                    type="date"
                    required
                    min={0}
                    onChange={handleChange}
                    name="birthDay"
                  />
                </div>
              </div>

              <div className="mt-4 flex md:flex-row flex-col items-center gap-5 py-3 ">
                <button
                  type="submit"
                  className={`inline-block w-full rounded-lg hover:shadow-2xl   px-5 py-2 font-medium text-white sm:w-auto ${
                    selectedStudent
                      ? "bg-sky-600 hover:bg-sky-400"
                      : "bg-green-600 hover:bg-green-500"
                  }`}
                >
                  {selectedStudent ? "Update" : "     Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


