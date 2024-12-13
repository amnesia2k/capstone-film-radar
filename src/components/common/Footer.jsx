import { footerLinks } from ".";

const Footer = () => {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <div className="mt-10 py-5 border-t mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 text-base md:text-lg font-semibold">
        <div className="flex gap-5">
          {footerLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="transition-all hover:underline hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div>
          <p>
            &copy; 2024 | Made with 💛 by{" "}
            <a
              href="https://www.tiktok.com/@codewithkang"
              className="underline text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              amnesia2k
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

// add an about footer link that leads to my portfolio when done with building it
