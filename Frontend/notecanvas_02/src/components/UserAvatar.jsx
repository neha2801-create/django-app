import React, {useState, useEffect} from "react";
import { Avatar, AvatarGroup, Menu, MenuItem, Stack, Box } from "@mui/material";
import TuneRounded from "@mui/icons-material/TuneRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import RoundedButton from "./RoundedButton";
import PeopleIcon from "@mui/icons-material/People";
import { getTheme } from "../Theme";


// todo: break this component into sub-components. compartmentalize!!!

const UserAvatar = ({onlineUsersList, shareButtonClick, addedUsersClick}) => {

    const navigate = useNavigate();
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

                    console.log(data);
                    // setSpacesList(data.canvases.map(canvas => ({
                    //     ...canvas,
                    //     // timestamp: new Date(canvas.timestamp).toLocaleString() // Formats the timestamp
                    //     // timestamp: new Date(canvas.timestamp).toLocaleString("en-US", { timeZone: "America/New_York" })
                    // })));
                    // setUserName(data.userName);

                } else {
                    console.log("Failed to fetch user details from backend:", response.status);
                    
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching user detail:", error);
                navigate("/");
            }
        };

        fetchUserDetail();
    }, []);


    const theme  = getTheme("light");
    

    const onlineUsers = onlineUsersList;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePreferences = () => {
        // todo: preferences logic goes here

        navigate("/userPref");
    };

    
    const handleLogOut = async () => {
        // todo: Logout logic goes here
        console.log("Logout");
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/logout/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Logout successful
                console.log("Logged out successfully.");
                navigate("/");
                // Optionally redirect the user or update the UI state
                // window.location.href = '/login';
            } else {
                console.log("Logout failed:", response.status);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <Stack
            direction={"row-reverse"}
            alignItems={"center"}
            gap={2}
            style={{
                // border: "1px red dashed",
                zIndex: 100000,
                position: "fixed",
                top: "50px",
                right: "50px",
            }}
        >
            <Avatar
                onClick={handleClick}
                sx={{
                    height: 80,
                    width: 80,
                    borderRadius: "50%",
                    color: "#ffffff80",
                    fontSize: "30px",
                    fontWeight: "500",
                    backgroundColor: "#2C2C2C",
                    border: "1px #3F3F3F solid",
                }}
            >
                {/* {userDetails.userName.charAt(0)} */}
            </Avatar>
            <Menu
            elevation={0}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: "10px 10px 10px 10px",
                            backdropFilter: "blur(10px)",
                            backgroundColor: "#565656",
                            color: "#ffffff",
                        },
                    },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{
                    position: "fixed",
                    top: 10,
                    right: 50,
                }}
                bgcolor={"#1f1f1f"}
                // paddingY={3}
            >
                <MenuItem onClick={handlePreferences}>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        width={"150px"}
                        alignItems={"center"}
                    >
                        <TuneRounded /> Preferences
                    </Stack>
                </MenuItem>
                {/* <MenuItem onClick={handleAbout}>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        width={"150px"}
                        alignItems={"center"}
                    >
                        <InfoOutlinedIcon /> About
                    </Stack>
                </MenuItem> */}
                <MenuItem onClick={handleLogOut}>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        width={"150px"}
                        alignItems={"center"}
                    >
                        <LogoutRoundedIcon /> Logout
                    </Stack>
                </MenuItem>
            </Menu>
            {onlineUsers.length > 0 ? (
                <AvatarGroup
                    onClick={addedUsersClick}
                    max={4}
                    sx={{
                        "& .MuiAvatar-root": {
                            height: 50,
                            width: 50,
                            borderRadius: "50%",
                            color: "#ffffff50",
                            backgroundColor: "#2C2C2C",
                            border: "1px #3F3F3F solid",
                        },
                    }}
                >
                    {onlineUsers.map((user) => (
                        <Avatar key={user.id} />
                    ))}
                </AvatarGroup>
            ) : (
                <Box mr={2}>
                    <RoundedButton
                        mt={0}
                        borderRadius="30px"
                        variant="text"
                        onClick={shareButtonClick}
                    >
                        Share
                        <Box width={10}></Box>
                        <PeopleIcon />
                    </RoundedButton>
                </Box>
            )}
        </Stack>
    );
};

export default UserAvatar;