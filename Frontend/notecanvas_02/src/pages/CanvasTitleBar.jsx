import { FilledInput, Stack, TextField } from "@mui/material";
import React from "react";

const CanvasTitleBar = ({ canvasTitle }) => {
    const [title, setTitle] = React.useState("Canvas Title");

    // todo: useEffect to fetch
    // title mein save

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        // todo: send title to backend
    };

    return (
        <div
            style={{
                height: "80px",
                // blur bg
                backdropFilter: "blur(10px)",

                zIndex: 10000,
                color: "#000000",
                position: "fixed",
                borderRadius: "50px",
                top: "50px",
                left: "50px",
                transition: "all 0.2s",
            }}
        >
            <Stack justifyContent={"center"} height={"100%"}>
                <FilledInput
                    hiddenLabel
                    variant="standard"
                    disableUnderline={true}
                    value={title}
                    onChange={handleTitleChange}
                    sx={{
                        bgcolor: "transparent",
                        input: {
                            fontSize: "24px",
                        },
                    }}
                />
            </Stack>
        </div>
    );
};

export default CanvasTitleBar;
