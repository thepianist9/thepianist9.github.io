import React from "react";
import { ProjectData, experiencesData } from "./store";
import { useSnapshot } from "valtio";

export function Overlay({ isMobile }) {
  const projectSnap = useSnapshot(ProjectData);
  const experienceSnap = useSnapshot(experiencesData);

  const Projects = ({ isMobile }) => {
    const selectedProject = projectSnap.projects[projectSnap.selectedProjectIndex];

    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "flex-start", 
        alignItems: "center", 
        position: "relative",
        padding: "20px",
        overflowY: "auto",
        paddingTop: isMobile ? "6vh" : "5vh", // Reduced top padding for desktop
      }}>
        <h1 style={{ 
          color: "white", 
          fontSize: isMobile ? "1.2rem" : "2rem", 
          marginBottom: isMobile ? "20px" : "10px", // Reduced bottom margin for desktop
          zIndex: 1,
          marginTop: "0", // Removed top margin
        }}>Projects</h1>
        {projectSnap.selectedProjectIndex !== null && selectedProject ? (
          <>
            <div style={{ 
              position: "relative", 
              width: "100%", 
              maxWidth: "1200px", 
              height: "auto", 
              display: "flex", 
              flexDirection: "column",
              justifyContent: "center", 
              alignItems: "center",
              marginBottom: isMobile ? "20px" : "10px", // Reduced bottom margin for desktop
              marginTop: "0", // Removed top margin
            }}>
              <h2 style={{ 
                color: "white", 
                fontSize: isMobile ? "1rem" : "1.5rem", 
                marginBottom: isMobile ? "15px" : "10px", // Reduced bottom margin for desktop
                textAlign: "center" 
              }}>{selectedProject.title}</h2>
              <div style={{ 
                position: "relative",
                width: "100%",
                height: isMobile ? "40vh" : "45vh", // Slightly reduced height for desktop
                minHeight: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: isMobile ? "10px 0" : "15px 0", // Adjusted margin
              }}>
                {/* This is where your 3D card would be rendered */}
                <div style={{ width: "80%", height: "100%", position: "relative" }}>
                  {/* Placeholder for 3D card */}
                </div>
              </div>
            </div>
            
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              maxWidth: "1200px",
              marginBottom: "20px",
            }}>
              <button onClick={() => ProjectData.navigateProject(-1)} style={{...navigationButtonStyle}}>{"<"}</button>
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ color: "lightblue", fontSize: isMobile ? "0.8rem" : "1rem" }}>View Project</a>
              <button onClick={() => ProjectData.navigateProject(1)} style={{...navigationButtonStyle}}>{">"}</button>
            </div>

            <div style={{ 
              width: "100%",
              maxWidth: "600px",
              backgroundColor: "rgba(0,0,0,0.7)", 
              color: "white", 
              maxHeight: "30vh",
              overflowY: "auto",
            }}>
              <div style={{ marginBottom: "15px" }}>
                <p style={{ marginBottom: "12px", fontSize: isMobile ? "0.8rem" : "1rem" }}>{selectedProject.description}</p>
                <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "15px" }}>
                  {selectedProject.technologies.map((tech, index) => (
                    <li key={index} style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "4px 8px", borderRadius: "12px", fontSize: isMobile ? "0.7rem" : "0.9rem" }}>{tech}</li>
                  ))}
                </ul>
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => {
                    ProjectData.closeProject();
                    // If you have a function to reset the carousel, call it here
                    // For example: resetCarousel();
                  }}
                  style={{
                    ...navigationButtonStyle,
                    borderRadius: "20px",
                    padding: "8px 16px",
                    fontSize: isMobile ? "0.8rem" : "1rem"
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{
            color: "white",
            textAlign: "center",
            fontSize: isMobile ? "0.9rem" : "1.2rem"
          }}>
            Select a project to view details
          </div>
        )}
      </div>
    );
  };

  const navigationButtonStyle = {
    fontSize: "24px",
    padding: "10px 15px",
    background: "rgba(255, 255, 255, 0.2)",
    border: "none",
    borderRadius: "50%",
    color: "white",
    cursor: "pointer",
    zIndex: 2,
    pointerEvents: "auto",
  };

  const Experience = ({ isMobile }) => {
    const snap = useSnapshot(experiencesData);

    const commonStyles = {
      color: "white",
      fontSize: isMobile ? {
        title: "1.2rem",
        company: "1rem",
        position: "0.8rem",
        content: "0.6rem",
        tech: "0.5rem"
      } : {
        title: "2.5rem",
        company: "2rem",
        position: "1.5rem",
        content: "1rem",
        tech: "0.8rem"
      }
    };

    const renderContent = () => (
      <>
        <div style={{ width: "100%", marginBottom: isMobile ? "15px" : "20px" }}>
          <h2 style={{ ...commonStyles, fontSize: commonStyles.fontSize.company, marginBottom: "2px" }}>{snap[snap.activeExperience].company}</h2>
          <h3 style={{ ...commonStyles, fontSize: commonStyles.fontSize.position, marginBottom: "5px" }}>{snap[snap.activeExperience].position}</h3>
          {!isMobile && snap[snap.activeExperience].duration && (
            <p style={{ ...commonStyles, fontSize: commonStyles.fontSize.content }}>{snap[snap.activeExperience].duration}</p>
          )}
        </div>

        {isMobile && (
          <div style={{ width: "100%", height: "35vh", marginBottom: "15px" }}>
            {/* Invisible placeholder for the 3D frame */}
          </div>
        )}

        <div style={{ width: "100%", fontSize: commonStyles.fontSize.content }}>
          <ul style={{ ...commonStyles, listStyleType: "disc", paddingLeft: isMobile ? "15px" : "20px", marginBottom: isMobile ? "10px" : "20px" }}>
            {snap[snap.activeExperience].tasks.map((task, index) => (
              <li key={index} style={{ marginBottom: isMobile ? "2px" : "10px" }}>{task}</li>
            ))}
          </ul>
          {snap[snap.activeExperience].link && (
            <a 
              href={snap[snap.activeExperience].link} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "lightblue", textDecoration: "none", fontSize: commonStyles.fontSize.content }}
            >
              {snap[snap.activeExperience].link}
            </a>
          )}
          {(snap[snap.activeExperience].technologies || snap[snap.activeExperience].languages) && (
            <div style={{ marginTop: isMobile ? "10px" : "20px" }}>
              <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "4px", justifyContent: isMobile ? "center" : "flex-start" }}>
                {[...(snap[snap.activeExperience].technologies || []), ...(snap[snap.activeExperience].languages || [])].map((item, index) => (
                  <li key={index} style={{ 
                    backgroundColor: "rgba(255,255,255,0.1)", 
                    padding: isMobile ? "2px 6px" : "4px 8px", 
                    borderRadius: "12px", 
                    fontSize: commonStyles.fontSize.tech
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* {isMobile && snap[snap.activeExperience].duration && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <p style={{ ...commonStyles, fontSize: commonStyles.fontSize.content }}>{snap[snap.activeExperience].duration}</p>
          </div>
        )} */}
      </>
    );

    return (
      <div style={{ 
        height: "100vh", 
        position: "relative",
        display: "flex",
        flexDirection: "column",
        paddingTop: "80px",
      }}>
        <div className="experience-overlay" style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: isMobile ? "30px 10px 10px 10px" : "40px",
          boxSizing: "border-box",
          fontFamily: "'Inter', sans-serif",
          overflowY: "auto",
        }}>
          <h1 style={{ 
            ...commonStyles,
            textAlign: "center", 
            fontSize: commonStyles.fontSize.title, 
            marginBottom: isMobile ? "25px" : "30px",
            marginTop: isMobile ? "25px" : "40px"
          }}>Experiences</h1>
          
          {snap.activeExperience && (
            <div style={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "flex-start",
              alignItems: isMobile ? "center" : "flex-start",
              flexGrow: 1,
            }}>
              {isMobile ? (
                <div style={{ width: "100%" }}>
                  {renderContent()}
                </div>
              ) : (
                <>
                  <div style={{ width: "40%", paddingRight: "20px", display: "flex", flexDirection: "column" }}>
                    {renderContent()}
                  </div>
                  <div style={{ width: "60%", height: "100%" }}>
                    {/* Placeholder for the 3D frame */}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
    
  return(  
  <div
    className="scroll"
    style={{ color: 'white' }}>
    <div style={{ height: "100vh", width: "100vw" }}>
      <div className="dot" style={{ width: "100%" }}>
        <h1 style={{color: "white", width: "100%", textAlign: "left", fontSize: isMobile ? "1.5rem" : "5vw"}}>Welcome to my side of the Metaverse</h1>
      </div>
    </div>
    <div style={{ height: "100vh" }}>
      <div className="dot" style={{ width: "100%" }}>
        <h1 style={{color: "white", width: "100%", textAlign: "left", fontSize: isMobile ? "1.5rem" : "5vw"}}>My Toolset</h1>
      </div>
    </div>
    <Experience isMobile={isMobile} />

    <Projects isMobile={isMobile} />
    <div style={{ 
      height: "100vh", 
      position: "relative", 
      zIndex: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%"
    }}>
      <div className="dot" style={{ 
        position: "relative", 
        zIndex: 11,
        textAlign: "center",
        pointerEvents: "none",
        width: "100%"
      }}>
        <h1 style={{color: "white", width: "100%", textAlign: "center", fontSize: isMobile ? "1.5rem" : "5vw"}}>Contact me</h1>
        <p>Feel free to reach out through any of the following platforms:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <a href="https://www.linkedin.com/in/david-victor-anthony/" target="_blank" rel="noopener noreferrer" style={{...buttonStyle, pointerEvents: 'auto'}}>
            LinkedIn
          </a>
          <a href="mailto:anthonydavidvictor@gmail.com" style={{...buttonStyle, pointerEvents: 'auto'}}>
            Gmail
          </a>
          <a href="https://github.com/thepianist9" target="_blank" rel="noopener noreferrer" style={{...buttonStyle, pointerEvents: 'auto'}}>
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
