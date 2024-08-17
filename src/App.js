import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import ProjectTemplate from "./pages/ProjectTemplate";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import video from "./Videos/squarething.mp4";

function App() {
  const [projects, setProjects] = useState([]);

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

          <section className="container sect_projets" id="MesProjets">
            <h2 className="white open-sans-gras">Mes projets</h2>

            <div className="separateur"></div>

            <div>
              <p className="white open-sans-regular">Filtres</p>
              <nav className="white open-sans-regular">
                <ul className="flex liste_filtres">
                  <li className="projet_article_tag">#Lorem</li>
                  <li className="projet_article_tag">#Lorem</li>
                  <li className="projet_article_tag">#Lorem</li>
                  <li className="projet_article_tag">#Lorem</li>
                </ul>
              </nav>
            </div>

            <div className="separateur_big"></div>

            <div className="flex liste_articles animGauche">
              {projects.map((project, index) => (
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
                  <label for="email">Votre mail</label>
                  <input type="text" id="email" name="email" required="" />
                </div>
                <div className="form-group">
                  <label for="textarea">Votre message</label>
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

//   return (
//     <section class="container sect_projets" id="MesProjets">
//       <h2 class="white open-sans-gras">Mes projets</h2>

//       <div class="separateur"></div>

//       <div>
//         <p class="white open-sans-regular">Filtres</p>
//         <nav class="white open-sans-regular">
//           <ul class="flex liste_filtres">
//             <li class="projet_article_tag">#Lorem</li>
//             <li class="projet_article_tag">#Lorem</li>
//             <li class="projet_article_tag">#Lorem</li>
//             <li class="projet_article_tag">#Lorem</li>
//           </ul>
//         </nav>
//       </div>

//       <div class="separateur_big"></div>

//       <div class="flex liste_articles animGauche">
//         {projects.map((project, index) => (
//           <Card
//             key={index}
//             titre={project.titre}
//             date={project.date}
//             description={project.description}
//             image={project.image}
//             link={project.link}
//             tags={project.tags}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

export default App;
