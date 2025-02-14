/* eslint-disable react/no-unescaped-entities */
// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart, getTotalPrice } from '../cart/cartSlice'
import { useState } from 'react'
import store from '../../store'
import { formatCurrency } from '../../utils/helpers'
import EmptyCart from '../cart/EmptyCart'
import { fetchUserData } from '../user/userSlice'
// import { useSelector } from "react-redux";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

// const fakeCart = [
//     {
//         pizzaId: 12,
//         name: 'Mediterranean',
//         quantity: 2,
//         unitPrice: 16,
//         totalPrice: 32,
//     },
//     {
//         pizzaId: 6,
//         name: 'Vegetale',
//         quantity: 1,
//         unitPrice: 13,
//         totalPrice: 13,
//     },
//     {
//         pizzaId: 11,
//         name: 'Spinach and Mushroom',
//         quantity: 1,
//         unitPrice: 15,
//         totalPrice: 15,
//     },
// ]

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    // actionData use to get data in the component that the action was made a good way to return and show errors to that page
    const actionData = useActionData()
    const isSubmitting = navigation.state === 'submitting'
    // instead of using useSelector i used local storage to get state of username from browser
    // const userName = useSelector((state)=>state.user.userName)
    // const userName = JSON.parse(localStorage.getItem('userName'))

    const cart = useSelector(getCart)
    // get userData async thunk

    const {
        userName,
        status: addressStatus,
        position,
        address,
        error: errorAddress,
    } = useSelector((state) => state.user)
    const isLoadingAddress = addressStatus === 'loading'

    const totalPrice = useSelector(getTotalPrice)
    const prioityPrice = totalPrice * 0.2 + totalPrice
    const finalPrice = withPriority ? prioityPrice : totalPrice

    if (!cart.length) return <EmptyCart />

    return (
        <div className="px-4 py-6">
            <h2 className="text-xl font-semibold mb-8">
                Ready to order? Let's go!
            </h2>

            <Form method="post">
                <div className="mb-5 grid sm:grid-cols-[10rem_1fr] sm:items-center">
                    <label>First Name</label>
                    <input
                        className="input "
                        type="text"
                        name="customer"
                        required
                        defaultValue={userName}
                    />
                </div>

                <div className="mb-5 grid sm:grid-cols-[10rem_1fr] sm:items-center">
                    <label>Phone number</label>
                    <div>
                        <input
                            className="input"
                            type="tel"
                            name="phone"
                            required
                        />
                    </div>
                    {actionData?.phone && (
                        <div className="sm:col-start-2 mt-2">
                            <p className="text-xs text-red-700 bg-red-100 p-2 rounded-md">
                                {actionData?.phone}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mb-5 grid sm:grid-cols-[10rem_1fr] sm:items-center relative">
                    <label>Address</label>
                    <div>
                        <input
                            type="text"
                            name="address"
                            required
                            className="input"
                            defaultValue={address}
                        />
                        {addressStatus === 'error' && (
                            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {errorAddress}
                            </p>
                        )}
                    </div>
                    {!position.latitude && !position.longitude && (
                        <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
                            <Button
                                disabled={isLoadingAddress}
                                type="small"
                                onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(fetchUserData())
                                }}
                            >
                                Get position
                            </Button>
                        </span>
                    )}
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring  focus:ring-yellow-400 "
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="text"
                        hidden
                        readOnly
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                </div>

                <div>
                    <Button disabled={isSubmitting} type="primary">
                        {isSubmitting
                            ? 'Placing Your Order....'
                            : `Order now ${formatCurrency(finalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export const action = async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const order = {
        ...data,
        priority: data.priority === 'true',
        cart: JSON.parse(data.cart),
    }
    console.log(order)
    const errors = {}
    if (!isValidPhone(order.phone))
        errors.phone =
            'This Phone number is not valid kindly input a valid phone number to be used to contact you'
    if (Object.keys(errors).length > 0) return errors
    const newOrder = await createOrder(order)
    // dispatch the clear action using the store since we can only use hooks in components
    store.dispatch(clearCart())
    return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
