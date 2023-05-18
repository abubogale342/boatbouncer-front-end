import { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import Router from "next/router";

export {};
interface IProps {}

export default function Map({}: IProps) {
  const mapContainer = useRef(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    if (!mapContainer.current) return;
    mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-0.127758, 51.507351],
      attributionControl: false,
      zoom: 12,
    });

    map.on("load", () => {
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error) throw error;
          if (image) {
            map.addImage("custom-marker", image);
          }
          map.addLayer({
            id: "marker",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [-0.127758, 51.507351],
                    },
                    properties: {
                      id: "644c0ce2317e2f457445aae2",
                    },
                  },
                ],
              },
            },
            layout: {
              "icon-image": "custom-marker",
              "icon-size": 1,
            },
          });
        },
      );
    });

    map.on("click", "marker", (event) => {
      if (event?.features?.[0]?.properties?.id) {
        Router.push({
          pathname: `/boat/${event?.features?.[0]?.properties?.id}`,
        });
      } else {
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <div
        className="mb-10 ml-5 mr-10"
        ref={mapContainer}
        style={{ height: "42.5vh" }}
      />
    </div>
  );
}
