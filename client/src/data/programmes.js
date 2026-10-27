/**
 * Verified Programmes for Saif Barkat Vegdani Tuition Classes
 * Strict Client Data:
 * - Standards 3–8: GSEB and CBSE boards, All subjects except Sanskrit
 * - Standards 9–10: GSEB board, All subjects except Computer and Sanskrit
 * - Standards 11–12: Commerce stream, All subjects
 */
export const PROGRAMMES_DATA = [
  {
    id: "std-3-8",
    num: "01",
    badge: "Foundation Learning",
    title: "Standards 3–8",
    subtitle: "Primary & Middle Foundation",
    boards: "GSEB & CBSE Boards",
    scope: "All school subjects (except Sanskrit)",
    scopeNote: "Sanskrit is excluded per verified scope",
    description:
      "Nurturing early curiosity and building ironclad fundamentals in mathematics, science, languages, and social concepts through structured practice.",
    highlights: [
      "Concept-first learning explaining the foundational 'why' behind formulas",
      "Daily homework revision and step-by-step problem breakdown",
      "Regular diagnostic assessments to pinpoint learning gaps early",
      "Cultivates quiet study stamina and independent problem-solving habits"
    ],
    highlightTag: "GSEB & CBSE",
    cardTone: "standard"
  },
  {
    id: "std-9-10",
    num: "02",
    badge: "Crucial Board Phase",
    title: "Standards 9–10",
    subtitle: "Secondary Board Preparation",
    boards: "GSEB Board Only",
    scope: "All subjects (except Computer & Sanskrit)",
    scopeNote: "Computer and Sanskrit excluded per verified scope",
    description:
      "Rigorous board exam pacing, answer-sheet presentation techniques, and complete syllabus mastery designed for outstanding Gujarat State Board results.",
    highlights: [
      "Systematic Gujarat Board syllabus pacing with structured revision buffers",
      "Rigorous past-paper analysis and board answer-sheet presentation skills",
      "Full-length board simulation exams evaluated with strict GSEB rubrics",
      "Direct 1-on-1 doubt resolution clinics mentored by Saif Sir"
    ],
    highlightTag: "GSEB Board Only",
    cardTone: "featured" // Distinct art direction
  },
  {
    id: "std-11-12",
    num: "03",
    badge: "Commerce Studies",
    title: "Standards 11–12",
    subtitle: "Higher Secondary Commerce",
    boards: "Commerce Stream",
    scope: "All Commerce subjects covered",
    scopeNote: "Complete coverage of all Commerce subjects",
    description:
      "Deep conceptual clarity in Accountancy, Economics, Statistics, and Commercial Organization under the specialized guidance of a B.Com & B.Ed qualified mentor.",
    highlights: [
      "Conceptual depth in double-entry bookkeeping & balance sheet mastery",
      "Numerical drill worksheets and real-world commercial illustrations",
      "Timed section-wise exam simulations strictly mirroring board blueprints",
      "Specialized foundation guidance for future professional commerce careers"
    ],
    highlightTag: "Commerce Stream",
    cardTone: "standard"
  }
];

export const TEACHER_DATA = {
  name: "Saif Barkat Vegdani",
  age: 26,
  qualifications: ["Bachelor of Commerce (B.Com)", "Bachelor of Education (B.Ed)"],
  overallExperienceYears: 8,
  previousExperience: [
    {
      institution: "Ignite Academy",
      subjects: "Mathematics & Science",
      duration: "2 years"
    },
    {
      institution: "Saraswati Classes",
      subjects: "Social Science",
      duration: "3 years"
    },
    {
      institution: "Good Shepherd Mission School",
      subjects: "School Teaching Faculty",
      duration: "4 years"
    }
  ],
  batchTimings: "4:30 PM – 8:00 PM",
  batchDays: "Monday to Saturday (Evening Batches)"
};
