import React from 'react'
import { Link, useLocation} from 'react-router'

export default function BreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);
  // console.log(pathnames)

  let currentLink = "";
  const breadCrumbs = pathnames.map((name, index) => {
    currentLink += `/${name}`;
    let rename = name.split("_")[0].toUpperCase();
    // console.log(currentLink)
    const isLast = index === pathnames.length - 1;

    return (
      <li key={rename} className={`breadcrumb-item ${isLast ? "active" : ""}`} aria-current={isLast ? "page" : undefined}>
        {isLast ? (
          <span>{rename}</span>
        ) : (
          <Link to={currentLink} className="text-gray-600">{rename}<span className="ml-2 mr-2">></span></Link>
          
        )}
      </li>
    );
  })

  return (
    <div>
        <ol className="flex ml-15 mt-5">
            <li className="text-gray-600">
                <Link to="/home">HOME<span className="ml-2 mr-2">></span></Link>
            </li>
            {breadCrumbs}
        </ol>
    </div>
  )
}
