import "./featured.css";

const Featured = () => {
  return (
    <div className="featured">
      <>
        <div className="featuredItem">
          <img
            src="tashkent.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <p>Tashkent</p>
          </div>
        </div>

        <div className="featuredItem">
          <img
            src="samarkand.jpeg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <p>Samarkand</p>
          </div>
        </div>
        <div className="featuredItem">
          <img
            src="bukhara.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <p>Bukhara</p>
          </div>
        </div>
        <div className="featuredItem">
          <img
            src="khiva.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <p>Khiva</p>
          </div>
        </div>
      </>
    </div>
  );
};

export default Featured;
