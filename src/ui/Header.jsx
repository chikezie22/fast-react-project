import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <Link to={"/"}>Fast React Pizza</Link>
      <p>Simon</p>
    </div>
  );
}

export default Header;
