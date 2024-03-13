import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";

interface UserData {
  userID: string;
  password: string;
  companyAccount: string;
  companyName: string;
}

const NewUser: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [companyAccount, setCompanyAccount] = useState("");
  const [companyName, setCompanyName] = useState("");
  const {loginHandler} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://ziggify-backend.onrender.com/user/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleCreateUser = () => {
    const existingCompany = data.find((comp) => comp.companyName === companyName)
    const existingUser = data.find((comp) => comp.userID === userID)
    if(existingCompany){
      if(existingCompany.companyAccount === companyAccount){
        window.alert("This company account already exists, please see your manager for help resetting your password")
        setCompanyAccount('')
        setCompanyName('')
        setPassword('')
        setUserID('')
      } else {
        window.alert('This company exists under a different account number')
        setCompanyAccount('')
        setCompanyName('')
        setPassword('')
        setUserID('')
      }
    } else {
      if(existingUser) {
        window.alert("This userID is already in use. Pick another one or see your manager for help resetting your password")
      } else {
        const dataToSend = {
          userID: userID,
          password: password,
          companyAccount: companyAccount,
          companyName: companyName
        }
        fetch("https://ziggify-backend.onrender.com/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }).then((res) => {
          console.log(res)
          loginHandler({
            companyName: companyName,
            companyAccount: companyAccount
          })
          navigate('/dashboard')
        })
      }
    }
  }
  return (
  <div className="bg-blue-50 h-screen flex flex-col items-center">
    <div className="mt-56 bg-white p-4 rounded shadow-lg flex flex-col items-center w-2/5">
      <h2>Create a new user:</h2>
    <input className="p-2 border m-2 w-3/5 rounded" type="text" placeholder="userID" onChange={(e) => setUserID(e.target.value)} />
    <input className="p-2 border m-2 w-3/5 rounded" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
    <input className="p-2 border m-2 w-3/5 rounded" type="text" placeholder="company account number" onChange={(e) => setCompanyAccount(e.target.value)} />
    <input className="p-2 border m-2 w-3/5 rounded" type="text" placeholder="company name" onChange={(e) => setCompanyName(e.target.value)} />
    <button className="bg-logoYellow p-2 rounded cursor-pointer" onClick={handleCreateUser}>Let's get started!</button>
    </div>
  </div>
  );
};

export default NewUser;
