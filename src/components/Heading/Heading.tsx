import React, { ReactNode } from "react";
import styles from "./Heading.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
interface GlobalStyleProps {
  children: ReactNode;
  className?: string;
  to?: string
}
const Heading: React.FC<GlobalStyleProps> = ({ children, className, to }) => {
  return (
    <>
      {to && <Link to={`/${to}`}>  <div className={cx("title_module_main", className)}>
        <h2 className="">{children}</h2>
      </div>
      </Link>}
      {!to && <div className={cx("title_module_main", className)}>
        <h2 className="">{children}</h2>
      </div>}

    </>

  );
};

export default Heading;
