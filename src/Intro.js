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

export function Intro() {
  const { autoRotate, text, shadow, ...config } = {
    text: 'David',
    backside: true,
    backsideThickness: 0.3,
    samples: 16,
    resolution: 512,
    transmission: 0.8,
    clearcoat: 0.1,
    clearcoatRoughness: 0.1,
    thickness: 0.4,
    chromaticAberration: 1,
    anisotropy: 0.3,
    roughness: 0.2,
    distortion: 0.3,
    distortionScale: 0.2,
    temporalDistortion: 0.1,
    ior: 1.5,
    color: '#4a90e2', // Changed to a medium blue color
    gColor: '#ffa500', // Changed to cyan for a blue glow effect
    autoRotate: true,
  }
  return (
    <><color attach="background" args={['#121212']} />
      {/** The text and the grid */}
      <Text config={config} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 2.25]}>
        {text}
      </Text>
      {/** Controls */}
      <OrbitControls autoRotate={autoRotate} enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.25} />

      {/** The environment is just a bunch of shapes emitting light. This is needed for the clear-coat */}
      <Environment resolution={16}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer type="ring" intensity={10} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={20} />
        </group>
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
            bevelSegments={10}
            curveSegments={128}
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