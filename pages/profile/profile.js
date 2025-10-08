// pages/profile/profile.js
Page({
  data: {
    userInfo: {
      avatarUrl: '/images/default-avatar.png',
      nickName: '未登录',
      isLogin: false
    },
    menuList: [
      {
        icon: '📝',
        title: '我的订单',
        url: '/pages/orders/orders',
        arrow: true
      },
      {
        icon: '📍',
        title: '收货地址',
        url: '/pages/address/address',
        arrow: true
      },
      {
        icon: '♥️',
        title: '我的收藏',
        url: '/pages/favorites/favorites',
        arrow: true
      },
      {
        icon: '📞',
        title: '联系客服',
        url: '',
        arrow: true
      },
      {
        icon: '⚙️',
        title: '设置',
        url: '/pages/settings/settings',
        arrow: true
      }
    ]
  },

  onLoad() {
    this.checkLoginStatus();
  },

  onShow() {
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    // 这里可以检查用户是否已登录
    // 暂时使用默认未登录状态
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: {
          ...userInfo,
          isLogin: true
        }
      });
    }
  },

  // 点击头像登录
  onAvatarTap() {
    if (!this.data.userInfo.isLogin) {
      this.getUserProfile();
    }
  },

  // 获取用户信息
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const userInfo = {
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          isLogin: true
        };
        
        this.setData({
          userInfo: userInfo
        });
        
        // 存储用户信息
        wx.setStorageSync('userInfo', userInfo);
        
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.log('用户取消授权', err);
      }
    });
  },

  // 菜单项点击
  onMenuTap(e) {
    const { url, title } = e.currentTarget.dataset;
    
    if (!url) {
      // 处理特殊菜单项
      if (title === '联系客服') {
        this.contactService();
      }
      return;
    }
    
    // 检查是否需要登录
    if (!this.data.userInfo.isLogin && this.needLogin(title)) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    
    wx.navigateTo({
      url: url,
      fail: () => {
        wx.showToast({
          title: '功能开发中',
          icon: 'none'
        });
      }
    });
  },

  // 判断是否需要登录
  needLogin(title) {
    const loginRequiredMenus = ['我的订单', '收货地址', '我的收藏'];
    return loginRequiredMenus.includes(title);
  },

  // 联系客服
  contactService() {
    wx.showActionSheet({
      itemList: ['在线客服', '电话客服'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 在线客服
          wx.showToast({
            title: '功能开发中',
            icon: 'none'
          });
        } else if (res.tapIndex === 1) {
          // 电话客服
          wx.makePhoneCall({
            phoneNumber: '400-123-4567',
            fail: () => {
              wx.showToast({
                title: '拨打失败',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  },

  // 退出登录
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          this.setData({
            userInfo: {
              avatarUrl: '/images/default-avatar.png',
              nickName: '未登录',
              isLogin: false
            }
          });
          
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  }
});