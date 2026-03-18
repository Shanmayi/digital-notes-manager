import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Feedback() {

const navigate = useNavigate();

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [email, setEmail] = useState("");
const [type, setType] = useState("");
const [severity, setSeverity] = useState("");
const [showSuccess, setShowSuccess] = useState(false);
const [category, setCategory] = useState("");

const handleSubmit = () => {

if (!type) {
alert("Please select a Feedback Type");
return;
}

if (!title || title.length < 5) {
alert("Title must be at least 5 characters");
return;
}

if (!description || description.length < 10) {
alert("Description must be at least 10 characters");
return;
}

if (!email) {
alert("Please enter your email");
return;
}

if (type === "Bug Report" && !severity) {
alert("Please select a severity level");
return;
}
setShowSuccess(true);

setTitle("");
setDescription("");
setEmail("");
setType("");
setSeverity("");
setCategory("");

};

return ( <div style={styles.page}>

  <div style={styles.container}>

    <div style={styles.headerIcon}>
      <div style={styles.headerIcon}>🗨️</div>
    </div>

    <h1 style={{textAlign: "center"}}>Send Feedback</h1>
    <p style={{...styles.subtitle, textAlign: "center"}}>
      Help us improve Digital Notes Manager by sharing your thoughts
    </p>

    <p style={{...styles.helpText, textAlign: "center"}}>
   <span style={{color:"#111827"}}>
      ✉ Need help? Contact us at
      <a
      href="mailto:support@digitalnotesmanager.com"
      style={styles.emailLink}
      >
      support@digitalnotesmanager.com
      </a>
      </span>
    </p>

    {/* Feedback Type */}
    <label style={styles.label}>
      Feedback Type<span style={styles.required}>*</span>
    </label>

    <div style={styles.feedbackGrid}>

<div
  style={{
    ...styles.feedbackCard,
    borderColor: type === "Bug Report" ? "2px solid #2563eb" : " 2px solid #ddd",
    backgroundColor: type === "Bug Report" ? "#e0e7ff" : "white"  
  }}
  onClick={()=>setType("Bug Report")}
>
  <b style ={{fontSize:"18px"}}>🐞 Bug Report</b>
  <p style={styles.smallText}>Something isn't working</p>
</div>

<div
  style={{
    ...styles.feedbackCard,
    borderColor: type === "Suggestion" ? "2px solid #2563eb" : " 2px solid #ddd",
    backgroundColor: type === "Suggestion" ? "#e0e7ff" : "white"  
  }}
  onClick={()=>setType("Suggestion")}
>
  <b style ={{fontSize:"18px"}}>💡 Suggestion</b>
  <p style={styles.smallText}>  New feature idea</p>
</div>

<div
  style={{
    ...styles.feedbackCard,
    borderColor: type === "Experience" ? "2px solid #2563eb" : " 2px solid #ddd",
    backgroundColor: type === "Experience" ? "#e0e7ff" : "white"
  }}
  onClick={()=>setType("Experience")}
>
  <b style ={{fontSize:"18px"}}>😊 Experience</b>
  <p style={styles.smallText}>  User experience</p>
</div>

<div
  style={{
    ...styles.feedbackCard,
    borderColor: type === "Other" ? "2px solid #2563eb" : " 2px solid #ddd",
    backgroundColor: type === "Other" ? "#e0e7ff" : "white"
  }}
  onClick={()=>setType("Other")}
>
  <b style ={{fontSize:"18px"}}>💬 Other</b>
  <p style={styles.smallText}>General feedback</p>
</div>

</div>

    {/* Category */}
    <label style={styles.label}>Category</label>
    <select
      style={styles.input}
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      >
      <option>Select a category</option>
      <option>UI Design</option>
      <option>Performance</option>
      <option>Notes Editor</option>
      <option>Dashboard</option>
    </select>

    {type === "Bug Report" && (
<>
<label style={styles.label}>Severity<span style={styles.required}>*</span></label>

<div style={styles.severityGrid}>

<div style={{
  ...styles.low,
  border : severity === "Low" ? "2px solid #2563eb" : "1px solid #22c55e",
  backgroundColor: severity === "Low" ? "#e0e7ff" : "white"
 }} onClick={()=>setSeverity("Low")}>
🟢 Low
</div>

<div style={{
  ...styles.medium,
  border : severity === "Medium" ? "2px solid #2563eb" : "1px solid #f59e0b",
  backgroundColor: severity === "Medium" ? "#e0e7ff" : "white"
 }} onClick={()=>setSeverity("Medium")}>
🟡 Medium
</div>

<div style={{
  ...styles.high,
  border : severity === "High" ? "2px solid #2563eb" : "1px solid #f97316",
  backgroundColor: severity === "High" ? "#e0e7ff" : "white"
 }} onClick={()=>setSeverity("High")}>
🟠 High
</div>

<div style={{
  ...styles.critical,
  border : severity === "Critical" ? "2px solid #2563eb" : "1px solid #ef4444",
  backgroundColor: severity === "Critical" ? "#e0e7ff" : "white"
 }} onClick={()=>setSeverity("Critical")}>
🔴 Critical
</div>

</div>
</>
)}


    {/* Title */}
    <label style={styles.label}>Title<span style={styles.required}>*</span> <span style={styles.counter}>{title.length}/100</span></label>
    <input
      style={styles.input}
      placeholder="Brief summary of your feedback (5-100 characters)"
      value={title}
      onChange={(e) => setTitle(e.target.value.slice(0, 100))}
    />

    {/* Description */}
    <label style={styles.label}>Description<span style={styles.required}>*</span> <span style={styles.counter}>{description.length}/2000</span></label>
    <textarea
      style={styles.textarea}
      placeholder="Please provide detailed information about your feedback (10-2000 characters)"
      value={description}
      onChange={(e) => setDescription(e.target.value.slice(0, 2000))}
    />

    {/* Email */}
    <label style={styles.label}>Your Email<span style={styles.required}>*</span></label>
    <input
      style={styles.input}
      placeholder="your.email@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <p style={styles.emailNote}>
    We'll use this email to update you on your feedback
    </p>
    {/* Tips */}
    <div style={styles.tipBox}>
      <b>Tips for effective feedback:</b>
      <ul>
        <li>Be specific and clear about the issue or suggestion</li>
        <li>Include steps to reproduce if reporting a bug</li>
        <li>Mention what you expected to happen vs. what actually happened</li>
      </ul>
    </div>

    {/* Buttons */}
    <div style={styles.buttonRow}>

      <button
        style={styles.cancelBtn}
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>

      <button
        style={{
          ...styles.submitBtn,
          opacity: (!title || !description || !email || !type) ? 0.5 : 1,
          cursor: (!title || !description || !email || !type) ? "not-allowed" : "pointer"
        }}
        disabled={!title || !description || !email || !type}
        onClick={handleSubmit}
        >
        Submit Feedback
        </button>

    </div>

    <p style={styles.backLink} onClick={() => navigate(-1)}>
  <b>← Back</b>
</p>

    <p style={styles.footer}>
      © 2026 Digital Notes Manager
    </p>

  </div>
  {showSuccess && (
  <div style={styles.popupOverlay}>
    <div style={styles.popupBox}>
      <h2>✅ Feedback Submitted</h2>
      <p>Thank you for helping us improve Digital Notes Manager!</p>

      <button
        style={styles.popupBtn}
        onClick={() => setShowSuccess(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

</div>

);
}

const styles = {


page: {
display: "flex",
justifyContent: "center",
padding: "40px",
background: "#ffffff",
minHeight: "100vh"
},
required: {
color: "#ef4444",
marginLeft: "4px"
},
container: {
width: "100%",
maxWidth: "1050px",
fontSize: "16px",
background: "white",
borderRadius: "12px",
padding: "40px",
boxShadow: "0 10px 30px rgba(3, 3, 3, 0.1)"
},

headerIcon: {
fontSize: "40px",
marginBottom: "10px",
backgroundColor:"#dbeafe",
textAlign: "center",
borderRadius: "0%",
width: "50px",
height: "45px",
display: "flex",
alignItems: "center",
justifyContent: "center",
margin: "0 auto 0px auto"
},

counter:{
float:"right",
fontSize:"13px",
color:"#6b7280"
},

subtitle: {
color: "#0e0d0d"
},

helpText: {
fontSize: "14px",
marginBottom: "20px"
},

label: {
marginTop: "15px",
display: "block",
fontWeight: "500"
},

input: {
width: "100%",
padding: "10px",
marginTop: "6px",
borderRadius: "6px",
border: "1px solid #ddd"
},

textarea: {
width: "100%",
height: "150px",
padding: "10px",
marginTop: "6px",
borderRadius: "6px",
border: "1px solid #ddd"
},

radioGroup: {
display: "grid",
gridTemplateColumns: "1fr 1fr",
marginTop: "10px",
gap: "10px"
},

tipBox:{
background:"#eff6ff",
border:"1px solid #bfdbfe",
color:"#1e40af",
padding:"15px",
marginTop:"20px",
borderRadius:"8px",
fontSize:"14px"
},

buttonRow: {
display: "flex",
gap: "15px",
marginTop: "25px"
},

cancelBtn: {
padding: "10px 20px",
borderRadius: "6px",
border: "none",
background: "#e2e8f0",
cursor: "pointer",
flex: "1",
},

emailLink:{
color:"#2563eb",
marginLeft:"5px",
textDecoration:"none",
fontWeight:"500"
},

submitBtn: {
padding: "10px 20px",
borderRadius: "6px",
border: "none",
background: "#3b82f6",
color: "white",
cursor: "pointer",
flex: "1",
opacity: 1
},

backLink: {
marginTop: "30px",
cursor: "pointer",
fontSize: "17px",
marginTop: "30px",
fontWeight: "500",
textAlign: "center",
},

footer: {
textAlign: "center",
marginTop: "20px",
fontSize: "13px",
color: "#1a1717"
},

feedbackGrid:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"12px",
marginTop:"10px"
},

feedbackCard:{
border:"1px solid #ddd",
borderRadius:"8px",
padding:"14px",
cursor:"pointer"
},

smallText:{
fontSize:"14px",
color:"#666",
marginTop:"4px"
},

severityGrid:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"10px",
marginTop:"10px"
},

low:{
border:"1px solid #22c55e",
padding:"10px",
borderRadius:"6px",
cursor:"pointer"
},

medium:{
border:"1px solid #eab308",
padding:"10px",
borderRadius:"6px",
cursor:"pointer"
},

high:{
border:"1px solid #f97316",
padding:"10px",
borderRadius:"6px",
cursor:"pointer"
},

critical:{
border:"1px solid #ef4444",
padding:"10px",
borderRadius:"6px",
cursor:"pointer"
},

emailNote:{
fontSize:"13px",
color:"#111827",
marginTop:"5px"
},
iconBox:{
width:"48px",
height:"48px",
background:"#dbeafe",
borderRadius:"8px",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"24px",
margin:"0 auto"
},
popupOverlay:{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.4)",
display:"flex",
alignItems:"center",
justifyContent:"center",
zIndex:1000
},

popupBox:{
background:"white",
padding:"30px",
borderRadius:"10px",
textAlign:"center",
width:"350px",
boxShadow:"0 10px 25px rgba(0,0,0,0.2)"
},

popupBtn:{
marginTop:"15px",
padding:"10px 20px",
border:"none",
borderRadius:"6px",
background:"#3b82f6",
color:"white",
cursor:"pointer"
},
};

export default Feedback;
