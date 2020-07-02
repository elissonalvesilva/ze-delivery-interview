const mongoose = require('mongoose');

const { Schema } = mongoose;

const PartnerSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  tradingName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    unique: true,
    required: true,
  },
  coverageArea: {
    type: {
      type: String,
      required: true,
    },
    coordinates: {
      type: Array,
      required: true,
    },
  },
  address: {
    type: {
      type: String,
      required: true,
    },
    coordinates: {
      type: Array,
      required: true,
    },
  },
});

const Partner = mongoose.model('partner', PartnerSchema);

module.exports = Partner;
