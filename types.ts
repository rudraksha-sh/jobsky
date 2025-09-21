

export type Language = 'english' | 'hindi';

export interface RoadmapStep {
  step: string;
  resources: string[];
}

export interface CareerSuggestion {
  career: string;
  matched_skills: string[];
  missing_skills: string[];
  roadmap: RoadmapStep[];
}

export interface CareerAdvisorResponse {
  skills_detected: string[];
  career_suggestions: CareerSuggestion[];
  extra_recommendations: string[];
  language_used: Language;
}

// Types for Resume Builder
export interface ResumeBuilderResponse {
  summary: string;
  experience: string[];
  skills: string[];
}

// Type for User Profile
export interface UserProfile {
  name: string;
  email: string;
  picture: string;
}
