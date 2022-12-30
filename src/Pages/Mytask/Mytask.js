import { useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/Authprovider";
import MytaskCard from "./MytaskCard/MytaskCard";
import image from "../../Assets/login.jpg";

const Mytask = () => {
  const {user} = useContext(AuthContext);
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:5000/tasks?email=${user.email}`);
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
      {
        tasks.length === 0 ?
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl font-bold">You haven't added any tasks yet. Please go to <Link to="/addtask"><span className="text-orange-600">Add Tasks</span></Link> to add tasks</p>
        </div>
        :
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-10 lg:mt-10 lg:mb-20">
        {tasks.map((task) => (
          <MytaskCard key={task._id} task={task} refetch={refetch}></MytaskCard>
        ))}
      </div>
      }
    </div>
  );
};

export default Mytask;
