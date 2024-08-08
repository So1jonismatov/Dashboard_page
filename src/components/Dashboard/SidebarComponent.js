import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaHome,
  FaList,
  FaRegLaughWink,
  FaHeart,
  FaPlus,
} from "react-icons/fa";
import React, { useState } from "react";

const SidebarComponent = ({ image, toggled,newData,newAdress }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapseToggle = () => {
    setCollapsed((prev) => !prev);
  };
  const navigate = useNavigate();
  return (
    <Sidebar
      backgroundColor="rgba(150,150,250,0.1)"
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="lg"
      style={{
        backdropFilter: "blur(10px)", // Optional: Add a blur effect for a frosted glass look
      }}
    >
      <Menu iconShape="circle" style={{ backgroundColor: "transparent" }}>
        {collapsed ? (
          <MenuItem
            icon={<FaAngleDoubleRight />}
            onClick={handleCollapseToggle}
            style={{ backgroundColor: "transparent" }}
          />
        ) : (
          <MenuItem
            suffix={<FaAngleDoubleLeft />}
            onClick={handleCollapseToggle}
            style={{ backgroundColor: "transparent" }}
          >
            <div
              style={{
                padding: "9px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 15,
                letterSpacing: "1px",
                backgroundColor: "transparent", // Ensure text background is also transparent
              }}
            >
              Dashboard
            </div>
          </MenuItem>
        )}
      </Menu>
      <Menu iconShape="circle" style={{ backgroundColor: "transparent" }}>
        <MenuItem
          onClick={() => navigate("/")}
          icon={<FaHome color="red" />}
          suffix={<span>NEW</span>}
          style={{ backgroundColor: "transparent" }}
        >
          Login page
        </MenuItem>
        <MenuItem
          onClick={() => navigate(newAdress)}
          icon={newAdress.localeCompare("/add")!==0?<FaHeart color="red"/>:<FaPlus color="red"/>}
          style={{ backgroundColor: "transparent" }}
        >
          {newData}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
