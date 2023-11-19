import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: function () {
        return !this.oauthUser;
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: function () {
        return !this.oauthUser;
      },
      max: 99,
      min: 0,
    },
    password: {
      type: String,
      required: function () {
        return !this.oauthUser;
      },
    },
    role: {
      type: String,
      default: "user",
    },
    oauthUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = new mongoose.model("users", userSchema);

export default user;
