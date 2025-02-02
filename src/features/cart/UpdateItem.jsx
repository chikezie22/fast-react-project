import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

const UpdateItem = ({ pizzaId, currentQuantity }) => {
    const dispatch = useDispatch()
    return (
        <div className="flex items-center gap-3 md:gap-6">
            <Button
                type={'round'}
                onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
            >
                -
            </Button>
            <span className="font-medium text-sm">{currentQuantity}</span>
            <Button
                type={'round'}
                onClick={() => dispatch(increaseItemQuantity(pizzaId))}
            >
                +
            </Button>
        </div>
    )
}

export default UpdateItem
