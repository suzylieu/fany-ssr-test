import React, { useEffect } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetachGetCampList } from "../../redux/actions";

import moment from 'moment';
import md5 from 'md5';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Step1Content from './Step1Content';
import Step2Content from './Step2Content';
import Step3Content from './Step3Content';

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
  event_count: '',
  name: '',
  gender: '',
  email: '',
  emailCheck: '',
  mobile: '',
  city: '台北市',
  area: '中正區',
  address: '',
  diyStatus: '',
  payment_method: '',
  diyInfo: null,
}

const ThirtyHF = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const camps = useSelector(state => state.camps);
  const step = useSelector(state => state.step)
console.log(step)

  useEffect(() => {
    dispatch(fetachGetCampList());
  }, []);


  const handlePost = () => {
    
  }

  const handleValid = () => {
   
  };

  const handleBack = () => {
    dispatch(setDiyStatus(0))
    dispatch(setStepBack(step))
  };

  const handleNext = async () => {
    if (step === 0) {
      dispatch(setStepNext(step));
    }
    else {
      dispatch(setStepNext(step));
    }
  };

  const renderBtn = () => {
  };

  return (
    <form action="https://i-payment-test.worldvision.org.tw/API/Activity_Cart.aspx" method="post" id="form">
        <Stepper activeStep={step} orientation="vertical">
          {stepsLabel.map((label, index) => {
            const labelProps = {};
            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                <StepContent>
                  {index === 0 && <Step1Content/>}
                  {index === 1 && <Step2Content/>}
                  {index === 2 && <Step3Content/>}
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
  );
};

export default ThirtyHF;