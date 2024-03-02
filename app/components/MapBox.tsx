import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Marker, ViewStateChangeEvent } from "react-map-gl";

export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

interface Props {
  defaultViewState: ViewState;
  width?: number;
  height?: number;
  markers?: [
    {
      longitude: number;
      latitude: number;
    },
  ];
  onMove?: (e: ViewStateChangeEvent) => void;
}

const MapBox: React.FC<Props> = ({
  defaultViewState,
  width = "100%",
  height = "100%",
  onMove,
  markers,
}) => {
  return (
    <div
      className="
        flex
        justify-center
        w-full
        aspect-square
        rounded-lg
        p-1
      "
    >
      <ReactMapGL
        mapLib={import("mapbox-gl")}
        {...defaultViewState}
        onMove={onMove}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
        style={{ width, height }}
      >
        {markers?.map((item, index) => {
          return <Marker key={index} {...item} />;
        })}
      </ReactMapGL>
    </div>
  );
};

export default MapBox;
