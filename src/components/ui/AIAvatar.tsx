import React from 'react';

interface AIAvatarProps {
  size?: number;
  spinning?: boolean;
}

const AIAvatar: React.FC<AIAvatarProps> = React.memo(({ size = 40, spinning = false }) => {
  const outerSize = size;
  const innerSize = size - 6;

  return (
    <div
      className="relative shrink-0"
      style={{ width: outerSize, height: outerSize }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)',
          animation: `spin ${spinning ? '1.5s' : '4s'} linear infinite`,
        }}
      />
      <div
        className="absolute rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: innerSize,
          height: innerSize,
          top: 3,
          left: 3,
          background: '#0f1623',
        }}
      >
        <img
          src="https://hstu.ac.bd/storage/images/logo/logo.png"
          alt="HSTU"
          className="w-[70%] h-[70%] object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
          }}
        />
        <span
          className="hidden font-heading font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          style={{ fontSize: size * 0.4 }}
        >
          H
        </span>
      </div>
    </div>
  );
});

AIAvatar.displayName = 'AIAvatar';
export default AIAvatar;
