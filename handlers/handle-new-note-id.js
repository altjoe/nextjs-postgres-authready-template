import { useQuery } from "react-query";

const handleNewNoteId = () => {
    const queryNewNoteId = () => {
        return fetch("api/get-new-note-id")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data + 1;
            })
            .catch((err) => console.log(err));
    };

    return useQuery(["new-note-id"], queryNewNoteId);
};

export default handleNewNoteId;
