import './Income.css';
import React, { useState } from 'react';
import { UilTimes } from '@iconscout/react-unicons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addIncome, changePeriod } from '../../features/transaction/transactionSlice';
import moment from 'moment/moment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

const Income = ({ isAdded, setIsAdded }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0);
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')

    const onTitleChange = e => setTitle(e.target.value)
    const onAmountChange = e => {
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

    const onSaveIncomeClick = (e) => {
        e.preventDefault()
        setTitleError(false)
        setAmountError(false)
        setDateError(false)

        if (title === '') {
            setTitleError(true)
        }

        if (amount === 0) {
            setAmountError(true)
        }

        if (date === '') {
            setDateError(true)
        }

        if (title && amount && date) {
            dispatch(
                addIncome(title, formatDate, amount)
            )
            setTitle('')
            setAmount('')
            setDate('')
            navigate("/")
            setIsAdded(true)
            dispatch(changePeriod(0))
        }
    }

    return (
        <div className='income-container'>
            <div className='income-top'>
                <Link to='/' className='income-button'>
                    <div className='btn-cancel'>
                        <UilTimes />
                        <label>Cancel transaction</label>
                    </div>
                </Link>
            </div>
            <div className='income-card'>
                <div className="income-title">
                    Add new income
                </div>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 3, display: "flex" },
                    }}
                    autoComplete="off"
                    noValidate
                    onSubmit={onSaveIncomeClick}
                >
                    <TextField
                        className='textfield'
                        variant="outlined"
                        label="Name of Income"
                        value={title}
                        onChange={onTitleChange}
                        required
                        inputProps={{ maxLength: 15 }}
                        error={titleError}
                        helperText={titleError && "Please fill in the name"}
                    />
                    <TextField
                        sx={{
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--purple)"
                            }
                        }}
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
                        value={date}
                        onChange={onDateChange}
                        required
                        error={dateError}
                        helperText={dateError && "Please select the date"}
                    />
                    <Typography align='center'>
                        <button className='add-btn'>Submit</button>
                    </Typography>
                </Box>
            </div>
        </div>
    );
};
export default Income;
