import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 50 },
          size: { value: 3 },
          move: { enable: true, speed: 1 },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.3
          }
        }
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;
