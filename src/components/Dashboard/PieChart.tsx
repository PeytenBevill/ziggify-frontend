import React, { PureComponent, ReactNode } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
  { name: "Hats", value: 400 },
  { name: "Shirts", value: 300 },
  { name: "Pants", value: 300 },
  { name: "Shoes", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
}

const renderCustomizedLabel: React.FC<CustomizedLabelProps> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "12px" }}
    >
      {`${(percent * 100).toFixed(0)}%`}
      {/* {`${name}`} */}
    </text>
  );
};

interface PieChartExampleProps {}

class PieChartExample extends PureComponent<PieChartExampleProps> {
  render(): ReactNode {
    return (
      <ResponsiveContainer height={300} width={200}>
        <PieChart style={{ height: "500px", width: "500px" }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <>
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  onClick={() => console.log(entry)}
                />
              </>
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default PieChartExample;
