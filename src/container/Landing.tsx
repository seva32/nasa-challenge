import React, { ReactElement, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import { Card } from "../components";

import "./landing.css";

import { ReactComponent as Hero } from "../assets/Hero.svg";
import { ReactComponent as ExploreWith } from "../assets/ExploreWith.svg";
import Curiosity from "../assets/curiosity.jpg";
import Opportunity from "../assets/opportunity.jpg";
import Spirit from "../assets/spirit.jpg";
import CurText from "../assets/cur-copy.png";
import OppoText from "../assets/oppo-copy.png";
import SpiText from "../assets/spi-copy.png";

function Landing(): ReactElement {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const hero = document.querySelector(".main .hero-img");
    if (hero && heroRef.current) {
      setTimeout(() => {
        if (heroRef.current) {
          Object.assign(heroRef.current.style, {
            maxHeight: "200px",
          });
        }
      }, 1000);
      setTimeout(() => {
        if (contentRef.current) {
          Object.assign(contentRef.current.style, {
            display: "flex",
            opacity: 1,
            minHeight: "calc(100vh - 3em - 200px)",
          });
        }
      }, 2200);
    }
  }, []);

  return (
    <div className="main">
      <div className="hero-img" ref={heroRef}>
        <Hero />
      </div>
      <div className="content" ref={contentRef}>
        <div className="explore">
          <ExploreWith />
        </div>
        <div className="cards-container">
          <Card width={"32.5%"}>
            <Link to="curiosity" style={{ padding: 0, margin: 0 }}>
              <img
                className="floating-text"
                src={CurText}
                alt="text curiosity"
              />
              <figure>
                <img src={Curiosity} alt="text curiosity"></img>
              </figure>
            </Link>
          </Card>
          <Card width={"32.5%"}>
            <Link to="opportunity" style={{ padding: 0, margin: 0 }}>
              <img
                className="floating-text"
                src={OppoText}
                style={{ transform: "scale(1.2)", left: "20%", bottom: 0 }}
                alt="text curiosity"
              />
              <figure>
                <img src={Opportunity} alt="text curiosity"></img>
              </figure>
            </Link>
          </Card>
          <Card width={"32.5%"}>
            <Link to="spirit" style={{ padding: 0, margin: 0 }}>
              <img
                className="floating-text"
                src={SpiText}
                style={{
                  transform: "scale(0.85)",
                  right: "-2.5em",
                  padding: "0.8em",
                }}
                alt="text curiosity"
              />
              <figure>
                <img src={Spirit} alt="text curiosity"></img>
              </figure>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Landing;
