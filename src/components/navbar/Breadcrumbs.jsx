import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean); // Remove empty parts

  const buildPath = (index) => `/${pathnames.slice(0, index + 1).join("/")}`;

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm  mt-[86px] max-md:mt-[86px] max-sm:mt-[130px]">
      <div className="container">
        <div className="container mx-auto px-4 py-3 flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/home" className="hover:underline text-gray-800 font-medium">
            Home
          </Link>
    
          {pathnames.map((name, index) => {
            const routeTo = buildPath(index);
            const isLast = index === pathnames.length - 1;
          
            return (
              <div key={name} className="flex items-center space-x-2">
                <FaChevronRight className="text-xs text-gray-400" />
                {isLast ? (
                  <span className="text-gray-500 capitalize">{decodeURIComponent(name)}</span>
                ) : (
                  <Link
                    to={routeTo}
                    className="hover:underline capitalize text-gray-800 font-medium"
                  >
                    {decodeURIComponent(name)}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
