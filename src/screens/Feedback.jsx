import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import PieChart  from "../components/Graphs";
import AnimatedValue from "../components/AnimatedValue";
import axios from 'axios';
import api from "../APIs/API";







const FeedbackPage = () => {

  const [ events , setEvents ] = useState([])
  const [ totalApplicants, setTotalApplicants] = useState(null)
  const [ totalParticipants, setTotalParticipants] = useState(null)
  const [ totalReviews, setTotalReviews] = useState(null)
  const [selectedEvent, setSelectedEvent ] = useState('');

  useState(()=>{
    
    const fetchEvents = async()=>{
      setTotalApplicants(10)
      setTotalParticipants(10)
      setTotalReviews(20)
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

  })

  var totalParticipantsLabels = [
    "Successful Applicants",
    "Unsuccessful Applicants",
  ]

  var totalParticipantsValues = [
    totalParticipants,
    (totalApplicants - totalParticipants),
  ]

  var totalParticipantsColors = [
    "#40ccff",
    "#f70289",
  ]

  var reviewsLabels = [
    '1 Star',
    '2 Star',
    '3 Star',
    '4 Star',
    '5 Star',
  ]
  var reviewsValues = [
    12,32,64,31,12
  ]

  var reviewColors = [
    "#40ccff",
    "#e0ecff",
    '#f70289',
    '#011291',
    '#014091'
  ]


  const handleFilter = async(e)=>{
    setSelectedEvent(e.target.value)
    
  }

  return <div className="container-fluid">
    <NavBar/>
    <div className="row">
      <SideBar/>
      <div className="col">
        <div className="col-4 d-flex">
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
          selectedEvent !== '' ?
          <div>
            <div className="row mt-5">
              <div className="col-lg-4 p-2">
                <div className="container" style={{backgroundColor:'var(--blue)'}}>
                  <p className="text-white">
                    Total Applicants
                  </p>
                  < PieChart 
                    labels={['Total Applications']} values={[totalApplicants]} colors={['#f70289']}
                  />
        
                  <h4 className="text-white d-flex justify-content-center pt-2">
                    <AnimatedValue 
                      start={0} end={totalApplicants} duration={1000}
                    />
                    <p className="pt-0 pb-0 p-3">Applicants</p>
                  </h4>

                </div>
              </div>
              <div className="col-lg-4 p-2">
                <div className="container" style={{backgroundColor:'var(--blue)'}}>
                  <p className="text-white">
                    Total Participants
                  </p>
                  < PieChart 
                    labels={totalParticipantsLabels} values={totalParticipantsValues} colors={totalParticipantsColors}
                  />
                  <h4 className="text-white d-flex justify-content-center pt-2">
                    <AnimatedValue 
                      start={0} end={totalParticipants} duration={1000}
                    />
                    <p className="pt-0 pb-0 p-3">Participants</p>
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 p-2">
                <div className="container" style={{backgroundColor:'var(--blue)'}}>
                  <p className="text-white">
                    Reviews
                  </p>
                  < PieChart 
                    labels={reviewsLabels} values={reviewsValues} colors={reviewColors}
                  />
                  <h4 className="text-white d-flex  justify-content-center pt-2">
                    <AnimatedValue 
                      start={0} end={totalReviews} duration={1000}
                    />
                    <p className="pt-0 pb-0 p-3">Reviews</p>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-4">
              <select name="" id="" className="form-select">
                <option value="" >
                  All Ratings
                </option>
                  {
                    reviewsLabels.map((review) =>(
                      <option
                        key={review}
                        value={review}
                      >
                        {review}
                      </option>
                    ))
                  }
              </select>
            </div>

            <div className="mt-2 p-5 pt-2 pb-1 text-black rounded-4" style={{background:"#f5f6f7"}}>
              <div className="d-flex justify-content-between">
                <p className="fs-3">
                  Yinhla Makamu
                </p>
                <div>ratings</div>
              </div>
              <hr />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
              </p>
            </div>
          </div>
          : <></>
        }
      </div>
    </div>
  </div>
}




export default FeedbackPage;






