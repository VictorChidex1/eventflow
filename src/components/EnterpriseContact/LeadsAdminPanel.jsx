// components/EnterpriseContact/LeadsAdminPanel.jsx (Development Only)
import React from "react";

const LeadsAdminPanel = () => {
  const [leads, setLeads] = React.useState([]);
  const [isVisible, setIsVisible] = React.useState(false);

  const loadLeads = () => {
    const storedLeads = JSON.parse(
      localStorage.getItem("eventflowEnterpriseLeads") || "[]"
    );
    setLeads(storedLeads);
  };

  const clearLeads = () => {
    localStorage.removeItem("eventflowEnterpriseLeads");
    setLeads([]);
  };

  const exportLeads = () => {
    const dataStr = JSON.stringify(leads, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `eventflow-leads-${new Date().toISOString()}.json`;
    link.click();
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => {
          setIsVisible(true);
          loadLeads();
        }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#8b5cf6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "8px 16px",
          fontSize: "12px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        🛠️ Leads ({leads.length})
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        zIndex: 1001,
        maxWidth: "90vw",
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3>📊 Enterprise Leads (Development)</h3>
        <button onClick={() => setIsVisible(false)}>✕</button>
      </div>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button onClick={loadLeads}>🔄 Refresh</button>
        <button onClick={exportLeads}>📥 Export JSON</button>
        <button onClick={clearLeads} style={{ background: "#ef4444" }}>
          🗑️ Clear
        </button>
      </div>

      <div style={{ fontSize: "14px" }}>
        <strong>Total Leads:</strong> {leads.length}
      </div>

      {leads.length === 0 ? (
        <p style={{ color: "#6b7280", fontStyle: "italic" }}>
          No leads captured yet
        </p>
      ) : (
        <div style={{ marginTop: "15px" }}>
          {leads.map((lead, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "10px",
                background: "#f9fafb",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{lead.companyName}</strong>
                <span style={{ color: "#6b7280", fontSize: "12px" }}>
                  {new Date(lead.submittedAt).toLocaleDateString()}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                {lead.contactName} • {lead.email} • {lead.phone}
              </div>
              <div style={{ fontSize: "12px", marginTop: "5px" }}>
                📅 {lead.monthlyEvents} • 👥 {lead.maxAttendees} • 🎯{" "}
                {lead.timeline}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadsAdminPanel;
