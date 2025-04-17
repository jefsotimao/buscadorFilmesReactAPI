function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white shadow rounded p-2">
      <div className="bg-gray-300 h-96 w-full rounded"></div>
      <div className="mt-2 h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-1 h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

export default SkeletonCard;