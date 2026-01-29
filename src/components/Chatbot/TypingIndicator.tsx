import { useEffect, useState } from "react";

export function TypingIndicator() {
  // frame cycles 0..3, used to stagger dots (now 4 dots)
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % 4);
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-3 justify-start items-center">
      <div className="shrink-0 h-8 w-8 rounded-full bg-linear-to-br from-cyan-400 to-green-400 flex items-center justify-center text-sm">
        🤖
      </div>

      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
        {[0, 1, 2].map((i) => {
          // compute offset so dots animate in sequence
          const isActive = frame === i;
          const translateY = isActive ? -4 : 0; // subtler lift
          const opacity = isActive ? 1 : 0.45;
          const scale = isActive ? 1.08 : 1;
          return (
            <span
              key={i}
              className="block h-1.5 w-1.5 rounded-full bg-gray-600 transition-all duration-700 ease-in-out"
              style={{ transform: `translateY(${translateY}px) scale(${scale})`, opacity }}
            />
          );
        })}
      </div>
    </div>
  );
}
