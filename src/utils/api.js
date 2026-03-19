const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://digital-notes-manager.onrender.com";

export default BASE_URL;