import { useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import MytaskCard from "./MytaskCard/MytaskCard";

const Mytask = () => {
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/tasks");
        const data = res.json();
        return data;
      } catch (error) {}
    },
  });
  return (
    <div>
      <h1 className="text-2xl text-center font-bold mt-10">My Tasks</h1>
      <Link to="/completed"><Button className="mx-auto mt-3" gradientDuoTone="redToYellow">
        View Completed Tasks
      </Button></Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-10 lg:my-0">
        {tasks.map((task) => (
          <MytaskCard key={task._id} task={task} refetch={refetch}></MytaskCard>
        ))}
      </div>
    </div>
  );
};

export default Mytask;
