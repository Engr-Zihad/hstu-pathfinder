export interface Teacher {
  id: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  role: string;
  research?: string;
  profileUrl: string;
}

export const teachers: Teacher[] = [
  { id: 1, name: "Dr. Md. Abdulla Al Mamun", designation: "Professor & Chairman", email: "mamun@hstu.ac.bd", phone: "+8801886890345", role: "chairman", profileUrl: "https://hstu.ac.bd/teacher/mamun" },
  { id: 2, name: "Dr. Md. Delowar Hossain", designation: "Professor & Dean", email: "delowar.cit@gmail.com", phone: "+8801712262634", role: "dean", profileUrl: "https://hstu.ac.bd/teacher/delowar" },
  { id: 3, name: "Adiba Mahjabin Nitu", designation: "Professor", email: "nitu.hstu@gmail.com", phone: "+8801716407820", role: "professor", profileUrl: "https://hstu.ac.bd/teacher/nitu" },
  { id: 4, name: "Dr. Ashis Kumar Mandal", designation: "Professor", email: "ashis@hstu.ac.bd", phone: "+8801912136021", role: "professor", research: "Quantum ML & Software Engineering", profileUrl: "https://hstu.ac.bd/teacher/ashis" },
  { id: 5, name: "Dr. Md. Arshad Ali", designation: "Professor", email: "arshad@hstu.ac.bd", phone: "+8801794193646", role: "professor", profileUrl: "https://hstu.ac.bd/teacher/arshad" },
  { id: 6, name: "Md. Fazle Rabbi", designation: "Professor", email: "rabbi@hstu.ac.bd", phone: "+8801717012945", role: "professor", profileUrl: "https://hstu.ac.bd/teacher/rabbi" },
  { id: 7, name: "Dr. Masud Ibn Afjal", designation: "Professor", email: "masud@hstu.ac.bd", phone: "+8801737049633", role: "professor", profileUrl: "https://hstu.ac.bd/teacher/masud" },
  { id: 8, name: "Hasi Saha", designation: "Professor", email: "hasi@hstu.ac.bd", phone: "+8801719042157", role: "professor", profileUrl: "https://hstu.ac.bd/teacher/hasi" },
  { id: 9, name: "Dr. Md. Palash Uddin", designation: "Associate Professor", email: "palash_cse@hstu.ac.bd", phone: "+8801722841941", role: "faculty", profileUrl: "https://hstu.ac.bd/teacher/palash_cse" },
  { id: 10, name: "Md. Rashedul Islam", designation: "Associate Professor", email: "rashedul_cse@hstu.ac.bd", phone: "+8801737334004", role: "faculty", profileUrl: "https://hstu.ac.bd/teacher/rashedul_cse" },
  { id: 11, name: "Md. Nahid Sultan", designation: "Associate Professor", email: "nahid.sultan@hstu.ac.bd", phone: "+8801722692111", role: "faculty", profileUrl: "https://hstu.ac.bd/teacher/nahid.sultan" },
  { id: 12, name: "Md. Sohrawordi", designation: "Associate Professor", email: "mdsohrawordi@hstu.ac.bd", phone: "+8801722980888", role: "faculty", profileUrl: "https://hstu.ac.bd/teacher/mdsohrawordi" },
  { id: 13, name: "Dr. Md. Nadim", designation: "Associate Professor", email: "mnadims.cse@gmail.com", phone: "+8801792550756", role: "faculty", research: "Quantum ML & Software Engineering", profileUrl: "https://hstu.ac.bd/teacher/nadim" },
  { id: 14, name: "Emran Ali", designation: "Assistant Professor", email: "emran.cse@hstu.ac.bd", phone: "", role: "faculty", profileUrl: "https://hstu.ac.bd/teacher/emran.cse" },
  { id: 15, name: "U.A. Md. Ehsan Ali", designation: "Assistant Professor", email: "ehsan_cse@hstu.ac.bd", phone: "+8801710488079", role: "faculty", profileUrl: "https://hstu.ac.bd/teacher/ehsan_cse" },
  { id: 16, name: "Md. Shajalal", designation: "Assistant Professor", email: "shajalal@hstu.ac.bd", phone: "+8801725359628", role: "faculty", profileUrl: "https://hstu.ac.bd/teacher/shajalal" },
  { id: 17, name: "Md. Abu Marjan", designation: "Assistant Professor", email: "marjan@hstu.ac.bd", phone: "+8801723791394", role: "faculty", profileUrl: "https://hstu.ac.bd/teacher/marjan" },
  { id: 18, name: "Sumya Akter", designation: "Assistant Professor", email: "sumya.hstu@gmail.com", phone: "+8801763226821", role: "faculty", profileUrl: "https://hstu.ac.bd/teacher/sumya" },
  { id: 19, name: "Pankaj Bhowmik", designation: "Lecturer", email: "pankaj.cshstu@gmail.com", phone: "+8801791848439", role: "lecturer", profileUrl: "https://hstu.ac.bd/teacher/pankaj" },
  { id: 20, name: "Md. Tazel Hossan", designation: "Lecturer", email: "tazel.cse@tch.hstu.ac.bd", phone: "+8801750587623", role: "lecturer", profileUrl: "https://hstu.ac.bd/teacher/tazel" },
];
