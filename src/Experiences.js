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

const useScreenSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

const getImagePositions = (screenWidth, screenHeight) => {
  const aspectRatio = screenWidth / screenHeight
  const scale = Math.min(screenWidth, screenHeight) / 1200 // Adjust this value to change overall scale


  if(screenWidth < 800){
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
  }
  if(screenWidth < 1700){
    return [
      // Front
      { position: [0, 0, 1.5 * scale], rotation: [0, 0, 0], url: imagePaths[0] },
      // Left
      { position: [-1.75 * aspectRatio * scale, 0, 1 * scale], rotation: [0, Math.PI / 2.5, 0], url: imagePaths[1] },
      { position: [-2 * aspectRatio * scale, 0, 5 * scale], rotation: [0, Math.PI / 2.5, 0], url: imagePaths[2] },
      // Right
      { position: [1.75 * aspectRatio * scale, 0, 1 * scale], rotation: [0, -Math.PI / 2.5, 0], url: imagePaths[3] },
      { position: [2 * aspectRatio * scale, 0, 5 * scale], rotation: [0, -Math.PI / 2.5, 0], url: imagePaths[4] }
    ]
  }
  else{
    return [
      // Front
      { position: [0, 0, 1.5 * scale], rotation: [0, 0, 0], url: imagePaths[0] },
      // Left
      { position: [-1.75 * aspectRatio * scale, 0, 1 * scale], rotation: [0, Math.PI / 2.5, 0], url: imagePaths[1] },
      { position: [-2 * aspectRatio * scale, 0, 2.7 * scale], rotation: [0, Math.PI / 2.5, 0], url: imagePaths[2] },
      // Right
      { position: [1.75 * aspectRatio * scale, 0, 1 * scale], rotation: [0, -Math.PI / 2.5, 0], url: imagePaths[3] },
      { position: [2 * aspectRatio * scale, 0, 2.7 * scale], rotation: [0, -Math.PI / 2.5, 0], url: imagePaths[4] }
    ]
  }


}

export const Experiences = () => {
    const { width, height } = useScreenSize()
    const images = getImagePositions(width, height)
    console.log(images)
    return(
        <>
            <Lights preset="city" />
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={70} />
            <fog attach="fog" args={['#191920', 0, 15]} />
            <group position={[0, -0.5, 0]}>
            <Frames images={images} />
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[25, 25]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={80}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050505"
                metalness={0.8}
            />
            </mesh>
            </group>
        </>
    )
 
};



function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
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
      const newPosition = new THREE.Vector3(0, GOLDENRATIO / 2, 1.6)
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
      setTargetPosition(new THREE.Vector3(0, 0, 5.5))
      setTargetQuaternion(new THREE.Quaternion())
      setActiveFrame(null)
      
      // Clear the selectedFrameUrl when no frame is selected
        experiencesData.activeExperience = null
    }
  }, [params, images])

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
        />
      ))}
    </group>
  )
}

function Frame({ url, active, isAnyActive, ...props }) 
{
  const image = useRef()
  const frame = useRef()
  const [hovered, hover] = useState(false)
  const name = getUuid(url)
  useCursor(hovered)

  if (isAnyActive && !active) {
    return null
  }

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => { hover(false) }}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.6]} scale={[0.9, 0.94, 1]} url={url} zoom={0.6} />
      </mesh>
      {!active && (
        <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
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