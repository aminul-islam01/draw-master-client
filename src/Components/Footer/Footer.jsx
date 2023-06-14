import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="p-10 bg-base-300 text-base-content">
            <Link to="/" className="font-bold text-green-500">
                <span className="italic text-red-500">DRAW </span> MASTER CLASS</Link>
            <footer className="footer mt-4">
                <div>
                    <span className="footer-title">Services</span>
                    <a className="link link-hover">Drawing</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Painting</a>
                </div>
                <div>
                    <span className="footer-title">Newsletter</span>
                    <div className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="relative">
                            <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" />
                            <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="footer-title">Social</span>
                    <div className="grid grid-flow-col gap-4 text-xl ">
                        <Link><FaFacebook className="text-blue-700"></FaFacebook></Link>
                        <Link><FaYoutube className="text-red-500"></FaYoutube></Link>
                        <Link><FaTwitter className="text-blue-500"></FaTwitter></Link>
                    </div>
                </div>
            </footer>
            <div className="p-4 bg-base-300 text-base-content text-center">
                <p>Copyright © 2023 - All right reserved by Draw Master Class</p>
            </div>

        </div>
    );
};

export default Footer;