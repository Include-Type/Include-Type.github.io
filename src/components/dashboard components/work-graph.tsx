import React from "react";
import { Chart } from "react-google-charts";

const ChartPie = () => {
    return (
        <div className="chartpie">
            <Chart
                width={'30vw'}
                height={'35vh'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Task', 'Hours per Day'],
                    ['A', 11],
                    ['B', 6],
                    ['C', 5],
                    ['D', 4],
                    ['E', 7],
                ]}
                options={{
                    title: '',
                    backgroundColor: "transparent"
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}
export default ChartPie;