import { CreditCard, ShoppingCart } from "@phosphor-icons/react";
import React from "react";

const FinanceInfo: React.FC = () => {
  const data = [
    { Annual_Sales: "$12,458" },
    { Annual_Profit: "$8,248" },
    { Daily_Sales: "$880" },
    { Daily_Profit: "$11,578" },
  ];
  const nums = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full gap-4">
      {nums.map((num, index) => (
        <React.Fragment key={index}>
          <div className="grid grid-cols-2">
            {num === 1 || num === 3 ? (
              <span
                className={
                  num === 1
                    ? "bg-iconFillOne rounded p-4 w-16"
                    : "bg-iconFillFour w-16 rounded p-4"
                }
              >
                <ShoppingCart
                  size={32}
                  className={
                    num === 1
                      ? "text-pieChartOne text-center"
                      : "text-pieChartFour text-center"
                  }
                />
              </span>
            ) : (
              <span
                className={
                  num === 2
                    ? "bg-iconFillThree rounded p-4 w-16"
                    : "bg-iconFillTwo w-16 rounded p-4"
                }
              >
                <CreditCard
                  size={32}
                  className={
                    num === 2
                      ? "text-pieChartThree text-center"
                      : "text-pieChartTwo text-center"
                  }
                />
              </span>
            )}
            {data[index] && (
              <div className="flex flex-col flex-wrap">
                <p className="text-sm font-bold mr-2">
                  {Object.keys(data[index])[0].split("_").join(" ")}
                </p>
                <p className="text-sm mr-2">{Object.values(data[index])[0]}</p>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FinanceInfo;
