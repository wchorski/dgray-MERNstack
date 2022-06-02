# dgray-MERNstack
putting David Gray's API &amp; React tutorials into one folder

https://www.youtube.com/watch?v=fUWkVxCv4IQ
https://www.youtube.com/watch?v=RVFAyFWO4go


# ⚒ Features 
0. Simple CRUD for Posts (title, author, content)
0. Admin backend with user managment CRUD
0. Role based Authentication with JWT *Admin, Editor, User*
0. Client side Auth protection per page
0. Deployable via Docker 
<br/>

## 🔓 Permissions
<i>find default user login info in `./server/config/defaultUsers.json`</i>

#### Admin
- C R U D -> Users
- C R U D -> Posts

#### Editor
- _ _ _ _ -> Users
- C R U D -> Posts

#### User
- _ _ _ _ -> Users
- _ R _ _ -> Posts
<br/>

# ⚙ Development Setup Checklist
0. i run <a href="https://www.mongodb.com/try/download/community">MongoDB Community Edition</a> locally on my machine and tap into it with <a href="https://www.mongodb.com/try/download/compass">MongoDB Compass</a> 
0. add in `require('dotenv').config();` at the top of `./server/server.js`
0. allow multiple frontend domains in `allowedOrigins.js` (docker compose env variable gets added automatically)
0. node dev environment `cd ./server` `npm run dev` will kick up express and react at the same time.
0. you could run a dev environment in docker with `dev.sh` but I don't recommend it.
0. all dev env variables live in `./server/.env` & `./client/.env` (production variables are setup via compose)
<br/>

# ⚙ Production Setup Checklist
0. copy `compose.example.yml` to `compose.yml` and configure *SECURE* variables
0. comment out `require('dotenv').config();` at the top of `./server/server.js`
0. change `./client/.env` with prod variables
0. edit all `environment:` variables in `compose.yml`
0. `docker compose up -d --build`
0. `docker compose down --remove-orphans`
<br/>

# 🌠 Feature Wish List
<details>
  <summary>List 1</summary>

    + make a solid `compose.yml` for production. ditch docker dev env
    + add CSSTransitions
    + dark / light mode with cookie
    + make content and nav restricted to ~1200px screen width. but have color expand the whole page. 
    + think mobile
    + nav that folds up on scroll up, and comes back on scroll down (maybe just for mobile?)
    + footer?
  ### posts
  - [x] date created on post model
  - [ ] date modified on post model
  - [ ] only get Posts excerpt so it actually locks content behind Sign Up
  - [x] User form to create posts
  - [x] Only Allow Registered Users to view Single Post page (*working ish)
  - [ ] non-users able to view list of post excerpts
  - [x] Delete button on Single Post. show only to Editors / Admins
  - [x] Editor / Admin able to delete posts
  - [ ] 'PostCreate.jsx' autofill author as logged in user. make it permanent
  - [ ] make search queary filter post table
  - [ ] featured image
  ### admin
  - [x] Admin able to change password of user
  - [ ] a "forgot password" email reset
  - [ ] password validation with special character and capital letter (npm yup-password?)
  - [ ] change background & logo
  - [x] Admin User Create Form
  - [x] Admin able to edit user Roles
  - [x] inject inital Admin in the db on a fresh install
  - [ ] save currently edited Post data form as cookie (when an Editor leaves the page and tries to come back to edit)
  - [ ] use reportWebVitals(console.log()) to create dashboard of web traffic stats
  - [ ] Modern editor that superimposes itself on the 'PostSingle.jsx' page
  - [ ] tool tips. tool tips everywhere
  - [ ] make search queary filter users table
  - [ ] color picker for background & highlight color
  ### server
  - [x] add `allowedOrigins.js` variable to .env for easy config
</details>