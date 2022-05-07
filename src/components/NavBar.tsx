import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { IconContext } from "react-icons";
import { FaSearch, FaUser } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";
import { GoRepo } from "react-icons/go";
import { GoMarkGithub } from "react-icons/go";

// Establece el encabezado y la barra lateral, gestionando el estado de apertura y cierre de la barra lateral.
// El menú lateral consta de una lista desordenada que incluye componentes de redirección 'Link', asociados a las rutas establecidas
// en el componente App.
const Navbar = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);

  const showSidebar = () => setSidebar(!sidebar);

  const navClasses = `${"nav-menu"} ${sidebar ? 'active' : ""}`;
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}> 
        <div className='navbar'>
          <NavLink to="#" activeClassName="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavLink>
          <div className="w-full flex justify-center gap-4 lg:gap-8">
            <h1 className="text-2xl sm:text-3xl sm:mt-1 tracking-wider mb-1 sm:mb-2 font-medium text-white space-x-1">
              GitHub explorer
            </h1>
            <GoMarkGithub className="text-3xl sm:text-4xl sm:mt-1" />
          </div>
        </div>
        <nav className={navClasses}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <NavLink to="#" activeClassName="menu-bars">
                <AiIcons.AiOutlineClose />
              </NavLink>
            </li>
            <li className="nav-text"></li>
            <li className="nav-text">
              <NavLink to="/search">
                <FaSearch style={{ fontSize: "24px" }} /> <span>Search</span>
              </NavLink>
            </li>
            <li className="nav-text">
              <NavLink to="/issues">
                <GoIssueOpened style={{ fontSize: "26px" }} />{" "}
                <span>Issues</span>
              </NavLink>
            </li>
            <li className="nav-text">
              <NavLink to="/user">
                <FaUser style={{ fontSize: "24px" }} />
                <span>User</span>
              </NavLink>
            </li>
            <li className="nav-text">
              <NavLink to="/repository">
                <GoRepo style={{ fontSize: "24px" }} />
                <span>Repository</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};
export default Navbar;
