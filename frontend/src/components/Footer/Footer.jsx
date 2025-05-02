import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo1.png";
import {
  AiFillYoutube,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

const socialLinks = [
  {
    path: "https://github.com/",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
    label: "GitHub",
  },
  {
    path: "https://www.youtube.com/",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
    label: "YouTube",
  },
  {
    path: "https://www.instagram.co",
    icon: <AiFillInstagram className="group-hover:text-white w-4 h-5" />,
    label: "Instagram",
  },
  {
    path: "https://www.linkedin.com/",
    icon: <AiFillLinkedin className="group-hover:text-white w-4 h-5" />,
    label: "LinkedIn",
  },
];

const quickLinks01 = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About Us" },
  { path: "/services", display: "Services" },
  { path: "/", display: "Blog" },
];

const quickLinks02 = [
  { path: "/find-a-doctor", display: "Find a Doctor" },
  { path: "/about", display: "Request an Appointment" },
  { path: "/", display: "Find a Location" },
  { path: "/", display: "Get a Second Opinion" },
];

const quickLinks03 = [
  { path: "/", display: "Donate" },
  { path: "/contact", display: "Contact Us" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img
              className="w-28 h-20 object-fill overflow-hidden"
              src={logo}
              alt="Site logo"
            />
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              &copy; {year} Developed. All rights reserved.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quick Links
            </h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              I want to
            </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Support
            </h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
