/// this will be a callback function for a useQuery operation that takes 
// db and table as a variable input

const queryTable = ({ queryKey }) => {
    const [key, db, table] = queryKey;
    let param = new URLSearchParams();
    param.append("db", db);
    param.append("table", table);

    return fetch(`api/select-table?${param.toString()}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            return {'rows' : data.rows, 'fields' : data.fields};
        })
        .catch((err) => console.log(`[error] queryTable ${err}`));
};

export default queryTable