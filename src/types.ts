export interface BudStrain {
  id: string;
  name: string;
  codeName: string;
  type: 'Indica' | 'Sativa' | 'Híbrido' | 'CBD Premium';
  tagline: string;
  description: string;
  thc: string;
  cbd: string;
  terpenes: string[];
  medicalBenefits: string[];
  lineage: string;
  floweringTime: string;
  aroma: string;
  image: string;
}

export interface ActivityFaq {
  question: string;
  answer: string;
}

export interface NGOInfo {
  mission: string;
  vision: string;
  laws: string[];
}
