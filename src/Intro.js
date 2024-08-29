import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Canvas, useLoader } from '@react-three/fiber'
import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial
} from '@react-three/drei'
import { useControls, button } from 'leva'
// import { EffectComposer, HueSaturation, BrightnessContrast } from '@react-three/postprocessing'

export function Intro({ isMobile }) {
  const { autoRotate, text, shadow, ...config } = {
    text: 'David',
    backside: false, // Disable backside rendering for better performance
    samples: 4, // Reduce samples for faster rendering
    resolution: 512, // Lower resolution for better performance
    transmission: 0.8,
    clearcoat: 0.2,
    clearcoatRoughness: 0.1,
    thickness: 0.4,
    chromaticAberration: 0.5, // Reduced for less computational intensity
    anisotropy: 0.2, // Slightly reduced
    roughness: 0.3, // Increased slightly for less complex calculations
    distortion: 0.2, // Reduced for better performance
    distortionScale: 0.1, // Reduced scale
    temporalDistortion: 0, // Disabled for better performance
    ior: 1.2, // Reduced for simpler calculations
    color: '#4a90e2', // Changed to a medium blue color
    gColor: '#ffa500', // Changed to cyan for a blue glow effect
    autoRotate: true,
  }

  // Adjust camera position based on isMobile
  const cameraPosition = isMobile ? [0, -0.5, 1.5] : [0, -1, 2.25]

  return (
    <><color attach="background" args={['#121212']} />
      {/** The text and the grid */}
      <Text config={config} rotation={[-Math.PI / 2, 0, 0]} position={cameraPosition} scale={isMobile ? 0.4 : 1}>
        {text}
      </Text>
      {/** Controls */}
      <OrbitControls autoRotate={autoRotate} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.25} />

      {/** The environment is just a bunch of shapes emitting light. This is needed for the clear-coat */}
      <Environment resolution={32}>
        <Lightformer 
          type="ring" 
          intensity={15} 
          rotation-y={Math.PI / 2} 
          position={[-0.1, -1, -5]} 
          scale={isMobile ? 10 : 15} 
        />
      </Environment>
    </>
  );
}

const Grid = ({ number = 6.5, lineWidth = 0.026, height = 0.25, config }) => (
  // Renders a grid and crosses as instances
  <Instances position={[0.5, -1.02, 0.5]}>
    <planeGeometry args={[lineWidth, height]}/>
    <meshBasicMaterial color="#fff" toneMapped={false} />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group key={x + ':' + y} position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}>
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      ))
    )}
  </Instances>
)

function Text({ children, config, font = `${process.env.PUBLIC_URL}/Inter_Medium_Regular.json`, ...props }) {
  return (
    <>
      <group>
        <Center scale={[0.8, 1, 1]} front top {...props}>
          <Text3D
            castShadow
            bevelEnabled
            font={font}
            scale={5}
            letterSpacing={-0.03}
            height={0.25}
            bevelSize={0.01}
            bevelSegments={6}  // Reduced from 10
            curveSegments={64} // Reduced from 128
            bevelThickness={0.01}>
            {children}
            <MeshTransmissionMaterial {...config} />
          </Text3D>
        </Center>
        <Grid config={config}/>
      </group>
    </>
  )
}