import React from "react";
import "../CSS/product.css";
import { useDispatch } from "react-redux";
import { actionTypes } from "../_redux/rootReducer";

function Product({ id, name, description, price, quantity, image }) {
  const dispatch = useDispatch();

  const handleEdit = (e, id) => {
    dispatch({
      type: actionTypes.OPEN_MODAL,
      open: true,
      id: id,
    });
  };
  const handleDelete = (e, id) => {
    dispatch({
      type: actionTypes.DELETE_PRODUCT,
      id: id,
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <div className="product_name">
          {name.length < 40 ? name : name.slice(0, 40) + "..."}
        </div>

        <div className="product__desc">
          {description.length < 75
            ? description
            : description.slice(0, 75) + "..."}
        </div>
        <div className="product__price">
          <div className="price">₹ {price}</div>
          <div className="qty">
            (<span>x </span> <span>{quantity}</span>)
          </div>
        </div>
      </div>

      <div className="product__img">
        <img src={image} alt="" />
      </div>
      <div className="edit__product">
        <button
          onClick={(e) => handleDelete(e, id)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
        <button
          onClick={(e) => handleEdit(e, id)}
          type="button"
          className="btn btn-success"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default Product;
