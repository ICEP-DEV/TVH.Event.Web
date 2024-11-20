import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import React, { useState } from "react";
import axios from 'axios';
import api from "../APIs/API";
import InfoBox from "../components/dashboard/infobox";
import { BarGraphComponent } from "../components/Graphs";






const FeedbackPage = ()=>{
  const [ events , setEvents ] = useState([])
  const [ totalReviews, setTotalReviews] = useState(null)
  const [ selectedEvent, setSelectedEvent ] = useState('');

  useState(()=>{
    
    const fetchEvents = async()=>{
      await axios.post(
        api + "event/fetchbyuser",
        {
          type : localStorage.getItem("type"),
          user_id : localStorage.getItem("user_id")
        }
      ).then((response) =>{
        setEvents(response.data.results)
      }).catch((error) =>{
        console.log(error)
      })
    }

    fetchEvents();
  });

  const handleFilter = (e) =>{

  }

  return <div className="container-fluid p-0">
    <div className="d-flex">
      <SideBar />
      <div className="col m-5">
        <div className="col-4 d-flex ">
          <select onChange={handleFilter} name="" id="" className="form-select" >
            <option value="">-- Select an event --</option>
            {
              events.map((event) =>(
                <option
                  key={event.event_id}
                  value={event.event_id}
                >
                  {event.title}
                </option>
              ))
            }
          </select>
        </div>
        {
          selectedEvent === "" ?
          <div className="col">
            <div className="row">
              <InfoBox title="Total Applications" quantity="45" colour="var(--blue)" />
              <InfoBox title="Total Participants" quantity="20" colour="var(--blue1)" />
              <InfoBox title="Total Surveys Sent" quantity="5" colour="var(--blue2)" />
            </div>
            <div className="row">
              <div className="col-md">
                <BarGraphComponent 
                  label={"Gender Data"}
                  labels={["Male", "Females"]}
                  values={[79,61]}  
                  colors={["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"]}
                />
              </div>
              <div className="col-md">
                <BarGraphComponent 
                  label={"Ethnic Groups"}
                  labels={["African", "White", "Coloured", "Indian", "Asian", "Other"]}
                  values={[471, 123, 52,12,54]}
                />
              </div>
            </div>
          </div>

          : <></>
        }
      </div>
    </div>

    <Footer/>
  </div>
}





export default FeedbackPage;
