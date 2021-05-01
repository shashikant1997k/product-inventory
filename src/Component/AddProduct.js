import React, { useState } from "react";
import "../CSS/add-product.css";
import { useDispatch } from "react-redux";
import { actionTypes } from "../_redux/rootReducer";

function AddProduct({ closeModal, editItem, eID }) {
  const [data, setData] = useState(
    editItem && Object.keys(editItem).length > 0
      ? editItem
      : {
          name: "",
          description: "",
          price: "",
          quantity: "",
          image: "",
        }
  );

  const dispatch = useDispatch();

  const inputChange = (e) => {
    let { name, value } = e.target;
    setData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eID !== undefined) {
      dispatch({
        type: actionTypes.EDIT_PRODUCT,
        item: data,
        id: eID,
      });
    } else {
      dispatch({
        type: actionTypes.ADD_PRODUCT,
        item: data,
      });
    }

    dispatch({
      type: actionTypes.OPEN_MODAL,
      item: false,
    });
  };

  return (
    <div className="add__product">
      <div className="cross__btn">
        <span onClick={closeModal}>&times;</span>
      </div>
      <form className="add__product__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            onChange={inputChange}
            value={data.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description ">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Description "
            onChange={inputChange}
            value={data.description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price ">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="price "
            onChange={inputChange}
            required
            value={data.price}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity ">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            placeholder="quantity "
            onChange={inputChange}
            required
            value={data.quantity}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image ">Image</label>
          <input
            type="text"
            className="form-control"
            name="image"
            placeholder="Enter image URL"
            onChange={inputChange}
            value={data.image}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {eID !== undefined ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
