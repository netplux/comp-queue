// backend/models/Property.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  propertyType: {
    type: String,
    required: true,
    enum: ['Single Family Residence', 'Condominium', 'Multi-Family', 'Commercial'],
  },
  imagePath: String,
  preparedFor: String,
  reportDate: { type: Date, default: Date.now },
  preparedBy: {
    name: String,
    contactInfo: String,
  },
  siteDescription: {
    // Define the fields as needed, e.g.:
    zoning: String,
    lotSize: String,
    utilities: String,
    // ... other fields from your site description section
  },
  walkthrough: [
    {
      sectionNumber: Number,
      sectionTitle: String,
      subpoints: [
        {
          subpointLetter: String,
          text: String,
          imagePath: String,
        },
      ],
    },
  ],
  rentRoll: [
    {
      unitNumber: String,
      tenantName: String,
      leaseStartDate: Date,
      leaseEndDate: Date,
      monthlyRent: Number,
      squareFootage: Number,
      occupancyStatus: String,
      // ... other rent roll details
    },
  ],
  marketData: {
    comparableListings: [
      {
        address: String,
        salePrice: Number,
        description: String,
        differences: String,
        // ... other relevant fields
      },
    ],
    marketCapRate: Number,
    vacancyRate: Number,
    operatingExpenses: Number,
    // ... other market data fields
  },
  aiContent: {
    propertyDescription: String,
    comparativeAnalysis: String,
    marketSummary: String,
    // ... other AI-generated content
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Property', propertySchema);
