import React from "react";
import "./workinglist.css";
import ChartPie from "./work-graph";



export default function Workinglist() {
    return (
        <div className="working-list">
            <h1>Work List</h1>
            <div className="piecharts">
                <ChartPie/>

            </div>
        </div>
    );
};