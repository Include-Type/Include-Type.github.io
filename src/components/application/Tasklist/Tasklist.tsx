import React from 'react'
import "./tasklist.css";
import EachTask from "./Task/Task"
import {Task} from "./Task/TaskInterface"

export default function Tasklist() {
    const tasks: Task[] = [
        {
        proj_name: "Project Name",
        title: "Task Title 1",
        date: 'July-05-2021',
        details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
        deadline: 'Feb-10-2021',
        assigned: "Adam and Eve",
        read: true,
        important: true
        },
        {
        proj_name: "Project Name",
        title: "Task Title 2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas aperiam repellendus unde.",
        date: 'July-05-2021',
        details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
        deadline: 'Feb-10-2021',
        assigned: "Adam and Eve",
        read: true,
        important: true
        },
        {
        proj_name: "Project Name",
        title: "Task Title 3",
        date: 'July-05-2021',
        details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
        deadline: 'Feb-10-2021',
        assigned: "Adam and Eve",
        read: true,
        important: true
        },
        {
        proj_name: "Project Name",
        title: "Task Title 4",
        date: 'July-05-2021',
        details: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam magnam illum voluptatum voluptatem unde amet deserunt recusandae dolorum totam veritatis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam asperiores quo nobis placeat suscipit aperiam, distinctio adipisci aut saepe alias eum doloremque impedit! Ex atque cupiditate animi! Itaque eaque rem expedita vitae nisi numquam. Magni error omnis minima possimus, exercitationem ab ducimus, accusantium illo veritatis provident eum sed porro?",
        deadline: 'Feb-10-2021',
        assigned: "Adam and Eve",
        read: true,
        important: true
        }
    ]

    return (
        <div className="tasklist_outer_container">
            {/* <div className="for_scroll"> */}
                <div className="tasklist_container">
                    {tasks.map((task: Task) => (
                        <EachTask key={task.title} data={task}/>
                    ))}
                </div>
            {/* </div> */}
        </div>
    )
}

