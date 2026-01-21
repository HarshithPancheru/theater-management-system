// // src/pages/super-admin/Shows.jsx
// import React, { useEffect, useState } from "react";
// import Card from "../../components/Card/Card";
// import Button from "../../components/Button/Button";
// import EmptyState from "../../components/EmptyState/EmptyState";
// import Modal from "../../components/Modal/Modal";
// import Input from "../../components/Input/Input";
// import Loader from "../../components/Loader/Loader";
// import { toast, showSuccess, showError, showLoading } from "../../utils/toast";

// import {
//   getShowsByMovie,
//   createShow,
//   updateShow,
//   deleteShow,
// } from "../../api/show.api";

// const Shows = ({ movieId }) => {
//   const [shows, setShows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingShow, setEditingShow] = useState(null);
//   const [formData, setFormData] = useState({
//     screenId: "",
//     date: "",
//     startTime: "",
//     priceMultiplier: 1,
//   });

//   const fetchShows = async () => {
//     setLoading(true);
//     try {
//       const res = await getShowsByMovie(movieId);
//       setShows(res.data.data || []);
//     } catch {
//       showError("Failed to fetch shows");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchShows();
//   }, [movieId]);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = async () => {
//     const toastId = showLoading("Saving show...");
//     try {
//       let res;
//       if (editingShow) {
//         res = await updateShow(editingShow._id, {
//           ...formData,
//           movieId,
//         });
//       } else {
//         res = await createShow({
//           ...formData,
//           movieId,
//         });
//       }

//       if (res.data.success) {
//         showSuccess(editingShow ? "Show updated successfully" : "Show created successfully");
//         setModalOpen(false);
//         fetchShows();
//       } else {
//         showError(res.data.error || "Failed to save show");
//       }
//     } catch {
//       showError("Failed to save show");
//     } finally {
//       toast.dismiss(toastId);
//     }
//   };

//   const handleDelete = async (id) => {
//     const toastId = showLoading("Deleting show...");
//     try {
//       await deleteShow(id);
//       showSuccess("Show deleted successfully");
//       fetchShows();
//     } catch {
//       showError("Failed to delete show");
//     } finally {
//       toast.dismiss(toastId);
//     }
//   };

//   return (
//     <div>
//       <h1 className="page-title">Shows</h1>
//       {loading ? (
//         <Loader />
//       ) : shows.length === 0 ? (
//         <EmptyState
//           title="No Shows Found"
//           description="Add a show to get started."
//           actionLabel="Add Show"
//           onAction={() => {
//             setEditingShow(null);
//             setFormData({
//               screenId: "",
//               date: "",
//               startTime: "",
//               priceMultiplier: 1,
//             });
//             setModalOpen(true);
//           }}
//         />
//       ) : (
//         <>
//           <Button
//             onClick={() => {
//               setEditingShow(null);
//               setFormData({
//                 screenId: "",
//                 date: "",
//                 startTime: "",
//                 priceMultiplier: 1,
//               });
//               setModalOpen(true);
//             }}
//           >
//             Add Show
//           </Button>

//           <div className="card-grid">
//             {shows.map((show) => (
//               <Card key={show._id} size="md">
//                 <h3>{show.movieId?.title}</h3>
//                 <p><strong>Screen:</strong> {show.screenId?.name}</p>
//                 <p><strong>Date:</strong> {new Date(show.date).toLocaleDateString()}</p>
//                 <p><strong>Start Time:</strong> {show.startTime}</p>
//                 <p><strong>Price Multiplier:</strong> {show.priceMultiplier}</p>
//                 <div className="card-actions">
//                   <Button
//                     size="sm"
//                     onClick={() => {
//                       setEditingShow(show);
//                       setFormData({
//                         screenId: show.screenId?._id || "",
//                         date: show.date?.split("T")[0] || "",
//                         startTime: show.startTime,
//                         priceMultiplier: show.priceMultiplier,
//                       });
//                       setModalOpen(true);
//                     }}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="danger"
//                     onClick={() => handleDelete(show._id)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </>
//       )}

//       <Modal
//         open={modalOpen}
//         title={editingShow ? "Edit Show" : "Add Show"}
//         onClose={() => setModalOpen(false)}
//       >
//         <div className="form-group">
//           <label>Screen ID</label>
//           <Input
//             value={formData.screenId}
//             onChange={(val) => handleChange("screenId", val)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Date</label>
//           <Input
//             type="date"
//             value={formData.date}
//             onChange={(val) => handleChange("date", val)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Start Time</label>
//           <Input
//             type="time"
//             value={formData.startTime}
//             onChange={(val) => handleChange("startTime", val)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Price Multiplier</label>
//           <Input
//             type="number"
//             value={formData.priceMultiplier}
//             onChange={(val) => handleChange("priceMultiplier", val)}
//           />
//         </div>
//         <Button onClick={handleSave}>{editingShow ? "Update" : "Save"}</Button>
//       </Modal>

//       <style jsx>{`
//         .card-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//           gap: 20px;
//           margin-top: 20px;
//         }
//         .card-actions {
//           display: flex;
//           justify-content: space-between;
//           margin-top: 10px;
//         }
//         .form-group {
//           margin-bottom: 16px;
//           display: flex;
//           flex-direction: column;
//         }
//         .form-group label {
//           margin-bottom: 6px;
//           font-weight: 500;
//           color: #374151;
//         }
//         .form-group input {
//           padding: 8px;
//           border: 1px solid #d1d5db;
//           border-radius: 6px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Shows;
