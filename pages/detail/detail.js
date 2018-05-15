// pages/detail/detail.js
import getJSON from '../../utils/getJSON.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    movieInfo: {},
    hcmts: [],   //热评
    cmts: [],   //普通评论
    dra:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //344929
    console.log(options);
    wx.showLoading({
      title: '正在拼命加载中'
    });
    let movieid = options.movieid;
    var url = `/movie/${movieid}.json`;
    getJSON(url).then(res=>{
      let jsonObj = res.data.data;
      
      this.setData({
        movieInfo: jsonObj.MovieDetailModel,
        isShow: true,
        hcmts: jsonObj.CommentResponseModel.hcmts,
        cmts: jsonObj.CommentResponseModel.cmts
      });
      //电影的标题放在了nm这个属性里面
      wx.setNavigationBarTitle({
        title: jsonObj.MovieDetailModel.nm
      });
      wx.hideLoading();  //隐藏加载动画
    }).catch(err=>{
      console.log(err);
      wx.hideLoading();
      wx.showToast({
        title: '服务器加载数据错误，请返回重试'
      });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})