import React, { useEffect, useState } from "react";
import "../CSS/header.css";
import { actionTypes } from "../_redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import AddProduct from "./AddProduct";

function Header({ searchInput }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const opModal = useSelector((state) => state.openModal);
  const eID = useSelector((state) => state.id);
  const data = useSelector((state) => state.productList);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(opModal);
  }, [opModal, eID]);

  const logout = () => {
    dispatch({
      type: actionTypes.USER_LOGOUT,
    });
    history.push("/");
  };

  const addProduct = () => {
    openModal ? setOpenModal(false) : setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="header">
        <div className="add__product__button">
          <button
            onClick={addProduct}
            type="button"
            className="btn btn-success"
          >
            Add Product
          </button>
        </div>
        <div className="search">
          <input
            type="search"
            className="form-control"
            id="search"
            onChange={(e) => searchInput(e)}
            placeholder="Search here..."
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="username">{user.name}</div>
          <div className="logout__button">
            <button
              onClick={logout}
              type="button"
              className="btn btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Modal Heading</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">Modal body..</div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModal ? (
        <AddProduct editItem={data[eID]} eID={eID} closeModal={closeModal} />
      ) : null}
    </>
  );
}

export default Header;
