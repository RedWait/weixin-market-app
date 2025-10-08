// pages/products/products.js
const { getCategories, getProductsByCategory, getAllProducts } = require('./products-data');

Page({
  data: {
    categories: [],
    products: [],
    selectedCategoryId: null,
    loading: false
  },

  onLoad(options) {
    this.loadCategories();
    this.loadAllProducts();
  },

  onShow() {
    // 设置TabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 // 商品页对应的索引
      });
    }
  },

  // 加载分类数据
  loadCategories() {
    const categories = getCategories();
    this.setData({
      categories: categories
    });
  },

  // 加载所有商品
  loadAllProducts() {
    this.setData({
      loading: true
    });
    
    setTimeout(() => {
      const products = getAllProducts();
      this.setData({
        products: products,
        selectedCategoryId: null,
        loading: false
      });
    }, 300);
  },

  // 选择分类
  onCategorySelect(e) {
    const categoryId = e.detail.categoryId;
    
    if (categoryId === this.data.selectedCategoryId) {
      // 如果点击的是已选中的分类，则显示所有商品
      this.loadAllProducts();
    } else {
      // 否则加载该分类下的商品
      this.loadProductsByCategory(categoryId);
    }
  },

  // 根据分类加载商品
  loadProductsByCategory(categoryId) {
    this.setData({
      loading: true
    });
    
    setTimeout(() => {
      const products = getProductsByCategory(categoryId);
      this.setData({
        products: products,
        selectedCategoryId: categoryId,
        loading: false
      });
    }, 300);
  },

  // 点击商品跳转到详情页
  onProductTap(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${productId}`
    });
  },

  // 添加到购物车
  onAddToCart(e) {
    const productId = e.currentTarget.dataset.id;
    const product = this.data.products.find(p => p.id === productId);
    
    if (product) {
      const app = getApp();
      app.addToCart(product, 1);
      
      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1500
      });
    }
  }
});