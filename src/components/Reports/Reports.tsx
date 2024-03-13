import React from "react";
import SwitchSeriesType from "../Dashboard/LineChart";
import PieChartExample from "../Dashboard/PieChart";
import Totals from "../Dashboard/Totals";
import HorizontalBars from "./BarGraph";

const Reports: React.FC = () => {
  return (
    <div className="bg-blue-50 h-screen p-2">
      <section className="flex flex-row justify-center mt-2 h-2/4 w-full">
        <SwitchSeriesType />
        <section className="w-2/6 bg-white rounded shadow-lg">
          <p className="m-4 text-center mb-0 text-xl">Highest Selling Product</p>
          <div className="flex flex-row justify-center h-full w-full">
            <div className="mt-10 flex flex-col justify-evenly w-28 p-2">
              <span className="inline-block h-5 w-5 bg-pieChartTwo rounded mr-16">
                <p className="ml-6">Hats</p>
              </span>
              <span className="inline-block h-5 w-5 bg-pieChartOne rounded">
                <p className="ml-6">Shirts</p>
              </span>
            </div>

            <PieChartExample />

            <div className="mt-10 flex flex-col justify-evenly w-28 p-2">
              <p className="text-right">
                Pants{" "}
                <span className="inline-block h-5 w-5 bg-pieChartThree rounded"></span>
              </p>
              <p className="text-right">
                Shoes{" "}
                <span className="inline-block h-5 w-5 bg-pieChartFour rounded"></span>
              </p>
            </div>
          </div>
        </section>
      </section>
      <section className="flex flex-row mt-6">
        <div className="bg-white p-4 rounded shadow-lg">
          <Totals />
        </div>
        <div className="bg-white p-4 rounded shadow-lg ml-4">
          <HorizontalBars />
        </div>
      </section>
    </div>
  );
};

export default Reports;
