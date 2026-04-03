export interface Subject {
  code: string;
  name: string;
  credits: number;
  type: 'theory' | 'lab';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  whatYouLearn: string[];
}

export interface Semester {
  id: number;
  year: number;
  label: string;
  subjects: Subject[];
}

export const semesters: Semester[] = [
  {
    id: 1, year: 1, label: 'Year 1, Semester 1',
    subjects: [
      { code: 'CSE 1101', name: 'Introduction to Computer Science', credits: 3, type: 'theory', difficulty: 'Beginner', description: 'Fundamentals of computer science, number systems, logic gates, basic programming concepts.', whatYouLearn: ['Computer organization basics', 'Number systems & conversion', 'Boolean algebra', 'Basic algorithms', 'History of computing', 'Intro to programming logic'] },
      { code: 'MATH 1101', name: 'Differential Calculus & Coordinate Geometry', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Limits, derivatives, coordinate geometry, conic sections.', whatYouLearn: ['Limits & continuity', 'Differentiation rules', 'Applications of derivatives', 'Coordinate geometry', 'Conic sections', 'Maxima & minima'] },
      { code: 'PHY 1101', name: 'Physics I', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Mechanics, waves, thermodynamics fundamentals.', whatYouLearn: ['Newtonian mechanics', 'Wave motion', 'Thermodynamics laws', 'Oscillations', 'Fluid mechanics', 'Heat transfer'] },
      { code: 'ENG 1101', name: 'Communicative English', credits: 3, type: 'theory', difficulty: 'Beginner', description: 'English communication skills for academic and professional contexts.', whatYouLearn: ['Speaking skills', 'Writing techniques', 'Reading comprehension', 'Presentation skills', 'Grammar & vocabulary', 'Academic writing'] },
      { code: 'STAT 1101', name: 'Introduction to Statistics', credits: 3, type: 'theory', difficulty: 'Beginner', description: 'Basic statistics, probability, data analysis.', whatYouLearn: ['Descriptive statistics', 'Probability basics', 'Data visualization', 'Mean, median, mode', 'Standard deviation', 'Correlation'] },
      { code: 'CSE 1102', name: 'Computer Science Lab', credits: 1.5, type: 'lab', difficulty: 'Beginner', description: 'Hands-on practice with basic computing and programming.', whatYouLearn: ['Computer basics', 'Typing practice', 'Basic programming', 'File management'] },
      { code: 'PHY 1102', name: 'Physics Lab', credits: 1.5, type: 'lab', difficulty: 'Beginner', description: 'Practical experiments in physics.', whatYouLearn: ['Lab instruments', 'Experiment techniques', 'Data recording', 'Error analysis'] },
    ],
  },
  {
    id: 2, year: 1, label: 'Year 1, Semester 2',
    subjects: [
      { code: 'CSE 1201', name: 'Structured Programming in C', credits: 3, type: 'theory', difficulty: 'Beginner', description: 'C programming: variables, loops, arrays, functions, pointers, file I/O.', whatYouLearn: ['Variables & data types', 'Control structures', 'Functions & recursion', 'Arrays & strings', 'Pointers & memory', 'File handling'] },
      { code: 'MATH 1201', name: 'Integral Calculus & Differential Equations', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Integration techniques, ODE, applications.', whatYouLearn: ['Integration methods', 'Definite integrals', 'First-order ODE', 'Second-order ODE', 'Applications', 'Series'] },
      { code: 'PHY 1201', name: 'Physics II', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Electromagnetism, optics, modern physics.', whatYouLearn: ['Electrostatics', 'Magnetism', 'EM waves', 'Optics', 'Quantum basics', 'Nuclear physics'] },
      { code: 'CHEM 1201', name: 'Chemistry', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Organic, inorganic, physical chemistry fundamentals.', whatYouLearn: ['Atomic structure', 'Chemical bonding', 'Organic chemistry basics', 'Thermochemistry', 'Electrochemistry', 'Polymer chemistry'] },
      { code: 'ENG 1202', name: 'Technical Writing & Presentation', credits: 3, type: 'theory', difficulty: 'Beginner', description: 'Technical documentation, report writing, presentations.', whatYouLearn: ['Technical reports', 'Documentation', 'Presentation skills', 'Proposal writing', 'Email etiquette', 'CV/Resume writing'] },
      { code: 'CSE 1202', name: 'C Programming Lab', credits: 1.5, type: 'lab', difficulty: 'Beginner', description: 'Hands-on C programming practice.', whatYouLearn: ['Coding in C', 'Debugging', 'Problem solving', 'Program design'] },
      { code: 'CHEM 1202', name: 'Chemistry Lab', credits: 1.5, type: 'lab', difficulty: 'Beginner', description: 'Chemistry experiments and analysis.', whatYouLearn: ['Titration', 'Qualitative analysis', 'Lab safety', 'Report writing'] },
    ],
  },
  {
    id: 3, year: 2, label: 'Year 2, Semester 1',
    subjects: [
      { code: 'CSE 2101', name: 'Object Oriented Programming (Java)', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'OOP concepts using Java: classes, inheritance, polymorphism, interfaces.', whatYouLearn: ['Classes & objects', 'Inheritance', 'Polymorphism', 'Interfaces & abstract classes', 'Exception handling', 'Collections framework'] },
      { code: 'CSE 2103', name: 'Data Structures', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Arrays, linked lists, stacks, queues, trees, graphs, hashing.', whatYouLearn: ['Arrays & linked lists', 'Stacks & queues', 'Trees & BST', 'Graphs', 'Hashing', 'Heap & priority queue'] },
      { code: 'MATH 2101', name: 'Linear Algebra & Matrix Theory', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Vectors, matrices, eigenvalues, linear transformations.', whatYouLearn: ['Vectors & spaces', 'Matrix operations', 'Eigenvalues', 'Linear transformations', 'Determinants', 'Systems of equations'] },
      { code: 'MATH 2103', name: 'Complex Variables & Fourier Series', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Complex analysis, Fourier series and transforms.', whatYouLearn: ['Complex numbers', 'Analytic functions', 'Cauchy theorem', 'Fourier series', 'Laplace transform', 'Residue theory'] },
      { code: 'EEE 2101', name: 'Basic Electronics', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Semiconductors, diodes, transistors, amplifiers, digital circuits.', whatYouLearn: ['Semiconductors', 'Diodes & transistors', 'Amplifier circuits', 'Op-amps', 'Digital basics', 'Power supplies'] },
      { code: 'CSE 2102', name: 'OOP Lab', credits: 1.5, type: 'lab', difficulty: 'Intermediate', description: 'Hands-on Java programming practice.', whatYouLearn: ['Java coding', 'OOP implementation', 'Project design', 'GUI basics'] },
      { code: 'CSE 2104', name: 'Data Structures Lab', credits: 1.5, type: 'lab', difficulty: 'Intermediate', description: 'Implementation of data structures in C/C++.', whatYouLearn: ['DS implementation', 'Algorithm coding', 'Complexity analysis', 'Problem solving'] },
    ],
  },
  {
    id: 4, year: 2, label: 'Year 2, Semester 2',
    subjects: [
      { code: 'CSE 2201', name: 'Algorithms Design & Analysis', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Sorting, searching, greedy, DP, graph algorithms, complexity.', whatYouLearn: ['Sorting algorithms', 'Divide & conquer', 'Greedy algorithms', 'Dynamic programming', 'Graph algorithms', 'NP-completeness'] },
      { code: 'CSE 2203', name: 'Digital Logic Design', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Logic gates, combinational & sequential circuits, flip-flops.', whatYouLearn: ['Boolean algebra', 'Logic gates', 'Combinational circuits', 'Sequential circuits', 'Flip-flops & counters', 'State machines'] },
      { code: 'MATH 2201', name: 'Probability & Statistics', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Probability distributions, hypothesis testing, regression.', whatYouLearn: ['Probability theory', 'Random variables', 'Distributions', 'Hypothesis testing', 'Regression', 'Bayesian probability'] },
      { code: 'EEE 2201', name: 'Basic Electrical Engineering', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Circuit analysis, AC/DC circuits, machines, power systems.', whatYouLearn: ['Circuit laws', 'AC/DC circuits', 'Transformers', 'Electric machines', 'Power systems', 'Measurement'] },
      { code: 'CSE 2205', name: 'Discrete Mathematics', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Sets, relations, functions, graph theory, combinatorics, logic.', whatYouLearn: ['Set theory', 'Relations & functions', 'Propositional logic', 'Graph theory', 'Combinatorics', 'Recurrence relations'] },
      { code: 'CSE 2202', name: 'Algorithms Lab', credits: 1.5, type: 'lab', difficulty: 'Intermediate', description: 'Implementation of algorithms.', whatYouLearn: ['Algorithm implementation', 'Optimization', 'Testing', 'Benchmarking'] },
      { code: 'CSE 2204', name: 'Digital Logic Design Lab', credits: 1.5, type: 'lab', difficulty: 'Intermediate', description: 'Digital circuit design and simulation.', whatYouLearn: ['Circuit design', 'Simulation tools', 'Hardware implementation', 'Testing circuits'] },
    ],
  },
  {
    id: 5, year: 3, label: 'Year 3, Semester 1',
    subjects: [
      { code: 'CSE 3101', name: 'Computer Architecture & Organization', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'CPU design, pipelining, memory hierarchy, I/O systems.', whatYouLearn: ['CPU architecture', 'Pipelining', 'Memory hierarchy', 'Cache design', 'I/O systems', 'Instruction sets'] },
      { code: 'CSE 3103', name: 'Operating Systems', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Process management, memory, file systems, scheduling.', whatYouLearn: ['Process management', 'Thread & concurrency', 'Memory management', 'File systems', 'CPU scheduling', 'Deadlocks'] },
      { code: 'CSE 3105', name: 'Database Management Systems', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Relational model, SQL, normalization, transactions, indexing.', whatYouLearn: ['ER modeling', 'SQL queries', 'Normalization', 'Transactions & ACID', 'Indexing', 'Query optimization'] },
      { code: 'CSE 3107', name: 'Theory of Computation', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Automata, formal languages, Turing machines, computability.', whatYouLearn: ['Finite automata', 'Regular expressions', 'Context-free grammars', 'Pushdown automata', 'Turing machines', 'Decidability'] },
      { code: 'CSE 3109', name: 'Computer Graphics', credits: 3, type: 'theory', difficulty: 'Intermediate', description: '2D/3D graphics, transformations, rendering, OpenGL.', whatYouLearn: ['2D transformations', '3D rendering', 'Clipping algorithms', 'Rasterization', 'Shading models', 'OpenGL basics'] },
      { code: 'CSE 3102', name: 'OS Lab', credits: 1.5, type: 'lab', difficulty: 'Intermediate', description: 'OS concepts implementation.', whatYouLearn: ['Linux commands', 'Shell scripting', 'Process creation', 'Scheduling simulation'] },
      { code: 'CSE 3106', name: 'DBMS Lab', credits: 1.5, type: 'lab', difficulty: 'Intermediate', description: 'Database design and SQL practice.', whatYouLearn: ['SQL queries', 'Database design', 'Stored procedures', 'Triggers'] },
    ],
  },
  {
    id: 6, year: 3, label: 'Year 3, Semester 2',
    subjects: [
      { code: 'CSE 3201', name: 'Computer Networks', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'OSI model, TCP/IP, routing, switching, network protocols.', whatYouLearn: ['OSI & TCP/IP models', 'Data link layer', 'Network layer & routing', 'Transport layer', 'Application protocols', 'Network security'] },
      { code: 'CSE 3203', name: 'Software Engineering & SDLC', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Software process models, requirements, design, testing, agile.', whatYouLearn: ['SDLC models', 'Requirements engineering', 'Design patterns', 'Testing strategies', 'Agile & Scrum', 'UML diagrams'] },
      { code: 'CSE 3205', name: 'Compiler Design', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Lexical analysis, parsing, code generation, optimization.', whatYouLearn: ['Lexical analysis', 'Parsing techniques', 'Syntax trees', 'Semantic analysis', 'Code generation', 'Optimization'] },
      { code: 'CSE 3207', name: 'Microprocessors & Assembly Language', credits: 3, type: 'theory', difficulty: 'Advanced', description: '8086 architecture, assembly programming, interfacing.', whatYouLearn: ['8086 architecture', 'Assembly instructions', 'Memory interfacing', 'I/O programming', 'Interrupts', 'Peripheral devices'] },
      { code: 'CSE 3209', name: 'Numerical Methods', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'Root finding, interpolation, integration, ODE solving.', whatYouLearn: ['Root finding', 'Interpolation', 'Numerical integration', 'ODE solvers', 'Error analysis', 'Matrix methods'] },
      { code: 'CSE 3202', name: 'Networks Lab', credits: 1.5, type: 'lab', difficulty: 'Intermediate', description: 'Network configuration and analysis.', whatYouLearn: ['Network setup', 'Packet analysis', 'Socket programming', 'Wireshark'] },
      { code: 'CSE 3208', name: 'Microprocessors Lab', credits: 1.5, type: 'lab', difficulty: 'Intermediate', description: 'Assembly programming and hardware interfacing.', whatYouLearn: ['Assembly coding', 'Hardware interfacing', 'I/O programming', 'Debugging'] },
    ],
  },
  {
    id: 7, year: 4, label: 'Year 4, Semester 1',
    subjects: [
      { code: 'CSE 4101', name: 'Artificial Intelligence', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Search, knowledge representation, planning, learning agents.', whatYouLearn: ['Search algorithms', 'Knowledge representation', 'Logic & inference', 'Planning', 'Probabilistic reasoning', 'Agent architectures'] },
      { code: 'CSE 4103', name: 'Machine Learning', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Supervised, unsupervised learning, neural networks, evaluation.', whatYouLearn: ['Linear regression', 'Classification (SVM, KNN)', 'Clustering', 'Neural networks', 'Decision trees', 'Model evaluation'] },
      { code: 'CSE 4105', name: 'Information Security & Cryptography', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Encryption, authentication, network security, protocols.', whatYouLearn: ['Symmetric encryption', 'Public key crypto', 'Hash functions', 'Digital signatures', 'Network security', 'Security protocols'] },
      { code: 'CSE 4107', name: 'Web Technologies & Frameworks', credits: 3, type: 'theory', difficulty: 'Intermediate', description: 'HTML5, CSS3, JavaScript, React/Angular, Node.js, REST APIs.', whatYouLearn: ['HTML5 & CSS3', 'JavaScript ES6+', 'React/Angular', 'Node.js', 'REST APIs', 'Database integration'] },
      { code: 'CSE 4109', name: 'Elective I', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Specialized elective course chosen by student.', whatYouLearn: ['Specialized topic', 'Research methodology', 'Advanced concepts', 'Industry applications'] },
      { code: 'CSE 4102', name: 'AI & ML Lab', credits: 1.5, type: 'lab', difficulty: 'Advanced', description: 'AI/ML implementation with Python.', whatYouLearn: ['Python ML', 'Model training', 'Data preprocessing', 'Visualization'] },
      { code: 'CSE 4108', name: 'Web Technologies Lab', credits: 1.5, type: 'lab', difficulty: 'Intermediate', description: 'Full-stack web development practice.', whatYouLearn: ['Frontend development', 'Backend APIs', 'Database integration', 'Deployment'] },
    ],
  },
  {
    id: 8, year: 4, label: 'Year 4, Semester 2',
    subjects: [
      { code: 'CSE 4201', name: 'Project / Thesis', credits: 6, type: 'theory', difficulty: 'Advanced', description: 'Final year research project or thesis work.', whatYouLearn: ['Research methodology', 'Problem formulation', 'Implementation', 'Paper writing', 'Presentation', 'Defense preparation'] },
      { code: 'CSE 4203', name: 'Distributed Systems', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Distributed computing, consensus, fault tolerance.', whatYouLearn: ['Distributed architecture', 'Consensus algorithms', 'Fault tolerance', 'Replication', 'CAP theorem', 'MapReduce'] },
      { code: 'CSE 4205', name: 'Cloud Computing & DevOps', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Cloud services, virtualization, containers, CI/CD.', whatYouLearn: ['Cloud models (IaaS, PaaS, SaaS)', 'Virtualization', 'Docker & Kubernetes', 'CI/CD pipelines', 'AWS/GCP basics', 'Microservices'] },
      { code: 'CSE 4207', name: 'Professional Ethics & Cyber Law', credits: 3, type: 'theory', difficulty: 'Beginner', description: 'IT ethics, cyber crime, intellectual property, privacy laws.', whatYouLearn: ['IT ethics', 'Cyber crimes', 'Intellectual property', 'Privacy laws', 'Professional conduct', 'Bangladesh ICT Act'] },
      { code: 'CSE 4209', name: 'Elective II', credits: 3, type: 'theory', difficulty: 'Advanced', description: 'Second specialized elective course.', whatYouLearn: ['Advanced specialization', 'Research topics', 'Emerging technologies', 'Industry trends'] },
      { code: 'CSE 4202', name: 'Project Lab', credits: 3, type: 'lab', difficulty: 'Advanced', description: 'Project implementation and presentation.', whatYouLearn: ['Project development', 'Team collaboration', 'Documentation', 'Presentation skills'] },
    ],
  },
];

export const totalSubjects = semesters.reduce((acc, s) => acc + s.subjects.length, 0);
export const totalCredits = semesters.reduce((acc, s) => acc + s.subjects.reduce((a, sub) => a + sub.credits, 0), 0);
