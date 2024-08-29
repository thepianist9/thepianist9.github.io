import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, PerspectiveCamera, Html } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { experiencesData } from './store'
const GOLDENRATIO = 1.61803398875

const imagePaths = [
  `${process.env.PUBLIC_URL}/Experiences/tud.jpeg`,
  `${process.env.PUBLIC_URL}/Experiences/Entransys.jpeg`,
  `${process.env.PUBLIC_URL}/Experiences/infosys.jpeg`,
  `${process.env.PUBLIC_URL}/Experiences/MercedesBenzLogo.jpeg`,
  `${process.env.PUBLIC_URL}/Experiences/hhi.png`,



];

export const Experiences = ({ isMobile }) => {
    const aspectRatio = window.innerWidth / window.innerHeight

    const getImagePositions = (isMobile, aspectRatio) => {
        const scale = isMobile ? 0.6 : 1 // Adjust scale for mobile

        if (isMobile) {
            return [
                // Front
                { position: [0, 0, 1.5 * scale], rotation: [0, 0, 0], url: imagePaths[0] },
                // Left
                { position: [-1.75 * aspectRatio * scale, 0, 2 * scale], rotation: [0, Math.PI / 2.5, 0], url: imagePaths[1] },
                { position: [-2 * aspectRatio * scale, 0, 6 * scale], rotation: [0, Math.PI / 2.5, 0], url: imagePaths[2] },
                // Right
                { position: [1.75 * aspectRatio * scale, 0, 2 * scale], rotation: [0, -Math.PI / 2.5, 0], url: imagePaths[3] },
                { position: [2 * aspectRatio * scale, 0, 6 * scale], rotation: [0, -Math.PI / 2.5, 0], url: imagePaths[4] }
            ]
        } else {
            return [
                // Front
                { position: [0, 0, 1.5 * scale], rotation: [0, 0, 0], url: imagePaths[0] },
                // Left
                { position: [-1.25 * aspectRatio * scale, 0, 0.75 * scale], rotation: [0, Math.PI / 3, 0], url: imagePaths[1] },
                { position: [-1.5 * aspectRatio * scale, 0, 2 * scale], rotation: [0, Math.PI / 3, 0], url: imagePaths[2] },
                // Right
                { position: [1.25 * aspectRatio * scale, 0, 0.75 * scale], rotation: [0, -Math.PI / 3, 0], url: imagePaths[3] },
                { position: [1.5 * aspectRatio * scale, 0, 2 * scale], rotation: [0, -Math.PI / 3, 0], url: imagePaths[4] }
            ]
        }
    }

    const images = getImagePositions(isMobile, aspectRatio)
    console.log(images)

    return(
        <>
            <Lights preset="city" />
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={70} />
            <fog attach="fog" args={['#191920', 0, 15]} />
            <group position={[0, -0.5, 0]}>
                <Frames images={images} isMobile={isMobile} />
                <Floor />
            </group>
        </>
    )
}

// Separate component for the floor
const Floor = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 10]} />
        <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024} // Reduced from 2048
            mixBlur={1}
            mixStrength={40} // Reduced from 80
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#030303" // Darker color
            metalness={0.8} // Reduced from 0.8
        />
    </mesh>
)

function Frames({ images, isMobile, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  const [activeFrame, setActiveFrame] = useState(null)
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, 5.5))
  const [targetQuaternion, setTargetQuaternion] = useState(new THREE.Quaternion())

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      const newPosition = new THREE.Vector3(0, isMobile ? GOLDENRATIO/4 : GOLDENRATIO / 2, isMobile ? 2.2 : 1.6)
      clicked.current.parent.localToWorld(newPosition)
      const newQuaternion = new THREE.Quaternion()
      clicked.current.parent.getWorldQuaternion(newQuaternion)
      setTargetPosition(newPosition)
      setTargetQuaternion(newQuaternion)
      setActiveFrame(clicked.current.name)
      
      // Update experiencesData with the selected frame's URL
      const selectedImage = images.find(img => getUuid(img.url) === clicked.current.name)
      if (selectedImage) {
        experiencesData.activeExperience = selectedImage.url
      }
    } else {
      setTargetPosition(new THREE.Vector3(0, isMobile ? 0 :0, isMobile ? 6 : 5.5)) 
      setTargetQuaternion(new THREE.Quaternion())
      setActiveFrame(null)
      
      // Clear the selectedFrameUrl when no frame is selected
      experiencesData.activeExperience = null
    }
  }, [params, images, isMobile])

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, targetPosition, 0.4, dt)
    easing.dampQ(state.camera.quaternion, targetQuaternion, 0.4, dt)
  })

  function onClickFrame(e) {
    e.stopPropagation()
    const newLocation = clicked.current === e.object ? '/' : '/item/' + e.object.name
    setLocation(newLocation)
  }

  return (
    <group
      ref={ref}
      onClick={onClickFrame}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props) => (
        <Frame 
          key={props.url} 
          {...props} 
          active={activeFrame === getUuid(props.url)}
          isAnyActive={activeFrame !== null}
          isMobile={isMobile}
        />
      ))}
    </group>
  )
}

function Frame({ url, active, isAnyActive, isMobile, ...props }) 
{
  const image = useRef()
  const frame = useRef()
  const [hovered, hover] = useState(false)
  const name = getUuid(url)
  useCursor(hovered)

  if (isAnyActive && !active) {
    return null
  }

  const scale = isMobile ? 0.5 : 1 // Adjust scale for mobile

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => { hover(false) }}
        scale={[1 * scale, GOLDENRATIO * scale, 0.05 * scale]}
        position={[0, (GOLDENRATIO / 2) * scale, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.6]} scale={[0.9, 0.94, 1]} url={url} zoom={0.6} />
      </mesh>
      {!active && (
        <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55 * scale, GOLDENRATIO * scale, 0]} fontSize={0.025 * scale}>
          {name.split('-').join(' ')}
        </Text>
      )}
    </group>
  )
}

function Lights({ preset }) {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[20, 30, 10]} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <Environment preset={preset} />
    </>
  )
}