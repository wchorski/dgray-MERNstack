# dgray-MERNstack
putting David Gray's API &amp; React tutorials into one folder

https://www.youtube.com/watch?v=fUWkVxCv4IQ
https://www.youtube.com/watch?v=RVFAyFWO4go


## {🗒️} Features List
0. Simple CRUD for Posts (title, author, content)
0. Admin backend with user managment CRUD
0. Role based Authentication with JWT *Admin, Editor, User*
0. Client side Auth protection per page
0. Deployable via Docker 

## 🔓 Permissions
*Admin*
0. CRUD Users
0. CRUD & Posts

*Editor*
0. ____ Users
0. CRUD & Posts

*User*
0. ____ Users
0. _R__ & Posts

# Setup Checklist
0. allow your frontend domain in `allowedOrigins.js`




## Feature Wish List
### posts
[ ] 'PostCreate.jsx' autofill author as logged in user. make it permanent
[x] User form to create posts
[x] Only Allow Registered Users to view Single Post page (*working ish)
[ ] non-users able to view list of post excerpts
[ ] only get Posts excerpt so it actually locks content behind Sign Up
[x] Delete button on Single Post. show only to Editors / Admins
[x] Editor / Admin able to delete posts
### admin
[ ] Admin able to change password of user
[] a "forgot password" reset
[ ] Admin User Create Form
[x] Admin able to edit user Roles
[ ] inject inital Users data in the db on a fresh install
[ ] save currently edited Post data form as cookie (when an Editor leaves the page and tries to come back to edit)
[ ] Modern editor that superimposes itself on the 'PostSingle.jsx' page
[] tool tips. tool tips everywhere
### server
[] add `allowedOrigins.js` variable to .env for easy config