import { Button, TextField, Dialog, DialogContent, DialogActions } from '@material-ui/core';

import db from '../firebase-config';
export default function EditTodo(props) {
  const editTodo = () => {
    db.collection('todos').doc(props.toUpdateId).update({
      todo: props.update,
    });
    props.close();
  };

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogContent>
        <TextField
          autoFocus
          margin='normal'
          label='Update Todo'
          type='text'
          fullWidth
          name='updateTodo'
          value={props.update}
          onChange={(event) => props.setUpdate(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={() => {
            editTodo();
          }}
          color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
