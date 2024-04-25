import React, { useEffect, useState } from "react";
import {
    Stack,
    Container,
    Avatar,
    Typography,
    IconButton,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import UserAvatar from "../components/UserAvatar";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import RoundedButton from "../components/RoundedButton";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import SpaceItemCard from "../components/SpaceItemCard";
import OnlineUserCard from "../components/OnlineUserCard";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NewLogo from "../assets/new_logo@3x.png";
import NewSpaceDialog from "../components/NewSpaceDialog";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
// import NewLogo from "../assets/new_logo@3x.png";

const Dashboard = () => {
    const navigate = useNavigate();
    // logout function
    const handleLogout = async () => {
        console.log("Logout clicked!");
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/logout/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // Include CSRF token header
                },
            });

            if (response.ok) {
                // Logout successful
                console.log("Logged out successfully.");
                navigate("/");
            } else {
                console.log("Logout failed:", response.status);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const [spacesList, setSpacesList] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchCanvases = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/dashboard/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include CSRF token header
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSpacesList(data.canvases.map(canvas => ({
                        ...canvas,
                        // timestamp: new Date(canvas.timestamp).toLocaleString() // Formats the timestamp
                        // timestamp: new Date(canvas.timestamp).toLocaleString("en-US", { timeZone: "America/New_York" })
                    })));
                    setUserName(data.userName);

                } else {
                    console.log("Failed to fetch canvases:", response.status);

                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching canvases:", error);
                navigate("/");
            }
        };

        fetchCanvases();
    }, []);

    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/accounts/active/', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                    headers: {
                        'Content-Type': 'application/json',
                        // Include CSRF token header 
                    },
                });
                if (response.ok) {
                    const rawData = await response.json();
                    console.log(rawData.users);
                    if (Array.isArray(rawData.users) && rawData.users.length > 0) {
                        const transformedUsers = rawData.users.map(user => ({
                            ...user,
                            name: user.name || "Name not available"
                        }));
                        setOnlineUsers(transformedUsers);
                    } else {
                        console.log("rawData.users is not an array or is empty");
                        setOnlineUsers([]);
                    }


                } else {
                    throw new Error('Failed to load users');
                }
            } catch (error) {
                console.error('Failed to fetch online users:', error);
            }
        };

        fetchOnlineUsers();
    }, []);



    // const [currentSortOrder, setCurrentSortOrder] = React.useState("time");
    // Spaces Functions to handle add, delete and click on
    const handleAddNewSpace = async (newCanvasName) => {
        // new space will be added to the spaces list
        // mui dialog will be used to get the title of the space
        // const newId = spacesList.length + 1;

        // setSpacesList((prevSpacesList) => [
        //     ...prevSpacesList,
        //     {
        //         id: newId,
        //         title: `Space ${newId}`,
        //         timestamp: "4:42 PM 12/12/2021",
        //     },
        // ]);
        // // convert form data to json
        // const data = {
        //     canvasName: canvasName,
        // };

        // if newCanvasName is blank set it to "New Canvas"

        if (newCanvasName === "") {
            newCanvasName = "Untitled";
        }

        const data = {

            title: newCanvasName,
        };

        console.log("Title", data.title);
        try {
            const response = await fetch('http://127.0.0.1:8000/canvas/create/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response);
            const responseText = await response.text();
            if (response.ok) {
                const newCanvas = JSON.parse(responseText);
                setSpacesList(prevSpacesList => [
                    ...prevSpacesList,
                    {
                        id: newCanvas.order,
                        title: newCanvas.title,
                        timestamp: newCanvas.timestamp,
                    },
                ]);
            } else {
                console.log("Failed to create new canvas:", response.status, responseText);
            }
        } catch (error) {
            console.error("Error creating new canvas:", error);
        }
        handleClose();
    };

    const handleSpaceClick = (id) => {

        const fetchDataAndNavigate = async () => {
            console.log(`Preparing to go to ${id}`);

            try {
                const response = await fetch(`http://127.0.0.1:8000/canvas/get/${id}/`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    navigate(`/canvas/${id}/`, { state: { canvasData: data } });
                } else {
                    console.error('Failed to fetch canvas data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching canvas data:', error);
            }
        };

        fetchDataAndNavigate();
    };

    const handleSpaceDelete = (id) => {

        const url = `http://127.0.0.1:8000/canvas/delete/${id}/`;

        // Make a fetch request to delete the canvas
        fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    // If the delete was successful, filter the canvas out of the local state
                    setSpacesList(prevSpacesList => {
                        const updatedSpacesList = prevSpacesList.filter(space => space.id !== id)
                            .map((space, index) => ({
                                ...space,
                                id: index + 1 // Recalculate ID based on the new index
                            }));
                        console.log(`Space ${id} deleted successfully!`);
                        console.log(`Updated list length: ${updatedSpacesList.length}`);
                        return updatedSpacesList;
                    });
                    // console.log(`Space ${id} deleted successfully!`);
                    // console.log(id);
                } else {
                    console.error(`Failed to delete Space ${id}:`, response.status);
                }
            })
            .catch(error => {
                // Log any errors that occurred during the fetch
                console.error(`Error deleting Space ${id}:`, error);
            });
        // navigate('/dashboard');
    };

    // Online Users Functions to handle click on options
    const handleOption1 = () => {
        console.log("Option 1 clicked!");
    };

    const handleOption2 = () => {
        console.log("Option 2 clicked!");
    };


    // about the app dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: 10,
                display: "flex",
                flexDirection: "column",
                // height: "100vh",
            }}
        >
            <Stack alignItems={"center"} spacing={0.5}>
                <Box bgcolor={"#696969"} px={1} pt={0.8} borderRadius={4}>
                    <img src={NewLogo} height={50} width={50} />
                </Box>
                <Typography fontFamily={"poppins"} color={"white"}>
                    NoteCanvas
                </Typography>
            </Stack>
            <Stack
                height={100}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Stack direction={"row"} alignItems={"center"}>
                    <Avatar
                        // onClick={handleClick}
                        sx={{
                            height: 80,
                            width: 80,
                            borderRadius: "50%",
                            color: "#ffffff",
                            backgroundColor: "#2C2C2C",
                            border: "1px #3F3F3F solid",
                            fontSize: "30px"
                        }}
                    > {userName[0]}</Avatar>
                    <Typography
                        ml={2}
                        variant="h4"
                        fontWeight={500}
                        fontFamily={"Poppins"}
                        color={"white"}
                    >
                        {userName}
                    </Typography>
                </Stack>

                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <IconButton
                        onClick={handleClickOpen}
                        // onClick={() => console.log("Theme button clicked")}
                        sx={{ color: "white", backgroundColor: "#484848" }}
                    >
                        <InfoOutlinedIcon />
                    </IconButton>
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
                        <DialogTitle textAlign={"center"} color={"#ffffff80"}>
                            About the app
                        </DialogTitle>
                        <DialogContent sx={{ width: "400px" }}>
                            <Stack justifyItems="center" alignContent={"center"} width={"100%"} justifyContent={"center"} alignItems={"center"} alignSelf={"center"}>
                                <Box
                                    bgcolor={"#ffffff40"}
                                    borderRadius={5}
                                    height={"70px"}
                                >

                                    <img
                                        src={NewLogo}
                                        height={"50px"}
                                        width={"50px"}
                                        style={{
                                            backgroundColor: "#23232220",
                                            padding: 10,
                                            borderRadius: "25px",
                                        }}
                                    />
                                </Box>
                                <Typography
                                    fontSize={20}
                                    fontFamily={"poppins"}
                                    mt={1}
                                    fontWeight={500}
                                >
                                    NoteCanvas
                                </Typography>
                            </Stack>
                            <Typography
                                mt={2}
                                textAlign={"center"}
                                color={"#ffffff90"}
                            >
                                NoteCanvas is in its early stages of development, with version 1 ready to be deployed.
                                Currently, it's a simple application where you can create, move, and resize notes on a static canvas.

                                We're working on additional features, like free text elements, support for images, and other multimedia content. As we continue to improve NoteCanvas, we'll release updates that make it even more versatile and useful.
                            </Typography>
                        </DialogContent>
                    </Dialog>
                    <IconButton
                        onClick={() => navigate('/userPref')}
                        sx={{ color: "white", backgroundColor: "#484848" }}
                    >

                        <TuneOutlinedIcon />
                    </IconButton>




                    <RoundedButton
                        borderRadius="20px"
                        bgcolor="#484848"
                        onClick={handleLogout}
                    >
                        <Stack
                            direction="row"
                            alignItems={"center"}
                            spacing={1}
                        >
                            <Typography
                                fontFamily={"Poppins"}
                                color={"white"}
                                variant="body2"
                            >
                                Logout
                            </Typography>
                            <LogoutOutlinedIcon />
                        </Stack>
                    </RoundedButton>
                </Stack>
            </Stack>

            <Stack direction={"row"} spacing={2} mt={5}>
                <Stack
                    flexGrow={1}
                    // border={1}
                    // mt={5}
                    // bgcolor={"yellowgreen"}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    px={2}
                >
                    <Typography
                        fontFamily={"poppins"}
                        color={"#ffffff70"}
                        display={"flex"}
                        alignItems={"center"}
                    >
                        Your spaces
                        <Box
                            ml={1}
                            display={"inline-flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            fontSize={13}
                            borderRadius={20}
                            width={30}
                            height={30}
                            bgcolor={"#ffffff30"}
                        >
                            {spacesList.length}
                        </Box>
                    </Typography>
                    <NewSpaceDialog
                        handleNewSpaceCreation={handleAddNewSpace}
                    />
                </Stack>
                <Stack
                    // border={1}
                    mt={5}
                    // bgcolor={"yellowgreen"}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    width={300}
                >
                    <Typography
                        fontFamily={"poppins"}
                        color={"#ffffff70"}
                        display={"flex"}
                        alignItems={"center"}
                        pl={2}
                    >
                        Users online
                        <Box
                            ml={1}
                            display={"inline-flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            fontSize={13}
                            borderRadius={20}
                            width={30}
                            height={30}
                            bgcolor={"#ffffff30"}
                        >
                            {onlineUsers.length}
                        </Box>
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction={"row"} spacing={2} mt={1}>
                <Stack
                    flexGrow={1}
                    spacing={0.5}
                    height={620}
                    overflow={"scroll"}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "5px",
                        },
                        "&::-webkit-scrollbar-track": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#ffffff30",
                            borderRadius: "24px",
                        },
                    }}
                >
                    {spacesList.map((space) => (
                        <SpaceItemCard
                            key={space.id}
                            id={space.id}
                            title={space.title}
                            timestamp={space.timestamp}
                            onClick={() => handleSpaceClick(space.id)}
                            // onClick={() => console.log(space.id)}
                            onDelete={() => handleSpaceDelete(space.id)}
                        />
                    ))}
                    <Typography
                        variant={"body2"}
                        fontStyle={"italic"}
                        color={"#ffffff30"}
                        p={2}
                        fontFamily={"poppins"}
                        textAlign={"center"}
                    >
                        • • • <br />
                        End of list
                    </Typography>
                </Stack>
                <Stack
                    spacing={0.5}
                    height={620}
                    overflow={"scroll"}
                    mt={5}
                    width={300}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "5px",
                        },
                        "&::-webkit-scrollbar-track": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#ffffff30",
                            borderRadius: "24px",
                        },
                    }}
                >
                    {onlineUsers.map((user) => (
                        <OnlineUserCard
                            key={user.id}
                            id={user.id}
                            username={user.name}
                            onClickOption1={handleOption1}
                            onClickOption2={handleOption2}
                        />
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
};

export default Dashboard;
