"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export interface StackProject {
  id: string;
  title: string;
  image: string;
}

const ROTATE_INTERVAL_MS = 4500;
const FADE_MS = 350;

export default function HeroProjectStack({ projects }: { projects: StackProject[] }) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Nothing to rotate if there aren't more projects than we can show at once.
    if (projects.length <= 3) return;

    const timer = setInterval(() => {
      setFading(true);
      // Swap the underlying images at the midpoint of the fade-out, then
      // fade back in — gives a soft crossfade instead of an abrupt jump.
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % projects.length);
        setFading(false);
      }, FADE_MS);
    }, ROTATE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [projects.length]);

  const visible = [0, 1, 2].map((offset) => projects[(index + offset) % projects.length]);

  return (
    <div className="stack-wrap">
      {visible.map((p, i) => (
        <div
          key={`${p.id}-slot-${i}`}
          className={`stack-card stack-card-${i}${fading ? " stack-fading" : ""}`}
        >
          <Image src={p.image} alt={p.title} fill sizes="340px" style={{ objectFit: "cover" }} />
        </div>
      ))}
      <div className="stack-caption">
        <a href="#projects" className="stack-caption-link">See all our work →</a>
        <div className="stack-caption-sub">Based in Nairobi, Kenya</div>
      </div>
    </div>
  );
}