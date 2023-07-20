import { Routes, Route } from 'react-router-dom';
import './App.css'
import { useState, useEffect } from "react";
import MainDash from './components/maindash/Maindash';
import Sidebar from './components/sidebar/Sidebar';
import Expense from './components/expense/Expense';
import Income from './components/income/Income';
import Message from './components/message/Message';
import { AnimatePresence, motion } from 'framer-motion';


function App() {
  const dataIncome = [
    { id: '1', title: 'Salary', category: 'Income', amount: 7890, date: '01-30-2023', type: 'plus' },
    { id: '2', title: 'Salary', category: 'Income', amount: 7890, date: '02-28-2023', type: 'plus' },
    { id: '3', title: 'Salary', category: 'Income', amount: 7890, date: '03-30-2023', type: 'plus' },
    { id: '4', title: 'Salary', category: 'Income', amount: 7890, date: '04-30-2023', type: 'plus' },
    { id: '5', title: 'Salary', category: 'Income', amount: 7890, date: '05-30-2023', type: 'plus' },
    { id: '6', title: 'Salary', category: 'Income', amount: 7890, date: '06-30-2023', type: 'plus' },
    { id: '7', title: 'Salary', category: 'Income', amount: 7890, date: '07-30-2023', type: 'plus' },
    { id: '8', title: 'Salary', category: 'Income', amount: 7890, date: '08-30-2023', type: 'plus' },
    { id: '9', title: 'Salary', category: 'Income', amount: 7890, date: '09-30-2023', type: 'plus' },
    { id: '10', title: 'Salary', category: 'Income', amount: 7890, date: '10-30-2023', type: 'plus' },
    { id: '11', title: 'Salary', category: 'Income', amount: 7890, date: '11-30-2023', type: 'plus' },
    { id: '12', title: 'Salary', category: 'Income', amount: 7890, date: '12-30-2023', type: 'plus' },
    { id: '14', title: 'Bonus', category: 'Income', amount: 4890, date: '01-10-2023', type: 'plus' },
  ]

  const dataExpense = [
    { id: '201', title: 'Medicines', category: 'Healthcare', amount: 75, date: '01-25-2023', type: 'min' },
    { id: '202', title: 'Medicines', category: 'Healthcare', amount: 75, date: '02-25-2023', type: 'min' },
    { id: '203', title: 'Medicines', category: 'Healthcare', amount: 75, date: '03-25-2023', type: 'min' },
    { id: '204', title: 'Medicines', category: 'Healthcare', amount: 75, date: '04-25-2023', type: 'min' },
    { id: '205', title: 'Medicines', category: 'Healthcare', amount: 75, date: '05-25-2023', type: 'min' },
    { id: '206', title: 'Medicines', category: 'Healthcare', amount: 75, date: '06-25-2023', type: 'min' },
    { id: '207', title: 'Medicines', category: 'Healthcare', amount: 75, date: '07-25-2023', type: 'min' },
    { id: '208', title: 'Medicines', category: 'Healthcare', amount: 75, date: '08-25-2023', type: 'min' },
    { id: '210', title: 'Medicines', category: 'Healthcare', amount: 75, date: '09-25-2023', type: 'min' },
    { id: '211', title: 'Medicines', category: 'Healthcare', amount: 75, date: '10-25-2023', type: 'min' },
    { id: '212', title: 'Medicines', category: 'Healthcare', amount: 75, date: '11-25-2023', type: 'min' },
    { id: '213', title: 'Medicines', category: 'Healthcare', amount: 75, date: '12-25-2023', type: 'min' },
    { id: '216', title: 'Rent apt', category: 'Housing', amount: 2450, date: '01-01-2023', type: 'min' },
    { id: '217', title: 'Rent apt', category: 'Housing', amount: 2450, date: '02-01-2023', type: 'min' },
    { id: '218', title: 'Rent apt', category: 'Housing', amount: 2450, date: '03-01-2023', type: 'min' },
    { id: '219', title: 'Rent apt', category: 'Housing', amount: 2450, date: '04-01-2023', type: 'min' },
    { id: '220', title: 'Rent apt', category: 'Housing', amount: 2450, date: '05-01-2023', type: 'min' },
    { id: '221', title: 'Rent apt', category: 'Housing', amount: 2450, date: '06-01-2023', type: 'min' },
    { id: '222', title: 'Rent apt', category: 'Housing', amount: 2450, date: '07-01-2023', type: 'min' },
    { id: '223', title: 'Rent apt', category: 'Housing', amount: 2450, date: '08-01-2023', type: 'min' },
    { id: '224', title: 'Rent apt', category: 'Housing', amount: 2450, date: '09-01-2023', type: 'min' },
    { id: '225', title: 'Rent apt', category: 'Housing', amount: 2450, date: '10-01-2023', type: 'min' },
    { id: '226', title: 'Rent apt', category: 'Housing', amount: 2450, date: '11-01-2023', type: 'min' },
    { id: '227', title: 'Rent apt', category: 'Housing', amount: 2450, date: '12-01-2023', type: 'min' },
    { id: '230', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '01-27-2023', type: 'min' },
    { id: '231', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '02-27-2023', type: 'min' },
    { id: '232', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '03-27-2023', type: 'min' },
    { id: '233', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '04-27-2023', type: 'min' },
    { id: '234', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '05-27-2023', type: 'min' },
    { id: '235', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '06-27-2023', type: 'min' },
    { id: '236', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '07-27-2023', type: 'min' },
    { id: '237', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '08-27-2023', type: 'min' },
    { id: '238', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '09-27-2023', type: 'min' },
    { id: '239', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '10-27-2023', type: 'min' },
    { id: '240', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '11-27-2023', type: 'min' },
    { id: '241', title: 'Gas & electric', category: 'Utilities', amount: 210, date: '12-27-2023', type: 'min' },
    { id: '244', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '01-04-2023', type: 'min' },
    { id: '245', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '01-11-2023', type: 'min' },
    { id: '246', title: 'Shoprite', category: 'Groceries', amount: 76, date: '01-18-2023', type: 'min' },
    { id: '247', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '01-25-2023', type: 'min' },
    { id: '248', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '02-04-2023', type: 'min' },
    { id: '249', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '02-11-2023', type: 'min' },
    { id: '250', title: 'Shoprite', category: 'Groceries', amount: 76, date: '02-18-2023', type: 'min' },
    { id: '251', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '02-25-2023', type: 'min' },
    { id: '252', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '03-04-2023', type: 'min' },
    { id: '253', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '03-11-2023', type: 'min' },
    { id: '254', title: 'Shoprite', category: 'Groceries', amount: 76, date: '03-18-2023', type: 'min' },
    { id: '255', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '03-25-2023', type: 'min' },
    { id: '256', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '04-04-2023', type: 'min' },
    { id: '257', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '04-11-2023', type: 'min' },
    { id: '258', title: 'Shoprite', category: 'Groceries', amount: 76, date: '04-18-2023', type: 'min' },
    { id: '259', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '04-25-2023', type: 'min' },
    { id: '260', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '05-04-2023', type: 'min' },
    { id: '261', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '05-11-2023', type: 'min' },
    { id: '262', title: 'Shoprite', category: 'Groceries', amount: 76, date: '05-18-2023', type: 'min' },
    { id: '263', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '05-25-2023', type: 'min' },
    { id: '264', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '06-04-2023', type: 'min' },
    { id: '265', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '06-11-2023', type: 'min' },
    { id: '266', title: 'Shoprite', category: 'Groceries', amount: 76, date: '06-18-2023', type: 'min' },
    { id: '267', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '06-25-2023', type: 'min' },
    { id: '268', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '07-04-2023', type: 'min' },
    { id: '269', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '07-11-2023', type: 'min' },
    { id: '270', title: 'Shoprite', category: 'Groceries', amount: 76, date: '07-18-2023', type: 'min' },
    { id: '271', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '07-25-2023', type: 'min' },
    { id: '272', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '08-04-2023', type: 'min' },
    { id: '273', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '08-11-2023', type: 'min' },
    { id: '274', title: 'Shoprite', category: 'Groceries', amount: 76, date: '08-18-2023', type: 'min' },
    { id: '275', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '08-25-2023', type: 'min' },
    { id: '276', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '09-04-2023', type: 'min' },
    { id: '277', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '09-11-2023', type: 'min' },
    { id: '278', title: 'Shoprite', category: 'Groceries', amount: 76, date: '09-18-2023', type: 'min' },
    { id: '279', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '09-25-2023', type: 'min' },
    { id: '280', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '10-04-2023', type: 'min' },
    { id: '281', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '10-11-2023', type: 'min' },
    { id: '281', title: 'Shoprite', category: 'Groceries', amount: 76, date: '10-18-2023', type: 'min' },
    { id: '282', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '10-25-2023', type: 'min' },
    { id: '283', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '11-04-2023', type: 'min' },
    { id: '284', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '11-11-2023', type: 'min' },
    { id: '285', title: 'Shoprite', category: 'Groceries', amount: 76, date: '11-18-2023', type: 'min' },
    { id: '286', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '11-25-2023', type: 'min' },
    { id: '287', title: 'Whole Foods', category: 'Groceries', amount: 120, date: '12-04-2023', type: 'min' },
    { id: '288', title: 'Whole Foods', category: 'Groceries', amount: 89, date: '12-11-2023', type: 'min' },
    { id: '289', title: 'Shoprite', category: 'Groceries', amount: 76, date: '12-18-2023', type: 'min' },
    { id: '290', title: 'Whole Foods', category: 'Groceries', amount: 114, date: '12-25-2023', type: 'min' },
    { id: '299', title: 'Fitness', category: 'Memberships', amount: 70, date: '01-15-2023', type: 'min' },
    { id: '300', title: 'Fitness', category: 'Memberships', amount: 70, date: '02-15-2023', type: 'min' },
    { id: '301', title: 'Fitness', category: 'Memberships', amount: 70, date: '03-15-2023', type: 'min' },
    { id: '302', title: 'Fitness', category: 'Memberships', amount: 70, date: '04-15-2023', type: 'min' },
    { id: '303', title: 'Fitness', category: 'Memberships', amount: 70, date: '05-15-2023', type: 'min' },
    { id: '304', title: 'Fitness', category: 'Memberships', amount: 70, date: '06-15-2023', type: 'min' },
    { id: '305', title: 'Fitness', category: 'Memberships', amount: 70, date: '07-15-2023', type: 'min' },
    { id: '307', title: 'Fitness', category: 'Memberships', amount: 70, date: '08-15-2023', type: 'min' },
    { id: '308', title: 'Fitness', category: 'Memberships', amount: 70, date: '09-15-2023', type: 'min' },
    { id: '309', title: 'Fitness', category: 'Memberships', amount: 70, date: '10-15-2023', type: 'min' },
    { id: '310', title: 'Fitness', category: 'Memberships', amount: 70, date: '11-15-2023', type: 'min' },
    { id: '311', title: 'Fitness', category: 'Memberships', amount: 70, date: '12-15-2023', type: 'min' },
    { id: '314', title: 'Insurance', category: 'Healthcare', amount: 220, date: '01-10-2023', type: 'min' },
    { id: '315', title: 'Insurance', category: 'Healthcare', amount: 220, date: '02-10-2023', type: 'min' },
    { id: '316', title: 'Insurance', category: 'Healthcare', amount: 220, date: '03-10-2023', type: 'min' },
    { id: '317', title: 'Insurance', category: 'Healthcare', amount: 220, date: '04-10-2023', type: 'min' },
    { id: '318', title: 'Insurance', category: 'Healthcare', amount: 220, date: '05-10-2023', type: 'min' },
    { id: '319', title: 'Insurance', category: 'Healthcare', amount: 220, date: '06-10-2023', type: 'min' },
    { id: '320', title: 'Insurance', category: 'Healthcare', amount: 220, date: '07-10-2023', type: 'min' },
    { id: '321', title: 'Insurance', category: 'Healthcare', amount: 220, date: '08-10-2023', type: 'min' },
    { id: '322', title: 'Insurance', category: 'Healthcare', amount: 220, date: '09-10-2023', type: 'min' },
    { id: '323', title: 'Insurance', category: 'Healthcare', amount: 220, date: '10-10-2023', type: 'min' },
    { id: '324', title: 'Insurance', category: 'Healthcare', amount: 220, date: '11-10-2023', type: 'min' },
    { id: '325', title: 'Insurance', category: 'Healthcare', amount: 220, date: '12-10-2023', type: 'min' },
    { id: '328', title: 'Car lease', category: 'Transportation', amount: 487, date: '01-19-2023', type: 'min' },
    { id: '329', title: 'Car lease', category: 'Transportation', amount: 487, date: '02-19-2023', type: 'min' },
    { id: '330', title: 'Car lease', category: 'Transportation', amount: 487, date: '03-19-2023', type: 'min' },
    { id: '331', title: 'Car lease', category: 'Transportation', amount: 487, date: '04-19-2023', type: 'min' },
    { id: '332', title: 'Car lease', category: 'Transportation', amount: 487, date: '05-19-2023', type: 'min' },
    { id: '333', title: 'Car lease', category: 'Transportation', amount: 487, date: '06-19-2023', type: 'min' },
    { id: '334', title: 'Car lease', category: 'Transportation', amount: 487, date: '07-19-2023', type: 'min' },
    { id: '335', title: 'Car lease', category: 'Transportation', amount: 487, date: '08-19-2023', type: 'min' },
    { id: '336', title: 'Car lease', category: 'Transportation', amount: 487, date: '09-19-2023', type: 'min' },
    { id: '337', title: 'Car lease', category: 'Transportation', amount: 487, date: '10-19-2023', type: 'min' },
    { id: '338', title: 'Car lease', category: 'Transportation', amount: 487, date: '11-19-2023', type: 'min' },
    { id: '339', title: 'Car lease', category: 'Transportation', amount: 487, date: '12-19-2023', type: 'min' },
    { id: '342', title: 'Clothes', category: 'Shopping', amount: 165, date: '01-23-2023', type: 'min' },
    { id: '343', title: 'Clothes', category: 'Shopping', amount: 165, date: '02-23-2023', type: 'min' },
    { id: '344', title: 'Clothes', category: 'Shopping', amount: 165, date: '03-23-2023', type: 'min' },
    { id: '345', title: 'Clothes', category: 'Shopping', amount: 165, date: '04-23-2023', type: 'min' },
    { id: '346', title: 'Clothes', category: 'Shopping', amount: 165, date: '05-23-2023', type: 'min' },
    { id: '347', title: 'Clothes', category: 'Shopping', amount: 165, date: '06-23-2023', type: 'min' },
    { id: '348', title: 'Clothes', category: 'Shopping', amount: 165, date: '07-23-2023', type: 'min' },
    { id: '349', title: 'Clothes', category: 'Shopping', amount: 165, date: '08-23-2023', type: 'min' },
    { id: '350', title: 'Clothes', category: 'Shopping', amount: 165, date: '09-23-2023', type: 'min' },
    { id: '351', title: 'Clothes', category: 'Shopping', amount: 165, date: '10-23-2023', type: 'min' },
    { id: '352', title: 'Clothes', category: 'Shopping', amount: 165, date: '11-23-2023', type: 'min' },
    { id: '353', title: 'Clothes', category: 'Shopping', amount: 165, date: '12-23-2023', type: 'min' },
    { id: '356', title: 'Netflix', category: 'Entertainment', amount: 20, date: '01-06-2023', type: 'min' },
    { id: '357', title: 'Netflix', category: 'Entertainment', amount: 20, date: '02-06-2023', type: 'min' },
    { id: '358', title: 'Netflix', category: 'Entertainment', amount: 20, date: '03-06-2023', type: 'min' },
    { id: '359', title: 'Netflix', category: 'Entertainment', amount: 20, date: '04-06-2023', type: 'min' },
    { id: '360', title: 'Netflix', category: 'Entertainment', amount: 20, date: '05-06-2023', type: 'min' },
    { id: '361', title: 'Netflix', category: 'Entertainment', amount: 20, date: '06-06-2023', type: 'min' },
    { id: '362', title: 'Netflix', category: 'Entertainment', amount: 20, date: '07-06-2023', type: 'min' },
    { id: '363', title: 'Netflix', category: 'Entertainment', amount: 20, date: '08-06-2023', type: 'min' },
    { id: '364', title: 'Netflix', category: 'Entertainment', amount: 20, date: '09-06-2023', type: 'min' },
    { id: '365', title: 'Netflix', category: 'Entertainment', amount: 20, date: '10-06-2023', type: 'min' },
    { id: '366', title: 'Netflix', category: 'Entertainment', amount: 20, date: '11-06-2023', type: 'min' },
    { id: '367', title: 'Netflix', category: 'Entertainment', amount: 20, date: '12-06-2023', type: 'min' },
  ]

  const [searchActive, setSearchActive] = useState(false)
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  const [show, setShow] = useState(true)

  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 8000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  return (
      <div className="app">
        <AnimatePresence>
          {show &&
            <motion.div
              key={1}
              initial={{ y: -50, opacity: 0, height: "auto" }}
              animate={{ y: 0, opacity: 1, height: "auto" }}
              transition={{ duration: 1 }}
              exit={{ y: -50, opacity: 0, height: 0 }}
            >
              <div className='welcome-text'>
                <Message dataIncome={dataIncome} dataExpense={dataExpense} />
              </div>
            </motion.div>
          }
          <div className="app-glass">
            <Sidebar page={page} setPage={setPage} dataIncome={dataIncome} dataExpense={dataExpense} show={show} setSearchActive={setSearchActive} searchActive={searchActive} query={query} setQuery={setQuery} />
            <Routes>
              <Route path='/' exact element={<MainDash page={page} setPage={setPage} setSearchActive={setSearchActive} searchActive={searchActive} query={query} setQuery={setQuery} isAdded={isAdded} setIsAdded={setIsAdded} />} />
              <Route path='/add-income' exact element={<Income isAdded={isAdded} setIsAdded={setIsAdded} />} />
              <Route path='/add-expense' exact element={<Expense isAdded={isAdded} setIsAdded={setIsAdded} />} />
            </Routes>
          </div>
        </AnimatePresence>
      </div>
  );
}

export default App;

