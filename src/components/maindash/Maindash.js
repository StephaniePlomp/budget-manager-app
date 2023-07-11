import React, { useState } from "react";
import Budget from "../budget/Budget";
import Period from "../period/Period";
import TableTransactions from "../table/TableTransactions";
import "./Maindash.css";
import IncomeCard from "../cards/IncomeCard";
import ExpenseCard from "../cards/ExpenseCard";

const MainDash = ({ page, setPage, isAdded, setIsAdded }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="maindash">
      <div className="top">
        <Budget />
        <Period />
      </div>
      <div className="cards">
        <div className="parent-container">
          <IncomeCard isOpen={isOpen} setIsOpen={setIsOpen} />
          <ExpenseCard isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <TableTransactions page={page} setPage={setPage} isAdded={isAdded} setIsAdded={setIsAdded} />
    </div>
  );
};

export default MainDash;