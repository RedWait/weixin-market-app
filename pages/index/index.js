// pages/index/index.js
Page({
  data: {
    
  },

  onLoad(options) {
    
  },

  onShow() {
    // 设置TabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 // 首页对应的索引
      });
    }
  }
});