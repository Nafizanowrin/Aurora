const express = require ("express")
const router = express.Router()
const authcontrollers = require("../controllers/productController")

router.route("/id/:id").get(authcontrollers.updateStatus)
router.route("/email/:email").get(authcontrollers.getProductReal);
router.route("/:email").get(authcontrollers.getProduct);
router.route("/:email").delete(authcontrollers.deleteProduct);
router.route("/").get(authcontrollers.getProductAll);
router.route("/").post(authcontrollers.addProduct);
router.route("/").put(authcontrollers.updateProducts)

module.exports = router;