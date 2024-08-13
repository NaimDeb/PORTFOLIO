import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import ProjectTemplate from "./pages/ProjectTemplate";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

          <div class="bg_image_hero">
            <video autoplay muted loop id="vidbg">
              <source src="assets/squarething.mp4" type="video/mp4" />
            </video>
          </div>

          <section class="hero">
            <div class="glass"></div>

            <div class="inf_scroll">
              <div class="inf_scroll_div">
                <div>
                  <h1 class="rubik-mono-one-regular white">Naim DEBARD</h1>
                  <h1 class="rubik-mono-one-regular white">Naim DEBARD</h1>
                </div>
              </div>
            </div>

            <div class="container div_center">
              <div class="h2_hero">
                <h2 class="rubik-mono-one-regular white">développeur web</h2>
              </div>

              <div class="flex div_center div_btn_hero">
                <a href="/#MesProjets" class="btn btn_hero">
                  Projets
                </a>
                <a href="/#" class="btn btn_hero">
                  Contact
                </a>
              </div>

              <a href="/#MesProjets" class="go_next">
                <i class="fa-solid fa-angle-down"></i>
              </a>
            </div>
          </section>

          <section class="container sect_projets" id="MesProjets">
            <h2 class="white open-sans-gras">Mes projets</h2>

            <div class="separateur"></div>

            <div>
              <p class="white open-sans-regular">Filtres</p>
              <nav class="white open-sans-regular">
                <ul class="flex liste_filtres">
                  <li class="projet_article_tag">#Lorem</li>
                  <li class="projet_article_tag">#Lorem</li>
                  <li class="projet_article_tag">#Lorem</li>
                  <li class="projet_article_tag">#Lorem</li>
                </ul>
              </nav>
            </div>

            <div class="separateur_big"></div>

            <div class="flex liste_articles animGauche">
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

          <section class="container sect_contact" id="Contact">
            <h2 class="white open-sans-gras">Contact</h2>

            <div class="separateur"></div>

            {/* <!-- Boutons contact --> */}

            <div class="flex div_btn_contact">
              <a
                href="https://www.linkedin.com/in/na%C3%AFm-debard-744043271/"
                class="btn btn_contact"
              >
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a href="mailto:naimdebard02@gmail.com" class="btn btn_contact">
                <i class="fa-solid fa-envelope"></i>
              </a>
            </div>

            {/* <!-- Form --> */}
            <div class="form-container white open-sans-regular">
              <form class="form">
                <div class="form-group">
                  <label for="email">Votre mail</label>
                  <input type="text" id="email" name="email" required="" />
                </div>
                <div class="form-group">
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
                <button class="btn form-submit-btn" type="submit">
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
