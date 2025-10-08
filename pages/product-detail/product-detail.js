// pages/product-detail/product-detail.js
const { getProductById } = require('../products/products-data');

Page({
  data: {
    product: null,
    selectedImageIndex: 0,
    quantity: 1,
    selectedSpecs: {},
    loading: true,
    showSpecModal: false,
    actionType: '' // 'cart' 或 'buy'
  },

  onLoad(options) {
    const productId = options.id;
    if (productId) {
      this.loadProductDetail(productId);
    }
  },

  // 加载商品详情
  loadProductDetail(productId) {
    this.setData({
      loading: true
    });
    
    setTimeout(() => {
      const product = getProductById(productId);
      if (product) {
        this.setData({
          product: product,
          loading: false
        });
      } else {
        wx.showToast({
          title: '商品不存在',
          icon: 'error'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    }, 500);
  },

  // 轮播图变化
  onSwiperChange(e) {
    this.setData({
      selectedImageIndex: e.detail.current
    });
  },

  // 预览图片
  onImagePreview(e) {
    const current = e.currentTarget.dataset.src;
    const urls = this.data.product.images;
    
    wx.previewImage({
      current: current,
      urls: urls
    });
  },

  // 减少数量
  onQuantityDecrease() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },

  // 增加数量
  onQuantityIncrease() {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },

  // 数量输入
  onQuantityInput(e) {
    const value = parseInt(e.detail.value) || 1;
    this.setData({
      quantity: Math.max(1, value)
    });
  },

  // 数量步进器变化
  onStepperChange(e) {
    this.setData({
      quantity: e.detail.value
    });
  },

  // 选择规格
  onSpecSelect(e) {
    const { specName, option } = e.currentTarget.dataset;
    const selectedSpecs = { ...this.data.selectedSpecs };
    selectedSpecs[specName] = option;
    
    this.setData({
      selectedSpecs: selectedSpecs
    });
  },

  // 显示规格选择模态框
  showSpecModal(actionType) {
    this.setData({
      showSpecModal: true,
      actionType: actionType
    });
  },

  // 隐藏规格选择模态框
  hideSpecModal() {
    this.setData({
      showSpecModal: false
    });
  },

  // 确认规格选择
  onConfirmSpec() {
    const { product, quantity, selectedSpecs, actionType } = this.data;
    
    // 检查是否选择了所有规格
    if (product.specs && product.specs.length > 0) {
      for (let spec of product.specs) {
        if (!selectedSpecs[spec.name]) {
          wx.showToast({
            title: `请选择${spec.name}`,
            icon: 'none'
          });
          return;
        }
      }
    }
    
    this.hideSpecModal();
    
    if (actionType === 'cart') {
      this.addToCart();
    } else if (actionType === 'buy') {
      this.buyNow();
    }
  },

  // 加入购物车
  onAddToCart() {
    if (this.data.product.specs && this.data.product.specs.length > 0) {
      this.showSpecModal('cart');
    } else {
      this.addToCart();
    }
  },

  addToCart() {
    const { product, quantity } = this.data;
    const app = getApp();
    app.addToCart(product, quantity);
    
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  },

  // 立即购买
  onBuyNow() {
    if (this.data.product.specs && this.data.product.specs.length > 0) {
      this.showSpecModal('buy');
    } else {
      this.buyNow();
    }
  },

  buyNow() {
    const { product, quantity, selectedSpecs } = this.data;
    
    // 将商品信息存储到本地，用于结算页面
    const orderItem = {
      ...product,
      quantity: quantity,
      selectedSpecs: selectedSpecs,
      selected: true
    };
    
    wx.setStorageSync('immediateOrder', [orderItem]);
    
    // 跳转到结算页面（这里暂时显示提示）
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 联系客服
  onContactService() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 收藏/取消收藏
  onToggleFavorite() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 分享
  onShare() {
    return {
      title: this.data.product.name,
      path: `/pages/product-detail/product-detail?id=${this.data.product.id}`
    };
  }
});