import React, { useState } from "react";
import {
    Stack,
    Container,
    Box,
    Typography,
    Chip,
    Button,
    FormControl,
    TextField,
} from "@mui/material";
import LogoOrange from "../assets/logo.svg";
import OrangeBlob from "../assets/blob_2.svg";
import OrangeLines from "../assets/orange_bg_lines.jpg";
import LandingPageCard from "../components/LandingPageCard";
import FilledTextField from "../components/FilledTextField";
import RoundedButton from "../components/RoundedButton";
import LoginCardUpperThings from "../components/LoginCardUpperThings";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { AnimatePresence, motion } from "framer-motion";
import NewLogo from "../assets/new_logo@3x.png";

const WrapperStyle = {
    width: "85vw",
    margin: "0 auto",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
};
const BlobBG = {
    backgroundImage: `url(${OrangeLines})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "absolute",
    zIndex: -1,
    height: "100vh",
    width: "100vw",
};

const LandingPage = () => {
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    return (
        <>
            <div style={BlobBG}></div>
            <Box style={WrapperStyle}>
                <Stack flexDirection={"row"}>
                    <Stack>
                        <Box
                            display={"flex"}
                            flexDirection={"row"}
                            minHeight={"300px"}
                        >
                            <LandingPageCard
                                borderRadius="40px 0 40px 40px"
                                minHeight={"350px"}
                                padding="40px 40px 30px 40px"
                            >
                                <img
                                    src={NewLogo}
                                    height={80}
                                    style={{
                                        backgroundColor: "#23232220",
                                        border: "1px solid #f2f2f260",
                                        padding: 10,
                                        borderRadius: "25px",
                                    }}
                                />
                                <Typography
                                    fontSize={30}
                                    fontFamily={"poppins"}
                                    mt={2}
                                    fontWeight={500}
                                >
                                    NoteCanvas
                                </Typography>
                                <p style={{ width: "400px", opacity: 0.7 }}>
                                    Think visually, organize intuitively.
                                    NoteCanvas empowers you to build your
                                    thoughts and ideas on a flexible canvas,
                                    perfect for any project or task.
                                </p>
                            </LandingPageCard>

                            <LandingPageCard
                                borderRadius="0 40px 40px 40px"
                                minHeight={"350px"}
                                padding="40px 40px 30px 40px"
                            >
                                <Typography
                                    fontSize={20}
                                    fontFamily={"poppins"}
                                    // mt={2}
                                    fontWeight={500}
                                >
                                    Tentative features
                                </Typography>
                                {/* Tentative features tags */}
                                <Stack
                                    mt={3}
                                    flexWrap={"wrap"}
                                    flexDirection={"row"}
                                    gap={2}
                                >
                                    <Chip label="Notes" />
                                    <Chip label="Canvas layout" />
                                    <Chip label="Notes categories" />
                                    <Chip label="Notes customizations" />
                                    <Chip label="Canvas customizations" />
                                    <Chip label="Command bar" />
                                    <Chip label="Search notes" />
                                    <Chip label="Collab session" />
                                    <Chip label="Chat" />
                                    <Chip label="Note pinning" />
                                    <Chip label="Attach file" />
                                    <Chip label="Export and share notes" />
                                    <Chip label="Keyboard shortcuts" />
                                </Stack>
                                <Typography mt={2}>
                                    ...and we are thinking of more.
                                </Typography>
                            </LandingPageCard>
                        </Box>
                        <LandingPageCard
                            minHeight={"350px"}
                            padding="40px 40px 30px 40px"
                            borderRadius="40px 40px 0 40px"
                        >
                            <Typography
                                fontSize={20}
                                fontFamily={"poppins"}
                                fontWeight={500}
                            >
                                Status
                            </Typography>
                            <Typography
                                fontSize={80}
                                fontFamily={"poppins"}
                                // mt={2}
                                fontWeight={600}
                            >
                                Deployed
                            </Typography>
                            <Stack direction={"row"} gap={15}>
                                <Box>
                                    <Typography
                                        mt={3}
                                        fontWeight={500}
                                        fontFamily={"poppins"}
                                    >
                                        Currently working on
                                    </Typography>
                                    <Typography
                                        fontFamily={"poppins"}
                                        mt={2}
                                        lineHeight={"200%"}
                                    >
                                        User login & account <br />
                                        Note object <br />
                                        Canvas UI
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        mt={3}
                                        fontWeight={500}
                                        fontFamily={"poppins"}
                                    >
                                        Upcoming
                                    </Typography>
                                    <Typography
                                        fontFamily={"poppins"}
                                        mt={2}
                                        lineHeight={"200%"}
                                    >
                                        Basic testing  <br/>
                                        Free text insert <br/>
                                        Text formatting <br/>
                                        
                                    </Typography>
                                </Box>
                            </Stack>
                        </LandingPageCard>
                    </Stack>

                    <LandingPageCard
                        minHeight="600px"
                        padding="40px 40px 30px 40px"
                        borderRadius="40px 40px 40px 0"
                        bgcolor="#1E1E1E"
                        border="1px 1E1E1E solid"
                        color="#fff"
                        alignItems="center"
                        justifyContent={"center"}
                    >
                        {showSignUpForm ? (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <SignUpForm />
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <LoginCardUpperThings />
                                <LoginForm />
                            </motion.div>
                        )}

                        <Stack
                            direction={"row"}
                            width={"100%"}
                            alignItems={"center"}
                            mt={3}
                        >
                            <Typography
                                fontFamily={"poppins"}
                                display={"inline"}
                            >
                                {showSignUpForm ? (
                                    <>Existing user?</>
                                ) : (
                                    <>New here?</>
                                )}
                            </Typography>
                            <RoundedButton
                                variant="text"
                                bgcolor="transparent"
                                fontWeight={500}
                                color="#FF5300"
                                mt="0"
                                fontSize="15px"
                                onClick={() =>
                                    setShowSignUpForm(!showSignUpForm)
                                }
                            >
                                {showSignUpForm ? <>Sign in</> : <>Sign up</>}
                            </RoundedButton>
                        </Stack>
                    </LandingPageCard>
                </Stack>
            </Box>
        </>
    );
};

export default LandingPage;
