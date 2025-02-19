import React, { useState }  from "react";
import "../style/EventPage.css"; // Custom CSS for this page
import { useNavigate, Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import axios from "axios";
import api from "../APIs/API";
import Countdown from 'react-countdown';


const EventPage = () => {

  const [controller, setController] = useState('');
  const [allevents, setAllEvents] = useState([]);
  const [myevents, setMyevents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null)
  const navigate = useNavigate()


  const token = localStorage.getItem("token");
  let config = {
    headers : {
      "token" : `Bearer ${token}`
    }
  }


  useState(()=>{
    const getAllEvents = async()=>{
      

      await axios.get(
        api + "event/all",config)
        .then((response) => {
          setAllEvents(response.data.results);
        }).catch((error) => {
          console.log(error)
        })
    }

    const getAllCategories = async()=>{
      await axios.get(api + "category/all", config)
        .then((response) =>{
          setCategory(response.data.results)
        }).catch((error) => {
          console.log(error)
        })
    }

    const getMyEvents = async() =>{
      await axios.post(
        api + "event/fetchbyuser",
        {
          type : localStorage.getItem("type"),
          user_id : localStorage.getItem("user_id")
        },
        config
      )
      .then((response) => {
        setMyevents(response.data.results)
      }).catch((error) =>{
        console.log(error)
      })
    }

    getAllEvents();
    getAllCategories();
    getMyEvents();
  },[])




  const controllerStyles = (active)=>({
    backgroundColor : controller === active ? "var(--blue2)" : "",
    color : controller === active ? "var(--grey2)" : "black",
  })

  const navToEvent = (event) =>{
    //console.log("Implement to event Here : ");
    //console.log(event)
    navigate("/event/details")
  }

  const modalEvent = (event) => {
    console.log("A modal showing details about the event")
  }


  const handleSaveEvent = async (e) => {
    e.preventDefault();
    const cat = document.getElementById("event_form_category");
  
    let admin, organiser;
    if (localStorage.getItem("type") === "admin") {
      admin = localStorage.getItem("user_id");
      organiser = 0;
    } else if (localStorage.getItem("type") === "organizer") {
      admin = 0;
      organiser = localStorage.getItem("user_id");
    }
  
    const formData = new FormData(); // Create a FormData object
    formData.append("title", title);
    formData.append("description", description);
    formData.append("time", `${start_date} ${time}:00`);
    formData.append("location", location);
    formData.append("admin_id", admin);
    formData.append("organiser_id", organiser);
    formData.append("category_id", cat.value);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("image", image); 

    try {
      await axios.post(api + "event/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "token" : `Bearer ${token}`
        },
      });
    
      document.getElementById("eventForm").reset();
      navigate('/event');
      
    } catch (error) {
      console.log(error);
    }
  };
  

  const eventStatus = (event)=>{
    const today = new Date();
    const end_date = new Date(event.end_date);

    
    const difference = end_date - today;
  

    if(difference < 0){
      return <p style={{color:"var(--blue)"}}>
        Event Concluded
      </p>
    }
    else{
      

      

      return 
    }

    
    



  }
  

  return (
   <div className="container-fluid p-0">
    <div className="d-flex">
      <SideBar />

      <div className="col mt-5">
        <div className="d-flex justify-content-center">
          <button className="btn btn-lg filter-btn m-0 border" style={controllerStyles("")} onClick={()=>{setController("")}}>All Events</button>
          <button className="btn btn-lg filter-btn m-0 border" style={controllerStyles("create")} onClick={()=>{setController("create")}}>Create Event</button>
          <button className="btn btn-lg filter-btn m-0 border" style={controllerStyles("myevents")} onClick={()=>{setController("myevents")}}>My Events</button>
        </div>

        <div className="container-fluid">
            {
              controller === "" ? (
                allevents.map((event) =>(
                  <div key={event.event_id}
                    className="event-card m-5 text-blakc rounded-10, bg-light"
                    style={{cursor:"pointer"}}
                    onClick={()=>{ modalEvent(event) }}
                  >
                  <div className="event-image">
                    <img 
                      src={`data:image/*;base64,${event.image}`}
                      alt={event.title} 
                    />
                  </div>
                  <div className="event-details">
                    <p className="fs-3">{event.title}</p>
                    <p className="fs-6 text-secondary">
                      {event.location} - {event.start_date.split('T')[0]} 
                    </p>
                    <p className="fs-6 text-secondary">{event.description}</p>
                  </div>
                  <div className="justify-self-right">
                    {
                      (new Date(event.start_date) - new Date() <= 0) ?
                        new Date(event.end_date) - new Date() <= 0 ?
                        <p className="fs-6" style={{color:"var(--blue2)"}}>Event Concluded</p>
                        : <p className="text-success fs-5">Currently Active</p>
                      
                      : <Countdown date={new Date(event.end_date).getTime()} className="fs-5" style={{color:"var(--blue2)"}}/>
                        
                    }
                  </div>
                </div>
                ))
              ) : <></>
            }
            {
              controller === "create" ? (
                <div className="container-fluid px-5 py-2">
                  <h1 className="text-center">Create New Event</h1>
                  <div className="card p-5 align-self-center">
                    <form id="eventForm" onSubmit={handleSaveEvent} encType="multipart/form-data">
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
                          rows="4"
                          style={{resize:"none"}}
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
                </div>
              ) : <></>
            }
            {
              controller === "myevents" ? (
                myevents.map((event) =>(
                  <Link key={event.event_id}
                    className="event-card m-5 rounded-10 bg-light"
                    style={{cursor:"pointer", textDecoration:"none"}}
                    to={"/event/details"}
                    state={{event}}
                    onClick={()=>{navToEvent(event)}}
                  >
                    <div className="event-image">
                      <img 
                        src={`data:image/*;base64,${event.image}`}
                        alt={event.title} 
                      />
                    </div>
                    <div className="event-details text-black">
                      <p className="fs-3">{event.title}</p>
                      <p className="fs-6 text-secondary">
                        {event.location} - {event.start_date.split('T')[0]}
                      </p>
                      <p className="fs-6 text-secondary">{event.description}</p>
                    </div>
                    <div className="justify-self-right">
                      {
                        (new Date(event.start_date) - new Date() <= 0) ?
                          new Date(event.end_date) - new Date() <= 0 ?
                          <p className="fs-6" style={{color:"var(--blue2)"}}>Event Concluded</p>
                          : <p className="text-success fs-5">Currently Active</p>
                        
                        : <Countdown date={new Date(event.end_date).getTime()} className="fs-5" style={{color:"var(--blue2)"}}/>
                          
                      }
                    </div>
                  </Link>
                ))
              ) : <></>
            }
          </div>
      </div>
    </div>
    
    <Footer />
    
   </div>
  );
};

export default EventPage;
