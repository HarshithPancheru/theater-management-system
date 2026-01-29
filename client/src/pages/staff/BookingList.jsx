import React, { useEffect, useState, useRef } from "react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Badge from "../../components/Badge/Badge";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import Modal from "../../components/Modal/Modal";
import EmptyState from "../../components/EmptyState/EmptyState";
import {
  showSuccess,
  showError,
  showInfo
} from "../../utils/toast";
import { getAllBookings, cancelBooking } from "../../api/booking.api.js";
import { useNavigate } from "react-router-dom";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loaderRef = useRef(null);
  const navigate = useNavigate();


  /* ---------------- FETCH BOOKINGS ---------------- */
  const fetchBookings = async (reset = false) => {
    try {
      const res = await getAllBookings({
        page: reset ? 1 : page,
        status,
        sort,
        search
      });

      if (reset) {
        setBookings(res.data);
      } else {
        setBookings(prev => [...prev, ...res.data]);
      }
      setLoading(false);

      setHasMore(res.data.length > 0);
    } catch (e) {
      showError("Failed to load bookings");
    }
  };

  /* ---------------- INITIAL + FILTER/SORT ---------------- */
  useEffect(() => {
    setPage(1);
    fetchBookings(true);
  }, [status, sort, search]);

  /* ---------------- INFINITE SCROLL ---------------- */
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) fetchBookings();
  }, [page]);

  /* ---------------- CANCEL BOOKING ---------------- */
  const handleCancel = async () => {
    try {
      await cancelBooking(selectedBooking._id);
      showSuccess("Booking cancelled successfully");
      setIsModalOpen(false);
      setPage(1);
      fetchBookings(true);
    } catch {
      showError("Unable to cancel booking");
    }
  };

  /* ---------------- FILTER + SORT CONFIG ---------------- */
  const statusOptions = [
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Cancelled", value: "CANCELLED" }
  ];

  const sortOptions = [
    { key: "booking_datetime_desc", label: "Booking Date ↓" },
    { key: "booking_datetime_asc", label: "Booking Date ↑" },
    { key: "show_datetime_desc", label: "Show Time ↓" },
    { key: "show_datetime_asc", label: "Show Time ↑" }
  ];

  if (loading) return null;

  if (bookings.length === 0) {
    return (
      <div style={{ height: "100%", display: "flex", justifyContent: "center" }}>
        <EmptyState
          title="No Bookings Found"
          description="No one booked ticket at your theater."
          actionLabel="View shows"
          onAction={() => navigate("/staff/shows")}
        />
      </div>
    );
  }


  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
      <h2>All Bookings</h2>

      {/* ---------------- CONTROLS ---------------- */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px"
        }}
      >
        <input
          placeholder="Search by user, movie, booking id"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />

        <FilterDropdown
          align="left"
          statusOptions={statusOptions}
          selectedStatus={status}
          onStatusChange={setStatus}
          onApply={() => { }}
          onReset={() => setStatus("")}
        />

        <SortDropdown
          options={sortOptions}
          onApply={config => setSort(Object.keys(config)[0] || "")}
        />
      </div>

      {/* ---------------- BOOKINGS LIST ---------------- */}
      {bookings.map(b => {
        const showStarted = new Date(b.showStartDateTime) <= new Date();

        return (
          <Card key={b._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <h3>{b.movieTitle}</h3>
                <p>{b.theaterName}, {b.location}</p>
                <p>
                  {new Date(b.showStartDateTime).toLocaleString()} –{" "}
                  {new Date(b.showEndTime).toLocaleTimeString()}
                </p>
                <p>{b.username} ({b.email})</p>
              </div>

              <div style={{ textAlign: "right" }}>
                <Badge
                  status={b.status === "CONFIRMED" ? "success" : "error"}
                  size="sm"
                >
                  {b.status}
                </Badge>

                {!showStarted && b.status === "CONFIRMED" && (
                  <div style={{ marginTop: "8px" }}>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setSelectedBooking(b);
                        setIsModalOpen(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}

      {/* ---------------- INFINITE SCROLL TRIGGER ---------------- */}
      <div ref={loaderRef} style={{ height: "40px" }} />

      {/* ---------------- CONFIRM MODAL ---------------- */}
      <Modal
        open={isModalOpen}
        title="Cancel Booking"
        onClose={() => setIsModalOpen(false)}
      >
        <p>Are you sure you want to cancel this booking?</p>
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <Button variant="danger" onClick={handleCancel}>
            Yes, Cancel
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>No</Button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingList;
