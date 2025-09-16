import "./style.css";

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo-container">
          <a href="https://www.unifip.edu.br/" target="_blank">
            <img src="/src/assets/UNIFIP.svg" alt="Logo" className="logo" />
          </a>
        </div>
        <nav className="nav-links">
          <a href="#about">Sobre</a>
          <a href="#contact">Contatos</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-image">
          <img
            src="/src/assets/fipinhoLandingPage.png"
            alt="Mascote Fipinho, a coruja"
            className="fipinho-image"
          />
        </div>
          <a href="http://"></a>
        <div className="hero-content">
          <h1 className="hero-title">Plataforma Universitária de Monitoria</h1>
          <p className="hero-description">
            Conecte-se com monitores e receba apoio acadêmico de forma prática e
            rápida em diversas disciplinas.
          </p>
          <button className="hero-button">Entrar</button>
        </div>
      </section>

      <section className="about-us">
        <div className="title_container">
          <div className="title">
            <p>Sobre</p>
          </div>
        </div>
        <div className="content_about_us">
          <h1>alo</h1>
        </div>
      </section>
    </div>
  );
}

export default Home;
