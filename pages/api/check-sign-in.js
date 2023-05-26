// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "../../src/db";
import bcrypt from "bcrypt";

export default async (req, res) => {
    const params = req.query;
    let { username, password } = params;

    try {
        const data = await db.one("SELECT password_hash FROM users WHERE username = $1", [
            username,
            password,
        ]);
        if (!data) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        } else {
            const match = await bcrypt.compare(password, data.password_hash);
            if (!match) {
                res.status(401).json({ message: "Invalid username or password" });
                return;
            }

            res.status(200).json("success");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("fail");
    }
};
