export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  // Convert "3d" to milliseconds
  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE) || 3;
  const expireDate = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: expireDate,  // must be a Date object
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};
