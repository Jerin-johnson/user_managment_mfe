import React from "react";
const Footer = React.lazy(() =>
  import("shared/Footer").catch(() => ({
    default: () => <div>⚠️ User module failed to load</div>,
  })),
);

const HostFooter = () => {
  return (
    <div>
      <Footer />
    </div>
  );
};

export default HostFooter;
