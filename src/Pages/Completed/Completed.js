import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/Authprovider";
import CompletedtaskCard from "./CompletedtaskCard";

const Completed = () => {
  const { user } = useContext(AuthContext);

  const {
    data: completedTasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["completedtasks"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/completedtasks?email=${user.email}`
        );
        const data = res.json();
        return data;
      } catch (error) {}
    },
  });

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mt-10">Completed Tasks</h1>
      {
        completedTasks.length === 0 ?
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl font-bold">You haven't added any tasks yet. Please go to <Link to="/addtask"><span className="text-orange-600">Add Tasks</span></Link> to add tasks</p>
        </div>
        :

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-10 lg:my-0">
        {completedTasks.map((completedTask) => (
          <CompletedtaskCard
            key={completedTask._id}
            completedTask={completedTask}
            refetch={refetch}
          ></CompletedtaskCard>
        ))}
      </div>
      }
    </div>
  );
};

export default Completed;
