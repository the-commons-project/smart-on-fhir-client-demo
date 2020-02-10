import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUser } from "@fortawesome/free-solid-svg-icons";

import { baseUrl, REQUEST_DELAY } from "./../../constants";
import { history } from "./../../helpers";

import PatientService from "./../../services/patient.service";

export default class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {            
            details : {},
            error: {}
        };

        this.patientService = new PatientService();
    }

    componentWillMount() {
        /*if (!this.props.match.params.patientId) {
            history.push(baseUrl);
        }*/
    }

    componentDidMount() {    
        setTimeout(() => { this.getPatientDetails(this.props.match.params.patientId) }, REQUEST_DELAY);
    }
    
    async getPatientDetails(patientId) {
        await this.patientService
            .getPatient(patientId)
            .then(details => this.setState({ details }))           
            .catch(error => this.setState({ error }));
        /*FHIR.request("Patient/d0d0cde0-4b21-42f6-9c1e-bfa447d72059")
            .then(response => {
                console.log("response ", response);
            })
            .catch(error => {
                console.log(error);
            });*/
        /*
        window.FHIR.oauth2
            .ready()
            .then(client => {
                console.log("client ", client)
                //client.request(`Patient/${client.patient.id}`)
                //client.request(`Patient/APkn1cp0uzqhk3Ci`)
                client.request(`Patient`)
            })
            .then(response => {
                console.log("response ", response);
            })
            .catch(error => {
                console.log(error);
            });
        */            
    }

    renderDetails() {
        /*<div>
                <div class="panel panel-default">
                    <div class="panel-body">A Basic Panel</div>
                </div>             
        </div>*/
        let details = this.state.details;

        return (
            <div className="container">
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td className="dark text-right"><b>{details.name[0].given[0]}</b></td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td className="dark text-right"><b>{details.name[0].family}</b></td>
                        </tr> 
                        <tr>
                            <td>Prefix</td>
                            <td className="dark text-right"><b>{!!details.name[0].prefix ? details.name[0].prefix[0] : ''}</b></td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td className="dark text-right"><b>{details.gender}</b></td>
                        </tr>
                        <tr>
                            <td>Birth Date</td>
                            <td className="dark text-right"><b>{details.birthDate}</b></td>
                        </tr>                                                                                       
                    </tbody>                
                </table>
                <h2>Address</h2>         
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <td>Country</td>
                            <td className="dark text-right"><b>{details.address[0].country}</b></td>
                        </tr> 
                        <tr>
                            <td>State</td>
                            <td className="dark text-right"><b>{details.address[0].state}</b></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td className="dark text-right"><b>{details.address[0].city}</b></td>
                        </tr>
                        <tr>
                            <td>Street</td>
                            <td className="dark text-right"><b>{details.address[0].line[0]}</b></td>
                        </tr>
                        <tr>
                            <td>Zip Code</td>
                            <td className="dark text-right"><b>{details.address[0].postalCode}</b></td>
                        </tr>                                                
                    </tbody>                
                </table>
                <h2>Contact</h2>         
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <td>Phone</td>
                            <td className="dark text-right"><b>{!!details.telecom[0] ? details.telecom[0].value : ''}</b></td>
                        </tr> 
                        <tr>
                            <td>E-mail</td>
                            <td className="dark text-right"><b>{!!details.telecom[1] ? details.telecom[1].value : ''}</b></td>
                        </tr>                                             
                    </tbody>                
                </table>
                <h1></h1>
                <table>
                    <thead style={{ cursor: 'pointer'}} onClick={ e => history.push(`${baseUrl}/`) }>
                        <tr>
                            <th className="text-right"><FontAwesomeIcon icon={faChevronLeft} />&nbsp;&nbsp;&nbsp;Back to Patients List</th>
                        </tr>
                    </thead>
                </table>                
            </div>          
        );
    }    

    render() {        
        return (
            <div>
                <div>
                    <h1><FontAwesomeIcon icon={faUser} /> Patient Details</h1>
                </div>                
                {
                    !!Object.keys(this.state.details).length ?
                        this.renderDetails()
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