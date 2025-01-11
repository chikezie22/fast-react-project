import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { totalPrice, totalQuantity } from './cartSlice'
import { formatCurrency } from '../../utils/helpers'

function CartOverview() {
    const totalPizzaPrice = useSelector(totalPrice)
    const totalPizzaQuantity = useSelector(totalQuantity)

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
