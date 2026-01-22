import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { showSuccess, showError } from "../../utils/toast";
import { loginUser } from "../../api/auth.api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      showError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email: form.email,
        password: form.password
      });

      localStorage.setItem("CinemaHub-token", res.token);
      localStorage.setItem("CinemaHub-name", res.name);
      localStorage.setItem("CinemaHub-role", res.role);

      showSuccess("Login successful");
      const roleRedirectMap = {
        SUPER_ADMIN: "/super-admin",
        THEATER_MANAGER: "/theater-manager",
        STAFF: "/staff",
        USER: "/customer"
      };

      navigate(roleRedirectMap[res.role]);

    } catch (err) {
      showError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-soft)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px"
      }}
    >
      <Card className="card--fixed">
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}
        >
          {/* HEADER */}
          <div style={{ marginBottom: "8px" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "var(--font-size-page-title)",
                fontWeight: "var(--font-weight-semibold)"
              }}
            >
              Welcome Back
            </h2>
            <p
              style={{
                marginTop: "6px",
                fontSize: "var(--font-size-secondary)",
                color: "var(--text-secondary)"
              }}
            >
              Login to continue booking movies
            </p>
          </div>

          {/* EMAIL */}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(value) => handleChange("email", value)}
          />

          {/* PASSWORD */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(value) => handleChange("password", value)}
          />

          {/* FORGOT PASSWORD LINK */}
          <div
            style={{
              textAlign: "right",
              marginTop: "-6px",
              fontSize: "var(--font-size-secondary)"
            }}
          >
            <span
              onClick={() => navigate("/forgot-password")}
              style={{
                color: "var(--color-primary)",
                cursor: "pointer",
                fontWeight: "var(--font-weight-medium)"
              }}
            >
              Forgot password?
            </span>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            style={{ marginTop: "6px" }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* FOOTER */}
          <div
            style={{
              marginTop: "12px",
              fontSize: "var(--font-size-secondary)",
              textAlign: "center",
              color: "var(--text-secondary)"
            }}
          >
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "var(--color-primary)",
                cursor: "pointer",
                fontWeight: "var(--font-weight-medium)"
              }}
            >
              Register
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
