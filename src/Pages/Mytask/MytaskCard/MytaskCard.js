import { Button } from "flowbite-react";
import React from "react";
import { BiCalendar } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-hot-toast";

const MytaskCard = ({ task, refetch}) => {
  const { image, name, description, date, time, _id, completed } = task;


  const handleCompleted = (_id) => {
    fetch(`http://localhost:5000/tasks/${_id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.modifiedCount > 0){
            refetch();
        }
      });
      
  };

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
  }

  return (
    <div class="">
      <div class="group relative mx-auto w-3/4 lg:w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-md">
        <div class="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
        <div class="relative rounded-[15px] bg-white p-6">
          <div class="">
            <img src={image} alt="" className="w-full h-44 rounded-xl" />
            <p class="text-lg font-semibold text-slate-800">{name}</p>
            <p class="font-md text-slate-500">{description}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p class="flex justify-center items-center gap-1 font-md text-orange-600">
              <BiCalendar></BiCalendar> {date}
            </p>
            <p class="flex justify-center items-center font-md text-orange-600">
              <MdOutlineWatchLater></MdOutlineWatchLater> {time}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            {completed ? (
              <Button
                onClick={() => handleCompleted(_id)}
                gradientDuoTone="redToYellow"
                disabled
              >
                {" "}
                Completed <BsCheck className="text-2xl"></BsCheck>
              </Button>
            ) : (
              <Button
                onClick={() => handleCompleted(_id)}
                gradientDuoTone="redToYellow"
              >
                Mark as Complete <BsCheck className="text-2xl"></BsCheck>
              </Button>
            )}
            <button onClick={() => handleDelete(_id)} className="px-6 py-2 text-red-100 rounded-md bg-gradient-to-r from-red-700 to-red-500 flex gap-1 items-center">Delete <MdOutlineCancel className="text-2xl"></MdOutlineCancel></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MytaskCard;
