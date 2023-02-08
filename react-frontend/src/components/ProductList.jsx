import React, { useState } from "react";

const ProductList = ({ allProducts, currentUser }) => {
  const [showMyProducts, setShowMyProducts] = useState(false);

  const toggleShowMyProducts = () => setShowMyProducts(!showMyProducts);

  return (
    <div>
      <button onClick={toggleShowMyProducts}>
        {showMyProducts ? " Show All Products" : " Show My Products"}
      </button>
      <ul>
        {allProducts.map((product) =>
          (showMyProducts && product.userId === currentUser.id) ||
          !showMyProducts ? (
            <li key={product.id}>
              {product.name}
              {product.userId === currentUser.id ? (
                <div>
                  <button onClick={() => handleEdit(product.id)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </div>
              ) : null}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};
