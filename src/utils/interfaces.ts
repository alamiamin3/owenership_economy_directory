   export interface HeadquartersLocation {
    address?: string;
    city?: string;
    state_region?: string;
    country?: string;
    zip?: string;
  }
  
  export interface FundingFinancialInformation {
    funding_sources?: string[]; 
    revenue?: string; 
  }
  
  export interface TokenInformation {
    token_name?: string;
    token_symbol?: string;
    token_platform?: string;
    token_governance_mechanism?: string;
    token_link?: string;
  }
  
  export interface LinksSocialMedia {
    website?: string;
    twitter?: string;
    linkedin?: string;
    discord?: string;
    github?: string;
    other_links?: string;
  }
  
  export interface ContactInformation {
    contact_person?: string;
    email?: string;
    phone?: string;
  }
  export interface fieldsInterface {
    name: string; 
    description?: string; 
    organization_type: string; 
    industry: string; 
    ownership_structure: string[]; 
    legal_structure: string; 
    year_founded?: number; 
    headquarters_location?: HeadquartersLocation | string[];
    geographical_scope?: string; 
    size?: string; 
    owners_number?: number; 
    funding_financial_information?: FundingFinancialInformation | string[]; 
    token_information?: TokenInformation | string[]; 
    governance_model?: string; 
    links_social_media?: LinksSocialMedia | string[]; 
    contact_info?: ContactInformation | string[]; 
    certifications_affiliations?: string[]; 
    tags?: string[]; 
    date_added: Date; 
    last_update: Date; 
    address?: string[];
    city?: string[];
    state_region?: string[];
    country?: string[];
    zip?: string[];
    funding_sources?: string[]; 
    revenue?: string[];
    token_name?: string[];
    token_symbol?: string[];
    token_platform?: string[];
    token_governance_mechanism?: string[];
    token_link?: string[];
    website?: string[];
    twitter?: string[];
    linkedin?: string[];
    discord?: string[];
    github?: string[];
    other_links?: string[];
    contact_person?: string[];
    email?: string[];
    phone?: string[];


  }
  export interface Organization {
    id: string;
    fields : fieldsInterface
  }