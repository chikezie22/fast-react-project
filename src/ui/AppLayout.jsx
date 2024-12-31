import { Outlet } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
        <CartOverview />
      </main>
    </div>
  );
}

export default AppLayout;
