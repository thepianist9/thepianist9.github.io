// https://cydstumpel.nl/

import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, Environment, ScrollControls, useScroll, useTexture, Text } from '@react-three/drei'
import { easing } from 'maath'
import './util'
import { ProjectData } from './store'
import { useSnapshot } from 'valtio'

export const ScrollProjects = ({ lenis, snap }) => {
  const projectSnap = useSnapshot(ProjectData)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const [expandedCard, setExpandedCard] = useState(null)

  useEffect(() => {
    const onScroll = (e) => {
      scrollRef.current = e.progress
      
      // Check if we've scrolled to a new "view"
      if (Math.abs(scrollRef.current - lastScrollRef.current) > 0.1) {
        setExpandedCard(null) // Reset expanded card
        ProjectData.selectedProjectIndex = null // Reset selected project
        lastScrollRef.current = scrollRef.current
      }
    }
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [lenis])

  useEffect(() => {
    if (snap && typeof snap.onComplete === 'function') {
      const onSnapComplete = () => {
        // Calculate the index of the card in the center
        const cardCount = ProjectData.projects.length;
        const centerCardIndex = Math.round(scrollRef.current * cardCount) % cardCount;
        setExpandedCard(centerCardIndex);
        ProjectData.selectedProjectIndex = centerCardIndex;
      };

      snap.onComplete(onSnapComplete);
      return () => snap.onComplete(null); // Clean up
    }
  }, [snap]);

  return (
    <>
    <Rig lenis={lenis} scrollRef={scrollRef}>
      <Carousel 
        selectedIndex={projectSnap.selectedProjectIndex} 
        expandedCard={expandedCard}
      />
    </Rig>
    </>
  )
}

function Rig({lenis, children, scrollRef, ...props}) {
  const ref = useRef()
  const projectSnap = useSnapshot(ProjectData)
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (projectSnap.selectedProjectIndex !== null) {
      const targetRotation = -(projectSnap.selectedProjectIndex / ProjectData.projects.length) * Math.PI * 2 
      easing.damp(ref.current.rotation, 'y', targetRotation, 0.3, delta)
      easing.damp(ref.current.rotation, 'x', 0, 0.3, delta)
      easing.damp(ref.current.rotation, 'z', 0, 0.3, delta)
    } else {
      // Rotate based on scroll position when no card is selected
      const scrollRotation = scrollRef.current * Math.PI * 2
      easing.damp(ref.current.rotation, 'y', -scrollRotation, 0.2, delta)
      easing.damp(ref.current.rotation, 'x', 0, 0.3, delta)
      easing.damp(ref.current.rotation, 'z', 0.1, 0.3, delta)
    }

    state.camera.position.set(0, 0, 10)
    state.camera.lookAt(0, 0, 0)
  })

  return <group {...props}>
    <group ref={ref}>
      {children}
    </group>
  </group>
}

function Carousel({ selectedIndex, expandedCard }) {
  const { viewport } = useThree()
  const projectSnap = useSnapshot(ProjectData)
  const isMobile = viewport.width < 5

  // Adjust radius and image scale based on screen size
  const radius = isMobile ? 1.5 : 2.5
  const imageScale = isMobile ? 0.8 : 1

  return (
    <>
      {ProjectData.projects.map((project, index) => {
        const angle = (index / ProjectData.projects.length) * Math.PI * 2
        const isSelected = selectedIndex === index
        return (
          <Card
            key={index}
            index={index}
            url={`${process.env.PUBLIC_URL}/Projects/img${Math.floor(index % 10) + 1}_.jpg`}
            position={[
              Math.sin(angle) * radius,
              0,
              Math.cos(angle) * radius
            ]}
            rotation={[0, angle, 0]}
            scale={imageScale}
            project={project}
            onSelect={() => ProjectData.openProject(index)}
            isSelected={isSelected}
            isDarkened={selectedIndex !== null && !isSelected}
          />
        )
      })}
    </>
  )
}

function Card({ url, index, scale = 1, project, onSelect, isSelected, isDarkened, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)

  const handleClick = (e) => {
    e.stopPropagation()
    onSelect()
  }

  useFrame((state, delta) => {
    const targetScale = isSelected ? 1.25 * scale : hovered ? 1.1 * scale : scale
    easing.damp3(ref.current.scale, [targetScale, targetScale, targetScale], 0.1, delta)
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta/2)
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 0.8, 0.2, delta)
    
    // Adjust opacity based on isDarkened
    easing.damp(ref.current.material, 'opacity', isDarkened ? 0.1 : 1, 0.2, delta)
  })

  return (
    <Image 
      ref={ref} 
      url={url} 
      side={THREE.DoubleSide}
      transparent={true}
      onPointerOver={pointerOver} 
      onPointerOut={pointerOut} 
      onClick={handleClick}
      scale={scale}
      toneMapped={false}
      flipY={false}
      {...props}
    >

    </Image>
  )
}