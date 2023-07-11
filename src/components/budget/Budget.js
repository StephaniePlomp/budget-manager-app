import './Budget.css'
import { useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';

const Budget = () => {
    const balance = useSelector((state) => state.transactions.balance);

    return (
        <>
            <div className='budget-container'>
                <div className="budget-title">
                    Balance
                </div>
                <div className='budget-total'>
                    <NumericFormat value={balance} displayType="text" thousandSeparator={true} prefix="$" />
                </div>
            </div>
        </>
    );
};
export default Budget