import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function ProjectTemplate() {
  const { id } = useParams();
  const [projet, setProjet] = useState(null);

  useEffect(() => {
    // Fetch des données du projet
    fetch(`/assets/projet${id}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors du chargement du projet");
        }
        return response.json();
      })
      .then((data) => setProjet(data))
      .catch((error) => {
        console.error("Erreur lors du chargement du projet:", error);
      });

    // Fonction pour gérer le scroll et appliquer l'effet sticky
    const handleScroll = () => {
      const sommaire = document.querySelector(".sommaire");
      const coverImage = document.querySelector(".img_projet_main");
      const footer = document.querySelector("footer"); // Assurez-vous que votre footer a bien cette balise ou classe

      if (sommaire && coverImage && footer) {
        const coverImageHeight = coverImage.offsetHeight;
        const footerRect = footer.getBoundingClientRect();
        const sommaireHeight = sommaire.offsetHeight;

        if (window.scrollY > coverImageHeight) {
          if (footerRect.top <= sommaireHeight) {
            sommaire.style.position = "absolute";
            sommaire.style.top = `${
              window.scrollY + footerRect.top - sommaireHeight - 20
            }px`;
          } else {
            sommaire.style.position = "fixed";
            sommaire.style.top = "20px";
          }
        } else {
          sommaire.style.position = "absolute";
          sommaire.style.top = `${coverImageHeight}px`;
        }
      }
    };

    // Ajout de l'event listener lors du scroll
    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'event listener quand le composant est démonté
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

  if (!projet) {
    // Ajout d'un retour de chargement si le projet n'est pas encore chargé
    return <p className="chargement">Chargement...</p>;
  }

  const chapitres = []; // Initialisation d'un tableau pour stocker les chapitres
  const contenu = projet.texte.map((bloc, index) => {
    // Création du contenu tout en extrayant les chapitres
    if (bloc.type === "chapter") {
      const chapitreId = bloc.content.replace(/\s+/g, "-").toLowerCase(); // Génération de l'ID du chapitre
      chapitres.push({ id: chapitreId, title: bloc.content }); // Ajout du chapitre au tableau chapitres

      return (
        <h2 key={index} id={chapitreId}>
          {" "}
          {/* Utilisation de l'ID généré pour l'ancre */}
          {bloc.content}
        </h2>
      );
    } else if (bloc.type === "text") {
      return <p key={index}>{bloc.content}</p>; // Retour du texte avec la clé unique
    } else if (bloc.type === "image") {
      return (
        <div key={index} className="projet_div_img">
          <img src={bloc.src} alt={bloc.alt} />
          <p className="projet_div_img_desc">{bloc.alt}</p>
        </div>
      );
    } else if (bloc.type === "video") {
      return (
        <div key={index} className="projet_div_vid">
          <video muted controls src={bloc.src} alt={bloc.alt} />
          <p className="projet_div_img_desc">{bloc.alt}</p>
        </div>
      );
    } else {
      return null; // Retourne null pour les types non supportés
    }
  });

  return (
    <>
      {/* Sommaire */}
      <div className="sommaire open-sans-regular flex">
        <div className="sommaire_separateur"></div>
        <ul>
          {chapitres.map((chapitre, index) => (
            <li key={index}>
              <a href={`#${chapitre.id}`}>{chapitre.title}</a>{" "}
              {/* Lien vers l'ancre du chapitre */}
            </li>
          ))}
        </ul>
      </div>

      {/* Texte */}
      <img
        src={projet.coverimage}
        alt="cover du projet"
        className="img_projet_main"
      />

      <div className="projet_div open-sans-regular">
        <div className="flex">
          <h1 id="Introduction">
            {"Projet " + projet.index + " : " + projet.titre}
            {projet.link && (
              <a href={projet.link}>
                <i class="fa-brands fa-github"></i>
              </a>
            )}
          </h1>
          <ul className="flex tags_projet">
            {projet.tags.map((tag, index) => (
              <li key={index} className="projet_article_tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        {/* Contenu principal */}
        {contenu} {/* Insertion du contenu généré */}
      </div>
    </>
  );
}

export default ProjectTemplate;
