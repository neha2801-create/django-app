import { FilledInput, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";

const CanvasTitleBar = ({ canvasTitle }) => {
    const [title, setTitle] = React.useState(canvasTitle);

    const handleTitleChange = async (e) => {
        const newTitle = e.target.value;
        // setTitle(newTitle);

        // Define the data to send in the request
        const data = JSON.stringify({ title: newTitle });

        const canvasOrder = 1;

        try {
            const response = await fetch(`http://127.0.0.1:8000/canvas/update/${canvasOrder}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to update the title');
            }

            const responseData = await response.json();
            console.log('Title updated:', responseData);
        } catch (error) {
            console.error('Error updating title:', error);
        }
        useEffect(() => {
            setTitle(newTitle);
        }, [newTitle]);
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
