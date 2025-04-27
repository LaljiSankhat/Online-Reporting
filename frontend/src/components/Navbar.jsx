import React, { useEffect, useState } from "react";
import { Link, NavLink  } from "react-router-dom";
import { FaXmark, FaBarsStaggered } from "react-icons/fa6";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
    const {authUser, isLoggedIn, isCheckingAuth, logout } = useAuthStore();
    const handleScroll = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [Navbar, setNavbar] = useState([]);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: "/", title: "Home", id: "home" },
    { path: "/post-issue", title: "Report An Issue", id: "reportIssue" },
    { path: "/post-feedback", title: "Feedback", id: "feedback" },
    { path: "/about", title: "About", id: "about" },
  ];

  const navItemsAdmin = [
    { path: "/", title: "Home", id: "home" },
    { path: "/all-issues", title: "All Issues", id: "allIssue" },
    { path: "/all-feedbacks", title: "All feedback", id: "allFeedback" },
    { path: "/about", title: "About", id: "about" },
  ];

  useEffect(() => {
    if (authUser && authUser.role === "admin") {
      setNavbar(navItemsAdmin);
    } else {
      setNavbar(navItems);
    }
    console.log(isLoggedIn);
  }, [authUser]);

  return (
    <header className="max-w-screen-2xl border-b border-gray-100 bg-white backdrop-blur-2xl container mx-auto xl:px-20 px-4 absolute z-[999]">
      <nav className="flex justify-between items-center py-4 ">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <span className="font-bold font-sarif flex items-center gap-1">
            <span className="text-blue">Online </span> Reporting System
          </span>
        </a>

        {/* nav items for large devices */}
        {isLoggedIn && (<ul className="hidden md:flex gap-12">
          {Navbar.map(({ path, title, id }) => (
            <li key={path} className="text-base text-primary hover:underline">
              {id == "about" ? (
                <a
                  href={`/#${id}`}
                  onClick={() => handleScroll("about")}
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
        </ul>)}
        

        {/* Sign up and Login button */}
        {authUser !== null ? (
          <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            {authUser.role === "user" && (
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
              to="/signup"
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
          { isLoggedIn && navItems.map(({ path, title }) => (
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
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
