import mongoose from "mongoose"

const spotsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  coordinates: {
    type: String,
    required: true,
    maxlength: 60
  },
  description: {
    type: String,
    required: true,
    maxlength: 400
  },
  instaLocation: {
    type: String,
    required: true,
    maxlength: 100
  },
},
  {
    timestamps: true
  },
) 

export default mongoose.models.spots || mongoose.model('spots', spotsSchema)