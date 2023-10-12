import React, { useState } from 'react';
import { Button, TextField, Paper } from '@mui/material';

const MemoItem = ({ memo, handleUpdate, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(memo.title);
  const [editedContent, setEditedContent] = useState(memo.content);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCompleteEdit = () => {
    handleUpdate(memo._id, editedTitle, editedContent);
    setIsEditing(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '15px', marginBottom: '15px' }}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={isEditing ? editedTitle : memo.title}
        onChange={e => setEditedTitle(e.target.value)}
        disabled={!isEditing}
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={isEditing ? editedContent : memo.content}
        onChange={e => setEditedContent(e.target.value)}
        disabled={!isEditing}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        {isEditing ? (
          <Button variant="contained" color="primary" onClick={handleCompleteEdit}>Complete</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleEditToggle}>Edit</Button>
        )}
        <Button variant="contained" color="secondary" onClick={() => handleDelete(memo._id)}>Delete</Button>
      </div>
    </Paper>
  );
};

export default MemoItem;