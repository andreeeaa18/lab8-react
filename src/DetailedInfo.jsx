import { useContext } from "react";
import { spaceContext } from "./SearchInput";
import bookmarkEmpty from "./assets/small-bookmark.svg";
import bookmarkFilled from "./assets/bookmark-filled.svg";

function DetailedInfo({ data, onBack }) {
  const { toggleFavorite, isFavorite } = useContext(spaceContext);

  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${data.date.split(" ")[0].replaceAll("-", "/")}/png/${data.image}.png`;
  const isItemFavorite = isFavorite(data.identifier);

  function handleToggleFavorite() {
    toggleFavorite(data);
  }

  return (
    <div className="detailed-info">
      <button className="back-button" onClick={onBack}>
        Back
      </button>

      <div className="detailed-content">
        <div className="detailed-image-section">
          <img
            className="detailed-image"
            src={imageUrl}
            alt={data.caption || data.identifier}
          />
          <img
            className="bookmark-icon-large"
            src={isItemFavorite ? bookmarkFilled : bookmarkEmpty}
            onClick={handleToggleFavorite}
          />
        </div>

        <div className="detailed-text">
          <h2>Image Details</h2>

          <div className="detail-group">
            <h3>Basic Information</h3>
            <p>Identifier: {data.identifier}</p>
            <p>Date:{data.date}</p>
            <p>Caption: {data.caption}</p>
            <p>Version: {data.version}</p>
          </div>

          <hr />
          {data.centroid_coordinates && (
            <div className="detail-group">
              <h3>Centroid Coordinates</h3>
              <p>Latitude: {data.centroid_coordinates.lat}°</p>
              <p>Longitude: {data.centroid_coordinates.lon}°</p>
            </div>
          )}

          <hr />
          {data.dscovr_j2000_position && (
            <div className="detail-group">
              <h3>DSCOVR J2000 Position</h3>
              <p>X: {data.dscovr_j2000_position.x}</p>
              <p>Y: {data.dscovr_j2000_position.y}</p>
              <p>Z: {data.dscovr_j2000_position.z}</p>
            </div>
          )}

          <hr />
          {data.lunar_j2000_position && (
            <div className="detail-group">
              <h3>Lunar J2000 Position</h3>
              <p>X: {data.lunar_j2000_position.x}</p>
              <p>Y: {data.lunar_j2000_position.y}</p>
              <p>Z: {data.lunar_j2000_position.z}</p>
            </div>
          )}

          <hr />
          {data.sun_j2000_position && (
            <div className="detail-group">
              <h3>Sun J2000 Position</h3>
              <p>X: {data.sun_j2000_position.x}</p>
              <p>Y: {data.sun_j2000_position.y}</p>
              <p>Z:{data.sun_j2000_position.z}</p>
            </div>
          )}

          <hr />
          {data.attitude_quaternions && (
            <div className="detail-group">
              <h3>Attitude Quaternions</h3>
              <p>Q0: {data.attitude_quaternions.q0}</p>
              <p>Q1: {data.attitude_quaternions.q1}</p>
              <p>Q2: {data.attitude_quaternions.q2}</p>
              <p>Q3: {data.attitude_quaternions.q3}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailedInfo;
