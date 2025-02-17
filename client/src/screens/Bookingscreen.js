import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error"; 
import { useParams } from "react-router-dom";

function Bookingscreen() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { roomid } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", {
          roomid: roomid,
        });
        setRoom(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    }

    fetchData();
  }, [roomid]);

  return (
    <div className="m-5">
      {loading ? (<Loader/>) : room ? (<div>
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6">
            <h1>{room?.name}</h1>
            <img src={room.imageurls[0]} className="bigimg" alt={room.name} />
          </div>
          <div className="col-md-6">
            <div style={{ textAlign: "right" }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>From Date: </p>
                <p>To Date: </p>
                <p>Max Count: {room?.maxcount}</p>
              </b>
            </div>
            <div style={{ textAlign: "right" }}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total days: </p>
                <p>Rent per day: {room?.rentperday}</p>
                <p>Total Amount</p>
              </b>
            </div>
            <div style={{ float: "right" }}>
              <button className="btn btn-primary">Pay Now</button>
            </div>
          </div>
        </div>
      </div>) : (<Error/>)}
    </div>
  );
}

export default Bookingscreen;
