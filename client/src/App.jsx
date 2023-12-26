import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";

function App() {

  const [blogPost, setBlogPost] = useState([]);

  async function getBlogPost() {
    const result = await axios.get("http://localhost:4001/products");
    setBlogPost(result.data.data);
    console.log(result.data);
  }

  useEffect(() => {
    getBlogPost();
  }, []);
  

  async function deleteBlogpost(dataId) {
    await axios.delete(`http://localhost:4001/products/${dataId}`)
    .then(getBlogPost)
  }

{/*
  async function deleteBlogpost(dataId) {
    await axios.delete(`http://localhost:4001/products/${dataId}`)
    const newData = blogPost.filter((item)=>{
      return item.id !== dataId;
    })
    setBlogPost(newData)
  }
  //วิธีของ TechUp
  */}


  
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">

        {
          blogPost.map((post,index) => {
            return (
              <div key={index} className="product">
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

          <button onClick={() => {
            deleteBlogpost(post.id)
          }} className="delete-button">x</button>
        </div>
            )
          })
        }

      </div>
    </div>
  );
}

export default App;