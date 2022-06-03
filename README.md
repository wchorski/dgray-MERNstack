# dgray-MERNstack
putting David Gray's API &amp; React tutorials into one folder

https://www.youtube.com/watch?v=fUWkVxCv4IQ
https://www.youtube.com/watch?v=RVFAyFWO4go

# 🖱 LIVE SITE
<a src="https://nodeadmin.williamusic.com/">Node Admin: https://nodeadmin.williamusic.com/</a>
<iframe src="https://nodeadmin.williamusic.com/" width="400" height="200"></iframe>


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
0. copy `./server/.env.dev` to `./server/.env`
0. copy `./client/.env.dev` to `./client/.env`
0. allow multiple frontend domains in `allowedOrigins.js` (docker compose env variable gets added automatically)
0. node dev environment `cd ./server` `npm run dev` will kick up express and react at the same time.
0. you could run a dev environment in *docker* with `dev.sh` but I don't recommend it.
<br/>

# ⚙ Production Setup Checklist
0. copy and edit`./client/.env.prod` to `./client/.env`
0. copy `compose.example.yml` to `compose.yml` and configure *SECURE* `environment: ` variables
0. *client's* variables still set in `./client/.env`
0. `docker compose up -d --build` | `docker compose down --remove-orphans` to take everything down

## Nginx Proxy Manager setup
0. setup proxy host. example `app.mywebsite.com`
0. 'Details' tab -> host name is local IP and port is *client's* external Port in `compose.yml`
0. 'Custom location' tab -> API server set here 'location' set as `/api/`
0. ^ 'forward hostname/IP' = `192.168.0.100/` | 'forward port' = *server's* external Port`compose.yml`

<img src="/README/nodeadmin-nginx-setup-1.PNG">
<img src="/README/nodeadmin-nginx-setup-2.JPG">
<br/>

# 🌠 Feature Wish List
<details>
  <summary>List 1</summary> <br/>

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
  - [ ] see if hosting API on a seperate domain will work with cookies
</details>