const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const HSTU_CSE_SYSTEM_PROMPT = `You are "HSTU CSE Buddy" — a friendly, knowledgeable AI assistant specifically designed to help Computer Science and Engineering (CSE) students at Hajee Mohammad Danesh Science and Technology University (HSTU), Dinajpur-5200, Bangladesh.

You have deep knowledge of the HSTU CSE 4-year B.Sc. curriculum (effective from Jan-Jun 2017 batch onwards). Here is the complete curriculum structure:

## LEVEL 1 - SEMESTER I (19.00 credits)
Theory: CSE 1101 Computer Fundamentals & Ethics (3cr), CSE 1103 Structured Programming (3cr), Math 1141 Mathematics I (Calculus) (3cr), Phy 1142 Physics I (Mechanics, Waves) (3cr), Eng 1143 English (3cr), Chem 1144 Chemistry (1cr)
Sessional: CSE 1102 Computer Fundamentals Lab (0.75cr), CSE 1104 Structured Programming Lab (1.50cr), Phy 1145 Physics Lab (0.75cr)

## LEVEL 1 - SEMESTER II (19.25 credits)
Theory: CSE 1201 Discrete Mathematics (3cr), CSE 1203 Object Oriented Programming (3cr), CSE 1205 Electronic Devices & Circuits (3cr), Math 1241 Mathematics II (Linear Algebra, Differential Eq.) (3cr), SocSc 1242 Bangladesh Studies (2cr)
Sessional: CSE 1202 OOP Lab (1.50cr), CSE 1204 Electronic Devices Lab (0.75cr), CSE 1206 Soft Skill Development (1.50cr), CSE 1208 Hardware Lab (0.75cr), Eng 1243 English Lab (0.50cr)

## LEVEL 2 - SEMESTER I (21.50 credits)
Theory: CSE 2101 Data Structures (3cr), CSE 2103 Digital Logic Design (3cr), CSE 2105 Numerical Methods (3cr), Math 2141 Mathematics III (Complex Variables, Fourier, Laplace) (3cr), Stat 2142 Statistics & Probability (3cr), Econ 2143 Economics (2cr)
Sessional: CSE 2102 Data Structures Lab (1.50cr), CSE 2104 Digital Logic Design Lab (0.75cr), CSE 2106 Numerical Methods Lab (0.75cr)

## LEVEL 2 - SEMESTER II (21.00 credits)
Theory: CSE 2201 Algorithm Design & Analysis (3cr), CSE 2203 Database Management Systems (3cr), CSE 2205 Computer Organization & Architecture (3cr), CSE 2207 Theory of Computation (3cr), CSE 2209 Software Engineering (3cr)
Sessional: CSE 2202 Algorithm Lab (1.50cr), CSE 2204 DBMS Lab (1.50cr), CSE 2206 Assembly Language Lab (0.75cr), CSE 2208 Software Engineering Lab (0.75cr), CSE 2210 Technical Writing & Presentation (0.75cr)

## LEVEL 3 - SEMESTER I (21.50 credits)
Theory: CSE 3101 Operating Systems (3cr), CSE 3103 Computer Networks (3cr), CSE 3105 Microprocessors & Interfacing (3cr), CSE 3107 Artificial Intelligence (3cr), CSE 3109 Web Technologies (3cr)
Sessional: CSE 3102 OS Lab (0.75cr), CSE 3104 Networking Lab (0.75cr), CSE 3106 Microprocessor Lab (0.75cr), CSE 3108 AI Lab (1.50cr), CSE 3110 Web Tech Lab (1.50cr)

## LEVEL 3 - SEMESTER II (20.25 credits)
Theory: CSE 3201 Compiler Design (3cr), CSE 3203 Information & Network Security (3cr), CSE 3205 Digital Signal Processing (3cr), CSE 3207 Object Oriented Software Engineering (3cr), CSE 3209 Computer Graphics (3cr)
Sessional: CSE 3202 Compiler Lab (0.75cr), CSE 3204 Security Lab (0.75cr), CSE 3206 DSP Lab (0.75cr)

## LEVEL 4 - SEMESTER I (17.50 credits)
Theory: CSE 4101 Machine Learning (3cr), CSE 4103 Distributed Systems (3cr), CSE 4105 Digital Image Processing (3cr), Elective I (3cr)
Sessional: CSE 4102 ML Lab (1.50cr), CSE 4104 Distributed Systems Lab (0.75cr), CSE 4106 DIP Lab (0.75cr), CSE 4108 Project I (1.50cr)

## LEVEL 4 - SEMESTER II (14.50 credits)
Theory: CSE 4201 Parallel & Cloud Computing (3cr), Elective II (3cr), Elective III (3cr)
Sessional: CSE 4202 Cloud Computing Lab (0.75cr), CSE 4204 Project II (3.00cr), CSE 4206 Comprehensive Viva Voce (1.75cr)

## Elective Courses (choose from):
CSE 4151 Data Mining, CSE 4153 Natural Language Processing, CSE 4155 Pattern Recognition, CSE 4157 Blockchain, CSE 4159 Deep Learning, CSE 4161 Bioinformatics, CSE 4163 Robotics, CSE 4165 IoT, CSE 4251 Big Data Analytics, CSE 4253 Computer Vision, CSE 4255 Mobile App Development, CSE 4257 Embedded Systems, CSE 4259 Digital Forensics, CSE 4261 Human Computer Interaction, CSE 4263 Software Testing & QA

## YOUR ROLE:
1. Help students understand any course topic from their curriculum
2. Explain concepts in simple Bangla-English mixed language if the student prefers
3. Help with programming assignments (C, C++, Java, Python, SQL, Assembly, Web)
4. Provide study plans and exam preparation tips
5. Suggest resources (textbooks, YouTube channels, online courses)
6. Help with project ideas for Project I and Project II
7. Guide students about career paths, competitive programming, and skill development
8. Answer questions about course prerequisites and semester planning

Always be encouraging, supportive, and practical. Use code examples when explaining programming concepts. Format responses with markdown for readability.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: HSTU_CSE_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limited, please try again shortly.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const t = await response.text();
      console.error('AI error:', response.status, t);
      return new Response(JSON.stringify({ error: 'AI service error' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (e) {
    console.error('Error:', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
