import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
function Header() {
  return (
    <div>
      <Link to={"/"}>Fast React Pizza</Link>
      <p>Simon</p>
      <SearchOrder />
    </div>
  );
}

export default Header;
