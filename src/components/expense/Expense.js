import React, { useState } from 'react';
import './Expense.css';
import { UilTimes } from '@iconscout/react-unicons';
import { Link, useNavigate } from 'react-router-dom';
import { categoryOptions } from "../../data/Data";
import { useDispatch } from 'react-redux';
import moment from 'moment/moment';
import { addExpense, changePeriod } from '../../features/transaction/transactionSlice';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';

const Expense = ({ setIsAdded }) => {
    const navigate = useNavigate()
    const cat = categoryOptions;

    const [category, setCategory] = useState("");

    const handleCategory = (event) => {
        setCategory(event.target.value);
    };

    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0);
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')

    const onTitleChange = e => setTitle(e.target.value)
    const onAmountChange = e => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value))

            setAmount(e.target.value)
        const val = parseFloat(e.target.value);
        if (isNaN(val)) {
            setAmount('');
            return;
        }
        setAmount(val);
    }

    const onDateChange = e => setDate(e.target.value)
    const formatDate = moment(moment((date), 'YYYY-MM-DD')).format('MM-DD-YYYY');

    const [titleError, setTitleError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);


    const onSaveExpenseClick = (e) => {
        e.preventDefault()
        setTitleError(false)
        setAmountError(false)
        setDateError(false)
        setCategoryError(false)

        if (title === '') {
            setTitleError(true)
        }

        if (amount === 0) {
            setAmountError(true)
        }

        if (date === '') {
            setDateError(true)
        }

        if (category === '') {
            setCategoryError(true)
        }

        if (title && amount && date && category) {
            dispatch(
                addExpense(title, formatDate, amount, category)
            )

            setTitle('')
            setAmount('')
            setDate('')
            setCategory('')
            navigate("/")
            dispatch(changePeriod(0))
            setIsAdded(true)
        }
    }

    return (
        <div className='transaction-container'>
            <div className='transaction-top'>
                <Link to='/' className='transaction-button'>
                    <div className='btn-cancel'>
                        <UilTimes />
                        <label>Cancel transaction</label>
                    </div>
                </Link>
            </div>
            <div className='transaction-card'>
                <div className="transaction-title">
                    Add new expense
                </div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, display: "flex" },
                    }}
                    autoComplete="off"
                    noValidate
                    onSubmit={onSaveExpenseClick}
                >
                    <TextField
                        className='textfield'
                        variant="outlined"
                        label="Name of Expense"
                        value={title}
                        onChange={onTitleChange}
                        required
                        inputProps={{ maxLength: 15 }}
                        error={titleError}
                        helperText={titleError && "Please fill in the name"}
                    />
                    <TextField
                        className='textfield'
                        value={amount}
                        id="filled-adornment-amount"
                        inputProps={{ maxLength: 6 }}
                        onChange={onAmountChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        required
                        error={amountError}
                        helperText={amountError && "Please fill in the amount"}
                    />

                    <TextField
                        InputLabelProps={{ shrink: true }}
                        className='textfield'
                        label="Date of Expense"
                        type='date'
                        id='date'
                        value={date ? date : ''}
                        onChange={onDateChange}
                        required
                        error={dateError}
                        helperText={dateError && "Please select the date"}
                    />

                    <TextField
                        className='textfield'
                        id="demo-simple-select"
                        value={category}
                        label="Select Category"
                        select
                        onChange={handleCategory}
                        required
                        error={categoryError}
                        helperText={categoryError && "Please select the category"}
                    >
                        {cat.map((categories) => (
                            <MenuItem
                                key={categories.id}
                                value={categories.title}
                            >
                                <categories.icon
                                    className='category-icon' />
                                <label>
                                    {categories.title}</label>
                            </MenuItem>
                        ))}
                    </TextField>
                    <Typography align='center'>
                        <button className='add-btn'>Submit</button>
                    </Typography>
                </Box>
            </div>
        </div>
    );
};
export default Expense;