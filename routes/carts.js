const express = require("express")
const Cart = require("../schemas/cart.js")
const Goods = require("../schemas/goods.js")
const router = express.Router()

// localhost:3000/api/carts GET Method
router.get("/carts", async(req, res) => {
  const carts = await Cart.find({})
  // [
    //{goodsId, quantity}
  //]
  const goodsIds = carts.map((cart) => {
     cart.goodsId
  })
  const goods = await Goods.find({goodsId: goodsIds})
  // Goods에 해당하는 모든 정보를 가지고 올건데,
  // 만약 GoodsIds 변수 안에 존재하는 값일 때에만 조회하라.

  const result = carts.map((cart) => {
    return {
      "quantity": cart.quantity,
      "goods": goods.find((item) => item.goodsId === cart.goodsId),
    }
  })
  
  res.json({
    "carts": result,
  })
})

module.exports = router