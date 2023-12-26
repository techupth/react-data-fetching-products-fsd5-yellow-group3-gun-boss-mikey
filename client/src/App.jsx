import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [blogPost, setBlogPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBlogPost = async () => {
    try {
      const result = await axios.get("http://localhost:4001/products");
      setIsLoading(false);
      setBlogPost(result.data.data);
    } catch {
      console.log("Error fetching data");
    }
  };
  const deleteBlogPost = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:4001/products/${id}`);
      const newBlogPost = blogPost.filter((item) => {
        return item.id !== id;
      });
      setBlogPost(newBlogPost);
      setIsLoading(false);
    } catch {
      console.log("Error delete data");
    }
  };

  useEffect(() => {
    getBlogPost();
  }, []);

  return (
    <>
      {isLoading && <div>Loading....</div>}
      {!isLoading && (
        <div className="App">
          <div className="app-wrapper">
            <h1 className="app-title">Products</h1>
          </div>
          <div className="product-list">
            {blogPost.map((post, index) => {
              return (
                <div className="product" key={index}>
                  <div className="product-preview">
                    <img
                      src={post.image}
                      alt="some product"
                      width="350"
                      height="350"
                    />
                  </div>
                  <div className="product-detail">
                    <h1>Product name: {post.name}</h1>
                    <h2>Product price: {post.price}</h2>
                    <p>Product description:{post.description}</p>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() => {
                      deleteBlogPost(post.id);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
