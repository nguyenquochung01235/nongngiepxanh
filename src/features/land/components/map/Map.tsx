import React, { useCallback, useRef, useState } from "react";
import {
  DrawingManager,
  GoogleMap,
  LoadScript,
  Polygon,
} from "@react-google-maps/api";

const mapContainerStyle = {
  height: "500px",
  width: "1000px",
};

const center = {
  lat: 10.045162,
  lng: 105.746857,
};

const outerCoords = [
  { lat: -32.364, lng: 153.207 }, // north west
  { lat: -35.364, lng: 153.207 }, // south west
  { lat: -35.364, lng: 158.207 }, // south east
  { lat: -32.364, lng: 158.207 }, // north east
];

const onLoad = (drawingManager: any) => {
  drawingManager?.map?.data?.add([
    {
      lat: 10.099247039652582,
      lng: 105.68368561328126,
    },
    {
      lat: 10.001887453457732,
      lng: 105.9830630546875,
    },
    {
      lat: 9.965370069606989,
      lng: 105.68093903125,
    },
  ]);
};

const onPolygonComplete = (polygon: any) => {
  const coords = polygon
    .getPath()
    .getArray()
    .map((coord: any) => {
      return {
        lat: coord.lat(),
        lng: coord.lng(),
      };
    });

  console.log(JSON.stringify(coords, null, 1));
  console.log(coords);
};

const handleMouseOut = (e: any) => {
  console.log(e.latLng);
};

function Map() {
  const [path, setPath] = useState([
    {
      lat: 10.099247039652582,
      lng: 105.68368561328126,
    },
    {
      lat: 10.001887453457732,
      lng: 105.9830630546875,
    },
    {
      lat: 9.965370069606989,
      lng: 105.68093903125,
    },
  ]);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any>([]);
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng: any) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis: any) => lis.remove());
    polygonRef.current = null;
  }, []);
  console.log("The path state is", path);
  const onLoad2 = useCallback(
    (polygon: any) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );
  return (
    <LoadScript
      libraries={["drawing"]}
      googleMapsApiKey="AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8"
    >
      <GoogleMap
        mapTypeId="hybrid"
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Polygon
          editable
          draggable
          path={path}
          onMouseUp={onEdit}
          // Event used when dragging the whole Polygon
          onDragEnd={onEdit}
          onLoad={onLoad2}
          onUnmount={onUnmount}
          key={1}
          options={{
            strokeColor: "#c69",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#c69",
            fillOpacity: 0.35,
          }}
        />
        <DrawingManager
          options={{
            drawingControl: true,
            polygonOptions: { editable: true },
          }}
          onLoad={onLoad}
          onPolygonComplete={onPolygonComplete}
        ></DrawingManager>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
