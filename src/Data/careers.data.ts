// src/data/careers.data.ts
//
// Single source of truth for the Careers page and job description pages.
// To open a new vacancy: add a new object to `jobVacancies`.
// To close a vacancy: remove it from the array (or set `isOpen: false`,
// see JobDescriptionPage.tsx for how that is handled).
//
// IMPORTANT — before publishing:
//   1. Replace every `googleFormUrl` below with the real Google Form link
//      for that role (Form → Send → copy link).
//   2. Fill in `closingDate` / `applicationDeadline` with real dates, or
//      leave the "rolling basis" copy if the role has no fixed deadline.
//   3. `salaryRange`, `workingHours` and `probationPeriod` are optional —
//      add real figures once agreed internally; until then they are
//      simply left out of the job description page.

export interface JobResponsibilityGroup {
  heading: string;
  items: string[];
}

export interface JobVacancy {
  /** URL-friendly identifier, used for /careers/:slug */
  slug: string;
  title: string;
  employmentType: string;
  location: string;
  /** Short line shown on the vacancy card, e.g. "Applications close 30 Aug 2026" */
  closingDate: string;
  /** One or two sentence teaser shown on the vacancy card */
  summary: string;
  /** Longer paragraph shown at the top of the job description page */
  jobSummary: string;
  responsibilities: JobResponsibilityGroup[];
  qualifications: string[];
  skills: string[];
  addedAdvantage?: string[];
  salaryRange?: string;
  workingHours?: string;
  probationPeriod?: string;
  benefits: string[];
  careerGrowth: string;
  applicationDeadline: string;
  /** Google Form link applicants are redirected to when they click "Apply Now" */
  googleFormUrl: string;
  /** Set to false to keep the page live but stop accepting applications */
  isOpen: boolean;
}

export const recruitmentDeadline = new Date("2026-08-12T23:59:59");

export const isRecruitmentOpen = (): boolean =>
  new Date() <= recruitmentDeadline;

export const isJobEffectivelyOpen = (job: JobVacancy): boolean =>
  job.isOpen && isRecruitmentOpen();

export const jobVacancies: JobVacancy[] = [
  {
    slug: "marketing-client-support-intern",
    title: "Marketing & Client Support Intern (NYSC)",
    employmentType: "NYSC (Full-Time)",
    location: "Yaba, Lagos",
    closingDate: "Applications close 12th August 2026",
    summary:
      "Support our marketing activities, manage client enquiries, and help create content while gaining hands-on experience in real estate.",
    jobSummary:
      "The successful candidate will support the company's marketing activities, manage customer enquiries, assist with content creation, oversee social media engagement, and provide administrative support while gaining valuable hands-on experience in the real estate industry.",
    responsibilities: [
      {
        heading: "Client Support",
        items: [
          "Respond promptly to enquiries received via Instagram, Facebook, WhatsApp, email, and the company website.",
          "Qualify prospective buyers and tenants before escalating qualified leads.",
          "Follow up with existing prospects.",
          "Maintain an organized lead tracker and CRM.",
          "Ensure excellent customer service throughout the enquiry process.",
        ],
      },
      {
        heading: "Social Media Management",
        items: [
          "Publish scheduled content across all social media platforms.",
          "Respond to comments, direct messages, and online enquiries.",
          "Engage with followers and grow the company's online community.",
          "Monitor page activity and report engagement metrics.",
        ],
      },
      {
        heading: "Content Creation",
        items: [
          "Capture photos and videos during property inspections, client meetings, and company activities.",
          "Create simple graphics using Canva.",
          "Edit short-form videos and Reels using CapCut or similar software.",
          "Organize and maintain the company's media library.",
          "Support the execution of the monthly content calendar using AI tools where appropriate.",
        ],
      },
      {
        heading: "Administrative Support",
        items: [
          "Update property listings.",
          "Organize inspection schedules.",
          "Prepare property documents.",
          "Maintain digital records and CRM updates.",
          "Prepare weekly activity reports.",
        ],
      },
    ],
    qualifications: [
      "Must be a serving NYSC Corps Member.",
      "Bachelor's Degree or HND in Marketing, Mass Communication, Business Administration, Estate Management, Computer Science, or a related discipline.",
    ],
    skills: [
      "Excellent verbal and written communication skills.",
      "Strong organizational and time management skills.",
      "Basic knowledge of Canva and CapCut.",
      "Familiarity with social media platforms.",
      "Good knowledge of Microsoft Office or Google Workspace.",
      "Willingness to learn AI tools such as ChatGPT.",
      "Positive attitude and willingness to learn.",
      "Ability to work independently and as part of a team.",
    ],
    addedAdvantage: [
      "Previous experience managing social media pages.",
      "Basic photography or videography skills.",
      "Residence within Yaba or nearby areas is a strong advantage.",
    ],
    benefits: [
      "Practical real estate experience.",
      "Professional mentorship.",
      "Friendly and collaborative work environment.",
      "Opportunity for full-time employment based on performance.",
    ],
    careerGrowth:
      "Strong performers are considered for full-time roles at the end of their NYSC service year, with a clear path into marketing or client-facing positions.",
    applicationDeadline: "12th August 2026",
    googleFormUrl: "https://forms.gle/otvtn5WWeEz5jiB48",
    isOpen: true,
  },
  {
    slug: "business-growth-manager",
    title: "Business Growth Manager",
    employmentType: "Full-Time",
    location: "Yaba, Lagos",
    closingDate: "Applications close 12th August 2026",
    summary:
      "Lead growth initiatives across marketing, partnerships, and customer experience to strengthen 1502 Properties' market presence.",
    jobSummary:
      "The Business Growth Manager will be responsible for driving business growth through strategic marketing, lead generation, customer experience improvement, partnership development, brand management, and data-driven decision-making. The role requires a proactive leader who combines strategic thinking with hands-on execution.",
    responsibilities: [
      {
        heading: "Business Growth",
        items: [
          "Develop and execute monthly growth strategies.",
          "Identify and pursue new business opportunities.",
          "Build strategic partnerships with developers, corporate organizations, financial institutions, and referral partners.",
          "Recommend new revenue opportunities and marketing channels.",
        ],
      },
      {
        heading: "Marketing",
        items: [
          "Plan, execute, and optimize digital marketing campaigns.",
          "Manage Meta Ads and Google Ads campaigns.",
          "Improve website conversion rates.",
          "Monitor campaign performance and optimize lead quality.",
          "Develop email and WhatsApp marketing initiatives.",
        ],
      },
      {
        heading: "Customer Experience",
        items: [
          "Improve the customer journey from enquiry to transaction.",
          "Develop lead nurturing and follow-up systems.",
          "Ensure timely responses to customer enquiries.",
          "Monitor customer satisfaction and implement improvements.",
        ],
      },
      {
        heading: "Brand & Content Strategy",
        items: [
          "Develop the monthly content strategy.",
          "Supervise content production and ensure consistency with brand guidelines.",
          "Use AI tools to improve content planning and marketing efficiency.",
          "Direct property marketing campaigns and creative projects.",
        ],
      },
      {
        heading: "Reporting & Performance",
        items: [
          "Monitor marketing and sales performance metrics.",
          "Prepare weekly and monthly performance reports.",
          "Track campaign ROI and recommend improvements.",
          "Support management with business insights and strategic recommendations.",
        ],
      },
    ],
    qualifications: [
      "Bachelor's Degree in Marketing, Business Administration, Mass Communication, Economics, Estate Management, or a related field.",
      "Minimum of 3 years' experience in business development, digital marketing, growth marketing, customer experience, or a related role.",
      "Experience in the real estate industry is an advantage but not mandatory.",
    ],
    skills: [
      "Strong understanding of Meta Ads and Google Ads.",
      "Experience with CRM systems.",
      "Knowledge of SEO and website analytics.",
      "Proficiency in Microsoft Excel or Google Sheets.",
      "Familiarity with AI productivity tools including ChatGPT.",
      "Strong project management and analytical skills.",
      "Strategic thinker with strong business acumen.",
      "Excellent communication and presentation skills.",
      "Highly organized and detail-oriented.",
      "Results-driven with strong problem-solving skills.",
      "High level of integrity and professionalism.",
    ],
    addedAdvantage: [
      "Experience working in a startup or high-growth business.",
      "Knowledge of the Lagos real estate market.",
      "Residence within Yaba or nearby areas is a strong advantage.",
    ],
    salaryRange:
      "Competitive, commensurate with experience, plus performance-based incentives.",
    benefits: [
      "Competitive salary and performance-based incentives.",
      "Professional development and leadership opportunities.",
      "Collaborative and innovative work environment.",
    ],
    careerGrowth:
      "Clear career progression based on performance, with the opportunity to shape and grow the company's business development function as 1502 Properties scales.",
    applicationDeadline: "12th August 2026",
    googleFormUrl: "https://forms.gle/7pFs4W2FkPByou3f7",
    isOpen: true,
  },
  {
    slug: "digital-marketing-content-strategist",
    title: "Digital Marketing & Content Strategist",
    employmentType: "Full-Time",
    location: "Yaba, Lagos (Office-Based)",
    closingDate: "Applications close 12th August 2026",

    summary:
      "Plan, execute and optimize digital marketing campaigns while developing compelling content that generates qualified leads and strengthens the company's brand.",

    jobSummary:
      "The Digital Marketing & Content Strategist will be responsible for planning, executing, and optimizing the company's digital marketing activities while developing compelling content that generates qualified leads and strengthens the brand. Working closely with the Managing Partner and supervising the Marketing & Client Support Intern, the successful candidate will build marketing systems that capture, nurture, and convert prospects into inspection bookings and successful property transactions. This role combines omnichannel marketing, content strategy, CRM management, marketing automation, and performance analysis.",

    responsibilities: [
      {
        heading: "Digital Marketing",
        items: [
          "Plan, execute, and optimize Meta, Google, and other advertising campaigns.",
          "Develop lead generation strategies across digital channels.",
          "Improve website traffic and conversion rates.",
          "Implement email and WhatsApp marketing campaigns.",
          "Monitor campaign performance and recommend improvements.",
        ],
      },
      {
        heading: "CRM & Marketing Automation",
        items: [
          "Manage and maintain the company's CRM platform.",
          "Ensure enquiries from the website, Meta Lead Forms, WhatsApp, and other channels are properly captured.",
          "Build simple automated workflows for lead nurturing.",
          "Segment leads based on buyer profiles and buying intent.",
          "Ensure no qualified lead is lost through poor follow-up.",
        ],
      },
      {
        heading: "Content Strategy",
        items: [
          "Develop the monthly content calendar.",
          "Create campaign concepts for property marketing.",
          "Use AI tools to generate first drafts and marketing ideas.",
          "Review and approve content before publication.",
          "Direct property shoots and supervise content production.",
          "Provide guidance to the Marketing & Client Support Intern.",
        ],
      },
      {
        heading: "Brand Development",
        items: [
          "Ensure consistency across all digital platforms.",
          "Identify opportunities to grow brand awareness.",
          "Support partnership and promotional initiatives.",
          "Strengthen the company's online reputation.",
        ],
      },
      {
        heading: "Analytics & Reporting",
        items: [
          "Prepare weekly and monthly reports covering leads generated.",
          "Track qualified leads.",
          "Monitor website traffic.",
          "Evaluate campaign performance.",
          "Track cost per lead.",
          "Monitor inspection bookings.",
          "Measure social media growth.",
          "Provide recommendations for continuous improvement.",
        ],
      },
    ],

    qualifications: [
      "Minimum of 2 years' experience in Digital Marketing.",
      "Experience managing Meta Ads, Google Ads, and other digital marketing channels.",
      "Experience using CRM platforms such as HubSpot, Zoho, Salesforce, or similar.",
      "Good understanding of digital marketing analytics.",
    ],

    skills: [
      "Meta Ads management.",
      "Google Ads management.",
      "CRM management (HubSpot, Zoho, Salesforce, or similar).",
      "Marketing automation.",
      "Digital marketing analytics.",
      "Strong copywriting and communication skills.",
      "Basic video editing and graphic design skills.",
      "Excellent organizational and problem-solving abilities.",
      "AI-assisted content creation.",
    ],

    addedAdvantage: [
      "Experience using Zapier or Make.",
      "Strategic and commercially minded.",
      "Creative and innovative.",
      "Data-driven and analytical.",
      "Highly organized.",
      "Proactive and self-motivated.",
      "Passionate about continuous learning.",
      "Comfortable using AI to improve productivity.",
      "Applicants residing in Yaba or surrounding areas have an added advantage.",
    ],

    salaryRange: "Competitive, commensurate with experience and performance.",

    benefits: [
      "Professional growth in a fast-growing real estate company.",
      "Opportunity to work closely with senior leadership.",
      "Hands-on experience building scalable marketing systems.",
      "Collaborative and innovation-driven work environment.",
    ],

    careerGrowth:
      "Successful candidates will have the opportunity to lead the company's digital marketing strategy, marketing automation systems, brand growth initiatives, and customer acquisition efforts as the business expands.",

    applicationDeadline: "12th August 2026",

    googleFormUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdp4Lr5D_S7bcxVKEx2jVuwSBfdoIwa9GFpy1EnkjcIT5s54Q/viewform?usp=publish-editor",

    isOpen: true,
  },
];

export const getJobBySlug = (slug: string): JobVacancy | undefined =>
  jobVacancies.find((job) => job.slug === slug);
