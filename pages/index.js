import React, { useState, useEffect, useRef } from "react";
import handleNewNoteId from "@/handlers/handle-new-note-id";
import { useAtom } from "jotai";
import { signedInAtom } from "@/src/store";

export default function Index(props) {
    const newNoteId = handleNewNoteId();

    if (newNoteId.isLoading) {
        return <div>Loading...</div>;
    } else if (newNoteId.isError) {
        return <div>Error: {newNoteId.error.message}</div>;
    }

    const checkIfSomething = () => {
        if (newNoteId.data) {
            return JSON.stringify(newNoteId.data);
        } else {
            return "No data";
        }
    };

    return <div className={``}>this is the home</div>;
}
