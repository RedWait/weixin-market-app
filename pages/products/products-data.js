// 商品数据模块
// 从 productsMock.json 转换而来，用于微信小程序

const productsData = {
  "categories": [
    {
      "id": 1,
      "name": "饮料",
      "icon": "🥤",
      "sort_order": 1
    },
    {
      "id": 2,
      "name": "零食",
      "icon": "🍿",
      "sort_order": 2
    },
    {
      "id": 3,
      "name": "日用品",
      "icon": "🧴",
      "sort_order": 3
    },
    {
      "id": 4,
      "name": "生鲜食品",
      "icon": "🥬",
      "sort_order": 4
    },
    {
      "id": 5,
      "name": "烟酒",
      "icon": "🍺",
      "sort_order": 5
    },
    {
      "id": 6,
      "name": "方便食品",
      "icon": "🍜",
      "sort_order": 6
    },
    {
      "id": 7,
      "name": "文具用品",
      "icon": "✏️",
      "sort_order": 7
    }
  ],
  "products": [
    {
      "id": 1,
      "categoryId": 1,
      "name": "可口可乐",
      "description": "经典可乐，330ml罐装",
      "price": 3.5,
      "stock": 100,
      "unit": "罐",
      "brand": "可口可乐",
      "images": [
        "/images/placeholder.png",
        "/images/placeholder.png",
        "/images/placeholder.png"
      ],
      "status": 1,
      "specs": [
        {
          "name": "规格",
          "options": ["330ml", "500ml", "1.25L"]
        },
        {
          "name": "包装",
          "options": ["罐装", "瓶装"]
        }
      ],
      "detailInfo": {
        "productionDate": "2024-01-15",
        "expiryDate": "2024-07-15",
        "origin": "中国",
        "manufacturer": "可口可乐(中国)饮料有限公司",
        "ingredients": "水、白砂糖、二氧化碳、焦糖色、磷酸、天然香料、咖啡因",
        "nutrition": {
          "energy": "180kJ/100ml",
          "protein": "0g",
          "fat": "0g",
          "carbohydrate": "10.6g",
          "sodium": "10mg"
        }
      },
      "detailDescription": "可口可乐，诞生于1886年美国亚特兰大，是全球最受欢迎的碳酸饮料之一。独特的配方和经典的口感，为您带来清爽愉悦的饮用体验。无论是聚会、用餐还是休闲时光，可口可乐都是您的完美选择。"
    }
  ]
};

// 根据商品ID获取商品详情
function getProductById(productId) {
  const id = parseInt(productId);
  return productsData.products.find(product => product.id === id);
}

// 根据分类ID获取商品列表
function getProductsByCategory(categoryId) {
  const id = parseInt(categoryId);
  return productsData.products.filter(product => product.categoryId === id && product.status === 1);
}

// 获取所有分类
function getCategories() {
  return productsData.categories;
}

// 获取所有商品
function getAllProducts() {
  return productsData.products.filter(product => product.status === 1);
}

module.exports = {
  productsData,
  getProductById,
  getProductsByCategory,
  getCategories,
  getAllProducts
};