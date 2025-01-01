import Navbar from "../../Components/NavbarComponent/Navbar";
import "./LandingPage.css";

function LandingPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section
          className="hero"
          style={{
            backgroundImage: "url(/img/pexels-deepak-dk-197763-4933643.jpg)",
          }}
        >
          <div className="hero-text">
            <span className="text-1">
              Where Every House <span>Becomes a Home</span>
            </span>
            <span className="text-2">
              Explore hundreds of properties <span>at your fingertips.</span>
            </span>
          </div>
          <div className="hero-button">
            <button type="button" className="search-button">
              <span className="search-text">Search properties</span>
            </button>
          </div>
        </section>
        <section className="favorites"></section>
        <section className="about"></section>
      </main>
      <footer></footer>
    </>
  );
}

export default LandingPage;
