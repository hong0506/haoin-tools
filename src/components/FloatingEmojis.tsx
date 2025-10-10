import { useEffect, useState } from 'react';

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export const FloatingEmojis = () => {
  const [emojis] = useState<Emoji[]>(() => {
    const emojiList = ['✨', '🚀', '💡', '🎨', '⚡', '🎯', '💻', '🔧', '📊', '🎉', '💎', '🌟'];
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute text-4xl opacity-20 animate-float-slower"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            animationDelay: `${emoji.delay}s`,
            animationDuration: `${emoji.duration}s`,
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
};
