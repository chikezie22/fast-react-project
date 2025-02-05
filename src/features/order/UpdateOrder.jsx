import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../services/apiRestaurant'

const UpdateOrder = () => {
    const fetcher = useFetcher()
    return (
        <fetcher.Form method="patch" className="text-end">
            <Button type={'primary'}>Make Priority</Button>
        </fetcher.Form>
    )
}

export const action = async ({ _request, params }) => {
    console.log('hello')
    const data = { priority: true }
    updateOrder(params.orderId, data)
    return null
}

export default UpdateOrder
