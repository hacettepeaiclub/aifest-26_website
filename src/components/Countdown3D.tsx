import { useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const TARGET_DATE = new Date('2026-10-24T10:00:00').getTime();

function TimeBlock({ value, label, position }: { value: string, label: string, position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  return (
    <group position={position} ref={group}>
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5}>
        {/* Glass Base */}
        <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.3, 1.3, 0.3, 64]} />
          <meshPhysicalMaterial
            color="#4E439B" // hero background purple tone (accent)
            metalness={0.1}
            roughness={0.2}
            transmission={0.8}
            thickness={0.5}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Number */}
        <Center position={[0, 0.15, 0.1]}>
          <Text3D
            font={`${import.meta.env.BASE_URL}helvetiker_regular.typeface.json`}
            size={0.75}
            height={0.15}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {value}
            <meshStandardMaterial color="#ffffff" metalness={0.61} roughness={0.2} />
          </Text3D>
        </Center>

        {/* Label */}
        <Text
          position={[0, -0.55, 0.1]}
          fontSize={0.22}
          color="#FDE68A" // yellow-ish tint
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </Float>
    </group>
  );
}

function ResponsiveGroup({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  // Total width of blocks is about 8 units. Fit to viewport.
  const scale = Math.min(1, viewport.width / 9);

  return <group scale={scale}>{children}</group>;
}

export default function Countdown3D() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    // Initial call
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;
    if (distance > 0) {
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'GÜN', value: timeLeft.days.toString().padStart(2, '0') },
    { label: 'SAAT', value: timeLeft.hours.toString().padStart(2, '0') },
    { label: 'DAKİKA', value: timeLeft.minutes.toString().padStart(2, '0') },
    { label: 'SANİYE', value: timeLeft.seconds.toString().padStart(2, '0') }
  ];

  return (
    <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] flex items-center justify-center my-6 sm:my-8 relative z-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

        {/* Environment for glass reflections */}
        <Environment preset="city" />

        <ResponsiveGroup>
          {/* We spread them horizontally */}
          <TimeBlock value={timeUnits[0].value} label={timeUnits[0].label} position={[-3.75, 0, 0]} />
          <TimeBlock value={timeUnits[1].value} label={timeUnits[1].label} position={[-1.25, 0, 0]} />
          <TimeBlock value={timeUnits[2].value} label={timeUnits[2].label} position={[1.25, 0, 0]} />
          <TimeBlock value={timeUnits[3].value} label={timeUnits[3].label} position={[3.75, 0, 0]} />
        </ResponsiveGroup>

        {/* Soft shadow on the "floor" */}
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={10} />
      </Canvas>
    </div>
  );
}
