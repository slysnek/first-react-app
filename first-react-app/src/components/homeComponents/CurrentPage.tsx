import React from "react";

function CurrentPage(props: { currentPage: string }) {
  return <div className="current-page">{`Current Page: ${props.currentPage}`}</div>;
}

export default CurrentPage;
