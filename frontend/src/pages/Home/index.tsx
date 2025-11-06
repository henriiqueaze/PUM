import DropdownComponent from "../../components/dropdownComponent";
import { faqQuetions } from "../../utils/fragments";
import "./style.css";


function Home() {
  return (
    <div className="home-container">
      <div className="main-content">
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
            <h1 className="hero-title">
              Plataforma Universitária de Monitoria
            </h1>
            <p className="hero-description">
              Conecte-se com monitores e receba apoio acadêmico de forma prática
              e rápida em diversas disciplinas.
            </p>
            <button className="hero-button">Entrar</button>
          </div>
        </section>
      </div>
      <section className="about-us">
        <div className="title_container">
          <div className="title">
            <p>Sobre</p>
          </div>
        </div>
        <div className="content_about_us">
          <div className="first_content">
            <div className="first_text_area">
              <h1>UNIFIP - Patos PB</h1>
              <p>Lorem ipsum dolor sit ametsadasdasdasdsada</p>
            </div>
            <div className="first_img_area">
              <img src="/src/assets/unifip01.png" alt="" />
            </div>
          </div>
          <div className="second_content">
            <div className="second_img_area">
              <img src="/src/assets/unifip02.png" alt="" />
              <img src="/src/assets/unifip03.png" alt="" />
            </div>
            <div className="second_text_area">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
            <div className="button_see_more">
              <button>Conheça mais</button>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-us">
        <div className="info-section">
          <h1>O seu feedback nos ajuda a melhorar!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi.
          </p>
        </div>
        <div className="contact-card">
          <div className="form-section">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" placeholder="Digite seu nome" />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select id="category">
                  <option value="monitor">Monitor</option>
                  <option value="professor">Professor</option>
                  <option value="aluno">Aluno</option>
                  <option value="coordenador">Coordenador</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  placeholder="Achei um bug na plataforma"
                ></textarea>
              </div>
              <div className="button_submit">
                <button type="submit">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="faq">
        <div className="faq-image">
          <img
            src="/src/assets/fipinhoDesk.png"
            alt="Mascote Fipinho, a coruja"
          />
        </div>
        <div className="faq-content">
          <div className="faq-title">
            <h1>FAQ</h1>
            <p>Vejas as perguntas frequentes</p>
          </div>
          <div className="faq-container">
            {
              faqQuetions.map((item, index) => (
                <DropdownComponent key={index} title={item.title} content={item.content}/>
              ))
            }
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-logo">
              <img src="/src/assets/UNIFIP.svg" alt="Logo da empresa" />
            </div>

            <div className="footer-links-group">
              <div className="footer-contacts">
                <h4>Contatos</h4>
                <a href="#">fip@email.com</a>
              </div>
              <div className="footer-social">
                <h4>Siga a gente</h4>
                <a href="https://www.instagram.com/unifipoficial" target="_blank">Instagram</a>
                <a href="https://www.youtube.com/@UnifipOficial" target="_blank">Youtube</a>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <p className="copyright">
              © 2025 Todos os direitos reservados para os Ternurinhas
            </p>
            <nav className="footer-nav">
              <a href="#">Início</a>
              <a href="#">Sobre</a>
              <a href="#">Contatos</a>
              <a href="#">FAQ</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
