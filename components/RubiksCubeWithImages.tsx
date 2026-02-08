"use client";

import React, { useMemo, useRef, useState } from "react";

type FaceName = "front" | "right" | "back" | "left" | "top" | "bottom";

type FaceImages = {
  front: string[];
  right: string[];
  back: string[];
  left: string[];
  top: string[];
  bottom: string[];
};

type RubiksCubeProps = {
  images: FaceImages;
  stickerSize?: number;
  gap?: number;
  depth?: number;
  initialRotation?: { xDeg: number; yDeg: number };
  draggable?: boolean;
};

const faceOrder: FaceName[] = ["front", "right", "back", "left", "top", "bottom"];

export default function RubiksCubeWithImages({
  images,
  stickerSize = 52,
  gap = 3,
  depth = 90,
  initialRotation = { xDeg: -22, yDeg: 35 },
  draggable = true,
}: RubiksCubeProps) {
  const normalized = useMemo(() => {
    const out: Record<FaceName, string[]> = {
      front: images.front?.slice(0, 9) ?? [],
      right: images.right?.slice(0, 9) ?? [],
      back: images.back?.slice(0, 9) ?? [],
      left: images.left?.slice(0, 9) ?? [],
      top: images.top?.slice(0, 9) ?? [],
      bottom: images.bottom?.slice(0, 9) ?? [],
    };

    (Object.keys(out) as FaceName[]).forEach((face) => {
      const arr = out[face];
      while (arr.length < 9) arr.push("");
      if (arr.length > 9) arr.length = 9;
    });

    return out as FaceImages;
  }, [images]);

  const [rotX, setRotX] = useState(initialRotation.xDeg);
  const [rotY, setRotY] = useState(initialRotation.yDeg);

  const dragging = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!draggable) return;
    dragging.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggable) return;
    if (!dragging.current || !last.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };

    setRotY((v) => v + dx * 0.4);
    setRotX((v) => v - dy * 0.4);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggable) return;
    dragging.current = false;
    last.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const faceSize = stickerSize * 3 + gap * 2;
  const cubeSize = faceSize;

  const faceTransform: Record<FaceName, string> = {
    front: `translateZ(${depth}px)`,
    back: `rotateY(180deg) translateZ(${depth}px)`,
    right: `rotateY(90deg) translateZ(${depth}px)`,
    left: `rotateY(-90deg) translateZ(${depth}px)`,
    top: `rotateX(90deg) translateZ(${depth}px)`,
    bottom: `rotateX(-90deg) translateZ(${depth}px)`,
  };

  const styles = {
    scene: {
      width: cubeSize + depth * 2,
      height: cubeSize + depth * 2,
      display: "grid",
      placeItems: "center" as const,
      perspective: 1200,
      userSelect: "none" as const,
    },
    cube: {
      position: "relative" as const,
      width: cubeSize,
      height: cubeSize,
      transformStyle: "preserve-3d" as const,
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      transition: dragging.current ? "none" : "transform 120ms linear",
      cursor: draggable ? (dragging.current ? "grabbing" : "grab") : "default",
    },
    face: {
      position: "absolute" as const,
      inset: 0,
      display: "grid",
      gridTemplateColumns: `repeat(3, ${stickerSize}px)`,
      gridTemplateRows: `repeat(3, ${stickerSize}px)`,
      gap: `${gap}px`,
      padding: 0,
      transformStyle: "preserve-3d" as const,
      background: "rgba(0,0,0,0.65)",
      borderRadius: 10,
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      border: "1px solid rgba(255,255,255,0.08)",
    },
    sticker: {
      width: stickerSize,
      height: stickerSize,
      borderRadius: 6,
      overflow: "hidden" as const,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      position: "relative" as const,
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      display: "block",
      transform: "translateZ(0)",
    },
    empty: {
      display: "grid",
      placeItems: "center" as const,
      width: "100%",
      height: "100%",
      fontSize: 10,
      letterSpacing: 0.5,
      color: "rgba(255,255,255,0.55)",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
    },
    hint: {
      marginTop: 10,
      fontSize: 12,
      color: "rgba(0,0,0,0.7)",
      textAlign: "center" as const,
    },
    wrap: {
      display: "inline-block",
    },
  };

  const renderSticker = (src: string, face: FaceName, index: number) => {
    return (
      <div key={`${face}-${index}`} style={styles.sticker}>
        {src ? (
          <img
            src={src}
            alt={`${face}-${index}`}
            style={styles.img}
            draggable={false}
          />
        ) : (
          <div style={styles.empty}>{`${face.toUpperCase()} ${index + 1}`}</div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.wrap}>
      <div
        style={styles.scene}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div style={styles.cube}>
          {faceOrder.map((face) => (
            <div
              key={face}
              style={{
                ...styles.face,
                transform: faceTransform[face],
              }}
            >
              {normalized[face].map((src, idx) =>
                renderSticker(src, face, idx)
              )}
            </div>
          ))}
        </div>
      </div>

      {draggable && <div style={styles.hint}>Drag to rotate</div>}
    </div>
  );
}
