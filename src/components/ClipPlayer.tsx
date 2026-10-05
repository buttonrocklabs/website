import { useEffect, useRef, useState } from "react";

/* A 9:16 clip player that loads its poster and file only when it nears the viewport.
   <video> has no native loading="lazy", so an IntersectionObserver sets src and poster.
   Never autoplays. Starting one clip pauses any other clip on the page. */

type Props = {
  src: string;
  poster: string;
  label: string;
};

export default function ClipPlayer({ src, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pauseOthers = () => {
    document.querySelectorAll("video").forEach((v) => {
      if (v !== ref.current && !v.paused) v.pause();
    });
  };

  return (
    <video
      ref={ref}
      className="w-full rounded-xl bg-black border border-border/60"
      style={{ aspectRatio: "9 / 16" }}
      controls
      playsInline
      preload="metadata"
      poster={near ? poster : undefined}
      src={near ? src : undefined}
      aria-label={label}
      onPlay={pauseOthers}
    />
  );
}
