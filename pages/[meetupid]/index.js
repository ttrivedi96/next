import React from 'react'
import MeetupDetails from '../../components/meetups/MeetupDetails'
import { MongoClient, ObjectId } from "mongodb";

const MeetupId = (props) => {
  return (
    // <MeetupDetails meetups={props.meetupData} />
    <MeetupDetails 
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  )
}

export async function getStaticPaths(){
  
   // Connecting to databse
   const client = await  MongoClient.connect('mongodb://localhost:27017/meetup');
   const db = client.db();
   const meetUpsCollection  = db.collection('meet_data');

   const meetups = await meetUpsCollection.find({}, {_id: 1}).toArray();
  //  console.log(meetups);
   client.close();


  return{
    fallback: false,
    paths: meetups.map(meetup => ({ params: { meetupid: meetup._id.toString() } })) 
    // [ 
    //   {
    //     params:{
    //       meetupid: 'm1'
    //     },
    //   },
    //   {
    //     params:{
    //       meetupid:'m2'
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context){

    const meetupid = context.params.meetupid;
    console.log(meetupid);
// Connecting to databse
const client = await  MongoClient.connect('mongodb://localhost:27017/meetup');
const db = client.db();
const meetUpsCollection  = db.collection('meet_data');

const selectedMeetup = await meetUpsCollection.findOne({_id: ObjectId(meetupid)});
client.close();
console.log(selectedMeetup);
        return{
            props:{
              meetupData: selectedMeetup,

                //  {
                //     image:'https://media.istockphoto.com/vectors/vector-of-social-business-meeting-vector-id176197633?k=20&m=176197633&s=612x612&w=0&h=7dy5rM-h9cO6woAAge9Rd5Be4NKWufcS0LMggirA2lU=',
                //     id: meetupid,
                //     title:'First Meetup',
                //     address:'Ahmedabad',
                //     description:'This is first meetup',
                // }
            }
        }

};


export default MeetupId