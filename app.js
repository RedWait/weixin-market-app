// app.js
App({
  globalData: {
    cartItems: [], // 购物车商品列表
    cartTotalCount: 0 // 购物车商品总数量
  },

  // 添加商品到购物车
  addToCart(product, quantity = 1) {
    const existingItem = this.globalData.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      // 如果商品已存在，增加数量
      existingItem.quantity += quantity;
    } else {
      // 如果商品不存在，添加新商品，默认选中状态
      this.globalData.cartItems.push({
        ...product,
        quantity: quantity,
        selected: true // 新加入的商品默认选中
      });
    }
    
    this.updateCartTotalCount();
    this.notifyCartUpdate();
  },

  // 更新购物车商品数量
  updateCartItemQuantity(productId, quantity) {
    const item = this.globalData.cartItems.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        // 如果数量为0或负数，从购物车中移除
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.updateCartTotalCount();
        this.notifyCartUpdate();
      }
    }
  },

  // 更新购物车商品选中状态
  updateCartItemSelected(productId, selected) {
    const item = this.globalData.cartItems.find(item => item.id === productId);
    if (item) {
      item.selected = selected;
      this.notifyCartUpdate();
    }
  },

  // 从购物车移除商品
  removeFromCart(productId) {
    this.globalData.cartItems = this.globalData.cartItems.filter(item => item.id !== productId);
    this.updateCartTotalCount();
    this.notifyCartUpdate();
  },

  // 清空购物车
  clearCart() {
    this.globalData.cartItems = [];
    this.globalData.cartTotalCount = 0;
    this.notifyCartUpdate();
  },

  // 更新购物车总数量
  updateCartTotalCount() {
    this.globalData.cartTotalCount = this.globalData.cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  },

  // 通知页面和TabBar更新
  notifyCartUpdate() {
    // 更新TabBar徽章
    this.updateTabBarBadge();
    
    // 通知所有页面更新购物车数据
    const pages = getCurrentPages();
    pages.forEach(page => {
      if (page.onCartUpdate && typeof page.onCartUpdate === 'function') {
        page.onCartUpdate();
      }
    });
  },

  // 更新TabBar徽章
  updateTabBarBadge() {
    const totalCount = this.getCartTotalCount();
    
    // 获取当前页面栈中的页面
    const pages = getCurrentPages();
    if (pages.length > 0) {
      const currentPage = pages[pages.length - 1];
      
      // 通过当前页面获取TabBar实例并更新
      if (currentPage && typeof currentPage.getTabBar === 'function') {
        const tabBar = currentPage.getTabBar();
        if (tabBar && typeof tabBar.updateCartCount === 'function') {
          tabBar.updateCartCount();
        }
      }
    }
  },

  // 获取购物车商品列表
  getCartItems() {
    return this.globalData.cartItems;
  },

  // 获取购物车总数量
  getCartTotalCount() {
    return this.globalData.cartTotalCount;
  }
})