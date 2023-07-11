import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Cards.css";
import { UilMoneyWithdrawal } from '@iconscout/react-unicons'
import { NumericFormat } from 'react-number-format';
import {
    getEntertainmentTotal,
    getGroceriesTotal,
    getHealthcareTotal,
    getHousingTotal,
    getMembershipsTotal,
    getShoppingTotal,
    getTransportTotal,
    getUtilitiesTotal,
}
    from "../../features/transaction/transactionSlice";
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion'
import { UilAngleLeftB } from '@iconscout/react-unicons';
import { useMediaQuery } from 'react-responsive';
import ExpensePie from "./ExpensePie";

const ExpenseCard = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const periodIndex = useSelector((state) => state.transactions.period)
    const expenses = useSelector((state) => state.transactions.expenseTotal);
    const expToday = useSelector((state) => state.transactions.todaysExpense);
    const expWeek = useSelector((state) => state.transactions.weekExpense);
    const expMonth = useSelector((state) => state.transactions.monthExpense);
    const healthcareTotal = useSelector((state) => state.transactions.healthcareTotal);
    const healthcareTodayTotal = useSelector((state) => state.transactions.healthcareTodayTotal);
    const healthcareMonthTotal = useSelector((state) => state.transactions.healthcareMonthTotal);
    const healthcareWeekTotal = useSelector((state) => state.transactions.healthcareWeekTotal);
    const housingTotal = useSelector((state) => state.transactions.housingTotal);
    const housingTodayTotal = useSelector((state) => state.transactions.housingTodayTotal);
    const housingMonthTotal = useSelector((state) => state.transactions.housingMonthTotal);
    const housingWeekTotal = useSelector((state) => state.transactions.housingWeekTotal);
    const transportTotal = useSelector((state) => state.transactions.transportTotal);
    const transportTodayTotal = useSelector((state) => state.transactions.transportTodayTotal);
    const transportWeekTotal = useSelector((state) => state.transactions.transportWeekTotal);
    const transportMonthTotal = useSelector((state) => state.transactions.transportMonthTotal);
    const utilTotal = useSelector((state) => state.transactions.utilTotal);
    const utilTodayTotal = useSelector((state) => state.transactions.utilTodayTotal);
    const utilWeekTotal = useSelector((state) => state.transactions.utilWeekTotal);
    const utilMonthTotal = useSelector((state) => state.transactions.utilMonthTotal);
    const grocTotal = useSelector((state) => state.transactions.grocTotal);
    const grocTodayTotal = useSelector((state) => state.transactions.grocTodayTotal);
    const grocWeekTotal = useSelector((state) => state.transactions.grocWeekTotal);
    const grocMonthTotal = useSelector((state) => state.transactions.grocMonthTotal);
    const memberTotal = useSelector((state) => state.transactions.memberTotal);
    const memberTodayTotal = useSelector((state) => state.transactions.memberTodayTotal);
    const memberWeekTotal = useSelector((state) => state.transactions.memberWeekTotal);
    const memberMonthTotal = useSelector((state) => state.transactions.memberMonthTotal);
    const enterTotal = useSelector((state) => state.transactions.enterTotal);
    const enterTodayTotal = useSelector((state) => state.transactions.enterTodayTotal);
    const enterWeekTotal = useSelector((state) => state.transactions.enterWeekTotal);
    const enterMonthTotal = useSelector((state) => state.transactions.enterMonthTotal);
    const shopTotal = useSelector((state) => state.transactions.shopTotal);
    const shopTodayTotal = useSelector((state) => state.transactions.shopTodayTotal);
    const shopWeekTotal = useSelector((state) => state.transactions.shopWeekTotal);
    const shopMonthTotal = useSelector((state) => state.transactions.shopMonthTotal);

    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    });

    const isMobile = useMediaQuery({
        query: '(max-width: 1024px)'
    });

    // handle size of PieChart based on mediaQuery
    const [pieSize, setPieSize] = useState()
    const handlePieSize = useCallback(() => {
        if (isDesktop) {
            return 200;
        } else if (isMobile) {
            return 175;
        }
    }, [isDesktop, isMobile])

    useEffect(() => {
        setPieSize(handlePieSize())
    }, [handlePieSize])

    useEffect(() => {
        dispatch(
            getHealthcareTotal())
        dispatch(
            getHousingTotal())
        dispatch(
            getTransportTotal())
        dispatch(
            getUtilitiesTotal())
        dispatch(
            getGroceriesTotal())
        dispatch(
            getMembershipsTotal())
        dispatch(
            getShoppingTotal())
        dispatch(
            getEntertainmentTotal())
    }, [dispatch, expenses])

    const noData = [
        {
            name: 'No data',
            value: 1,
        },
    ]
    const dataAll = [
        {
            name: 'Healthcare',
            value: healthcareTotal,
        },
        {
            name: 'Housing',
            value: housingTotal,
        },
        {
            name: 'Transportation',
            value: transportTotal,
        },
        {
            name: 'Utilities',
            value: utilTotal,
        },
        {
            name: 'Groceries',
            value: grocTotal,
        },
        {
            name: 'Memberships',
            value: memberTotal,
        },
        {
            name: 'Shopping',
            value: shopTotal,
        },
        {
            name: 'Entertainment',
            value: enterTotal,
        },
    ];

    const dataToday = [
        {
            name: 'Healthcare',
            value: healthcareTodayTotal,
        },
        {
            name: 'Housing',
            value: housingTodayTotal,
        },
        {
            name: 'Transportation',
            value: transportTodayTotal,
        },
        {
            name: 'Utilities',
            value: utilTodayTotal,
        },
        {
            name: 'Groceries',
            value: grocTodayTotal,
        },
        {
            name: 'Memberships',
            value: memberTodayTotal,
        },
        {
            name: 'Shopping',
            value: shopTodayTotal,
        },
        {
            name: 'Entertainment',
            value: enterTodayTotal,
        },
    ];

    const dataWeek = [
        {
            name: 'Healthcare',
            value: healthcareWeekTotal,
        },
        {
            name: 'Housing',
            value: housingWeekTotal,
        },
        {
            name: 'Transportation',
            value: transportWeekTotal,
        },
        {
            name: 'Utilities',
            value: utilWeekTotal,
        },
        {
            name: 'Groceries',
            value: grocWeekTotal,
        },
        {
            name: 'Memberships',
            value: memberWeekTotal,
        },
        {
            name: 'Shopping',
            value: shopWeekTotal,
        },
        {
            name: 'Entertainment',
            value: enterWeekTotal,
        },
    ];

    const dataMonth = [
        {
            name: 'Healthcare',
            value: healthcareMonthTotal,
        },
        {
            name: 'Housing',
            value: housingMonthTotal,
        },
        {
            name: 'Transportation',
            value: transportMonthTotal,
        },
        {
            name: 'Utilities',
            value: utilMonthTotal,
        },
        {
            name: 'Groceries',
            value: grocMonthTotal,
        },
        {
            name: 'Memberships',
            value: memberMonthTotal,
        },
        {
            name: 'Shopping',
            value: shopMonthTotal,
        },
        {
            name: 'Entertainment',
            value: enterMonthTotal,
        },
    ];

    // Counting expense total based on period so it can be used as a condition for other functions
    const valuesAll = dataAll.map(item => item.value);
    const sumAll = valuesAll.reduce((acc, value) => {
        return acc + value;
    });

    const valuesToday = dataToday.map(item => item.value);
    const sumToday = valuesToday.reduce((acc, value) => {
        return acc + value;
    });

    const valuesWeek = dataWeek.map(item => item.value);
    const sumWeek = valuesWeek.reduce((acc, value) => {
        return acc + value;
    });

    const valuesMonth = dataMonth.map(item => item.value);
    const sumMonth = valuesMonth.reduce((acc, value) => {
        return acc + value;
    });


    // set colors for pie chart, whether there is data or not and based on period
    const COLORS = ["#fbd206", "#feaf8a", "#fd7a8c", "#cc89d6", "#bfcff0", "#9ce7c9", "#4dc656", "#a6aab2"];
    const NOCOLORS = ["#ae67cc"];
    const [colorChange, setColorChange] = useState(COLORS)

    const handlePieColors = useCallback(() => {
        if
            (sumAll === 0 && periodIndex === 0) {
            return NOCOLORS
        } else if
            (sumToday === 0 && periodIndex === 1) {
            return NOCOLORS;
        } else if
            (sumWeek === 0 && periodIndex === 2) {
            return NOCOLORS;
        } else if
            (sumMonth === 0 && periodIndex === 3) {
            return NOCOLORS;
        } else if
            (sumAll !== 0 && periodIndex === 0) {
            return COLORS;
        } else if
            (sumToday !== 0 && periodIndex === 1) {
            return COLORS;
        } else if
            (sumWeek !== 0 && periodIndex === 2) {
            return COLORS;
        } else if
            (sumMonth !== 0 && periodIndex === 3) {
            return COLORS;
        }
        // eslint-disable-next-line
    }, [sumAll, sumToday, sumWeek, sumMonth, periodIndex])

    useEffect(() => {
        setColorChange(handlePieColors())
    }, [handlePieColors])


    // set data for pie chart, whether there is data or not and based on period
    const [dataChange, setDataChange] = useState(dataAll)
    const [handleNoData, setHandleNoData] = useState(true)

    const getPieData = useCallback(() => {
        if (sumAll !== 0 && periodIndex === 0) {
            setHandleNoData(true);
            return dataAll;
        } else if
            (sumAll === 0 && periodIndex === 0) {
            setHandleNoData(false);
            return noData;
        } else if
            (sumToday === 0 && periodIndex === 1) {
            setHandleNoData(false)
            return noData;
        } else if
            (sumToday !== 0 && periodIndex === 1) {
            setHandleNoData(true);
            return dataToday
        } else if
            (sumWeek === 0 && periodIndex === 2) {
            setHandleNoData(false);
            return noData;
        } else if
            (sumWeek !== 0 && periodIndex === 2) {
            setHandleNoData(true);
            return dataWeek;
        } else if
            (sumMonth === 0 && periodIndex === 3) {
            setHandleNoData(false)
            return noData;
        } else if
            (sumMonth !== 0 && periodIndex === 3) {
            setHandleNoData(true);
            return dataMonth;
        }
        // eslint-disable-next-line
    }, [periodIndex, expenses, sumAll, sumToday, sumWeek, sumMonth])

    useEffect(() => {
        setDataChange(getPieData())
    }, [getPieData])

    // Showing details expenseCard based on period
    const [details, setDetails] = useState({ value: "", name: "" })

    useEffect(() => {
        if (periodIndex === 0) {
            setDetails({ value: expenses, name: "All" })
        } else if (periodIndex === 1) {
            setDetails({ value: expToday, name: "Today" })
        } else if (periodIndex === 2) {
            setDetails({ value: expWeek, name: "This Week" })
        } else if (periodIndex === 3) {
            setDetails({ value: expMonth, name: "This Month" })

        }
    }, [periodIndex, expenses, expToday, expWeek, expMonth])

    const PeriodDetail = () => {
        return (
            <div className="detail">
                <UilMoneyWithdrawal />
                <span>
                    <NumericFormat value={details.value} displayType="text" thousandSeparator={true} prefix="$" />
                </span>
                <span>{details.name}</span>
            </div>
        )
    }

    // CustomTooltip
    const CustomTooltip = ({ payload }) => {
        return (
            <div className="custom-tooltip">
                <b>{payload?.[0]?.payload?.name}:</b>
                <div>
                    {payload.map((pld, index) => (
                        <React.Fragment
                            key={index}>
                            <div
                                style={{ display: "inline-block", padding: 3 }}>
                                <p>
                                    <NumericFormat
                                        key={index} value={pld.value} displayType="text" thousandSeparator={true} prefix="$" />  -
                                </p>
                            </div>
                            <div
                                style={{ display: "inline-block", padding: 2 }}>
                                {(sumAll !== 0 && periodIndex === 0) &&
                                    <p>{(`${payload[0].value}` * 100 / (expenses)).toFixed(2) + '%'}</p>
                                }
                                {(sumToday !== 0 && periodIndex === 1) &&
                                    <p>{(`${payload[0].value}` * 100 / (expToday)).toFixed(2) + '%'}</p>
                                }
                                {(sumWeek !== 0 && periodIndex === 2) &&
                                    <p>{(`${payload[0].value}` * 100 / (expWeek)).toFixed(2) + '%'}</p>
                                }
                                {(sumMonth !== 0 && periodIndex === 3) &&
                                    <p>{(`${payload[0].value}` * 100 / (expMonth)).toFixed(2) + '%'}</p>
                                }
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            {isDesktop &&
                <div className="expense-card full">
                    <div className="card-content">
                        <ExpensePie
                            dataChange={dataChange}
                            colorChange={colorChange}
                            handleNoData={handleNoData}
                            CustomTooltip={CustomTooltip}
                            pieSize={pieSize}
                        />
                        <PeriodDetail />
                    </div>
                </div>
            }

            {isMobile &&
                <motion.div
                    layout
                    transition={{ layout: { duration: 1, type: "spring" } }}
                    className={`expense-card ${!isOpen ? "flex-grow" : ""}`}>
                    {!isOpen &&
                        <div className="card-content">
                            <ExpensePie
                                dataChange={dataChange}
                                colorChange={colorChange}
                                handleNoData={handleNoData}
                                CustomTooltip={CustomTooltip}
                                pieSize={pieSize}
                            />

                            <PeriodDetail />
                        </div>
                    }
                    {isOpen &&
                        <motion.div
                            layout
                            className="expanding-card"
                            onClick={() => setIsOpen(!isOpen)}>
                            <div className="centered-element expense">
                                <UilAngleLeftB />
                            </div>
                            <div className="centered-element expense">
                                <p className="expanding-title">Expenses</p>
                            </div>
                        </motion.div>
                    }
                </motion.div>
            }
        </>
    );
};

export default ExpenseCard