import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=TASHKENT,SAMARKAND,BUKHARA"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://planetofhotels.com/guide/sites/default/files/styles/big_gallery_image/public/text_gallery/Tashkent-5.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Tashkent</h1>
              <h2>{data[0]} hotels</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://img.theculturetrip.com/wp-content/uploads/2020/03/k5hr4a.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Samarkand</h1>
              <h2>{data[1]} hotels</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cdn.turkishairlines.com/m/47dbded5b256f348/original/1400x660.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Bukhara</h1>
              <h2>{data[2]} hotels</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
