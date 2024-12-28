import "./Loader.css";

const LoaderInner = () => {
  return (
    /* From Uiverse.io by KSAplay */
    <div className="loader">
      <div className="loading-text text-white font-bold text-2xl">
        Loading<span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
      <div className="loading-bar-background">
        <div className="loading-bar">
          <div className="white-bars-container">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="white-bar"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderInner;