import ListTasks from "../../components/DashboardTasks/ListTasks/ListTasks.tsx";
import TaskCollaps from "../../components/DashboardTasks/Task/TaskCollaps.tsx";
import React from "react";
import {dummyData} from "../../mock/mock.ts";

const DashboardTasks = () => {
    const [data, setData] = React.useState(dummyData);

    return (
        <div className="p-10 flex flex-col h-screen">
            <h1 className="font-semibold text-3xl py-2">Trello-Style Drag & Drop</h1>
            <p>Let's drag some cards around!</p>
            <div className="flex items-start -mx-2 overflow-x-scroll h-full">
                {data.map((list, listPosition) => {
                    return (
                        <ListTasks key={list.id} name={list.name}>
                            {data[listPosition].cards.map((card) => {
                                return (
                                    <TaskCollaps key={card.id} title={card.title}/>
                                );
                            })}
                        </ListTasks>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardTasks;