import React from "react";
import "./styles.css";
import TemporaryDrawer from "./drawer";
import Button from "../Button";
import { Link } from "react-router-dom";
import { useTheme } from "../../../ThemeContext"; // ✅ import
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import IconButton from "@mui/material/IconButton";

function Header() {
  const { theme, toggleTheme } = useTheme(); // ✅ get theme and toggle

  return (
    <div className="navbar">
      <h1 className="logo">
        CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
      </h1>
      <div className="links">
        {/* ✅ Theme toggle button */}
        <IconButton onClick={toggleTheme}>
          {theme === "dark"
            ? <LightModeRoundedIcon style={{ color: "var(--white)" }} />
            : <DarkModeRoundedIcon style={{ color: "var(--white)" }} />
          }
        </IconButton>
        <Link to="/" className="link">Home</Link>
        <Link to="/compare" className="link">Compare</Link>
        <Link to="/watchlist" className="link">WatchList</Link>
        <Link to="/dashBoard">
          <Button text={"DashBoard"} click={() => console.log("Btn Clicked")} />
        </Link>
      </div>

      <div className="mobile-drawer">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;