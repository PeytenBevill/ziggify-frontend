import * as React from "react";
import Box from "@mui/material/Box";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { numData, label } from "./dataOne";
import { ChartsYAxis } from "@mui/x-charts";

export default function SwitchSeriesType() {
  const [type] = React.useState<"line" | "bar">("line");

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "5px",
        marginRight: "1rem",
        height: "100%",
        cursor: "pointer",
      }}
      className="shadow-lg"
    >
      <div>
        <ResponsiveChartContainer
          series={[
            {
              type,
              data: numData,
            },
          ]}
          xAxis={[
            {
              data: label,
              scaleType: "band",
              id: "x-axis-id",
            },
          ]}
          height={300}
        >
          <LinePlot />
          <ChartsXAxis
            label="Daily Revenue"
            position="bottom"
            axisId="x-axis-id"
          />
          <ChartsYAxis />
        </ResponsiveChartContainer>
      </div>
    </Box>
  );
}
