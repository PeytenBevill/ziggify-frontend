import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  xAxis: [
    {
      label: 'Revenue Per Month',
    },
  ],
  width: 800,
  height: 300,
};
const dataset = [
  {
    hats: 59,
    shirts: 57,
    pants: 86,
    monthly: 21,
    month: 'Jan',
  },
  {
    hats: 50,
    shirts: 52,
    pants: 78,
    monthly: 28,
    month: 'Fev',
  },
  {
    hats: 47,
    shirts: 53,
    pants: 106,
    monthly: 41,
    month: 'Mar',
  },
  {
    hats: 54,
    shirts: 56,
    pants: 92,
    monthly: 73,
    month: 'Apr',
  },
  {
    hats: 57,
    shirts: 69,
    pants: 92,
    monthly: 99,
    month: 'May',
  },
  {
    hats: 60,
    shirts: 63,
    pants: 103,
    monthly: 144,
    month: 'June',
  },
  {
    hats: 59,
    shirts: 60,
    pants: 105,
    monthly: 319,
    month: 'July',
  },
  {
    hats: 65,
    shirts: 60,
    pants: 106,
    monthly: 249,
    month: 'Aug',
  },
  {
    hats: 51,
    shirts: 51,
    pants: 95,
    monthly: 131,
    month: 'Sept',
  },
  {
    hats: 60,
    shirts: 65,
    pants: 97,
    monthly: 55,
    month: 'Oct',
  },
  {
    hats: 67,
    shirts: 64,
    pants: 76,
    monthly: 48,
    month: 'Nov',
  },
  {
    hats: 61,
    shirts: 70,
    pants: 103,
    monthly: 25,
    month: 'Dec',
  },
];

const valueFormatter = (value: number) => `${value}mm`;

export default function HorizontalBars() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'monthly', label: 'Monthly Sales', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}