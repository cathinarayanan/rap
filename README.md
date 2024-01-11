# csbc1030 - RAP

Step 1: Run the following to import required libraries into node_modules
npm i

# To install eslint and prettier: (Optional)

npm i --save-dev eslint
npm i --save-dev prettier

Step 2: Run the node project as follows
node index.js

# To format your code and find linting errors: (Optional)

npm run format
npm run lint
npm run lint:fix

Step 3: DATABASE SETUP

# In Mysql Workbench, if you don't have the cloud database connection

# 3.1 - Establish Connection

click "+" icon next to "MySQL Connections"

# 3.2 - In Setup New Connection Window

Connection Name: <any_name>
Connection Method: Standard (TCP/IP)
Parameters:
    Hostname: mysql2d189f6e-chandrasekhar.a.aivencloud.com
    Port: 19662
    Username: avnadmin

-> Click "Test Connection"
Password: AVNS_uCvawkCzv-2BdJ-C-Dy
-> Click OK - Successfully made the MySQL Connection message should appear
-> Click OK - To close success message
-> Click OK - To save the connection

# 3.3 In Nodejs Terminal - To start the application

node index.js

Step 4: To Login, Open the following url in browser for post('/login') - Login
http://localhost:3000/login

Json Body example
{
"email": "asl@gmail.com",
"password": "123"
}

Step 5: Open the following url in browser for post('/register') - Register User
http://localhost:3000/register

Json Body example
{
"email": "chand@gmail.com",
"pwd": "123",
"name": "chand",
"phone": "1234567890"
}

Step 6: Open the following url in browser for post('/update-user') - Update LoggedIn User
http://localhost:3000/update-user

Json Body example
{
"email": "chand@gmail.com",
"pwd": "1234",
"name": "CHAND",
"phone": "0123456789"
}

NOTE: If email is updated for the User, the User gets loggedout.

Step 7: Open the following url in browser for get('/logout') - Logout
http://localhost:3000/logout

NOTE:
If you try to access any of the given URL before login, It will give the following error
"Access Denied - NO Token"
