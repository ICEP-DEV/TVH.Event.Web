import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faUsers, faBell, faCalendarAlt, faCommentDots } from '@fortawesome/free-solid-svg-icons';



const SideBar = () => {
  const location = useLocation();

  const linkStyle = (path) => (
    location.pathname.includes(path) ? { 
      backgroundColor : "white",
      height : "5vh",
      width : 250,
      paddingLeft : 20,
      display : "flex",
      alignItems : "center",
      color : "var(--blue2)" ,
      borderRadius : "0px 20px 20px 0",
      
    } : {
      height : "5vh",
      width : 250,
      paddingLeft : 20,
      display : "flex",
      alignItems : "center",
      color : "white" ,

    }
  );

  return (
    <div className="m-0"  style={{width:280, backgroundColor: "var(--blue2)", minHeight : "100vh", padding:0, position:"fixed" }}>

      <Link to='/event' className="d-flex align-items-center  mb-1 mb-md-1 me-md-auto text-white text-decoration-none" style={{margin:10}}>
        <p className="fs-4" >Events System</p>
      </Link>
      <hr style={{color:"white"}}/>
      <Link to="/event" className="nav-link" style={linkStyle("/event")}>
        <FontAwesomeIcon icon={faCalendarCheck} className="bi me-2" width="24" height="24"/>
        Events
      </Link>

      <Link to="/organisers" className="nav-link my-3" style={linkStyle("/organisers")}>
        <FontAwesomeIcon icon={faUsers} className="bi me-2" width="24" height="24"/>
        Organisers
      </Link>
      <Link to="/notifications" className="nav-link my-3" style={linkStyle("/notifications")}>
        <FontAwesomeIcon icon={faBell} className="bi me-2" width="24" height="24"/>
        Notifications
      </Link>
      <Link to="/calendar" className="nav-link my-3" style={linkStyle("/calendar")}>
        <FontAwesomeIcon icon={faCalendarAlt} className="bi me-2" width="24" height="24"/>
        Calendar
      </Link>
      <Link to="/feedback" className="nav-link my-3" style={linkStyle("/feedback")}>
        <FontAwesomeIcon icon={faCommentDots} className="bi me-2" width="24" height="24"/>
        Feedback & Review
      </Link>

    </div>
  )
};

export default SideBar;