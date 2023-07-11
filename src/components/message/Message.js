import React from 'react'
import { useState, useEffect } from 'react'
import "./Message.css";
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { addDemoExpense, addDemoIncome } from '../../features/transaction/transactionSlice';

const Message = ({ dataExpense, dataIncome }) => {

  const dispatch = useDispatch();

  const isDesktop = useMediaQuery({
    query: '(min-width: 768px)'
  });

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  });

  const handleDemo = () => {
    dispatch(addDemoExpense(dataExpense));
    dispatch(addDemoIncome(dataIncome));
  }

  const noShow = null;
  const [welcomeMessage, setWelcomeMessage] = useState
    ("Welcome! Click on the button below to see a demo of budgetManager 👋")
  const [welcomeMessageMobile, setWelcomeMessageMobile] = useState("Welcome")
  const [welcomeButtonMobile, setWelcomeButtonMobile] = useState
    (noShow)


  useEffect(() => {
    if (localStorage.getItem("hasVisited")) {
      setWelcomeMessage("Welcome back on BudgetManager! 👋 ")
    } else {
      localStorage.setItem("hasVisited", "true")
      setWelcomeMessageMobile("Welcome! Click on the button below to see a demo of budgetManager 👋")
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("hasVisited1")) {
      setWelcomeMessageMobile("Welcome back on BudgetManager! 👋 ")
      setWelcomeButtonMobile(noShow)
    } else {
      localStorage.setItem("hasVisited1", "true")
      setWelcomeButtonMobile(<button onClick={handleDemo} className="demo-btn mobile">Demo</button>)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {isDesktop &&
        <>
          {welcomeMessage}
        </>
      }

      {isMobile &&
        <>
          {welcomeMessageMobile}
          {welcomeButtonMobile}
        </>
      }
    </>
  );
}
export default Message