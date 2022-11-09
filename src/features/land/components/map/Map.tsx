import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DrawingManager,
  GoogleMap,
  LoadScript,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import { useMutation } from "@tanstack/react-query";
import landApi from "../../../../api/land";
import { getResponseMessage } from "../../../../utils/getResponseMessage";
import { getErrorMessage } from "../../../../utils/getErrorMessage";

const mapContainerStyle = {
  height: "500px",
  width: "1050px",
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

const handleMouseOut = (e: any) => {
  console.log(e.latLng);
};

function Map() {
  const [center, setCenter] = useState({
    lat: 10.045162,
    lng: 105.746857,
  });
  const [drawShape, setDrawShape] = useState("");
  const location: any = useLocation();
  const [detailland, setDetailLand] = useState<any>();
  const postion: any = location.state?.position?.address || "";

  useEffect(() => {
    (async () => {
      setDetailLand(location.state?.position);
      try {
        const res: any = await axios.get(
          "https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=" +
            postion +
            "&gen=9&apiKey=PTfk9cxS5nhkaA1zl0_UyvbgplyvsQlu6dv5kVIloMw"
        );
        const position =
          res.data?.Response?.View[0].Result[0].Location.DisplayPosition;
        console.log(postion);
        if (position) {
          setCenter({
            lat: position.Latitude,
            lng: position.Longitude,
          });
        }
        console.log(position);
      } catch (error) {}
    })();
  }, [postion]);

  console.log(location.state);

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
    setDrawShape(JSON.stringify(coords, null, 1));
    console.log(JSON.stringify(coords, null, 1));
    console.log(coords);
  };

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
  // console.log("The path state is", path);
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

  const onLoadAt = (autocomplete: any) => {};
  const onLoadMaker = (marker: any) => {
    console.log("marker: ", marker);
  };

  const handleUpdateLand = () => {
    if (Object.keys(detailland || {}).length > 0) {
      mutation_update_land.mutate(
        {
          ...detailland,
          location: drawShape,
        },
        {
          onSuccess: (res) => {
            getResponseMessage(res);
          },
          onError: (err) => {
            getErrorMessage(err);
          },
        }
      );
    }
  };

  const mutation_update_land = useMutation((data: any) =>
    landApi.update(data, location.state.position?.id_thuadat || "")
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Cập nhật vị trí thửa đất</h2>
        <Button
          loading={mutation_update_land.isLoading}
          onClick={handleUpdateLand}
          type="primary"
        >
          Cập nhật
        </Button>
      </div>
      <LoadScript
        libraries={["drawing"]}
        googleMapsApiKey="AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8"
      >
        <GoogleMap
          mapTypeId="hybrid"
          mapContainerStyle={mapContainerStyle}
          zoom={16}
          center={center}
        >
          <Marker onLoad={onLoadMaker} position={center} />
          {/* <Polygon
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
        /> */}
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
    </>
  );
}

export default React.memo(Map);
