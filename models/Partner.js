const mongoose = require('mongoose');

const { Schema } = mongoose;
// PartnerSchema
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
      enum: [
        'MultiPolygon',
      ],
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
      enum: [
        'Point',
      ],
    },
    coordinates: {
      type: Array,
      required: true,
    },
  },
});

PartnerSchema.index({ coverageArea: '2dsphere' });

// set a Partner schema in mongoose model
const Partner = mongoose.model('partners', PartnerSchema);

module.exports = Partner;
