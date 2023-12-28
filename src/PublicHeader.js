import React, { useState } from "react";
import "./PublicHeader.css"; // Import your CSS file
// import { NavLink, useLocation, useNavigate } from "react-router-dom";

const PublicHeader = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuHover = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const handleMenuItemClick = (event, menuItem) => {
    event.stopPropagation();
    setSelectedMenuItem(menuItem);
  };

  const PublicHeaderData = [
    {
      name: "My Account",
      path: "/account",
      children: [],
    },
    {
      name: "Finances",
      children: [
        {
          name: "Transactions",
          path: "finance/transactions",
        },
        {
          name: "Budgets",
          path: "finance/budgets",
        },
        {
          name: "Balance Sheet",
          path: "finance/balanceSheet",
        },
        {
          name: "Reserves",
          path: "finance/reserves",
        },
      ],
    },
  ];

  return (
    <>
      <ul className="menu" onMouseLeave={handleMenuLeave}>
        {PublicHeaderData.map((menuItem, index) => (
          <li
            key={index}
            className={`menu-item ${
              (activeMenu === menuItem.name.toLowerCase() ||
                selectedMenuItem?.name === menuItem.name) &&
              "active"
            }`}
            onMouseOver={() => handleMenuHover(menuItem.name.toLowerCase())}
            onClick={(e) => handleMenuItemClick(e, menuItem)}
          >
            {menuItem.name}
            {activeMenu === menuItem.name.toLowerCase() &&
              menuItem.children.length > 0 && (
                <ul className="submenu">
                  {menuItem.children.map((child, childIndex) => (
                    <li
                      key={childIndex}
                      className={
                        selectedMenuItem === child.path ? "active" : ""
                      }
                      onClick={(e) => handleMenuItemClick(e, child)}
                    >
                      {child.name}
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PublicHeader;
