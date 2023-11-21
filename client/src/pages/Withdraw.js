import { useState } from "react";
import { updateAccount } from "../api";
import Account from "../components/Account";

export default function Withdraw({ allAccounts, getAllAccounts }) {
  const [error, setError] = useState("");
  const handleDeposit = async (value, balance, id) => {
    const withdraw = parseFloat(value);
    const parsedBalance = parseFloat(balance);
    const total = parsedBalance - withdraw;
    if (total < 0) {
      setError("No enough founds");
    } else {
      await updateAccount(id, total.toFixed(2));
      getAllAccounts();
    }
  };
  return (
    <Account
      title="Withdraw"
      buttonText="Withdraw"
      inputLabel={"Withdraw Amount"}
      onSubmit={handleDeposit}
      allAccounts={allAccounts}
      error={error}
    />
  );
}
