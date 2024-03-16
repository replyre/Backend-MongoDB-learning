import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  console.log("email:", email);
  if (
    [fullname, email, username, password].some((e) => {
      return e?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fileds are required");
  }
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) throw new ApiError(409, "USer alrerady exists");

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) throw new ApiError(400, "avatar file not found");
  if (!coverImageLocalPath)
    throw new ApiError(400, "coverImage file not found");

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong");
  }
});

export { registerUser };
