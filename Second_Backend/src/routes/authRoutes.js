import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// Register a new user endgoing /auth/register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    //save the username and an irreversible encrypted password
    //save shikhar@gmail.com  | dbchbhbchbdcs.cjnjcnc,/..bcie

    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8); //8 is the number of rounds of encryption we want to do
    
    //save the new user and hashed password to the db
    try{
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
        const result = insertUser.run(username, hashedPassword);

        // now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello! Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo);

        //create a token 
        const token = jwt.sign({ id: result.lastInsertedRowid }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token });
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/login', (req, res) => {
    //we get their email and we look up the password associated with that email in the database 
    //but we get it back and see it is encrypted which means we cannot compare it to the one the user just used trying to login 
    //so what we have to do is again one way encrypt the password the user just entered

})

export default router;

