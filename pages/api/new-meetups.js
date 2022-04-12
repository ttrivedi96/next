// /api/new-meetups

import { MongoClient } from 'mongodb';


async function handler(req, res)
{
    if(req.method === "POST")
    {
        // Receiving Request to Store data
        const data = req.body;
        
        // Connecting to databse
        const client = await  MongoClient.connect('mongodb://localhost:27017/meetup');
        const db = client.db();
        const meetUpsCollection  = db.collection('meet_data');

        //Saving data into database
        const result = await meetUpsCollection.insertOne({data});
        console.log(result);

       
        // Sending back response
        res.status(201).json({message : "Meetup Inserted!!"});
        
    }
}

export default handler;