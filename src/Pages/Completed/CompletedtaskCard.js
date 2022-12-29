import React from 'react';
import { BiCalendar } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";

const CompletedtaskCard = ({completedTask}) => {
    const { image, name, description, date, time } = completedTask;
    return (
        <div class="flex mt-10 lg:mb-40 items-center">
      <div class="group relative mx-auto w-3/4 lg:w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-md">
        <div class="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible "></div>
        <div class="relative rounded-[15px] bg-white p-6">
          <div class="space-y-4">
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
          <div>
            
          </div>
        </div>
      </div>
    </div>
    );
};

export default CompletedtaskCard;