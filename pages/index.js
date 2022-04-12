import React from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const TEST_DATA = [
  {
    id: "m1",
    title: "Meet 1",
    address: "Ahmedabad",
    image:
      "https://media.istockphoto.com/vectors/vector-of-social-business-meeting-vector-id176197633?k=20&m=176197633&s=612x612&w=0&h=7dy5rM-h9cO6woAAge9Rd5Be4NKWufcS0LMggirA2lU=",
    description: "test",
  },
  {
    id: "m2",
    title: "Meet 2",
    address: "Ahmedabad",
    image:
      "https://media.istockphoto.com/vectors/vector-of-social-business-meeting-vector-id176197633?k=20&m=176197633&s=612x612&w=0&h=7dy5rM-h9cO6woAAge9Rd5Be4NKWufcS0LMggirA2lU=",
    description: "test",
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

// export async function getStaticProps(){
//     return{
//         props:{
//             meetups: TEST_DATA
//         },
//         revalidate: 1
//     };
// }

export async function getStaticProps() {
  // Connecting to databse
  const client = await MongoClient.connect("mongodb://localhost:27017/meetup");
  const db = client.db();
  const meetUpsCollection = await db.collection("meet_data");
  const meetups = await meetUpsCollection.find({}).toArray();
    // console.log(meetups)
  client.close();
  
  
  return{
    //   props: meetups
            props:{
                meetups: meetups.map(meetup => ({
                  title: meetup.title || null,
                  address: meetup.address || null,
                  image: meetup.image || null,
                  id: meetup._id.toString() || String,
                //   id: meetup._id.toString() || String,
                }))
            },
            revalidate: 1
        };
}

// fetch API request to get all meetups from database
// Sending API Request
//     const response = await fetch('/api/meetups', {
//         method: 'GET',
//         headers: {
//             'Content-Type' : 'application/json'
//         }
//    });
//    const data = await response.json();
//    console.log(data);

export default HomePage;
