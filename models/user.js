import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: [true, "Email already exist"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exist"],
    minlength: [4, "Username must be at least 4 characters long"],
    maxlength: [20, "Username can't be more than 20 characters long"],
  },
  image: { type: String },
});

 const User = models.User || model("User", userSchema);
 export default User;
