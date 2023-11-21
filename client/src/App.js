import { useAuth } from "./AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignedInNav from "./components/navMenu/SignedInNav";
import NotSignedInNav from "./components/navMenu/NotSignedInNav";
import Home from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignupPage from "./pages/Signup";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Accounts from "./pages/Accounts";
import { useEffect, useState } from "react";
import { getAllAccounts } from "./api";

function App() {
  const { currentUser } = useAuth();
  const [allAccounts, setAllAccounts] = useState([]);
  const handleGetAllAccounts = () => {
    getAllAccounts().then((data) => setAllAccounts(data));
  };
  useEffect(() => {
    if (currentUser) handleGetAllAccounts();
  }, [currentUser]);
  console.log(allAccounts);
  return (
    <Router>
      {currentUser ? <SignedInNav /> : <NotSignedInNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={currentUser ? <Navigate to="/accounts" /> : <SignInPage />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/deposit"
          element={
            !currentUser ? (
              <Navigate to="/" />
            ) : (
              <Deposit
                allAccounts={allAccounts}
                getAllAccounts={handleGetAllAccounts}
              />
            )
          }
        />
        <Route
          path="/Withdraw"
          element={
            !currentUser ? (
              <Navigate to="/" />
            ) : (
              <Withdraw
                allAccounts={allAccounts}
                getAllAccounts={handleGetAllAccounts}
              />
            )
          }
        />
        <Route
          path="/accounts"
          element={
            !currentUser ? (
              <Navigate to="/" />
            ) : (
              <Accounts
                accounts={allAccounts}
                getAllAccounts={handleGetAllAccounts}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
