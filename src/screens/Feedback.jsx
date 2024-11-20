import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";









const FeedbackPage = ()=>{



  return <div className="container-fluid p-0">
    <div className="d-flex">
      <SideBar />
      <div className="col">
        <NavBar />
      </div>
    </div>

    <Footer/>
  </div>
}





export default FeedbackPage;
