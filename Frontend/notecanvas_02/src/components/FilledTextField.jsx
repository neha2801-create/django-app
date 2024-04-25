import styled from "@emotion/styled";
import { FilledInput, TextField, ThemeProvider } from "@mui/material";
import React from "react";

const FilledTextField = ({
    label,
    placeholder,
    onChange,
    value,
    name,
    error,
    helperText,
    required = true,
}) => {
    // todo: create inputRef prop

    return (
        <TextField
            // required={required}
            label={label}
            value={value}
            onChange={onChange}
            name={name}
            autoComplete={false}
            // disableUnderline // ! not working
            fullWidth
            error={error}
            helperText={helperText}
            variant="filled"
            placeholder={placeholder}
            sx={{
                mt: 2,
                bgcolor: "#2C2C2C",
                borderRadius: "11px",
                label: { color: "#ffffff50" },
                input: {
                    color: "white",
                    borderRadius: "11px",
                },
            }}
        />
    );
};

export default FilledTextField;