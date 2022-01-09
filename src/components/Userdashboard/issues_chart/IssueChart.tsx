import React from "react";
import { Chart } from "react-google-charts";

export default function IssueChart() {
  return (
    <div className="chartpie">
      <Chart
        width={"30vw"}
        height={"35vh"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Task", "Hours per Day"],
          ["A", 10],
          ["B", 16],
          ["C", 5],
          ["D", 4],
          ["E", 4],
        ]}
        options={{
          title: "",
          backgroundColor: "transparent",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

// export default IssueChart

// const ChartPie = () => {
//     return (

//     )
// }
// export default ChartPie;
