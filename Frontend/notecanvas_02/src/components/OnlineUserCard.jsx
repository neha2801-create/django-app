import React from "react";
import {
    Stack,
    Typography,
    Avatar,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    MenuItem,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CircleIcon from "@mui/icons-material/Circle";

// import { AddToCanvasIconLight } from "../assets/addToCanvasIconLight.svg";

const OnlineUserCard = ({ id, username, onClickOption1, onClickOption2 }) => {
    return (
        <Stack
            id={id}
            sx={{
                bgcolor: "#141414",
            color: "white",
                borderRadius: "10px",
            }}
            padding={2}
            alignItems={"center"}
            spacing={1}
            direction={"row"}
            justifyContent={"spaced-between"}

            
        >
            <Stack direction="row" alignItems={"center"} flex={1} gap={1}>

            <Avatar
                sx={{
                    color: "#ffffff50",
                    backgroundColor: "#2C2C2C",
                    fontSize: 15,
                }}
            >
                {username[0]}
            </Avatar>
            <Typography fontFamily={"poppins"}>{username}</Typography>
            </Stack>
            
            
            <CircleIcon sx={{fontSize: "16px", color:"green"}} />
        </Stack>
    );
};

export default OnlineUserCard;