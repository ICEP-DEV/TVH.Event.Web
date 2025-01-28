import SideBar from "../components/SideBar";
import Footer from "../components/Footer"
import emailjs from '@emailjs/browser';
import React, { useRef, useState, useEffect } from 'react';








const ContactAdmin = ()=>{

    const form = useRef();
    const [messageSent, setMessageSent] = useState(false);


    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_yvzb4hn', 'template_2xn5021', form.current, {
            publicKey: '43wpXICVCfgg-Sio9',
          })
          .then(
            () => {
              setMessageSent(true);
              form.current.reset();
            },
            (error) => {
              console.log('FAILED...', error.text);
            }
        );
    };

    useEffect(() => {
        if (messageSent) {
          const timer = setTimeout(() => setMessageSent(false), 2000); 
    
          
          return () => clearTimeout(timer);
        }
    }, [messageSent]);


    return <div className="container-fluid p-0 ">
        <div className="d-flex">
            <SideBar />
            <div className="col mt-5 d-flex justify-content-center">
                <form onSubmit={sendEmail} className="form col-6">
                    <p className="fs-1 p-5">Contact an admin</p> 
                    <div className="form-group my-3">
                        <label>Email</label>
                        <input type="email"  name="from_email" className="form-control" value={localStorage.getItem('email')} readOnly/>
                    </div>
                    <div className="form-group my-3">
                        <label>Name</label>
                        <input type="text" name="from_name" className="form-control" value={localStorage.getItem('username')} readOnly/>
                    </div>

                    <div className="form-group my-3">
                        <label className="form-label">Message</label>
                        <textarea
                            name="message"
                            className="form-control"
                            rows="5"
                            required
                            style={{resize: 'none'}}
                            
                        ></textarea>
                    </div>
                    
                    <button className="btn btn-primary" type="submit">Submit</button>
                    {messageSent && (
                        <p className="success-message">
                            Your message has been sent successfully!
                        </p>
                    )}
                </form>
            </div>
        </div>
        <Footer />
    </div>
}





export default ContactAdmin;