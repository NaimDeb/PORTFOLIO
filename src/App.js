import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import ProjectTemplate from "./pages/ProjectTemplate";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import video from "./Videos/squarething.mp4";

function App() {
  const [projects, setProjects] = useState([]);

  // Pour filtrer les projets
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter((project) =>
    filter === "All" ? true : project.tags.includes(filter)
  );

  // Obtenir tous les tags uniques en une seule liste (on flat la map), le ... sert a décomposer les listes en éléments individuels
  const allTags = [...new Set(projects.flatMap((project) => project.tags))];

  useEffect(() => {
    fetch("projets.json")
      .then((rep) => rep.json())
      .then((data) => setProjects(data));
  }, []); // le [] exprime qu'il n'y a pas de dépendance, il sert a executer useEffect une seule fois
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {/* <!-- Section Hero --> */}

          <div className="bg_image_hero">
            <video autoPlay muted loop="true" id="vidbg">
              <source src={video} type="video/mp4" />
            </video>
          </div>

          <section className="hero">
            <div className="glass"></div>

            <div className="inf_scroll">
              <div className="inf_scroll_div">
                <div>
                  <h1 className="rubik-mono-one-regular white">Naim DEBARD</h1>
                  <h1 className="rubik-mono-one-regular white">Naim DEBARD</h1>
                </div>
              </div>
            </div>

            <div className="container div_center">
              <div className="h2_hero">
                <h2 className="rubik-mono-one-regular white">
                  développeur web
                </h2>
              </div>

              <div className="flex div_center div_btn_hero">
                <a href="/#MesProjets" className="btn btn_hero">
                  Projets
                </a>
                <a href="/#Contact" className="btn btn_hero">
                  Contact
                </a>
              </div>

              <a href="/#MesProjets" className="go_next">
                <i className="fa-solid fa-angle-down"></i>
              </a>
            </div>
          </section>

          {/* Section projets, Filtres*/}

          <section className="container sect_projets" id="MesProjets">
            <h2 className="white open-sans-gras">Mes projets</h2>

            <div className="separateur"></div>

            <div>
              <p className="white open-sans-regular">Filtres</p>
              <div className="flex liste_filtres">
                <button
                  className="projet_article_tag"
                  onClick={() => setFilter("All")}
                >
                  Tout voir
                </button>
                {allTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`projet_article_tag ${
                      filter === tag ? "selected" : ""
                    }`}
                    onClick={() => setFilter(tag)}
                  >
                    {"#" + tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="separateur_big"></div>

            {/* Section projets, Cartes*/}

            <div className="flex liste_articles animGauche">
              {filteredProjects.map((project, index) => (
                <Card
                  key={index}
                  link={index + 1}
                  titre={project.titre}
                  date={project.date}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                />
              ))}
            </div>
          </section>

          <section className="container sect_contact" id="Contact">
            <h2 className="white open-sans-gras">Contact</h2>

            <div className="separateur"></div>

            {/* <!-- Boutons contact --> */}

            <div className="flex div_btn_contact">
              <a
                href="https://www.linkedin.com/in/na%C3%AFm-debard-744043271/"
                className="btn btn_contact"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="mailto:naimdebard02@gmail.com"
                className="btn btn_contact"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>

            {/* <!-- Form --> */}
            <div className="form-container white open-sans-regular">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="email">Votre mail</label>
                  <input type="text" id="email" name="email" required="" />
                </div>
                <div className="form-group">
                  <label htmlFor="textarea">Votre message</label>
                  <textarea
                    name="textarea"
                    id="textarea"
                    rows="10"
                    cols="50"
                    required=""
                  >
                    {" "}
                  </textarea>
                </div>
                <button className="btn form-submit-btn" type="submit">
                  Envoyer
                </button>
              </form>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/projet/:id",
      element: <ProjectTemplate />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
