// src/pages/super-admin/Shows.jsx
import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import EmptyState from "../../components/EmptyState/EmptyState";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import { showSuccess, showError, showLoading } from "../../utils/toast";
import {
  getShowsByMovie,
  createShow,
  updateShow,
  deleteShow,
} from "../../api/show.api";

const Shows = ({ movieId }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingShow, setEditingShow] = useState(null);
  const [formData, setFormData] = useState({
    screenId: "",
    date: "",
    startTime: "",
    priceMultiplier: 1.0,
  });

  const fetchShows = async () => {
    setLoading(true);
    try {
      const res = await getShowsByMovie(movieId);
      setShows(res.data || []);
    } catch {
      showError("Failed to fetch shows");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) fetchShows();
  }, [movieId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const toastId = showLoading("Saving show...");
    try {
      if (editingShow) {
        await updateShow(editingShow._id, formData);
        showSuccess("Show updated successfully");
      } else {
        await createShow({ ...formData, movieId });
        showSuccess("Show created successfully");
      }
      setModalOpen(false);
      fetchShows();
    } catch {
      showError("Failed to save show");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleDelete = async (id) => {
    const toastId = showLoading("Deleting show...");
    try {
      await deleteShow(id);
      showSuccess("Show deleted successfully");
      fetchShows();
    } catch {
      showError("Failed to delete show");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const columns = [
    { key: "screenId.name", label: "Screen" },
    { key: "date", label: "Date" },
    { key: "startTime", label: "Start Time" },
    { key: "priceMultiplier", label: "Price Multiplier" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <>
          <Button
            size="sm"
            onClick={() => {
              setEditingShow(row);
              setFormData({
                screenId: row.screenId?._id || "",
                date: row.date?.split("T")[0] || "",
                startTime: row.startTime,
                priceMultiplier: row.priceMultiplier,
              });
              setModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1 className="page-title">Shows</h1>
      {loading ? (
        <Loader />
      ) : shows.length === 0 ? (
        <EmptyState
          title="No Shows Found"
          description="Add a show to get started."
          actionLabel="Add Show"
          onAction={() => {
            setEditingShow(null);
            setFormData({
              screenId: "",
              date: "",
              startTime: "",
              priceMultiplier: 1.0,
            });
            setModalOpen(true);
          }}
        />
      ) : (
        <>
          <Button
            onClick={() => {
              setEditingShow(null);
              setFormData({
                screenId: "",
                date: "",
                startTime: "",
                priceMultiplier: 1.0,
              });
              setModalOpen(true);
            }}
          >
            Add Show
          </Button>
          <Table columns={columns} data={shows} />
        </>
      )}

      {/* Modal for Add/Edit */}
      <Modal
        open={modalOpen}
        title={editingShow ? "Edit Show" : "Add Show"}
        onClose={() => setModalOpen(false)}
      >
        <Input
          label="Screen ID"
          value={formData.screenId}
          onChange={(val) => handleChange("screenId", val)}
        />
        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(val) => handleChange("date", val)}
        />
        <Input
          label="Start Time"
          type="time"
          value={formData.startTime}
          onChange={(val) => handleChange("startTime", val)}
        />
        <Input
          label="Price Multiplier"
          type="number"
          value={formData.priceMultiplier}
          onChange={(val) => handleChange("priceMultiplier", val)}
        />
        <Button onClick={handleSave}>
          {editingShow ? "Update" : "Save"}
        </Button>
      </Modal>
    </div>
  );
};

export default Shows;
