import Logo from "@/components/ui/logo";
import {
  RiFacebookBoxFill,
  RiInstagramLine,
  RiTwitterFill,
} from "react-icons/ri";
import { FiMail } from "react-icons/fi";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-[#242630] text-secondary p-10">
      <div className="grid sm:grid-cols-12 gap-5">
        <div className="col-span-4">
          <div>
            <Logo className="h-16" />
            <p className="mt-1">Explore a world of books at OceanOfTales.</p>
          </div>
          <div className="flex mt-4 space-x-3">
            <a href="#" className="text-2xl hover:scale-110">
              <RiFacebookBoxFill />
            </a>
            <a href="#" className="text-2xl hover:scale-110">
              <RiInstagramLine />
            </a>
            <a href="#" className="text-2xl hover:scale-110">
              <RiTwitterFill />
            </a>
            <a href="#" className="text-2xl hover:scale-110">
              <FiMail />
            </a>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="font-semibold text-lg">Company</h3>
          <ul className="mt-4 space-y-2">
            <li>About Us</li>
            <li>FAQ</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="col-span-3">
          <h3 className="font-semibold text-lg">Explore</h3>
          <ul className="mt-4 space-y-2">
            <li>Categories</li>
            <li>New Releases</li>
            <li>Best Sellers</li>
            <li>Featured Authors</li>
          </ul>
        </div>
        <div className="col-span-2">
          <h3 className="font-semibold text-lg">Legal</h3>
          <ul className="mt-4 space-y-2">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Disclaimer</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 sm:mt-0">
        <p className="text-sm">© {year} OceanOfTales. All rights reserved.</p>
        <p className="text-sm ml-auto">Developed by Md. Shahariar Rahman</p>
      </div>
    </footer>
  );
}
