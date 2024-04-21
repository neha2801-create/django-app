import React, { useState, useEffect } from "react";
import {
    Stack,
    Box,
    Typography,
    IconButton,
    Select,
    MenuItem,
    Menu,
    Avatar,
    Button,
    Container,
    FormControl,
    FormLabel,
    FormHelperText,
    TextField,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    FilledInput,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { getTheme } from "../Theme";
import CircleIcon from "@mui/icons-material/Circle";
import FilledTextField from "../components/FilledTextField";
import RoundedButton from "../components/RoundedButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';




const Preferences = () => {
    const [showAs, setShowAs] = useState("Online");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {}, []);
    // const history = useHistory();


    const handleUpdatePassword = () => {
        if (currentPassword && newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                const newPasswordData = {
                    newPassword: newPassword,
                };

                console.log("Password updated successfully", newPasswordData);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                console.log("New password and confirm password do not match");
            }
        } else {
            console.log("Please fill in all password fields");
        }
    };

    const handleDeleteAccount = () => {
        // todo: delete account logic goes here
        console.log("Delete account clicked!");
    };

    // delete confirmation dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                pt: 15,
            }}
        >
          <Stack direction="row" alignItems="center" mb={3}>
            <IconButton onClick={()=>console.log("back button clicked!")}>
              <ArrowBackIosNewIcon sx={{color: "#F5F5F580"}}/>
            </IconButton>
            <Typography color={"#F5F5F580"} fontSize={25} ml={2} >
                Preferences
            </Typography>
          </Stack>
            <Stack borderRadius={"30px"} bgcolor={"#2C2C2C50"} p={2}>
                <Typography variant="body2" color={"#F5F5F580"}>
                    Profile
                </Typography>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Stack
                        direction={"row"}
                        p={2}
                        alignItems={"center"}
                        gap={2}
                    >
                        <Avatar
                            sx={{
                                height: 100,
                                width: 100,
                                borderRadius: "25px",
                                color: "#ffffff50",
                                backgroundColor: "#2C2C2C",
                                border: "1px #3F3F3F solid",
                                fontSize: 35,
                            }}
                        >
                            DS
                        </Avatar>
                        <Box>
                            <Typography variant="h5" color={"#F5F5F5"}>
                                Deep Shah
                            </Typography>
                            <Typography variant="body1" color={"#f5f5f580"}>
                                @deepshah_
                            </Typography>
                            <Box height={10}></Box>
                            <Typography
                                variant="body2"
                                color={"#f5f5f580"}
                                fontWeight={200}
                            >
                                deepshah2000@gmail.com
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack gap={1} alignItems={"end"}>
                        <Typography variant="body2" color={"#f5f5f580"}>
                            Show as
                        </Typography>

                        {/* drop down menu */}
                        <Select
                            value={showAs}
                            onChange={(e) => handleShowAsChange(e.target.value)}
                            sx={{
                                // bgcolor: "red",
                                border: "1px solid #ffffff50",
                                padding: 0,
                                height: 40,
                                width: 150,
                                borderRadius: "40px",
                                color: "white",
                                p: 0,

                                "& .MuiSelect-icon": {
                                    color: "white",
                                    padding: 0,
                                },

                                "& .MuiMenu-paper": {
                                    bgcolor: "blue",
                                },

                                // menu list bg color
                                "& .MuiMenu-list": {
                                    bgcolor: "red",
                                    color: "white",
                                    p: 1,
                                    margin: 0,
                                },

                                "& .MuiSelect-select": {
                                    width: 150,
                                    borderRadius: "40px",
                                    color: "white",
                                },
                            }}
                        >
                            <MenuItem
                                value="Online"
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    color: "white",
                                    p: 1,
                                    margin: 0,
                                }}
                            >
                                <Stack direction={"row"} gap={1}>
                                    <CircleIcon sx={{ color: "green" }} />
                                    <Typography>Online</Typography>
                                </Stack>
                            </MenuItem>
                            <MenuItem
                                value="Busy"
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    color: "white",
                                    p: 1,
                                    margin: 0,
                                }}
                            >
                                <Stack direction={"row"} gap={1}>
                                    <CircleIcon sx={{ color: "yellow" }} />
                                    <Typography>Busy</Typography>
                                </Stack>
                            </MenuItem>
                            <MenuItem
                                value="Offline"
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    color: "white",
                                    p: 1,
                                    margin: 0,
                                }}
                            >
                                <Stack direction={"row"} gap={1}>
                                    <CircleIcon sx={{ color: "red" }} />
                                    <Typography>Offline</Typography>
                                </Stack>
                            </MenuItem>
                        </Select>
                    </Stack>
                </Stack>
            </Stack>
            <Stack borderRadius={"30px"} bgcolor={"#2C2C2C50"} p={2} mt={2}>
                <Typography variant="body2" color={"#F5F5F580"}>
                    Change passsword
                </Typography>

                <FormControl
                    fullWidth
                    sx={{ mt: 2 }}
                    onSubmit={handleUpdatePassword}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"start"}
                        gap={2}
                        p={2}
                    >
                        <Stack
                            flex={1}
                            justifyContent={"end"}
                            alignContent={"start"}
                        >
                            <FilledInput
                                disableUnderline
                                hiddenLabel
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                name="Set new password"
                                label={"Set new password"}
                                placeholder={"New password"}
                                type={showNewPassword ? "text" : "password"}
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    borderRadius: "15px",
                                    label: { color: "#ffffff50" },
                                    input: {
                                        color: "white",
                                        borderRadius: "15px",
                                        bgcolor: "#2C2C2C",
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        !showNewPassword
                                                    )
                                                }
                                            >
                                                {showNewPassword ? (
                                                    <VisibilityOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                ) : (
                                                    <VisibilityOffOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                )}
                                                {/* react button component */}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FilledInput
                                disableUnderline
                                hiddenLabel
                                name="Confirm new password"
                                label={"Confirm new password"}
                                placeholder={"Repeat password"}
                                // helperText={formErrors.loginPassword}
                                // error={formErrors.loginPassword ? true : false}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                type={
                                    showConfirmNewPassword ? "text" : "password"
                                }
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    borderRadius: "15px",
                                    mt: 2,
                                    label: { color: "#ffffff50" },
                                    input: {
                                        color: "white",
                                        borderRadius: "15px",
                                        bgcolor: "#2C2C2C",
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowConfirmNewPassword(
                                                        !showConfirmNewPassword
                                                    )
                                                }
                                            >
                                                {showCurrentPassword ? (
                                                    <VisibilityOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                ) : (
                                                    <VisibilityOffOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                )}
                                                {/* react button component */}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                        <Stack flex={1} alignItems={"end"}>
                            <FilledInput
                                disableUnderline
                                hiddenLabel
                                fullWidth
                                name="Current password"
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                value={currentPassword}
                                label={"Current password"}
                                placeholder={"Current password"}
                                type={showCurrentPassword ? "text" : "password"}
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    borderRadius: "15px",
                                    label: { color: "#ffffff50" },
                                    input: {
                                        color: "white",
                                        // borderRadius: "15px",
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowCurrentPassword(
                                                        !showCurrentPassword
                                                    )
                                                }
                                            >
                                                {showCurrentPassword ? (
                                                    <VisibilityOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                ) : (
                                                    <VisibilityOffOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                )}
                                                {/* react button component */}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <RoundedButton
                                bgcolor="black"
                                borderRadius="40px"
                                type="submit"
                                onClick={handleUpdatePassword}
                                mt={3.5}
                            >
                                Update Password
                            </RoundedButton>
                        </Stack>
                    </Stack>
                </FormControl>
            </Stack>

            <Stack borderRadius={"30px"} bgcolor={"#2C2C2C70"} p={2} mt={2}>
                <Typography variant="body2" color={"#F5F5F580"}>
                    Delete account
                </Typography>
                <Stack
                    direction={"row"}
                    // justifyContent={"space-between"}
                    alignItems={"center"}
                    p={2}
                    mt={2}
                    gap={3}
                >
                    <RoundedButton
                        bgcolor="#FF4949"
                        borderRadius="40px"
                        onClick={handleClickOpen}
                        mt="0"
                    >
                        Delete Account
                    </RoundedButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                                bgcolor: "#141414",
                                color: "white",
                                borderRadius: "15px",
                                border: "1px #ffffff20 solid",
                            },
                            component: "form",
                            onSubmit: (event) => {
                                event.preventDefault();
                                // const formData = new FormData(event.currentTarget);
                                // const formJson = Object.fromEntries(formData.entries());
                                // const email = formJson.email;
                                // // console.log(email);
                                // handleClose();
                            },
                        }}
                    >
                        <DialogTitle textAlign={"center"}>
                            Are you sure?
                        </DialogTitle>
                        <DialogContent sx={{ width: "300px" }}>
                            <Typography
                                textAlign={"center"}
                                color={"#ffffff70"}
                            >
                                This is an irreversible action. All your data
                                will be delete.
                            </Typography>
                            <Box display={"flex"} justifyContent={"center"}>
                                <RoundedButton onClick={handleClose}>
                                    Cancel
                                </RoundedButton>
                                <Box width={"10px"}></Box>
                                <RoundedButton
                                    bgcolor="#FF4949"
                                    color="white"
                                    onClick={handleDeleteAccount}
                                >
                                    <Stack
                                        direction={"row"}
                                        spacing={1}
                                        alignItems={"center"}
                                    >
                                        <Typography fontFamily={"poppins"}>
                                            Yes!
                                        </Typography>

                                        {/* <CheckIcon /> */}
                                    </Stack>
                                </RoundedButton>

                                {/* <Button type="submit">Subscribe</Button> */}
                            </Box>
                        </DialogContent>
                    </Dialog>
                    <Typography
                        variant="body2"
                        fontStyle={"italic"}
                        color={"#f5f5f580"}
                        width={400}
                    >
                        This is an irreversible action. All your data will be
                        delete.
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Preferences;
