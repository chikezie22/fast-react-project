import { Outlet, useNavigation } from 'react-router-dom'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import Loader from './Loader'
import { useSelector } from 'react-redux'
import { getCart } from '../features/cart/cartSlice'

function AppLayout() {
    const navigation = useNavigation()
    const cart = useSelector(getCart)
    const isLoading = navigation.state === 'loading'

    return (
        <div className="grid grid-rows-[auto_1fr_auto] h-dvh">
            {isLoading && <Loader />}
            {/* {true && <Loader />} */}
            {/* <Loader /> */}
            <Header />
            <div className="overflow-scroll overflow-x-hidden">
                <main className="mx-auto max-w-3xl">
                    <Outlet />
                </main>
            </div>
            {cart.length === 0 ? null : <CartOverview />}
        </div>
    )
}

export default AppLayout
