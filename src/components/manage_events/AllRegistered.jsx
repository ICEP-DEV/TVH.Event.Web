import api from "../../APIs/API";
import axios from "axios";
import { useState } from "react";


const AllRegisteredComponent = ({attendees})=>{

    const [attendeesList, setAttendees] = useState(attendees);

    const updateAttendee = async(attendee, code)=>{
        const index = attendeesList.findIndex(
            (a) => a.registration_id === attendee.registration_id
        );

        if(index !== -1){

            if(code === 1){
                await axios.put(
                    api + 'attendee/events/' + attendee.registration_id,
                    {
                        "registration_id" : attendee.registration_id
                    }
                ).catch((error) =>{
                    return; 
                })
            }else if(code === 0){
                await axios.delete(
                    api + 'attendee/events/' + attendee.registration_id,
                ).catch((error) =>{
                    console.log(error)
                    return; 
                })
                    
            }else{
                return;
            }

            const newAttendees = [...attendeesList];
            newAttendees[index].successful = code; 
            setAttendees(newAttendees); 
        }
    }

    return <div className="container-fluid mt-2" style={{minHeight: "70vh"}}>
        <div className="col-5 my-2">
            <input type="search" className="form-control" placeholder="Search"/>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Date</th>
                    <th>Action</th>
                    <th>Reponses</th>
                </tr>
            </thead>
            <tbody>
                {
                    attendeesList.map((attendee)=>(
                        <tr key={attendee.registration_id}>
                            <td>{attendee.first_name}</td>
                            <td>{attendee.last_name}</td>
                            <td>{attendee.email}</td>
                            <td>{attendee.submitted_at.replace('T',' ').split('.')[0]}</td>
                            <td>
                                {
                                    attendee.successful === 1 ?
                                        <div className="btn btn-danger" onClick={()=>{
                                            updateAttendee(attendee, 0)
                                        }}>
                                            Remove from Participants
                                        </div>
                                        : <div className="btn btn-success" onClick={()=>{updateAttendee(attendee, 1)}}>
                                            Add to Participants
                                        </div>
                                }
                            </td>
                            <td><div className="btn btn-primary">View Responses</div></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>

}



export default AllRegisteredComponent;