import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <Header />
        <div className="homeContainer">
          <h4 className="homeTitle">Popular destinations</h4>
          <Featured />
          <h4 className="homeTitle">Hotels loved by guests</h4>
          <FeaturedProperties />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
