import { proxy } from "valtio"

const experiencesData = proxy({
    activeExperience: "",
    '/Experiences/tud.jpeg': {
        company: 'Technische Universität Dresden',
        position: 'Research Assistant',
        duration: 'Oct 2021 - April 2022',
        tasks: [
            'Developed the ”Geheim!” app, leveraging Unity’s AR Foundation to bring historical buildings to life in virtual tours, providing users with an immersive experience of the campus’s past.',
            'Successfully deployed the app on the Android and iOS App stores'
        ],
        technologies: ['Unity Game Engine', 'Mapbox', 'AR Foundation'],
        languages: ['C#'],
        link: 'https://hccms.inf.tu-dresden.de/'
    },
'/Experiences/MercedesBenzLogo.jpeg': {
    company: 'Mercedes-Benz AG',
    position: 'Intern',
    duration: 'June, 2022 - Oct 2022',
    tasks: [
        'Implemented an approach for procedural generation of landscapes and placement of content relative to the road in a VR research project.',
        'Placed a virtual vehicle in the scene using Mercedes-Benz Virtual Reality SDK (MB VR-SDK) and Mapbox SDK compatible with any road network.',
        'Automated placement of detailed content like trees and grass along virtual roads, compatible with any road network.',
        'Optimized the scene for real-time performance using Level-of-Detail (LOD) techniques.',
    ],
    technologies: ['Unity 3D Engine', 'Maps SDK for Unity', 'Mercedes-Benz Virtual Reality SDK', 'Mapbox', 'Level-of-Detail (LOD)'],
    languages: ['C#'],
    link: 'https://www.mercedes-benz.com'
},
    '/Experiences/infosys.jpeg': {
        company: 'Infosys',
        position: 'Intern',
        duration: 'Oct 2022 - Present',
        tasks: [
            'Developed web applications using Java with Spring framework',
            'Worked on database management and optimization using SQL',
            'Implemented backend logic and data processing with Python'
        ],
        technologies: ['Spring Framework', 'SQL', 'Web Development'],
        languages: ['Java', 'Python', 'SQL'],
    },
  '/Experiences/hhi.png': {
    company: 'Fraunhofer Institute',
    position: 'Research Assistant',
    duration: 'April 2023 - Present',
    tasks: [
        'Developed a cross-platform architectural template for immersive extended reality experiences, encompassing AR, VR, desktop, and tablet platforms.',
        'Contributed to the testing and deployment of the Compair application for Android and iOS app stores.',
        'Implemented new system design patterns for the Smartsite and Econom projects, including the development of a new UI system for both.',
        "Participated in demonstrating projects at various conferences and expos, showcasing the institute's technological advancements."
    ],
    technologies: ['AR', 'VR', 'Cross-platform development', 'UI/UX design', "Mongo DB", "Networking", "Unity 3D"],
    languages: [],
    link: 'https://www.fraunhofer.de/en.html'
},
    '/Experiences/Entransys.jpeg': {
        company: 'Entransys Private Limited',
        position: 'Intern',
        duration: '',
        tasks: [
            'Developed a prototype for the Automatic Number Plate Recognition (ANPR) system of the Parkeze project',
            'Conducted research and development on early stage optical character recognition (OCR) algorithms'
        ],
        technologies: ['Optical character recognition', 'Open CV', 'TensorFlow'],
        languages: ['Python'],
    }
    // Add similar objects for other experiences with unique ids

});
const ProjectData = proxy({
  selectedProjectIndex: null,
  navigateProject(direction) {
    if (this.selectedProjectIndex !== null) {
      const projectCount = this.projects.length;
      this.selectedProjectIndex = (this.selectedProjectIndex + direction + projectCount) % projectCount;
    }
  },
  closeProject() {
    this.selectedProjectIndex = null;
  },
  openProject(index) {
    this.selectedProjectIndex = index;
  },
  projects: [
    {
      title: "Histocaching",
      description: "A Augmented Reality mobile app to visualize historical buildings and related arhives for the city of Dresden",
      technologies: ["Unity 3D", "C#", "AR Foundation", "Mapbox"],
      duration: "3 months",
      role: "Lead Developer"
    },

    {
      title: "In-Car VR Prototype",
      description: "Developed a prototype for in car virtual reality experience to visualize nature scenes from the comfort of your car",
      technologies: ["Unity 3D", "Mapbox", "Mercedes-Benz Virtual Reality SDK"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "Immigration vs Emigration Deutschland VR",
      description: "Developed an Immersive VR DataVisualisation for the (Meta Quest 2) to make easy inferences on the Immigration and Emigration dataset of Germany.",
      technologies: ["Unity 3D", "IATK framework", "Blender"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "Bird Song Classification",
      description: "Developed and built a multi-label image classifier using Python (RES-NET50) for mel-spectrogram converted bird songs.",
      technologies: ["Tensorflow", "Python"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "Hybrid Spaces",
      description: "Prototype to create a hybrid space between the physical and digital world using AR and VR using Networking solutions for audio and video streaming as well",
      technologies: ["Unity 3D", "Photon", "Agora"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "Netflix Clone Recommendation System",
      description: "Developed a Netflix clone with a recommendation system based on text similarity of movie descriptions using Python and TensorFlow.",
      technologies: ["React", "Python", "TensorFlow", "JavaScript"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "3D Door Configurator",
      description: "Developed a 3D Configurator system users to visualizeand customize doors with complex comfiguration",
      technologies: ["React", "Three js", "Blender"],
      duration: "3 months",
      role: "Lead Developer"
    }
  ],
});


export { ProjectData, experiencesData }