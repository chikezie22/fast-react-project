import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      {isLoading && <Loader />}
      {/* <Loader /> */}
      <Header />
      <main>
        <Outlet />
        <CartOverview />
      </main>
    </div>
  );
}

export default AppLayout;
