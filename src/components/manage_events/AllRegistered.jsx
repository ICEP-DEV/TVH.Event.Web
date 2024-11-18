import axios from "axios";
import api from "../../APIs/API";
import { useEffect, useState } from "react";




const AllRegisteredComponent = ({attendees})=>{


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
                    <th>Reponses</th>
                </tr>
            </thead>
            <tbody>
                {
                    attendees.map((attendee)=>(
                        <tr key={attendee.registration_id}>
                            <td>{attendee.first_name}</td>
                            <td>{attendee.last_name}</td>
                            <td>{attendee.email}</td>
                            <td>{attendee.submitted_at.replace('T',' ').split('.')[0]}</td>
                            <td><div className="btn btn-primary">View Responses</div></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>

}



export default AllRegisteredComponent;