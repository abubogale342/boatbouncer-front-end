import { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";

export {};
interface IProps {}

export default function Map({}: IProps) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.4194, 37.7749],
      zoom: 12,
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ height: "100vh" }} />
    </div>
  );
}
