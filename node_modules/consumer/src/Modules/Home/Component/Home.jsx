import React from "react";
import Items from "../Container/Items";
import BestSeller from "../Container/BestSeller";
import CarouselImage from "../Container/CarouselImage";
import Footer from "../Container/Footer";
import Header from "../Container/Header";
import NewProducts from "../Container/NewProducts";
import '..//Component/Home.css'

const Home = () => {

  return (
    <div>
      <Header className="fixed-header" />
      <div>
        <CarouselImage />
        <Items />
        <NewProducts />
        <BestSeller />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
