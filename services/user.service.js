const FindUserByEmail = async (email) => {
  const User = await UserModel.findOne({
    email: email,
  });
  //I return the user so that if i want to execute the function, the function will return the user.
  return User
};



module.exports = { FindUserByEmail };
