import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CompletedtaskCard from './CompletedtaskCard';

const Completed = () => {

        const { data: completedTasks = [], refetch, isLoading } = useQuery({
            queryKey: ["completedtasks"],
            queryFn: async () => {
              try {
                const res = await fetch("http://localhost:5000/completedtasks?completed=true");
                const data = res.json();
                return data;
              } catch (error) {}
            },
          });


    return (
        <div>
            <h1 className='text-2xl text-center font-bold mt-10'>Completed Tasks</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 my-10 lg:my-0'>
            {
                completedTasks.map(completedTask => <CompletedtaskCard key={completedTask.key} completedTask={completedTask}></CompletedtaskCard>)
            }
            </div>
        </div>
    );
};

export default Completed;