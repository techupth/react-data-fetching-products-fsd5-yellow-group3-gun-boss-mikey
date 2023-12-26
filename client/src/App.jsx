import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Product from "./components/Product";

function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    getBlogPost();
  }, [updateTrigger]);

  const getBlogPost = async () => {
    const result = await axios.get("http://localhost:4001/products/");
    setBlogPosts(result.data.data);
  };

  const handleDelete = (productId) => {
    deleteProductInDb(productId);
    setUpdateTrigger((prev) => !prev);
  };

  const deleteProductInDb = async (productId) => {
    console.log(productId);
    await axios.delete(`http://localhost:4001/products/${productId}`);
  };

  const productElements = blogPosts.map((post) => (
    <Product
      key={post.id}
      id={post.id}
      name={post.name}
      price={post.price}
      img={post.image}
      deleteInDb={() => handleDelete(post.id)}
    />
  ));

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">{productElements}</div>
    </div>
  );
}

export default App;
