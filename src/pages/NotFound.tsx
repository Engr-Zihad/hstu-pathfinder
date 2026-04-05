import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-heading font-bold text-[--text-1]">404</h1>
        <p className="mb-4 text-lg text-[--text-2]">পেজটি খুঁজে পাওয়া যায়নি</p>
        <a href="/chat" className="inline-block px-6 py-2 rounded-xl text-sm text-white font-medium" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
          Chat এ ফিরে যাও
        </a>
      </div>
    </div>
  );
};

export default NotFound;
