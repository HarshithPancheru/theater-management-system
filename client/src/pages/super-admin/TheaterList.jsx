import { useEffect, useState } from "react";
import {
  getTheaters,
  addTheater,
  editTheater,
   deleteTheater
} from "../../api/theater.api";

import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Badge from "../../components/Badge/Badge";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";

const initialFormState = {
  name: "",
  location: "",
  amenities: "",
  contactNumber: "",
  openingTime: "",
  closingTime: "",
  status: "ACTIVE"
};

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  /* ---------------- FETCH ---------------- */
  const fetchTheaters = async () => {
    setLoading(true);
    const res = await getTheaters();

    const enriched = (res?.data || []).map((theater) => ({
      ...theater,
      statusBadge: (
        <Badge type={theater.status === "ACTIVE" ? "success" : "warning"}>
          {theater.status}
        </Badge>
      ),
      actions: (
  <>
    <Button
      variant="secondary"
      onClick={() => handleEdit(theater)}
    >
      Update
    </Button>

    <Button
      variant="danger"
      onClick={() => handleDelete(theater._id)}
      style={{ marginLeft: "8px" }}
    >
      Delete
    </Button>
  </>
)

    }));

    setTheaters(enriched);
    setLoading(false);
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  /* ---------------- ADD ---------------- */
  const handleAdd = () => {
    setIsEdit(false);
    setSelectedTheater(null);
    setFormData(initialFormState);
    setOpen(true);
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (theater) => {
    setIsEdit(true);
    setSelectedTheater(theater);
    setFormData({
      ...theater,
      amenities: theater.amenities?.join(", ") || ""
    });
    setOpen(true);
  };

  const handleDelete = async (theaterId) => {
  if (!window.confirm("Are you sure you want to delete this theater?")) return;
  await deleteTheater(theaterId);
  fetchTheaters();
};


  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      amenities: formData.amenities
        ? formData.amenities.split(",").map((a) => a.trim())
        : []
    };

    if (isEdit) {
      await editTheater(selectedTheater._id, payload);
    } else {
      await addTheater(payload);
    }

    setOpen(false);
    fetchTheaters();
  };

  /* ---------------- TABLE ---------------- */
  const columns = [
    { key: "name", label: "Name" },
    { key: "location", label: "Location" },
    { key: "statusBadge", label: "Status" },
    { key: "actions", label: "Actions" }
  ];

  return (
    <>
      {/* ACTION BAR */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <Button onClick={handleAdd}>Add Theater</Button>
      </div>

      <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
        Theater List
      </h2>

      {loading ? (
        <Loader />
      ) : theaters.length === 0 ? (
        <EmptyState message="No theaters found" />
      ) : (
        <Table columns={columns} data={theaters} />
      )}

      {/* MODAL */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={isEdit ? "Update Theater" : "Add Theater"}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            value={formData.name}
            onChange={(val) => setFormData(p => ({ ...p, name: val }))}
            required
          />

          <Input
            label="Location"
            value={formData.location}
            onChange={(val) => setFormData(p => ({ ...p, location: val }))}
            required
          />

          <Input
            label="Amenities"
            value={formData.amenities}
            onChange={(val) => setFormData(p => ({ ...p, amenities: val }))}
          />

          <Input
            label="Contact Number"
            value={formData.contactNumber}
            onChange={(val) => setFormData(p => ({ ...p, contactNumber: val }))}
          />

          <Input
            type="time"
            label="Opening Time"
            value={formData.openingTime}
            onChange={(val) => setFormData(p => ({ ...p, openingTime: val }))}
          />

          <Input
            type="time"
            label="Closing Time"
            value={formData.closingTime}
            onChange={(val) => setFormData(p => ({ ...p, closingTime: val }))}
          />

          {/* STATUS */}
          <div style={{ marginTop: "12px" }}>
            <label>Status</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="ACTIVE"
                  checked={formData.status === "ACTIVE"}
                  onChange={() => setFormData(p => ({ ...p, status: "ACTIVE" }))}
                /> Active
              </label>
              <label style={{ marginLeft: "16px" }}>
                <input
                  type="radio"
                  value="INACTIVE"
                  checked={formData.status === "INACTIVE"}
                  onChange={() => setFormData(p => ({ ...p, status: "INACTIVE" }))}
                /> Inactive
              </label>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", gap: "8px" }}>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Update Theater" : "Add Theater"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default TheaterList;
