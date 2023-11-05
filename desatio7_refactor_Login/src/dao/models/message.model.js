import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const messagesModel = new mongoose.model('Messages', messageSchema);

export default messagesModel;
