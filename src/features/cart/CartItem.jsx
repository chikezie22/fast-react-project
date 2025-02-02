import { useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/helpers'
import DeleteItem from './DeleteItem'
import UpdateItem from './UpdateItem'
import { getCurrentQuantity } from './cartSlice'

/* eslint-disable react/prop-types */
function CartItem({ item }) {
    const { id, name, quantity, totalPrice } = item
    const currentQuantity = useSelector(getCurrentQuantity(id))

    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between">
            <p className="mb-1 sm:mb-0">
                {quantity}&times; {name}
            </p>
            <div className="flex justify-between items-center sm:gap-6">
                <p className="text-sm font-bold">
                    {formatCurrency(totalPrice)}
                </p>
                <UpdateItem pizzaId={id} currentQuantity={currentQuantity} />
                <DeleteItem pizzaId={id} />
            </div>
        </li>
    )
}

export default CartItem
