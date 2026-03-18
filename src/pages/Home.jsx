import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("login");

  const navigate = useNavigate();

  const openLogin = () => {
    setType("login");
    setIsOpen(true);
  };

  const openSignup = () => {
    setType("signup");
    setIsOpen(true);
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Digital Notes Manager</h2>
        <div>
          <button style={styles.loginBtn} onClick={openLogin}>
            Login
          </button>
          <button style={styles.signupBtn} onClick={openSignup}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
  <h1 style={styles.title}>
    Your Ideas. Organized Beautifully.
  </h1>

  <p style={styles.problemLine}>
    A modern workspace designed for students and creators.
  </p>

  <p style={styles.subtitle}>
    Write, organize and customize your notes with rich text editing,
    themes, images and powerful note management tools.
  </p>

</section>

      {/* Features Section */}
      <section style={styles.features}
      onMouseEnter={(e)=>{
        e.currentTarget.style.transform="translateY(-6px)"
      }}
      onMouseLeave={(e)=>{
        e.currentTarget.style.transform="translateY(0)"
      }}
      >
        <div style={styles.card}
        onMouseEnter={(e)=>{
          e.currentTarget.style.transform="translateY(-6px)"
        }}
        onMouseLeave={(e)=>{
          e.currentTarget.style.transform="translateY(0)"
        }}
        >
          <h3>📝 Rich Text Editor</h3>
          <p>
            Format text like a Word document — bold, fonts, sizes,
            highlights, alignment, and more.
          </p>
        </div>

        <div style={styles.card}
        onMouseEnter={(e)=>{
          e.currentTarget.style.transform="translateY(-6px)"
        }}
        onMouseLeave={(e)=>{
          e.currentTarget.style.transform="translateY(0)"
        }}
        >
          <h3>🎨 Custom Themes</h3>
          <p>
            Personalize each note with background colors, themes,
            and dark mode for a better writing experience.
          </p>
        </div>

        <div style={styles.card}
        onMouseEnter={(e)=>{
          e.currentTarget.style.transform="translateY(-6px)"
        }}
        onMouseLeave={(e)=>{
          e.currentTarget.style.transform="translateY(0)"
        }}
        >

          <h3>🖼 Insert Images</h3>
          <p>
            Add images directly inside notes using the rich text editor
            to enhance visual documentation.
          </p>
        </div>

        <div style={styles.card}
        onMouseEnter={(e)=>{
          e.currentTarget.style.transform="translateY(-6px)"
        }}
        onMouseLeave={(e)=>{
          e.currentTarget.style.transform="translateY(0)"
        }}
        >

          <h3>🔒 Secure & Private</h3>
          <p>
            User authentication and secure storage ensure your
            content remains safe and accessible.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div>
          <h4>Digital Notes Manager</h4>
          <p>© 2026 Digital Notes Manager. All rights reserved.</p>
        </div>

        <div style={styles.footerLinks}>
  <p style={styles.footerItem}>Privacy</p>
  <p style={styles.footerItem}>Terms of Use</p>
  <p
    style={styles.footerItem}
    onClick={() => navigate("/feedback")}
  >
    Feedback
  </p>
</div>
      </footer>

      <AuthModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={type}
        setType={setType}
      />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0e7ff, #ede9fe, #cffafe)",
    display: "flex",
    flexDirection: "column",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",
  },
  heroBtn:{
  marginTop:"30px",
  padding:"14px 28px",
  borderRadius:"10px",
  border:"none",
  background:"#4f46e5",
  color:"white",
  fontWeight:"600",
  fontSize:"16px",
  cursor:"pointer",
  transition:"0.2s"
},
  card: {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  transition: "0.25s",
  cursor: "pointer"
},
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1e293b",
  },

  loginBtn: {
  marginRight: "15px",
  padding: "9px 18px",
  backgroundColor: "white",
  border: "1px solid #6366f1",
  color: "#4f46e5",
  borderRadius: "8px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "0.2s",
},

signupBtn: {
  padding: "9px 20px",
  background: "linear-gradient(135deg,#4f46e5,#6366f1)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.2s",
},

  hero: {
    textAlign: "center",
    padding: "70px 20px 15px",
  },

  title: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "24px",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "700px",
    margin: "0 auto",
    color: "#475569",
    lineHeight: "1.6",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    padding: "60px",
  },

  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    transition: "0.3s",
  },

  footer: {
    marginTop: "auto",
    padding: "40px 60px",
    backgroundColor: "#1e293b",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
  },

  footerLinks: {
    display: "flex",
    gap: "30px",
  },

  footerItem: {
    cursor: "pointer",
    opacity: 0.8,
  },
  problemLine: {
  marginTop: "10px",
  color: "#6366f1",
  fontWeight: "500",
  fontSize: "19px",
},
};

export default Home;
