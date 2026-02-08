"use client";

import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const ICON_BASE = "https://cdn.simpleicons.org";

// 6 faces: front, right, back, left, top, bottom (icons from canva, typescript, python, django, vercel, github, postgres, railway, figma, html, tailwind, google cloud)
const FACE_ICONS = [
  { slug: "typescript", color: "3178C6" },  // front
  { slug: "python", color: "3776AB" },      // right
  { slug: "django", color: "092E20" },      // back
  { slug: "figma", color: "F24E1E" },       // left
  { slug: "github", color: "181717" },      // top
  { slug: "vercel", color: "888888" },      // bottom (grey for visibility on dark)
];

const FRAME_COLOR = "#252525";

function Cubie({
  position,
  faceTextureIndices,
  textures,
}: {
  position: [number, number, number];
  faceTextureIndices: number[]; // -1 for frame, 0-5 for icon
  textures: THREE.Texture[];
}) {
  const gap = 0.03;
  const s = 1 - gap;

  const materials = useMemo(() => {
    return faceTextureIndices.map((texIdx, i) => {
      if (texIdx >= 0 && textures[texIdx]) {
        const mat = new THREE.MeshStandardMaterial({
          map: textures[texIdx],
          roughness: 0.35,
          metalness: 0.1,
        });
        if (mat.map) {
          mat.map.wrapS = mat.map.wrapT = THREE.ClampToEdgeWrapping;
        }
        return mat;
      }
      return new THREE.MeshStandardMaterial({
        color: FRAME_COLOR,
        roughness: 0.8,
        metalness: 0.05,
      });
    });
  }, [faceTextureIndices, textures]);

  return (
    <mesh position={position} material={materials}>
      <boxGeometry args={[s, s, s]} />
    </mesh>
  );
}

function TexturesLoader({ children }: { children: (tex: THREE.Texture[]) => React.ReactNode }) {
  const urls = FACE_ICONS.map(({ slug, color }) => `${ICON_BASE}/${slug}/${color}`);
  const textures = useTexture(urls);
  const texArray = Array.isArray(textures) ? textures : [textures];
  texArray.forEach((t) => {
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  });
  return <>{children(texArray)}</>;
}

function Scene({
  textures,
  autoRotate,
  isDragging,
}: {
  textures: THREE.Texture[];
  autoRotate: boolean;
  isDragging: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const offset = 1;

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate && !isDragging) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x += delta * 0.12;
    }
  });

  const { positions, faceTextureIndices } = useMemo(() => {
    const pos: [number, number, number][] = [];
    const indices: number[][] = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          pos.push([x * offset, y * offset, z * offset]);
          // BoxGeometry: 0=+x, 1=-x, 2=+y, 3=-y, 4=+z, 5=-z
          // Our icons: 0=front(+x), 1=right(+z), 2=back(-x), 3=left(-z), 4=top(+y), 5=bottom(-y)
          indices.push([
            x === 1 ? 0 : -1,   // +x face -> front (TypeScript)
            x === -1 ? 2 : -1,  // -x face -> back (Django)
            y === 1 ? 4 : -1,   // +y face -> top (GitHub)
            y === -1 ? 5 : -1,  // -y face -> bottom (Vercel)
            z === 1 ? 1 : -1,   // +z face -> right (Python)
            z === -1 ? 3 : -1,  // -z face -> left (HTML)
          ]);
        }
      }
    }
    return { positions: pos, faceTextureIndices: indices };
  }, []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, -2, 2]} intensity={0.4} />
      {positions.map((pos, i) => (
        <Cubie
          key={i}
          position={pos}
          faceTextureIndices={faceTextureIndices[i]}
          textures={textures}
        />
      ))}
    </group>
  );
}

type RubiksCube3DProps = {
  size?: number;
  autoRotate?: boolean;
  draggable?: boolean;
};

export default function RubiksCube3D({
  size = 320,
  autoRotate = true,
  draggable = true,
}: RubiksCube3DProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [5, 4, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onPointerDown={() => draggable && setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
      >
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[2, 2, 2]} />
              <meshBasicMaterial color="#666" wireframe />
            </mesh>
          }
        >
          <TexturesLoader>
            {(textures) => (
              <>
                <Scene
                  textures={textures}
                  autoRotate={autoRotate}
                  isDragging={isDragging}
                />
                {draggable && (
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    onStart={() => setIsDragging(true)}
                    onEnd={() => setIsDragging(false)}
                  />
                )}
              </>
            )}
          </TexturesLoader>
        </Suspense>
      </Canvas>
      {draggable && (
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: "rgba(0,0,0,0.7)",
            textAlign: "center",
          }}
        >
          Drag to rotate
        </div>
      )}
    </div>
  );
}
