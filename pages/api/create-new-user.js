// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "../../src/db";
import bcrypt from "bcrypt";

export default async (req, res) => {
    const params = req.query;
    let { username, password } = params;

    try {
        // insert new user
        password = await bcrypt.hash(password, 10);

        const data = await db.one(
            "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id;",
            [username, password]
        );

        console.log("new user id", data.id);
        res.status(200).json("success");
    } catch (err) {
        if (err.code === "23505") {
            res.status(409).json("duplicate");
        } else {
            res.status(500).json("fail");
        }
    }
};
