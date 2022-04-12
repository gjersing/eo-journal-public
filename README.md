# Easy Open Journal
The public repo for the source code of Easy Open Journal // Demo it live here: https://easy-open-journal.herokuapp.com/

Easy Open Journal is a fullstack web application made with Express, Mongoose, MongoDB, and EJS. <br>
The journal is simple by design. All users can see all journal posts and may compose new entries at will.<br> 
New entries are filtered for profanity before being saved to a persistent MongoDB Atlas connection. <br>
Posts are dynamically generated on the homepage then truncated to 100 characters and appended with a post link.<br>

The MongoDB connection URL has been obfuscated for this repo.<br>
To run this repo locally you need to clone it, npm install, and then change the connection URL to your own Atlas or localhost connection.
