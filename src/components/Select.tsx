interface Props {
  setZoom: (zoom: number) => void;
  resetToFit: () => void;
}

export default function Select({ setZoom, resetToFit }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "0") {
      resetToFit();
      return;
    }
    const zoom = Number(e.target.value);
    setZoom(zoom);
  };

  return (
    <select
      className="bg-slate-200 dark:bg-slate-600 dark:text-white p-3 self-end m-3 w-[200px]"
      onChange={handleChange}
    >
      <option value="0">Fit to screen</option>
      <option value="0.75">75%</option>
      <option value="1">100%</option>
    </select>
  );
}
