const { generateAIContent } = require('./aiController');

async function createReport(req, res) {
  const { propertyDetails } = req.body;
  // Generate AI description
  const aiDescription = await generateAIContent(`Write a detailed description for the following property: ${JSON.stringify(propertyDetails)}`);

  // Save report to database
  const report = new Report({
    userId: req.user.id,
    propertyDetails,
    aiContent: { description: aiDescription },
    // ... other fields
  });

  await report.save();
  res.status(201).json({ message: 'Report created', reportId: report._id });
}
