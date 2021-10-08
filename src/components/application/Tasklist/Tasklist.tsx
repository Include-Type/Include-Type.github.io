import React, { useState } from 'react'
import "./Tasklist.css";
import EachTask from "./Task/Task"
import { Task } from "./Task/TaskInterface"

export default function Tasklist() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "1",
            projName: "Project Name",
            title: "Task Title 1",
            date: 'July-05-2021',
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
            deadline: 'Feb-10-2021',
            assigned: "Adam - Eve",
            read: true,
            priority: "High"
        },
        {
            id: "2",
            projName: "Project Name",
            title: "Task Title 2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas aperiam repellendus unde.",
            date: 'July-05-2021',
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
            deadline: 'Feb-10-2021',
            assigned: "Adam - Eve",
            read: true,
            priority: "Medium"
        },
        {
            id: "3",
            projName: "Project Name",
            title: "Task Title 3",
            date: 'July-05-2021',
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
            deadline: 'Feb-10-2021',
            assigned: "Adam - Eve",
            read: true,
            priority: "Low"
        },
        {
            id: "4",
            projName: "Project Name",
            title: "Task Title 4",
            date: 'July-05-2021',
            details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
            deadline: 'Feb-10-2021',
            assigned: "Adam - Eve",
            read: true,
            priority: "Medium"
        }
    ]);

    return (
        <section id="Application_page">
            <section id="Status"></section>
            <section id="Main_area">
                <section id="Application_menu_area"></section>
                <section id="Application_content_area">
                    <div className="tasklist_outer_container">
                        <div className="tasklist_container">
                            {tasks.length !== 0 ? (
                                <div className="for_scroll">
                                    {tasks.map((task: Task) => (
                                        <EachTask
                                            key={task.id}
                                            data={task}
                                            tasks={tasks}
                                            setTasks={setTasks}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="empty_text">You're all caught up!<br></br>🚀</p>
                            )}
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}
