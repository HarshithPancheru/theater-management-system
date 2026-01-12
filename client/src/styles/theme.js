export const theme = {
  colors: {
    // Backgrounds
    background: {
      main: "#FFFFFF",
      soft: "#F5F6FA",
      card: "#FFFFFF",
      sidebarGradient: "linear-gradient(180deg, #7C3AED 0%, #6D28D9 100%)",
    },

    // Primary & Secondary
    primary: {
      main: "#7C3AED",
      hover: "#6D28D9",
      accent: "#9333EA",
    },

    // Text
    text: {
      primary: "#111827",
      secondary: "#6B7280",
      sidebar: "#FFFFFF",
      inactive: "#EDE9FE",
    },

    // Borders
    border: {
      light: "#E5E7EB",
      focus: "#7C3AED",
      error: "#EF4444",
    },

    // Status / Messages
    status: {
      success: "#22C55E",
      warning: "#F97316",
      error: "#EF4444",
      info: "#7C3AED",
      disabled: "#CBD5E1",
    },

    // Buttons
    button: {
      primary: "#7C3AED",
      primaryHover: "#6D28D9",
      secondary: "#E5E7EB",
      danger: "#EF4444",
    },

    // Seats (Customer UI)
    seat: {
      available: "#E5E7EB",
      selected: "#7C3AED",
      booked: "#EF4444",
      premium: "#9333EA",
      disabled: "#9CA3AF",
    },
  },

  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",

    size: {
      pageTitle: "24px",
      sectionHeading: "18px",
      cardTitle: "16px",
      normal: "14px",
      secondary: "13px",
      label: "12px",
      helper: "12px",
    },

    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },

  components: {
    button: {
      height: "40px",
      padding: "0 16px",
      fontSize: "14px",
      borderRadius: "8px",
    },

    input: {
      height: "40px",
      padding: "0 12px",
      borderRadius: "8px",
    },
  },
};
