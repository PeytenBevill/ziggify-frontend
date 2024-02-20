import { useEffect, useState } from "react";

const Reorder: React.FC = () => {
  const [reorder, setReorder] = useState<string[]>([]);

  const data = [
    {
      ID: 1,
      Name: "Product A",
      Category: "Electronics",
      UPC: "123456789101112131415161718",
      Cost: 20.5,
      Price: 29.99,
      Discount: 0.1,
      Qty: 50,
      "Re-order": 20,
      "RO Amount": 500,
      SKU: "SKU123",
      Vendor: "Vendor X",
      "Seller ID": "S123",
      Date: "2022-02-13",
      Status: "In Stock",
    },
    {
      ID: 2,
      Name: "Product B",
      Category: "Clothing",
      UPC: "987654321",
      Cost: 15.75,
      Price: 24.99,
      Discount: 0.15,
      Qty: 30,
      "Re-order": 15,
      "RO Amount": 375,
      SKU: "SKU456",
      Vendor: "Vendor Y",
      "Seller ID": "S456",
      Date: "2022-02-13",
      Status: "Re-Order",
    },
    {
      ID: 3,
      Name: "Product C",
      Category: "Home & Garden",
      UPC: "123555555",
      Cost: 30.0,
      Price: 49.99,
      Discount: 0.2,
      Qty: 25,
      "Re-order": 25,
      "RO Amount": 750,
      SKU: "SKU789",
      Vendor: "Vendor Z",
      "Seller ID": "S789",
      Date: "2022-02-13",
      Status: "Discount",
    },
  ];

  useEffect(() => {
    const reorderArray = data
      .filter((item) => item.Qty === item["Re-order"])
      .map((item) => item.Name);

    setReorder(reorderArray);
  }, [data]);

  return (
      <div className="p-2 overflow-y-scroll">
        {reorder.length > 0 ? (
          reorder.map((item, index) => <p className={(index + 1) % 2 === 0 ? 'bg-white' : 'bg-red-500 text-white'} key={index}>{item}</p>)
        ) : (
          <p className="text-gray-400">Nothing needs re-ordered</p>
        )}
      </div>
  );
};

export default Reorder;
