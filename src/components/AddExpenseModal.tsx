import { Modal, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function AddExpenseModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose(): void;
}) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [desc, setDesc] = useState('');

  const handleSubmit = async () => {
    await axios.post('/api/expenses', { title, amount, description: desc });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          p: 4,
          bgcolor: 'background.paper',
          mx: 'auto',
          mt: 10,
        }}
      >
        <TextField
          fullWidth
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label='Amount'
          type='number'
          value={amount || ''}
          onChange={(e) => setAmount(+e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label='Description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box textAlign='right'>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
