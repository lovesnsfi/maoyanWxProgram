import ApiConfig from "../config/ApiConfig.js";
export default function getJSON(url){
  //在微信里面发送请求是使用内置的方法去请求
  return new Promise((resolve,reject)=>{
    wx.request({
      url: ApiConfig.baseURL+url,
      method: 'get',
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}

//这个时候，在这里，我们就封装了一个请求