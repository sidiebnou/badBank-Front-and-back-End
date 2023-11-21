import { useState } from "react";
import { updateAccount } from "../api";
import Account from "../components/Account";

export default function Deposit({ allAccounts, getAllAccounts }) {
  const handleDeposit = async (value, balance, id) => {
    const depositAmount = parseFloat(value);
    const newBalance = parseFloat(balance);
    const total = depositAmount + newBalance;
    await updateAccount(id, total.toFixed(2));
    getAllAccounts();
  };
  return (
    <Account
      title="Deposit"
      buttonText="Deposit"
      inputLabel={"Deposit Amount"}
      onSubmit={handleDeposit}
      allAccounts={allAccounts}
    />
  );
}
