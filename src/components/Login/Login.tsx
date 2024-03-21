import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";

const Login: React.FC = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [companyAccount, setCompanyAccount] = useState("");
  // const [login, setLogin] = useState(false)
  const { loginHandler } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userID && password && companyAccount) {
      fetch(`https://ziggify-backend.onrender.com/user/${userID}`)
        .then((res) => res.json())
        .then((data) => {
          if (
            data &&
            data[0].password === password &&
            data[0].companyAccount === companyAccount
          ) {
            loginHandler({
              companyName: data[0].companyName,
              companyAccount: data[0].companyAccount,
            });
            navigate("/dashboard");
          } else {
            window.alert("Invalid userID, password, or company account ID");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.error("Invalid input values");
    }
  };

  return (
    <div className="bg-blue-50 h-screen flex flex-col items-center">
      <div className="mt-56 bg-white p-4 rounded shadow-lg flex flex-col items-center w-2/5">
        <h2>Welcome to Ziggify</h2>
        <input
          className="p-2 border m-2 w-3/5 rounded"
          type="text"
          name="userId"
          placeholder="User ID"
          onChange={(e) => setUserID(e.target.value)}
        />
        <input
          className="p-2 border w-3/5 rounded"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="p-2 border m-2 w-3/5 rounded"
          type="text"
          name="companyAccount"
          placeholder="Company Account ID"
          onChange={(e) => setCompanyAccount(e.target.value)}
        />
        <button
          className="bg-red-500 p-2 pr-4 pl-4 text-white rounded cursor-pointer"
          onClick={handleLogin}
        >
          Login
        </button>
        <p
          className="mt-2 cursor-pointer"
          onClick={() => navigate("/new-user")}
        >
          New User? Create an account
        </p>
      </div>
    </div>
  );
};

export default Login;
