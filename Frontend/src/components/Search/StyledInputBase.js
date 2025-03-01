import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 1),
      // vertical padding + font searchIcon
      paddingLeft: theme.spacing(4),
  
      width: "100%",
    },
  }));

  export default StyledInputBase;