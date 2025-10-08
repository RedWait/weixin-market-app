// pages/cart/cart.js
Page({
  data: {
    cartItems: [],
    totalPrice: 0,
    totalCount: 0,
    allSelected: false,
    editMode: false
  },

  onLoad() {
    this.loadCartData();
  },

  onShow() {
    this.loadCartData();
  },

  // 加载购物车数据
  loadCartData() {
    const app = getApp();
    const cartItems = app.getCartItems();
    
    this.setData({
      cartItems: cartItems
    });
    
    this.calculateTotal();
    this.checkAllSelected();
  },

  // 计算总价和总数量
  calculateTotal() {
    const { cartItems } = this.data;
    let totalPrice = 0;
    let totalCount = 0;
    
    cartItems.forEach(item => {
      if (item.selected) {
        totalPrice += item.price * item.quantity;
        totalCount += item.quantity;
      }
    });
    
    this.setData({
      totalPrice: totalPrice.toFixed(2),
      totalCount: totalCount
    });
  },

  // 检查是否全选
  checkAllSelected() {
    const { cartItems } = this.data;
    const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
    
    this.setData({
      allSelected: allSelected
    });
  },

  // 切换单个商品选中状态
  onItemSelect(e) {
    const index = e.currentTarget.dataset.index;
    const app = getApp();
    const cartItems = [...this.data.cartItems];
    
    cartItems[index].selected = !cartItems[index].selected;
    app.updateCartItemSelected(cartItems[index].id, cartItems[index].selected);
    
    this.setData({
      cartItems: cartItems
    });
    
    this.calculateTotal();
    this.checkAllSelected();
  },

  // 全选/取消全选
  onSelectAll() {
    const { cartItems, allSelected } = this.data;
    const app = getApp();
    const newSelected = !allSelected;
    
    cartItems.forEach(item => {
      item.selected = newSelected;
      app.updateCartItemSelected(item.id, newSelected);
    });
    
    this.setData({
      cartItems: cartItems,
      allSelected: newSelected
    });
    
    this.calculateTotal();
  },

  // 更新商品数量
  onQuantityChange(e) {
    const index = e.currentTarget.dataset.index;
    const type = e.currentTarget.dataset.type;
    const app = getApp();
    const cartItems = [...this.data.cartItems];
    const item = cartItems[index];
    
    if (type === 'decrease' && item.quantity > 1) {
      item.quantity--;
    } else if (type === 'increase') {
      item.quantity++;
    }
    
    app.updateCartItemQuantity(item.id, item.quantity);
    
    this.setData({
      cartItems: cartItems
    });
    
    this.calculateTotal();
  },

  // 数量输入
  onQuantityInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = parseInt(e.detail.value) || 1;
    const app = getApp();
    const cartItems = [...this.data.cartItems];
    
    cartItems[index].quantity = Math.max(1, value);
    app.updateCartItemQuantity(cartItems[index].id, cartItems[index].quantity);
    
    this.setData({
      cartItems: cartItems
    });
    
    this.calculateTotal();
  },

  // 删除单个商品
  onDeleteItem(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.cartItems[index];
    
    wx.showModal({
      title: '提示',
      content: '确定要删除该商品吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          app.removeFromCart(item.id);
          this.loadCartData();
        }
      }
    });
  },

  // 切换编辑模式
  onToggleEditMode() {
    this.setData({
      editMode: !this.data.editMode
    });
  },

  // 批量删除选中商品
  onBatchDelete() {
    const selectedItems = this.data.cartItems.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请选择要删除的商品',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '提示',
      content: `确定要删除选中的${selectedItems.length}件商品吗？`,
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          selectedItems.forEach(item => {
            app.removeFromCart(item.id);
          });
          this.loadCartData();
          this.setData({
            editMode: false
          });
        }
      }
    });
  },

  // 去结算
  onCheckout() {
    const selectedItems = this.data.cartItems.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请选择要结算的商品',
        icon: 'none'
      });
      return;
    }
    
    // 将选中的商品存储到本地，用于结算页面
    wx.setStorageSync('checkoutItems', selectedItems);
    
    // 跳转到结算页面（这里暂时显示提示）
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 继续购物
  onContinueShopping() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 跳转到商品详情
  onGoToDetail(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${productId}`
    });
  }
});