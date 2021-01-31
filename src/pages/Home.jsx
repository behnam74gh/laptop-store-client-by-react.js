import React from "react";
import Jumbotron from "../components/Cards/Jumbotron";
import CategoryList from "../components/Category/CategoryList";
import SubList from "../components/Sub/SubList";
import BestSellers from "../components/Home/BestSellers";
import NewArrivals from "../components/Home/NewArrivals";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-center display-4 text-danger font-weight-bold">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className="text-center p-3 my-5 h1 jumbotron">New Arrivals</h4>

      <NewArrivals />

      <h4 className="text-center p-3 my-5 h1 jumbotron">Best Sellers</h4>

      <BestSellers />

      <h4 className="text-center p-3 my-5 h1 jumbotron">Categories</h4>

      <CategoryList />

      <h4 className="text-center p-3 my-5 h1 jumbotron">Sub Categories</h4>

      <SubList />
    </>
  );
};

export default Home;
