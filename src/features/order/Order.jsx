/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT

import OrderItem from './OrderItem'
import { useFetcher, useLoaderData } from 'react-router-dom'
import { getOrder } from '../../services/apiRestaurant'
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from '../../utils/helpers'
import { useEffect } from 'react'
import UpdateOrder from './UpdateOrder'

function Order() {
    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
    const order = useLoaderData()
    // console.log(order.cart)
    const fetcher = useFetcher()

    useEffect(() => {
        if (!fetcher.data && fetcher.state === 'idle') {
            fetcher.load('/menu')
        }
    }, [fetcher])
    // console.log(fetcher.data)

    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order
    const deliveryIn = calcMinutesLeft(estimatedDelivery)

    return (
        <div className="px-4 py-6 space-y-8">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl font-semibold">Order #{id} status</h2>

                <div className="space-x-2">
                    {priority && (
                        <span className="bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-red-50 tracking-wider">
                            Priority
                        </span>
                    )}
                    <span className="bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-green-50 tracking-wider">
                        {status} order
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center flex-wrap gap-2 bg-stone-200 px-6 py-5">
                <p className="font-medium ">
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                        : 'Order should have arrived'}
                </p>
                <p className="text-xs text-stone-500">
                    (Estimated delivery: {formatDate(estimatedDelivery)})
                </p>
            </div>

            <ul className="divide-y divide-stone-200 border-b border-t">
                {cart.map((item) => (
                    <OrderItem
                        key={item.pizzaId}
                        item={item}
                        isLoadingIngredients={fetcher.state === 'loading'}
                        ingredients={
                            fetcher?.data?.find((el) => el.id === item.pizzaId)
                                ?.ingredients ?? []
                        }
                    />
                ))}
            </ul>

            <div className="space-y-2 bg-stone-200 px-6 py-5">
                <p className="text-sm font-medium text-stone-600">
                    Price pizza: {formatCurrency(orderPrice)}
                </p>
                {priority && (
                    <p className="text-sm font-medium text-stone-600">
                        Price priority: {formatCurrency(priorityPrice)}
                    </p>
                )}
                <p className="font-bold">
                    To pay on delivery:{' '}
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>
            </div>
            {!priority && <UpdateOrder />}
        </div>
    )
}
// I4QP32
// params object by default  is used to get paramsId similar to useParams in older router but currently in routerV6 and upward it comes by default

export const loader = async ({ params }) => {
    const order = await getOrder(params.orderId)
    return order
}

export default Order
