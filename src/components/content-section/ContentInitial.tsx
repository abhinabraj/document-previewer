import { useMemo } from "react";

interface Props {
  title: string;
}

export default function ContentInitial({ title }: Props) {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names[0].charAt(0) + names[1].charAt(0);
  };

  const backgroundColor = useMemo(() => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  return (
    <div className="flex rounded" style={{ backgroundColor }}>
      <span className="p-2">{getInitials(title)}</span>
    </div>
  );
}
