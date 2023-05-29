// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import knex from "../../src/db";
import bcrypt from "bcrypt";

export default async (req, res) => {
    const params = req.query;
    let { username, password } = params;

    try {
        const result = await knex.transaction(async (trx) => {
            const user = await trx("users").where({ username: username }).first();
            console.log("user", user);

            if (user) {
                res.status(409).json("duplicate");
                return;
            }

            const salt = await bcrypt.genSalt(10);
            const passwordhash = await bcrypt.hash(password, salt);

            const new_user = await trx("users")
                .insert({ username: username, passwordhash: passwordhash })
                .returning("*");

            console.log("new_user", new_user);
            return new_user;
        });
        res.status(200).json("success");
    } catch (err) {
        console.log(err);
        if (err.code === "23505") {
            res.status(409).json("duplicate");
        } else {
            res.status(500).json("fail");
        }
    }
};
