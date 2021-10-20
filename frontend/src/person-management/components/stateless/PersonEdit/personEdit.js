import React from "react";
import {useHistory} from "react-router-dom";
import AccessDenied from "../../../../shared-kernel/components/stateless/PageNotFound/pageNotFound";

const PersonEdit = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        streetName: "",
        streetNumber: "",
        city: "",
        postcode: "",
        email: "",
        phoneNumber: ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const address = {
            "streetName": formData.streetName !== "" ? formData.streetName : props.person.address.streetName,
            "streetNumber": formData.streetNumber !== "" ? formData.streetNumber : props.person.address.streetNumber,
            "city": formData.city !== "" ? formData.city : props.person.address.city,
            "postcode": formData.postcode !== "" ? formData.postcode : props.person.address.postcode
        }
        const contactInformation = {
            "email": formData.email !== "" ? formData.email : props.person.contactInformation.email,
            "phoneNumber": formData.phoneNumber !== "" ? formData.phoneNumber : props.person.contactInformation.phoneNumber
        }

        props.onEditPerson(props.person.id.id, address, contactInformation);
        history.push("/persons");
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        return (
            <div className={"container"}>
                <div className="row pt-5">
                    <div className="col-md-5">
                        <form onSubmit={onFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="streetName">Street Name</label>
                                <input type="text"
                                       className="form-control"
                                       id="streetName"
                                       name="streetName"
                                       placeholder={props.person.address?.streetName}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="streetNumber">Street Number</label>
                                <input type="text"
                                       className="form-control"
                                       id="streetNumber"
                                       name="streetNumber"
                                       placeholder={props.person.address?.streetNumber}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text"
                                       className="form-control"
                                       id="city"
                                       name="city"
                                       placeholder={props.person.address?.city}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postcode">Postcode</label>
                                <input type="text"
                                       className="form-control"
                                       id="postcode"
                                       name="postcode"
                                       placeholder={props.person.address?.postcode}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text"
                                       className="form-control"
                                       id="email"
                                       name="email"
                                       placeholder={props.person.contactInformation?.email}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="text"
                                       className="form-control"
                                       id="phoneNumber"
                                       name="phoneNumber"
                                       placeholder={props.person.contactInformation?.phoneNumber}
                                       onChange={handleChange}
                                />
                            </div>
                            <button id="submit" type="submit" className="btn btn-primary mt-3 mb-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <AccessDenied/>
        );
    }
}

export default PersonEdit;