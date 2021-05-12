import React from 'react';
import { Controller } from "react-hook-form";
import { useSelector } from 'react-redux';

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const Step3Content = ({ control, getValues }) => {
  const data = getValues();

  const renderEvent = () => {
    if (data.event_type === "O") {
      return "自行組隊體驗"
    }
    if (data.event_type === "G") {
      return "組隊參加主場活動 7/17"
    }
    if (data.event_type === "S") {
      return "個別報名主場活動現場編隊 7/17"
    }
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}> 
        {/* <Grid item xs={12}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography>項目：{renderEvent()}</Typography>
              <Typography>組隊人數：{data.team_size}</Typography>
              <Typography>遊戲包組數：{data.event_count}</Typography>
              <Typography>總金額：{totalPrice}</Typography>
            </Box>
          </Paper>
        </Grid> */}
        <Grid item xs={12}>
          <FormControl required fullWidth={true}>
            <FormLabel >付款方式</FormLabel>
            <Controller
              control={control}
              name="payment_method"
              render={
                ({ field }) =>
                  <RadioGroup {...field}>
                    <FormControlLabel value="10" control={<Radio color="primary" />} label="LINE Pay - LINE Pay 捐款" />
                    <FormControlLabel value="1" control={<Radio color="primary" />} label="線上刷信用卡 - 線上刷卡立即捐款" />
                    <FormControlLabel value="2" control={<Radio color="primary" />} label="ATM轉帳付款 - 完成流程後，系統會產生一組期限14天的專屬的虛擬轉帳帳號，請您根據此帳號及金額進行轉帳" />
                    <FormControlLabel value="3" control={<Radio color="primary" />} label="便利商店條碼單 - 全家、7-11、萊爾富、OK 四大超商皆可進行捐款" />
                  </RadioGroup>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step3Content;