import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-stone-800 text-stone-300 uppercase p-4 sm:p-6 flex justify-between items-center">
      <p className="font-semibold space-x-4 sm:space-x-6 text-sm sm:text-base">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
