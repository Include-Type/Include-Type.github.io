import React from "react";
import "./issuelist.css";
import ChartPie from "./issues-graph";



export default function Issueslist() {
    return (
        <div className="issue-list">
            <h1>Issue List</h1>
            <div className="piecharts">
                <ChartPie/>

            </div>
        </div>
    );
};