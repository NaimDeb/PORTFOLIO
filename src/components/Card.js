import React from "react";
import { Link } from "react-router-dom";

function Card({ titre, date, description, image, link, tags }) {
  return (
    <>
      <Link to={"/projet/" + link}>
        <div className="projet_article">
          <div className="projet_case">
            <img src={image} alt="" className="projet_article_img" />
            <div className="projet_article_div open-sans-regular">
              <h3 className="projet_article_titre white">{titre}</h3>
              <p className="projet_article_date white">{date}</p>
              <p className="projet_article_desc white">{description}</p>
              <button className="projet_article_lien white btn">
                En savoir plus
              </button>
              <ul className="flex liste_filtres_article liste_filtres white">
                {tags.map((tag, index) => (
                  <li key={index} className="projet_article_tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
