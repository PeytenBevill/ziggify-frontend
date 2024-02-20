import React from "react";

const VendorList: React.FC = () => {
  const data = [
    {
      "Vendor ID": "V1",
      "Vendor Name": "Vendor A",
      "Contact Info": "123-456-7890",
      "Contact Person": "John Doe",
      "Tax ID": "TAX123",
      "Lead Time": 7,
      MOQ: 50,
    },
    {
      "Vendor ID": "V2",
      "Vendor Name": "Vendor B",
      "Contact Info": "987-654-3210",
      "Contact Person": "Jane Smith",
      "Tax ID": "TAX456",
      "Lead Time": 10,
      MOQ: 100,
    },
    {
      "Vendor ID": "V3",
      "Vendor Name": "Vendor C",
      "Contact Info": "555-123-7890",
      "Contact Person": "Bob Johnson",
      "Tax ID": "TAX789",
      "Lead Time": 5,
      MOQ: 75,
    },
  ];
  return (
    <div className="p-2 overflow-y-scroll">
      {data.map((vendor, index) => (
        <p
          key={index}
          className={(index + 1) % 2 === 0 ? "bg-white" : "bg-logoYellow"}
        >
          {vendor["Vendor Name"]}
        </p>
      ))}
    </div>
  );
};

export default VendorList;
