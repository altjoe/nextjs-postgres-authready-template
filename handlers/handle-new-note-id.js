import { useQuery } from "react-query";

const handleNewNoteId = () => {
    const queryNewNoteId = () => {
        return fetch("api/get-new-note-id")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const maxid = data.reduce((max, p) => (p.id > max ? p.id : max), data[0].id);
                return maxid + 1;
            })
            .catch((err) => console.log(err));
    };

    return useQuery(["new-note-id"], queryNewNoteId);
};

export default handleNewNoteId;
