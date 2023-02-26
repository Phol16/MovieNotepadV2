import bcrypt from 'bcrypt';
import User from '../../models/UserModel.js';
import Jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User does not exist.',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: 'failed',
        message: ' Invalid Credential',
      });
    }

    const accessToken = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({
      status: 'success',
      accessToken,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      loc:'here',
      message: err.message,
    });
  }
};
export default loginUser;
