import React from 'react';
import { Controller } from "react-hook-form";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { cities, districts, zipCodes } from "../../components/TwAdress";
import DateFnsUtils from "@date-io/date-fns";

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Autocomplete from '@material-ui/lab/Autocomplete';

import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme =>
  createStyles({
    formControl: {
      "& .MuiInputAdornment-root .MuiButtonBase-root": {
        padding: '0px'
      },
    },
  }),
);

const Step2Content = ({ control, errors, watch, setValue }) => {
  const classes = useStyles();
  const camps = useSelector(state => state.camps);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={2}>
          <FormControl required fullWidth={true} error={errors.name ? true : false} className={classes.formControl} >
            <FormLabel>名字</FormLabel>
            <Controller name="name" control={control} rules={{ required: "請填寫名字！" }} render={({ field }) => <TextField size='small' variant="outlined" {...field} />} />
            {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} lg={2}>
          <FormControl required fullWidth={true} error={errors.gender ? true : false} className={classes.formControl}>
            <FormLabel >性別</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="gender"
              render={
                ({ field }) =>
                  <RadioGroup row  {...field}>
                    <FormControlLabel value={"1"} control={<Radio color="primary" />} label="男" />
                    <FormControlLabel value={"0"} control={<Radio color="primary" />} label="女" />
                  </RadioGroup>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} lg={2}>
          <FormControl required fullWidth={true} error={errors.birthday ? true : false} className={classes.formControl} >
            <FormLabel >生日</FormLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Controller
                name="birthday"
                control={control}
                rules={{ required: true, validate: { checkbirthday: val => !isNaN(val.getTime()) } }}
                render={({ field: { ref, ...rest } }) => (
                  <KeyboardDatePicker
                    inputVariant="outlined"
                    format="yyyy-MM-dd"
                    openTo="year"
                    maxDate={new Date()}
                    invalidDateMessage="日期格式錯誤"
                    maxDateMessage="日期不能超過今天"
                    InputAdornmentProps={{ position: "start", variant: 'standard' }}
                    size='small'
                    {...rest}
                  />
                )}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <FormControl required fullWidth={true} error={errors.email ? true : false}>
            <FormLabel>email</FormLabel>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "請填寫信箱",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'email格式錯誤'
                }
              }}
              render={({ field }) => <TextField size='small' variant="outlined" {...field} />}
            />
            {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <FormControl required fullWidth={true} error={errors.emailCheck ? true : false}>
            <FormLabel>email</FormLabel>
            <Controller
              name="emailCheck"
              control={control}
              rules={{
                required: "請填寫信箱",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'email格式錯誤'
                },
                validate: {
                  checkEmail: val => val === watch('email') || 'email輸入不一致'
                }
              }}
              render={({ field }) => <TextField size='small' variant="outlined" placeholder="請再輸入一次，以便確認" {...field} />}
            />
            {errors.emailCheck && <FormHelperText>{errors.emailCheck.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} lg={2}>
          <FormControl required fullWidth={true} error={errors.phone ? true : false}>
            <FormLabel>電話</FormLabel>
            <Controller name="mobile" control={control} rules={{ required: true }} render={({ field }) => <TextField size='small' variant="outlined" {...field} />} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3} lg={2}>
          <FormControl required fullWidth={true}>
            <FormLabel>縣市</FormLabel>
            <Controller
              name="city"
              control={control}
              render={
                ({ field }) =>
                  <TextField
                    select
                    size='small'
                    variant="outlined"
                    {...field}
                  >
                    {cities.map((city, i) => {
                      return (
                        <MenuItem value={city} key={i}>
                          {city}
                        </MenuItem>
                      );
                    })}
                  </TextField>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3} lg={2}>
          <FormControl required fullWidth={true} error={errors.area ? true : false}>
            <FormLabel>鄉鎮市區</FormLabel>
            <Controller
              name="area"
              control={control}
              rules={{
                validate: {
                  checkZipCode: val => zipCodes[watch('city')][watch('area')] !== undefined
                }
              }}
              render={
                ({ field }) =>
                  <TextField
                    select
                    size='small'
                    variant="outlined"
                    {...field}
                  >
                    {districts[watch('city')].map((district, i) => {
                      return (
                        <MenuItem value={district} key={i}>
                          {district}
                        </MenuItem>
                      );
                    })}
                  </TextField>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2} lg={1}>
          <FormControl required fullWidth={true} variant="outlined">
            <FormLabel>郵遞區號</FormLabel>
            <TextField
              size="small"
              disabled
              variant="outlined"
              value={zipCodes[watch('city')][watch('area')] || ''}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={5}>
          <FormControl required fullWidth={true} error={errors.address ? true : false}>
            <FormLabel>地址{<span style={{color:'#ff0000'}}>(地址為寄送收據及遊戲盒所需)</span>}</FormLabel>
            <Controller name="address" control={control} rules={{ required: true }} render={({ field }) => <TextField size='small' variant="outlined" {...field} />} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} lg={2}>
          <FormControl required fullWidth={true} error={errors.diyStatus ? true : false} variant="outlined">
            <FormLabel>是否參與過DIY</FormLabel>
            <Controller
              name="diyStatus"
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
                    <MenuItem value={0}>No DIY</MenuItem>
                    <MenuItem value={1}>DIY Home</MenuItem>
                    <MenuItem value={2}>DIY Camp</MenuItem>
                  </TextField>
              }
            />
          </FormControl>
        </Grid>
        {watch('diyStatus') === 2 &&
          <Grid item xs={12} sm={8} lg={5}>
            <FormControl required fullWidth={true} error={errors.diyInfo ? true : false} variant="outlined">
              <FormLabel>Search DIY Camp</FormLabel>
              <Controller
                name="diyInfo"
                control={control}
                rules={{ required: watch('diyStatus') === 2 ? true : false }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={camps}
                    getOptionLabel={(option) => `${option.Camp_Number} ${option.Camp_Name}`}
                    onChange={(e, value) => { setValue('diyInfo', value) }}
                    renderInput={(params) => {
                      params.InputProps.startAdornment = (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      );
                      return (
                        <TextField {...params} required size='small' variant="outlined" />
                      )
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        }
      </Grid>
    </Box>
  )
}

export default Step2Content;