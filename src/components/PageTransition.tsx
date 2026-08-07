import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setKey(location.pathname);
  }, [location.pathname]);

  return (
    <div key={key} className="animate-fade-up">
      {children}
    </div>
  );
}
