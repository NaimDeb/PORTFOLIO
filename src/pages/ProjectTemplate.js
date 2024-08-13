import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function ProjectTemplate() {
  const { id } = useParams();
  const [projet, setProjet] = useState(null); // État pour stocker le projet

  useEffect(() => {
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
  }, [id]);

  return (
    <>
      {projet && (
        <>
          <h1>Projet numéro{id}</h1>
          <h2>{projet.titre}</h2>
          <h1>{projet.description}</h1>
        </>
      )}
    </>
  );
}

export default ProjectTemplate;
