// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [memos, setMemos] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchMemos = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/memos/', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setMemos(response.data);
//       } catch (err) {
//         setMessage('Error fetching memos.');
//       }
//     }
//     fetchMemos();
//   }, []);

//   const updateMemo = async (id, updatedContent) => {
//     try {
//       const response = await axios.put(`/api/memos/${id}`, updatedContent);
//       // Update the memos state with the updated memo
//       setMemos(memos.map(memo =>
//         memo._id === id ? response.data : memo
//       ));
//     } catch (error) {
//       console.error("Error updating memo:", error);
//     }
//   };

//   const deleteMemo = async id => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this memo?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`/api/memos/${id}`);
//       // Filter out the deleted memo from the memos state
//       setMemos(memos.filter(memo => memo._id !== id));
//     } catch (error) {
//       console.error("Error deleting memo:", error);
//     }
//   };

//   return (
//     <div className="container">
//       {memos.map(memo => (
//         <div key={memo._id} className="memo">
//           <div className="memo-title">{memo.title}</div>
//           <div className="memo-content">{memo.content}</div>
//           <div className="memo-actions">
//             <button className="button button-primary" onClick={() => updateMemo(memo._id)}>Update</button>
//             <button className="button button-danger" onClick={() => deleteMemo(memo._id)}>Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;

// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { Button, TextField, Paper, Grid, Typography } from '@mui/material';
// import UserContext from '../context/UserContext';

// const Home = () => {
//   const [memos, setMemos] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [, setMessage] = useState('');
//   const [newTitle, setNewTitle] = useState('');
//   const [newContent, setNewContent] = useState('');
//   const { user, setUser } = useContext(UserContext);

//   useEffect(() => {
//     const fetchMemos = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const username = localStorage.getItem('username');
//         setUser(prevFormData => ({
//           ...prevFormData,  // Spread the existing formData
//           username: username  // Set username to user.userID
//         }));
//         const response = await axios.get('/api/memos/', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setMemos(response.data);
//       } catch (err) {
//         setMessage('Error fetching memos.');
//       }
//     }
//     fetchMemos();
//   }, []);

//   const handleCreate = async () => {
//     try {
//       // Construct the request payload

//       const username = localStorage.getItem('username');
//       const payload = {
//         title: newTitle,
//         content: newContent,
//         username: username,
//       }
//       console.log("username: ", username); // Debug statement

//       // Send the POST request to create the new memo
//       await axios.post('/api/memos/', payload)

//       // Clear the input fields after successfully creating the memo
//       setNewTitle('');
//       setNewContent('');

//       // Refresh the list of memos to include the new one
//       const token = localStorage.getItem('token');
//       const response = await axios.get('/api/memos/', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       setMemos(response.data);
//     } catch (error) {
//       console.error('Error creating new memo:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/memos/${id}`);
//       setMemos(memos.filter(memo => memo._id !== id));
//     } catch (error) {
//       console.error('Error deleting memo:', error);
//     }
//   };

//   const handleUpdate = async (id, updatedTitle, updatedContent) => {
//     try {
//       const { data } = await axios.put(`/api/memos/${id}`, {
//         title: updatedTitle,
//         content: updatedContent
//       });

//       setMemos(memos.map(memo => memo._id === id ? data : memo));
//     } catch (error) {
//       console.error('Error updating memo:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Typography variant="h4" style={{ marginBottom: '20px' }}>Your Memos</Typography>
//       <Typography variant="h6">Create New Memo</Typography>
//       <TextField
//         label="Title"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={newTitle}
//         onChange={e => setNewTitle(e.target.value)}
//       />
//       <TextField
//         label="Content"
//         variant="outlined"
//         fullWidth
//         multiline
//         rows={4}
//         margin="normal"
//         value={newContent}
//         onChange={e => setNewContent(e.target.value)}
//       />
//       <Button variant="contained" color="primary" onClick={handleCreate}>Create</Button>
//       <Grid container spacing={3}>
//         {memos.map(memo => (
//           <Grid item xs={12} md={6} lg={4} key={memo._id}>
//             <Paper elevation={3} style={{ padding: '15px', marginBottom: '15px' }}>
//               <TextField
//                 label="Title"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={memo.title}
//                 onChange={e => setTitle(e.target.value)}
//               />
//               <TextField
//                 label="Content"
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 margin="normal"
//                 value={memo.content}
//                 onChange={e => setContent(e.target.value)}
//               />
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
//                 <Button variant="contained" color="primary" onClick={() => handleUpdate(memo._id, title, content)}>Edit</Button>
//                 <Button variant="contained" color="secondary" onClick={() => handleDelete(memo._id)}>Delete</Button>
//               </div>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, TextField, Paper, Grid, Typography } from '@mui/material';
import UserContext from '../context/UserContext';
import MemoItem from './MemoItem';

const Home = () => {
  const [memos, setMemos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [, setMessage] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        setUser(prevFormData => ({
          ...prevFormData,  // Spread the existing formData
          username: username  // Set username to user.userID
        }));
        const response = await axios.get('/api/memos/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMemos(response.data);
      } catch (err) {
        setMessage('Error fetching memos.');
      }
    }
    fetchMemos();
  }, []);

  const handleCreate = async () => {
    try {
      // Construct the request payload

      const username = localStorage.getItem('username');
      const payload = {
        title: newTitle,
        content: newContent,
        username: username,
      }
      console.log("username: ", username); // Debug statement

      // Send the POST request to create the new memo
      await axios.post('/api/memos/', payload)

      // Clear the input fields after successfully creating the memo
      setNewTitle('');
      setNewContent('');

      // Refresh the list of memos to include the new one
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/memos/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMemos(response.data);
    } catch (error) {
      console.error('Error creating new memo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/memos/${id}`);
      setMemos(memos.filter(memo => memo._id !== id));
    } catch (error) {
      console.error('Error deleting memo:', error);
    }
  };

  const handleUpdate = async (id, updatedTitle, updatedContent) => {
    try {
      const { data } = await axios.put(`/api/memos/${id}`, {
        title: updatedTitle,
        content: updatedContent
      });

      setMemos(memos.map(memo => memo._id === id ? data : memo));
    } catch (error) {
      console.error('Error updating memo:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Your Memos</Typography>
      <div style={{ marginBottom: '30px' }}>
        <Typography variant="h6">Create New Memo</Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>Create</Button>
      </div>

      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        {memos.map(memo => (
          <Grid item xs={12} md={6} lg={4}>
            <MemoItem
              key={memo._id}
              memo={memo}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;