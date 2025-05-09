import React, { useState, useEffect, useRef } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text, branchName }) => {
    return <div
        className="location-info"
        data-branch={branchName}
    >
        {text}
    </div>
}

export function GoogleMap({ branches, centerToBranch }) {

    const [center, setCenter] = useState({
        lat: 31.4461,
        lng: 34.8516
    })
    const [zoom, setZoom] = useState(7)

    useEffect(() => {
        if (centerToBranch) {
            setlocation(centerToBranch)
        }
    }, [centerToBranch])

    console.log('center:', center)

    function setlocation({ lat, lng, zoom }) {
        setCenter({ lat, lng })
        setZoom(zoom)
    }

    return (
        // Important! Always set the container height explicitly
        <div className="google-map" >
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyD0Pzw5IoHqPkTT9cEnnqDqEO9lPNCmKmg" }}
                center={center}
                zoom={zoom}
            >

                {branches && branches.length > 0 && branches.map(branch => {
                    return <AnyReactComponent key={branch.phone}
                        {...branch.center}
                        text="🎯"
                        branchName={branch.name}
                    />
                })}


            </GoogleMapReact>
        </div>
    );
}