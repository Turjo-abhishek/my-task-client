import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BiCalendar } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

const CompletedtaskCard = ({ completedTask, refetch }) => {
  const { image, name, description, date, time, _id } = completedTask;

  const {handleSubmit, register} = useForm();

  const handleComment = (data) => {
    
  }

  const handleDelete = (_id) => {
    fetch(`http://localhost:5000/tasks/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.deletedCount > 0) {
          refetch();
          toast.success(`Task deleted successfully`);
        }
      });
  };

  return (
    <div className="flex mt-10 lg:mb-40 items-center">
      <div className="group relative mx-auto w-3/4 lg:w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-md">
        <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible "></div>
        <div className="relative rounded-[15px] bg-white p-6">
          <div className="space-y-4">
            <img src={image} alt="" className="w-full h-44 rounded-xl" />
            <p className="text-lg font-semibold text-slate-800">{name}</p>
            <p className="font-md text-slate-500">{description}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="flex justify-center items-center gap-1 font-md text-orange-600">
              <BiCalendar></BiCalendar> {date}
            </p>
            <p className="flex justify-center items-center font-md text-orange-600">
              <MdOutlineWatchLater></MdOutlineWatchLater> {time}
            </p>
          </div>
          <button
            onClick={() => handleDelete(_id)}
            className="px-4 py-2 text-sm mt-3 text-red-100 rounded-md bg-gradient-to-r from-red-700 to-red-500 flex gap-1 items-center"
          >
            Delete Task<MdOutlineCancel className="text-xl"></MdOutlineCancel>
          </button>
          <div className="inline-flex justify-center items-center w-full">
            <hr className="my-5 w-full h-px bg-gray-400 rounded border-0" />
            <div className="absolute left-1/2 px-4 bg-white -translate-x-1/2 dark:bg-gray-900">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-700 dark:text-gray-300"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleComment)}>
            <div class="w-full mb-4 rounded-lg ">
              <div>
                <input
                {...register("comment")}
                  type="text"
                  placeholder="Your Comment"
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div class="flex items-center justify-between px-0 py-2 border-t dark:border-gray-600">
                <button
                  type="submit"
                  class="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Post comment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompletedtaskCard;
