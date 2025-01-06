import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-dvh">
      {isLoading && <Loader />}
      <div>this is the loading test</div>
      <h1>Loading</h1>
      {/* {true && <Loader />} */}
      {/* <Loader /> */}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
