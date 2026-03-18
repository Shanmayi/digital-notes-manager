import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AuthModal({ isOpen, onClose, type, setType }) {
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  if (!isOpen) return null;

  /* ---------- CLEAR FORM ---------- */
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAgree(false);
    setError("");
    setSuccess("");

  };

  /* ---------- SUBMIT HANDLER ---------- */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      /* ===== SIGNUP ===== */
if (type === "signup") {
  if (!name || !email || !password) {
    alert("Please fill all fields");
    setLoading(false);
    return;
  }

if (!agree) {
  setError("Please agree to Terms & Conditions");
  setLoading(false);
  return;
}

  const res = await fetch(
    "https://digital-notes-manager.onrender.com/api/auth/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
  setError(data.message || "Account with this email already exists");
  setLoading(false);
  return;
}

  setSuccess("Account created successfully ✓");
  setType("login");
  setLoading(false);
  return; // ⭐ important
}

      /* ===== LOGIN ===== */
      if (type === "login") {
        const res = await fetch(
          "https://digital-notes-manager.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError("Invalid email or password");
          setLoading(false);
          return;
        }

        // ✅ store auth data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      /* ✅ RESET + NAVIGATE */
      resetForm();
      onClose();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div style={styles.overlay}>
    <div style={styles.modal}>

      <div style={styles.modalAccent}></div>

      <button style={styles.closeBtn} onClick={onClose}>×</button>

        <h2 style={styles.logo}>Digital Notes Manager</h2>

        <h3 style={styles.heading}>
          {type === "login"
            ? "Welcome back 👋"
            : "Create your account"}
        </h3>

        {type === "signup" && (
  <div style={styles.inputWrapper}>
    <span style={styles.inputIcon}>👤</span>
    <input
      placeholder="Full Name"
      style={{
        ...styles.input,
        border: error && !name ? "1px solid #ef4444" : "1px solid #e2e8f0"
      }}
      value={name}
      onChange={(e) => {
        setName(e.target.value);
        setError("");
      }}
    />
  </div>
)}

       <div style={styles.inputWrapper}>
  <span style={styles.inputIcon}>📧</span>
  <input
    placeholder="Email Address"
    style={{
      ...styles.input,
      border: error && !email ? "1px solid #ef4444" : "1px solid #e2e8f0"
    }}
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
      setError("");
    }}
  />
</div>

        <div style={styles.inputWrapper}>
  <span style={styles.inputIcon}>🔒</span>
  <input
    type="password"
    placeholder="Password"
    style={{
      ...styles.input,
      border: error && !password ? "1px solid #ef4444" : "1px solid #e2e8f0"
    }}
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
      setError("");
    }}
  />
</div>
              {error && (
        <p style={styles.errorText}>
          {error}
        </p>
      )}
      {success && (
  <p style={styles.successText}>
    {success}
  </p>
)}

        {type === "login" && (
          <p
  style={styles.forgot}
  onClick={() =>
    alert("Password reset feature will be available soon.")
    }
  >
    Forgot Password?
  </p>
        )}

        {type === "signup" && (
          <label style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={agree}
              onChange={() => {
                setAgree(!agree);
                setError("");
              }}
            />

            I agree to the{" "}
            <span
  style={{ color: "#3f38c2", cursor: "pointer", fontWeight: 500 }}
  onClick={() => setShowTerms(!showTerms)}
>
  Terms & Conditions
</span>
          </label> 
        )}
        {showTerms && (
          <p style={styles.termsBox}>
            By creating an account you agree to use Digital Notes Manager responsibly.
            Your notes remain private and securely stored.
          </p>
        )}

        <button
          style={styles.primaryBtn}
          onMouseEnter={(e)=> e.target.style.opacity="0.9"}
          onMouseLeave={(e)=> e.target.style.opacity="1"}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : type === "login"
            ? "Login"
            : "Create Account"}
        </button>
          <p style={styles.switchText}>
            {type === "login" ? (
              <>
                Don't have an account?{" "}
                <span
                  style={styles.switchLink}
                  onClick={() => {
                    resetForm();
                    setType("signup");
                  }}
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  style={styles.switchLink}
                  onClick={() => {
                    resetForm();
                    setType("login");
                  }}
                >
                  Login
                </span>
              </>
            )}
          </p>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15,23,42,0.55)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999999,
    overflowY: "hidden",
    padding: "20px"
  },
termsBox:{
  fontSize:"13px",
  color:"#475569",
  background:"#f1f5f9",
  padding:"10px",
  borderRadius:"8px",
  marginTop:"6px"
},
  modal: {
    width: "420px",
    padding: "42px",
    borderRadius: "20px",
    //background: "rgba(255,255,255,0.95)",
    background: "linear-gradient(180deg,#ffffff,#f8fafc)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "relative",
    transform: "scale(1)",
    animation: "modalPop 0.25s ease",
    zIndex: 1000000,
    
  },

  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "16px",
    border: "none",
    background: "none",
    fontSize: "22px",
    cursor: "pointer",
  },

  logo: {
    textAlign: "center",
    color: "#4f46e5",
  },

  heading: {
    textAlign: "center",
    color: "#1e293b",
  },
input:{
  padding:"14px 14px 14px 36px",
  borderRadius:"10px",
  border:"1px solid #e2e8f0",
  fontSize:"14px",
  outline:"none",
  width:"100%"
},
inputWrapper:{
  position:"relative",
  display:"flex",
  alignItems:"center"
},

inputIcon:{
  position:"absolute",
  left:"12px",
  fontSize:"14px",
  opacity:0.6
},

  forgot: {
    fontSize: "13px",
    color: "#4f46e5",
    textAlign: "right",
    cursor: "pointer",
  },

  checkboxRow: {
    fontSize: "14px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  modalAccent:{
  position:"absolute",
  top:0,
  left:0,
  right:0,
  height:"4px",
  background:"linear-gradient(90deg,#4f46e5,#6366f1)",
  borderTopLeftRadius:"20px",
  borderTopRightRadius:"20px"
},
  primaryBtn:{
  padding:"14px",
  borderRadius:"10px",
  border:"none",
  background:"linear-gradient(135deg,#4f46e5,#6366f1)",
  color:"white",
  fontWeight:"600",
  cursor:"pointer",
  transition:"0.25s",
  boxShadow:"0 6px 18px rgba(79,70,229,0.25)"
},
errorText:{
  color:"#ef4444",
  fontSize:"14px",
  textAlign:"center",
  marginTop:"-5px"
},
successText:{
  color:"#16a34a",
  fontSize:"14px",
  textAlign:"center",
  marginTop:"-5px"
},
switchLink:{
  color:"#4f46e5",
  fontWeight:"600",
  cursor:"pointer"
},
switchText:{
  textAlign:"center",
  fontSize:"16px",
  color:"#475569",
  marginTop:"6px"
},
modalPop: {
  from: { transform: "scale(0.9)", opacity: 0 },
  to: { transform: "scale(1)", opacity: 1 }
}
};

export default AuthModal;