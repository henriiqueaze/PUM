import "./style.css";

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo-container">
          <img src="/src/assets/UNIFIP.svg" alt="Logo" className="logo" />
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
        <div className="hero-content">
          <h1 className="hero-title">Plataforma Universitária de Monitoria</h1>
          <p className="hero-description">
            Conecte-se com monitores e receba apoio acadêmico de forma prática e
            rápida em diversas disciplinas.
          </p>
          <button className="hero-button">Entrar</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
