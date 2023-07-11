import { createSlice, nanoid } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    period: 0,
    balance: 0,
    incomeTotal: 0,
    expenseTotal: 0,
    todayPeriod: "",
    allTransactions: [],
    todaysTransactions: [],
    weekTransactions: [],
    monthTransactions: [],
    todaysIncome: 0,
    todaysExpense: 0,
    weekIncome: 0,
    weekExpense: 0,
    monthIncome: 0,
    monthExpense: 0,
    healthcareTotal: 0,
    healthcareTodayTotal: 0,
    healthcareMonthTotal: 0,
    healthcareWeekTotal: 0,
    housingTotal: 0,
    housingTodayTotal: 0,
    housingMonthTotal: 0,
    housingWeekTotal: 0,
    transportTotal: 0,
    transportTodayTotal: 0,
    transportMonthTotal: 0,
    transportWeekTotal: 0,
    utilTotal: 0,
    utilTodayTotal: 0,
    utilMonthTotal: 0,
    utilWeekTotal: 0,
    grocTotal: 0,
    grocTodayTotal: 0,
    grocMonthTotal: 0,
    grocWeekTotal: 0,
    memberTotal: 0,
    memberTodayTotal: 0,
    memberMonthTotal: 0,
    memberWeekTotal: 0,
    shopTotal: 0,
    shopTodayTotal: 0,
    shopMonthTotal: 0,
    shopWeekTotal: 0,
    enterTotal: 0,
    enterTodayTotal: 0,
    enterMonthTotal: 0,
    enterWeekTotal: 0,
    addedId: 0,
    income: [],
    expense: [],
}

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState,


    reducers: {
        // ========= add transaction ======== 
        addExpense: {
            reducer(state, action) {
                state.expense.push(action.payload)
                // localStorage.setItem('addExpense', JSON.stringify(state.expense))
                const { id } = action.payload
                state.addedId = id;
            },
            prepare(title, date, amount, category) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        date,
                        amount,
                        category,
                        type: 'min'
                    }
                }
            }
        },
        addIncome: {
            reducer(state, action) {
                state.income.push(action.payload)
                const { id } = action.payload
                state.addedId = id;
            },
            prepare(title, date, amount) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        category: 'Income',
                        date,
                        amount,
                        type: 'plus'
                    }
                }
            }
        },
        totalTransactions: {
            reducer(state) {
                state.allTransactions = [...state.income, ...state.expense]
            }
        },
        deleteTransaction: {
            reducer(state, action) {
                const { id } = action.payload
                state.expense = state.expense.filter((expense) =>
                    expense.id !== id);
                state.income = state.income.filter((income) =>
                    income.id !== id);
            }
        },
        resetTransactions: {
            reducer(state, action) {
                return initialState
            }
        },
        addDemoIncome: {
            reducer(state, action) {
                const endOfMonth = moment().endOf('month').format('MM-DD-YYYY');
                state.income = action.payload.filter((transaction) =>
                    transaction.date <= endOfMonth)
            }
        },
        addDemoExpense: {
            reducer(state, action) {
                const endOfMonth = moment().endOf('month').format('MM-DD-YYYY');
                state.expense = action.payload.filter((transaction) =>
                    transaction.date <= endOfMonth)
            }
        },
        totalIncome: {
            reducer(state) {
                let inc = state.income.map((item) => item.amount);
                let totalInc =
                    inc.length > 0 ? inc.reduce((prev, current) => prev + current) : 0;
                state.incomeTotal = totalInc;
            }
        },
        totalExpense: {
            reducer(state) {
                let exp = state.expense.map((item) => item.amount);
                let totalExp =
                    exp.length > 0 ? exp.reduce((prev, current) => prev + current) : 0;
                state.expenseTotal = totalExp;
            }
        },
        totalBudget: {
            reducer(state) {
                state.balance = state.incomeTotal - state.expenseTotal;
            }
        },
        changePeriod: {
            reducer(state, action) {
                state.period = action.payload
            }
        },
        getTodaysTransactions: {
            reducer(state) {
                var today = moment().format('MM-DD-YYYY');
                const sortTodayInc = state.income.filter((transaction) =>
                    transaction.date === today);
                const sortTodayExp = state.expense.filter((transaction) =>
                    transaction.date === today);
                state.todaysTransactions = [...sortTodayInc, ...sortTodayExp]

                const sortTodayIncAmount = sortTodayInc.map((transaction) =>
                    transaction.amount)
                let totalIncToday =
                    sortTodayIncAmount.length > 0 ? sortTodayIncAmount.reduce((prev, current) => prev + current) : 0;
                state.todaysIncome = totalIncToday;

                const sortTodayExpAmount = sortTodayExp.map((transaction) =>
                    transaction.amount)
                let totalExpToday =
                    sortTodayExpAmount.length > 0 ? sortTodayExpAmount.reduce((prev, current) => prev + current) : 0;
                state.todaysExpense = totalExpToday;
            }
        },
        getWeekTransactions: {
            reducer(state) {
                const startOfWeek = moment().startOf('week').format('MM-DD-YYYY');
                const endOfWeek = moment().endOf('week').format('MM-DD-YYYY');
                const sortWeekInc = state.income.filter((transaction) =>
                    transaction.date >= startOfWeek && transaction.date <= endOfWeek)
                const sortWeekExp = state.expense.filter((transaction) =>
                    transaction.date >= startOfWeek && transaction.date <= endOfWeek)
                state.weekTransactions = [...sortWeekInc, ...sortWeekExp]

                const sortWeekIncAmount = sortWeekInc.map((transaction) =>
                    transaction.amount)
                let totalIncWeek =
                    sortWeekIncAmount.length > 0 ? sortWeekIncAmount.reduce((prev, current) => prev + current) : 0;
                state.weekIncome = totalIncWeek;

                const sortWeekExpAmount = sortWeekExp.map((transaction) =>
                    transaction.amount)
                let totalExpWeek =
                    sortWeekExpAmount.length > 0 ? sortWeekExpAmount.reduce((prev, current) => prev + current) : 0;
                state.weekExpense = totalExpWeek;
            }
        },
        getMonthTransactions: {
            reducer(state) {
                const startOfMonth = moment().startOf('month').format('MM-DD-YYYY');
                const endOfMonth = moment().endOf('month').format('MM-DD-YYYY');
                const sortMonthInc = state.income.filter((transaction) =>
                    transaction.date >= startOfMonth && transaction.date <= endOfMonth)
                const sortMonthExp = state.expense.filter((transaction) =>
                    transaction.date >= startOfMonth && transaction.date <= endOfMonth)
                state.monthTransactions = [...sortMonthInc, ...sortMonthExp]

                const sortMonthIncAmount = sortMonthInc.map((transaction) =>
                    transaction.amount)
                let totalIncMonth =
                    sortMonthIncAmount.length > 0 ? sortMonthIncAmount.reduce((prev, current) => prev + current) : 0;
                state.monthIncome = totalIncMonth;

                const sortMonthExpAmount = sortMonthExp.map((transaction) =>
                    transaction.amount)
                let totalExpMonth =
                    sortMonthExpAmount.length > 0 ? sortMonthExpAmount.reduce((prev, current) => prev + current) : 0;
                state.monthExpense = totalExpMonth;
            }
        },
        getHealthcareTotal: {
            reducer(state) {
                //All transactions
                const sortHealthcare = state.expense.filter((expense) =>
                    expense.category === 'Healthcare')
                let sortHealthcareAmount = sortHealthcare.map((healthcare) =>
                    healthcare.amount)
                let totalHealthcareAmount =
                    sortHealthcareAmount.length > 0 ? sortHealthcareAmount.reduce((prev, current) => prev + current) : 0;
                state.healthcareTotal = totalHealthcareAmount

                //Today transactions
                const sortHealthcareToday = state.todaysTransactions.filter((expense) =>
                    expense.category === 'Healthcare')
                let sortHealthcareTodayAmount = sortHealthcareToday.map((healthcare) =>
                    healthcare.amount)
                let totalHealthcareTodayAmount =
                    sortHealthcareTodayAmount.length > 0 ? sortHealthcareTodayAmount.reduce((prev, current) => prev + current) : 0;
                state.healthcareTodayTotal = totalHealthcareTodayAmount

                //Week transactions
                const sortHealthcareWeek = state.weekTransactions.filter((expense) =>
                    expense.category === 'Healthcare')
                let sortHealthcareWeekAmount = sortHealthcareWeek.map((healthcare) =>
                    healthcare.amount)
                let totalHealthcareWeekAmount =
                    sortHealthcareWeekAmount.length > 0 ? sortHealthcareWeekAmount.reduce((prev, current) => prev + current) : 0;
                state.healthcareWeekTotal = totalHealthcareWeekAmount

                //Month transactions
                const sortHealthcareMonth = state.monthTransactions.filter((expense) =>
                    expense.category === 'Healthcare')
                let sortHealthcareMonthAmount = sortHealthcareMonth.map((healthcare) =>
                    healthcare.amount)
                let totalHealthcareMonthAmount =
                    sortHealthcareMonthAmount.length > 0 ? sortHealthcareMonthAmount.reduce((prev, current) => prev + current) : 0;
                state.healthcareMonthTotal = totalHealthcareMonthAmount
            }
        },
        getHousingTotal: {
            reducer(state) {
                //All transactions
                const sortHousing = state.expense.filter((expense) =>
                    expense.category === 'Housing')
                let sortHousingAmount = sortHousing.map((housing) =>
                    housing.amount)
                let totalHousingAmount =
                    sortHousingAmount.length > 0 ? sortHousingAmount.reduce((prev, current) => prev + current) : 0;
                state.housingTotal = totalHousingAmount

                //Today transactions
                const sortHousingToday = state.todaysTransactions.filter((expense) =>
                    expense.category === 'Housing')
                let sortHousingTodayAmount = sortHousingToday.map((housing) =>
                    housing.amount)
                let totalHousingTodayAmount =
                    sortHousingTodayAmount.length > 0 ? sortHousingTodayAmount.reduce((prev, current) => prev + current) : 0;
                state.housingTodayTotal = totalHousingTodayAmount

                //Week transactions
                const sortHousingWeek = state.weekTransactions.filter((expense) =>
                    expense.category === 'Housing')
                let sortHousingWeekAmount = sortHousingWeek.map((housing) =>
                    housing.amount)
                let totalHousingWeekAmount =
                    sortHousingWeekAmount.length > 0 ? sortHousingWeekAmount.reduce((prev, current) => prev + current) : 0;
                state.housingWeekTotal = totalHousingWeekAmount

                //Month transactions
                const sortHousingMonth = state.monthTransactions.filter((expense) =>
                    expense.category === 'Housing')
                let sortHousingMonthAmount = sortHousingMonth.map((housing) =>
                    housing.amount)
                let totalHousingMonthAmount =
                    sortHousingMonthAmount.length > 0 ? sortHousingMonthAmount.reduce((prev, current) => prev + current) : 0;
                state.housingMonthTotal = totalHousingMonthAmount
            }
        },
        getTransportTotal: {
            reducer(state) {
                //All transactions
                const sortTransport = state.expense.filter((expense) =>
                    expense.category === 'Transportation')
                let sortTransportAmount = sortTransport.map((transport) =>
                    transport.amount)
                let totalTransportAmount =
                    sortTransportAmount.length > 0 ? sortTransportAmount.reduce((prev, current) => prev + current) : 0;
                state.transportTotal = totalTransportAmount

                //Today transactions
                const sortTransportToday = state.todaysTransactions.filter((expense) =>
                    expense.category === 'Transportation')
                let sortTransportTodayAmount = sortTransportToday.map((transport) =>
                    transport.amount)
                let totalTransportTodayAmount =
                    sortTransportTodayAmount.length > 0 ? sortTransportTodayAmount.reduce((prev, current) => prev + current) : 0;
                state.transportTodayTotal = totalTransportTodayAmount

                //Week transactions
                const sortTransportWeek = state.weekTransactions.filter((expense) =>
                    expense.category === 'Transportation')
                let sortTransportWeekAmount = sortTransportWeek.map((transport) =>
                    transport.amount)
                let totalTransportWeekAmount =
                    sortTransportWeekAmount.length > 0 ? sortTransportWeekAmount.reduce((prev, current) => prev + current) : 0;
                state.transportWeekTotal = totalTransportWeekAmount

                //Month transactions
                const sortTransportMonth = state.monthTransactions.filter((expense) =>
                    expense.category === 'Transportation')
                let sortTransportMonthAmount = sortTransportMonth.map((transport) =>
                    transport.amount)
                let totalTransportMonthAmount =
                    sortTransportMonthAmount.length > 0 ? sortTransportMonthAmount.reduce((prev, current) => prev + current) : 0;
                state.transportMonthTotal = totalTransportMonthAmount
            }
        },
        getUtilitiesTotal: {
            reducer(state) {
                //All transactions
                const sortUtil = state.expense.filter((expense) =>
                    expense.category === 'Utilities')
                let sortUtilAmount = sortUtil.map((util) =>
                    util.amount)
                let totalUtilAmount =
                    sortUtilAmount.length > 0 ? sortUtilAmount.reduce((prev, current) => prev + current) : 0;
                state.utilTotal = totalUtilAmount

                //Today transactions
                const sortUtilToday = state.todaysTransactions.filter((expense) =>
                    expense.category === 'Utilities')
                let sortUtilTodayAmount = sortUtilToday.map((Util) =>
                    Util.amount)
                let totalUtilTodayAmount =
                    sortUtilTodayAmount.length > 0 ? sortUtilTodayAmount.reduce((prev, current) => prev + current) : 0;
                state.utilTodayTotal = totalUtilTodayAmount

                //Week transactions
                const sortUtilWeek = state.weekTransactions.filter((expense) =>
                    expense.category === 'Utilities')
                let sortUtilWeekAmount = sortUtilWeek.map((Util) =>
                    Util.amount)
                let totalUtilWeekAmount =
                    sortUtilWeekAmount.length > 0 ? sortUtilWeekAmount.reduce((prev, current) => prev + current) : 0;
                state.utilWeekTotal = totalUtilWeekAmount

                //Month transactions
                const sortUtilMonth = state.monthTransactions.filter((expense) =>
                    expense.category === 'Utilities')
                let sortUtilMonthAmount = sortUtilMonth.map((Util) =>
                    Util.amount)
                let totalUtilMonthAmount =
                    sortUtilMonthAmount.length > 0 ? sortUtilMonthAmount.reduce((prev, current) => prev + current) : 0;
                state.utilMonthTotal = totalUtilMonthAmount
            }
        },
        getGroceriesTotal: {
            reducer(state) {
                //All transactions
                const sortGroc = state.expense.filter((expense) =>
                    expense.category === 'Groceries')
                let sortGrocAmount = sortGroc.map((groc) =>
                    groc.amount)
                let totalGrocAmount =
                    sortGrocAmount.length > 0 ? sortGrocAmount.reduce((prev, current) => prev + current) : 0;
                state.grocTotal = totalGrocAmount

                //Today transactions
                const sortGrocToday = state.todaysTransactions.filter((expense) =>
                    expense.category === 'Groceries')
                let sortGrocTodayAmount = sortGrocToday.map((groc) =>
                    groc.amount)
                let totalGrocTodayAmount =
                    sortGrocTodayAmount.length > 0 ? sortGrocTodayAmount.reduce((prev, current) => prev + current) : 0;
                state.grocTodayTotal = totalGrocTodayAmount

                //Week transactions
                const sortGrocWeek = state.weekTransactions.filter((expense) =>
                    expense.category === 'Groceries')
                let sortGrocWeekAmount = sortGrocWeek.map((groc) =>
                    groc.amount)
                let totalGrocWeekAmount =
                    sortGrocWeekAmount.length > 0 ? sortGrocWeekAmount.reduce((prev, current) => prev + current) : 0;
                state.grocWeekTotal = totalGrocWeekAmount

                //Month transactions
                const sortGrocMonth = state.monthTransactions.filter((expense) =>
                    expense.category === 'Groceries')
                let sortGrocMonthAmount = sortGrocMonth.map((groc) =>
                    groc.amount)
                let totalGrocMonthAmount =
                    sortGrocMonthAmount.length > 0 ? sortGrocMonthAmount.reduce((prev, current) => prev + current) : 0;
                state.grocMonthTotal = totalGrocMonthAmount
            }
        },
        getMembershipsTotal: {
            reducer(state) {
                //All transactions
                const sortMember = state.expense.filter((expense) =>
                    expense.category === 'Memberships')
                let sortMemberAmount = sortMember.map((member) =>
                    member.amount)
                let totalMemberAmount =
                    sortMemberAmount.length > 0 ? sortMemberAmount.reduce((prev, current) => prev + current) : 0;
                state.memberTotal = totalMemberAmount

                //Today transactions
                const sortMemberToday = state.todaysTransactions.filter((expense) =>
                    expense.category === 'Memberships')
                let sortMemberTodayAmount = sortMemberToday.map((member) =>
                    member.amount)
                let totalMemberTodayAmount =
                    sortMemberTodayAmount.length > 0 ? sortMemberTodayAmount.reduce((prev, current) => prev + current) : 0;
                state.memberTodayTotal = totalMemberTodayAmount

                //Week transactions
                const sortMemberWeek = state.weekTransactions.filter((expense) =>
                    expense.category === 'Memberships')
                let sortMemberWeekAmount = sortMemberWeek.map((member) =>
                    member.amount)
                let totalMemberWeekAmount =
                    sortMemberWeekAmount.length > 0 ? sortMemberWeekAmount.reduce((prev, current) => prev + current) : 0;
                state.memberWeekTotal = totalMemberWeekAmount

                //Month transactions
                const sortMemberMonth = state.monthTransactions.filter((expense) =>
                    expense.category === 'Memberships')
                let sortMemberMonthAmount = sortMemberMonth.map((member) =>
                    member.amount)
                let totalMemberMonthAmount =
                    sortMemberMonthAmount.length > 0 ? sortMemberMonthAmount.reduce((prev, current) => prev + current) : 0;
                state.memberMonthTotal = totalMemberMonthAmount
            }
        },
        getShoppingTotal: {
            reducer(state) {
                //All transactions
                const sortShop = state.expense.filter((expense) =>
                    expense.category === 'Shopping')
                let sortShopAmount = sortShop.map((shop) =>
                    shop.amount)
                let totalShopAmount =
                    sortShopAmount.length > 0 ? sortShopAmount.reduce((prev, current) => prev + current) : 0;
                state.shopTotal = totalShopAmount

                //Today transactions
                const sortShopToday = state.todaysTransactions.filter((expense) =>
                    expense.category === 'Shopping')
                let sortShopTodayAmount = sortShopToday.map((shop) =>
                    shop.amount)
                let totalShopTodayAmount =
                    sortShopTodayAmount.length > 0 ? sortShopTodayAmount.reduce((prev, current) => prev + current) : 0;
                state.shopTodayTotal = totalShopTodayAmount

                //Week transactions
                const sortShopWeek = state.weekTransactions.filter((expense) =>
                    expense.category === 'Shopping')
                let sortShopWeekAmount = sortShopWeek.map((shop) =>
                    shop.amount)
                let totalShopWeekAmount =
                    sortShopWeekAmount.length > 0 ? sortShopWeekAmount.reduce((prev, current) => prev + current) : 0;
                state.shopWeekTotal = totalShopWeekAmount

                //Month transactions
                const sortShopMonth = state.monthTransactions.filter((expense) =>
                    expense.category === 'Shopping')
                let sortShopMonthAmount = sortShopMonth.map((shop) =>
                    shop.amount)
                let totalShopMonthAmount =
                    sortShopMonthAmount.length > 0 ? sortShopMonthAmount.reduce((prev, current) => prev + current) : 0;
                state.shopMonthTotal = totalShopMonthAmount
            }
        },
        getEntertainmentTotal: {
            reducer(state) {
                //All transactions
                const sortEnter = state.expense.filter((expense) =>
                    expense.category === 'Entertainment')
                let sortEnterAmount = sortEnter.map((enter) =>
                    enter.amount)
                let totalEnterAmount =
                    sortEnterAmount.length > 0 ? sortEnterAmount.reduce((prev, current) => prev + current) : 0;
                state.enterTotal = totalEnterAmount

                //Today transactions
                const sortEnterToday = state.todaysTransactions.filter((expense) =>
                    expense.category === 'Entertainment')
                let sortEnterTodayAmount = sortEnterToday.map((enter) =>
                    enter.amount)
                let totalEnterTodayAmount =
                    sortEnterTodayAmount.length > 0 ? sortEnterTodayAmount.reduce((prev, current) => prev + current) : 0;
                state.enterTodayTotal = totalEnterTodayAmount

                //Week transactions
                const sortEnterWeek = state.weekTransactions.filter((expense) =>
                    expense.category === 'Entertainment')
                let sortEnterWeekAmount = sortEnterWeek.map((enter) =>
                    enter.amount)
                let totalEnterWeekAmount =
                    sortEnterWeekAmount.length > 0 ? sortEnterWeekAmount.reduce((prev, current) => prev + current) : 0;
                state.enterWeekTotal = totalEnterWeekAmount

                //Month transactions
                const sortEnterMonth = state.monthTransactions.filter((expense) =>
                    expense.category === 'Entertainment')
                let sortEnterMonthAmount = sortEnterMonth.map((enter) =>
                    enter.amount)
                let totalEnterMonthAmount =
                    sortEnterMonthAmount.length > 0 ? sortEnterMonthAmount.reduce((prev, current) => prev + current) : 0;
                state.enterMonthTotal = totalEnterMonthAmount
            }
        },
    }
});


//MIDDLEWARE
export const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        localStorage.setItem('reduxStore', JSON.stringify(getState()));
        return result;
    };
};

export const reHydrateStore = () => {
    if (localStorage.getItem('reduxStore') !== null) {
        return JSON.parse(localStorage.getItem('reduxStore')); // re-hydrate the store
    }
};

export const selectAllIncome = (state) => state.transactions.income
export const selectAllTransactions = (state) => state.transactions.allTransactions
export const selectAllExpense = (state) => state.transactions.expense
export const {
    addIncome,
    addExpense,
    deleteTransaction,
    resetTransactions,
    addDemoIncome,
    addDemoExpense,
    totalIncome,
    totalExpense,
    totalBudget,
    changePeriod,
    getTodaysTransactions,
    getWeekTransactions,
    getMonthTransactions,
    totalTransactions,
    getHealthcareTotal,
    healthcareTotal,
    healthcareMonthTotal,
    healthcareTodayTotal,
    healthcareWeekTotal,
    getHousingTotal,
    housingTotal,
    housingMonthTotal,
    houdingTodayTotal,
    housingWeekTotal,
    getTransportTotal,
    transportTotal,
    transportMonthTotal,
    transportTodayTotal,
    transportWeekTotal,
    getUtilitiesTotal,
    utilTotal,
    utilTodayTotal,
    utilMonthTotal,
    utilWeekTotal,
    getGroceriesTotal,
    grocTotal,
    grocTodayTotal,
    grocMonthTotal,
    grocWeekTotal,
    getMembershipsTotal,
    memberTotal,
    memberTodayTotal,
    memberMonthTotal,
    memberWeekTotal,
    getShoppingTotal,
    shopTotal,
    shopTodayTotal,
    shopMonthTotal,
    shopWeekTotal,
    getEntertainmentTotal,
    enterTotal,
    enterTodayTotal,
    enterMonthTotal,
    enterWeekTotal,
} = transactionSlice.actions
export default transactionSlice.reducer;
