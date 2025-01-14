import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarCheck, faBell, faCalendarAlt, faCommentDots, faUsers, faUser, faArrowRightFromBracket, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [ isLogOutClicked, setIsLogOutClicked] = useState(false);

  const userType = localStorage.getItem('type');
  const username = localStorage.getItem('username');

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const linkStyle = (path) => ({
    backgroundColor: location.pathname.includes(path) ? "var(--grey2)" : "transparent",
    color: location.pathname.includes(path) ? "var(--blue2)" : "white",
    height: "5vh",
    width: isSidebarExpanded ? "100%" : "80%",
    padding: isSidebarExpanded ? "10px 20px" : "10px 20px" ,
    display: "flex",
    alignItems: "center",
    borderRadius: location.pathname.includes(path) ? "0px 10px 10px 0" : "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  });

  const logout = (confirmed)=>{
    setIsLogOutClicked(!confirmed)
    
    if(confirmed){
      localStorage.clear()
      navigate('/')
    }
  }

  return (
    <aside
      id="sidebar"
      style={{
        width: isSidebarExpanded ? "250px" : "80px",
        backgroundColor: "var(--blue2)",
        transition: "width 0.3s ease",
        overflow: "hidden",
        whiteSpace: "nowrap",
        minHeight : "95vh",
      }}
      className="d-flex flex-column shadow-lg"
      > 
      {
        isLogOutClicked ? <div className="d-flex " style={{
          position : 'absolute',
          width : '100%',
          height : '100%',
          zIndex : 1,
          background : 'rgba(0,0,0,0.5)',
          justifyContent : 'center'
        }}>
          <div className="card" style={{
            width : '40%',
            height : '30%',
            alignSelf :'center',
          }}>
            <h6 className="text-center fs-3 p-4">Are you sure you want to log out?</h6>
            <div className="text-center pb-4">
            <FontAwesomeIcon icon={faArrowRightFromBracket} height="100" width="100" size="2x" className="text-center me-2" style={{justifySelf:'center'}} color="black"/>
            </div>
            <div className="text-center">
              <button className="btn btn-danger" onClick={()=>{setIsLogOutClicked(false)}}>Cancel</button>
              <button className="btn btn-success" onClick={()=>{logout(true)}}>Confirm</button>
            </div>
          </div>
        </div>
        : <></>
      }
      <div style={{position:"fixed"}}>
        <div className="d-flex align-items-center justify-content-between ps-2 px-4 py-2">
          <button onClick={toggleSidebar} type="button" className="btn btn-light px-4">
            <FontAwesomeIcon icon={faBars} />
          </button>
          {isSidebarExpanded && <div className="sidebar-logo text-white fw-bold">Event System</div>}
        </div>
        <ul className="d-flex flex-column py-5 px-2 ps-0 mx-0">
        <Link
            to="/event"
            className="nav-link"
            style={linkStyle("/event")}
            title={!isSidebarExpanded ? "Events" : ""}
          >
            <FontAwesomeIcon icon={faCalendarCheck} className="bi me-2" width="24" height="24" />
            {isSidebarExpanded && <span>Events</span>}
          </Link>
          
            
          { userType === 'admin' ? 
          
          <Link to="/organisers" className="nav-link my-3" style={linkStyle("/organisers")}>
            <FontAwesomeIcon icon={faUsers} className="bi me-2" width="24" height="24"/>
            {isSidebarExpanded && <span>Organisers</span>}
          </Link>
          : <></>
          }

          <Link to="/notifications" className="nav-link my-3" style={linkStyle("/notifications")}>
            <FontAwesomeIcon icon={faBell} className="bi me-2" width="24" height="24" />
            {isSidebarExpanded && <span>Notifications</span>}
          </Link>
          <Link to="/calendar" className="nav-link my-3" style={linkStyle("/calendar")}>
            <FontAwesomeIcon icon={faCalendarAlt} className="bi me-2" width="24" height="24" />
            {isSidebarExpanded && <span>Calendar</span>}
          </Link>
          <Link to="/feedback" className="nav-link my-3" style={linkStyle("/feedback")}>
            <FontAwesomeIcon icon={faCommentDots} className="bi me-2" width="24" height="24" />
            {isSidebarExpanded && <span>Feedback & Review</span>}
          </Link>

          { userType === 'organiser' ? 
          
          <Link to="/contact-admin" className="nav-link my-3" style={linkStyle("/contact-admin")}>
            <FontAwesomeIcon icon={faMailBulk} className="bi me-2" width="24" height="24"/>
            {isSidebarExpanded && <span>Contact Admin</span>}
          </Link>
          : <></>
          }
        </ul>

        <div className="mt-5 mb-5">
          <hr className="text-white"/>
        </div>
        <ul className="d-flex flex-column py-5 px-2 ps-3 mx-0 mt-5">
          <li className="nav-link my-3 text-white">
            <FontAwesomeIcon icon={faUser} width="24" height="24" className="bi me-2"/>
            <span>
              { isSidebarExpanded && 
              username }
              {console.log(localStorage.getItem('type'))}
            </span>
          </li>
          <div className="nav-link my-3 text-white" role="button" onClick={()=>{logout(false)}}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} height="24" width="24" className="bi me-2"/>
              {isSidebarExpanded && <span>Log Out</span>}
          </div>
        </ul>
        
      </div>
      
    </aside>
  );
};

export default SideBar;
