import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="footer footer-center p-4  border-t-2  pb-10 ">
      <aside>
        Built By <span className="underline"> Mahendra S H</span>
      </aside>
    </footer>
  );
};

export default Footer;
