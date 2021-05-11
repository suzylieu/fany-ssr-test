import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import apis from '../../redux/apis';

const ThirtyHF = () => {
  const md5_key = 'Bg9QCgeH3b';

  useEffect(() => {
    apis.fetachGetCampList()
  }, []);

  return (
    <div>
      <div>ThirtyHFpage12</div><Link to="/return">To Return page</Link>
      <form id="form" method="post" action="https://i-payment-test.worldvision.org.tw/API/Activity_cart.aspx">
        <div  >
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
          {/* <input type="text" name="reUrl" id="reUrl" value="https://m-test.worldvision.org.tw/shopPost.aspx?" /><br /> */}
          <input type="text" name="reUrl" id="reUrl" value="http://192.168.120.17:3000/return"/><br />
          <input type="text" name="SourceURL" id="SourceURL" value="https://m-test.worldvision.org.tw/shopPost.aspx" /><br />
          <input type="text" name="code" id="code" value="02C77535EC30EE8B8E9916945D341B1A" /><br />
          <input type="text" name="receipt" id="receipt" value="3" /><br />
          <input type="text" name="receipt_name" id="receipt_name" value="fany測試" /><br />
        </div>
      </form>
    </div>
    
  );
};

export default ThirtyHF;