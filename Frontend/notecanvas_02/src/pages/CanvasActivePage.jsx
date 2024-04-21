import React, { useEffect, useState, useRef } from "react";
import UserAvatar from "../components/UserAvatar";


import { Space } from "react-zoomable-ui";
import CanvasSpace from "../components/CanvasSpace";
import "./canvasActivePage.css";
import DropTarget from "../components/note_component/DropTarget";
import { Box, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import CanvasTitleBar from "./CanvasTitleBar";


const CanvasActivePage = ({canvasName, id}) => {


    const [onlineUsers, setOnlineUsers] = React.useState([
        // {
        //     id: 1,
        //     name: "Michael Scott",
        // },
        // {
        //     id: 2,
        //     name: "Dwight Schrute",
        // },
        // {
        //     id: 3,
        //     name: "Jim Halpert",
        // },
        // {
        //     id: 4,
        //     name: "Pam Beesly",
        // },
        // {
        //     id: 5,
        //     name: "Ryan Howard",
        // },
    ]);

    // id = useParams();
    
     
   
    // canvas dimensions will be dynamic
    // will change as per the spaces added

    // const [canvasDimensions, setCanvasDimensions] = React.useState({
    //     height: "100vh",
    //     width: "100vw",
    // });

    // list of spaces
    const lastSpaceRef = React.useRef(null);
    const [spacesList, setSpacesList] = React.useState([]);
    const [lastSpaceId, setLastSpaceId] = React.useState(0);


    const handleAddNewSpace = () => {
        // limit the number of spaces to 6
        // if (spacesList.length >= 6) {
        //     console.log("Cannot add more than 6 spaces!");
        //     return;
        // }
        // logic to add new space
        // (first space)
        console.log("Add new space clicked!");
        setSpacesList([...spacesList, {}]);
        setLastSpaceId(lastSpaceId + 1);

        // update canvas dimensions
        // if spaces are more than 1 set width 200vw
        // setCanvasDimensions({
        //     width: "200vw",
        // });
    };
    React.useEffect(() => {
        handleAddNewSpace();
    }, []);

    useEffect(() => {
        lastSpaceRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [spacesList]);

    const handleCollaboratorsClick = () => {
        console.log("Collaborators clicked!");
    };


    return (
        <>
            <UserAvatar 
                onlineUsersList={onlineUsers}
                addedUsersClick={handleCollaboratorsClick}
                shareButtonClick={handleCollaboratorsClick}
            />
            <CanvasTitleBar />


            {/* <h1>hello</h1> */}
            <div
                style={{
                    // padding: "20px",
                    // height: canvasDimensions.height,
                    // width: canvasDimensions.width,
                    // maxWidth: "300vw",
                    // backgroundColor: "#a2a2a2",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    scrollBehavior: "smooth",
                }}
            >
                {spacesList.length > 0 ? (
                    spacesList.map((space, index) => (
                        <DropTarget
                            key={space.id}
                            canvasName = {canvasName}
                            id = {id}
                            spaceNumber={id}
                            addNewSpaceButton={handleAddNewSpace}
                            ref={
                                index === spacesList.length - 1
                                    ? lastSpaceRef
                                    : null
                            }
                        >
                            <Typography
                                variant="caption"
                                fontFamily={"poppins"}
                                style={{
                                    position: "relative",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    bottom: "0",
                                    padding: "20px",
                                    opacity: 0.5,
                                }}
                            >
                                {/* Space {index + 1} */}
                                {canvasName}
                            </Typography>
                        </DropTarget>
                    ))
                ) : (

                    <Box
                        position={"absolute"}
                        top={"40%"}
                        left={"50%"}
                        sx={{
                            transform: "translate(-50%, -50%)",
                        }}
                        padding={"20px"}
                    >
                        <Typography
                            variant="h1"
                            fontFamily={"poppins"}
                            style={{
                                color: "white",
                                opacity: 0.5,
                            }}
                        >
                            Create some spaces to get started!
                        </Typography>
                    </Box>
                )}


            </div>
        </>
    );
};

export default CanvasActivePage;
