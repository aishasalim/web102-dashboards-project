import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/"; // Assuming "/" is the main page URL

  return (
    <div>
      <h1 className="main-header" style={{ marginLeft: isMainPage ? '12%' : '0' }}>
        <Link to="/" style={{ color: "lightgray", textDecoration: "none", display: "inline-block", textAlign: "center", fontWeight: "bold" }}>
          🦸 Marvel Heroes 🦸‍♀️
        </Link>
      </h1>
      <Outlet />
    </div>
  );
};

export default Layout;

