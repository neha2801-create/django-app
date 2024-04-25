import React, { forwardRef, useEffect, useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { Rnd } from "react-rnd";
import NoteOne from "./NoteOne";
import { Stack, IconButton, Box, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import NoteColorButton from "../note_component/NoteColorButton";
import axios from "axios";
// import { BOX } from "./ItemTypes";

const DraggableBox = forwardRef(
    (
        {
            id,
            canvasID,
            body,
            left,
            top,
            height,
            width,
            color,
            moveBox,
            zIndex,
            onClick,
            handleNoteDelete,
            handleAddNewNote,
            // notesBody
        },
        ref
    ) => {
        const [{ isDragging }, drag] = useDrag({
            type: "box",
            item: () => ({ id, left, top }),
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
                
            }),
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult();
                if (dropResult) {
                    const { left, top } = dropResult;
                    moveBox(item.id, left, top);
                    console.log("Box moved to", left, top);
                } else {
                    console.log("Box moved to", left, top);
                }
                console.log("Box moved to", left, top);
            },
        });

        const [dimensions, setDimensions] = useState({ width, height });

        // const [dimensions, setDimensions] = React.useState({
        //     width: 300,
        //     height: 300,
        // });

        const handleResize = (event, direction, ref, delta, position) => {
            setDimensions({
                height: ref.offsetHeight,
                width: ref.offsetWidth,
            });
        };



        const [noteBGColor, setNoteBGColor] = useState(color);
        // const [noteBGColor, setNoteBGColor] = React.useState("#ffffff50");
        const [border, setBorder] = React.useState("1px solid #00000050");

        // const [noteContent, setNoteContent] = React.useState("");
        // const [noteContent, setNoteContent] = React.useState(notesBody);
        const [noteContent, setNoteContent] = React.useState(body);

        useEffect(() => {
            setNoteContent(body);
            setNoteBGColor(color);
            setDimensions({ width, height });
        // }, []);
        }, [body, color, width, height]);


        // noteEditMode is used to toggle between note content view and note content edit mode
        const [noteEditMode, setNoteEditMode] = React.useState(false);

        const handleNoteContentChange = (event) => {
            // setNoteContent(e.target.value);
            // setNoteEditMode(!noteEditMode);
            // if (document.activeElement.id === "noteContentTextField") {
            //     console.log("Note content text field has focus");
            //     setBorder("2px dashed blue");
            //     return;
            // } else {
            //     console.log("Note content text field does not have focus");
            //     setBorder("1px solid #00000050");
            // }
        };

        const [isHovered, setIsHovered] = React.useState(false);


        const saveNoteChanges = () => {
            const updateData = {
                canvasId: canvasID,
                body: noteContent,
                backgroundColor: noteBGColor,
                width: dimensions.width,
                height: dimensions.height,
                left: left,
                top: top
            }

            axios.put(`http://127.0.0.1:8000/notes/update/${id}/`, updateData,{
                withCredentials: true  
            })
            .then(response => {
                console.log("Note updated successfully");
                console.log(updateData);
                
            })
            .catch(error => {
                console.error("Failed to update note", error);

            });
        };

        
        useEffect(() => {
            // Update the backend whenever note properties change
            saveNoteChanges();
            // setNoteContent()
            
        }, [noteContent, noteBGColor, left, top, dimensions]);
        
        const [noteContentValue, setNoteContentValue] = useState(body);

        useEffect(()=>{
            setNoteContentValue(noteContent);
        }, [noteContent]);
    
        useEffect(() => {
            if (textFieldRef.current) {
              textFieldRef.current.focus();
            }
          }, [noteContent]);
        
        const textFieldRef = useRef(null);

        // const handleNoteContentChange = (event) => {
        //     setNoteContent(event.target.value);
        //   };

        return (
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Rnd
                    onClick={onClick}
                    default={{
                        x: 0,
                        y: 0,
                        width: 300,
                        height: 300,
                    }}
                    minHeight={250}
                    minWidth={250}
                    onResize={handleResize}
                    style={{
                        display: "flex",
                        border: border,
                        borderRadius: "10px",
                        backgroundColor: noteBGColor,
                        backdropFilter: "blur(10px)",
                        zIndex: zIndex,
                    }}
                    size={{ width: dimensions.width, height: dimensions.height }}
                    position={{ x: left, y: top }}
                    onDragStop={(e, d) => {
                        moveBox(id, d.x, d.y);
                    }}
                    // onResizeStop={handleResize}
                    // style={{
                    //     border: isDragging ? "2px dashed blue" : "1px solid #000",
                    //     zIndex,
                    // }}

                >
                    <Stack flexGrow={1} width={"100%"}>
                        {isHovered ? (
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                            >
                                <IconButton onClick={handleNoteDelete}>
                                    <CloseIcon />
                                </IconButton>

                                <Stack
                                    direction={"row"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    alignContent={"center"}
                                    spacing={0.5}
                                >
                                    <NoteColorButton
                                        color={"#ffffff"}
                                        onclick={() =>
                                            setNoteBGColor("#ffffff50")
                                        }
                                    />
                                    <NoteColorButton
                                        color={"#A8CC8C"}
                                        onclick={() =>
                                            setNoteBGColor("#A8CC8C50")
                                        }
                                    />
                                    <NoteColorButton
                                        color={"#DEC63D"}
                                        onclick={() =>
                                            setNoteBGColor("#DEC63D50")
                                        }
                                    />
                                    <NoteColorButton
                                        color={"#C5B8A4"}
                                        onclick={() =>
                                            setNoteBGColor("#C5B8A450")
                                        }
                                    />
                                    <NoteColorButton
                                        color={"#658080"}
                                        onclick={() =>
                                            setNoteBGColor("#65808050")
                                        }
                                    />
                                    <NoteColorButton
                                        color={"#6FC5CB"}
                                        onclick={() =>
                                            setNoteBGColor("#6FC5CB50")
                                        }
                                    />
                                </Stack>
                                <IconButton onClick={handleAddNewNote}>
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                        ) : null}
                        <Stack
                            onClick={handleNoteContentChange}
                            onDoubleClick={() =>
                                console.log("Note double clicked")
                            }
                            flexGrow={1}
                            paddingTop={3}
                            px={2}
                            pb={2}
                            justifyContent={"center"}
                            alignItems={"center"}
                            overflow={"auto"}
                            sx={{
                                scrollbarColor: "#00000050 #ffffff00",
                                scrollbarWidth: "thin",
                                scrollbarGutter: "0",
                                scrollMargin: "0",
                                scrollBehavior: "smooth",
                            }}
                        >
                            <TextField
                            ref={textFieldRef}

                                variant="standard"
                                minRows={9}
                                InputProps={{
                                    sx: {
                                        textAlign: "center",
                                        border: "none",
                                        outline: "none",
                                        padding: 0,
                                        backgroundColor: "transparent",
                                        fontFamily: "Poppins",
                                    },
                                    disableUnderline: true,
                                }}
                                id="noteContentTextField"
                                value={noteContentValue}
                                onChange={(e) => setNoteContent(e.target.value)}
                                // when losing focus, toggle noteEditMode
                                onBlur={() => handleNoteContentChange()}
                                multiline
                                autoFocus
                                fullWidth
                                placeholder={"ಠ_ಠ Write something..."}
                            />
                        </Stack>
                    </Stack>
                </Rnd>
            </div>
        );
    }
);

export default DraggableBox;


