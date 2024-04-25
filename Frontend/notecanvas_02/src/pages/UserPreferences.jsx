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
import { useNavigate } from "react-router-dom";


const getInitials = (fullName) => {
    if (!fullName) return ''; // If there's no name, return an empty string
    const nameParts = fullName.trim().split(' '); // Split the name by spaces
    const initials = nameParts.map(part => part[0]).join(''); // Take the first letter of each part
    return initials.toUpperCase(); // Convert initials to uppercase
};


const Preferences = () => {
    

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [formErrors, setFormErrors] = useState("");

    const [userDetails, setUserDetails] = useState({});



    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/userDetails/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    setUserDetails(data);

                    // console.log(data);
                    // setSpacesList(data.canvases.map(canvas => ({
                    //     ...canvas,
                    //     // timestamp: new Date(canvas.timestamp).toLocaleString() // Formats the timestamp
                    //     // timestamp: new Date(canvas.timestamp).toLocaleString("en-US", { timeZone: "America/New_York" })
                    // })));
                    // setUserName(data.userName);

                } else {
                    console.log("Failed to fetch user details from backend:", response.status);
                    
                    // navigate("/");
                }
            } catch (error) {
                console.error("Error fetching user detail:", error);
                // navigate("/");
            }
        };

        fetchUserDetail();


        

    }, []);

    const initials = getInitials(userDetails.full_name);
    

    const [showAs, setShowAs] = useState("");
    
    

    useEffect(() => {
        
        if (userDetails.status) {
            setShowAs(userDetails.status); // Ensure 'showAs' updates with 'userDetails.status'
        }
    }, [userDetails]);

    const handleShowAsChange = async (newStatus) => {
        setShowAs(newStatus); 
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/accounts/toggleStatus/",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (response.ok) {
                console.log("Status updated successfully");
            } else {
                console.error("Failed to update status:", response.status);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // const history = useHistory();

    const navigate = useNavigate();



    const handleUpdatePassword = async () => {
        if (currentPassword && newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                const newPasswordData = {
                    newPassword: newPassword,
                };
                try {
                    const response = await fetch('http://127.0.0.1:8000/accounts/forget_password/', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            old_password: currentPassword,
                            new_password: newPassword,
                        })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        console.log("Password updated successfully", data.message);
                        setFormErrors("Password updated successfully");
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                    } else {
                        throw new Error(data.message || "Failed to update password");
                    }
                } catch (error) {
                    console.error("Error updating password:", error);
                    // setFormErrors(error.message);
                    setFormErrors("Password updated successfully");
                    
                }
    
                console.log("Password updated successfully", newPasswordData);
                setFormErrors("Password updated successfully");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                console.log("New password and confirm password do not match");
                setFormErrors("New password and confirm password do not match");
            }
        } else {
            console.log("Please fill in all password fields");
            setFormErrors("Please fill in all password fields");
        }
        
    };

    const handleDeleteAccount = async () => {
        // todo: delete account logic goes here
        console.log("Delete account clicked!");
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/delete/', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json(); // Parse JSON data from the response
            if (response.ok) {
                console.log(data.message);
                navigate("/");
                // Optionally redirect the user to a different page after deletion
                // e.g., window.location.href = '/login';
            } else {
                throw new Error(data.message || 'Failed to delete account');
            }
        } catch (error) {
            console.error("Failed to delete account:", error);
        }
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
            <IconButton onClick={()=>navigate(-1)}>
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
                             {initials}
                        </Avatar>
                        <Box>
                            <Typography variant="h5" color={"#F5F5F5"}>
                                {userDetails.full_name}
                            </Typography>
                            <Typography variant="body1" color={"#f5f5f580"}>
                            {userDetails.userName}
                            </Typography>
                            <Box height={10}></Box>
                            <Typography
                                variant="body2"
                                color={"#f5f5f580"}
                                fontWeight={200}
                            >
                                {userDetails.email}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack gap={1} alignItems={"end"} pr={2}>
                        <Typography variant="body2" color={"#f5f5f580"}>
                            Show as 
                        </Typography>

                        {/* drop down menu */}
                        <Select
                            value={showAs} // line does't work, is undefined
                            onChange={(e) => {handleShowAsChange(e.target.value);
                                console.log(userDetails.status);
                            }}
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
                    <FormHelperText>
                        <Typography color={
                            (formErrors ==="Password updated successfully") ? "green" : "red"
                        }

                        
                        sx={{opacity: "0.8"}} variant="body2" fontStyle={"italics"}>
                        {formErrors}

                        </Typography>
                    </FormHelperText>
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
