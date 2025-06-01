import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F8F8FA] border-t border-gray-200 pt-10 pb-4 px-4 mt-16 text-gray-700 text-sm relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
        {/* Columna 1: Logo y descripción */}
        <div className="flex-1 min-w-[200px] mb-8 md:mb-0">
          <div className="flex items-center gap-2 mb-2">
            <img src="/src/assets/icons/icon-adocat.png" alt="Adocat Logo" className="w-8 h-8" />
            <span className="font-bold text-lg tracking-wide">ADOCAT</span>
          </div>
          <p className="mb-4 text-xs text-gray-500 max-w-xs">Sed viverra eget fames sit varius. Pellentesque mattis libero viverra dictumst ornare sed justo convallis vitae</p>
          <div className="flex gap-3 mt-2">
            <a href="#" aria-label="Facebook"><img src="/src/assets/icons/icon-adocat.png" className="w-5 h-5 opacity-70 hover:opacity-100" /></a>
            <a href="#" aria-label="Instagram"><img src="/src/assets/icons/icon-patacat.png" className="w-5 h-5 opacity-70 hover:opacity-100" /></a>
            <a href="#" aria-label="X"><svg className="w-5 h-5 opacity-70 hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg></a>
            <a href="#" aria-label="YouTube"><svg className="w-5 h-5 opacity-70 hover:opacity-100" fill="currentColor" viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6zm12-3c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4z" /></svg></a>
          </div>
        </div>
        {/* Columna 2: Company */}
        <div className="flex-1 min-w-[120px] mb-8 md:mb-0">
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Gift cards</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </div>
        {/* Columna 3: Useful Links y Customer Service */}
        <div className="flex-1 min-w-[120px] mb-8 md:mb-0">
          <h4 className="font-semibold mb-2">Useful Links</h4>
          <ul className="space-y-1 mb-4">
            <li><a href="#" className="hover:underline">New products</a></li>
            <li><a href="#" className="hover:underline">Best sellers</a></li>
            <li><a href="#" className="hover:underline">Discount</a></li>
            <li><a href="#" className="hover:underline">F.A.Q</a></li>
          </ul>
          <h4 className="font-semibold mb-2">Customer Service</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Returns</a></li>
            <li><a href="#" className="hover:underline">Order tracking</a></li>
          </ul>
        </div>
        {/* Columna 4: Store */}
        <div className="flex-1 min-w-[180px]">
          <h4 className="font-semibold mb-2">Store</h4>
          <ul className="space-y-1">
            <li><span className="font-bold">Calle 2 de Mayo 298, Miraflores</span></li>
            <li>+775 378-6348</li>
            <li>adocat@outlook.com</li>
          </ul>
        </div>
      </div>
      {/* Línea inferior */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-4">
        <span className="text-xs text-gray-400">© Copyright Adocat, 2025. Design by Figma.guru</span>
        <div className="flex gap-3 items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-5 w-auto" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/Mastercard-logo.png" alt="Mastercard" className="h-5 w-auto" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 w-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
