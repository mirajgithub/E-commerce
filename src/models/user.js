const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First Name is required"],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true
    },
    name: {
        type: String,
        required: [true, "Name is required"], // custom error message
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Invalid email"], // regex validation
    },
    password: {
        type: String,
        required: true,
        select: false, // won't return password by default
    },
    role: {
        type: String,
        enum: ["customer", "seller", "admin"],
        default: "customer",
    },
});
