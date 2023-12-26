export default function Product(props) {
  return (
    <div className="product">
      <div className="product-preview">
        <img src={props.img} alt="some product" width="350" height="350" />
      </div>
      <div className="product-detail">
        <h1>{props.name}</h1>
        <h2>Price : {props.price}</h2>
        <p>Product description: .....</p>
      </div>

      <button className="delete-button" onClick={props.deleteInDb}>
        x
      </button>
    </div>
  );
}
