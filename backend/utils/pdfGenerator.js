const PDFDocument = require('pdfkit');

function generatePDF(reportData) {
  const doc = new PDFDocument();

  // Set up the PDF (add images, text, etc.)
  doc.text('Broker Opinion of Value Report', { align: 'center' });
  doc.moveDown();

  // Add property details
  doc.text(`Property Address: ${reportData.propertyDetails.address}`);
  doc.text(`Property Type: ${reportData.propertyDetails.type}`);
  // ... more fields

  // Add AI-generated description
  doc.addPage();
  doc.text('Property Description:', { underline: true });
  doc.text(reportData.aiContent.description);

  // Finalize PDF and return the stream
  doc.end();
  return doc;
}

module.exports = { generatePDF };
