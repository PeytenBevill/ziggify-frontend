/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        pieChartOne: "#0088FE",
        pieChartTwo: "#00C49F",
        pieChartThree: "#FFBB28",
        pieChartFour: "#FF8042",
        logoYellow: '#F4D26C',
        iconFillOne: '#0087FE4D',
        iconFillTwo: '#00c4a072',
        iconFillThree: '#ffbb2882',
        iconFillFour: '#ff814291',
        iconFillFive: '#fe008778',
        iconFillSix: '#c400a0a1',
        iconFillSeven: '#fcb3608a',
        iconFillEight: '#8142ff89',
        iconColorOne: '#FE0088',
        iconColorTwo: '#C4009F',
        iconColorThree: '#fcb360',
        iconColorFour: '#8042FF',
        pieBorderOne: '#0073D5',
        pieBorderThree: '#FEB10B',
        pieBorderFour: '#FF5D0E',
        dailySalesColor: '#F9B593'
      },
      gridTemplateColumns: {
        smallBig: 'minmax(0, 0.5fr) minmax(0, 1fr)',
        bigCols: 'repeat(15, minmax(0, 1fr))'
      },
      gridTemplateRows: {
        bigRows: 'repeat(15, minmax(0, 1fr))'
      },
      width: {
        Thirty: '30%'
      },
      cursor: {
        trashcan: 'url("/trash.svg"), auto',
      },  
    },
  },
  plugins: [],
  purge: false,
}

