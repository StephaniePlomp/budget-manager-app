import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import "./Cards.css";
import { UilUsdSquare } from "@iconscout/react-unicons";
import { NumericFormat } from 'react-number-format';
import { UilAngleRightB } from '@iconscout/react-unicons';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import IncomePie from "./IncomePie";

const IncomeCard = ({ isOpen, setIsOpen }) => {
    const periodIndex = useSelector((state) => state.transactions.period)
    const income = useSelector((state) => state.transactions.incomeTotal);
    const incToday = useSelector((state) => state.transactions.todaysIncome);
    const incWeek = useSelector((state) => state.transactions.weekIncome);
    const incMonth = useSelector((state) => state.transactions.monthIncome);
    const expenses = useSelector((state) => state.transactions.expenseTotal);
    const expToday = useSelector((state) => state.transactions.todaysExpense);
    const expWeek = useSelector((state) => state.transactions.weekExpense);
    const expMonth = useSelector((state) => state.transactions.monthExpense);

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

    const noData = [
        {
            name: 'No data',
            value: 1,
        },
    ]

    const dataAll = [
        {
            name: 'Income',
            value: income,
        },
        {
            name: 'Expense',
            value: expenses,
        },
    ];

    const dataToday = [
        {
            name: 'Income',
            value: incToday,
        },
        {
            name: 'Expense',
            value: expToday,
        },
    ];
    const dataWeek = [
        {
            name: 'Income',
            value: incWeek,
        },
        {
            name: 'Expense',
            value: expWeek,
        },
    ];
    const dataMonth = [
        {
            name: 'Income',
            value: incMonth,
        },
        {
            name: 'Expense',
            value: expMonth,
        },
    ];

    // Counting income total based on period so it can be used as a condition for other functions
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
    const COLORS = ["#8ACC87", "#fd7a8c"];
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
    }, [periodIndex, expenses, income, sumAll, sumToday, sumWeek, sumMonth])

    useEffect(() => {
        setDataChange(getPieData())
    }, [getPieData])

    // Showing details expenseCard based on period
    const [details, setDetails] = useState({ value: "", name: "" })

    useEffect(() => {
        if (periodIndex === 0) {
            setDetails({ value: income, name: "All" })
        } else if (periodIndex === 1) {
            setDetails({ value: incToday, name: "Today" })
        } else if (periodIndex === 2) {
            setDetails({ value: incWeek, name: "This Week" })
        } else if (periodIndex === 3) {
            setDetails({ value: incMonth, name: "This Month" })

        }
    }, [periodIndex, income, incToday, incWeek, incMonth])

    const PeriodDetail = () => {
        return (
            <div className="detail">
                <UilUsdSquare  />
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
                                    <p>{(`${payload[0].value}` * 100 / (income + expenses)).toFixed(2) + '%'}</p>
                                }
                                {(sumToday !== 0 && periodIndex === 1) &&
                                    <p>{(`${payload[0].value}` * 100 / (incToday + expToday)).toFixed(2) + '%'}</p>
                                }
                                {(sumWeek !== 0 && periodIndex === 2) &&
                                    <p>{(`${payload[0].value}` * 100 / (incWeek + expWeek)).toFixed(2) + '%'}</p>
                                }
                                {(sumMonth !== 0 && periodIndex === 3) &&
                                    <p>{(`${payload[0].value}` * 100 / (incMonth + expMonth)).toFixed(2) + '%'}</p>
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
                        <IncomePie
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
                    className={`Income-card ${isOpen ? "flex-grow" : ""}`}>
                    {isOpen &&
                        <div className="card-content">
                            <IncomePie
                                dataChange={dataChange}
                                colorChange={colorChange}
                                handleNoData={handleNoData}
                                CustomTooltip={CustomTooltip}
                                pieSize={pieSize}
                            />

                            <PeriodDetail />
                        </div>
                    }
                    {!isOpen &&
                        <motion.div
                            layout
                            className="expanding-card"
                            onClick={() => setIsOpen(!isOpen)}>
                            <div className="centered-element">
                                <p className="expanding-title">Income</p>
                            </div>
                            <div className="centered-element">
                                <UilAngleRightB />
                            </div>
                        </motion.div>
                    }
                </motion.div>
            }
        </>
    );
};

export default IncomeCard