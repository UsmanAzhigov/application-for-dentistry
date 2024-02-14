import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Patient', PatientSchema);
