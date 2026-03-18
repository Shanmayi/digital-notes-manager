import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Settings() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // hover state
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const cardStyle = {
    ...styles.card,
    backgroundColor: darkMode ? "#1e293b" : "white",
    color: darkMode ? "#f1f5f9" : "#0f172a"
  };

  return (
    <div
      style={{
        ...styles.page,
        backgroundColor: darkMode ? "#0f172a" : "#f8fafc"
      }}
    >
      <div style={styles.container}>

        <h1 style={{
          ...styles.title,
          color: darkMode ? "#f1f5f9" : "#0f172a"
        }}>
          Settings
        </h1>


        {/* Appearance */}
        <div
          style={{
            ...cardStyle,
            ...(hoveredCard === "appearance" ? styles.cardHover : {})
          }}
          onMouseEnter={() => setHoveredCard("appearance")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div style={styles.settingRow}>
            <div>
              <h3 style={styles.sectionTitle}>🎨 Appearance</h3>
              <p style={{ ...styles.desc, color: darkMode ? "#cbd5f5" : "#64748b" }}>
                Switch between light and dark interface theme.
              </p>
            </div>

            <div
              style={{
                ...styles.toggle,
                backgroundColor: darkMode ? "#4f46e5" : "#cbd5f5"
              }}
              onClick={() => setDarkMode(!darkMode)}
            >
              <div
                style={{
                  ...styles.toggleCircle,
                  transform: darkMode
                    ? "translateX(22px)"
                    : "translateX(2px)"
                }}
              />
            </div>
          </div>
        </div>


        {/* Account Management */}
        <div
          style={{
            ...cardStyle,
            ...(hoveredCard === "account" ? styles.cardHover : {})
          }}
          onMouseEnter={() => setHoveredCard("account")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3 style={styles.sectionTitle}>⚙ Account Management</h3>

          <p style={{ ...styles.desc, color: darkMode ? "#cbd5f5" : "#64748b" }}>
            Permanently remove your account and all notes.
          </p>

          <button
            style={styles.deleteBtn}
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </button>
        </div>


        {/* Help */}
        <div
          style={{
            ...cardStyle,
            ...(hoveredCard === "help" ? styles.cardHover : {})
          }}
          onMouseEnter={() => setHoveredCard("help")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3 style={{ ...styles.sectionTitle, color: darkMode ? "#f1f5f9" : "#0f172a" }}>❓ Help & Support</h3>

          {[
            {
              id: "help1",
              q: "How do I create a note?",
              a: "Go to your Dashboard and click 'Create Note' from the sidebar."
            },
            {
              id: "help2",
              q: "Can I customize note themes?",
              a: "Yes. You can change background colors and formatting in the editor."
            },
            {
              id: "help3",
              q: "Is my data secure?",
              a: "Authentication and secure backend storage ensure your notes remain private."
            }
          ].map(item => (
            <div key={item.id} style={styles.accordionItem}>

              <div
                style={styles.accordionHeader}
                onClick={() =>
                  setOpenSection(openSection === item.id ? null : item.id)
                }
              >
                {item.q}

                <span style={styles.arrow}>
                  {openSection === item.id ? "▴" : "▾"}
                </span>

              </div>

              {openSection === item.id && (
                <p style={{ ...styles.accordionContent, color: darkMode ? "#cbd5f5" : "#64748b" }}>{item.a}</p>
              )}

            </div>
          ))}
        </div>


        {/* Contact */}
        <div
          style={{
            ...cardStyle,
            ...(hoveredCard === "contact" ? styles.cardHover : {})
          }}
          onMouseEnter={() => setHoveredCard("contact")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3 style={styles.sectionTitle}>📞 Contact</h3>

          <p style={{ ...styles.desc, color: darkMode ? "#cbd5f5" : "#64748b" }}>
            If you need help, feel free to contact us.
          </p>

          <p style={styles.info}>
            📧 Email:
            <a
              href="mailto:support@digitalnotesmanager.com"
              style={styles.email}
            >
              support@digitalnotesmanager.com
            </a>
          </p>

          <p style={styles.info}>📞 Phone: +91 98765 43210</p>
          <p style={styles.info}>📍 Location: India</p>
        </div>


        {/* About */}
        <div
          style={{
            ...cardStyle,
            ...(hoveredCard === "about" ? styles.cardHover : {})
          }}
          onMouseEnter={() => setHoveredCard("about")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3 style={styles.sectionTitle}>ℹ️ About Digital Notes Manager</h3>

          <p style={{ ...styles.desc, color: darkMode ? "#cbd5f5" : "#64748b" }}>
            Digital Notes Manager is a modern workspace designed
            for organizing ideas and managing notes efficiently.
          </p>

          <p style={{ ...styles.desc, color: darkMode ? "#cbd5f5" : "#64748b" }}>
            Built using the MERN stack (MongoDB, Express,
            React, Node.js).
          </p>

          <p style={{ ...styles.desc, color: darkMode ? "#cbd5f5" : "#64748b" }}>Version 1.0</p>
        </div>

        <p
  style={{
    ...styles.backLink,
    color: darkMode ? "#cbd5f5" : "#0c0a2d"
  }}
  onMouseEnter={(e)=> e.target.style.opacity = "0.7"}
  onMouseLeave={(e)=> e.target.style.opacity = "1"}
  onClick={() => navigate("/dashboard")}
>
  <b>← Back to Dashboard</b>
</p>

        <p style={styles.version}>
          Digital Notes Manager • Version 1.0
        </p>

      </div>


      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>

            <h3>Delete Account</h3>

            <p style={styles.deleteWarning}>
              Deleting your account will permanently remove all your notes,
              starred items, and personal data associated with this account.
            </p>

            <p style={styles.deleteConfirmText}>
              Type <b>DELETE</b> below to confirm this action.
            </p>

            <input
              style={styles.input}
              value={deleteText}
              onChange={(e)=>setDeleteText(e.target.value)}
            />

            <div style={styles.modalActions}>

              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteText("");
                }}
              >
                Cancel
              </button>

              <button
                style={{
                  ...styles.confirmDeleteBtn,
                  opacity: deleteText === "DELETE" ? 1 : 0.5
                }}
                disabled={deleteText !== "DELETE"}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  setShowDeleteConfirm(false);
                  setDeleteSuccess(true);
                }}
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

      {deleteSuccess && (
                  <div style={styles.modalOverlay}>
                    <div style={styles.modalBox}>

                      <h3>Account Deleted</h3>

                      <p style={{marginTop:"10px"}}>
                        Your account has been successfully deleted.
                      </p>

                      <button
                        style={{
                          ...styles.confirmDeleteBtn,
                          marginTop:"20px",
                          backgroundColor:"#16a34a"
                        }}
                        onClick={() => navigate("/")}
                      >
                        Return to Home
                      </button>
                    </div>
                  </div>
                )}

    </div>
  );
}


const styles = {

  page:{
    minHeight:"100vh",
    padding:"50px"
  },

  version:{
    textAlign:"center",
    marginTop:"15px",
    fontSize:"15px",
    color:"#58616e"
  },

  backLink:{
  marginTop:"20px",
  textAlign:"center",
  cursor:"pointer",
  fontWeight:"500",
  fontSize:"17px",
  transition:"0.2s"
},

  container:{
    maxWidth:"900px",
    margin:"0 auto"
  },
  deleteWarning:{
  marginTop:"10px",
  fontSize:"14px",
  lineHeight:"1.5",
  color:"#475569"
},

deleteConfirmText:{
  marginTop:"10px",
  fontSize:"14px",
  fontWeight:"500"
},

  title:{
    fontSize:"34px",
    marginBottom:"35px"
  },

  card:{
    padding:"28px",
    borderRadius:"14px",
    marginBottom:"28px",
    boxShadow:"0 10px 30px rgba(0,0,0,0.08)",
    transition:"0.2s"
  },

  cardHover:{
    transform:"translateY(-4px)",
    boxShadow:"0 14px 35px rgba(0,0,0,0.12)"
  },

  sectionTitle:{
    fontSize:"20px"
  },

  desc:{
  marginTop:"10px",
  fontSize:"16px",
  lineHeight:"1.6"
},

  settingRow:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  },

  toggle:{
    width:"46px",
    height:"24px",
    borderRadius:"20px",
    display:"flex",
    alignItems:"center",
    cursor:"pointer",
    padding:"2px"
  },

  toggleCircle:{
    width:"20px",
    height:"20px",
    borderRadius:"50%",
    backgroundColor:"white",
    transition:"0.2s"
  },

  deleteBtn:{
    marginTop:"15px",
    padding:"12px 20px",
    borderRadius:"6px",
    border:"none",
    backgroundColor:"#ef4444",
    color:"white",
    cursor:"pointer"
  },

  accordionItem:{
    marginTop:"18px"
  },

  accordionHeader:{
    fontWeight:"600",
    fontSize:"16px",
    display:"flex",
    justifyContent:"space-between",
    cursor:"pointer"
  },

  accordionContent:{
  marginTop:"10px",
  fontSize:"16px",
  lineHeight:"1.6"
},

  arrow:{
    fontSize:"14px",
    transition:"0.2s"
  },

  info:{
    marginTop:"10px",
    fontSize:"16px"
  },

  email:{
    marginLeft:"6px",
    color:"#4f46e5",
    textDecoration:"none",
    fontWeight:"500"
  },

  modalOverlay:{
    position:"fixed",
    top:0,
    left:0,
    width:"100%",
    height:"100%",
    backgroundColor:"rgba(0,0,0,0.45)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  modalBox:{
    backgroundColor:"white",
    padding:"30px",
    borderRadius:"12px",
    width:"340px",
    textAlign:"center"
  },

  input:{
    marginTop:"12px",
    padding:"8px",
    width:"100%",
    border:"1px solid #ddd",
    borderRadius:"6px"
  },

  modalActions:{
    display:"flex",
    justifyContent:"space-between",
    marginTop:"20px"
  },

  cancelBtn:{
    padding:"8px 16px",
    borderRadius:"6px",
    border:"none",
    backgroundColor:"#e2e8f0",
    cursor:"pointer"
  },

  confirmDeleteBtn:{
    padding:"8px 16px",
    borderRadius:"6px",
    border:"none",
    backgroundColor:"#ef4444",
    color:"white",
    cursor:"pointer"
  }

};

export default Settings;