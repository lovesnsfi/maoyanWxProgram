import getJSON from "../../utils/getJSON.js";
import "../../libs/date-utils.min.js";   //导入日期处理插件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    movieList:[],
    hasNext:false
  },
 
  /**
   * 生命周期函数--监听页面加载
   * 加载的时候，我们就去请求数据 
   */
  onLoad: function (options) {
    //在这个地方，我要去请求数据
    wx.showLoading({
      title: '正在加载'
    });
    var movieListStorage=wx.getStorageSync("movieList");
    var d=new Date();  //当前时间
    if (movieListStorage != "" && d.addHours(2).isAfter(new Date(movieListStorage.lastGetDate))){
       this.setData({
         movieList:movieListStorage.movieList,
         hasNext:movieListStorage.hasNext
       }); 
       wx.hideLoading();
    }
    else{
      var limit = this.data.pageIndex * 10;
      var offset = (this.data.pageIndex - 1) * 10;
      var url = `/movie/list.json?type=hot&offset=${offset}&limit=${limit}`;
      getJSON(url).then(res => {
        this.setData({
          movieList: res.data.data.movies,
          hasNext: res.data.data.hasNext
        }); 
        var obj=Object.assign({},this.data);
        obj.lastGetDate=Date.now();
        wx.setStorageSync("movieList", obj);
        wx.hideLoading();
      }).catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: '服务器出错了'
          });
      });
    }
  },
  getNextPage(){
    console.log("上拉加载");
    if(!this.data.hasNext){
      return;
    }
    wx.showLoading({
      title: '正在加载'
    });
    var nextPageIndex=this.data.pageIndex+1;
    var limit = nextPageIndex * 10;
    var offset = (nextPageIndex - 1) * 10;
    var url = `/movie/list.json?type=hot&offset=${offset}&limit=${limit}`;
    getJSON(url).then(res => {
      this.setData({
        movieList: this.data.movieList.concat(res.data.data.movies),
        hasNext: res.data.data.hasNext,
        pageIndex:nextPageIndex
      });
      var obj = Object.assign({}, this.data);
      obj.lastGetDate = Date.now();
      wx.setStorageSync("movieList", obj);
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '服务器出错了'
      });
    });
  },
  reload(){

    //在这个地方，我要去请求数据
    this.setData({
      pageIndex:1
    });
    wx.removeStorageSync("movieList");
    wx.showLoading({
      title: '正在加载'
    });
    var movieListStorage = wx.getStorageSync("movieList");
    var d = new Date();  //当前时间
    if (movieListStorage != "" && d.addHours(2).isAfter(new Date(movieListStorage.lastGetDate))) {
      this.setData({
        movieList: movieListStorage.movieList,
        hasNext: movieListStorage.hasNext
      });
      wx.hideLoading();
    }
    else {
      var limit = this.data.pageIndex * 10;
      var offset = (this.data.pageIndex - 1) * 10;
      var url = `/movie/list.json?type=hot&offset=${offset}&limit=${limit}`;
      getJSON(url).then(res => {
        this.setData({
          movieList: res.data.data.movies,
          hasNext: res.data.data.hasNext
        });
        var obj = Object.assign({}, this.data);
        obj.lastGetDate = Date.now();
        wx.setStorageSync("movieList", obj);
        wx.hideLoading();
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '服务器出错了'
        });
      });
    }
  }
})