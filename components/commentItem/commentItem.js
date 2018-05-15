// components/commentItem/commentItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "commentItem": {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fullCount: 0,
    half: false
  },

  attached(){
    var fullCount = 0;
    var half = false;
    if (parseInt(this.data.commentItem.score) != this.data.commentItem.score) {
      fullCount = parseInt(this.data.commentItem.score);
      half = true;
    }
    else {
      fullCount = this.data.commentItem.score;
    }
    this.setData({
      fullCount: fullCount,
      half: half
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
