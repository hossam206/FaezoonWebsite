import React, { useEffect, useRef, useState } from "react";
import swal from "sweetalert2";
import {
  addNewTeacher,
  DeleteTeacher,
  updateTeacher,
  GetAllTeachers,
} from "../Services/TeacherServices";
const initialContent = {
  firstName: "",
  middleName: "",
  lastName: "",
  age: "",
  birthDay: "",
  address: "",
  nationality: "",
  classID: "",
  phone: "",
  userName: "",
  password: "",
};
export default function Teachers() {
  const formRef = useRef(null);
  const [AllTeachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState(initialContent);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Function to fill data form to update
  const handleTeacherClick = (e, teacherDetails) => {
    e.preventDefault();
    setSelectedTeacher(teacherDetails);
    setFormData({
      ...initialContent,
      ...teacherDetails,
    });
  };

  // Function to collect data from inputs
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTeacher) {
        // Implement updateTeacher function as needed
        await updateTeacher(selectedTeacher._id, formData);
        fetchTeachers();
      } else {
        await addNewTeacher(formData);
        console.log(formData);
        fetchTeachers();
      }
      // Empty form and reset state
      formRef.current.reset();
      setFormData(initialContent);
      setSelectedTeacher(null);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Confirm delete teacher
  const confirmDelete = (e, teacherId) => {
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
          // Implement DeleteTeacher function as needed
          DeleteTeacher(teacherId);
          fetchTeachers();
        }
      });
  };

  // Load all teachers
  const fetchTeachers = async () => {
    try {
      const teachers = await GetAllTeachers(); // Ensure GetAllTeachers returns a promise
      setTeachers(teachers);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  };
  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8">
        <div className="mx-auto ">
          <h1 className="text-textColor text-xl font-medium py-2">Teachers</h1>
          <div className="bg-gray-100  p-4 rounded-lg">
            <div className="overflow-x-auto">
              <div className="rounded-lg border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                  <div className="overflow-x-auto">
                    {!AllTeachers.length == 0 ? (
                      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-left ">
                          <tr>
                            <th className="whitespace-nowrap  px-4 py-2 font-bold text-center text-textColor">
                              Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-textColor">
                              Class Number
                            </th>

                            <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-textColor">
                              Nationality
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-textColor">
                              Mobile
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-textColor">
                              UserName
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-textColor">
                              password
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-textColor">
                              Update
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-textColor">
                              Delete
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                          {AllTeachers?.map((teacher) => (
                            <tr className="odd:bg-gray-50" key={teacher._id}>
                              <td className="whitespace-nowrap px-4 py-2 font-medium  text-center  text-gray-900">
                                {teacher.firstName} {teacher.middleName}{" "}
                                {teacher.firstName}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                {teacher.teacherID}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                {teacher.nationality}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                {teacher.phone}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                {teacher.userName}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                {teacher.password}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                <a
                                  href="#"
                                  onClick={(e) =>
                                    handleTeacherClick(e, teacher)
                                  }
                                  className="inline-block w-full rounded hover:shadow-2xl text-xs  bg-sky-600  hover:bg-sky-500  px-4 py-2 font-medium text-white sm:w-auto"
                                >
                                  Update
                                </a>
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                <a
                                  onClick={(e) => confirmDelete(e, teacher._id)}
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
                        There is No Teachers
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* start Teacher Form */}
        <div className=" gap-x-16 gap-y-8 md:py-8 py-4">
          <h1 className="text-textColor text-xl font-medium py-2">
            Teacher Form
          </h1>
          <div className="rounded-lg bg-gray-100 p-8 shadow-lg   lg:p-12">
            <form
              action="#"
              onSubmit={handleSubmit}
              ref={formRef}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="First Name"
                    type="text"
                    required
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                </div>
                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="Second Name"
                    type="text"
                    required
                    name="middleName"
                    onChange={handleChange}
                    value={formData.middleName}
                  />
                </div>
                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="Third Name"
                    type="text"
                    required
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </div>

                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="Age"
                    type="number"
                    required
                    min={0}
                    name="age"
                    onChange={handleChange}
                    value={formData.age}
                  />
                </div>

                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="Date of join"
                    type="date"
                    required
                    name="birthDay"
                    onChange={handleChange}
                    value={formData.birthDay}
                  />
                </div>

                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="Address"
                    type="text"
                    required
                    name="address"
                    onChange={handleChange}
                    value={formData.address}
                  />
                </div>
                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="Nationality"
                    type="text"
                    required
                    name="nationality"
                    onChange={handleChange}
                    value={formData.nationality}
                  />
                </div>

                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="Teaching Class Number"
                    type="number"
                    required
                    min={0}
                    name="classID"
                    onChange={handleChange}
                    value={formData.classID}
                  />
                </div>
                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="mobile Number"
                    type="number"
                    required
                    min={0}
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </div>
                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="User Name"
                    type="text"
                    required
                    name="userName"
                    onChange={handleChange}
                    value={formData.userName}
                  />
                </div>
                <div>
                  <input
                    className="Dashboardinput"
                    placeholder="password"
                    type="password"
                    required
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
              </div>

              <div className="mt-4 flex md:flex-row flex-col items-center gap-5 py-3 ">
                <button
                  type="submit"
                  className={`inline-block w-full rounded-lg hover:shadow-2xl   px-5 py-2 font-medium text-white sm:w-auto ${
                    selectedTeacher
                      ? "bg-sky-600 hover:bg-sky-400"
                      : "bg-green-600 hover:bg-green-500"
                  }`}
                >
                  {selectedTeacher ? "Update" : "     Add Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
