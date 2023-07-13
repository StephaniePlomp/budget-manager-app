import { useState, useEffect } from "react";
import "./Sidebar.css";
import piggybank from "../../images/piggybank.png";
import { NavLink } from "react-router-dom";
import {
  UilEstate,
  UilBars,
  UilTimes,
  UilPlusCircle,
  UilMinusCircle,
} from "@iconscout/react-unicons";
import { addDemoExpense, addDemoIncome, resetTransactions } from '../../features/transaction/transactionSlice';
import { useDispatch } from 'react-redux';
import { UilArrowDown } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ show, dataExpense, dataIncome, setPage }) => {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => setExpanded(!expanded);
  const dispatch = useDispatch();
  const [demoArrow, setDemoArrow] = useState(<UilArrowDown className="arrow" />)

  const handleDemo = () => {
    dispatch(addDemoExpense(dataExpense));
    dispatch(addDemoIncome(dataIncome));
    setPage(1)
    setExpanded(false)
    navigate("/budget-manager-app")
  }

  const [demoAlert, setDemoAlert] = useState(<button onClick={handleDemo} className="demo-btn alert">Demo</button>)

  useEffect(() => {
    if (localStorage.getItem("firstVisit")) {
      setDemoArrow(null)
      setDemoAlert(buttonNormal)
    } else {
      localStorage.setItem("firstVisit", "true")
    }
    // eslint-disable-next-line
  }, [])

  const buttonNormal = (<button
    onClick={handleDemo}
    className="demo-btn">Demo
  </button>)

  const [afterWelcome, setAfterWelcome] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAfterWelcome(false)
    }, 8000)
    return () => {
      clearTimeout(timeId)
    }
  }, [])

  const handleReset = () => {
    dispatch(resetTransactions())
    setExpanded(false)
    navigate("/budget-manager-app")
  }

  return (
    <nav className="nav">
      {expanded ? <div className="close-icon" onClick={handleClick}><UilTimes /></div> : <div className="burger-icon" onClick={handleClick}><UilBars /></div>}
      <div className={expanded ? 'sidebar open' : 'sidebar'}>
        <div className="logo">
          <img src={piggybank} alt="logo" />
          <span>
            <span>Budget</span>Manager
          </span>
        </div>

        <div className="menu">
          <ul className="menu-items" onClick={handleClick}>
            <li><NavLink to='/budget-manager-app' className="menu-item"> <UilEstate /> Dashboard</NavLink></li>
            <li><NavLink to='/add-income' className="menu-item"> <UilPlusCircle /> Add Income</NavLink></li>
            <li><NavLink to='/add-expense' className="menu-item"><UilMinusCircle /> Add Expense</NavLink></li>
          </ul>
        </div>

        <div className="control-panel">
          {show &&
            <>
              {demoArrow}
              {demoAlert}
            </>
          }
          {!afterWelcome &&
            <>{buttonNormal}</>
          }
          <button
            onClick={handleReset}
            className="reset-btn">Reset
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
