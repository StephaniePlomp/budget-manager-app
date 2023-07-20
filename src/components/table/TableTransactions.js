import "./TableTransactions.css";
import { useSelector } from 'react-redux';
import {
  selectAllIncome,
  selectAllExpense,
  deleteTransaction,
  totalIncome,
  totalExpense,
  totalBudget,
  getTodaysTransactions,
  totalTransactions,
  getWeekTransactions,
  getMonthTransactions,
} from '../../features/transaction/transactionSlice';
import { useDispatch } from 'react-redux';
import { UilTrash, UilSearch } from '@iconscout/react-unicons'
import { Tooltip } from '@mui/material';
import { useEffect, useState, useRef, useCallback } from 'react';
import Pagination from "@mui/material/Pagination";
import { NumericFormat } from 'react-number-format';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';

const TableTransactions = ({ page, setPage, setIsAdded, isAdded }) => {
  const dispatch = useDispatch();
  const income = useSelector(selectAllIncome)
  const expense = useSelector(selectAllExpense)
  const periodIndex = useSelector((state) => state.transactions.period)
  const transactions = useSelector((state) => state.transactions.allTransactions)
  const todaysTransactions = useSelector((state) => state.transactions.todaysTransactions)
  const weekTransactions = useSelector((state) => state.transactions.weekTransactions)
  const monthTransactions = useSelector((state) => state.transactions.monthTransactions)
  const addedId = useSelector((state) => state.transactions.addedId)


  useEffect(() => {
    dispatch(totalIncome());
    dispatch(totalExpense())
    dispatch(totalBudget())
    dispatch(getTodaysTransactions())
    dispatch(totalTransactions())
    dispatch(getWeekTransactions())
    dispatch(getMonthTransactions())
  }, [dispatch, income, expense, periodIndex])

  // media query
  const isDesktop = useMediaQuery({
    query: '(min-width: 480px)'
  });

  const isMobile = useMediaQuery({
    query: '(max-width: 480px)'
  });

  // framer-motion variants
  const wrapperVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    }
  };

  const [emptyRows, setEmptyRows] = useState(0)
  const rowsPerPage = 5;
  const [heightEmptyRows, setHeightEmptyRows] = useState(0)
  const handleChangePage = (event, newPage) => setPage(newPage);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (isDesktop) {
      setHeightEmptyRows(34)
    } else if (isMobile) {
      setHeightEmptyRows(66)
    }
  }, [isDesktop, isMobile])

  // when changing periodindex, set page to 1
  useEffect(() => {
    setPage(1)
  }, [periodIndex, setPage])

  // search 
  const HandleActiveSearch = () => {
    setSearchActive(!searchActive)
  }

  const handleCancel = () => {
    setSearchActive(false)
    setSearch("")
    setPage(1);
  }

  const searchRef = useRef();

  const handleSearch = (e) => {
    setSearch(e.target.value)
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
    setPage(1);
  }

  const [searchActive, setSearchActive] = useState(false);
  const [search, setSearch] = useState("");

  // changing transactions based on period and filter items with search
  const [transactionPeriod, setTransactionPeriod] = useState([])

  const handleTransactions = useCallback(() => {
    if (periodIndex === 0) {
      const filterTransactions = transactions.filter((transaction) =>
        search.toLocaleLowerCase() === '' ? transaction : transaction.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      const sortTransactions = filterTransactions.sort((a, b) => new Date(b.date.replace(/-/g, "/")) - new Date(a.date.replace(/-/g, "/")))
      return sortTransactions;
    } else if (periodIndex === 1) {
      const filterTodaysTransactions = todaysTransactions.filter((transaction) =>
        search.toLocaleLowerCase() === '' ? transaction : transaction.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        const sortTodaysTransactions = filterTodaysTransactions.sort((a, b) => new Date(b.date.replace(/-/g, "/")) - new Date(a.date.replace(/-/g, "/")))
      return sortTodaysTransactions;
    } else if (periodIndex === 2) {
      const filterWeekTransactions = weekTransactions.filter((transaction) =>
        search.toLocaleLowerCase() === '' ? transaction : transaction.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        const sortWeekTransactions = filterWeekTransactions.sort((a, b) => new Date(b.date.replace(/-/g, "/")) - new Date(a.date.replace(/-/g, "/")))
      return sortWeekTransactions;
    } else if (periodIndex === 3) {
      const filterMonthTransactions = monthTransactions.filter((transaction) =>
        search.toLocaleLowerCase() === '' ? transaction : transaction.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        const sortMonthTransactions = filterMonthTransactions.sort((a, b) => new Date(b.date.replace(/-/g, "/")) - new Date(a.date.replace(/-/g, "/")))
      return sortMonthTransactions;
    }
  }, [search, periodIndex, transactions, todaysTransactions, weekTransactions, monthTransactions])



  useEffect(() => {
    setTransactionPeriod(handleTransactions())
  }, [handleTransactions])

  //counting items and setting the empty rows on last page
  useEffect(() => {
    if (periodIndex === 0) {
      setItemCount(Math.ceil(transactionPeriod.length / rowsPerPage))
      setEmptyRows(page > 0 ? Math.max(0, (0 + page) * rowsPerPage - transactionPeriod.length) : 5)
    } else if
      (periodIndex === 1) {
      setItemCount(Math.ceil(transactionPeriod.length / rowsPerPage))
      setEmptyRows(page > 0 ? Math.max(0, (0 + page) * rowsPerPage - transactionPeriod.length) : 5)
    } else if
      (periodIndex === 2) {
      setItemCount(Math.ceil(transactionPeriod.length / rowsPerPage))
      setEmptyRows(page > 0 ? Math.max(0, (0 + page) * rowsPerPage - transactionPeriod.length) : 5)
    } else if
      (periodIndex === 3) {
      setItemCount(Math.ceil(transactionPeriod.length / rowsPerPage))
      setEmptyRows(page > 0 ? Math.max(0, (0 + page) * rowsPerPage - transactionPeriod.length) : 5)
    }
  }, [transactionPeriod.length, todaysTransactions, weekTransactions, monthTransactions, periodIndex, page])


  // When removing items, the page needs to be set to the previous one
  useEffect(() => {
    if (periodIndex === 0 && emptyRows > 4 && itemCount > 0) {
      setPage(Math.ceil(transactionPeriod.length / rowsPerPage))
    } else if
      (periodIndex === 1 && emptyRows > 4 && itemCount > 0) {
      setPage(Math.ceil(transactionPeriod.length / rowsPerPage))
    } else if
      (periodIndex === 2 && emptyRows > 4 && itemCount > 0) {
      setPage(Math.ceil(transactionPeriod.length / rowsPerPage))
    } else if
      (periodIndex === 3 && emptyRows > 4 && itemCount > 0) {
      setPage(Math.ceil(transactionPeriod.length / rowsPerPage))
    }
  }, [emptyRows, periodIndex, itemCount, transactionPeriod.length, todaysTransactions.length, weekTransactions.length, monthTransactions.length, setPage])


  // showing no transactions text when there aren't transactions
  const [noTransactions, setNoTransactions] = useState("")

  const handleNoTransactions = useCallback(() => {
    if (transactionPeriod.length === 0 && periodIndex === 0 && search.length === 0) {
      return "There are no transactions";
    } else if (transactionPeriod.length === 0 && periodIndex === 1 && search.length === 0) {
      return "There are no transactions for today";
    } else if (transactionPeriod.length === 0 && periodIndex === 2 && search.length === 0) {
      return "There are no transactions this week";
    } else if (transactionPeriod.length === 0 && periodIndex === 3 && search.length === 0) {
      return "There are no transactions this month";
    } else if (transactionPeriod.length === 0 && periodIndex === 0 && search.length > 0) {
      return "Sorry, we didn't find any results";
    } else if (transactionPeriod.length === 0 && periodIndex === 1 && search.length > 0) {
      return "Sorry, we didn't find any results";
    } else if (transactionPeriod.length === 0 && periodIndex === 2 && search.length > 0) {
      return "Sorry, we didn't find any results";
    } else if (transactionPeriod.length === 0 && periodIndex === 3 && search.length > 0) {
      return "Sorry, we didn't find any results";
    }
  }, [periodIndex, search.length, transactionPeriod.length])

  useEffect(() => {
    setNoTransactions(handleNoTransactions())
  }, [handleNoTransactions])
  

  // Scrolling down when new item is added
  // When adding item, going to right pageNumber
  // Animation when item is added
  const tableRef = useRef();
  const [itemAnimation, setItemAnimation] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

const handleAddingItem = useCallback(() => {
  let allIds = transactionPeriod.map((item) => item.id);
  let index = Object.keys(allIds).find((key) => allIds[key] === addedId); index++
  setPageNumber(Math.ceil(index / rowsPerPage))

if (isAdded && !isNaN(pageNumber)) {
  setPage(pageNumber)
  tableRef.current?.scrollIntoView({ behavior: 'smooth' })
  setItemAnimation(true)
}
}, [addedId, isAdded, setPage, transactionPeriod, pageNumber])

useEffect(() => {
handleAddingItem()
},[handleAddingItem])

  // CSS animation only showing one time
  useEffect(() => {
    const timeAdded = setTimeout(() => {
      setItemAnimation(false)
      setIsAdded(false)
    }, 3000)
    return () => {
      clearTimeout(timeAdded)
    }
  }, [setItemAnimation, setIsAdded, isAdded])

  return (
    <>
      <motion.div
        layout
        variants={wrapperVariants}
        animate={searchActive ? 'visible' : 'hidden'}
        transition={{ duration: 0.5 }}
        className="search-component">
        {searchActive &&
          <>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search transactions"
              className="searchbar"
              onChange={handleSearch}
              value={search}
            />
            <div
              className='cancel-search-btn-expanded'
              onClick={handleCancel}>
              Cancel
            </div>
          </>
        }
      </motion.div>

      <div className="table-container" ref={tableRef}>
        <table>
          <thead>
            <tr>
              {isDesktop &&
                <>
                  <th>Title</th>
                  <th>Category</th>
                </>
              }
              {isMobile &&
                <>
                  <th>Title/Cat.</th>
                </>
              }
              <th>Date</th>
              <th>Amount</th>
              <th>
                <Tooltip title="Click to search for transactions"
                  placement='top'
                  arrow>
                  <div
                    className='search-transactions'
                    onClick={HandleActiveSearch}
                  >
                    <UilSearch className="search-button" />
                  </div>
                </Tooltip>
              </th>
            </tr>
          </thead>

          <tbody>
            {transactionPeriod.slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((transaction) => (
                <tr key={transaction.id}
                  className={transaction.id === addedId && itemAnimation ? "added" : null}
                >
                  {isDesktop &&
                    <>
                      <td>{transaction.title}</td>
                      <td>{transaction.category}</td>
                    </>
                  }
                  {isMobile &&
                    <>
                      <td className="td-mobile">{transaction.title}/<span>{transaction.category}</span></td>
                    </>
                  }
                  <td>{transaction.date}</td>
                  {transaction.type === 'plus' &&
                    <td>
                      <span className='amount-plus'>+  </span>
                      <NumericFormat value={transaction.amount} displayType="text" thousandSeparator={true} prefix="$" />
                    </td>}
                  {transaction.type === 'min' &&
                    <td>
                      <span className='amount-min'>- </span>
                      <NumericFormat value={transaction.amount} displayType="text" thousandSeparator={true} prefix="$" />
                    </td>}
                  <td>
                    <Tooltip title="Delete"
                      placement='top'
                      arrow>
                      <div
                        className='delete-transaction-btn'
                        onClick={() => dispatch(deleteTransaction({ id: transaction.id }))}>
                        <UilTrash />
                      </div>
                    </Tooltip>
                  </td>
                </tr>
              ))}
          </tbody>

          <tbody>
            <tr>
              <td
                className="no-transactions"
                colSpan="4">{noTransactions}
              </td>

              {emptyRows > 0 && (
                <td className="no-transactions" style={{ height: `${heightEmptyRows}` * emptyRows }}>
                </td>
              )}
            </tr>
          </tbody>

        </table>
        <Pagination
          size="small"
          className="pagination"
          variant="outlined"
          shape="rounded"
          count={itemCount}
          onChange={handleChangePage}
          page={page}
          showFirstButton
          showLastButton
        ></Pagination>
      </div>
    </>
  )
}

export default TableTransactions;