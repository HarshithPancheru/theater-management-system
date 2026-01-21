import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingDetails } from "../../api/booking.api";
import { showError } from "../../utils/toast";
import Card from "../../components/Card/Card";
import { formatDate, formatTime, calculateEndTime } from "../../utils/converter";
import Badge from "../../components/Badge/Badge";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await getBookingDetails(bookingId);
        setBookingDetails(res);
      } catch {
        showError("Something went wrong, please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, []);

  if (loading || !bookingDetails) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px",
        height: "100%"
      }}
    >
      <Card className="card--fixed">
        {/* TOP SECTION */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", right:"0px"}}>
            <Badge status={bookingDetails.status == "CONFIRMED" ? "success" : "error"} size="sm">{bookingDetails.status}</Badge>
          </div>
          <div onClick={() => { navigate("/customer/movies/" + bookingDetails.movieId) }} style={{ display: "flex", gap: "16px" }}>
            <img
              src="https://picsum.photos/200/300"
              alt="poster"
              style={{
                height: "140px",
                width: "100px",
                borderRadius: "8px",
                objectFit: "cover"
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h2 style={{ margin: 0 }}>{bookingDetails.title}</h2>
              <span style={{ color: "#666" }}>
                {bookingDetails.language}, 2D
              </span>
              <span>
                {formatTime(bookingDetails.time)} - {calculateEndTime(bookingDetails.date, bookingDetails.time, bookingDetails.duration)}
              </span>
              <span>
                {formatDate(bookingDetails.date)}
              </span>
              <span style={{ color: "#555" }}>
                {bookingDetails.theater}, {bookingDetails.location}
              </span>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  maxWidth: "300px"
                }}
              >
                {bookingDetails.amenities.map(amenity => (
                  <Badge key={amenity} size="sm">
                    {amenity}
                  </Badge>
                ))}
              </div>

            </div>
          </div>

          {/* DIVIDER */}
          <div
            style={{
              margin: "20px 0",
              height: "1px",
              background: "#ddd"
            }}
          />

          {/* QR + SEAT SECTION */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${bookingDetails.bookingId}`}
              alt="QR"
              style={{ height: "120px" }}
            />
            <div style={{ textAlign: "right" }}>
              <h3 style={{ margin: 0 }}>SCREEN: {bookingDetails.screen}</h3>
              <span>{bookingDetails.seats.join(", ")}</span>
              <p style={{ marginTop: "8px", fontSize: "12px", color: "#777" }}>
                ID: {bookingDetails.bookingId}
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "12px",
              borderTop: "1px dashed #ccc",
              fontWeight: 600,
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span>Payment Method</span>
              <span>{bookingDetails.paymentMethod}</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span>Total Amount</span>
              <span>₹ {bookingDetails.amount}</span>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingDetails;
