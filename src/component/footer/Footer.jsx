import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const footerLinks = [
  {
    title: "Know More",
    links: [
      { name: "About Us", href: "#" },
      { name: "Company Story", href: "#" },
      { name: "Our blog", href: "#" },
    ],
  },
  {
    title: "Shop",
    links: [
      { name: "Books", href: "#" },
      { name: "Order Status", href: "#" },
      { name: "Coupon", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Meet our Authors", href: "#" },
      { name: "Contact Form", href: "#" },
      { name: "FAQS", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
]

const socialLinks = [
  { name: "Facebook", icon: FaFacebook, href: "#" },
  { name: "Instagram", icon: FaInstagram, href: "#" },
  { name: "YouTube", icon: FaYoutube, href: "#" },
  { name: "Twitter", icon: FaTwitter, href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-light">Sign Up for Our Newsletter</h2>
          <p className="text-gray-400 mb-4">Fermentum tempor cubilia risus tellus massa dis consectetur dolor.</p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <input
              type="email"
              placeholder="Enter email"
              className="bg-gray-800 text-white border-gray-700 w-full sm:w-auto p-2 rounded-md"
            />
            <Button type="submit" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto border-0">SUBSCRIBE</Button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8 border-t border-white pt-4">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-4">Stay connected and get interesting news & coupons</p>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-6 h-6 hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>Copyright © {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
