import { proxy } from "valtio"

const experiencesData = proxy({
    activeExperience: "",
    '/Experiences/tud.jpeg': {
        company: 'Technische Universität Dresden',
        position: 'Research Assistant',
        duration: 'Oct 2022 - Present',
        tasks: [
            'Developed machine learning models for image processing',
            'Conducted research on computer vision algorithms'
        ],
        technologies: ['Python', 'TensorFlow', 'OpenCV'],
        languages: ['Python', 'C++'],
    },
    '/Experiences/MercedesBenzLogo.jpeg': {
        company: 'Technische Universität Dresden',
        position: 'Research Assistant',
        duration: 'Oct 2022 - Present',
        tasks: [
            'Developed machine learning models for image processing',
            'Conducted research on computer vision algorithms'
        ],
        technologies: ['Python', 'TensorFlow', 'OpenCV'],
        languages: ['Python', 'C++'],
    },
    '/Experiences/infosys.jpeg': {
        company: 'Technische Universität Dresden',
        position: 'Research Assistant',
        duration: 'Oct 2022 - Present',
        tasks: [
            'Developed machine learning models for image processing',
            'Conducted research on computer vision algorithms'
        ],
        technologies: ['Python', 'TensorFlow', 'OpenCV'],
        languages: ['Python', 'C++'],
    },
    '/Experiences/hhi.png': {
        company: 'Technische Universität Dresden',
        position: 'Research Assistant',
        duration: 'Oct 2022 - Present',
        tasks: [
            'Developed machine learning models for image processing',
            'Conducted research on computer vision algorithms'
        ],
        technologies: ['Python', 'TensorFlow', 'OpenCV'],
        languages: ['Python', 'C++'],
    },
    '/Experiences/Entransys.jpeg': {
        company: 'Technische Universität Dresden',
        position: 'Research Assistant',
        duration: 'Oct 2022 - Present',
        tasks: [
            'Developed machine learning models for image processing',
            'Conducted research on computer vision algorithms'
        ],
        technologies: ['Python', 'TensorFlow', 'OpenCV'],
        languages: ['Python', 'C++'],
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
      title: "Mobile App Development",
      description: "Create a cross-platform mobile app for customers",
      technologies: ["React Native", "Firebase", "Redux"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "Mobile App Development1",
      description: "Create a cross-platform mobile app for customers",
      technologies: ["React Native", "Firebase", "Redux"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "Mobile App Development",
      description: "Create a cross-platform mobile app for customers",
      technologies: ["React Native", "Firebase", "Redux"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "Mobile App Development",
      description: "Create a cross-platform mobile app for customers",
      technologies: ["React Native", "Firebase", "Redux"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "Mobile App Development",
      description: "Create a cross-platform mobile app for customers",
      technologies: ["React Native", "Firebase", "Redux"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "Mobile App Development",
      description: "Create a cross-platform mobile app for customers",
      technologies: ["React Native", "Firebase", "Redux"],
      duration: "3 months",
      role: "Lead Developer"
    },
    {
      title: "Mobile App Development",
      description: "Create a cross-platform mobile app for customers",
      technologies: ["React Native", "Firebase", "Redux"],
      duration: "3 months",
      role: "Lead Developer"
    }
  ],
});


export { ProjectData, experiencesData }