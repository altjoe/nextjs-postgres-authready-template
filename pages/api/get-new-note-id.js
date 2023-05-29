// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import knex from "../../src/db";
import bcrypt from "bcrypt";

export default async (req, res) => {
    const params = req.query;
    let { username } = params;

    try {
        const data = await knex("notes")
            .where({ username: username })
            .select("id")
            .orderBy("id", "desc")
            .first();

        if (!data) {
            res.status(401).json("fail");
            return;
        } else {
            const match = await bcrypt.compare(password, data.passwordhash);
            if (!match) {
                res.status(401).json("fail");
                return;
            }

            res.status(200).json(data);
        }
    } catch (err) {
        console.log(`[API ERROR]: /api/get-new-note-id ${err}`);
        res.status(500).json("fail");
    }
};
