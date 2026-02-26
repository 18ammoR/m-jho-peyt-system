import { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Stack, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!isEmail(form.email)) errs.email = "Valid email required";
    if (!form.message.trim()) errs.message = "Message is required";
    if (form.message.trim().length < 10) errs.message = "Message should be at least 10 characters";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        Thank you! Your message has been sent.
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>

      {serverError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <TextField
            name="name"
            label="Full Name"
            fullWidth
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name || " "}
            disabled={submitting}
          />

          <TextField
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email || " "}
            disabled={submitting}
          />

          <TextField
            name="message"
            label="Message"
            multiline
            rows={4}
            fullWidth
            value={form.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message || " "}
            disabled={submitting}
          />

          <Button type="submit" variant="contained" size="large" endIcon={<SendIcon />} disabled={submitting}>
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}