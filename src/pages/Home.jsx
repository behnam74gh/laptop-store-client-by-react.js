import React from "react";
import Jumbotron from "../components/Cards/Jumbotron";
import CategoryList from "../components/Category/CategoryList";
import SubList from "../components/Sub/SubList";
import BestSellers from "../components/Home/BestSellers";
import NewArrivals from "../components/Home/NewArrivals";
import Fade from "react-reveal/Fade";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-center display-4 text-danger font-weight-bold mt-5 typeWriter">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className="text-center p-3 my-5 h1 jumbotron">
        <Fade top big cascade>
          New Arrivals
        </Fade>
      </h4>

      <NewArrivals />

      <h4 className="text-center p-3 my-5 h1 jumbotron">Best Sellers</h4>

      <BestSellers />

      <h4 className="text-center p-3 my-5 h1 jumbotron">
        <Fade right big cascade>
          Categories
        </Fade>
      </h4>

      <CategoryList />

      <h4 className="text-center p-3 my-5 h1 jumbotron">
        <Fade left big cascade>
          Sub Categories
        </Fade>
      </h4>

      <SubList />
    </>
  );
};

export default Home;
