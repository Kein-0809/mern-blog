// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthContext, AuthProvider } from './contexts/AuthContext';
// import PrivateRoute from './utils/PrivateRoute';
// import Navbar from './components/Navbar';
// import Login from './components/Login';
// import Register from './components/Register';
// import MemoList from './components/MemoList';
// import CreateMemo from './components/CreateMemo';
// import UpdateMemo from './components/UpdateMemo';
// import DeleteMemo from './components/DeleteMemo';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<MemoList />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/create-memo" element={<CreateMemo />} />
//           <Route path="/update-memo/:id" element={<UpdateMemo />} />
//           <Route path="/delete-memo/:id" element={<DeleteMemo />} />
//           {/* Add other routes as needed */}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import UserContext from './context/UserContext';

function App() {

  const [user, setUser] = useState({
    token: null,
    username: null
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
