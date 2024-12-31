function Loader() {
  return (
    <div className="loader-container">
      <svg viewBox="0,0,550,160">
        {/* <text x="50%" y="50%" dy=".32em" dx="-2.1em" textAnchor="start" className="text-body">
          {"<"}
        </text> */}
        <text x="50%" y="50%" dy=".32em" textAnchor="middle" className="text-body">
          Fast Pizza
        </text>

        {/* <text x="50%" y="50%" dy=".32em" dx="2.7em" textAnchor="end" className="text-body">
          {"/>"}
        </text> */}
      </svg>
    </div>
  );
}

export default Loader;
