import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import axios from "axios";
import api from "../APIs/API";




const EventDetails = () =>{

    const loc = useLocation();
    const { event } = loc.state || {};
    const navigate = useNavigate()
    const [register, setRegister] = useState(null)
    const [controller, setController] = useState("")

    // Edit event
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [image, setImage] = useState(null)

    

    const handleEditEvent = async() => {
        
    }

    useEffect(() => {
        setTitle(event.title)
        setTime(event.time)
        setDescription(event.description)
        setLocation(event.location)
        setEnd_date(event.end_date)
        setStart_date(event.start_date)
        setImage(event.image)
    }, [event]);

    const setActive = (ctrl)=>{
        setController(ctrl)
    }
    const controllerStyle = (ctrl) =>(
        
        controller === ctrl ? {
            backgroundColor : "#040081"
        } : {
            backgroundColor : "white",
            color : "black",
        }
    )

    return (
        <div className="container-fluid">
            <NavBar/>
            <div className="row">
                <SideBar />
                <div className="col">
                    <div className="d-flex container-fluid">
                        <div className="col-1">
                            <button className="btn" onClick={()=>{navigate("/event")}}>
                                Back
                            </button>
                        </div>
                        <div className="btn-group container-fluid  justify-self-center">
                            <button className="btn btn-primary" onClick={()=>{setActive("")}} style={controllerStyle("")}>
                                Registration Form
                            </button>
                            <button className="btn btn-primary" onClick={()=>{setActive("view")}} style={controllerStyle("view")}>
                                View Register
                            </button>
                            <button className="btn btn-primary" onClick={()=>{setActive("edit")}} style={controllerStyle("edit")}>
                                Edit Event
                            </button>
                        </div>
                    </div>
                    <div className="container-fluid">
                        {
                            controller === "" ? 
                                <div>
                                    Register form
                                </div>
                            :   <div></div>
                        }
                        {
                            controller === "view" ? 
                                <div>
                                    View registered attendees form
                                </div>
                            :   <div></div>
                        }
                        {
                            controller === "edit" ? 
                                <div>
                                    <h3>Edit Event</h3>
                                    <form id="eventForm" onSubmit={handleEditEvent} encType="multipart/form-data">
                                        <div className="form-group">
                                            <label >Event Name: </label>
                                            <input
                                            type="text"
                                            value={title}
                                            disabled
                                            className="form-control"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Event Description</label>
                                            <textarea
                                            name="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="form-control"
                                            rows="3"
                                            ></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label>Time:</label>
                                            <input
                                            type="time"
                                            name="time"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Location:</label>
                                            <input
                                            type="text"
                                            name="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Start Date:</label>
                                            <input
                                            type="date"
                                            name="start_date"
                                            value={start_date}
                                            onChange={(e) => setStart_date(e.target.value)}
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>End Date:</label>
                                            <input
                                            type="date"
                                            name="end_date"
                                            value={end_date}
                                            onChange={(e) => setEnd_date(e.target.value)}
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Image</label>
                                            <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            
                                            onChange={(e) => setImage(e.target.files[0])}
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="buttons mt-4">
                                            <button type="submit" className="btn btn-secondary">
                                            Save Event
                                            </button>
                                        </div>
                                        </form>
                                </div>
                            :   <div></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}






export default EventDetails;