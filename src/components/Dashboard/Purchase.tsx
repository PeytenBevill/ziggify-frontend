import {
  Basket,
  ReceiptX,
  Receipt,
  ArrowUDownLeft,
} from "@phosphor-icons/react";
import React from "react";

const Purchase: React.FC = () => {
  const data = [
    { No_Of_Purchases: 46 },
    { Canceled_Orders: 5 },
    { Purchase_Amount: "$828" },
    { Returns: 8 },
  ];
  const nums = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full gap-4">
      {nums.map((num, index) => (
        <React.Fragment key={index}>
          <div className="grid grid-cols-2">
            {num === 1 ? (
              <span className="bg-iconFillFive rounded p-4 w-16">
                <Basket size={32} className="text-iconColorOne" />
              </span>
            ) : num === 2 ? (
              <span className="bg-iconFillSix rounded p-4 w-16">
                <ReceiptX size={32} className="text-iconColorTwo" />
              </span>
            ) : num === 3 ? (
              <span className="bg-iconFillSeven rounded p-4 w-16">
                <Receipt size={32} className="text-iconColorThree" />
              </span>
            ) : (
              <span className="bg-iconFillEight rounded p-4 w-16">
                <ArrowUDownLeft size={32} className="text-iconColorFour" />
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

export default Purchase;
