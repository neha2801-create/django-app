import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableBox from "./DraggableBox";
import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const DropTarget = ({ children, id, spaceNumber, canvasName }) => {

    id = useParams();
    console.log("Canvas ID",id.id);

    const [{ isOver }, drop] = useDrop({
        accept: "box",
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset();
            const left = offset ? offset.x : 20;
            const top = offset ? offset.y : 20;
            console.log("left: ", left);
            console.log("top: ", top);
            return { left, top };
            
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    // Notes list
    const [noteCards, setNoteCards] = React.useState([]);

    // function to move note card NOT WORKING
    const moveBox = (id, left, top) => {
        console.log("Moving box");
        setNoteCards((prevNoteCards) =>
            prevNoteCards.map((card) =>
                card.id === id ? { ...card, left, top } : card
            )
        );
        console.log("heheeheh");
    };

    // function to add new note card
    const addNoteCard = async (e) => {
        e.preventDefault(); // Prevent default behavior
        console.log("Adding new note card");
        const newId = noteCards.length + 1;

        const left = e.clientX;
        const top = e.clientY;

        console.log("left:", left);
        console.log("top:", top);

        const noteData = {
            // notesBody: "New Note",
            posX: e.clientX,  // Adjust according to your coordinate system
            posY: e.clientY,
            height: 100,           // Default height
            width: 200,            // Default width
            pinned: false,         // Default pinned status
            color: '#FFD700'       // Default color
        };
        console.log("Space Number", spaceNumber);
        console.log("ID", id);

        try {
            const response = await fetch(`http://127.0.0.1:8000/notes/create/${id.id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
                credentials: 'include',  // Necessary if you're managing sessions
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Note created:', data);
            } else {
                console.error('Failed to create note:', response.status);
            }
        } catch (error) {
            console.error('Error creating note:', error);
        }


        setNoteCards((prevNoteCards) => [
            ...prevNoteCards,
            { id: newId, left, top },
        ]);

        // set focus on new note card
        setFocusedNoteId(newId);
    };

    // function to delete note card
    const deleteNoteCard = (id) => {
        console.log("Deleting note card with id: ", id);
        setNoteCards((prevNoteCards) =>
            prevNoteCards.filter((card) => card.id !== id)
        );
    };

    // function to set focus on note card
    const [focusedNoteId, setFocusedNoteId] = useState(null);
    const handleFocus = (e, id) => {
        e.preventDefault(); // Prevent default behavior
        // console.log("Setting focus on note with id: ", id);
        setFocusedNoteId(id);
    };

    // fun useeffect: for retrieving the notes list
    // {
    //     data
            // after retrieve, map to draggable boxnpm
    // }



    return (
        <Stack
            // padding={"20px"}
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
        >
            <div
                onDoubleClick={(e) => addNoteCard(e)}
                ref={drop}
                style={{
                    // borderRadius: "10px",
                    height: "100vh",
                    width: "100vw",
                    backgroundColor: "#D9D9D9",
                }}
            >
                {noteCards.map((noteCard) => (
                    <DraggableBox
                        canvasID = {id.id}
                        key={noteCard.id}
                        id={noteCard.id}
                        left={noteCard.left}
                        top={noteCard.top}
                        moveBox={moveBox}
                        zIndex={focusedNoteId === noteCard.id ? 1000 : 1}
                        onClick={(e) => handleFocus(e, noteCard.id)}
                        handleNoteDelete={() => deleteNoteCard(noteCard.id)}
                        handleAddNewNote={addNoteCard}
                    />
                ))}
                {children}
            </div>
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
                {canvasName}
            </Typography>
        </Stack>
    );
};

export default DropTarget;