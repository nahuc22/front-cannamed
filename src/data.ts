import { BudStrain, ActivityFaq } from './types';

export const STRAINS: BudStrain[] = [
  {
    id: 'indica-amethyst',
    name: 'Amethyst Kush',
    codeName: 'AM-77',
    type: 'Indica',
    tagline: 'Relajación Profunda y Alivio Nocturno',
    description: 'Un cruce legendario que produce cálices densos repletos de tricomas color amatista. Desarrollado específicamente bajo supervisión terapéutica para el tratamiento del insomnio crónico severo y el espasmo muscular involuntario, proporcionando un sedante físico absoluto de liberación prolongada.',
    thc: '22%',
    cbd: '0.2%',
    terpenes: ['Mirceno (Sedativo)', 'Cariofileno (Analgésico)', 'Linalool (Relajante)'],
    medicalBenefits: [
      'Alivio inmediato de insomnio persistente',
      'Reducción de espasmos musculares y temblores',
      'Disminución significativa del dolor crónico'
    ],
    lineage: 'Granddaddy Purple x OG Kush',
    floweringTime: '8-9 semanas',
    aroma: 'Uva madura con tonos terrosos profundos, pino herbal y un sutil fondo de lavanda silvestre.',
    image: '/src/assets/images/cannamed_bud1_indica_1780360587835.png'
  },
  {
    id: 'sativa-golden',
    name: 'Golden Lemon',
    codeName: 'GL-43',
    type: 'Sativa',
    tagline: 'Foco Cognitivo y Alivio Antidepresivo',
    description: 'Cálices alargados y resplandecientes, cubiertos en una densa capa de resina dorada extraída en cultivos hidropónicos controlados. Ideal para uso diurno, ayudando a mitigar la fatiga crónica y el estrés patológico sin comprometer la lucidez ni provocar letargo.',
    thc: '19%',
    cbd: '0.8%',
    terpenes: ['Limoneno (Ansiolítico)', 'Pineno (Foco mental)', 'Ocimeno (Antiviral/Herbal)'],
    medicalBenefits: [
      'Mitiga la niebla mental y fatiga crónica',
      'Estimulación limpia del apetito terapéutico',
      'Modulador de ánimo contra la ansiedad y depresión'
    ],
    lineage: 'Super Lemon Haze x Kosher Kush',
    floweringTime: '9-10 semanas',
    aroma: 'Cítrico punzante a limón maduro con notas picantes de pimienta negra y madera de cedro.',
    image: '/src/assets/images/cannamed_bud2_sativa_1780360601260.png'
  },
  {
    id: 'cbd-emerald',
    name: 'Emerald Harlequin',
    codeName: 'EH-99',
    type: 'CBD Premium',
    tagline: 'Equilibrio Total de Espectro Clínico',
    description: 'Una de nuestras cepas más laureadas en el ámbito de la fitomedicina. Con un ratio CBD:THC de más de 2:1, ofrece los máximos beneficios antiinflamatorios y neuromoduladores del cannabis medicinal sin producir alteración de la percepción sensorial, lo que la hace perfecta para pacientes pediátricos o geriátricos.',
    thc: '5.5%',
    cbd: '13.8%',
    terpenes: ['Beta-Cariofileno (Antiinflamatorio)', 'Humuleno (Antibacteriano)', 'Mirceno (Relajante)'],
    medicalBenefits: [
      'Poderoso antiinflamatorio para artritis y artrosis',
      'Control de cuadros epilépticos y dolor neuropático',
      'Reducción drástica del estrés y la ansiedad sistémica'
    ],
    lineage: 'Harlequin x Sour Tsunami',
    floweringTime: '8 semanas',
    aroma: 'Sándalo cálido, cerezas silvestres secas y un toque de almizcle herbal boscoso.',
    image: '/src/assets/images/cannamed_bud3_cbd_1780360617247.png'
  }
];

export const FAQS: ActivityFaq[] = [
  {
    question: '¿Qué es Cannamed?',
    answer: 'Cannamed es una ONG (Asociación No Gubernamental) dedicada a la investigación, cultivo controlado, divulgación científica y distribución segura de cannabis terapéutico para usuarios con prescripción médica o necesidades fitoterapéuticas validadas.'
  },
  {
    question: '¿Cómo funciona el sistema de dispensación terapéutica?',
    answer: 'Cada miembro de la ONG pasa por un proceso de registro médico que valida su condición física. De acuerdo con las regulaciones de salud correspondientes y prescripciones profesionales, se asigna un programa personalizado y dosis de variedades específicas cultivadas bajo rigurosos protocolos libres de pesticidas.'
  },
  {
    question: '¿Qué marco legal ampara la ONG?',
    answer: 'Operamos estrictamente bajo la ley de asociaciones, clubes cannábicos colectivos y reglamentos específicos de uso medicinal. Fomentamos el modelo de autocultivo colectivo y la reducción de daños, ofreciendo un entorno controlado libre de mercados negros.'
  },
  {
    question: '¿Cómo garantizan la calidad de los cultivos?',
    answer: 'Todos nuestros cogollos son cultivados de manera orgánica certificada, con análisis cromatográficos regulares para determinar los perfiles precisos de cannabinoides (THC/CBD/CBG) y terpenos de cada lote. Esto garantiza dosis uniformes y reproducibles para el tratamiento de pacientes.'
  }
];

export const BENEFITS_SUMMARY = [
  {
    title: 'Cultivo Orgánico Certificado',
    desc: 'Sin pesticidas ni metales pesados. Nutrición orgánica para flores puras.',
    icon: 'Leaf'
  },
  {
    title: 'Análisis de Laboratorio',
    desc: 'Informes detallados de canabinoides y terpenos de todas nuestras variedades.',
    icon: 'ShieldAlert'
  },
  {
    title: 'Apoyo Médico y Legal',
    desc: 'Asesoramiento con profesionales de la salud y abogados especialistas en cannabis.',
    icon: 'HeartHandshake'
  }
];
