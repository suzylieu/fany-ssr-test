import axios from "axios";
import queryString from "query-string";

const fetcher = axios.create({
  timeout: 10 * 60 * 1000,
  dataType: 'json',
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

const apis = {
  fetachGetCampList: () =>
    fetcher.get('https://ext-api.worldvision.org.tw/v1/30hf/32/camp-search'),

  fetchPostCampVerify: (payload) =>
    fetcher.post(`https://ext-api.worldvision.org.tw/v1/30hf/32/user-verify?${queryString.stringify(payload)}`),

  fetchPostUserCreate: (formData) =>
    fetcher.post('https://ext-api.worldvision.org.tw/v1/30hf/32/user-create', formData)
};

export default apis;