import React from 'react';
import attaLogoImg from '@/src/assets/images/atta_official_logo_1785294982475.jpg';

interface AttaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AttaLogo: React.FC<AttaLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  }[size];

  return (
    <div className={`relative rounded-full overflow-hidden shrink-0 border border-[#EAB308]/70 shadow-[0_0_15px_rgba(234,179,8,0.3)] bg-black ${sizeClasses} ${className}`}>
      <img
        src={attaLogoImg}
        alt="Atta Snack Box Logo"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};
