// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const db = require("../../src/db");

export default async (req, res) => {
    return db.any("SELECT * FROM users")
        .then((data) => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};
