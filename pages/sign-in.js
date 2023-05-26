import React, { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { signedInAtom } from "@/src/store";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

const userForm = () => {
    const [user, setUser] = useState({ Username: "", Password: "" });

    const handleUsernameChange = (event) => {
        let temp = { ...user };
        temp[event.target.name] = event.target.value;
        setUser(temp);
    };

    return [user, handleUsernameChange];
};

export default function SignIn(props) {
    const router = useRouter();
    const [user, setUser] = userForm();

    const newUserMutation = useMutation(async (data) => {
        const { Username, Password } = data;
        let params = new URLSearchParams();
        params.append("username", Username);
        params.append("password", Password);

        return fetch("api/create-new-user?" + params, { method: "GET" })
            .then((response) => response.json())
            .catch((err) => console.log(err));
    });

    const checkSignInQuery = useMutation(async (data) => {
        const { Username, Password } = data;
        let params = new URLSearchParams();
        params.append("username", Username);
        params.append("password", Password);

        return fetch("api/check-sign-in?" + params, { method: "GET" })
            .then((response) => response.json())
            .catch((err) => console.log(err));
    });

    const [isisSignedIn, setIsSignedIn] = useAtom(signedInAtom);
    const [accountCreated, setAccountCreated] = useState(true);
    const [action, setAction] = useState("Sign in");

    // useeffect to submit on enter key

    const textInput = (placeholder, type) => {
        return (
            <div className={`mx-10 flex overflow-clip rounded-lg`}>
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`flex-1 bg-slate-100 p-1 outline-none`}
                    onInput={setUser}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSubmit();
                        }
                    }}
                    name={placeholder}
                />
            </div>
        );
    };

    const actionButtonOptions = (text, action) => {
        let activeColor = text === action ? "bg-slate-100" : "bg-slate-400";

        return (
            <button
                className={`${activeColor} rounded-lg px-3 py-2`}
                onClick={(event) => {
                    setLoginStatus("");
                    return action(event);
                }}
            >
                {text}
            </button>
        );
    };

    const signin = () => {
        return (
            <>
                {textInput("Username", "text")}
                <div className={`p-0.5`}></div>
                {textInput("Password", "password")}
            </>
        );
    };

    const createAccount = () => {
        return (
            <>
                {textInput("Username", "text")}
                <div className={`p-0.5`}></div>
                {textInput("Password", "password")}
                <div className={`p-0.5`}></div>
                {textInput("Confirm password", "password")}
            </>
        );
    };

    const handleSubmit = () => {
        if (user.Username === undefined || user.Password === undefined) {
            return;
        }

        if (action === "Sign in") {
            checkSignInQuery.mutate(user);
        } else {
            if (user.Password === user["Confirm password"]) {
                newUserMutation.mutate(user);
            } else {
                setLoginStatus("Passwords do not match");
            }
        }
    };

    const [loginStatus, setLoginStatus] = useState("");
    useEffect(() => {
        if (newUserMutation.isSuccess) {
            if (newUserMutation.data === "success") {
                setLoginStatus("Account created");
                setAction("Sign in");
                // checkSignInQuery.mutate(user);
            } else if (newUserMutation.data === "duplicate") {
                setLoginStatus("Username already exists");
            } else {
                setLoginStatus("Account creation failed");
            }
        }
    }, [newUserMutation.data]);

    useEffect(() => {
        if (checkSignInQuery.isSuccess) {
            if (checkSignInQuery.data === "success") {
                setLoginStatus("Logging in");
                setIsSignedIn(true);
                router.push("/");
                localStorage.setItem("isSignedIn", true);
            } else {
                setLoginStatus("Incorrect username or password");
            }
        }
    }, [checkSignInQuery.data]);

    const displayAction = () => {
        if (action === "Sign in") {
            return signin();
        } else {
            return createAccount();
        }
    };

    return (
        <div className={``}>
            <div className={`w-1/5 min-w-[300px] rounded-2xl bg-slate-500 lg:min-w-[400px]`}>
                <div className={`p-5`}></div>
                <div className={`flex justify-center`}>
                    {actionButtonOptions("Sign in", (event) => setAction("Sign in"))}
                    <div className={`p-3`}></div>
                    {actionButtonOptions("Register", (event) => setAction("Register"))}
                </div>
                <div className={`p-1`}></div>
                {displayAction()}
                <div className={`p-2 text-center`}>{loginStatus}</div>
                <div className={`flex justify-center pb-8`}>
                    {actionButtonOptions("Submit", handleSubmit)}
                </div>
            </div>
        </div>
    );
}
