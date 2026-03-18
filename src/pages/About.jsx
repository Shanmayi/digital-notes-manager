function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>
      <p style={styles.text}>
        Digital Notes Manager is a modern digital workspace designed to help users
        organize ideas, manage content, and write beautifully structured notes.
      </p>
      <p style={styles.text}>
        Our goal is to provide a rich text editing experience with
        customizable themes, file uploads, and secure authentication —
        all in one seamless platform.
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "80px 60px",
    background: "linear-gradient(135deg, #dbeafe, #e9d5ff, #c7d2fe)",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
    color: "#0f172a",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.7",
    maxWidth: "800px",
    marginBottom: "20px",
    color: "#334155",
  },
};

export default About;
