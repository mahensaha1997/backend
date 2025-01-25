import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/apiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    // 1. get user details from frontend
    // 2. validation - not empty
    // 3. check if user already exits: username, email
    // 4. check for images, check for avatar
    // 5. upload them to cloudinary, avatar
    // 6. create user object - create entry in db
    // 7. remove password and refresh token field from response
    // 8. check for user creation
    // 9. return response
    const { username, email, fullName, password } = req.body;
    if ([username, email, fullName, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = User.findOne({
        $or: [{ username }, { email }]
    });
    if (existingUser) throw new ApiError(409, "Email already exits!");

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url ?? "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser) {
        throw new ApiError(500, "Something went wrong.")
    }

    return res.status(201).json({
        new ApiResponse(200, createdUser, "User registered successfully")
    })
})

export { registerUser }