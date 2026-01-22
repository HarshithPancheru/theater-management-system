import React, { useState } from "react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { showSuccess, showError } from "../../utils/toast";
import { forgotPassword } from "../../api/auth.api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showError("Email is required");
      return;
    }

    try {
      setLoading(true);
      await forgotPassword({ email });
      showSuccess("Reset link sent to your email");
    } catch {
      showError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "var(--bg-soft)" }}>
      <Card className="card--fixed">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2>Forgot Password</h2>

          <Input
            label="Email"
            value={email}
            onChange={(v) => setEmail(v)}
            placeholder="Enter your email"
          />

          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
