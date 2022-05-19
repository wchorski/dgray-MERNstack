import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

import { LoginPersist } from './components/LoginPersist';

import Missing from './views/Missing';
import Editor from './views/Editor';
import Home from './views/Home';
import Admin from './views/Admin';
import Lounge from './views/Lounge';
import LinkPage from './views/LinkPage';

import Register from './components/Register';
import Login from './components/Login';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { User } from './views/User';

const ROLES = {
  'Admin': 5150,
  'Editor': 1984,
  'User': 2001,
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home username='derik'/>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<LoginPersist />}>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="/editor" element={<Editor />} />
          </Route>


          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/users/:_id" element={<User />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin, ROLES.User]} />}>
            <Route path="/lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="/*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;