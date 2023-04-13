const loopSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Skeleton = () => (
  <div role="status" className="animate-pulse">
    {loopSkeleton.map((skeleton) => (
      <div key={skeleton}>
        <div className="mx-auto mb-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="mx-auto h-2.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
    ))}
    <div className="flex items-center justify-center">
      <svg
        className="mr-2 h-px w-full text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="mr-3 h-2.5 w-screen rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-2 w-screen rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default Skeleton;
