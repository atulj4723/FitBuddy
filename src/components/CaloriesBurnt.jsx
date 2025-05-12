import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#00ff00", "#fff"];

export default function CaloriesBurnt({ totalCalories, remaining }) {
 

    // Data for the PieChart
    const data = [
        { name: "Group A", value: totalCalories },
        { name: "Group B", value: remaining },
    ];

    return (
        <div style={{ textAlign: "center" }}>
            <PieChart
                width={200}
                height={170}
                style={{ backGroundColor: "red" }}>
                <Pie
                    data={data}
                    cx={90}
                    cy={90}
                    startAngle={225}
                    endAngle={-45}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                    stroke="#000" // Border color
                    strokeWidth={0.5}>
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                {/* Display values at the center of the circle */}
                <text
                    x={95}
                    y={90}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#333">
                    {totalCalories}/
                </text>
                <text
                    x={95}
                    y={110}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#333">
                    {totalCalories + remaining}
                </text>
                <text
                    x={95}
                    y={125}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#333">
                    Calories
                </text>
                <text
                    x={95}
                    y={140}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#333">
                    Burnt
                </text>
            </PieChart>
        </div>
    );
}
