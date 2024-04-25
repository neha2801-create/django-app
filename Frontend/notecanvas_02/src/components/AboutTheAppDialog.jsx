import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Dialog, OutlinedInput, Box, Stack, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import RoundedButton from "./RoundedButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilledTextField from "./FilledTextField";
import CheckIcon from "@mui/icons-material/Check";

export default function AboutTheAppDialog() {
    const [open, setOpen] = React.useState(false);
    const [canvasName, setCanvasName] = React.useState("");

    const handleClickOpen = () => {
        console.log("Click open");
        setOpen(true);
    };

    const handleClose = () => {
        console.log("Cancel");
        setOpen(false);
        setCanvasName("");
    };

    const handleNewSpace = () => {
        console.log("Create!");
        setOpen(false);
        setCanvasName("");
        handleNewSpaceCreation(canvasName);
    };

    return (
        <>
            <RoundedButton
                onClick={handleClickOpen}
                mt="0"
                borderRadius="30px"
                bgcolor="#DD5757"
            >
                Add new space
                <AddOutlinedIcon />
            </RoundedButton>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        bgcolor: "#141414",
                        color: "white",
                        borderRadius: "20px",
                        border: "1px #ffffff20 solid",
                    },
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        // console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Create new space</DialogTitle>
                <DialogContent sx={{ width: "300px" }}>
                    <FilledTextField
                        name="canvas_name"
                        onChange={(e) => setCanvasName(e.target.value)}
                        value={canvasName}
                        label={"Canvas name"}
                        placeholder={"New Canvas"}
                    />

                    <Stack direction="row" gap={1} justifyContent={"right"}>
                        <RoundedButton onClick={handleClose}>
                            Cancel
                        </RoundedButton>
                        {/* <Box width={"10px"}>whwhwhwh</Box> */}
                        <RoundedButton
                            bgcolor="#FF5300"
                            color="black"
                            onClick={handleNewSpace}
                        >
                            <Stack p={0}
                                direction={"row"}
                                spacing={1}
                                alignItems={"center"}
                            >
                                <Typography fontFamily={"poppins"} >
                                    Create
                                </Typography>

                                <CheckIcon />
                            </Stack>
                        </RoundedButton>

                        {/* <Button type="submit">Subscribe</Button> */}
                    </Stack>
                </DialogContent>
            </Dialog>
</>
    );
}
