import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import FormModel from './db'

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/form', async (req, res) => {
    try {
        const {map, time} = req.body;

        if (!map || !time){
            return res.status(200).send("Name and email are required");
        }

        const newFormEntry = new FormModel({map, time});
        await newFormEntry.save();

        res.status(201).send("Sucessfully saved");
    } catch (error){
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(5000, () =>{
    console.log("Listening");
});