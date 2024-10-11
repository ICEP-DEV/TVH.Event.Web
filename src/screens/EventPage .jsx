import React, { useState }  from "react";
import "../style/EventPage.css"; // Custom CSS for this page
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import axios from "axios";
import api from "../APIs/API";

const EventPage = () => {

  const [controller, setController] = useState('');
  const [allevents, setAllEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  useState(()=>{
    const getAllEvents = async()=>{
      await axios.get(api + "event/all")
        .then((response) => {
          setAllEvents(response.data.results);
        }).catch((error) => {
          console.log(error)
        })
    }

    const getAllCategories = async()=>{
      await axios.get(api + "category/all")
        .then((response) =>{
          setCategory(response.data.results)
        }).catch((error) => {
          console.log(error)
        })
    }

    getAllEvents();
    getAllCategories();
  })

  const navToEvent = () =>{
    console.log("Implement to event Here");
  }



  const handleSaveEvent = async(e) => {
    e.preventDefault();
    const cat = document.getElementById("event_form_category")


    let admin, organiser;
    if(localStorage.getItem("type") === "admin"){
      admin = localStorage.getItem("user_id");
      organiser = 0;
    }
    else if(localStorage.getItem("type") === "organizer"){
      admin = 0;
      organiser = localStorage.getItem("user_id");
    }
    console.log(time)

    await axios.post(
      api + "event/create",
      {
        "title" : title,
        "description" : description,
        "time" : start_date + " " + time + ":00",
        "location" : location,
        "admin_id" : admin,
        "organiser_id" : organiser,
        "category_id" : cat.value,
        "start_date" : start_date,
        "end_date" : end_date
      }
    ).then(
      document.getElementById("eventForm").reset()
    ).then(
      navigate('/home')
    )
    .catch((error) => (
      console.log(error)
    ))

    
  }


  return (
   <div className="container-fluid">
    <NavBar />
    <h2 className="event-title">
        More Event Options
          <hr style={{height:"1px",color:"blue" , background:"#333" }}/>
        </h2>
    <div className="row">
      <div className="col-md-2">
        <SideBar />
      </div>

      <div className="col-sm-10">
        

        <div className="d-flex justify-content-center">
          <button className="btn btn-light filter-btn m-1" onClick={()=>{setController("")}}>All Events</button>
          <button className="btn btn-light filter-btn m-1" onClick={()=>{setController("create")}}>Create Event</button>
          <button className="btn btn-light filter-btn m-1" onClick={()=>{setController("myevents")}}>My Events</button>
          
        </div>

        <div className="container-fluid">
            {
              controller === "" ? (
                allevents.map((event) =>(
                  <div key={event.event_id}

                    className="event-card m-5"
                    style={{cursor:"pointer"}}
                    onClick={()=>{navToEvent(event)}}
                  >
                <div className="event-image">
                  <img src="https://via.placeholder.com/400" alt={event.title} />
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-location-date">
                    {event.location} - {event.start_date.split('T')[0]}
                  </p>
                  <p className="event-description">{event.description}</p>
                </div>
    
                  </div>
                ))
              ) : <></>
            }
            {
              controller === "create" ? (
                <div className="d-flex flex-column justify-content-center">
                  <h1 className="align-self-center">Create New Event</h1>
                  <div className="card col-6 align-self-center">
                    <form id="eventForm" onSubmit={handleSaveEvent}>
                      <div className="form-group">
                        <label >Event Name: </label>
                        <input
                          type="text"
                          name="title"
                          onChange={(e) => setTitle(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group">
                        <label>Event Description</label>
                        <textarea
                          name="description"
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
                          onChange={(e) => setTime(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Location:</label>
                        <input
                          type="text"
                          name="location"
                          onChange={(e) => setLocation(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Start Date:</label>
                        <input
                          type="date"
                          name="start_date"
                          onChange={(e) => setStart_date(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>End Date:</label>
                        <input
                          type="date"
                          name="end_date"
                          onChange={(e) => setEnd_date(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Event Category:</label>
                        <select 
                          name="event_form_category" 
                          id="event_form_category"
                          className="form-control"
                          >
                            {
                              category.map((cat) => (
                                <option 
                                  key={cat.category_id} 
                                  value={cat.category_id}
                                    >
                                      {cat.title}
                                </option>
                              ))
                            }
                          
                        </select>
                      </div>
                      <div className="buttons mt-4">
                        <button type="submit" className="btn btn-secondary">
                          Save Event
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : <></>
            }
            {
              controller === "myevents" ? (
                <div>My Events</div>
              ) : <></>
            }
          </div>
      </div>
    </div>
   </div>
  );
};

export default EventPage;
