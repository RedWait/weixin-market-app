Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#0052d9",
    cartCount: 0, // 购物车数量
    list: [
      {
        pagePath: "/pages/products/products",
        iconPath: "shop",
        selectedIconPath: "shop",
        text: "商品"
      },
      {
        pagePath: "/pages/cart/cart",
        iconPath: "cart",
        selectedIconPath: "cart",
        text: "购物车"
      },
      {
        pagePath: "/pages/profile/profile",
        iconPath: "user",
        selectedIconPath: "user",
        text: "我的"
      }
    ]
  },

  lifetimes: {
    attached() {
      // 组件初始化时更新购物车数量
      this.updateCartCount();
    }
  },

  methods: {
    // 更新购物车数量
    updateCartCount() {
      const app = getApp();
      if (app && app.getCartTotalCount) {
        const cartCount = app.getCartTotalCount();
        this.setData({ cartCount });
      }
    },
    
    onChange(e) {
      console.log('TabBar onChange event:', e.detail)
      const selectedText = e.detail.value
      
      // 根据文本值找到对应的索引
      const index = this.data.list.findIndex(item => item.text === selectedText)
      
      // 检查索引是否有效
      if (index === -1) {
        console.error('Tab not found for text:', selectedText)
        return
      }
      
      const item = this.data.list[index]
      
      // 检查item是否存在
      if (!item || !item.pagePath) {
        console.error('Invalid tab item:', item)
        return
      }
      
      wx.switchTab({ 
        url: item.pagePath,
        fail: (err) => {
          console.error('Failed to switch tab:', err)
        }
      })
    },

    onTabTap(e) {
      console.log('TabBar onTabTap event:', e)
      const index = e.currentTarget.dataset.index
      
      // 检查索引是否有效
      if (index < 0 || index >= this.data.list.length) {
        console.error('Invalid tab index:', index)
        return
      }
      
      const item = this.data.list[index]
      
      // 检查item是否存在
      if (!item || !item.pagePath) {
        console.error('Invalid tab item:', item)
        return
      }
      
      this.setData({ selected: index })
      
      wx.switchTab({ 
        url: item.pagePath,
        fail: (err) => {
          console.error('Failed to switch tab:', err)
        }
      })
    }
  }
})