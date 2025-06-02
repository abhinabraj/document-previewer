export default function LoadingOverlay() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-slate-400/50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-slate-600"></div>
    </div>
  );
}
