import React, { useEffect } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetachGetCampList, fetachPostCampVerify, setStepNext, setStepBack, setDialogOpen } from "../../redux/actions";

import moment from 'moment';
import md5 from 'md5';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Step1Content from './Step1Content';
import Step2Content from './Step2Content';
import Step3Content from './Step3Content';
import ThirtyHFDialog from './ThirtyHFDialog';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    }
  }),
);

const stepsLabel = ['請選擇活動類型', '請填寫報名者資料', '請選擇付款方式'];

const defaultValues = {
  event_type: '',
  event_venue: '',
  event_time: '',
  team_size: '',
  event_count: 1,
  name: '',
  gender: '',
  email: '',
  emailCheck: '',
  mobile: '',
  city: '台北市',
  area: '中正區',
  address: '',
  diyType: '',
  payment_method: '',
  diyInfo: null,
}

const ThirtyHF = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const step = useSelector(state => state.step)

  const { control, formState: { errors }, watch, setValue, trigger, getValues } = useForm({ mode: "onChange", defaultValues });

  useEffect(() => {
    dispatch(fetachGetCampList());
  }, []);


  const handlePost = () => {

  }

  const handleValid = async () => {
    const payload = {
      name: getValues('name'),
      birth: moment(getValues('birthday')).format('YYYY-MM-DD'),
      email: getValues('email'),
      diy_status: getValues('diyType').toString(),
      camp_name: getValues('diyInfo') ? getValues('diyInfo').Camp_Name : "",
      camp_number: getValues('diyInfo') ? getValues('diyInfo').Camp_Number : "",
    }
    await trigger()
    if (Object.keys(errors).length === 0) {
      dispatch(fetachPostCampVerify({ ...payload }))
      // apis.fetchPostCampVerify()
      //   .then((response) => {
      //     if (response.request.readyState === 4 && response.status === 200) {
      //       dispatch(setDiyStatus(response.data.diy_status))
      //       dispatch(setTotalPrice({ eventType: getValues('event_type'), eventCount: getValues('event_count'), teamSize: getValues('team_size'), diyStatus: response.data.diy_status }))
      //     } else {
      //       console.log("error");
      //     }
      //   });
      dispatch(setDialogOpen(true));
    }
  };

  const handleNext = async () => {
    if (step === 0) {
      dispatch(setStepNext(step));
    }
    else {
      await trigger()
      // if (Object.keys(errors).length === 0) {
      // dispatch(setTotalPrice({ eventType: getValues('event_type'), teamSize: getValues('team_size'), eventCount: getValues('event_count') }))
      dispatch(setStepNext(step));
      // }
    }
  };

  const handleBack = () => {
    dispatch(setStepBack(step))
  };

  //stepper valid
  const isStepFailed = (step) => {
    if (step === 0) {
      if (errors.event_type || errors.event_venue || errors.event_time || errors.team_size || errors.event_count) {
        return step === 0
      }
    }
    if (step === 1) {
      if (errors.name || errors.gender || errors.birthday || errors.email || errors.emailCheck || errors.mobile || errors.city || errors.area || errors.address || errors.diyType || errors.diyInfo) {
        return step === 1
      }
    }
  };

  const renderBtn = () => {
    if (step === 0 || (step === 1 && watch('diyType') === 0)) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          下一步
        </Button>
      )
    }
    if (step === 1 && watch('diyType') !== 0) {
      return (
        <Button variant="contained" color="primary" onClick={handleValid}>
          驗證報名資料
        </Button>
      )
    }
    if (step === 2) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handlePost}
          className={classes.button}
        >
          送出
        </Button>
      )
    }
  };

  return (
    <>
      <ThirtyHFDialog watch={watch} />
      <Box border={1} borderColor="#f37024" borderRadius={5} m={2} p={2}>
        <Typography color="primary">重要注意事項：</Typography>
        <Typography>1.《莎瑪》遊戲盒將於2021.07.15起按捐款順序依序出貨。</Typography>
        <Typography>2.遊玩期限：2022.08.31 止。本遊戲為一次性體驗，無法重複遊玩。</Typography>
        <Typography>3.玩家須自備智慧型手機和網路，為獲得最佳遊戲體驗，請將瀏覽器更新至最新版本；另外，本遊戲不支援平板電腦與 iPhone 6 以下手機。</Typography>
      </Box>
      <form action="https://i-payment-test.worldvision.org.tw/API/Activity_Cart.aspx" method="post" id="form">
        <Stepper activeStep={step} orientation="vertical">
          {stepsLabel.map((label, index) => {
            const labelProps = {};
            if (isStepFailed(index)) {
              labelProps.error = true;
            }
            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                <StepContent>
                  {index === 0 && <Step1Content control={control} errors={errors} watch={watch} setValue={setValue} />}
                  {index === 1 && <Step2Content control={control} errors={errors} watch={watch} setValue={setValue} />}
                  {index === 2 && <Step3Content control={control} getValues={getValues} />}
                  <Box mb={2}>
                    <Button
                      disabled={step === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      上一步
                   </Button>
                    {renderBtn()}
                  </Box>
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
        <button type="submit">送出</button><br />
        <input type="text" name="lang" id="lang" value="tw" /> <br />
        <input type="text" name="tag" id="tag" value="11" /> <br />
        <input type="text" name="pkey" id="pkey" value="20210507100414" /><br />
        <input type="text" name="issp20" id="issp20" value="0" /><br />
        <input type="text" name="url" id="url" value="https://m-test.worldvision.org.tw/shopPost.aspx" /><br />
        <input type="text" name="name" id="name" value="fany測試" /><br />
        <input type="text" name="mobile" id="mobile" value="0900000000" /><br />
        <input type="text" name="birth" id="birth" value="2021/05/03" /><br />
        <input type="text" name="tel" id="tel" value="" /><br />
        <input type="text" name="oversea" id="oversea" value="0" /><br />
        <input type="text" name="gender" id="gender" value="0" /><br />
        <input type="text" name="idno" id="idno" value="F200000017" /><br />
        <input type="text" name="mail" id="mail" value="fany_lin@worldvision.org.tw" /><br />
        <input type="text" name="zipcode" id="zipcode" value="105" /><br />
        <input type="text" name="city" id="city" value="台北市" /><br />
        <input type="text" name="area" id="area" value="松山區" /><br />
        <input type="text" name="address" id="address" value="民生東路4段133號6F" /><br />
        <input type="text" name="payment" id="payment" value="3" /><br />
        <input type="text" name="rPayment" id="rPayment" value="" /><br />
        <input type="text" name="isEncrypt" id="isEncrypt" value="0" /><br />

        <input type="text" name="Credit" id="Credit" value="" /><br />
        <input type="text" name="ATMBank" id="ATMBank" value="{}" /><br />
        <input type="text" name="act_item" id="act_item" value="[{'id':'157','remarks':'','item':[{'id':'1379','qty':'1','price':'333','deduction':'0','url':'https://m-test.worldvision.org.tw/donate_shop.aspx','parameter':'ID=157&637560004826280222&'}],'islocked':'0'}]" /><br />
        <input type="text" name="prod_item" id="prod_item" value="[]" /><br />
        <input type="text" name="reUrl" id="reUrl" value="http://192.168.120.17:3000/clubon-return" /><br />
        <input type="text" name="SourceURL" id="SourceURL" value="https://m-test.worldvision.org.tw/shopPost.aspx" /><br />
        <input type="text" name="code" id="code" value="02C77535EC30EE8B8E9916945D341B1A" /><br />
        <input type="text" name="receipt" id="receipt" value="3" /><br />
        <input type="text" name="receipt_name" id="receipt_name" value="fany測試" />
      </form>
    </>
  );
};

export default ThirtyHF;