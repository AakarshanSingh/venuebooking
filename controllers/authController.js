import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  try {
    const { loginEmail, loginPassword } = req.body;

    const user = await User.findOne({ loginEmail });

    if (!user) {
      return res.render('login', {
        message: {
          type: 'danger',
          text: 'Invalid email or password.',
        },
      });
    }

    const isMatch = await bcrypt.compare(loginPassword, user.loginPassword);
    if (!isMatch) {
      return res.render('login', {
        message: {
          type: 'danger',
          text: 'Invalid email or password.',
        },
      });
    }

    req.session.isAuth = true;
    res.status(201).render('venueBooking', {
      message: {
        type: 'success',
        text: 'Login successful!',
      },
    });
  } catch (err) {
    res.status(400).render('login', {
      message: {
        type: 'danger',
        text: 'An error occurred. Please try again later.',
      },
    });
  }
};

export const register = async (req, res) => {
  try {
    const { registerEmail, registerPassword, confirmPassword } = req.body;

    if (registerPassword !== confirmPassword) {
      return res.render('register', {
        message: {
          type: 'danger',
          text: "Passwords don't match.",
        },
      });
    }

    const existingUser = await User.findOne({ loginEmail: registerEmail });
    if (existingUser) {
      return res.render('register', {
        message: {
          type: 'danger',
          text: 'Email already exists.',
        },
      });
    }

    const user = new User({
      loginEmail: registerEmail,
      loginPassword: registerPassword,
    });
    await user.save();

    res.status(201).render('register', {
      message: {
        type: 'success',
        text: 'User registered successfully.',
      },
    });
  } catch (error) {
    console.log(error)
    res.status(400).render('register', {
      message: {
        type: 'danger',
        text: 'An error occurred. Please try again later.',
      },
    });
  }
};
