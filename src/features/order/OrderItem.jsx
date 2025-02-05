/* eslint-disable no-unused-vars */
import { formatCurrency } from '../../utils/helpers'

function OrderItem({ item, isLoadingIngredients, ingredients }) {
    const { quantity, name, totalPrice } = item

    return (
        <li className="py-3 ">
            <div className="flex justify-between items-center gap-4 text-sm space-y-3">
                <p>
                    <span className="font-bold">{quantity}&times;</span> {name}
                </p>
                <p className="font-bold">{formatCurrency(totalPrice)}</p>
            </div>

            <p className="text-stone-500 text-sm italic font-semibold">
                {isLoadingIngredients ? 'Loading...' : ingredients.join(' ,')}
            </p>
        </li>
    )
}

export default OrderItem
