import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import FilledTextField from "./FilledTextField";
import RoundedButton from "./RoundedButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        loginEmailOrUsername: "",
        loginPassword: "",
    });

    const handleChange = (e) => {
        setLoginFormData({
            ...loginFormData,
            [e.target.name]: e.target.value,
        });
    };

    const [formErrors, setFormErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);


    // todo: form validation
    function handleLogin() {
        let newErrors = {};

        // Basic form validation
        for (const key in loginFormData) {
            if (!loginFormData[key].trim()) {
                newErrors[key] = `${
                    key.charAt(0).toUpperCase() + key.slice(1)
                } can't be blank`;
            }
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
            loginFormData.loginEmailOrUsername &&
            !emailRegex.test(loginFormData.loginEmailOrUsername)
        ) {
            newErrors.loginEmailOrUsername = "Invalid email format";
        }

        setFormErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            // todo 2: Sending form to backend
            // setSignUpButtonDisabled(true);
            fetch('http://127.0.0.1:8000/accounts/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginFormData.loginEmailOrUsername,
                    password: loginFormData.loginPassword,
                }),
                credentials: 'include'
            })
            .then(response => {
                if(!response.ok){
                    newErrors.failedToLogin = "Email or passsword is incorrect. Try again.";
                    setFormErrors(newErrors);
                    throw new Error('Network response was not ok.');
                }
                
                return response.json();
            })
            .then(data => {
                // Handle success, e.g., navigate to another page, store the token, etc.
                // navigate("/dashboard"); // For example, after successful login
                // if (!)
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            navigate("/");

            // console.log(
            //     "Form submitted successfully:",
            //     JSON.stringify(loginFormData)
            // );

        } else {
            console.log(formErrors);
        }
    }

    // todo: change view to sign up form
    // const switchToSignUp = () => {
    //     console.log("Switch to sign up");
    // };

    // todo: Forget password logic
    const forgetPassword = () => {};

    return (
        <Stack width={"100%"} alignContent={"start"} justifyContent={"start"}>
            <Typography color={"#ffffff"} fontSize={24} fontFamily={"poppins"}>
                Log into your canvas
            </Typography>
            <FormControl fullWidth>
            <Box height={15}>
                    <Typography
                        variant="body2"
                        fontStyle={"italic"}
                        color={"#BE0B00"}
                        fontFamily={"poppins"}
                    >
                        {/* Email or passsword is incorrect. Try again. */}
                        {formErrors.loginEmailOrUsername ||
                        formErrors.loginPassword || formErrors.failedToLogin
                            ? "Email or passsword is incorrect. Try again."
                            : ""}
                        {

                        }
                    </Typography>
                </Box>
                <FilledTextField
                    name="loginEmailOrUsername"
                    onChange={handleChange}
                    value={loginFormData.loginEmailOrUsername}
                    label={"Email"}
                    placeholder={"someone@somewhere.com"}
                    //helperText={formErrors.loginEmailOrUsername}
                    error={formErrors.loginEmailOrUsername ? true : false}
                />
                <TextField
                    name="loginPassword"
                    onChange={handleChange}
                    value={loginFormData.loginPassword}
                    required
                    label={"Password"}
                    placeholder={"darkDarkSecret"}
                    //helperText={formErrors.loginPassword}
                    error={formErrors.loginPassword ? true : false}
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    sx={{
                        mt: 2,
                        bgcolor: "#2C2C2C",
                        borderRadius: "11px",
                        label: { color: "#ffffff50" },
                        input: {
                            color: "white",
                            borderRadius: "11px",
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <VisibilityOutlinedIcon
                                            sx={{ color: "#ffffff70" }}
                                        />
                                    ) : (
                                        <VisibilityOffOutlinedIcon
                                            sx={{ color: "#ffffff70" }}
                                        />
                                    )}
                                    {/* react button component */}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <RoundedButton onClick={handleLogin}>Login</RoundedButton>
                    <RoundedButton
                        variant="text"
                        bgcolor="transparent"
                        fontWeight={400}
                        color="#FF5300"
                        fontSize="12px"
                    >
                        Forget password
                    </RoundedButton>
                </Stack>
            </FormControl>
        </Stack>
    );
};

export default LoginForm;
