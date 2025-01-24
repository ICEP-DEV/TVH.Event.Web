import React from "react";





const PageNotFound = () =>{

    const image_404 = require("../assets/error_bg.jpg")

    return <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-5" style={{height : '100%'}}>
        <img src={image_404} alt="error img" width={'60%'}/>

        <p className="mt-5" style={{fontSize : 75, color : "#d1d1d1"}}>Sorry, Page not found</p>
    </div>  
}





export default PageNotFound;