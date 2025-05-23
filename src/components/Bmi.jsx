import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;
const data = [
    { name: "A", value: 18.5, color: "#0000ff" },
    { name: "B", value: 6.4, color: "#00ff00" },
    { name: "C", value: 5, color: "#FFA500" },
    { name: "D", value: 15, color: "#ff0000 " },
];
const cx = 100;
const cy = 100;
const iR = 40;
const oR = 100;

const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
        total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
        <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path
            d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
            stroke="#none"
            fill={color}
        />,
        <text
            key="needle-value"
            x={x0}
            y={y0 + 20} // Position the text below the needle base
            textAnchor="middle"
            fontSize="16"
            fill="#000">
            {value.toFixed(1)} {/* Display the value with one decimal place */}
        </text>,
    ];
};

export default class Bmi extends PureComponent {
    render() {
        const { value } = this.props;
        return (
            <PieChart width={280} height={150}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                {needle(value, data, cx, cy, iR, oR, "#d0d000")}
            </PieChart>
        );
    }
}
