import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
            <div className="panel panel-default">
                <div className="panel-body">
                    This is a Basic panel
                </div>
            </div>                
        </div>*/
        return (
            <table className="table">
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td className="dark text-right"><b>{this.state.details.name[0].given[0]}</b></td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td className="dark text-right"><b>{this.state.details.name[0].family}</b></td>
                    </tr>                    
                </tbody>                
            </table>
        );
    }    

    render() {
        console.log("details ", this.state.details)
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