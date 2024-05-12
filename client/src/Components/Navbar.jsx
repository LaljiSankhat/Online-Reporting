import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { FaXmark, FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } =
    useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [Navbar, setNavbar] = useState([]);
  const navigate = useNavigate();
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Error occure while logout", data.error);
        } else {
          alert("logout successfull");
          console.log(isLoggedIn);
          // toggleIsLoggedIn(2);
          setCurrentUser({});
          setIsLoggedIn(false);
          console.log(isLoggedIn);
          navigate("/");
        }
      });
  };

  const navItems = [
    { path: "/", title: "Home", id: "home" },
    { path: "/post-issue", title: "Report An Issue", id: "reportIssue" },
    { path: "/feedback", title: "Feedback", id: "feedback" },
    { path: "/about", title: "About", id: "about" },
  ];

  const navItemsAdmin = [
    { path: "/", title: "Home", id: "home" },
    { path: "/all-issues", title: "All Issues", id: "allIssue" },
    { path: "/all-feedbacks", title: "All feedback", id: "allFeedback" },
    { path: "/about", title: "About", id: "about" },
  ];

  useEffect(() => {
    if (currentUser.role === "admin") {
      setNavbar(navItemsAdmin);
    } else {
      setNavbar(navItems);
    }
  }, [currentUser]);

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-20 px-4 absolute z-[999]">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <span className="font-bold font-serif flex items-center gap-1">
            <span className="text-blue">Online </span> Reporting System
          </span>
        </a>

        {/* nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {Navbar.map(({ path, title, id }) => (
            <li key={path} className="text-base text-primary hover:underline">
              {id == "about" ? (
                <a
                  href={`/#${id}`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </a>
              ) : isLoggedIn || title == "Home" ? (
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              ) : (
                <NavLink to={"/login"}>{title}</NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Sign up and Login button */}
        {isLoggedIn ? (
          <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            {currentUser.role === "user" && (
              <Link to="/profile" className="py-2 px-5 border rounded">
                Profile
              </Link>
            ) }

            <Link
              to="/"
              onClick={handleLogout}
              className="py-2 px-5 border rounded bg-blue text-white"
            >
              Log out
            </Link>
          </div>
        ) : (
          <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            <Link to="/login" className="py-2 px-5 border rounded">
              Login
            </Link>
            <Link
              to="/sign-up"
              className="py-2 px-5 border rounded bg-blue text-white"
            >
              Register
            </Link>
          </div>
        )}

        {/* Mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Navitems for mobile */}
      <div
        className={`px-4 bg-black rounded-sm py-5 ${
          isMenuOpen ? "md:hidden" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="text-white py-1">
            <Link to="/login">Login</Link>
          </li>
          <li className="text-white">
            <Link to="/sign-up">Sign up</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
