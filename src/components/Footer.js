import React from 'react';
import { Instagram, Twitter, Facebook, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/10 to-secondary/10 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Heart size={16} color="white" fill="white" />
              </div>
              <span className="text-lg font-bold gradient-text">FloTracker</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              A modern approach to menstrual health tracking designed with care for women's wellness.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href="mailto:contact@flotracker.com" 
                whileHover={{ y: -3 }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-dark mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-gray-600 hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="/tracker" className="text-sm text-gray-600 hover:text-primary transition-colors">Period Tracker</a>
              </li>
              <li>
                <a href="/insights" className="text-sm text-gray-600 hover:text-primary transition-colors">Health Insights</a>
              </li>
              <li>
                <a href="/tips" className="text-sm text-gray-600 hover:text-primary transition-colors">Wellness Tips</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-dark mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FloTracker. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Created with care by a student at Faculty of Engineering, University of Ruhuna
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;