import { useState, useEffect } from "react";
import { useAuth } from "../Login/AuthProvider";

const VendorList: React.FC = () => {
  const [vendors, setVendors] = useState<{ [key: string]: string }[]>([]);
  const {companyInfo} = useAuth()

  const companyAccount = companyInfo.companyAccount;

  useEffect(() => {
    const urlVendors = `https://ziggify-backend.onrender.com/vendor/${companyAccount}`;

    fetch(urlVendors)
      .then((res) => res.json())
      .then((data) => {
        setVendors(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
      });
  }, [companyAccount]);

  return (
    <div className="p-2 overflow-y-scroll">
      {vendors.length > 0 ? (
          vendors.map((item, index) => <p className={(index + 1) % 2 === 0 ? 'bg-white' : 'bg-logoYellow'} key={index}>{item.vName}</p>)
        ) : (
          <p className="text-gray-400">No vendors added yet</p>
        )}
    </div>
  );
};

export default VendorList;
