import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { showSuccess, showError } from "../../utils/toast";
import { resetPassword } from "../../api/auth.api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      showError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, { password });
      showSuccess("Password reset successful");
      navigate("/login");
    } catch {
      showError("Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "var(--bg-soft)" }}>
      <Card className="card--fixed">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2>Reset Password</h2>

          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(v) => setPassword(v)}
            placeholder="Enter new password"
          />

          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
