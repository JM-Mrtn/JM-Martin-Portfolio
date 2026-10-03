import React from "react";
import Home from "./Home.jsx";
import ServiceDetail from "./ServiceDetail.jsx";
import WorkPage from "./WorkPage.jsx";
import CaseStudy from "./CaseStudy.jsx";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/work") {
    return <WorkPage />;
  }

  if (path.startsWith("/work/")) {
    const slug = decodeURIComponent(path.slice("/work/".length));
    return <CaseStudy slug={slug} />;
  }

  if (path.startsWith("/services/")) {
    const slug = decodeURIComponent(path.slice("/services/".length));
    return <ServiceDetail slug={slug} />;
  }

  return <Home />;
}
