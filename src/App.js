import { useRef, useState, useEffect, Suspense, useCallback } from 'react'
import { Canvas, addEffect } from '@react-three/fiber'
import { useProgress, PerformanceMonitor,Image as ImageImpl, Preload, PivotControls } from '@react-three/drei'
import {View,OrthographicCamera,PerspectiveCamera, OrbitControls, Environment} from '@react-three/drei'
// import { hatch } from 'ldrs'

import { Overlay } from './Overlay'
import { ResponsiveAppBar } from './Navbar'
import { Intro } from './Intro'
import { Skills } from './Skills'
import { Experiences } from './Experiences'
import { Contact } from './Contact'
import { ScrollProjects } from './ScrollProjects'
import Lenis from 'lenis'
import Snap from 'lenis/snap'



export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dpr, setDpr] = useState(1.5);
  const canvas = useRef();
  const container = useRef();
  const lenisRef = useRef(null);
  const snapRef = useRef(null);
  const [activeViewIndex, setActiveViewIndex] = useState(0);

  // Setup Lenis and Snap
  useEffect(() => {
    lenisRef.current = new Lenis({ 
      syncTouch: true,
      lerp: 0.08,
      smoothWheel: true,
      autoResize: true,
    });

    const snapConfig = {
      type: 'mandatory',
      velocityThreshold: 1,
      onSnapStart: () => console.log('Snap started'),
      onSnapComplete: () => console.log('Snap completed'),
      lerp: 0.05,
      easing: (t) => t,
      duration: 1,
    };

    snapRef.current = new Snap(lenisRef.current, snapConfig);

    // Add Lenis to the render loop
    const unsubscribe = addEffect((time) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
    });

    return () => {
      unsubscribe();
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  // Function to calculate and set snap points
  const setSnapPoints = useCallback(() => {
    console.log("setSnapPoints")
    if (!snapRef.current) return;

    const numSections = 5; // Adjust based on your actual number of sections
    const snapPoints = Array.from({ length: numSections }, (_, i) => window.innerHeight * i);
    
    // Manually reset snap points
    snapRef.current.points = [];


    
    // Add new snap points
    snapPoints.forEach(point => snapRef.current.add(point));
    const anchor = document.querySelector(
      '#Home'
    );

    if (anchor) {
      console.log("scrolling to top")
      lenisRef.current.scrollTo(anchor);
      anchor.scrollIntoView({
        block: 'center',
      });
    }

  }, []);

  // Set up initial snap points and add resize listener
  useEffect(() => {
    setSnapPoints();
    window.addEventListener('resize', setSnapPoints);

    return () => {
      window.removeEventListener('resize', setSnapPoints);
    };
  }, [setSnapPoints]);

  // Add this new useEffect to track the active view
  useEffect(() => {
    if (!lenisRef.current) return;

    const handleScroll = ({ scroll, limit }) => {
      const viewHeight = window.innerHeight;
      const currentViewIndex = Math.floor(scroll / viewHeight);
      setActiveViewIndex(currentViewIndex);
    };

    lenisRef.current.on('scroll', handleScroll);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.off('scroll', handleScroll);
      }
    };
  }, []);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="container" ref={container} id='container'>
        {/* Views */}
        <View index={0} className='View' id="Home" >
          {/* <color attach="background" args={["#fff"]} /> */}
          <OrthographicCamera makeDefault fov={90} position = {[11, 100, 100]} zoom= {50} gl={{ preserveDrawingBuffer: true }}/>
          <Intro />
        </View>
        <View index={1}  className='View' id="Skills">
          <PerspectiveCamera makeDefault fov={90} position={[0,0, 30]}/>
          <color attach="background" args={['#121212']} />
          <Skills isActive={activeViewIndex === 1} />
          <OrbitControls autoRotate={"off"} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.25} />
        </View>
        <View index={2} className='View' id="Experiences" >
          <color attach="background" args={['#121212']} />
          <Experiences />
        </View> 

         <View index={3} className='View' id="Projects">
         <PerspectiveCamera makeDefault fov={10} position={[0,0, 10]}/>
         <color attach="background" args={['#121212']} />
         {/* <OrbitControls autoRotate={"off"} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.25} /> */}
          {lenisRef.current && <ScrollProjects lenis={lenisRef.current} />}
         </View>
     
        <View index={4} className='View' id="Contact">
        <color attach="background" args={['#121212']} />
          <Contact />
       </View>
      </div>
      
      <Suspense fallback={null}>
        <Canvas
          style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}
          gl={{ antialias: false }}
          dpr={dpr}
          shadows
          eventSource={document.getElementById('root')}
          eventPrefix="client"
          ref={canvas}
          onCreated={handleLoaded}
        >
          <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
            <View.Port />
            <Preload all />
          </PerformanceMonitor>
        </Canvas>
      </Suspense>

      {isLoaded && <ResponsiveAppBar lenis={lenisRef.current}/>}
      <LoadingScreen onLoaded={handleLoaded} />
      {isLoaded && <Overlay />}
    </>
  );
}

const LoadingScreen = ({ onLoaded }) => {
  const { progress, loaded } = useProgress();
  
  useEffect(() => {
    if (progress === 100 && loaded) {
      const timer = setTimeout(onLoaded, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, loaded, onLoaded]);

  return (
    <div className={`loadingScreen ${loaded ? "loadingScreen--started" : ""}`}> 
      <div className='loadingScreen__progress'>
        <l-hatch size="28" stroke="4" speed="3.5" color="black"></l-hatch>
      </div> 
    </div>
  );
};

function Lights({ preset }) {
  return (
    <>
      <ambientLight intensity={2} />
      <pointLight position={[20, 30, 10]} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset={preset} />
    </>
  )
}