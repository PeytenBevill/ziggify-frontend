import React from "react";

const Totals: React.FC = () => {
  const mockTotals = [
    23, 7, 14, 56, 39, 82, 11, 45, 67, 29, 5, 98, 73, 2, 41, 88, 33, 19, 60, 16,
    91, 27, 8, 50, 68, 3, 77, 12,
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <section className="flex flex-col">
        <p className="text-center mt-4 text-xl">Daily Sales</p>
        <p className="text-center mb-8 mt-8 text-lg">January</p>
        <span className="grid grid-cols-7 ml-4 mr-4">
          {days.map((day) => (
            <p className="text-sm text-center">{day}</p>
          ))}
        </span>
        <section className="grid grid-cols-7 grid-rows-4 text-center border-l border-b border-t mr-4 ml-4 rounded">
          {mockTotals.map((num) => {
            if (
              (mockTotals.indexOf(num) > 6 && mockTotals.indexOf(num) < 14) ||
              mockTotals.indexOf(num) > 20
            ) {
              return <p className="bg-dailySalesColor border-r">{num}</p>;
            } else {
              return <p className="border-r">{num}</p>;
            }
          })}
        </section>
      </section>
    </div>
  );
};

export default Totals;
