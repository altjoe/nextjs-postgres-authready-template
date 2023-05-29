import knex from "../../src/db";
import bcrypt from "bcrypt";

export default async (req, res) => {
    const params = req.query;
    let { username, password } = params;

    try {
        const data = await knex("users")
            .where({ username: username })
            .select("passwordhash")
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

            res.status(200).json("success");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("fail");
    }
};
