import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import { AuthContext } from "../../Contexts/Authprovider";

const Addtask = () => {
    const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("10:00");
  console.log(value)
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const imgHostKey = process.env.REACT_APP_imgbb_secret_key;

  const handleAddProduct = (data) => {
    const formdata = new FormData();
    const name = data.name;
    const description = data.description;

    formdata.append("image", data.image[0]);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((imgdata) => {
        if (imgdata.success) {
          const newTask = {
            name,
            description,
            image: imgdata.data.url,
            time: value,
            date: startDate.getDate()+"-"+startDate.getMonth()+"-"+startDate.getUTCFullYear(),
            email: user.email
          };
          fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newTask),
          })
            .then((res) => res.json())
            .then((data) => {
              setLoading(false);
              toast.success("New Task added successfully");
              navigate("/");
            })
            .catch((err) => console.error(err));
        }
      });
  };

  return (
    <div className="mb-5">
      <div className="min-h-screen rounded-2xl bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  i
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Add a Task</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Fill up the form below to add your task
                  </p>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(handleAddProduct)}
                className="divide-y divide-gray-200"
              >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Name</label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "Task name is required",
                      })}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Task Name"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Photo</label>
                    <input
                      type="file"
                      {...register("image")}
                      className=" px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <label className="leading-loose">Enter Date</label>
                      <div className="relative focus-within:text-gray-600 text-gray-400">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        />
                        {/* <input type="text" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020"/> */}
                        <div className="absolute left-3 top-2">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">Enter Time</label>
                      <div className="relative focus-within:text-gray-600 text-gray-400">
                        <TimePicker onChange={onChange} value={value} required={true}/>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Task Description</label>
                    <input
                      type="text"
                      {...register("description", {
                        required: "Task description is required",
                      })}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Enter Task description"
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  {loading ? (
                    <div class="relative w-full">
                      <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
                        <div class="flex">
                          <div class="flex-shrink-0">
                            <svg
                              class="h-4 w-4 text-blue-400 mt-0.5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                          </div>
                          <div class="ml-3">
                            <h3 class="text-sm text-blue-800 font-medium">
                              Attention needed
                            </h3>
                            <div class="text-sm text-blue-700 mt-2">
                              <span class="font-semibold">Please Wait!</span>{" "}
                              Your task is being added.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="absolute top-0 left-0 w-full h-full bg-white/[.5] rounded-md dark:bg-gray-800/[.4]"></div>

                      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div
                          class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                          role="status"
                          aria-label="loading"
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="submit"
                      value="Create"
                      className="bg-yellow-200 flex justify-center items-center w-full text-yellow-700 px-4 py-3 rounded-md focus:outline-none hover:cursor-pointer"
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addtask;
