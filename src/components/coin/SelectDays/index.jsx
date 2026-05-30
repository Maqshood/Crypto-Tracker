
import { Select, MenuItem } from "@mui/material";
import "./styles.css"



export default function SelectDays({ days, handleDaysChange, noPTag }){
    return (
    <div className="select-days">
    { !noPTag &&<p>Price Change In</p>}
    <Select
      value={days}
      onChange={handleDaysChange}
      sx={{
        width: "140px",
        height: "45px",
        color: "#fff",
        backgroundColor: "#111",
        borderRadius: "10px",

        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "#2d81ff",
        },

        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#4da3ff",
        },

        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#2d81ff",
          borderWidth: "2px",
        },

        ".MuiSvgIcon-root": {
          color: "#fff",
        },

        fontWeight: 500,
      }}

      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: "#111",
            color: "#fff",
            borderRadius: "10px",
            mt: 1,

            ".MuiMenuItem-root": {
              fontSize: "14px",
              transition: "0.2s",

              "&:hover": {
                backgroundColor: "#1e293b",
              },

              "&.Mui-selected": {
                backgroundColor: "#2563eb",
              },

              "&.Mui-selected:hover": {
                backgroundColor: "#1d4ed8",
              },
            },
          },
        },
      }}
    >
      <MenuItem value={7}>7 Days</MenuItem>
      <MenuItem value={30}>30 Days</MenuItem>
      <MenuItem value={60}>60 Days</MenuItem>
      <MenuItem value={90}>90 Days</MenuItem>
      <MenuItem value={120}>120 Days</MenuItem>
      <MenuItem value={365}>1 Year</MenuItem>
    </Select>
    </div>
  );
}