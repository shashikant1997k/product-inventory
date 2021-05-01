import React, { useEffect, useState } from "react";
import "../CSS/home.css";
import Header from "./Header";
import Product from "./Product";
import { useSelector } from "react-redux";

function Home() {
  const item1 = useSelector((state) => state.productList);
  const [item, setItem] = useState(item1);
  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(item1));
    setItem(item1);
  }, [item1]);

  const searchInput = (e) => {
    let input = e.target.value;
    let temp = item1.filter(
      (v) =>
        v.name.toLowerCase().includes(input.toLowerCase()) ||
        v.price === input ||
        v.quantity === input
    );

    setItem(temp);
  };

  return (
    <>
      <Header searchInput={searchInput} />
      <div className="home">
        <div className="background__img">
          <img
            className="home__image"
            src="https://wallpapercave.com/wp/wp3537591.jpg"
            alt="BackgroundImage"
          />
        </div>

        <div className="main__row">
          <h5 className="con">Product List</h5>
          <div className="home__row">
            {item && item.length > 0 ? (
              item.map((v, i) => (
                <>
                  <Product
                    key={v.name}
                    id={i}
                    name={v.name}
                    description={v.description}
                    price={v.price}
                    quantity={v.quantity}
                    image={v.image}
                  />
                </>
              ))
            ) : (
              <h2>No Product</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
