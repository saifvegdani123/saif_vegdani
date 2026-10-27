/**
 * Confirmed Academic Programmes for Saif Barkat Vegdani Tuition Classes
 * Strict Client Data from Prompt:
 * - Standards 3–8: GSEB and CBSE boards, All subjects except Sanskrit
 * - Standards 9–10: GSEB board, All subjects except Computer and Sanskrit
 * - Standards 11–12: Commerce stream, All subjects
 */
export const PROGRAMMES = [
  {
    id: "std-3-8",
    programmeNumber: "01",
    title: "Primary & Middle Foundation",
    standards: "Standards 3–8",
    boards: ["GSEB", "CBSE"],
    stream: "General Foundational Curriculum",
    subjects: "All school subjects except Sanskrit",
    subjectHighlights: [
      "Mathematics & Arithmetic Reasoning",
      "General Science & Environmental Studies",
      "English Grammar & Reading Comprehension",
      "Social Science / Environmental Studies",
      "Regional & First Languages (Gujarati/Hindi)"
    ],
    features: [
      "Concept-first pedagogy explaining the foundational 'why' behind formulas",
      "Daily homework assistance, step-by-step problem breakdown & revision",
      "Regular diagnostic assessments to spot and bridge learning gaps early",
      "Building calm study stamina, neat notebook presentation & routine"
    ],
    batchType: "Evening Batch (4:30 PM – 8:00 PM window)",
    tag: "Foundation Learning"
  },
  {
    id: "std-9-10",
    programmeNumber: "02",
    title: "Secondary Board Preparation",
    standards: "Standards 9–10",
    boards: ["GSEB"],
    stream: "Secondary School Board Curriculum",
    subjects: "All subjects except Computer and Sanskrit",
    subjectHighlights: [
      "Mathematics (Standard & Basic Math syllabus)",
      "Science (Physics, Chemistry & Biology fundamentals)",
      "Social Science (History, Civics, Geography & Economics)",
      "English & First Language"
    ],
    features: [
      "Systematic GSEB syllabus pacing with structured revision cycles",
      "Past board question analysis & official blueprint answer structuring",
      "Periodic mock board tests evaluated with strict board marking schemes",
      "Direct 1-on-1 doubt clarification clinics mentored by Saif Sir"
    ],
    batchType: "Evening Batch (4:30 PM – 8:00 PM window)",
    tag: "Crucial Board Phase"
  },
  {
    id: "std-11-12",
    programmeNumber: "03",
    title: "Higher Secondary Commerce",
    standards: "Standards 11–12",
    boards: ["GSEB"],
    stream: "Commerce Stream",
    subjects: "All Commerce subjects covered",
    subjectHighlights: [
      "Elements of Book Keeping & Accountancy",
      "Economics (Micro & Macro Principles)",
      "Organization of Commerce & Management (B.A.)",
      "Elements of Statistics & Commercial Mathematics",
      "English & Commercial Communication"
    ],
    features: [
      "Conceptual depth in double-entry bookkeeping & balance sheet mastery",
      "Numerical practice worksheets and real-world commercial illustrations",
      "Timed section-wise exam simulations strictly mirroring board blueprints",
      "Specialized career foundation guidance from a qualified B.Com & B.Ed mentor"
    ],
    batchType: "Evening Batch (4:30 PM – 8:00 PM window)",
    tag: "Commerce Specialization"
  }
];
