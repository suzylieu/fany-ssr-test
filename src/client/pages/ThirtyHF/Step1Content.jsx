import React from 'react';
import { Controller } from "react-hook-form";

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const Step1Content = ({ control, errors, watch, setValue }) => {
  const eventCountList = [];
  for (let i = 1; i < 21; i++) {
    eventCountList.push(i);
  }
  const handleEventType = () => {
    if (watch('event_type') === "O") {
      setValue('event_time', '00:00');
    }
    if (watch('event_type') === "S") {
      setValue('event_time', '13:00');
      setValue('team_size', 6);
      setValue('event_count', 0);
    }
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} lg={3}>
          <Controller
            rules={{ required: true }}
            control={control}
            name="event_type"
            render={
              ({ field }) =>
                <FormControl required error={errors.event_type ? true : false}>
                  <FormLabel component="legend">組隊方式</FormLabel>
                  <RadioGroup  {...field} onBlur={handleEventType}>
                    <FormControlLabel
                      value="O"
                      control={<Radio color="primary" />}
                      label="自行組隊體驗"
                    />
                    <FormControlLabel
                      value="G"
                      control={<Radio color="primary" />}
                      label="組隊參加主場活動 7/17"
                    />
                    <FormControlLabel
                      value="S"
                      control={<Radio color="primary" />}
                      label="個別報名主場活動現場編隊 7/17"
                    />
                  </RadioGroup>
                </FormControl>
            }
          />
        </Grid>
        <Grid item xs={12} sm={7} lg={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3}>
              <FormControl required fullWidth={true} error={errors.event_venue ? true : false}>
                <FormLabel>地區</FormLabel>
                <Controller
                  name="event_venue"
                  control={control}
                  rules={{ required: true }}
                  render={
                    ({ field }) =>
                      <TextField
                        select
                        size='small'
                        variant="outlined"
                        {...field}
                      >
                        <MenuItem value={"TP"}>北：台北松山文創園區文化廣場</MenuItem>
                        <MenuItem value={"TC"}>中：台中勤美誠品綠園道</MenuItem>
                        <MenuItem value={"KS"}>南：高雄大魯閣草衙道水驛廣場</MenuItem>
                      </TextField>
                  }
                />
              </FormControl>
            </Grid>
            {watch('event_type') === "G" &&
              <Grid item xs={12} sm={6} lg={3}>
                <FormControl required fullWidth={true} error={errors.event_time ? true : false}>
                  <FormLabel>時間</FormLabel>
                  <Controller
                    name="event_time"
                    control={control}
                    rules={{ required: true }}
                    render={
                      ({ field }) =>
                        <TextField
                          select
                          size='small'
                          variant="outlined"
                          {...field}
                        >
                          <Box display="none">
                            <MenuItem value={"00:00"} />
                          </Box>
                          <MenuItem value={"11:00"}>11:00</MenuItem>
                          <MenuItem value={"12:00"}>12:00</MenuItem>
                          <Box display="none">
                            <MenuItem value={"13:00"}>13:00</MenuItem>
                          </Box>
                          <MenuItem value={"15:00"}>15:00</MenuItem>
                          <MenuItem value={"16:00"}>16:00</MenuItem>
                        </TextField>
                    }
                  />
                </FormControl>
              </Grid>
            }
            {watch('event_type') === "S" &&
              <Grid item xs={12} sm={6} lg={3}>
                <FormControl fullWidth={true}>
                  <FormLabel>時間</FormLabel>
                  <TextField size='small' variant="outlined" value="13:00" disabled />
                </FormControl>
              </Grid>
            }
            {(watch('event_type') === "O" || watch('event_type') === "G") &&
              <>
                <Grid item xs={12} sm={6} lg={3}>
                  <FormControl required fullWidth={true} error={errors.team_size ? true : false}>
                    <FormLabel>組隊人數</FormLabel>
                    <Controller
                      name="team_size"
                      control={control}
                      rules={{ required: true }}
                      render={
                        ({ field }) =>
                          <TextField
                            select
                            size='small'
                            variant="outlined"
                            {...field}
                          >
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                          </TextField>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <FormControl required fullWidth={true} error={errors.event_count ? true : false}>
                    <FormLabel>組數</FormLabel>
                    <Controller
                      name="event_count"
                      control={control}
                      rules={{ required: true }}
                      render={
                        ({ field }) =>
                          <TextField
                            select
                            size='small'
                            variant="outlined"
                            {...field}
                          >
                            {eventCountList.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}
                          </TextField>
                      }
                    />
                  </FormControl>
                </Grid>
              </>
            }
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Step1Content;