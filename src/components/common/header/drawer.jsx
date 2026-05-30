import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../ThemeContext.jsx"; // ✅ import
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // ✅ get theme and toggle

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuRoundedIcon className="link" />
      </IconButton>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { backgroundColor: "var(--black)", color: "var(--white)" }
        }}
      >
        <div className="drawer-div">
          <span className="link" onClick={() => handleNavigate("/")}>Home</span>
          <span className="link" onClick={() => handleNavigate("/compare")}>Compare</span>
          <span className="link" onClick={() => handleNavigate("/watchlist")}>WatchList</span>
          <span className="link" onClick={() => handleNavigate("/dashboard")}>Dashboard</span>

          {/* ✅ Theme toggle in drawer */}
          <div
            className="link"
            onClick={toggleTheme}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
          >
            {theme === "dark"
              ? <LightModeRoundedIcon style={{ color: "var(--white)" }} />
              : <DarkModeRoundedIcon style={{ color: "var(--white)" }} />
            }
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </div>
        </div>
      </Drawer>
    </div>
  );
}