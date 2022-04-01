- install reqs on command line (in parent dir):
    npm i express dotenv mongoose colors
    npm i -D nodemon
    npm i express-async-handler

- .gitignore (in parent dir):
    node_modules
    .env


*** Change <password> and DB_NAME in MONGODB_URI string to the correct information posted in discord.
- .env (in parent dir):
    NODE_ENV = development
    PORT = 5000
    MONGODB_URI = mongodb+srv://eventer:<password>@cluster0.qwjmg.mongodb.net/DB_NAME?retryWrites=true&w=majority

