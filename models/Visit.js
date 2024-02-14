import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: false,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberTooth: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Visit', VisitSchema);
