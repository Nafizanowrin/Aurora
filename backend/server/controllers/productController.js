const Product = require("../models/product");

exports.addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { email, id, name, price, image } = req.body;

    const product = { id, email, name, price, image };

    // Insert a single product into the database
    await Product.create(product);

    res.status(200).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product", error });
  }
};


exports.getProduct = async (req, res) => {
    try {
      const email = req.params.email; // Get the email from the request parameters
  
      // Find products that match the provided email
      const products = await Product.find({ email: email, success: false });
      res.status(200).json(products); // Return the found products
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products", error });
    }
  };  

  exports.getProductReal = async (req, res) => {
    try {
      const email = req.params.email; // Get the email from the request parameters
  
      // Find products that match the provided email
      const products = await Product.find({ email: email, success: true });
      res.status(200).json(products); // Return the found products
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products", error });
    }
  };  

  exports.getProductAll = async (req, res) => {
    try {
      // Find products that match the provided email
      const products = await Product.find({ success: true });
      res.status(200).json(products); // Return the found products
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products", error });
    }
  };  

  exports.deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany(); // Deletes all documents in the collection
      res.status(200).json({ message: "All products deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete all products", error });
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    try {
      const email = req.params.email; // Get the email from the request parameters
  
      // Delete all products that match the provided email
      const result = await Product.deleteMany({ email: email });
  
      res.status(200).json({ message: `All products for ${email} have been deleted` });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete products", error });
    }
  };
  

  exports.updateStatus = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Update the product status
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id }, // Find product by ID
        {
          $set: {
            status: "Order Delivered", // Update the 'status' field
          },
        },
        { new: true } // Return the updated product
      );
  
      // Check if the product was found and updated
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({
        message: "Product updated successfully!",
        updatedProduct, // Return the updated product
      });
    } catch (error) {
      console.error("Error updating product status:", error);
      res.status(500).json({ message: "Failed to update product", error });
    }
  };
  

exports.updateProducts = async (req, res) => {
    try {
      const productsToUpdate = req.body; // Array of product objects to update
  
      // Prepare update operations
      const updatePromises = productsToUpdate.map(product => {
        return Product.findOneAndUpdate(
          { id: product.id }, // Find product by ID
          {
            $set: {
              name: product.name,
              price: product.price,
              image: product.image,
              amount: product.amount, // Assuming you also want to update the 'amount' field
            },
          },
          { new: true } // Return the updated product
        );
      });
  
      // Wait for all updates to complete
      const updatedProducts = await Promise.all(updatePromises);
  
      res.status(200).json({
        message: "Products updated successfully!",
        updatedProducts,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to update products", error });
    }
};