import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

const GoogleMapSuggetionBoxCustom = ({ updateAddress }) => {

    const [map, setMap] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [marker, setMarker] = useState(null);
    const [mapCenter, setMapCenter] = useState(null);
    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);

    const [address, setAddress] = useState({
        street_number: "",
        street_name: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        lon: "",
        lat: ""
    });

    useEffect(() => {
        if (window.google) {
            initializeAutocomplete();
            initializeMap();
        }
    }, [window.google]);

    useEffect(() => {
        updateAddress(address)
    }, [address])

    const handleShowMap = () => {
        setShowMap(true);
    };

    const initializeAutocomplete = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ["geocode"],
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    const location = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    };
                    setMapCenter(location);
                    getAddress(place.address_components, location);
                }
            });
        }
    };

    const initializeMap = () => {
        if (window.google && window.google.maps) {
            const newMap = new window.google.maps.Map(document.getElementById("map"), {
                center: mapCenter,
                zoom: 14,
            });

            const newMarker = new window.google.maps.Marker({
                position: mapCenter,
                map: newMap,
                draggable: true,
            });

            newMarker.addListener("dragend", (event) => {
                const newPosition = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                };
                setMapCenter(newPosition);
                getAddressFromLatLng(newPosition.lat, newPosition.lng);
            });

            setMap(newMap);
            setMarker(newMarker);
        }
    };

    const getAddress = (address_components, location) => {
        let addressComponent = {
            street_number: "",
            street_name: "",
            city: "",
            state: "",
            country: "",
            zip: "",
            lat: location.lat,
            lon: location.lng
        };
        
        if (address_components) {
            address_components.forEach((component) => {
                const types = component.types;
    
                if (types.includes("street_number")) {
                    addressComponent.street_number = component.long_name;
                }
                if (types.includes("route")) {
                    addressComponent.street_name = component.long_name;
                }
                if (types.includes("locality")) {
                    addressComponent.city = component.long_name;
                }
                if (types.includes("administrative_area_level_1")) {
                    addressComponent.state = component.long_name;
                }
                if (types.includes("country")) {
                    addressComponent.country = component.long_name;
                }
                if (types.includes("postal_code")) {
                    addressComponent.zip = component.long_name;
                }
            });
        }
        
        setAddress(addressComponent)   
    }

    useEffect(() => {
        initializeMap();
    }, [mapCenter])

    const getAddressFromLatLng = async (lat, lng) => {
        const response = await fetch( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${window.env.GM_KEY}` );
        const data = await response.json();
        if (data.status === "OK") {
            getAddress(data.results[0]?.address_components, data.results[0]?.geometry.location);
        }
    };

    return (
        <React.Fragment>
            <Form.Label htmlFor="basic-url">Location</Form.Label>
            <InputGroup className="mb-3">
                <input type="text" ref={inputRef} placeholder="Enter location" className="form-control" />
                
                <Button className='btn btn-dark button-show-on-map' onClick={handleShowMap}> Show on Map </Button>
            </InputGroup>
            <div hidden={!showMap}>
                <div id="map" style={{ height: "250px", width: "100%", marginTop: "10px" }}></div>
            </div>
        </React.Fragment>
    )
}

export default GoogleMapSuggetionBoxCustom