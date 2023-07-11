import './Period.css'
import React from "react";
import { PeriodData } from "../../data/Data";
import { changePeriod } from '../../features/transaction/transactionSlice';
import { useSelector, useDispatch } from 'react-redux';

const Period = () => {
  const dispatch = useDispatch();
  const periodIndex = useSelector((state) => state.transactions.period)

  return (
    <>
      <div className='periodsContainer'>
        <div className="topMenuTitle">
          Transactions
        </div>

        <div className="topmenu">
          {PeriodData.map((item, index) => {
            return (
              <div
                className={periodIndex === index ? "topMenuItem topActive" : "topMenuItem"}
                key={index}
                onClick={() => dispatch(changePeriod(index))}
              >
                <span>{item.heading}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Period