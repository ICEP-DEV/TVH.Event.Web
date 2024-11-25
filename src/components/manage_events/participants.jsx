import axios from "axios";
import api from "../../APIs/API";
import { useEffect, useState } from "react";



const AllParticipantsComponent = ({attendees})=>{

    let participants = []
    attendees.map((attendee)=>{
        if(attendee.successful === 1){
            participants.push(attendee)
        }
    })

    


    return <div className="container-fluid">
        <div className="col-5 my-2">
            <input type="search" className="form-control" placeholder="Search participant"/>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Date</th>
                    <th>Reponses</th>
                </tr>
            </thead>
            <tbody>
                {
                    participants.map((participant)=>(
                        <tr key={participant.registration_id}>
                            <td>{participant.first_name}</td>
                            <td>{participant.last_name}</td>
                            <td>{participant.email}</td>
                            <td>{participant.submitted_at.replace('T',' ').split('.')[0]}</td>
                            <td><div className="btn btn-primary">View Responses</div></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>

}



export default AllParticipantsComponent;