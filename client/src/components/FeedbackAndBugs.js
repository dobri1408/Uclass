import React from 'react'
import emailjs from 'emailjs-com'
import { data } from '../store/data';
import NavbarProf from './NavbarProf';
function FeedbackAndBugs() {

    function sendEmail(e) {
        e.preventDefault();
    emailjs.sendForm('service_1pop4v3', 'template_0hcpfz8', e.target, 'user_xqMItyvQlnqjsrOquvFeQ')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

    return(
        <>
        <NavbarProf/>
        
            <div>
            <div className="container">
            <h1 style={{fontSize:"40px"}}>Feedback or Bug</h1>

            <form onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Name" name="name" />
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email Address" name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Feedback or Bug" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="197" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Send Message"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default FeedbackAndBugs