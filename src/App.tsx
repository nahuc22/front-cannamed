import React, { useState, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence, 
  useSpring 
} from 'motion/react';
import { 
  Leaf, 
  ShieldCheck, 
  Activity, 
  Droplet, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Heart, 
  Award, 
  FileText, 
  Menu, 
  X, 
  Info,
  Beaker,
  Thermometer,
  Trees,
  UserCheck,
  Calendar,
  Lock
} from 'lucide-react';
import { STRAINS, FAQS, BENEFITS_SUMMARY } from './data';
import { BudStrain } from './types';
import CannabisLeaf from './components/CannabisLeaf';
import FlipCard from './components/FlipCard';

// Images paths from step generations
const HERO_BG = new URL('./public/images/cannamed_hero_bg_uploaded_1780361509856.png', import.meta.url).href;
const PARALLAX_LEAF = new URL('./public/images/cannamed_isolated_leaf_1780361525104.png', import.meta.url).href;
const VITAL_LOGO = new URL('./public/images/vital-logo.png', import.meta.url).href;

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStrain, setActiveStrain] = useState<BudStrain | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dni: '',
    prescriptionNumber: '',
    condition: 'Insomnio',
    preferredStrain: STRAINS[0].name,
    experienceLevel: 'intermedio',
    acknowledgedRules: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll Parallax measurements
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Soft spring scroll translation for premium "GSAP-like" micro-smooth feel
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // Transform functions for the parallax floating leaf
  const leafY = useTransform(springScroll, [0, 1], [-100, 1400]);
  const leafRotate = useTransform(springScroll, [0, 1], [15, 360]);
  const leafScale = useTransform(springScroll, [0, 0.4, 0.8, 1], [0.85, 1.25, 0.95, 0.7]);
  const leafOpacity = useTransform(springScroll, [0, 0.1, 0.9, 1], [0.75, 0.95, 0.95, 0]);

  // Transform for secondary subtle floating elements
  const secondaryLeafY = useTransform(springScroll, [0, 1], [50, 800]);
  const secondaryLeafRotate = useTransform(springScroll, [0, 1], [-30, -180]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, acknowledgedRules: e.target.checked }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acknowledgedRules) {
      alert("Por favor, acepta el reglamento interno de autoconsumo colectivo de la ONG.");
      return;
    }
    setFormSubmitted(true);
  };

  // Scroll to section helper
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="cannamed-root" ref={containerRef} className="relative z-10 w-full min-h-screen font-sans bg-[#030303] selection:bg-cannamed-600 selection:text-white">
      
      {/* BACKGROUND WALLPAPER (Revealed through hollow cutout spaces) */}
      <div 
        id="bg-wallpaper"
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-45 mix-blend-lighten min-h-full"
        style={{
          backgroundImage: `url('${HERO_BG}')`,
          filter: 'contrast(1.15) brightness(0.6)'
        }}
      />

      {/* AMBIENT RADIAL GLOW (Behind elements) */}
      <div id="ambient-overlay" className="absolute inset-0 z-[1] bg-radial-gradient from-transparent via-[#030303]/75 to-[#030303] pointer-events-none" />

      {/* TEXTO GIGANTE PARA SECCION FAQ */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden select-none">
        <div className="hidden md:flex sticky top-[66%] lg:top-[64.8%] -left-32 sm:-left-40 md:-left-48 lg:-left-56 w-full flex-col justify-center items-start leading-[0.8] opacity-15">
          <h1 className="text-[120px] sm:text-[180px] md:text-[230px] lg:text-[280px] font-black tracking-tighter text-white mix-blend-difference">
            CANNA<br/>MED
          </h1>
          <p className="mt-8 text-cannamed-500/35 font-mono text-xs max-w-[280px] uppercase tracking-[0.25em] ml-32 sm:ml-40 md:ml-48 lg:ml-56">
            ASOCIACIÓN FITOBOTÁNICA<br/>EST. 2024
          </p>
        </div>
      </div>

      {/* GENERAL 12-COLUMN STRUCTURAL LAYOUT WITH LEFT RAIL */}
      <div className="w-full relative z-10 grid grid-cols-12 min-h-screen">
        
        {/* LEFT VERTICAL RAIL (Signature signature theme element) */}
        <div className="col-span-1 border-r border-white/10 hidden lg:flex flex-col justify-between items-center py-10 bg-[#040404]/30 backdrop-blur-sm h-screen sticky top-0 z-[5] select-none">
          <div className="text-[11px] font-mono tracking-[0.5rem] uppercase [writing-mode:vertical-lr] rotate-180 font-semibold text-cannamed-500 hover:text-[#1ca233] transition-colors blur-[0.5px] hover:blur-none">
            CANNAMED · SOCIEDAD FITOMEDICINAL
          </div>
          <div className="space-y-6 flex flex-col items-center">
            <div className="w-px h-16 bg-white/20"></div>
            <div className="text-[9px] font-mono opacity-50 uppercase tracking-[0.3em] [writing-mode:vertical-lr] rotate-180 text-zinc-400 blur-[0.5px]">
              DESDE 2024
            </div>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT CONTAINER */}
        <div className="col-span-12 lg:col-span-11 relative flex flex-col min-h-screen">
          
          {/* MAIN NAVIGATION HEADER */}
          <header id="main-header" className="relative z-50 w-full bg-[#030303]/85 backdrop-blur-md border-b border-white/[0.06] sticky top-0">
            <div id="nav-container" className="flex items-center justify-between w-full h-20 px-6 md:px-12">
              
              {/* Brand Logo - Styled with Bold Typography specifications */}
              <div id="brand-logo" className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
                <img 
                  src={VITAL_LOGO} 
                  alt="VITAL CBD Logo" 
                  className="h-20 w-auto object-contain"
                />
              </div>

              {/* Desktop Menu - High contrast elegant typography style */}
              <nav id="desktop-nav" className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.28em] font-extrabold text-zinc-200">
                <button id="btn-nav-alianza" onClick={() => scrollTo('alianza')} className="hover:text-white transition-colors cursor-pointer text-left font-black">
                  Nosotros
                </button>
                <button id="btn-nav-vacio" onClick={() => scrollTo('el-vacio')} className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-2 font-black">
                  {/* <span className="inline-block w-1.5 h-1.5 bg-cannamed-600 rounded-full animate-pulse"></span> */}
                  Quienes somos
                </button>
                <button id="btn-nav-flores" onClick={() => scrollTo('flores')} className="hover:text-white transition-colors cursor-pointer text-left font-black">
                  Productos
                </button>
                <button id="btn-nav-faq" onClick={() => scrollTo('faq')} className="hover:text-white transition-colors cursor-pointer text-left font-black">
                  Consultas
                </button>
              </nav>

              {/* Desktop CTAs */}
              <div id="desktop-cta" className="hidden md:flex items-center gap-4">
                <button 
                  id="btn-desktop-register"
                  onClick={() => scrollTo('registro')} 
                  className="px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-white hover:text-black border border-white/10 hover:border-white text-zinc-100 text-xs font-bold tracking-widest uppercase transition-all shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  Unirse ONG
                  <ArrowRight className="w-3.5 h-3.5 text-cannamed-600" />
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence id="mobile-dropdown-anim">
              {mobileMenuOpen && (
                <motion.div 
                  id="mobile-dropdown"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="md:hidden absolute top-20 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
                >
                  <div id="mobile-nav-links" className="flex flex-col gap-5 px-6 py-8">
                    <button id="m-nav-alianza" onClick={() => scrollTo('alianza')} className="font-sans text-left text-sm uppercase font-bold tracking-widest text-zinc-300 hover:text-white">
                      Nosotros
                    </button>
                    <button id="m-nav-vacio" onClick={() => scrollTo('el-vacio')} className="font-sans text-left text-sm uppercase font-bold tracking-widest text-zinc-300 hover:text-white flex items-center gap-2">
                      Quienes somos
                    </button>
                    <button id="m-nav-flores" onClick={() => scrollTo('flores')} className="font-sans text-left text-sm uppercase font-bold tracking-widest text-zinc-300 hover:text-white">
                      Productos
                    </button>
                    <button id="m-nav-faq" onClick={() => scrollTo('faq')} className="font-sans text-left text-sm uppercase font-bold tracking-widest text-zinc-300 hover:text-white">
                      Consultas
                    </button>
                    <div className="h-px bg-zinc-900 my-2" />
                    <button 
                      id="m-nav-register"
                      onClick={() => scrollTo('registro')}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-cannamed-500 to-cannamed-600 text-center font-bold uppercase text-white shadow-lg text-xs tracking-wider cursor-pointer"
                    >
                      Registrar Solicitud Médica
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* FLOATING PARALLAX LEAF LAYER */}
          <motion.div 
            id="scroll-parallax-leaf-container"
            style={{
              y: leafY,
              rotate: leafRotate,
              scale: leafScale,
              opacity: leafOpacity,
            }}
            className="fixed right-[1%] md:right-[4%] top-48 w-32 h-32 md:w-[16rem] md:h-[16rem] z-10 pointer-events-none select-none filter drop-shadow-[0_0_20px_rgba(33,197,94,0.35)]"
          >
            <CannabisLeaf glow={true} className="w-full h-full" />
          </motion.div>

          {/* SECONDARY DEEP LEAF PATH PARALLAX EFFECT */}
          <motion.div 
            id="scroll-parallax-deep-leaf"
            style={{
              y: secondaryLeafY,
              rotate: secondaryLeafRotate,
            }}
            className="fixed left-[2%] bottom-[10%] w-16 h-16 md:w-28 md:h-28 z-10 pointer-events-none select-none opacity-20 blur-xs filter saturate-70 drop-shadow-[0_0_15px_rgba(33,197,94,0.18)]"
          >
            <CannabisLeaf glow={false} className="w-full h-full hue-rotate-15" />
          </motion.div>

          <main id="main-content" className="relative z-20 w-full overflow-hidden">
            
            {/* HERO INTRO */}
            <section id="hero" className="relative flex flex-col justify-center min-h-[calc(100vh-5rem)] px-6 md:px-12 overflow-hidden">
              <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
                
                {/* Hero text */}
                <div id="hero-text-block" className="lg:col-span-7 flex flex-col justify-center text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900 border border-white/[0.08] backdrop-blur-md mb-6 shadow-md shadow-black/80">
                      <span className="w-2 h-2 rounded-full bg-cannamed-600 animate-ping"></span>
                      <span className="font-mono text-[9px] mt-[2px] text-cannamed-400 tracking-widest uppercase font-bold">Asociación Cannamed</span>
                    </div>
                    
                    <h1 className="font-serif text-5xl md:text-7xl font-semibold text-zinc-100 tracking-tight leading-[1.08] mb-6">
                      Cuidado <span className="font-sans text-cannamed-500 font-7xl">Orgánico</span> <br />
                      Estándar <span className="text-zinc-400 font-sans font-light">Terapéutico</span>
                    </h1>
                    
                    <p className="font-sans text-base text-zinc-300 max-w-xl leading-relaxed mb-8">
                      Somos un colectivo de salud integrativa para el cultivo controlado de cannabis medicinal. Desarrollamos fitomedicina, amparo legal y trazabilidad de laboratorios orgánicos rigurosos.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        id="btn-hero-cta"
                        onClick={() => scrollTo('registro')}
                        className="px-8 py-4 rounded-full bg-white hover:bg-cannamed-500 text-black hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:shadow-cannamed-550/20"
                      >
                        Registrar Solicitud Médica
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        id="btn-hero-explore"
                        onClick={() => scrollTo('flores')}
                        className="px-8 py-4 rounded-full bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 border border-white/5 hover:border-zinc-700 text-xs font-bold uppercase tracking-wider transition-all text-center cursor-pointer"
                      >
                        Explorar Flores
                      </button>
                    </div>
                  </motion.div>

                  {/* Monospace telemetry banner to establish visual rhythm */}
                  <motion.div 
                    id="hero-stats-strip"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.95 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap gap-x-12 gap-y-6"
                  >
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Pureza Registrada</p>
                      <p className="font-mono text-2xl font-semibold text-white mt-1">98.9%</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Afiliación Activa</p>
                      <p className="font-mono text-2xl font-black text-white mt-1">1,400+</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Cromatografías</p>
                      <p className="font-serif italic text-2xl font-semibold text-cannamed-500 mt-1">100% Organicas</p>
                    </div>
                  </motion.div>
                </div>

                {/* Subtle floating informational card for NGO values - Medical Clinical card */}
                <div id="hero-right-panel" className="lg:col-span-5 flex items-center justify-center relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                    className="w-full max-w-sm rounded-[2rem] bg-[#090909]/90 border border-white/[0.08] p-8 backdrop-blur-xl shadow-2xl shadow-black relative"
                  >
                    <div className="absolute top-0 right-12 w-6 h-px bg-cannamed-550" />
                    <div className="absolute right-0 top-12 w-px h-6 bg-cannamed-550" />
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-cannamed-600" />
                        <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-bold">MONITOR CLÍNICO S-8</span>
                      </div>
                      <div className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 font-mono text-[8.5px] text-zinc-450 font-bold">
                        ACTIVO
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="border-b border-white/[0.06] pb-5">
                        <h3 className="font-mono text-zinc-400 text-[9px] tracking-widest uppercase mb-1.5 font-bold">Licencia de Autocultivo</h3>
                        <p className="font-sans text-cannamed-500 text-lg font-bold">BAJO PROTOCOLO REPROCANN</p>
                        <p className="font-sans text-zinc-300 text-xs font-medium leading-relaxed mt-2">
                          Asistencia completa para tramitación de credenciales nacionales, transporte seguro y dosis terapéuticas.
                        </p>
                      </div>

                      <div className="border-b border-white/[0.06] pb-5">
                        <h3 className="font-mono text-zinc-400 text-[9px] tracking-widest uppercase mb-1.5 font-bold">Sustrato 100% Viviente</h3>
                        <p className="font-sans text-cannamed-500 text-lg font-bold">CERO QUÍMICOS DE HUMEDAD</p>
                        <p className="font-sans text-zinc-300 text-xs font-medium leading-relaxed mt-2">
                          Análisis microbiológicos recurrentes que validan la erradicación total de esporas, insecticidas o metales.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-mono text-zinc-500 text-[9px] tracking-widest uppercase mb-1 font-bold">Quimiotipos Testeados</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2.5">
                          <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/[0.05] text-center">
                            <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-widest">INDICA DOMINANTE</span>
                            <span className="block font-sans font-bold text-xs text-zinc-300 mt-1">Ratio 1:1 THC:CBD</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/[0.05] text-center">
                            <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-widest">RESINA PURA</span>
                            <span className="block font-sans font-bold text-xs text-zinc-300 mt-1">Espectro Clínico</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>

            {/* SECTION: LA ALIANZA (Opaque solid elegant section) */}
            <section id="alianza" className="relative z-30 bg-[#060606] py-24 px-6 md:px-12 border-y border-white/[0.06]">
              <div className="w-full max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
                  <div className="lg:col-span-7">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#1ca233] mb-2 font-bold">// Principios Orgánicos de Nuestra Alianza</p>
                    <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-tight leading-none">
                      Vitalmed por el Autocultivo
                    </h2>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="font-sans text-zinc-400 leading-relaxed text-sm md:text-base">
                      Establecemos un nexo institucional transparente entre la naturaleza vegetal y la fitomedicina integrativa clínicamente probada con análisis moleculares profundos.
                    </p>
                  </div>
                </div>

                {/* 3 Pillars layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  <div className="bg-[#090909] hover:bg-[#0d0d0d] rounded-2xl border border-white/[0.06] hover:border-cannamed-500/20 shadow-xl transition-all group overflow-hidden">
                    <div className="w-full h-[250px] overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&h=250&fit=crop" 
                        alt="Compromiso Sanitario" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="font-serif text-xl font-medium text-white mb-3">Compromiso Sanitario</h3>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                        Ofrecemos fitoflores libres de agrotóxicos perjudiciales. Producimos de manera orgánica enriquecida con microorganismos edáficos vivientes de primera calidad.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#090909] hover:bg-[#0d0d0d] rounded-2xl border border-white/[0.06] hover:border-cannamed-500/20 shadow-xl transition-all group overflow-hidden">
                    <div className="w-full h-[250px] overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=250&fit=crop" 
                        alt="Análisis Cromatográfico" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="font-serif text-xl font-medium text-white mb-3">Análisis Cromatográfico</h3>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                        Cada lote de flores y aceites es analizado rigurosamente. Develamos con precisión el perfil porcentual de cannabinoides mayoritarios, garantizando dosis uniformes.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#090909] hover:bg-[#0d0d0d] rounded-2xl border border-white/[0.06] hover:border-cannamed-500/20 shadow-xl transition-all group overflow-hidden">
                    <div className="w-full h-[250px] overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=300&h=250&fit=crop" 
                        alt="Cobijo Estatutario Legal" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="font-serif text-xl font-medium text-white mb-3">Cobijo Estatutario Legal</h3>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                        Protegemos y amparamos el derecho legítimo de nuestros afiliados, asegurando el cumplimiento absoluto de legislaciones nacionales y licencias colectivas médicas.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* SECTION: EL VACÍO (Totally transparent section revealing fixed parallax wallpaper behind) */}
            <section id="el-vacio" className="relative z-20 bg-transparent py-24 px-6 md:px-12">
              <div className="w-full max-w-4xl mx-auto relative z-10">
                
                <div className="text-center mb-10">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#1ca233] mb-2 font-bold">// El Contraste del Vacío Visual</p>
                  <h2 className="font-serif text-3xl md:text-5xl font-semibold text-white tracking-tight">El Hueco Botánico</h2>
                  <p className="font-sans text-sm text-zinc-400 mt-2">La pureza mineral y la resina vegetal expuestas en un visor arquitectónico.</p>
                </div>

                {/* CUTOUT MASK GRID (3x3 Blocks, with the central block entirely transparent) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 aspect-auto md:aspect-[4/3] w-full relative bg-zinc-950 p-3 md:p-4 rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
                  
                  {/* Row 1 - Card 1 */}
                  <FlipCard
                    frontClass="bg-white p-6 md:p-8 text-black flex flex-col justify-between h-full w-full shadow-md"
                    frontContent={
                      <div className="flex flex-col justify-between h-full w-full">
                        <span className="font-mono text-[9px] tracking-widest text-zinc-600 uppercase font-bold">FOTOPERÍODO I</span>
                        <p className="font-serif text-xl md:text-2xl font-bold leading-tight mt-4">18/6 Horas de Luz Activa</p>
                      </div>
                    }
                    backImage="https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=600&q=80"
                    backTitle="AMBIENTE CONTROLADO"
                    backDescription="Optimización de ciclos lumínicos para potenciar flores de grado farmacológico."
                  />
                  
                  {/* Row 1 - Card 2 */}
                  <FlipCard
                    frontClass="bg-zinc-100 p-6 md:p-8 text-black flex flex-col justify-end h-full w-full shadow-md"
                    frontContent={
                      <div className="flex flex-col justify-end h-full w-full">
                        <div className="flex items-center gap-1.5 text-cannamed-650 mb-3 md:mb-5">
                          <Thermometer className="w-4 h-4 text-[#2c7238]" />
                          <span className="font-mono text-[9px] font-bold">TEMP: 24.2°C</span>
                        </div>
                        <p className="font-sans text-xs text-zinc-600 leading-normal">Ambiente hidropónico certificado de flujo y humedad constantes.</p>
                      </div>
                    }
                    backImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                    backTitle="AUTOMATIZACIÓN ESTÉRIL"
                    backDescription="Monitoreo constante e hidroponía recirculante con flujo de nutrientes esenciales."
                  />
                  
                  {/* Row 1 - Card 3 */}
                  <FlipCard
                    frontClass="bg-[#e4ebd0] p-6 md:p-8 text-zinc-900 flex flex-col justify-between h-full w-full shadow-md"
                    frontContent={
                      <div className="flex flex-col justify-between h-full w-full">
                        <span className="font-mono text-[9px] tracking-wider text-cannamed-700 block font-bold">ESPECTRO PAR</span>
                        <p className="font-serif font-bold text-base leading-snug text-cannamed-900 mt-4">Luminancia óptima de absorción fitomedicinal celular.</p>
                      </div>
                    }
                    backImage="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80"
                    backTitle="ABSORCIÓN EFICIENTE"
                    backDescription="Irradiación fotosintéticamente activa que estimula la síntesis de terpenoides."
                  />

                  {/* Row 2 - Card 4 */}
                  <FlipCard
                    frontClass="bg-white/95 p-6 md:p-8 text-zinc-900 flex items-center h-full w-full shadow-md"
                    frontContent={
                      <p className="font-sans text-xs font-bold uppercase tracking-wider text-zinc-700 leading-relaxed">Estatuto ONG: Cultivo Compartido y Licencia Científica de REPROCANN.</p>
                    }
                    backImage="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80"
                    backTitle="MARCO LEGAL ONG"
                    backDescription="Cultivo oficial autorizado y transparente registrado mediante licencias sanitarias."
                  />
                  
                  {/* CENTRAL HOLE (Beautifully Transparent revealing the heavy micro trichomes behind) */}
                  <div className="bg-transparent h-48 md:h-auto min-h-[160px] relative z-0 border border-white/10 hover:border-cannamed-500/60 rounded-xl flex items-center justify-center transition-all group cursor-crosshair">
                    <div className="absolute -inset-1 blur-md bg-cannamed-550/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4 text-[8px] font-mono uppercase tracking-widest text-white/50 bg-[#000]/70 px-2 py-0.5 rounded backdrop-blur-xs">HOLE VIEWPOINT</div>
                    <div className="text-center relative z-10 px-4">
                      <span className="inline-block px-3 py-1 bg-[#050505]/90 backdrop-blur-md rounded-full border border-white/10 text-[#6bbf77] font-mono text-[9px] uppercase tracking-widest animate-pulse font-bold">
                        Fondo Real Trichome
                      </span>
                      <span className="block text-[8px] font-mono text-zinc-400 mt-2 uppercase tracking-wide">Desplaza para sentir el paralaje</span>
                    </div>
                  </div>
                  
                  {/* Row 2 - Card 6 */}
                  <FlipCard
                    frontClass="bg-white p-6 md:p-8 text-black flex flex-col justify-between h-full w-full shadow-md"
                    frontContent={
                      <div className="flex flex-col justify-between h-full w-full">
                        <span className="font-mono text-[9px] text-zinc-400 uppercase font-bold">CBD ratio</span>
                        <p className="font-serif font-black text-3xl text-cannamed-500 leading-none mt-4">2 : 1</p>
                      </div>
                    }
                    backImage="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop"
                    backTitle="EQUILIBRIO ACTIVO"
                    backDescription="Proporciones terapéuticas uniformes diseñadas para el aliciente ansioso."
                  />

                  {/* Row 3 - Card 7 */}
                  <FlipCard
                    frontClass="bg-gradient-to-br from-cannamed-500 to-cannamed-600 p-6 md:p-8 text-white flex flex-col justify-between h-full w-full shadow-lg"
                    frontContent={
                      <div className="flex flex-col justify-between h-full w-full text-left">
                        <span className="text-3xl font-bold font-serif leading-none">03.</span>
                        <div>
                          <span className="block font-mono text-[8.5px] tracking-widest text-white/80 uppercase">Cálices Curados</span>
                          <p className="font-sans font-bold text-xs mt-1 text-white">Sabor Puro, Extracto Genuino</p>
                        </div>
                      </div>
                    }
                    backImage="https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&w=600&q=80"
                    backTitle="APOTECARIO TRADICIONAL"
                    backDescription="Curado anaeróbico en frascos de vidrio para conservar los aromas orgánicos."
                  />
                  
                  {/* Row 3 - Card 8 */}
                  <FlipCard
                    frontClass="bg-white p-6 md:p-8 text-black rounded-xl flex flex-col justify-end h-full w-full shadow-md"
                    frontContent={
                      <p className="font-sans text-[11px] text-zinc-600 leading-relaxed text-left">Muestras analizadas químicamente por laboratorios universitarios fitocristalinos de alto rendimiento.</p>
                    }
                    backImage="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop"
                    backTitle="RIGOR DE LABORATORIO"
                    backDescription="Validación química realizada en cooperación con centros de estudio superiores."
                  />
                  
                  {/* Row 3 - Card 9 */}
                  <FlipCard
                    frontClass="bg-zinc-100 p-6 md:p-8 text-black flex flex-col justify-between h-full w-full shadow-md"
                    frontContent={
                      <div className="flex flex-col justify-between h-full w-full text-left">
                        <span className="font-mono text-[9px] text-zinc-600 font-bold uppercase">TERPENO MAX</span>
                        <p className="font-sans font-bold text-xs tracking-tight text-[#1b6d27] mt-4">Mirceno Sedativo Profundo</p>
                      </div>
                    }
                    backImage="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop"
                    backTitle="SINFONÍA DE AROMAS"
                    backDescription="Perfil de terpenos que ejerce un profundo efecto de armonía y relajación."
                  />

                </div>

                {/* Explanatory text under the mask */}
                <div id="vacio-stats" className="mt-10 p-6 rounded-2xl bg-zinc-950/80 border border-white/[0.05] backdrop-blur-md text-center max-w-2xl mx-auto">
                  <p className="font-sans text-xs text-zinc-350 leading-relaxed">
                    Este "Hueco Botánico" actúa como un tragaluz interactivo en nuestra arquitectura minimalista blanca y negra. Detrás, el relieve de nuestra <strong className="text-white hover:text-cannamed-400 transition-colors">flor con tricomas activos</strong> se desplaza a una velocidad distinta, simulando el paso de la luz solar primaveral.
                  </p>
                </div>
              </div>
            </section>

        {/* SECTION: GALERIA DE COGOLLOS (Opaque premium interactive display) */}
        <section id="flores" className="relative z-30 bg-[#030303] py-24 px-6 border-t border-zinc-900">
          <div className="w-full max-w-7xl mx-auto">
            
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="font-mono text-xs uppercase tracking-widest text-[#1ca233] mb-3 font-semibold">// Catálogo Clínico Organizado</p>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-tight">
                Nuestras Cepas
              </h2>
              <p className="font-sans text-sm text-zinc-400 mt-3 leading-relaxed">
                Seleccionadas detalladamente y analizadas en laboratorio para el tratamiento de síntomas específicos. Haz click en una flor para ver su reporte analítico completo.
              </p>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {STRAINS.map((strain, index) => (
                <motion.div
                  key={strain.id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full bg-[#080808] border border-zinc-900 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-800 cursor-pointer group"
                  onClick={() => setActiveStrain(strain)}
                  id={`strain-card-${strain.id}`}
                >
                  {/* Photo area */}
                  <div className="relative aspect-4/3 w-full bg-zinc-950 overflow-hidden border-b border-zinc-900">
                    <img 
                      src={strain.image} 
                      alt={strain.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating badge for strain type */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold border ${
                        strain.type === 'Indica' ? 'bg-purple-950/90 text-purple-300 border-purple-800/40' :
                        strain.type === 'Sativa' ? 'bg-amber-950/90 text-amber-300 border-amber-800/40' :
                        'bg-emerald-950/90 text-emerald-300 border-emerald-800/40'
                      }`}>
                        {strain.type}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="px-2 py-1 rounded bg-[#030303]/90 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
                        {strain.codeName}
                      </span>
                    </div>
                  </div>

                  {/* Context data */}
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="font-serif text-2xl font-medium text-white group-hover:text-cannamed-600 transition-colors">
                      {strain.name}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider mt-1">
                      {strain.lineage}
                    </p>
                    
                    <p className="font-sans text-sm text-zinc-400 mt-4 line-clamp-2 leading-relaxed flex-grow">
                      {strain.tagline}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-zinc-900">
                      <div>
                        <span className="block font-mono text-[9px] text-zinc-400 uppercase tracking-wider">Porcentaje THC</span>
                        <span className="block font-sans font-medium text-zinc-200 text-sm mt-0.5">{strain.thc}</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] text-zinc-400 uppercase tracking-wider">Porcentaje CBD</span>
                        <span className="block font-sans font-medium text-zinc-200 text-sm mt-0.5">{strain.cbd}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-900 text-center flex items-center justify-center gap-1.5 font-mono text-[11px] text-cannamed-400 group-hover:text-[#6bbf77] transition-all">
                      <span>Ver Certificado Clínico</span>
                      <ArrowRight className="w-3.5 h-3.5 text-current group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scientific details explanation banner */}
            <div className="bg-[#080808] border border-zinc-900 p-8 rounded-2xl flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cannamed-950 flex items-center justify-center border border-cannamed-900/40">
                  <Info className="w-6 h-6 text-cannamed-600" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-white">¿Por qué analizamos los perfiles de terpenos?</h4>
                  <p className="font-sans text-xs text-zinc-400 mt-0.5">El mirceno, limoneno y pineno conducen el "efecto séquito", modulando la interacción en receptores CB1 de forma óptima.</p>
                </div>
              </div>
              <button 
                id="btn-strains-more"
                onClick={() => scrollTo('registro')}
                className="w-full md:w-auto px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-850 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-750 font-medium text-xs tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer"
              >
                Solicitar Acceso Medicinal
              </button>
            </div>

          </div>
        </section>

        {/* STRAIN OVERLAY MODAL FOR MORE ACCURATE MEDICAL OVERVIEW */}
        <AnimatePresence id="strain-modal-anim">
          {activeStrain && (
            <motion.div 
              id="strain-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            >
              <motion.div 
                id="strain-modal-card"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#070707] border border-zinc-850 rounded-2xl shadow-2xl overflow-hidden text-left filter drop-shadow-[0_0_35px_rgba(0,0,0,0.8)]"
              >
                {/* Close Button */}
                <button 
                  id="btn-close-modal"
                  onClick={() => setActiveStrain(null)}
                  className="absolute top-5 right-5 z-20 p-2 text-zinc-400 hover:text-white bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-900 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Left: Image & Quick Stats details */}
                  <div className="md:col-span-5 bg-zinc-950 aspect-square md:aspect-auto md:min-h-[500px] relative border-b md:border-b-0 md:border-r border-zinc-900">
                    <img 
                      src={activeStrain.image} 
                      alt={activeStrain.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest font-semibold border ${
                        activeStrain.type === 'Indica' ? 'bg-purple-950 text-purple-300 border-purple-800/40' :
                        activeStrain.type === 'Sativa' ? 'bg-amber-950 text-amber-300 border-amber-800/40' :
                        'bg-emerald-950 text-emerald-300 border-emerald-800/40'
                      }`}>
                        {activeStrain.type}
                      </span>
                      <h3 className="font-serif text-3xl font-bold text-white mt-2 leading-none">{activeStrain.name}</h3>
                      <p className="font-mono text-xs text-zinc-400 mt-1.5">{activeStrain.lineage}</p>
                    </div>
                  </div>

                  {/* Right: Technical scientific reports */}
                  <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-[#2c7238] uppercase tracking-widest font-medium">// Reporte Técnico de Cultivo</span>
                      <h4 className="font-sans text-zinc-400 text-xs tracking-wider uppercase mt-4 mb-2">Especificaciones de Laboratorio</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-900/60 mb-6">
                        <div>
                          <span className="block font-mono text-[9px] text-zinc-500 uppercase">THC</span>
                          <span className="block font-sans font-bold text-white text-lg mt-0.5">{activeStrain.thc}</span>
                        </div>
                        <div>
                          <span className="block font-mono text-[9px] text-zinc-500 uppercase">CBD</span>
                          <span className="block font-sans font-bold text-white text-lg mt-0.5">{activeStrain.cbd}</span>
                        </div>
                        <div>
                          <span className="block font-mono text-[9px] text-zinc-500 uppercase">Aroma</span>
                          <span className="block font-sans font-semibold text-cannamed-600/90 text-xs mt-1.5 truncate uppercase tracking-wider">{activeStrain.name.includes('Amethyst') ? 'Herbal' : activeStrain.name.includes('Golden') ? 'Cítrico' : 'Maderas'}</span>
                        </div>
                        <div>
                          <span className="block font-mono text-[9px] text-zinc-500 uppercase">Floración</span>
                          <span className="block font-mono text-xs font-semibold text-zinc-200 mt-1">{activeStrain.floweringTime}</span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-serif text-base font-semibold text-zinc-200 mb-2">Perfil Terpénico Completo</h4>
                          <div className="flex flex-wrap gap-2">
                            {activeStrain.terpenes.map((terp, i) => (
                              <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] rounded-lg">
                                {terp}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-serif text-base font-semibold text-zinc-200 mb-2">Acompañamiento Terapéutico Recomendado</h4>
                          <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                            {activeStrain.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-serif text-base font-semibold text-zinc-200 mb-2">Beneficios e Indicaciones de Clínicas Afiliadas</h4>
                          <ul className="space-y-2">
                            {activeStrain.medicalBenefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2 text-zinc-300 font-sans text-sm leading-snug">
                                <CheckCircle2 className="w-4 h-4 text-[#1ca233] shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <span className="block font-mono text-[9px] text-zinc-500 uppercase">Sustrato Terrestre</span>
                        <span className="block font-sans text-white text-xs font-medium">Turba orgánica certificada</span>
                      </div>
                      <button 
                        id="btn-modal-action-reserve"
                        onClick={() => {
                          setActiveStrain(null);
                          scrollTo('registro');
                        }}
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-cannamed-500 to-cannamed-600 hover:from-cannamed-600 hover:to-cannamed-700 text-white font-medium text-xs tracking-wider uppercase shadow-lg shadow-cannamed-950 transition-all text-center cursor-pointer"
                      >
                        Solicitar Variedad
                      </button>
                    </div>

                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

            <section
              id="faq"
              className="relative isolate bg-transparent py-24 px-6 border-y border-zinc-900"
            >
              {/* CONTENIDO FAQ */}
              <div className="w-full max-w-4xl mx-auto relative z-20 mt-[60px]">

                <div className="text-center max-w-xl mx-auto mb-16">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#1ca233] mb-3 font-semibold">
        // Tu Salud en un Entorno Confiable
                  </p>

                  <h2 className="font-serif text-3xl md:text-5xl font-semibold text-white tracking-tight">
                    Garantías y Legalidad de Nuestra Asociación
                  </h2>

                  <p className="font-sans text-sm text-zinc-400 mt-2 leading-relaxed">
                    Entendemos que el marco regulatorio del cannabis medicinal puede ser complejo.
                    Aquí resolvemos tus consultas principales de manera clara y directa.
                  </p>
                </div>

                <div className="space-y-4">
                  {FAQS.map((faq, index) => {
                    const isOpen = activeFaq === index;

                    return (
                      <div
                        key={index}
                        className="bg-[#0a0a0a] border border-zinc-900 rounded-xl overflow-hidden transition-all duration-300"
                      >
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : index)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <span className="font-serif text-lg md:text-xl text-zinc-100">
                            {faq.question}
                          </span>

                          <ChevronDown
                            className={`w-5 h-5 text-cannamed-600 transition-transform ${isOpen ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <div className="px-6 pb-6 pt-4 border-t border-zinc-900 text-zinc-400">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 p-6 rounded-xl bg-zinc-950 border border-zinc-900 flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-cannamed-600 shrink-0 mt-0.5" />

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                      Aviso Importante de Salud Pública
                    </h4>

                    <p className="font-sans text-xs text-zinc-500 mt-1 leading-relaxed">
                      Cannamed no promueve el consumo recreativo de cannabis ni la venta
                      abierta al público general.
                    </p>
                  </div>
                </div>

              </div>
            </section>

        {/* SECTION: REGISTRO INTENSO SENSORIAL */}
        <section id="registro" className="relative z-30 bg-[#030303] py-24 px-6">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column information: requirements */}
              <div className="lg:col-span-5 text-left">
                <p className="font-mono text-xs uppercase tracking-widest text-[#1ca233] mb-3 font-semibold">// Registra tu Solicitud de Asociación</p>
                <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-tight leading-none mb-6">
                  Comienza tu Terapia Hoy
                </h2>
                <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-8">
                  Para ingresar como asociado activo a la ONG Cannamed, solicitamos ingresar un registro básico de tus necesidades sanitarias. Una vez completado este formulario, nuestro cuerpo médico asociado evaluará tu legibilidad regulatoria para guiarte en el proceso de dispensación.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800 text-cannamed-600 shrink-0 mt-1">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-medium text-white text-base">Habilitación de Carnet</h4>
                      <p className="font-sans text-xs text-zinc-500 leading-relaxed mt-0.5">Te ayudamos a vincular tu perfil de salud con los sistemas nacionales de registro autorregulados para el transporte de aceites e inhalados.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800 text-cannamed-600 shrink-0 mt-1">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-medium text-white text-base">Entrevista de Admisión</h4>
                      <p className="font-sans text-xs text-zinc-500 leading-relaxed mt-0.5">Agendamos una videoconferencia corta con nuestros asesores clínicos para validar la dosis terapéutica requerida de cannabinoides.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800 text-cannamed-600 shrink-0 mt-1">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-medium text-white text-base">Privacidad Encriptada</h4>
                      <p className="font-sans text-xs text-zinc-500 leading-relaxed mt-0.5">Resguardamos meticulosamente tus datos biomédicos bajo estrictas políticas de confidencialidad médico-paciente.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Pre-registration visual form */}
              <div className="lg:col-span-7">
                <div className="bg-[#090909] border border-zinc-900 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                  
                  {/* Subtle decorative grid background for high fidelity */}
                  <div className="absolute inset-0 bg-dotted-pattern opacity-[0.03] pointer-events-none" />

                  {formSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-cannamed-950 border border-cannamed-900 text-cannamed-600 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-white mb-3">Solicitud de Asociación Enviada</h3>
                      <p className="font-sans text-sm text-zinc-400 max-w-md mx-auto leading-relaxed mb-8">
                        Muchas gracias, <strong className="text-zinc-200">{formData.fullName}</strong>. Hemos registrado con éxito tu intención de asociarte terapéuticamente bajo el perfil adaptado para <strong className="text-zinc-200">{formData.condition}</strong>.
                      </p>
                      
                      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3 mb-8">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono text-zinc-500">CÓDIGO DE ADMISIÓN</span>
                          <span className="font-mono font-bold text-white uppercase">{Math.random().toString(36).substring(2, 8).toUpperCase()}-MED</span>
                        </div>
                        <div className="h-px bg-zinc-900" />
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono text-zinc-500">VARIEDAD ASIGNADA</span>
                          <span className="font-sans font-semibold text-cannamed-600">{formData.preferredStrain}</span>
                        </div>
                        <div className="h-px bg-zinc-900" />
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono text-zinc-500">PROBABLE REUNIÓN</span>
                          <span className="font-sans font-medium text-zinc-300">Próximas 24hs hábiles de correo</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            dni: '',
                            prescriptionNumber: '',
                            condition: 'Insomnio',
                            preferredStrain: STRAINS[0].name,
                            experienceLevel: 'intermedio',
                            acknowledgedRules: false,
                          });
                        }}
                        className="px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Enviar otra solicitud
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div className="flex flex-col text-left">
                          <label htmlFor="reg-fullName" className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-2 block font-semibold">Nombre Completo</label>
                          <input 
                            type="text" 
                            name="fullName"
                            id="reg-fullName"
                            required
                            placeholder="Ej. Sofia Albarracín" 
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-850 text-white placeholder-zinc-600 focus:outline-none focus:border-cannamed-600 text-sm transition-colors"
                          />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col text-left">
                          <label htmlFor="reg-email" className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-2 block font-semibold">Dirección de Email</label>
                          <input 
                            type="email" 
                            name="email"
                            id="reg-email"
                            required
                            placeholder="Ej. sofia@ejemplo.com" 
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-850 text-white placeholder-zinc-600 focus:outline-none focus:border-cannamed-600 text-sm transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Document Identification */}
                        <div className="flex flex-col text-left">
                          <label htmlFor="reg-dni" className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-2 block font-semibold">DNI o Pasaporte</label>
                          <input 
                            type="text" 
                            name="dni"
                            id="reg-dni"
                            required
                            placeholder="Ej. 38459203" 
                            value={formData.dni}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-850 text-white placeholder-zinc-600 focus:outline-none focus:border-cannamed-600 text-sm transition-colors"
                          />
                        </div>

                        {/* Prescription Number (Optional) */}
                        <div className="flex flex-col text-left">
                          <label htmlFor="reg-prescription" className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-2 block font-semibold">N° Matricula / Recuerdo Médico</label>
                          <input 
                            type="text" 
                            name="prescriptionNumber"
                            id="reg-prescription"
                            placeholder="Ej. REPROCANN-20593" 
                            value={formData.prescriptionNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-850 text-white placeholder-zinc-600 focus:outline-none focus:border-cannamed-600 text-sm transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Medical Condition Diagnosis Select */}
                        <div className="flex flex-col text-left">
                          <label htmlFor="reg-condition" className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-2 block font-semibold">Sintoma o Afección Principal</label>
                          <select 
                            name="condition"
                            id="reg-condition"
                            value={formData.condition}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-300 focus:outline-none focus:border-cannamed-600 text-sm transition-colors cursor-pointer"
                          >
                            <option value="Insomnio">Insomnio o Despertares Nocturnos</option>
                            <option value="Dolor Crónico">Dolor Crónico Musculoesquelético</option>
                            <option value="Ansiedad">Ansiedad Severa o Estrés Postraumático</option>
                            <option value="Epilepsia">Epilepsia Correlacionada</option>
                            <option value="Tratamiento Oncológico">Efectos de Quimioterapia (Nauseas/Apetito)</option>
                          </select>
                        </div>

                        {/* Preferred strain Select */}
                        <div className="flex flex-col text-left">
                          <label htmlFor="reg-preferredStrain" className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-2 block font-semibold">Variedad Recomendada Sugerida</label>
                          <select 
                            name="preferredStrain"
                            id="reg-preferredStrain"
                            value={formData.preferredStrain}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-850 text-zinc-300 focus:outline-none focus:border-cannamed-600 text-sm transition-colors cursor-pointer"
                          >
                            {STRAINS.map((strain) => (
                              <option key={strain.id} value={strain.name}>{strain.name} ({strain.type})</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Experience and disclaimer checkboxes */}
                      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4">
                        <div className="flex items-start gap-3">
                          <input 
                            type="checkbox" 
                            name="acknowledgedRules"
                            id="acknowledgedRules"
                            checked={formData.acknowledgedRules}
                            onChange={handleCheckboxChange}
                            required
                            className="mt-1 accent-cannamed-600 cursor-pointer w-4 h-4"
                          />
                          <label htmlFor="acknowledgedRules" className="font-sans text-[11px] text-zinc-400 leading-normal block select-none cursor-pointer">
                            Declaro bajo juramento que los fines de mi asociación a Cannamed son estrictamente terapéuticos, adhiriéndome voluntariamente al estatuto colectivo del autocultivo medicinal cerrado para reducción de daños.
                          </label>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        id="btn-submit-registration"
                        className="w-full py-4 rounded-full bg-gradient-to-r from-cannamed-500 to-cannamed-600 hover:from-cannamed-600 hover:to-cannamed-700 text-white font-medium shadow-xl shadow-cannamed-950 hover:scale-[1.01] transition-all flex items-center justify-center gap-2.5 cursor-pointer text-sm tracking-wide"
                      >
                        Enviar Inscripción Sanitaria
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>

                      <p className="font-sans text-[10px] text-zinc-600 text-center leading-normal">
                        La presentación de datos falsos o el desvío de dosis para fines comerciales vulnera los códigos de la corporación y motivará la baja automática inmediata del padrón de afiliados de la ONG.
                      </p>
                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="main-footer" className="relative z-30 bg-[#060606] py-16 px-6 border-t border-zinc-900">
        <div className="w-full max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            
            {/* Logo and brief summary */}
            <div className="md:col-span-4 flex flex-col items-start text-left">
              <div className="flex items-center gap-3 cursor-pointer mb-6" onClick={() => scrollTo('hero')}>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cannamed-500 to-cannamed-600 flex items-center justify-center shadow-lg">
                  <Leaf className="w-5 h-5 text-zinc-100" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-semibold tracking-tight text-white leading-none">
                    Canna<span className="text-cannamed-600 font-sans font-light">med</span>
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
                    Asociación Fitomedicina
                  </span>
                </div>
              </div>
              <p className="font-sans text-xs text-zinc-500 leading-relaxed max-w-sm">
                Conectando el autocultivo terapéutico orgánico, amparado por regulaciones sanitarias de vanguardia, para proveer cannabis analizado químicamente libre de contaminantes.
              </p>
            </div>

            {/* Links columns */}
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-4 block font-semibold">La ONG</h4>
                <div className="flex flex-col gap-3">
                  <button onClick={() => scrollTo('alianza')} className="font-sans text-xs text-zinc-500 hover:text-white transition-colors text-left cursor-pointer">Principios Generales</button>
                  <button onClick={() => scrollTo('el-vacio')} className="font-sans text-xs text-zinc-500 hover:text-white transition-colors text-left cursor-pointer">El Vacío Visual</button>
                  <button onClick={() => scrollTo('faq')} className="font-sans text-xs text-zinc-500 hover:text-white transition-colors text-left cursor-pointer">Garantía Estatutaria</button>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-4 block font-semibold">Terapia y Flores</h4>
                <div className="flex flex-col gap-3">
                  <button onClick={() => scrollTo('flores')} className="font-sans text-xs text-zinc-500 hover:text-white transition-colors text-left cursor-pointer">Amethyst Indica</button>
                  <button onClick={() => scrollTo('flores')} className="font-sans text-xs text-zinc-500 hover:text-white transition-colors text-left cursor-pointer">Golden Lemon Sativa</button>
                  <button onClick={() => scrollTo('flores')} className="font-sans text-xs text-zinc-500 hover:text-white transition-colors text-left cursor-pointer">Emerald Harlequin CBD</button>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-4 block font-semibold">Sede de Contacto</h4>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  Calle de la Botánica 418, Piso 2, Alianza Capital<br />
                  <span className="font-semibold text-zinc-450">Email:</span> nahuelcastilla22@gmail.com<br />
                  <span className="font-semibold text-zinc-450">Tel:</span> +54 (911) 50283921
                </p>
              </div>

            </div>

          </div>

          <div className="h-px bg-zinc-900 mb-8" />

          {/* Institutional footer and clinical disclaimer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="font-mono text-[9px] text-zinc-650">
              &copy; 1928-2026 CANNAMED ASOCIACIÓN CIVIL BOTÁNICA MEDICINAL. TODOS LOS DERECHOS REGISTRADOS.
            </p>
            <p className="font-sans text-[10px] text-zinc-600 max-w-xl leading-relaxed md:text-right">
              ATENCIÓN: El consumo de sustancias inhaladas o digeridas conlleva riesgos. El uso terapéutico debe realizarse bajo el estricto control y seguimiento de un médico matriculado habilitante. Este sitio web no comercializa flores de forma ilegal.
            </p>
          </div>

        </div>
      </footer>

        </div> {/* Close col-span-12 lg:col-span-11 right container */}
      </div> {/* Close 12-column grid container */}

    </div>
  );
}
