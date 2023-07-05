import React, { useState } from "react";
import "./ContactUs.css";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the form from submitting and refreshing the page

        // Access the form field values
        const { name, email, subject, message } = formData;

        // Do something with the form data (e.g., send it to a server)

        // Reset the form fields
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div className="contactus">
            <section className="contact-section">
                <h2 className="h1-responsive font-weight-bold text-center my-6">Contact us</h2>
                <p className="text-center w-responsive mx-auto mb-4">
                    Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                    a matter of hours to help you.
                </p>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
                            {/* Form fields */}
                            {/* <div class="row"> */}

                                {/* <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="name" name="name" class="form-control" />
                                        <label for="name" class="">Your name</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="email" name="email" class="form-control" />
                                        <label for="email" class="">Your email</label>
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <input type="text" id="subject" name="subject" class="form-control" />
                                        <label for="subject" class="">Subject</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col-md-12">

                                    <div class="md-form">
                                        <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                                        <label for="message">Your message</label>
                                    </div>

                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="name" className="">
                                            Your name
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="email" className="">
                                            Your email
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="md-form mb-0">
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            className="form-control"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="subject" className="">
                                            Subject
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="md-form">
                                        <textarea
                                            type="text"
                                            id="message"
                                            name="message"
                                            rows="2"
                                            className="form-control md-textarea"
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                        <label htmlFor="message">Your message</label>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center text-md-left mt-4">
                                <button type="submit" className="btn btn-primary">
                                    Send
                                </button>
                            </div>
                            <div className="status"></div>
                        </form>
                    </div>

                    <div className="col-md-3 text-center">
                        <ul className="list-unstyled mb-0">
                            <li>
                                <i className="fas fa-map-marker-alt fa-2x"></i>
                                <p>New Capital, Cairo, Egypt</p>
                            </li>
                            <li>
                                <i className="fas fa-phone mt-4 fa-2x"></i>
                                <p>+ 01111112222</p>
                            </li>
                            <li>
                                <i className="fas fa-envelope mt-4 fa-2x"></i>
                                <p>iti@mail.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}



