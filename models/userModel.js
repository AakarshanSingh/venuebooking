import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  loginEmail: { type: String, required: true, unique: true },
  loginPassword: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("loginPassword")) {
    this.loginPassword = await bcrypt.hash(this.loginPassword, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;