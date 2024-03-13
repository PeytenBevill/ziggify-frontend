import { useEffect, useState } from "react";
import { useAuth } from "../Login/AuthProvider";

type DataItem = {
  _id: string;
  name: string;
  category: string;
  upc: string;
  cost: number;
  price: number;
  discount: number;
  qty: number;
  reorder: number;
  roAmount: number;
  sku: string;
  vendor: string;
  sellerId: string;
  date: string;
  status: string;
  companyAccount: string;
};

const Reorder: React.FC = () => {
  const [reorder, setReorder] = useState<{ [key: string]: string }[]>([]);
  const {companyInfo} = useAuth()

  const companyAccount = companyInfo.companyAccount

  useEffect(() => {
    const urlInventory = `https://ziggify-backend.onrender.com/inventory/${companyAccount}`;

    fetch(urlInventory)
      .then((res) => res.json())
      .then((data) => {
        const itemsToReorder = data.filter((item: DataItem) => item.qty - 5 <= item.reorder);
        setReorder(itemsToReorder);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  }, [companyAccount]);

  return (
      <div className="p-2 overflow-y-scroll">
        {reorder.length > 0 ? (
          reorder.map((item, index) => <p className={(index + 1) % 2 === 0 ? 'bg-white' : 'bg-red-500 text-white'} key={index}>{item.name}</p>)
        ) : (
          <p className="text-gray-400">Nothing needs re-ordered</p>
        )}
      </div>
  );
};

export default Reorder;
