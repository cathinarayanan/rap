const express = require('express');
const cookie = require("cookie-parser");
const loginRoutes = require('./routes/login');

const app = express();
const port = 3000;

const users = [{"email": "chand@gmail.com", "password": "$2a$12$cHt8zVmgUzIExyFgRMhWzOp.Sw7NhCsEPWjppfmNLHCepd.pYEtT6"}, {"email": "nirmit@gmail.com", "password": "$2a$12$cHt8zVmgUzIExyFgRMhWzOp.Sw7NhCsEPWjppfmNLHCepd.pYEtT6"}];

app.use(express.json());
app.use(cookie());

app.use("/", loginRoutes);

app.get('/', (req, res) => {
  res.send('Goto login url')
});

// app.post('/login', async (req, res) => {
//     try {
//         const user = users.find(user => user.email === req.body.email);
//         if (!user) {
//             const err = new Error('User Not Found!')
//             err.status = 400;
//             throw err;
//         } else if (await bcrypt.compare(req.body.password, user.password)) {
//             const tokenPayload = {
//               email: user.email,
//             };
//
//             const accessToken = jwt.sign(tokenPayload, 'SECRET');
//             res.cookie("auth", "true"); // set the cookie
//             res.status(201).json({
//                 status: 'success',
//                 message: 'User Logged In!',
//                 data: {
//                   accessToken,
//                 },
//               });
//         } else {
//             const err = new Error('Wrong Password!');
//             err.status = 400;
//             throw err;
//           }
//       } catch (err) {
//         res.status(err.status).json({
//             status: 'fail',
//             message: err.message,
//           });
//       }
// });

//  middleware function
const isAuthenticated = (req, res, next) => {
	if (req.cookies.auth === "true") { // checks if the cookie is set for auth
		next(); // they are logged in, let’s continue
	}
}

// app.use(isAuthenticated);

app.get("/logout", (req, res) => {
	res.cookie("auth", "false"); // simply sets it to false
	return res.status(201).json({
        status: 'success',
        message: 'User Logged Out!',
      });
});

app.listen(port, () => {
  console.log(`app running on http://127.0.0.1:${port}`)
});