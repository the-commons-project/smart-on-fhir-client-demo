import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faUserFriends } from "@fortawesome/free-solid-svg-icons";

import { baseUrl, PATH_DETAILS, REQUEST_DELAY } from "./../../constants";
import { history } from "./../../helpers";

import PatientService from "./../../services/patient.service";

export default class Details extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            patients : [],
            error: {}
        };

        this.patientService = new PatientService();
    }

    componentDidMount() {
        setTimeout(() => { this.getPatients() }, REQUEST_DELAY);                
    }

    async getPatients() {            
        await this.patientService
            .getPatients()
            .then(patients => this.setState({ patients }))           
            .catch(error => this.setState({ error }));
                    
            //this.setState({ error }, () => console.log("error ", this.state.error ) );
        

            /*window.FHIR.oauth2.init({
                //iss: "https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiJzbWFydC0xNjQyMDY4IiwiZSI6InNtYXJ0LVByYWN0aXRpb25lci03MTYxNDUwMiJ9/fhir",
                iss: "https://r3.smarthealthit.org",
                //fhirServiceUrl: "https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiJzbWFydC0xNjQyMDY4IiwiZSI6InNtYXJ0LVByYWN0aXRpb25lci03MTYxNDUwMiJ9/fhir",
                redirectUri: "#/demo/details", //redirectUri: `#${baseUrl}/details`,
                clientId: "whatever",
                //scope: "launch/patient offline_access openid fhirUser",            
                //scope: "patient/Patient.read patient/Observation.read launch/patient online_access openid profile",
                
                scope:  "patient/Patient.read patient/Observation.read launch online_access openid profile",                          
                //scope: "launch openid fhirUser patient/*.read",
                //scope: "launch",
                
                // WARNING: completeInTarget=true is needed to make this work in the codesandbox
                // frame. It is otherwise not needed if the target is not another frame or window
                // but since the entire example works in a frame here, it gets confused without
                // setting this!
                //completeInTarget: true
            })
            .then(client => console.log("client ", client));
            */
    }

    renderPatients() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Telephone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.patients.map((patient) => {
                        return (
                            <tr key={patient.resource.id} onClick={()=> history.push(`${baseUrl}/${PATH_DETAILS}/${patient.resource.id}`) }>
                                <td className="color-black"><b>{`${!!patient.resource.name[0].prefix ? patient.resource.name[0].prefix[0] : ''} ${patient.resource.name[0].given[0]} ${patient.resource.name[0].family}`}</b></td>
                                <td>{`${patient.resource.address[0].city}, ${patient.resource.address[0].state}`}</td>
                                <td>{`${patient.resource.telecom[0].value}`}</td>
                                <td><FontAwesomeIcon icon={faChevronRight} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }    

    render() {  
        //${patient.resource.name[0].given[0]} ${patient.resource.name[0].family}
        // && !Object.keys(this.state.error).length
        return (
            <div>
                <div>                    
                    <h1><FontAwesomeIcon icon={faUserFriends} /> Patients</h1>
                </div>                
                {
                    !!this.state.patients.length > 0 ?                         
                        this.renderPatients()
                     :
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                }
            </div>
        );
    }
}