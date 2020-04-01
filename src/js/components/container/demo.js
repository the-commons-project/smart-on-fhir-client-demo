import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faUserFriends } from "@fortawesome/free-solid-svg-icons";
// import { clientSMART as FHIR } from './services/fhir.client';
import FHIR from 'fhirclient';

import { baseUrl, PATH_DETAILS, REQUEST_DELAY, grantType, assertion, clientId, scope } from "./../../constants";
import { history } from "./../../helpers";

import PatientService from "./../../services/patient.service";
import AuthService from "./../../services/auth.service";

export default class Demo extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            patients : [],
            error: {}
        };

        this.patientService = new PatientService();
        this.authService = new AuthService();
    }

    async componentDidMount() {

        this.authService.getToken()
        .then( async (e) => {
            console.log('token ->' + e + '<-');
            await this.getPatients();
        });           
    }

    async getPatients() {        
        await this.patientService
            .getPatients()
            .then(patients => this.setState({ patients }))           
            .catch(error => this.setState({ error }));
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
                        let { name, address, telecom } = patient.resource;
                        return (
                            <tr key={patient.resource.id} onClick={()=> history.push(`${baseUrl}/${PATH_DETAILS}/${patient.resource.id}`) }>
                                <td className="color-black"><b>{`${!!name[0].prefix ? name[0].prefix[0] : ''} ${!!name[0].given ? name[0].given[0] : ''} ${name[0].family ? name[0].family : ''}`}</b></td>
                                <td>{`${!!address ? address[0].city + ', ' + address[0].state : ''}`}</td>
                                <td>{`${!!telecom ? telecom[0].value : ''}`}</td>
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