import "./style.scss";

import homeMain from "../../../assets/images/home-main.png";

const HomePage = () => {
  return (
    <section id="home">
      <div className="container">
        <div className="home-section">
          <div className="home-section__info">
            <h2>Kelajagingizni biz bilan birga yarating</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
              odio aspernatur debitis nulla quibusdam nostrum quidem veniam
              placeat pariatur sed totam accusantium corrupti saepe, ex incidunt
              facere commodi animi vero. Quas dolorum perspiciatis consectetur,
              iusto quisquam nemo rem, voluptatibus exercitationem assumenda aut
              veritatis praesentium fugiat expedita deleniti doloremque, amet
              ipsum.
            </p>
          </div>
          <div className="home-section__img">
            <img src={homeMain} alt="home main" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
