/* eslint-disable react-refresh/only-export-components */

import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'

function Menu() {
    // useLoaderData from route to handle data fetching logic without using a useEffect
    const menu = useLoaderData()
    return (
        <ul className="divide-y divide-stone-200 px-2">
            {menu.map((pizza) => (
                <MenuItem pizza={pizza} key={pizza.id} />
            ))}
        </ul>
    )
}

// creating a loader function to handle render as you fetch something like useEffect hook

export const loader = async () => {
    const data = await getMenu()
    return data
}

export default Menu
