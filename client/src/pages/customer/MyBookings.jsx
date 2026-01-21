import React, { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState/EmptyState";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Badge from "../../components/Badge/Badge";
import { getMyBookings } from "../../api/booking.api";
import { showError } from "../../utils/toast";
import { formatDate, formatTime } from "../../utils/converter";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch {
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
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}
    >
      <h2 style={{ marginBottom: "8px" }}>My Bookings</h2>

      {bookings.map(booking => (
        <Card key={booking.bookingId}>
          <article
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px"
            }}
          >
            {/* LEFT */}
            <div style={{ display: "flex", gap: "16px" }}>
              <img
                src="https://picsum.photos/200/300"
                alt="poster"
                style={{
                  height: "120px",
                  width: "90px",
                  borderRadius: "8px",
                  objectFit: "cover"
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h3 style={{ margin: 0 }}>{booking.movieTitle}</h3>

                <span style={{ color: "#666", fontSize: "14px" }}>
                  {booking.theaterName}
                </span>

                <span style={{ fontSize: "14px" }}>
                  {formatDate(booking.date)} | {formatTime(booking.startTime)}
                </span>

                {/* hardcoded but realistic */}
                <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
            <Badge status={booking.status == "CONFIRMED" ? "success" : "error"} size="sm">{booking.status}</Badge>
                  
                  <Badge status="info" size="sm">{booking.screenType}</Badge>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button onClick={() => navigate(booking.bookingId)}>
                View Ticket
              </Button>
            </div>
          </article>
        </Card>
      ))}
    </div>
  );
};

export default MyBookings;
