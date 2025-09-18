import { Link, useLocation } from "react-router-dom";

function PageBreadcrumb({ pageTitle }) {
  const location = useLocation();
  const pathname = location.pathname;

  const pathSegments = pathname.split("/").filter((seg) => seg.length > 0);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    const isLast = index === pathSegments.length - 1;

    return (
      <li key={href}>
        {!isLast ? (
          <Link to={href} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            {label.toUpperCase()}
            <svg className="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ) : (
          <span className="text-sm text-gray-800 dark:text-white/90">{label.toUpperCase()}</span>
        )}
      </li>
    );
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">{pageTitle || breadcrumbItems.at(-1)}</h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" to="/">
              HOME
              <svg className="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          {breadcrumbItems}
        </ol>
      </nav>
    </div>
  );
}

export default PageBreadcrumb;