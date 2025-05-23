import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ cart }) => {
  const location = useLocation();

  // Hide Home button if currently on Home page
  const hideHomeButton = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Fresh Loaf</Link>
        <div>
          {!hideHomeButton && (
            <Link className="btn btn-outline-light me-2" to="/">Home</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
