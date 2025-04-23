import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaYoutube,
    FaInstagram,
    FaTwitter,
    FaWhatsapp,
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-400">
            <div className="border-t border-gray-800 py-12 container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 text-center md:text-left"> {/* Added text-center on mobile */}
                    <div className="flex items-center mb-4 md:mb-0">
                        <span className="text-xl font-bold text-lime-500 mr-2">
                            Finantech X
                        </span>
                    </div>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                            aria-label="YouTube"
                        >
                            <FaYoutube size={24} />
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                            aria-label="Instagram"
                        >
                            <FaInstagram size={24} />
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                            aria-label="Twitter"
                        >
                            <FaTwitter size={24} />
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp size={24} />
                        </a>
                    </div>
                </div>
{/* Added text-center on mobile */}
                {/* <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8 text-center md:text-left">  
                    <div>
                        <h4 className="font-semibold text-white mb-4">Home</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    Home 1
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    Home 2
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    Home 3
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/team" className="hover:text-white transition-colors">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link to="/clients" className="hover:text-white transition-colors">
                                    Clients
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/blog" className="hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/portfolio" className="hover:text-white transition-colors">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="hover:text-white transition-colors">
                                    Services
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/contact" className="hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/search" className="hover:text-white transition-colors">
                                    Search
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Pages</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/shop" className="hover:text-white transition-colors">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="hover:text-white transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="/testimonials" className="hover:text-white transition-colors">
                                    Testimonials
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div> */}

                <div className="text-center flex flex-col text-sm">
                    <div>&copy; Finantech X. All Rights Reserved. Licensing.</div>
                    <div>Your trusted financial partner online.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
