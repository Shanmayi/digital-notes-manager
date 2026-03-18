import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthModal from "../components/AuthModal";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notes, setNotes] = useState([]);
  const [trash, setTrash] = useState([]);
  const [activeSection, setActiveSection] = useState("notes");
  const [menuOpen, setMenuOpen] = useState(null);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark");
  const user = JSON.parse(localStorage.getItem("user"));
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState(user?.image || null);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [hoveredCard, setHoveredCard] = useState(null);
  const [createHover, setCreateHover] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState("login");


  /* ---------- LOAD NOTES ---------- */
useEffect(() => {
  const fetchNotes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const url =
        activeSection === "trash"
          ? `http://localhost:5000/api/notes/trash/all/${user.id}`
          : `http://localhost:5000/api/notes/user/${user.id}`;

      const res = await fetch(url);
      const data = await res.json();
      console.log("Fetched Notes:", data);

      if (activeSection === "trash") {
        setTrash(data);
      } else {
        setNotes(data);
      }
    } catch (err) {
      console.log("Error fetching notes:", err);
    }
  };

  fetchNotes();
}, [location, activeSection]);

  useEffect(() => {
  const handleClickOutside = (event) => {

    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuOpen(null);
    }

    if (
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

}, []);
useEffect(() => {
  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);

useEffect(() => {
  localStorage.setItem("language", language);
}, [language]);
  /* ---------- ACTIONS ---------- */

  const moveToTrash = async (id) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    await fetch(
      `http://localhost:5000/api/notes/${id}/trash`,
      { method: "PATCH" }
    );

    // ✅ reload notes from backend
    const res = await fetch(
      `http://localhost:5000/api/notes/user/${user.id}`
    );

    const data = await res.json();
    setNotes(data);

    setMenuOpen(null);
  } catch (err) {
    console.log("Trash failed:", err);
  }
};
  const restoreNote = async (id) => {
  try {
    await fetch(
      `http://localhost:5000/api/notes/${id}/restore`,
      {
        method: "PATCH",
      }
    );

    setTrash(trash.filter((note) => note._id !== id));
  } catch (err) {
    console.log("Restore failed:", err);
  }
};

  const deleteForever = async (id) => {
  try {
    await fetch(
      `http://localhost:5000/api/notes/${id}`,
      {
        method: "DELETE",
      }
    );

    setTrash(trash.filter((note) => note._id !== id));
  } catch (err) {
    console.log("Delete failed:", err);
  }
};

  const formatDate = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  /* ---------- AUTO TEXT COLOR ---------- */
const getTextColor = (bgColor) => {
  if (!bgColor) return darkMode ? "white" : "black";

  const color = bgColor.replace("#", "");

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // light background → dark text
  return brightness > 150 ? "#0f172a" : "#ffffff";
};
  /* ---------- UI ---------- */

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
      }}
    >
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Digital Notes Manager</h2>

        <button
          style={{
            ...styles.createBtn,
            backgroundColor: createHover ? "#4338ca" : "#4f46e5"
          }}
          onMouseEnter={() => setCreateHover(true)}
          onMouseLeave={() => setCreateHover(false)}
          onClick={() => navigate("/editor/new")}
        >
          + Create Note
        </button>

        <div
  style={{
    ...styles.sideItem,
    backgroundColor:
      activeSection === "notes" ? "#334155" : "transparent",
     }}
    onClick={() => setActiveSection("notes")}
    onMouseEnter={(e) => {
    if (activeSection !== "notes") {
      e.currentTarget.style.background = "#334155";
    }
  }}
  onMouseLeave={(e) => {
    if (activeSection !== "notes") {
      e.currentTarget.style.background = "transparent";
    }
  }}
>
  📝 Notes 
  </div>

<div
  style={{
    ...styles.sideItem,
    backgroundColor:
      activeSection === "favorites" ? "#334155" : "transparent",
  }}
  onClick={() => setActiveSection("favorites")}
  onMouseEnter={(e) => {
    if (activeSection !== "favorites") {
      e.currentTarget.style.background = "#334155";
    }
  }}
  onMouseLeave={(e) => {
    if (activeSection !== "favorites") {
      e.currentTarget.style.background = "transparent";
    }
  }}
>
  ⭐ Starred
</div>

<div
  style={{
    ...styles.sideItem,
    backgroundColor:
      activeSection === "trash" ? "#334155" : "transparent",
  }}
  onClick={() => setActiveSection("trash")}
  onMouseEnter={(e) => {
    if (activeSection !== "trash") {
      e.currentTarget.style.background = "#334155";
    }
  }}
  onMouseLeave={(e) => {
    if (activeSection !== "trash") {
      e.currentTarget.style.background = "transparent";
    }
  }}
>
  🗑 Trash
</div>

<div
  style={{
    ...styles.sideItem,
    backgroundColor:
      activeSection === "stats" ? "#334155" : "transparent",
  }}
  onClick={() => setActiveSection("stats")}
  onMouseEnter={(e) => {
    if (activeSection !== "stats") {
      e.currentTarget.style.background = "#334155";
    }
  }}
  onMouseLeave={(e) => {
    if (activeSection !== "stats") {
      e.currentTarget.style.background = "transparent";
    }
  }}
>
  📊 Statistics
</div>
<div
  style={styles.sideItem}
  onClick={() =>navigate("/feedback", { state: { from: "dashboard" } })}
  onMouseEnter={(e)=>e.target.style.background="#334155"}
  onMouseLeave={(e)=>e.target.style.background="transparent"}
>
  💬 Feedback
</div>

<div
  style={styles.sideItem}
  onClick={() => navigate("/settings")}
  onMouseEnter={(e)=>e.target.style.background="#334155"}
  onMouseLeave={(e)=>e.target.style.background="transparent"}
>
  ⚙ Settings
</div>
      </div>

      {/* Main */}
        <div style={styles.main}>

    <div style={styles.topBar}>
  <div></div>

  <div style={styles.rightControls}>
    
    <div
      style={styles.themeToggle}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀️" : "🌙"}
    </div>


    <div ref={profileRef} style={styles.profileWrapper}>
      <div
  style={styles.avatar}
  onClick={() => setProfileOpen(!profileOpen)}
>
  {profileImage ? (
    <img
      src={profileImage}
      alt="profile"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        objectFit: "cover"
      }}
    />
  ) : (
    "👤"
  )}
</div>

      {/* ✅ STEP 3 — ADD HERE */}
    {profileOpen && (
      <div style={styles.profilePanel}>

        <div style={styles.profileTopSection}>
        <div style={styles.profileCenter}>
          <div style={styles.bigAvatar}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
            ) : (
              "👤"
            )}
          </div>

          <div style={styles.profileTitle}>
            {user?.name}
          </div>

          <div style={styles.profileEmail}>
            {user?.email}
          </div>
        </div>
      </div>

        <div style={styles.profileDivider}></div>

        <div
          style={styles.profileItem}
          onClick={() => {
            setProfileOpen(false);
            setAuthType("signup");
            setAuthOpen(true);
          }}
        >
          + Add / Switch Account
        </div>

        <div
          style={styles.profileItem}
          onClick={() => {
            setEditProfileOpen(true); // open edit modal
          }}
        >
          ✏ Edit profile
        </div>

        <div style={styles.profileDivider}></div>

        <div
          style={styles.logoutBtn}
          onClick={(e) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/";
          }}
        >
          Logout
        </div>

      </div>
    )}
    </div>
    </div>
    
    </div>

    <h2
      style={{
        ...styles.heading,
        color: darkMode ? "#f1f5f9" : "#0f172a",
      }}
    >
      {activeSection === "notes"
  ? "📝 Your Notes"
  : activeSection === "favorites"
  ? "⭐ Starred Notes"
  : activeSection === "trash"
  ? "🗑 Trash"
  : "📊 Statistics"}
    </h2>

    {activeSection === "notes" && (
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems:"flex-start" }}>
        
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...styles.search, flex: 1 }}
        />

        <div style={styles.sortWrapper}>

  <span style={styles.sortLabel}>Sort by:</span>

  <select
    value={sortType}
    onChange={(e) => setSortType(e.target.value)}
    style={styles.sortSelect}
  >
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
    <option value="title">Title</option>
  </select>

</div>
</div>
    )}
        <div style={styles.grid}>
          {activeSection === "notes" && (
            notes.length === 0 ? (

              <div style={styles.emptyState}>
                <h2
                  style={{
                    fontSize: "30px",
                    marginBottom: "10px",
                    color: darkMode ? "#f1f5f9" : "#0f172a",
                  }}
                >
                  ✨ Your workspace is empty
                </h2>

                <p
                  style={{
                    fontSize: "20px",
                    opacity: 0.8,
                    color: darkMode ? "#cbd5f5" : "#334155",
                  }}
                >
                  Start capturing your ideas, thoughts, or plans 🚀
                </p>

                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "20px",
                    opacity: 0.7,
                    color: darkMode ? "#cbd5f5" : "#475569",
                  }}
                >
                  Click <b>+ Create Note</b> to write your first note 📝
                </p>
              </div>

            ) : (

              notes
            .filter((note) => {
              const query = search.toLowerCase();

              return (
                note.title.toLowerCase().includes(query) ||
                note.content.toLowerCase().includes(query)
              );
            })
            .sort((a, b) => {

              // 📌 pinned notes first
              if (a.isPinned !== b.isPinned) {
                return b.isPinned - a.isPinned;
              }

              if (sortType === "newest") {
                return new Date(b.createdAt) - new Date(a.createdAt);
              }

              if (sortType === "oldest") {
                return new Date(a.createdAt) - new Date(b.createdAt);
              }

              if (sortType === "title") {
                return a.title.localeCompare(b.title);
              }

              return 0;

            })
            .map((note) => (
              <div
  key={note._id}
  style={{
    ...styles.card,
    ...(hoveredCard === note._id ? styles.cardHover : {}),
    zIndex: menuOpen === note._id ? 100 : 1,
    backgroundColor: note.color || (darkMode ? "#1e293b" : "white"),
    color: getTextColor(note.color),
  }}
                onMouseEnter={() => setHoveredCard(note._id)}
                onMouseLeave={() => setHoveredCard(null)}
              ref={menuOpen === note._id ? menuRef : null}
              >
                <div style={styles.cardTop}>
                  <h3 style={{display:"flex", alignItems:"center", gap:"6px"}}>
                    {note.isPinned && <span>📌</span>}
                    {note.title}
                  </h3>

                  <div
                    style={styles.dots}
                    onClick={(e) => {
                      e.stopPropagation();

                      setMenuOpen(
                        menuOpen === note._id ? null : note._id
                      );
                    }}
                  >
                    ⋮
                  </div>

                  {menuOpen === note._id && (
                    <div  style={styles.dropdown}>
                      <div
                        style={styles.dropdownItem}
                        onMouseEnter={(e)=> e.target.style.background="#f1f5f9"}
                        onMouseLeave={(e)=> e.target.style.background="transparent"}
                        onClick={() =>
                          navigate(`/note/${note._id}`)
                        }
                      >
                      👁  View
                      </div>

                      <div
                        style={styles.dropdownItem}
                        onMouseEnter={(e)=> e.target.style.background="#f1f5f9"}
                        onMouseLeave={(e)=> e.target.style.background="transparent"}
                        onClick={() =>
                          navigate(`/editor/${note._id}`)
                        }
                      >
                        ✏  Edit
                      </div>
                      
                      <div
                        style={styles.dropdownItem}
                        onMouseEnter={(e)=> e.target.style.background="#f1f5f9"}
                        onMouseLeave={(e)=> e.target.style.background="transparent"}
                        onClick={async () => {

                          await fetch(
                            `http://localhost:5000/api/notes/${note._id}/pin`,
                            { method: "PATCH" }
                          );

                          const user = JSON.parse(localStorage.getItem("user"));

                          const res = await fetch(
                            `http://localhost:5000/api/notes/user/${user.id}`
                          );

                          const data = await res.json();

                          setNotes(data);

                          setMenuOpen(null);

                        }}
                      >
                        {note.isPinned ? "📌 Unpin Note" : "📌 Pin Note"}
                      </div>

                      <div
                        style={styles.dropdownItem}
                        onMouseEnter={(e)=> e.target.style.background="#f1f5f9"}
                        onMouseLeave={(e)=> e.target.style.background="transparent"}
                        onClick={async () => {
                          await fetch(
                            `http://localhost:5000/api/notes/${note._id}/favorite`,
                            { method: "PATCH" }
                          );

                          const user = JSON.parse(localStorage.getItem("user"));
                          const res = await fetch(
                            `http://localhost:5000/api/notes/user/${user.id}`
                          );
                          const data = await res.json();
                          setNotes(data);
                          setMenuOpen(null);
                        }}
                      >
                        {note.isFavorite ? "⭐ Remove from Starred" : "⭐ Add to Starred"}
                      </div>

                      <div
                        style={{
                          ...styles.dropdownItem,
                          color: "#e90d0d",
                        }}
                        onMouseEnter={(e) => e.target.style.background = "#f1f5f9"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => {
                          setMenuOpen(null);        // ✅ close dropdown
                          setConfirmDeleteId(note._id); // ✅ open modal
                        }}
                      >
                        🗑 Delete
                      </div>
                    </div>
                  )}
                </div>

                <p style={styles.date}>
                  Created: {formatDate(note.createdAt)}
                </p>
              </div>
            ))
          )
        )}

        {activeSection === "favorites" && (
  notes.filter(note => note.isFavorite).length === 0 ? (

    <div style={styles.emptyState}>
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "10px",
          color: darkMode ? "#f1f5f9" : "#0f172a",
        }}
      >
        ⭐ No starred notes yet
      </h2>

      <p
        style={{
          fontSize: "18px",
          opacity: 0.8,
          color: darkMode ? "#cbd5f5" : "#475569",
        }}
      >
        Star notes to access them quickly later.
      </p>
    </div>

  ) : (

    notes
      .filter(note => note.isFavorite)
      .map((note) => (

        <div
          key={note._id}
          style={{
            ...styles.card,
            padding: "16px",
            backgroundColor:
              note.color || (darkMode ? "#1e293b" : "white"),
            color: getTextColor(note.color),
            cursor: "pointer"
          }}
          onClick={() => navigate(`/note/${note._id}`)}
        >

          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>

            <h3 style={{fontSize:"16px"}}>{note.title}</h3>

            <span
              style={{cursor:"pointer"}}
              onClick={async (e)=>{
                e.stopPropagation();

                await fetch(
                  `http://localhost:5000/api/notes/${note._id}/favorite`,
                  { method: "PATCH" }
                );

                const user = JSON.parse(localStorage.getItem("user"));

                const res = await fetch(
                  `http://localhost:5000/api/notes/user/${user.id}`
                );

                const data = await res.json();

                setNotes(data);
              }}
            >
          
            </span>

          </div>

          <p style={{fontSize:"12px", opacity:0.7}}>
            Created: {formatDate(note.createdAt)}
          </p>

        </div>

      ))

  )
)}

          {activeSection === "trash" && (
            trash.length === 0 ? (

              <div style={styles.emptyState}>
                <h2
                  style={{
                    fontSize: "28px",
                    marginBottom: "10px",
                    color: darkMode ? "#f1f5f9" : "#0f172a",
                  }}
                >
                  🗑 Trash is empty
                </h2>

                <p
                  style={{
                    fontSize: "18px",
                    opacity: 0.8,
                    color: darkMode ? "#cbd5f5" : "#475569",
                  }}
                >
                  Deleted notes will appear here.
                </p>
              </div>

            ) : (
            trash.map((note) => (
              <div
                key={note._id}
                style={{
                  ...styles.card,
                  backgroundColor: note.color || (darkMode ? "#1e293b" : "white"),
                  color: getTextColor(note.color),
                }}
              >
                <h3>{note.title}</h3>

                <button
                  style={styles.restoreBtn}
                  onClick={() => restoreNote(note._id)}
                >
                  Restore
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteForever(note._id)}
                >
                  Delete Forever
                </button>
              </div>
            ))
          )
          )}
          

          {activeSection === "stats" && (

            <div style={styles.statsGrid}>

              <div
                style={{
                  ...styles.statCard,
                  background: darkMode ? "#1e293b" : "white",
                  color: darkMode ? "#f1f5f9" : "#0f172a"
                }}
              >
                <h3 style={{whiteSpace:"nowrap"}}>📝 Total Notes</h3>
                <p style={{fontSize:"26px", fontWeight:"600"}}>{notes.length}</p>
              </div>

              <div
                style={{
                  ...styles.statCard,
                  background: darkMode ? "#1e293b" : "white",
                  color: darkMode ? "#f1f5f9" : "#0f172a"
                }}
              >
                <h3 style={{whiteSpace:"nowrap"}}>⭐ Starred Notes</h3>
                <p style={{fontSize:"26px", fontWeight:"600"}}>{notes.filter(note => note.isFavorite).length}</p>
              </div>

              <div
                style={{
                  ...styles.statCard,
                  background: darkMode ? "#1e293b" : "white",
                  color: darkMode ? "#f1f5f9" : "#0f172a"
                }}
              >
                <h3 style={{whiteSpace:"nowrap"}}>🗑 Deleted Notes</h3>
                <p style={{fontSize:"26px", fontWeight:"600"}}>{trash.length}</p>
              </div>

              <div
  style={{
    ...styles.statCard,
    background: darkMode ? "#1e293b" : "white",
    color: darkMode ? "#f1f5f9" : "#0f172a"
  }}
>
  <h3 style={{whiteSpace:"nowrap"}}>📅 Last Note Created</h3>

<p style={{fontSize:"18px", opacity:1.5}}>
  {notes.length > 0
    ? formatDate(
        [...notes]
          .filter(note => note.createdAt)
          .sort(
            (a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)
          )[0].createdAt
      )
    : "No notes yet"}
</p>
</div>

            </div>

          )}
          
        </div>
        </div>


        {/* ✅ DELETE CONFIRM MODAL */}
        {confirmDeleteId && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalBox}>
              <h3>Delete this note?</h3>

              <p>This note will be moved to Trash.</p>

              <div style={styles.modalActions}>
                <button
                  style={styles.cancelBtn}
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancel
                </button>

                <button
                  style={styles.confirmDeleteBtn}
                  onClick={() => {
                    moveToTrash(confirmDeleteId);
                    setConfirmDeleteId(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

       {editProfileOpen && (
  <div style={styles.modalOverlay}>
    <div style={styles.modalBox}>

      <h3 style={{ marginBottom: "0px" }}>Edit Profile</h3>

      <div style={styles.profileImageSection}>
        
      </div>

      <input
        type="text"
        placeholder="Enter new name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        style={{ ...styles.input, marginTop: "5px" }}
      />
     <div style={styles.profileImageSection}>

  <div style={styles.avatarPreview}>
    {profileImage ? (
      <img
        src={profileImage}
        alt="avatar"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover"
        }}
      />
    ) : (
      "👤"
    )}
  </div>

  <div style={styles.avatarButtons}>

    <label style={styles.changePhotoBtn}>
      📷 Change photo
      <input
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          const imageURL = URL.createObjectURL(file);
          setProfileImage(imageURL);
        }}
      />
    </label>

    {profileImage && (
      <button
        style={styles.removePhotoBtn}
        onClick={() => setProfileImage(null)}
      >
        Remove Photo
      </button>
    )}

  </div>

</div>

      <div style={styles.modalActions}>

        <button
          style={styles.cancelBtn}
          onClick={() => setEditProfileOpen(false)}
        >
          Cancel
        </button>

        <button
          style={styles.confirmDeleteBtn}
          onClick={() => {
            const updatedUser = {
              ...user,
              name: newName,
              image: profileImage,
            };

            localStorage.setItem(
              "user",
              JSON.stringify(updatedUser)
            );

            setEditProfileOpen(false);
            window.location.reload();
          }}
        >
          Save Changes
        </button>

      </div>

    </div>
  </div>
)} 
<AuthModal
  isOpen={authOpen}
  onClose={() => setAuthOpen(false)}
  type={authType}
  setType={setAuthType}
/>

      </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
  },
  sortWrapper:{
  display:"flex",
  alignItems:"center",
  gap:"6px",
  height:"42px",

},

sortLabel:{
  fontSize:"16px",
  color:"#64748b",
  lineHeight:"42px"
},

sortSelect:{
  height:"42px",
  padding:"0 12px",
  borderRadius:"8px",
  border:"1px solid #ddd",
  cursor:"pointer",
  fontSize:"14px"
},
  pinIcon:{
  fontSize:"14px",
  marginLeft:"6px",
  opacity:0.7
},
  sidebar: {
  width: "240px",
  backgroundColor: "#1e293b",
  color: "#e2e8f0",
  padding: "30px 20px",
},
  emptyState: {
  gridColumn: "1 / -1",
  textAlign: "center",
  padding: "80px 20px",
  color: "#000000",
},
  logo: { marginBottom: "30px" },
  createBtn: {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#4f46e5",
  color: "white",
  cursor: "pointer",
  display: "block"
},
  sideBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#334155",
    color: "white",
    cursor: "pointer",
  },
  main: { flex: 1, padding: "40px" },
  heading: {
  marginBottom: "30px",
  color: "#0f172a", // default (light mode)
},
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "25px",
  },
  card: {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
  position: "relative",
  overflow: "visible",
  cursor: "pointer",
  transition: "all 0.2s ease",
},
cardHover: {
  transform: "translateY(-6px)",
  boxShadow: "0 12px 35px rgba(0,0,0,0.15)"
},
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dots: { cursor: "pointer" },
  dropdown: {
  position: "absolute",
  top: "40px",
  right: "20px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  zIndex: 9999,
  padding: "6px 0",
  animation: "dropdownFade 0.15s ease"
},
  dropdownItem: {
  padding: "10px 16px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.15s",
},
statsGrid:{
  display:"grid",
  gridTemplateColumns:"repeat(2, 1fr)",
  gap:"20px",
  marginTop:"20px"
},

statCard:{
  padding:"25px",
  borderRadius:"12px",
  textAlign:"center",
  boxShadow:"0 8px 20px rgba(0,0,0,0.08)",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"center"
},
  date: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "10px",
  },
  restoreBtn: {
    marginTop: "10px",
    padding: "7px 12px",
    backgroundColor: "#dce1e4",
    color: "green",
    border: "none",
    borderRadius: "6px",
    fontWeight: "450",
  },
  deleteBtn: {
    marginTop: "10px",
    marginLeft: "10px",
    padding: "7px 12px",
    backgroundColor: "#dce1e4",
    color: "red",
    border: "none",
    borderRadius: "6px",
    fontWeight: "450",
  },
    search: {
    width: "100%",
    padding: "0 12px",
    height: "42px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
    topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    cursor: "pointer",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    backgroundColor: "#e2e8f0",
    padding: "6px 12px",
    borderRadius: "20px",
  },

  profileName: {
    fontSize: "14px",
    fontWeight: "500",
  },

    profilePanel: {
    position: "absolute",
    top: "60px",
    right: "0",
    width: "260px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    padding: "15px",
    zIndex: 10,
  },

  profileHeader: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  profileDivider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "12px 0",
  },

  profileItem: {
    padding: "10px 16px",
    cursor: "pointer",
  },
  profileCenter: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
},

bigAvatar: {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "#d5e3f6",
  color: "#0f172a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "10px",
  },

  profileTitle: {
    fontSize: "16px",
    fontWeight: "600",
  },

  profileEmail: {
    fontSize: "14px",
    color: "#64748b",
  },

  logoutBtn: {
    textAlign: "center",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#01327c",
    borderRadius: "8px",
    marginTop: "8px",
  },
    profileWrapper: {
    position: "relative",
  },
  profileTopSection: {
    backgroundColor: "#f1f5f9", // soft section background
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  themeToggle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "16px",
  },
  rightControls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  sideItem: {
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "0.2s",
    width: "100%",          // ✅ FIX
    boxSizing: "border-box", // ✅ FIX
    fontWeight: "500"
  },
    modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modalBox: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },

  cancelBtn: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#dce1e4",
    cursor: "pointer",
  },

  confirmDeleteBtn: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#dce1e4",
    color: "red",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

    avatarUpload: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px"
  },

  profileImageSection:{
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  gap:"12px",
  marginTop:"10px",
  marginBottom:"10px"
},

avatarPreview:{
  width:"85px",
  height:"85px",
  borderRadius:"50%",
  background:"#e2e8f0",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  fontSize:"32px",
  overflow:"hidden"
},

avatarButtons:{
  display:"flex",
  gap:"10px"
},

changePhotoBtn:{
  background:"#e2e8f0",
  color:"#0f172a",
  padding:"6px 10px",
  borderRadius:"6px",
  cursor:"pointer",
  fontSize:"14px",
  border:"none",
  transition:"0.2s"
},

removePhotoBtn:{
  background:"#e2e8f0",
  color:"#0f172a",
  border:"none",
  padding:"6px 10px",
  borderRadius:"6px",
  cursor:"pointer",
  fontSize:"12px",
  transition:"0.2s"
},
};


export default Dashboard;