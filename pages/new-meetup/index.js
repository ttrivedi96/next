import next from 'next';
import React from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router';

const NewMeetupPage = () => {

    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData){
        // Sending API Request
        const response = await fetch('/api/new-meetups', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type' : 'application/json'
            }
       });

       const data = await response.json();
       console.log(data);
        // Redirecting to Home page after Inserting data using useRouter.    
        router.push('/');
    }
    return (
       <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    )
}

export default NewMeetupPage