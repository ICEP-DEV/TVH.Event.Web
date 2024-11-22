import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import React, { useState } from "react";
import axios from 'axios';
import api from "../APIs/API";
import InfoBox from "../components/dashboard/infobox";
import { BarGraphComponent } from "../components/Graphs";






const FeedbackPage = ()=>{
  const [ events , setEvents ] = useState([]) 
  const [ surveys , setSurveys ] = useState([]) 
  const [ totalReviews, setTotalReviews] = useState(null)
  const [ selectedEvent, setSelectedEvent ] = useState('');
  const [ selectedSurveyID, setSelectedSurveyID ] = useState('');
  const [ selectedSurvey, setSelectedSurvey ] = useState(null)

  // Chart data
  const [ totalApplicants, setTotalApplicants] = useState(null)
  const [ totalParticipants, setTotalParticipants] = useState(null)
  const [ attendees, setAttendees] = useState([])

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

  const handleEventFilter = (e) =>{
    setSelectedEvent(e.target.value)

    async function getParticipants(){
      await axios.get(
        api + 'register/attendee/' + parseInt(e.target.value)
      ).then((response) =>{
        setAttendees(response.data.results);
        setTotalApplicants(response.data.results.length);
        
        let temp = []
        response.data.results.map((attendee)=>{
          if(attendee.success === 1){
            temp.push(attendee)
          }
        })
        setTotalParticipants(temp.length)

      }).catch((error)=>{
        console.log(error)
      })
    }

    async function getSurveys(){
      await axios.get(
        api + "survey/all/" + parseInt(e.target.value)
      ).then((response) => {
        setSurveys(response.data.results)
      }).catch((error) =>{
        console.log(error)
      })
    }
    getParticipants();
    getSurveys();
  }

  const handleSurveyFilter = (e) =>{
    setSelectedSurveyID(e.target.value);

    async function getSurvey(){
      await axios.get(
        api + "survey/get/" + parseInt(e.target.value)
      ).then((response) =>{
        setSelectedSurvey(response.data.results)
      }).catch((error) =>{
        console.log(error)
      })
    }

    getSurvey();
  }

  return <div className="container-fluid p-0">
    <div className="d-flex">
      <SideBar />
      <div className="col m-5">
        <div className="col-4 d-flex ">
          <select onChange={handleEventFilter} className="form-select" >
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
          selectedEvent !== "" ?
          <div className="col">
            <div className="row ps-3 py-3">
              <InfoBox title="Total Applications" quantity={totalApplicants} colour="var(--blue)" />
              <InfoBox title="Total Participants" quantity={totalParticipants} colour="var(--blue1)" />
              <InfoBox title="Total Surveys Sent" quantity={surveys.length} colour="var(--blue2)" />
            </div>
            <div className="row mb-5">
              <div className="col-md">
                <BarGraphComponent 
                  label={"Gender Data"}
                  labels={["Male", "Females"]}
                  values={[79,61]}  
                  colors={["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"]}
                />
              </div>
              <div className="col-1"></div>
              <div className="col-md">
                <BarGraphComponent 
                  label={"Ethnic Groups"}
                  labels={["African", "White", "Coloured", "Indian", "Asian", "Other"]}
                  values={[471, 123, 52,12,54]}
                />
              </div>
            </div>


            <div className="col-4">
              <select className="form-select" onChange={handleSurveyFilter}>
                <option value="0">-- Select a Survey --</option>
                {
                  surveys.map((survey) =>(
                    <option 
                      key={survey.survey_id}  
                      value={survey.title}
                    >
                      {survey.title}
                    </option>
                  ))
                }
              </select>
            </div>
            {
              selectedSurveyID === "0" ?
              <div className="fs-2">testing</div>

              : <></>
            }
          </div>

          : <></>
        }
      </div>
    </div>

    <Footer/>
  </div>
}





export default FeedbackPage;
