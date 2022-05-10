import Container from "../../UI/Container/Container";
import classes from "./Footer.module.scss";

const Footer = () => (
  <footer className={classes.footer}>
    <Container>
      <div>
        Copyright © 2022 <span>Kornel Kołodziejczyk</span>
      </div>
    </Container>
  </footer>
);

export default Footer;
