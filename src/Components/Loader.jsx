const Loader = () => {
  return (
    <div className="w-[3.25em] animate-spin">
      <svg viewBox="25 25 50 50" className="origin-center">
        <circle
          cx="50"
          cy="50"
          r="20"
          className="fill-none stroke-[hsl(214,97%,59%)] stroke-2 stroke-dasharray-[1_200] stroke-dashoffset-0 stroke-linecap-round animate-dash"
        ></circle>
      </svg>
    </div>
  );
};

export default Loader;
