// /api/new-meetups

import { MongoClient } from 'mongodb';

async function handler(req, res)
{
    if(req.method === "GET")
    {
        const data = req.body;
        
        // Connecting to databse
        const client = await  MongoClient.connect('mongodb://localhost:27017/meetup');
        const db = client.db();
        const meetUpsCollection  = db.collection('meet_data');

        //fetching data from database
        const result = await meetUpsCollection.find().toArray();   
        console.log(result);
        res.send(result);
        // client.close();

        // Sending back response
        res.status(201).json({message : "Meetup Inserted!!"});
        
    }
}

export default handler;