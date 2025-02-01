import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTotalPrice, getTotalQuantity } from './cartSlice'
import { formatCurrency } from '../../utils/helpers'

function CartOverview() {
    const totalPizzaPrice = useSelector(getTotalPrice)
    const totalPizzaQuantity = useSelector(getTotalQuantity)

    return (
        <div className="bg-stone-800 text-stone-300 uppercase p-4 sm:p-6 flex justify-between items-center">
            <p className="font-semibold space-x-4 sm:space-x-6 text-sm sm:text-base">
                <span>{totalPizzaQuantity} pizzas</span>
                <span>{formatCurrency(totalPizzaPrice)}</span>
            </p>
            <Link to={'/cart'}>Open cart &rarr;</Link>
        </div>
    )
}

export default CartOverview
