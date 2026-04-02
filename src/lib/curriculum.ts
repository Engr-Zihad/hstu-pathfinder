export type Course = {
  code: string;
  name: string;
  credits: number;
  type: 'theory' | 'lab';
  difficulty?: 'Easy' | 'Medium' | 'Hard';
};

export type Semester = {
  year: number;
  semester: number;
  label: string;
  courses: Course[];
};

export const SEMESTERS: Semester[] = [
  {
    year: 1, semester: 1, label: "Year 1 — Semester I",
    courses: [
      { code: "CSE 101", name: "Fundamentals of Computer and Computing", credits: 2, type: "theory", difficulty: "Easy" },
      { code: "CSE 103", name: "Discrete Mathematics", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "MAT 101", name: "Mathematics I – Calculus & Coordinate Geometry", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "PHY 103", name: "Physics – Electricity, Magnetism, Optics", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "AIE 105", name: "Basic Mechanical Engineering", credits: 3, type: "theory", difficulty: "Easy" },
      { code: "ENG 101", name: "Communicative English", credits: 2, type: "theory", difficulty: "Easy" },
      { code: "CSE 102", name: "Fundamentals of Computer Sessional", credits: 0.75, type: "lab", difficulty: "Easy" },
      { code: "PHY 104", name: "Physics Sessional", credits: 1.5, type: "lab", difficulty: "Easy" },
      { code: "ENG 102", name: "Communicative English Sessional", credits: 0.75, type: "lab", difficulty: "Easy" },
    ],
  },
  {
    year: 1, semester: 2, label: "Year 1 — Semester II",
    courses: [
      { code: "CSE 151", name: "Structured Programming Language (C)", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 153", name: "Digital Logic Design", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "EEE 155", name: "Introduction to Electrical Engineering", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "MAT 105", name: "Mathematics II – Matrix, ODE, PDE", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "SOC 103", name: "Society and Technology", credits: 2, type: "theory", difficulty: "Easy" },
      { code: "CSE 152", name: "C Programming Sessional", credits: 1.5, type: "lab", difficulty: "Medium" },
      { code: "CSE 154", name: "Digital Logic Design Sessional", credits: 1.5, type: "lab", difficulty: "Medium" },
      { code: "EEE 156", name: "Electrical Engineering Sessional", credits: 0.75, type: "lab", difficulty: "Easy" },
      { code: "AIE 106", name: "Engineering Drawing & AutoCAD Sessional", credits: 1.5, type: "lab", difficulty: "Easy" },
    ],
  },
  {
    year: 2, semester: 1, label: "Year 2 — Semester I",
    courses: [
      { code: "CSE 201", name: "Object Oriented Programming (C++)", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 203", name: "Data Structures", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "CSE 205", name: "Numerical Methods", credits: 2, type: "theory", difficulty: "Medium" },
      { code: "EEE 209", name: "Electronic Devices and Circuits", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "MAT 201", name: "Mathematics III – Vector, Complex Variable", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "STT 227", name: "Statistics & Probability", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 202", name: "OOP (C++) Sessional", credits: 1.5, type: "lab", difficulty: "Medium" },
      { code: "CSE 204", name: "Data Structures Sessional", credits: 1.5, type: "lab", difficulty: "Hard" },
      { code: "CSE 206", name: "Numerical Methods Sessional", credits: 0.75, type: "lab", difficulty: "Easy" },
      { code: "EEE 210", name: "Electronics Sessional", credits: 0.75, type: "lab", difficulty: "Easy" },
    ],
  },
  {
    year: 2, semester: 2, label: "Year 2 — Semester II",
    courses: [
      { code: "CSE 255", name: "Algorithm Analysis and Design", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "CSE 257", name: "Theory of Computation & Concrete Mathematics", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "CSE 259", name: "Computer Architecture & Organization", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "ECE 259", name: "Digital Electronics & Pulse Techniques", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "ACT 205", name: "Financial & Managerial Accounting", credits: 2, type: "theory", difficulty: "Easy" },
      { code: "CSE 252", name: "Application Development Sessional", credits: 1.5, type: "lab", difficulty: "Medium" },
      { code: "CSE 254", name: "OOP (Java) Sessional", credits: 1.5, type: "lab", difficulty: "Medium" },
      { code: "CSE 256", name: "Algorithm Sessional", credits: 1.5, type: "lab", difficulty: "Hard" },
      { code: "CSE 258", name: "Theory of Computation Sessional", credits: 0.75, type: "lab", difficulty: "Medium" },
      { code: "ECE 260", name: "Digital Electronics Sessional", credits: 0.75, type: "lab", difficulty: "Easy" },
    ],
  },
  {
    year: 3, semester: 1, label: "Year 3 — Semester I",
    courses: [
      { code: "CSE 303", name: "Database", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 305", name: "Software Engineering", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 307", name: "Microprocessor & Interfacing", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "ECE 311", name: "Data Communication", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "ECN 305", name: "Economics", credits: 2, type: "theory", difficulty: "Easy" },
      { code: "CSE 302", name: "Software Development Sessional", credits: 1.5, type: "lab", difficulty: "Medium" },
      { code: "CSE 304", name: "Database Sessional", credits: 1.5, type: "lab", difficulty: "Medium" },
      { code: "CSE 308", name: "Microprocessor Sessional", credits: 1.5, type: "lab", difficulty: "Hard" },
    ],
  },
  {
    year: 3, semester: 2, label: "Year 3 — Semester II",
    courses: [
      { code: "CSE 353", name: "Operating System", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "CSE 355", name: "Web Engineering", credits: 2, type: "theory", difficulty: "Medium" },
      { code: "CSE 357", name: "Computer Networks", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "CSE 359", name: "Compiler Design", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "CSE 361", name: "Mathematical Analysis for CS", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "CSE 352", name: "Web & Mobile App Dev Sessional", credits: 1.5, type: "lab", difficulty: "Medium" },
      { code: "CSE 354", name: "OS Sessional", credits: 0.75, type: "lab", difficulty: "Medium" },
      { code: "CSE 356", name: "Web Engineering Sessional", credits: 0.75, type: "lab", difficulty: "Medium" },
      { code: "CSE 358", name: "Networks Sessional", credits: 0.75, type: "lab", difficulty: "Medium" },
      { code: "CSE 360", name: "Compiler Design Sessional", credits: 0.75, type: "lab", difficulty: "Hard" },
    ],
  },
  {
    year: 4, semester: 1, label: "Year 4 — Semester I",
    courses: [
      { code: "CSE 403", name: "Artificial Intelligence", credits: 3, type: "theory", difficulty: "Hard" },
      { code: "CSE 405", name: "Computer Graphics & Image Processing", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 4XX", name: "Option I (Elective)", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 4XX", name: "Option II (Elective)", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 402", name: "Project & Thesis Sessional", credits: 1.5, type: "lab", difficulty: "Hard" },
      { code: "CSE 404", name: "AI Sessional", credits: 0.75, type: "lab", difficulty: "Medium" },
      { code: "CSE 406", name: "Graphics & Image Processing Sessional", credits: 1.5, type: "lab", difficulty: "Medium" },
      { code: "CSE 408", name: "Technical Writing & Presentation", credits: 1.5, type: "lab", difficulty: "Easy" },
    ],
  },
  {
    year: 4, semester: 2, label: "Year 4 — Semester II",
    courses: [
      { code: "CSE 453", name: "Multimedia System & Animation", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 455", name: "Computer Ethics & Cyber Law", credits: 2, type: "theory", difficulty: "Easy" },
      { code: "MGT 405", name: "Industrial Management", credits: 3, type: "theory", difficulty: "Easy" },
      { code: "CSE 4XX", name: "Option III (Elective)", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 4XX", name: "Option IV (Elective)", credits: 3, type: "theory", difficulty: "Medium" },
      { code: "CSE 452", name: "Project & Thesis Sessional", credits: 3, type: "lab", difficulty: "Hard" },
      { code: "CSE 454", name: "Multimedia System Sessional", credits: 0.75, type: "lab", difficulty: "Easy" },
    ],
  },
];

export const YEAR_COLORS: Record<number, string> = {
  1: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
  2: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30',
  3: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  4: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
};

export const YEAR_ACCENT: Record<number, string> = {
  1: 'text-blue-400',
  2: 'text-cyan-400',
  3: 'text-purple-400',
  4: 'text-emerald-400',
};

export const GRADE_POINTS: Record<string, number> = {
  'A+': 4.00, 'A': 3.75, 'A-': 3.50,
  'B+': 3.25, 'B': 3.00, 'B-': 2.75,
  'C+': 2.50, 'C': 2.25, 'D': 2.00, 'F': 0.00,
};
