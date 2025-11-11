import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { colors } from "../theme/colors";


export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  fullWidth?: boolean;
  debounceMs?: number;
  className?: string;
  sx?: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  backgroundColor?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      placeholder,
      value,
      onChange,
      id,
      name,
      fullWidth = true,
      debounceMs = 0,
      className,
      sx,
      inputProps,
      backgroundColor
    },
    ref
  ) => {
    const theme = useTheme();
    const [local, setLocal] = React.useState<string>(value ?? "");

    React.useEffect(() => {
      setLocal(value ?? "");
    }, [value]);

    React.useEffect(() => {
      if (!debounceMs) {
        onChange(local);
        return;
      }
      const t = window.setTimeout(() => onChange(local), debounceMs);
      return () => window.clearTimeout(t);
    }, [local, debounceMs, onChange]);

    return (
      <Box
        role="search"
        aria-label={placeholder}
        className={className}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          backgroundColor: backgroundColor || theme.palette.background.default,
          border: `1px solid ${colors.lightGreen1Transparent}`,
          borderRadius: "15px",
          px: 2,
          py: 1.25,
          width: fullWidth ? "100%" : "auto",
          boxSizing: "border-box",
          ...sx,
        }}
      >
        <IconButton
          size="small"
          aria-hidden="true"
          disableRipple
          sx={{ color: theme.palette.text.secondary }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>

        <InputBase
          id={id}
          name={name}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder={placeholder}
          inputProps={{ "aria-label": placeholder, ...inputProps }}
          inputRef={ref}
          sx={{
            flex: 1,
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
          }}
        />
      </Box>
    );
  }
);

export default React.memo(SearchBar);