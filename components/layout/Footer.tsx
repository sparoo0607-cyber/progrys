import Link from "next/link";
import { MessageCircle, Camera, Briefcase, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#A1A1AA] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white mb-4 inline-block tracking-tight">
              PROGRYS
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Everything a student needs. All in one place. We empower your learning journey with the best resources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#2A2A2A] hover:text-white transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#2A2A2A] hover:text-white transition-colors">
                <Camera size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#2A2A2A] hover:text-white transition-colors">
                <Briefcase size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#2A2A2A] hover:text-white transition-colors">
                <Globe size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Platform</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/store" className="hover:text-white transition-colors">Store</Link></li>
              <li><Link href="/roadmaps" className="hover:text-white transition-colors">Roadmaps</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link href="/knowledge-hub" className="hover:text-white transition-colors">Knowledge Hub</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/policies#refunds" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/policies#shipping" className="hover:text-white transition-colors">Delivery</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/policies#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies#terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#27272A] flex flex-col md:flex-row justify-between items-center text-xs">
          <p>Built for the modern student.</p>
          <p className="mt-4 md:mt-0">&copy; {new Date().getFullYear()} Progrys. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
