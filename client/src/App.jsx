import "./App.css";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />
       <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          top: 72, // header height + breathing space
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-family)",
            fontSize: "15px",              // ⬆ increased
            fontWeight: "500",             // ⬆ medium
            padding: "12px 16px",          // ⬆ more spacious
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          },

          success: {
            iconTheme: {
              primary: "var(--status-success)",
              secondary: "var(--bg-card)",
            },
          },

          error: {
            iconTheme: {
              primary: "var(--status-error)",
              secondary: "var(--bg-card)",
            },
          },

          loading: {
            iconTheme: {
              primary: "var(--color-primary)",
              secondary: "var(--bg-card)",
            },
          },
        }}
      />
    </>
  );
}

export default App;
