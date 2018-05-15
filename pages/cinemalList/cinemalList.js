import getJSON from "../../utils/getJSON.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: [],
    cinemaList: [],
    areaName: null,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...'
    });
    getJSON('/cinemas.json').then(res=>{
      this.setData({
        cinemaList: res.data.data,
        isShow: true,
        areaList: Object.keys(res.data.data)
      });
      if (this.data.areaList.length > 0) {
        this.setData({
          areaName: this.data.areaList[0]
        });
      }
      wx.hideLoading();
    }).catch(err=>{
      console.log(err);
      var that = this;
      wx.showToast({
        title: '获取数据失败',
        icon: "loading",
        success: function () {
          that.setData({
            isLoading: false
          });
        }
      });
    });
  },
  changeAreaList(event) {
    this.setData({
      areaName: event.currentTarget.dataset.areaname
    });
  }
})