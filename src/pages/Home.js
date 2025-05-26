import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, BarChart2, Heart, MessageCircle, Clock, Gift, ChevronRight, Shield, Users, Award, Zap } from 'lucide-react';
import image1 from '../assets/image3.png';


const Home = () => {

    const canvasRef = useRef(null);
 

  // Features data
  const features = [
    {
      icon: <Calendar size={28} />,
      title: "Period Tracking",
      description: "Track your cycles with our intuitive calendar and get accurate predictions for your next period."
    },
    {
      icon: <BarChart2 size={28} />,
      title: "Health Insights",
      description: "Get personalized insights about your menstrual health based on your tracking data."
    },
    {
      icon: <Heart size={28} />,
      title: "Symptom Logging",
      description: "Record your symptoms, moods, and energy levels to identify patterns throughout your cycle."
    },
    {
      icon: <MessageCircle size={28} />,
      title: "Wellness Tips",
      description: "Receive tailored advice for nutrition, exercise, and self-care based on your cycle phase."
    },
    {
      icon: <Clock size={28} />,
      title: "Smart Reminders",
      description: "Never be caught unprepared with customizable notifications for your period, ovulation, and more."
    },
    {
      icon: <Gift size={28} />,
      title: "Self-Care Center",
      description: "Access guided meditations, breathing exercises, and relaxation techniques for period discomfort."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Amaya P.",
      quote: "This tracker has completely changed how I understand my body. The predictions are surprisingly accurate!",
      avatar: "AP"
    },
    {
      name: "Sachini K.",
      quote: "I love the discreet design and how easy it is to log symptoms. The insights feature has been eye-opening.",
      avatar: "SK"
    },
    {
      name: "Tharushi L.",
      quote: "As someone with irregular periods, this app helps me stay prepared and less anxious about my cycle.",
      avatar: "TL"
    }
  ];

  // Why Choose Us data
  const whyChooseUs = [
    {
      icon: <Shield size={32} />,
      title: "Privacy First",
      description: "Your data is encrypted and stored securely. We never share your personal health information.",
      stat: "100% Private"
    },
    {
      icon: <Users size={32} />,
      title: "Trusted Community",
      description: "Join thousands of women worldwide who trust FloTracker for their menstrual health.",
      stat: "50K+ Users"
    },
    {
      icon: <Award size={32} />,
      title: "Expert Approved",
      description: "Developed with gynecologists and healthcare professionals for accuracy and reliability.",
      stat: "Doctor Recommended"
    },
    {
      icon: <Zap size={32} />,
      title: "Smart Predictions",
      description: "Our AI-powered algorithm learns your unique patterns for highly accurate predictions.",
      stat: "95% Accuracy"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-6 md:py-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-dark">
                Your Personal <span className="gradient-text">Menstrual Health</span> Companion
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Track your cycle, understand your body better, and make informed decisions about your health with our intuitive and private period tracker.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/tracker" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl flex items-center">
                  Start Tracking <ChevronRight size={18} className="ml-1" />
                </Link>
                <Link to="/tips" className="bg-transparent border-2 border-primary text-primary px-6 py-3 rounded-full font-medium hover:bg-primary/10 transition-all flex items-center">
                  Explore Features <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:flex mt-8 justify-end"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
               <img 
                    src={image1} 
                    alt="Woman using FloTracker app" 
                    className="relative z-10 w-200 h-auto rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              Features Designed for <span className="gradient-text">Your Wellbeing</span>
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Our comprehensive suite of tools helps you track, understand, and improve your menstrual health.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-100"
              >
                <div className="w-12 h-12 bg-neutral rounded-full flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-b from-white to-bgLight">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose <span className="gradient-text">FloTracker</span>?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our commitment to your privacy, accuracy, and wellbeing.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="text-2xl font-bold text-primary mb-2">{item.stat}</div>
                <h3 className="text-xl font-semibold mb-3 text-dark">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-gray-600">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
                  <div className="text-gray-600">App Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">What Our <span className="gradient-text">Users Say</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of women who are taking control of their menstrual health with FloTracker.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-medium">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-dark">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Heart key={i} size={16} className="text-primary" fill="#FF6B98" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to <span className="gradient-text">Take Control</span> of Your Menstrual Health?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Start your journey to better understanding your body today with FloTracker.
            </p>
            <Link to="/tracker" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center">
              Get Started Now <ChevronRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;