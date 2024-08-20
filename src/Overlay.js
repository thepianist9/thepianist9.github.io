import React from "react";
import { ProjectData, experiencesData } from "./store";
import { useSnapshot } from "valtio";

export function Overlay() {
  const projectSnap = useSnapshot(ProjectData);
  const experienceSnap = useSnapshot(experiencesData);

  const Projects = () => {
    const selectedProject = projectSnap.projects[projectSnap.selectedProjectIndex];

    return (
      <div style={{ 
        height: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        position: "relative",
      }}>
        {console.log(projectSnap.selectedProjectIndex)}
        <h1 style={{ position: "absolute", top: "20px", color: "white", fontSize: "2rem", zIndex: 1 }}>Projects</h1>
        {projectSnap.selectedProjectIndex !== null && selectedProject ? (
          <>
            <div className="project-details" style={{ 
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 0,
            }}>
              <div className="left-content" style={{
                width: "30%",
                padding: "20px",
                color: "white",
                textAlign: "right",
              }}>
                <h2>{selectedProject.title}</h2>
                <p>{selectedProject.description}</p>
              </div>
              <div className="center-content" style={{
                width: "40%",
                // This space is for the 3D carousel
              }}></div>
              <div className="right-content" style={{
                width: "30%",
                padding: "20px",
                color: "white",
                textAlign: "left",
              }}>
                <h3>Technologies:</h3>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {selectedProject.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ color: "lightblue" }}>View Project</a>
              </div>
            </div>
            <button
              onClick={() => ProjectData.navigateProject(-1)}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '24px',
                padding: '10px 15px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                zIndex: 2,
                pointerEvents: 'auto',
              }}
            >
              {"<"}
            </button>
            <button
              onClick={() => ProjectData.navigateProject(1)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '24px',
                padding: '10px 15px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                zIndex: 2,
                pointerEvents: 'auto',
              }}
            >
              {">"}
            </button>
            <button
              onClick={() => {
                ProjectData.closeProject();
                // If you have a function to reset the carousel, call it here
                // For example: resetCarousel();
              }}
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '18px',
                padding: '10px 20px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                cursor: 'pointer',
                zIndex: 2,
                pointerEvents: 'auto',
              }}
            >
              Close
            </button>
          </>
        ) : (
          <div style={{
            color: "white",
            zIndex: 0,
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center"
          }}>
            Select a project to view details
          </div>
        )}
      </div>
    );
  };

  const Experience = () => {
    const snap = useSnapshot(experiencesData);

    return (
      <div style={{ height: "100vh", position: "relative" }}>
        <style>
          {`
            @font-face {
              font-family: 'Inter Bold';
              src: url('/inter-bold.woff') format('woff');
              font-weight: bold;
              font-style: normal;
            }
          `}
        </style>
        <div className="experience-overlay" style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
          boxSizing: "border-box",
          pointerEvents: "none",
          fontFamily: "'Inter Bold', sans-serif",
        }}>
          <h1 style={{ color: "white", textAlign: "center", fontFamily: 'Inter Bold', fontSize: "2rem", marginBottom: "20px" }}>Experiences</h1>
          
          {snap.activeExperience && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ maxWidth: "30%" }}>
                  <h2 style={{ color: "white" }}>{snap[snap.activeExperience].company}</h2>
                  <h3 style={{ color: "white" }}>{snap[snap.activeExperience].position}</h3>
                  <ul style={{ color: "white", listStyleType: "none", padding: 0 }}>
                  {snap[snap.activeExperience].tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
                </div>
                
                <div style={{ maxWidth: "30%", textAlign: "right" }}>
                  <p style={{ color: "white" }}>{snap[snap.activeExperience].duration}</p>
                </div>
              </div>
              
              <div style={{ maxWidth: "80%", margin: "0 auto" }}>
                
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
    
  return(  
  <div
    className="scroll"
    style={{ color: 'white' }}>
    <div style={{ height: "100vh", width: "100vw"}}>
      <div class="dot">
        <h1 style={{color: "white"}}>Welcome to my side of the Metaverse</h1>
        Virtual reality (VR) is a simulated experience that can be similar to or completely different from the real world.
      </div>
    </div>
    <div style={{ height: "100vh" }}>
      <div class="dot">
        <h1 style={{color: "white"}}>My Toolset</h1>
        Headphones are a pair of small loudspeaker drivers worn on or around the head over a user's ears.
      </div>
    </div>
    <Experience />

    <Projects />
    <div style={{ height: "100vh" }}>
      <div class="dot">
        <h1 style={{color: "white"}}>Contact me</h1>
        <p>Feel free to reach out through any of the following platforms:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" style={buttonStyle}>
            LinkedIn
          </a>
          <a href="mailto:your.email@gmail.com" style={buttonStyle}>
            Gmail
          </a>
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" style={buttonStyle}>
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
);
}

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: '16px',
  transition: 'background-color 0.3s',
};