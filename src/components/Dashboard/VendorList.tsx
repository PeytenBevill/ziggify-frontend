import { useState, useEffect } from "react";

const VendorList: React.FC = () => {
  const [vendors, setVendors] = useState<{ [key: string]: string }[]>([]);

  const companyAccount = "12345";

  useEffect(() => {
    const urlVendors = `https://ziggify-backend.onrender.com/vendor/${companyAccount}`;

    fetch(urlVendors)
      .then((res) => res.json())
      .then((data) => {
        setVendors(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
      });
  }, [companyAccount]);

  return (
    <div className="p-2 overflow-y-scroll">
      {vendors.map((vendor, index) => (
        <p
          key={index}
          className={(index + 1) % 2 === 0 ? "bg-white" : "bg-logoYellow"}
        >
          {vendor.vName}
        </p>
      ))}
    </div>
  );
};

export default VendorList;
