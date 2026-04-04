import React from 'react';

const PageLoader: React.FC = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      <p className="text-sm text-[--text-2]">Loading...</p>
    </div>
  </div>
);

export default React.memo(PageLoader);
