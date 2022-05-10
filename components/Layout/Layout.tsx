import { FC, ReactNode } from "react";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import classes from "./Layout.module.scss";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <div className={classes.layout}>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
