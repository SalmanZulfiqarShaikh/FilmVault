import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-12 h-12 animate-spin text-transparent fill-blue-600"
          viewBox="0 0 100 101"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Transparent circular background (hidden by text-transparent) */}
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 
               50 100.591C22.3858 100.591 0 78.2051 
               0 50.5908C0 22.9766 22.3858 0.59082 
               50 0.59082C77.6142 0.59082 
               100 22.9766 100 50.5908Z"
            fill="currentColor"
          />
          {/* Blue arc only */}
          <path
            d="M93.9676 39.0409C96.393 38.4038 
               97.8624 35.9116 97.0079 33.5539C95.2932 
               28.8227 92.871 24.3692 89.8167 20.348C85.8452 
               15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 
               4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
               0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 
               1.69328 37.813 4.19778 38.4501 6.62326C39.0873 
               9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 
               9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 
               10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 
               17.9648 79.3347 21.5619 82.5849 25.841Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
