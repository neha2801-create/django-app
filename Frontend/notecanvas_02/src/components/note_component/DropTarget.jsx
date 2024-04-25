import React, { useState, useEffect } from "react";
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
            posX: e.clientX,
            posY: e.clientY,
            height: 100,         
            width: 200,          
            pinned: false,       
            color: '#FFD700'   
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
                credentials: 'include', 
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
    const deleteNoteCard = async (note_id) => {
        console.log("Deleting note card with id: ", note_id);
        console.log("Space id:", id.id);
        const data = {
            canvasId: id.id,
        }
        try {
            
            const response = await fetch(`http://127.0.0.1:8000/notes/delete/${note_id}/`, {
                method: "DELETE",
                // No need for Content-Type header for DELETE requests
                // No need for body for DELETE requests
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ canvasId: id.id })
            });
            if (response.ok) {
              setNoteCards((prevNoteCards) =>
                prevNoteCards.filter((card) => card.id !== note_id)
              );
              console.log("Note deleted successfully");
            } else {
              console.error("Failed to delete note:", response.status);
            }
          } catch (error) {
            console.error("Error deleting note:", error);
          }
        // setNoteCards((prevNoteCards) =>
        //     prevNoteCards.filter((card) => card.id !== id)
        // );
    };

    // function to set focus on note card
    const [focusedNoteId, setFocusedNoteId] = useState(null);
    const handleFocus = (e, id) => {
        e.preventDefault(); // Prevent default behavior
        // console.log("Setting focus on note with id: ", id);
        setFocusedNoteId(id);
    };


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/notes/get/${id.id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const rawData = await response.json();
                    const notesData = rawData.notes; 
                    console.log('Notes fetched:', notesData.body);
                    setNoteCards(notesData.map(note => ({
                        id: note.id,
                        left: note.left, 
                        top: note.top,
                        height: note.height,
                        width: note.width,
                        color: note.color,
                        notesContent: note.body,
                        // pinned: note.pinned  
                    })));
    
                } else {
                    console.error('Failed to fetch notes:', response.status);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, [id.id]);

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
                        height={noteCard.height}
                        width={noteCard.width}
                        color={noteCard.color}
                        body={noteCard.notesContent}
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