// src/utils/pdfGenerator.js
import { jsPDF } from "jspdf";

export const generateReceipt = (ticket, user) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // --- Header Section ---
  // Logo / Brand Name
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 99, 235); // Blue color (Tailwind blue-600)
  doc.text("EventFlow", 20, 20);

  // Receipt Title
  doc.setFontSize(12);
  doc.setTextColor(100); // Gray
  doc.setFont("helvetica", "normal");
  doc.text("PAYMENT RECEIPT", pageWidth - 20, 20, { align: "right" });

  // Divider Line
  doc.setDrawColor(200);
  doc.line(20, 30, pageWidth - 20, 30);

  // --- Payment Details Section ---
  let yPos = 50;
  
  // Transaction Info (Left Side)
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Billed To:", 20, yPos);
  
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text(user?.name || ticket.customerName || "Valued Customer", 20, yPos + 7);
  doc.setFont("helvetica", "normal");
  doc.text(user?.email || ticket.customerEmail || "", 20, yPos + 14);

  // Receipt Info (Right Side)
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Reference No:", pageWidth - 20, yPos, { align: "right" });
  doc.text("Date:", pageWidth - 20, yPos + 15, { align: "right" });
  
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text(`#${ticket.reference}`, pageWidth - 20, yPos + 7, { align: "right" });
  doc.text(new Date(ticket.trackedAt || ticket.paymentDate).toLocaleDateString(), pageWidth - 20, yPos + 22, { align: "right" });

  // --- Event Details Box ---
  yPos += 40;
  
  // Gray Background for header
  doc.setFillColor(249, 250, 251); // Light gray
  doc.rect(20, yPos - 5, pageWidth - 40, 15, "F");
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Event Details", 25, yPos + 5);
  doc.text("Quantity", pageWidth - 60, yPos + 5);
  doc.text("Price", pageWidth - 25, yPos + 5, { align: "right" });

  yPos += 20;
  
  // Item
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(ticket.eventTitle, 25, yPos);
  doc.text(`${ticket.tickets}`, pageWidth - 55, yPos);
  doc.text(`N${ticket.amount.toLocaleString()}`, pageWidth - 25, yPos, { align: "right" });

  // Divider
  yPos += 10;
  doc.line(20, yPos, pageWidth - 20, yPos);

  // --- Total Section ---
  yPos += 15;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Total Paid:", pageWidth - 80, yPos);
  doc.setTextColor(37, 99, 235); // Blue
  doc.text(`N${ticket.amount.toLocaleString()}`, pageWidth - 25, yPos, { align: "right" });

  // --- Footer / Stamp ---
  yPos += 30;
  doc.setDrawColor(22, 163, 74); // Green
  doc.setTextColor(22, 163, 74);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.rect(20, yPos, 40, 15);
  doc.text("PAID", 40, yPos + 10, { align: "center" });

  // Save the PDF
  doc.save(`Receipt_${ticket.reference}.pdf`);
};