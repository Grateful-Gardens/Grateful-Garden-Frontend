/* eslint-disable import/no-webpack-loader-syntax */
import React, {useRef,useEffect,useState} from 'react';
import mapboxgl from '!mapbox-gl';
import './garden'
mapboxgl.accessToken = 'pk.eyJ1IjoiamFoODIxIiwiYSI6ImNsMzNjeHVxMTE2YnQzZHIxczIwd2lkY2YifQ.LTp7QPHtc0RzjJr4V-0PYg'

const MapBox = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const[lng,setLng] = useState(-73.6);
    const[lat,setLat] = useState(40);
    const[zoom,setZoom] = useState(4);
    useEffect(() =>{
        // initlaize and create map only once
        if(map.current) return; 
        map.current = new mapboxgl.Map({
            container : mapContainer.current,
            style: 'mapbox://styles/jah821/cl33d5zka002c18qs2te2zw6z',
            center:[lng,lat],
            zoom:zoom
        })

    })  

        useEffect(() => {
            // wait for map to initaizlize
            if(!map.current) return;
            map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            })
        })
    

    return(
    <div>
        <div className='sidebar'>
            Longtitude: {lng} | Latitude: {lat}| Zoom : {zoom}       
            </div>
        <div ref={mapContainer} className='map-container'/>
    </div>
)

}

export default MapBox
