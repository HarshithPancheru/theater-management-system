import React from 'react'
import EmptyState from "../../components/EmptyState/EmptyState";
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import Card from "../../components/Card/Card"
import { useState } from 'react';
import { useEffect } from 'react';
import { getMyBookings } from '../../api/booking.api';
import { showError } from "../../utils/toast";


const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (e) {
        showError("Something went wrong, please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return null;

  if (bookings.length === 0) {
    return (
      <div style={{ height: "100%", display: "flex", justifyContent: "center" }}>
        <EmptyState
          title="No Bookings Found"
          description="You haven't made any bookings yet."
          actionLabel="Book a Movie"
          onAction={() => navigate("/customer/movies")}
        />
      </div>
    );
  }

  return (
    <>
      {bookings.map(booking => (
        <Card key={booking.bookingId}>
          <article style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <img
                src="https://picsum.photos/300/300"
                style={{ height: "150px", borderRadius: "5%" }}
              />
              <div style={{ padding: "20px" }}>
                <h1>{booking.movieTitle}</h1>
                <h4>{booking.theaterName}</h4>
                <span>{booking.date} {booking.startTime}</span>
              </div>
            </div>
            <div style={{alignContent:"center"}}>
              <Button onClick={() => navigate(booking.bookingId)}>
                Show Ticket
              </Button>
            </div>
          </article>
        </Card>
      ))}
    </>
  );
};


export default MyBookings