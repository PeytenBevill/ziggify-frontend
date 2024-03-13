import { useState, useEffect } from "react";
import { useAuth } from "../Login/AuthProvider";
import { useNavigate } from "react-router";

interface UserData {
  userID: string;
  password: string;
  companyAccount: string;
  companyName: string;
}

const Settings: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const { login, companyInfo } = useAuth();
  const navigate = useNavigate();
  const companyAccount = companyInfo.companyAccount;
  const companyName = companyInfo.companyName;

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
    fetch("https://ziggify-backend.onrender.com/user/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleSubmit = () => {
    const allFromCompany = data.find(
      (comp) => comp.companyAccount === companyAccount
    );
    if (allFromCompany) {
      if (allFromCompany.userID === userID) {
        window.alert("This userID is already assigned");
        setUserID("");
      } else {
        const dataToSend = {
          userID: userID,
          password: password,
          companyAccount: companyAccount,
          companyName: companyName,
        };
        fetch("https://ziggify-backend.onrender.com/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
        window.alert("User created!");
      }
    } else {
      console.log("An error occurred");
    }
  };

  return (
    <div className="bg-blue-50 h-screen flex flex-col items-center">
      <div className="mt-56 bg-white p-4 rounded shadow-lg flex flex-col items-center w-2/5">
        <h2>Add a user to your organization</h2>
        <input
          className="p-2 border m-2 w-3/5 rounded"
          type="text"
          placeholder="userID"
          onChange={(e) => setUserID(e.target.value)}
        />
        <input
          className="p-2 border m-2 w-3/5 rounded"
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-red-500 p-2 pr-4 pl-4 text-white rounded cursor-pointer" onClick={handleSubmit}>Add user</button>
      </div>
    </div>
  );
};

export default Settings;
