import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { currentPageAtom, signedInAtom } from "@/src/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function NavbarLayout(props) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
    const [isSignedIn, setIsSignedIn] = useAtom(signedInAtom);

    useEffect(() => {
        if (currentPage === "Sign in") return;
        
        const continueSession = localStorage.getItem("signedIn");
        if (continueSession) {
            setIsSignedIn(true);
        } else {
            setCurrentPage("Sign in");
            router.push("/sign-in");
        }
    }, []);

    const navSimpleButton = (text, action, bgcolor = "bg-slate-500") => {
        return (
            <div className={`rounded-lg ${bgcolor} px-3 py-2`}>
                <button onClick={action}>{text}</button>
            </div>
        );
    };

    const navigationbutton = (text, link) => {
        let bgcolor = "bg-slate-500";
        if (currentPage === text) {
            bgcolor = "bg-slate-300";
        }
        return (
            <Link href={link} onClick={() => setCurrentPage(text, bgcolor)}>
                <div className={`rounded-lg ${bgcolor} px-3 py-2`}>{text}</div>
            </Link>
        );
    };

    const noNavIfSignedOut = () => {
        if (!isSignedIn) {
            return (
                <div
                    className={`absolute flex h-full w-full flex-col items-center justify-center border border-blue-500 bg-slate-700`}
                >
                    {props.children}
                </div>
            );
        } else {
            return (
                <div
                    className={`absolute flex h-full w-full flex-col border border-red-500 bg-slate-700 px-10`}
                >
                    <div className={`h-[5%]`}></div>
                    <div className={`flex`}>
                        {navigationbutton("Home", "/")}
                        <div className={`flex-1`}></div>
                        {navigationbutton("New note", "/notes")}
                        <div className={`p-1`}></div>
                        {navSimpleButton("Sign out", () => {
                            setIsSignedIn(false);
                            localStorage.removeItem("signedIn");
                            window.location.href = "/sign-in";
                        })}
                    </div>

                    <div>{props.children}</div>
                </div>
            );
        }
    };

    return <div>{noNavIfSignedOut()}</div>;
}
