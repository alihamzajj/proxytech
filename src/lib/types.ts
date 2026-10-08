export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  tags: string[];
  problemsSolved: string[];
  deliverables: string[];
  technologies: string[];
  timeline: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  category: 'Starter' | 'Growth' | 'Business' | 'Enterprise';
  tagline: string;
  monthlyPrice: number | 'Custom';
  yearlyPrice: number | 'Custom';
  popular?: boolean;
  deliverables: string[];
  support: string;
  revisions: string;
  developmentHours: string;
  maintenanceIncluded: boolean;
  seoAuditIncluded: boolean;
  ctaText: string;
}

export type EmployeeStatus = 'Active' | 'Available' | 'In Sprint' | 'On Leave' | 'Inactive';

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  fullBio: string;
  location: string;
  experienceYears: number;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email: string;
  };
  projectsCount: number;
  avatar: string;
  status?: EmployeeStatus;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'SaaS' | 'Mobile App' | 'Web Platform' | 'AI & Automation' | 'E-Commerce';
  clientIndustry: string;
  overview: string;
  challenge: string;
  solution: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  timeline: string;
  deliverables: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  projectSlug?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  preferred_contact?: string;
  created_at?: string;
}
