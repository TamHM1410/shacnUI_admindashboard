import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targeReft = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    if (targeReft.current) observer.observe(targeReft.current);
    return () => observer.disconnect();
  }, [options, targeReft]);

  return { targeReft, isIntersecting };
};