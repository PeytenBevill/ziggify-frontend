import { useEffect, useState } from "react";

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
  const companyAccount = "12345";

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
  // const data = [
  //   {
  //     ID: 1,
  //     Name: "Product A",
  //     Category: "Electronics",
  //     UPC: "123456789101112131415161718",
  //     Cost: 20.5,
  //     Price: 29.99,
  //     Discount: 0.1,
  //     Qty: 50,
  //     "Re-order": 20,
  //     "RO Amount": 500,
  //     SKU: "SKU123",
  //     Vendor: "Vendor X",
  //     "Seller ID": "S123",
  //     Date: "2022-02-13",
  //     Status: "In Stock",
  //   },
  //   {
  //     ID: 2,
  //     Name: "Product B",
  //     Category: "Clothing",
  //     UPC: "987654321",
  //     Cost: 15.75,
  //     Price: 24.99,
  //     Discount: 0.15,
  //     Qty: 30,
  //     "Re-order": 15,
  //     "RO Amount": 375,
  //     SKU: "SKU456",
  //     Vendor: "Vendor Y",
  //     "Seller ID": "S456",
  //     Date: "2022-02-13",
  //     Status: "Re-Order",
  //   },
  //   {
  //     ID: 3,
  //     Name: "Product C",
  //     Category: "Home & Garden",
  //     UPC: "123555555",
  //     Cost: 30.0,
  //     Price: 49.99,
  //     Discount: 0.2,
  //     Qty: 25,
  //     "Re-order": 25,
  //     "RO Amount": 750,
  //     SKU: "SKU789",
  //     Vendor: "Vendor Z",
  //     "Seller ID": "S789",
  //     Date: "2022-02-13",
  //     Status: "Discount",
  //   },
  // ];



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
