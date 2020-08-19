import React, { useState, useEffect } from 'react'
import google from '../api/gmap'
import {
    Container,
    Form
} from 'react-bootstrap'
const GoogleMap = (props) => {

    const [locat, setLocat] = useState(null)


    useEffect(() => {

        fetch('/location', {
            method: 'POST',
        })
            .then(res => res.json())
            .then(locats => setLocat(locats))
    }, [])

    useEffect(() => {
        locat && initMap()
    }, [locat])

    const initMap = () => {
        const directionsRenderer = new google.DirectionsRenderer();
        const directionsService = new google.DirectionsService();
        const map = new google.Map(document.getElementById("map"), {
            zoom: 15,
            center: {
                lat: locat[0].lat,
                lng: locat[0].lng
            }
        });
        directionsRenderer.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsRenderer);
        document.getElementById("mode").addEventListener("change", () => {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        });

        function calculateAndDisplayRoute(directionsService, directionsRenderer) {
            const selectedMode = document.getElementById("mode").value;
            directionsService.route(
                {
                    origin: {
                        lat: locat[0].lat,
                        lng: locat[0].lng
                    },
                    destination: {
                        lat: locat[1].lat,
                        lng: locat[1].lng
                    },
                    travelMode: google.TravelMode[selectedMode]
                },
                (response, status) => {
                    if (status === "OK") {
                        directionsRenderer.setDirections(response);
                    } else {
                        window.alert("Directions request failed due to " + status);
                    }
                }
            );
        }
    }

    return (
        <Container style={{ paddingTop: '20px' }}>
            <h3>Assign : Google Map</h3>
            <div style={{ border: '1px solid #bbb', width: '230px', marginTop: '10px', marginBottom: '10px' }}></div>
            <p>Finding the best way to go to Central World from SCG Bangsue </p>
            <div >
                <b>Select one </b>
                <Form.Control as="select" id="mode" custom >
                    <option data-content="<i class='fa fa-leaf'></i> Leaf" disabled>Select One</option>
                    <option value="WALKING">Walking</option>
                    <option value="DRIVING">Driving</option>
                    <option value="TRANSIT">Transit</option>
                </Form.Control>
            </div>
            <div id="map" style={{ width: '100%', height: '550px', marginTop: '1em' }}></div>
        </Container>
    )
}

export default GoogleMap