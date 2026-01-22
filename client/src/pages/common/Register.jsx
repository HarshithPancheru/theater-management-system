import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { showSuccess, showError } from "../../utils/toast";
import { registerUser } from "../../api/auth.api";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (!form.name || !form.email || !form.password) {
            showError("All fields are required");
            return;
        }

        if (form.password.length < 6) {
            showError("Password must be at least 6 characters");
            return;
        }

        if (form.password !== form.confirmPassword) {
            showError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            await registerUser({
                name: form.name,
                email: form.email,
                password: form.password
            });

            showSuccess("Account created successfully");
            navigate("/login");
        } catch (err) {
            showError(err?.response?.data?.message || "Registration failed");
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
                            Create Account
                        </h2>
                        <p
                            style={{
                                marginTop: "6px",
                                fontSize: "var(--font-size-secondary)",
                                color: "var(--text-secondary)"
                            }}
                        >
                            Sign up to book movies and manage your tickets
                        </p>
                    </div>

                    <Input
                        label="Full Name"
                        name="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={(value) => handleChange("name", value)}
                    />

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        value={form.email}
                        onChange={(value) => handleChange("email", value)}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        name="password"
                        value={form.password}
                        onChange={(value) => handleChange("password", value)}
                    />

                    <Input
                        label="Confirm Password"
                        placeholder="Re-enter password"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={(value) => handleChange("confirmPassword", value)}
                    />


                    {/* SUBMIT */}
                    <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        style={{ marginTop: "8px" }}
                    >
                        {loading ? "Creating account..." : "Register"}
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
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            style={{
                                color: "var(--color-primary)",
                                cursor: "pointer",
                                fontWeight: "var(--font-weight-medium)"
                            }}
                        >
                            Login
                        </span>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Register;
