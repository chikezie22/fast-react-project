// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './ui/Home'
import Menu from './features/menu/Menu'
import CreateOrder from './features/order/CreateOrder'
import Order from './features/order/Order'
import Cart from './features/cart/Cart'
// import AppLayout from "./ui/AppLayout";
// import Error from "./ui/Error";

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/menu",
//         element: <Menu />,
//         loader: menuLoader,
//         errorElement: <Error />,
//       },
//       { path: "/cart", element: <Cart /> },
//       { path: "/order/new", element: <CreateOrder />, action: createOrderAction },
//       { path: "/order/:orderId", element: <Order />, loader: orderLoader, errorElement: <Error /> },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

// ******************************************************** i am going to write the code from afresh
const router = createBrowserRouter([
    { element: <Home />, path: '/' },
    { element: <Menu />, path: '/menu' },
    { element: <Cart />, path: '/cart' },
    { element: <CreateOrder />, path: '/order/new' },
    { element: <Order />, path: '/order/:orderId' },
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
// ********************************************************
