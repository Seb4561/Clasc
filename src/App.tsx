import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Scale,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Clock,
  PhoneCall,
  Users
} from 'lucide-react';
import ActuarialCalculator from './components/ActuarialCalculator';
import ChatHint from './components/ChatHint';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: <Building2 className="w-12 h-12 text-[#FF6A00]" />,
      title: "Liquidación de aportes",
      description: "Cumplimiento normativo y optimización financiera para su empresa"
    },
    {
      icon: <Clock className="w-12 h-12 text-[#FF6A00]" />,
      title: "Cálculos actuariales",
      description: "Proyecciones precisas y gestión de riesgos profesional"
    },
    {
      icon: <Scale className="w-12 h-12 text-[#FF6A00]" />,
      title: "Asesoría jurídica",
      description: "Soporte legal especializado en seguridad social"
    },
    {
      icon: <Users className="w-12 h-12 text-[#FF6A00]" />,
      title: "Asesorías en seguridad social",
      description: "Orientación especializada para empresas e independientes"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      role: "Director Financiero",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      text: "Clasc ha transformado nuestra gestión de aportes. Su precisión y profesionalismo son excepcionales.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      role: "Gerente de RRHH",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
      text: "Los cálculos actuariales de Clasc nos han ayudado a tomar decisiones más informadas.",
      rating: 5
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const phoneNumber = "573152588346";
    const options = [
      { text: "Llamar", url: `tel:+${phoneNumber}` },
      { text: "WhatsApp", url: `https://wa.me/${phoneNumber}` }
    ];
    
    // Create a simple modal-like menu
    const menu = document.createElement('div');
    menu.className = 'fixed inset-0 flex items-center justify-center z-50';
    menu.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50"></div>
      <div class="relative bg-white dark:bg-[#1C2732] rounded-lg shadow-xl p-4 flex flex-col gap-2 min-w-[200px]">
        ${options.map(option => `
          <a href="${option.url}" class="block px-4 py-2 text-[#2A2A2A] dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-[#15202B] rounded">
            ${option.text}
          </a>
        `).join('')}
      </div>
    `;
    
    document.body.appendChild(menu);
    menu.addEventListener('click', (e) => {
      if (e.target === menu) {
        document.body.removeChild(menu);
      }
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#15202B]">
      <ChatHint />
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-[#15202B]/95 shadow-lg' : 'bg-white dark:bg-[#15202B]'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <picture>
                <source srcSet="/images/clascblanco.png" media="(prefers-color-scheme: dark)" />
                <img 
                  src="/images/clascnobg.png"
                  alt="Clasc - Consultores en liquidación de aportes y servicios contables"
                  className="h-auto w-[200px] max-w-[200px] object-contain"
                />
              </picture>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="nav-link">Inicio</a>
              <a href="#servicios" className="nav-link">Servicios</a>
              <a href="#nosotros" className="nav-link">Nosotros</a>
              <a href="#testimonios" className="nav-link">Testimonios</a>
              <a href="#contacto" className="nav-link">Contacto</a>
              <a href="#pago" className="nav-link">Pagar</a>
              <a href="#calculadora" className="nav-link">Calculadoras</a>
              <button onClick={scrollToContact} className="cta-button">Solicitar Asesoría</button>
            </nav>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#2A2A2A] dark:text-gray-100" />
              ) : (
                <Menu className="w-6 h-6 text-[#2A2A2A] dark:text-gray-100" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-[#1C2732] border-t border-gray-100 dark:border-[#2C3640]"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <a href="#inicio" className="block nav-link">Inicio</a>
                <a href="#servicios" className="block nav-link">Servicios</a>
                <a href="#nosotros" className="block nav-link">Nosotros</a>
                <a href="#testimonios" className="block nav-link">Testimonios</a>
                <a href="#contacto" className="block nav-link">Contacto</a>
                <a href="#pago" className="block nav-link">Pagar</a>
                <a href="#calculadora" className="block nav-link">Calculadora</a>
                <button onClick={scrollToContact} className="cta-button w-full">Solicitar Asesoría</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center bg-gray-50 dark:bg-[#1C2732]">
        <div className="absolute inset-0 hero-pattern"></div>
        <div className="container mx-auto px-4 pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <picture>
              <source srcSet="/images/clascblanco.png" media="(prefers-color-scheme: dark)" />
              <img 
                src="/images/clascnobg.png"
                alt="Clasc Logo"
                className="h-32 w-auto object-contain mb-8"
              />
            </picture>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#2A2A2A] dark:text-gray-100">
              Precisión y Confianza en Liquidación de Aportes, Cálculos Actuariales y Asesoría Jurídica
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Optimizamos procesos y garantizamos cumplimiento normativo con tecnología y experiencia
            </p>
            <button onClick={scrollToContact} className="cta-button">
              Cotiza tu servicio ahora
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-white dark:bg-[#15202B]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-[#2A2A2A] dark:text-gray-100"
          >
            Nuestros Servicios
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="service-card"
              >
                {service.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-[#2A2A2A] dark:text-gray-100">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculadora" className="py-20 bg-gray-50 dark:bg-[#1C2732]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-[#2A2A2A] dark:text-gray-100"
          >
            Calculadoras
          </motion.h2>
          <ActuarialCalculator />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="nosotros" className="py-20 bg-gray-50 dark:bg-[#1C2732]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-[#2A2A2A] dark:text-gray-100"
          >
            ¿Por qué elegirnos?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Más de 10 años de experiencia en el sector",
              "Enfoque basado en tecnología y precisión actuarial",
              "Atención personalizada y cumplimiento normativo garantizado"
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start space-x-4"
              >
                <CheckCircle className="w-6 h-6 text-[#FF6A00]" />
                <p className="text-gray-600 dark:text-gray-300">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section id="pago" className="py-20 bg-white dark:bg-[#15202B]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-[#2A2A2A] dark:text-gray-100"
          >
            Paga acá
          </motion.h2>
          <div className="flex flex-col items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="inline-block transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/images/bancolombiaqr.png"
                alt="Código QR para pago Bancolombia"
                className="w-[300px] h-[300px] object-contain"
              />
            </motion.div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
              Por favor, escanee este QR en la app Bancolombia para pagar
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 bg-white dark:bg-[#15202B]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-[#2A2A2A] dark:text-gray-100"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 dark:bg-[#1C2732] p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#2A2A2A] dark:text-gray-100">{testimonial.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{testimonial.text}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-[#FF6A00] fill-[#FF6A00]' : 'text-gray-400 dark:text-gray-600'}`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gray-50 dark:bg-[#1C2732]">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-[#2A2A2A] dark:text-gray-100"
          >
            Contáctanos
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#15202B] p-8 rounded-xl shadow-sm"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#2A2A2A] dark:text-gray-100">
                    Información de Contacto
                  </h3>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-[#FF6A00]" />
                    <div>
                      <p className="font-medium text-[#2A2A2A] dark:text-gray-100">Teléfono Principal</p>
                      <button
                        onClick={handlePhoneClick}
                        className="text-gray-600 dark:text-gray-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00]"
                      >
                        3152588346
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <PhoneCall className="w-6 h-6 text-[#25D366]" />
                    <div>
                      <p className="font-medium text-[#2A2A2A] dark:text-gray-100">WhatsApp</p>
                      <a
                        href="https://wa.me/message/YZTASIELGU4PA1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-[#25D366] dark:hover:text-[#25D366]"
                      >
                        Envíanos un mensaje
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-[#FF6A00]" />
                    <div>
                      <p className="font-medium text-[#2A2A2A] dark:text-gray-100">Correo Electrónico</p>
                      <p className="text-gray-600 dark:text-gray-300">sioplanillas@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#2A2A2A] dark:text-gray-100">Ubicación</h3>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6 text-[#FF6A00]" />
                    <div>
                      <p className="font-medium text-[#2A2A2A] dark:text-gray-100">Dirección</p>
                      <p className="text-gray-600 dark:text-gray-300">Calle 6 #16-21, Zipaquirá</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock className="w-6 h-6 text-[#FF6A00]" />
                    <div>
                      <p className="font-medium text-[#2A2A2A] dark:text-gray-100">Horario de Atención</p>
                      <p className="text-gray-600 dark:text-gray-300">Lunes a Viernes</p>
                      <p className="text-gray-600 dark:text-gray-300">8:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-[#1C2732] py-12 border-t border-gray-200 dark:border-[#2C3640]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <picture>
                  <source srcSet="/images/clascblanco.png" media="(prefers-color-scheme: dark)" />
                  <img 
                    src="/images/clascnobg.png"
                    alt="Clasc Logo"
                    className="h-10 w-auto object-contain"
                  />
                </picture>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Expertos en liquidación de aportes, cálculos actuariales y asesoría jurídica.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#2A2A2A] dark:text-gray-100">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#inicio" className="text-gray-600 dark:text-gray-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00]">Inicio</a></li>
                <li><a href="#servicios" className="text-gray-600 dark:text-gray-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00]">Servicios</a></li>
                <li><a href="#nosotros" className="text-gray-600 dark:text-gray-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00]">Nosotros</a></li>
                <li><a href="#testimonios" className="text-gray-600 dark:text-gray-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00]">Testimonios</a></li>
                <li><a href="#pago" className="text-gray-600 dark:text-gray-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00]">Pagar</a></li>
                <li><a href="#calculadora" className="text-gray-600 dark:text-gray-300 hover:text-[#FF6A00] dark:hover:text-[#FF6A00]">Calculadora</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#2A2A2A] dark:text-gray-100">Servicios</h4>
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-300">Liquidación de aportes</li>
                <li className="text-gray-600 dark:text-gray-300">Cálculos actuariales</li>
                <li className="text-gray-600 dark:text-gray-300">Asesoría jurídica</li>
                <li className="text-gray-600 dark:text-gray-300">Asesorías en seguridad social</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-[#2C3640] mt-12 pt-8 text-center text-gray-600 dark:text-gray-300">
            <p>&copy; {new Date().getFullYear()} Clasc. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;