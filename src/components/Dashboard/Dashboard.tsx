import React from "react";
import SwitchSeriesType from "./LineChart";
// import Totals from "./Totals";
import PieChartExample from "./PieChart";
import FinanceInfo from "./FinanceInfo";
import Purchase from "./Purchase";
import Reorder from "./Reorder";
import VendorList from "./VendorList";

const Dashboard: React.FC = () => {
  

  

  return (
    <div className=" h-screen p-5 bg-blue-50 overflow-y-hidden">
      <h2>Company Name</h2>
      <section className="flex flex-row justify-center mt-6 h-2/4 w-full">
        <SwitchSeriesType />
        <section className="w-2/6 bg-white rounded shadow-lg cursor-pointer">
          <p className="m-4 text-center mb-0">Highest Selling Product</p>
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
        <section className="bg-white w-Thirty p-8 flex flex-col justify-center align-center rounded shadow-lg cursor-pointer">
          <h2 className="mb-2">Sales Overview</h2>
          <FinanceInfo />
        </section>
        <section className="bg-white w-Thirty p-8 flex flex-col justify-center align-center rounded shadow-lg ml-4 cursor-pointer">
          <h2 className="mb-2">Purchase Overview</h2>
          <Purchase />
        </section>
        <section className="bg-white w-1/5 p-8 flex flex-col align-center rounded shadow-lg cursor-pointer text-center ml-4">
          <h2>Order Soon!</h2>
          {/* <Reorder /> */}
        </section>
        <section className="bg-white w-1/5 p-8 flex flex-col align-center rounded shadow-lg cursor-pointer text-center ml-4">
          <h2>List of Vendors</h2>
          <VendorList />
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
