/* eslint-disable react-refresh/only-export-components */
import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  // useLoaderData from route to handle data fetching logic without using a useEffect
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export const loader = async () => {
  await new Promise((res) => setTimeout(res, 1000));
  const data = await getMenu();
  return data;
};

export default Menu;
