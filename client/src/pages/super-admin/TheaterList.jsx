import { useEffect, useState } from "react";
import {
  getTheaters,
  addTheater,
  editTheater
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
        <Button
          variant="secondary"
          onClick={() => handleEdit(theater)}
        >
          Update
        </Button>
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

  /* ---------------- CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          <Input name="name" label="Name" value={formData.name} onChange={handleChange} required />
          <Input name="location" label="Location" value={formData.location} onChange={handleChange} required />
          <Input name="amenities" label="Amenities" value={formData.amenities} onChange={handleChange} />
          <Input name="contactNumber" label="Contact Number" value={formData.contactNumber} onChange={handleChange} />
          <Input type="time" name="openingTime" label="Opening Time" value={formData.openingTime} onChange={handleChange} />
          <Input type="time" name="closingTime" label="Closing Time" value={formData.closingTime} onChange={handleChange} />

          <div style={{ marginTop: "12px" }}>
            <label>Status</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="ACTIVE"
                  checked={formData.status === "ACTIVE"}
                  onChange={handleChange}
                /> Active
              </label>
              <label style={{ marginLeft: "16px" }}>
                <input
                  type="radio"
                  name="status"
                  value="INACTIVE"
                  checked={formData.status === "INACTIVE"}
                  onChange={handleChange}
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
