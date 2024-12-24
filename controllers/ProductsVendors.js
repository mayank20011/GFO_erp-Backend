import ProductsVendor from "../models/ProductsVendors.js";

export function vendorNames(req, res){
   ProductsVendor.find({}, '_id name')
   .then((data)=>{
    if(data.length==0){
      res.status(200).json({
        success:false,
        err:'No Vendors',
      })
    }
    else{
      res.status(200).json({
        success:true,
        data:data
      })
    }
   })
   .catch((err)=>{
    res.status(500).json(
      {
        success:false,
        err:err,
      }
    )
   })
}

export function deleteProduct(req, res) {
  const { id, HSN } = req.params;
  ProductsVendor.findById(id)
    .then((vendor) => {
      if (vendor) {
        vendor.products = vendor.products.filter(
          (product) => product.HSN != HSN
        );
        vendor
          .save()
          .then(() => {
            res.status(201).json({
              success: true,
            });
          })
          .catch((err) => {
            res.status(404).json({
              success: false,
            });
          });
      } else {
        res.status(404).json({
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(501).json({
        success: false,
      });
    });
}

export function addProduct(req, res) {
  ProductsVendor.findById(req.body.vendorId)
    .then((response) => {
      if (response) {
        console.log(response.products);
        response.products.push({
          productName: req.body.productName,
          HSN: req.body.HSN,
        });
        response
          .save()
          .then((product) => {
            res.status(200).json({
              success: true,
            });
            console.log(product);
          })
          .catch((err) => {
            res.status(404).json({
              success: false,
            });
          });
      } else {
        res.status(404).json({
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
      });
    });
}

export async function updateProduct(req, res) {
  try {
    const { vendorId, productName, HSN, oldHSN } = req.body;

    // Find the vendor by ID
    const vendor = await ProductsVendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    // Remove the old product based on oldHSN
    const updatedVendor = await ProductsVendor.findByIdAndUpdate(
      vendorId,
      { $pull: { products: { HSN: oldHSN } } },
      { new: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Add the updated product
    updatedVendor.products.push({ productName, HSN });

    // Save the updated vendor document
    const savedVendor = await updatedVendor.save();
    console.log('Updated Vendor:', savedVendor); // Log the updated vendor

    res.status(200).json({ success: true, message: 'Product updated successfully', vendor: savedVendor });
  } catch (err) {
    console.error('Error updating product:', err); // Log the error
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export function getAllProductsVendors(req, res, next) {
  ProductsVendor.find()
    .then((allProducts) => {
      res.status(200).json({
        success: true,
        count: allProducts.length,
        data: allProducts,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err: `Server Error`,
      });
    });
}

export function addVendor(req, res) {
  ProductsVendor.create(req.body)
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        err: `Server Error`,
      });
    });
}
