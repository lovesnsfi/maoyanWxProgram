// components/movieItem/movieItem.js
Component({
  /**
   * 组件的属性列表
   * props
   */
  properties: {
    item:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   * 小程序的页面的方法是直接写在对象下在，而在组件时面，它是写在methods下面
   */
  methods: {
    getMovieDetail(event){
      let movieid = event.currentTarget.dataset.movieid;
      wx.navigateTo({
        url: '/pages/detail/detail?movieid=' + movieid
      });
    }
  }
})
