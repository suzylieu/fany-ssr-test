import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setStepNext, setDialogOpen } from '../../redux/actions';
import Alert from '@material-ui/lab/Alert';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  status: {
    border: '0',
    padding: '0'
  },
}));

const ThirtyHFDialog = ({watch}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector(state => state.dialogOpen);
  const diyStatus = useSelector(state => state.diyStatus)

  const handleReset = () => {
    // dispatch(setDiyStatus(0))
    dispatch(setDialogOpen(false))
  };

  const handleConfirm = () => {
    dispatch(setStepNext());
    dispatch(setDialogOpen(false));
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>
          {diyStatus === -1 && <Alert className={classes.status} variant="outlined" severity="warning">送出資料不完整</Alert>}
          {diyStatus === 0 && <Alert className={classes.status} variant="outlined" severity="error">驗證失敗</Alert>}
          {diyStatus === 1 && <Alert className={classes.status} variant="outlined" severity="success">驗證成功</Alert>}
        </DialogTitle>
        <DialogContent>
          {diyStatus === 0 && <Typography>查無DIY資料，請重新填寫或以原價購買！</Typography>}
          {diyStatus === 1 && <Typography>參加過DIY隊名：{watch('diyType') === 1 ? '個人飢餓' : watch('diyInfo').Camp_Name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleReset} color="primary">
            重填
          </Button>
          <Button variant="contained" onClick={handleConfirm} color="primary">
            {diyStatus === 0 ? '原價購買' : '確認'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ThirtyHFDialog;