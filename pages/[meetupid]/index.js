import React from 'react'
import MeetupDetails from '../../components/meetups/MeetupDetails'

const MeetupId = (props) => {
  return (
    <MeetupDetails meetups={props.meetupData} />
    
  )
}

export async function getStaticPaths(){
  return{
    fallback: false,
    paths:
    [ 
      {
        params:{
          meetupid: 'm1'
        },
      },
      {
        params:{
          meetupid:'m2'
        },
      },
    ],
  };
}

export async function getStaticProps(context){

    const meetupid = context.params.meetupid;

    console.log(meetupid);
        return{
            props:{
                meetupData: {
                    image:'https://media.istockphoto.com/vectors/vector-of-social-business-meeting-vector-id176197633?k=20&m=176197633&s=612x612&w=0&h=7dy5rM-h9cO6woAAge9Rd5Be4NKWufcS0LMggirA2lU=',
                    id: meetupid,
                    title:'First Meetup',
                    address:'Ahmedabad',
                    description:'This is first meetup',
                }
            }
        }
};


export default MeetupId