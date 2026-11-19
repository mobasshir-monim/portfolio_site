import { Facebook, Linkedin, Youtube, Instagram, Mail } from "lucide-react";
import { NavItem, SkillCategory, SocialLink, HighlightItem, ResumeItem, AchievementItem, ProjectItem, CertificateItem, AcademicPublication } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Youtube", href: "/youtube-feed" },
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
  // { label: "Publications", href: "#publications" }, // TODO: Uncomment for future publishing scope
  { label: "Certificates", href: "#certificates" },
  { label: "About Me", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming & Scripting",
    skills: ["Python", "MATLAB", "SQL", "C", "C++", "JavaScript", "Kotlin"]
  },
  {
    title: "Data Analysis & ML",
    skills: ["Pandas", "NumPy", "TensorFlow", "Scikit-learn", "Keras"]
  },
  {
    title: "Data Handling",
    skills: ["Excel", "Google Sheets", "Power Bi"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Jupyter", "Git", "Anaconda","Linux Bash"]
  },
  {
    title: "Simulation",
    skills: ["SolidWorks", "Ansys", "AutoCAD"]
  },
  {
    title: "Graphics",
    skills: ["Adobe Premiere Pro", "Adobe After Effects", "Adobe Illustrator", "Photoshop", "Canva"]
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Facebook", url: "https://www.facebook.com/naiem.mobasshir.monim/", icon: Facebook },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/mobasshirmonim/", icon: Linkedin },
  { platform: "YouTube", url: "https://www.youtube.com/@monim10954", icon: Youtube },
  { platform: "Instagram", url: "https://www.instagram.com/naiem_m_square/", icon: Instagram },
  { platform: "Email", url: "mailto:naiemmobasshir10954@gmail.com", icon: Mail },
];

export const HIGHLIGHTS: HighlightItem[] = [
  {
    id: 13,
    image: "/bizmaestros.webp",
    title: "Bizmaestros x UFLP Grand Final: Top 3 in Supply Chain",
    description: "Presenting at the Grand Final of Bizmaestros 2026 x Unilever Future Leaders Programme, finishing among the top 3 nationwide in the supply chain track."
  },
  {
    id: 14,
    image: "/cleantech_award.webp",
    title: "National Cleantech Award Winner on circular entrepreneurship by UNIDO",
    description: "2nd prize (BDT 3,50,000) at the National Cleantech Award Ceremony, Innovation Showcase on Circular Entrepreneurship, organised under UNIDO's sustainable plastics initiative."
  },
  {
    id: 15,
    image: "/thesis_defense.webp",
    title: "Thesis Defense",
    description: "Defending my undergraduate thesis at the Department of Mechanical Engineering, BUET."
  },
  {
    id: 1,
    image: "/OCB.webp",
    title: "Champion of Orange Corners Bangladesh Ideation Challenge 5.0",
    description: "Receiving recognition for being startup ideation challenge winner with MycoMatters."
  },
  {
    id: 2,
    image: "/edctalk.webp",
    title: "EDC Talk Season 2",
    description: "With CEO and Founder of ACS Numeri Sattar Apar"
  },
  {
    id: 12,
    image: "/best_presenter.webp",
    title: "Best Presenter Award at IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence and Networking (QPAIN) 2026",
    description: "Received the Best Presenter Award for the paper at QPAIN 2026."
  },
  {
    id: 4,
    image: "/cohort.webp",
    title: "Champion of Cohort 5 of University Innovation Hub Program",
    description: "Won pre-seed funding and mentorship for MycoMatters from UIHP organised by Research and Innovation Centre for Science and Engineering (RISE-BUET) and Bangladesh Hi-Tech Park Authority and ICT Division."
  },
  {
    id: 5,
    image: "/intp.webp",
    title: "Taking session on video production, editing and motion graphics",
    description: "At Team Interplanetar's Workshop \"Inside Interplanetar\""
  },
  {
    id: 3,
    image: "/treasurehunt.webp",
    title: "Winning Treasure Hunt of ME FEST 2023 and 2024",
    description: "Celebrating teamwork and brainpower."
  },
  {
    id: 6,
    image: "/pvm.webp",
    title: "Appreciation from Perfetti Van Melle Bangladesh",
    description: "For outstanding performance as Elevate Campus Ambassador"
  },
  {
    id: 7,
    image: "/pres.webp",
    title: "Poster Presentation about Automation and Robotics in Industries.",
    description: "At BUET Mechanical Engineering Fest 2023"
  },
  {
    id: 8,
    image: "/drama.webp",
    title: "Performing at Mecha Fest 2024",
    description: "Was the lead actor in a drama performance organized by BUET Mechanical Engineering Department"
  },
  {
    id: 9,
    image: "/drama2.webp",
    title: "Performing Drama on Mecha Fest 2023",
    description: "Acted as one of the main characters in a drama organized by BUET Mechanical Engineering Department"
  },
  {
    id: 10,
    image: "/pres2.webp",
    title: "Pitching on MycoMatters",
    description: "At Orange Corners Bangladesh Ideation Challenge 5.0 Final Round"
  },
  {
    id: 11,
    image: "/intern.webp",
    title: "Internship at Synovia Pharmaceuticals PLC",
    description: "Gained hands-on experience in pharmaceutical manufacturing and quality control."
  } 
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "Visual-Vocal: A Voice Controller Robotic Hand for Real-Time Sign Language Communication",
    image: "/visual-vocal.webp",
    bio: "Visual Vocal” is a project that explores the design and development of a robotic hand, capable of translating spoken language into real-time sign language gestures. It aims to perform sign language gestures based on speech input.",
    details: `Speech Recognition:
– Utilizes Vosk machine learning model for speech-to-text conversion.
– Model fine-tuned with custom dataset for accurate recognition of sign language commands.
– Real-time transcription processes 8-second audio chunks for efficient operation.

MediaPipe and ASL Dataset Creation:
– MediaPipe tracks hand and upper body key points (fingertips, wrists, elbows) for ASL sign recognition.
– Data includes 3D coordinates of key points and finger states (bent, half-bent, or straight).
– Digital dataset links landmark data to specific ASL words.

Finger Spelling:
– For unrecognized words, the system uses finger-spelling to spell out letters in ASL.

Servo Control and Sign Execution:
– Inverse kinematics algorithm maps 3D landmark data to servo motor commands.
– Arduino Uno sends commands to servos to replicate hand gestures.

AI Integration:
– Combines speech recognition (Vosk) and computer vision (MediaPipe) for seamless translation of spoken language into ASL gestures.`,
    tags: ["Deep Learning", "Natural Language Processing", "Image Classification", "Robotics", "SolidWorks", "Python"]
  },
  {
    id: 2,
    title: "Time-Series Analysis with RNNs and LSTMs for Thermal Performance Monitoring of a Shell and Helically Coiled Heat Exchanger",
    image: "/heat-exchanger.webp",
    bio: "This project focuses on designing an improved shell and helically coiled heat exchanger (HX) and leveraging machine learning (ML) and deep learning (DL) techniques, particularly Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) networks, to monitor and analyze its thermal performance over time.",
    details: `Objectives:
– Design and optimize a shell and helically coiled heat exchanger to enhance thermal performance.
– Collect and preprocess time-series data related to temperature variations, heat transfer rates, and fluid dynamics.
– Develop predictive models using RNNs and LSTMs to monitor and forecast the thermal behavior of the heat exchanger.
– Compare the performance of ML/DL-based predictions with traditional analytical and numerical methods.

Methodology:
1. Heat Exchanger Design:
– Designed an improved shell and helically coiled tube heat exchanger with optimized geometrical and material properties to enhance heat transfer efficiency.
– Conducted simulations and theoretical calculations to establish baseline performance metrics.

2. Data Collection & Preprocessing:
– Gathered time-series data from experimental and/or simulated performance evaluations.
– Processed and normalized data to ensure consistency and accuracy for ML/DL applications.

3. Machine Learning & Deep Learning Implementation:
– Developed RNN and LSTM-based models to analyze historical temperature and performance data.
– Trained the models using collected time-series data to predict future thermal behavior under varying operational conditions.
– Evaluated model accuracy using metrics such as Mean Squared Error (MSE) and Root Mean Squared Error (RMSE).

4. Performance Comparison & Validation:
– Compared ML/DL predictions with conventional thermodynamic models and Computational Fluid Dynamics (CFD) results.
– Conducted error analysis to refine predictive capabilities and improve model robustness.

Results & Findings:
– The improved heat exchanger design demonstrated enhanced thermal efficiency compared to conventional designs.
– LSTM models outperformed standard RNNs in capturing long-term dependencies and trends in heat transfer dynamics.
– The ML/DL-based approach provided reliable real-time predictions, aiding in proactive thermal management and efficiency optimization.

Conclusion:
This project successfully integrated advanced machine learning techniques with heat exchanger design to develop a predictive framework for monitoring thermal performance. The application of RNNs and LSTMs proved effective in time-series forecasting, offering a data-driven approach for optimizing heat exchanger operations. Future work can explore hybrid AI models and real-time deployment in industrial settings.`,
    tags: ["Ansys", "SolidWorks", "Python", "Machine Learning", "Deep Learning"]
  },
  {
    id: 3,
    title: "PROCHESTA V1.0 | V2.0 | V3.0",
    image: "/rover.webp",
    bio: "A new generation of rover with the most advanced navigation and communication system and most sophisticated till date science tool for collecting and testing soil designed, simulated and manufactured using advanced Physx Particle simulator.",
    tags: ["ROS", "Python", "Websockets", "Automation"],
    details: ``
  },
  {
    id: 4,
    title: "Real-Time 3D Face Generation in Blender Using MediaPipe",
    image: "/project4.webp",
    bio: "This project focused on real-time face generation in Blender using MediaPipe, a powerful framework for facial landmark detection. By leveraging real-time facial tracking, the system allowed for dynamic and responsive 3D face modeling directly within Blender.",
    details: `Objectives:
– Utilize MediaPipe to detect facial landmarks in real-time.
– Generate and manipulate a 3D face mesh in Blender based on detected features.
– Optimize performance to achieve smooth real-time rendering.

Methodology:
1. Facial Landmark Detection:
– Used MediaPipe’s Face Mesh model to extract key facial points from a real-time video feed.
– Processed the landmarks to create a structured 3D point cloud.

2. 3D Face Model Generation:
– Mapped the extracted facial landmarks onto a 3D mesh in Blender using Python scripting.
– Applied procedural adjustments to refine the facial structure.

3. Real-Time Integration:
– Linked the MediaPipe facial tracking system with Blender for live updates.
– Optimized rendering speed to ensure smooth real-time visualization.

Results & Findings:
– Successfully implemented a real-time 3D face model in Blender using MediaPipe.
– Achieved smooth and accurate facial landmark mapping for realistic results.
– Performance optimizations enabled fluid real-time interaction.

Conclusion:
This project demonstrated a practical approach to real-time 3D face generation using MediaPipe and Blender. Future improvements could include full-body implementation, enhanced texture mapping, and AI-driven facial expression synthesis.`,
    tags: ["Blender", "Python", "Websockets", "Automation"]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 1,
    title: "Champion of Orange Corners Bangladesh Ideation Challenge 5.0",
    issuer: "Orange Corners Bangladesh",
    date: "2025",
    category: "Awards",
    image: "/OCB.webp"
  },
  {
    id: 2,
    title: "Software Engineer at European Rover Challenge 2023",
    issuer: "European Space Foundation",
    date: "2023",
    category: "Awards",
    image: "/ERC.webp"
  },
  {
    id: 3,
    title: "Convolutional Neural Networks in TensorFlow",
    issuer: "DeepLearning.AI",
    date: "2024",
    category: "Machine Learning",
    image: "/CNN.webp"
  },
  {
    id: 4,
    title: "Tools for Data Science",
    issuer: "IBM",
    date: "2023",
    category: "Data Science",
    image: "/tools-for-data-science.webp"
  },
  {
    id: 5,
    title: "MATLAB Onramp",
    issuer: "MathWorks",
    date: "2023",
    category: "Matlab",
    image: "/matlab1.webp"
  },
  {
    id: 6,
    title: "University Rover Challenge 2023",
    issuer: "The Mars Society",
    date: "2023",
    category: "Awards",
    image: "/URC.webp"
  },
  {
    id: 7,
    title: "International Rover Design Challenge 2023",
    issuer: "Space Robotics Society",
    date: "2023",
    category: "Awards",
    image: "/irdc.webp"
  },
  {
    id: 8,
    title: "Data Science Methodology",
    issuer: "IBM",
    date: "2023",
    category: "Data Science",
    image: "/data-science-methodology.webp"
  },
  {
    id: 9,
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Coursera (Stanford)",
    date: "2023",
    category: "Machine Learning",
    image: "/Supervised_learning.webp"
  },
  {
    id: 10,
    title: "Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning",
    issuer: "Coursera (Stanford)",
    date: "2023",
    category: "Machine Learning",
    image: "/intrototf.webp"
  },
  {
    id: 11,
    title: "What is Data Science?",
    issuer: "IBM",
    date: "2023",
    category: "Machine Learning",
    image: "/what-is-data-science.webp"
  },
  {
    id: 12,
    title: "Introduction to MATLAB Programming",
    issuer: "Coursera (Vanderbilt University)",
    date: "2023",
    category: "Matlab",
    image: "/matlab.webp"
  },
  {
    id: 13,
    title: "SQL for Data Science",
    issuer: "Coursera (University of California, Davis)",
    date: "2023",
    category: "Data Science",
    image: "/SQL.webp"
  },
  {
    id: 14,
    title: "Signal Processing Onramp",
    issuer: "MathWorks",
    date: "2023",
    category: "Matlab",
    image: "/signal.webp"
  },
  {
    id: 15,
    title: "HerWILL AI and Data Science Education Program",
    issuer: "HerWILL",
    date: "2024",
    category: "Machine Learning",
    image: "/herwill.webp"
  },
  {
    id: 16,
    title: "Solving Nonlinear Systems of Equations in MATLAB",
    issuer: "MathWorks",
    date: "2024",
    category: "Matlab",
    image: "/matlab3.webp"
  },
  {
    id: 17,
    title: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    date: "2023",
    category: ["Data Science", "Programming"],
    image: "/Sqlbasic.webp"
  },
  {
    id: 18,
    title: "SQL (Intermediate) Certificate",
    issuer: "HackerRank",
    date: "2023",
    category: ["Data Science", "Programming"],
    image: "/Sqlinter.webp"
  },
  {
    id: 19,
    title: "JavaScript (Basic) Certificate",
    issuer: "HackerRank",
    date: "2023",
    category: "Programming",
    image: "/JS.webp"
  },
  {
    id: 20,
    title: "Champion of Idea Presentation Sector in Bangladesh Youth Climate Sustainability and Innovation Summit",
    issuer: "Youth Messengers Bangladesh",
    date: "2025",
    category: ["Awards", "Entrepreneurship"],
    image: "/mycoidea.webp"
  },
  {
    id: 21,
    title: "Elevate Campus Ambassador",
    issuer: "perfetti van melle",
    date: "2025",
    category: "Leadership",
    image: "/elevate.webp"
  },
];

export const ABOUT_ME_CONTENT = {
  intro: "Hi there! I’m Md Naiem Mobasshir Monim, a mechanical engineer with an insatiable curiosity for the deep and intricate workings of the world. From exploring the complexities of robotics and machine learning to crafting compelling stories through video content and artistic expression, my journey has been anything but conventional.",
  sections: [
    {
      title: "A Passion for Science, Engineering, and Innovation",
      content: "I thrive at the intersection of engineering, technology, and environmental sustainability. My work spans across various fields—from conducting ANSYS simulations on mechanical systems to researching smart meter data for better energy management. I’ve also delved into the realm of thermal sciences, working on heat exchanger projects that push the boundaries of efficiency. My current interest in developing a Peltier-based fridge exemplifies my drive to create energy-efficient and sustainable solutions."
    },
    {
      title: "A Storyteller at Heart",
      content: "Beyond the technical world, I create YouTube videos dissecting complex topics—from the environmental impact of electric cars to the economic resurgence of nations post-political upheaval. Whether it’s breaking down Israel’s air defense system or debunking myths about time as the fourth dimension, I strive to make advanced concepts accessible and thought-provoking."
    },
    {
      title: "Bringing Innovation to Life",
      content: "As an entrepreneur, I’ve ventured into the world of biotechnology, aiming to revolutionize packaging with MycoMatters—a company focused on mycelium-based alternatives to polystyrene. This aligns with my broader mission of reducing environmental harm through scientific ingenuity."
    },
    {
      title: "Hands-On Learning and Knowledge Sharing",
      content: "I believe in lifelong learning, which is why I continually expand my skill set through courses like Advanced Learning Algorithms and Sequences, Time Series, and Prediction. My hands-on experience in industrial training at Synovia Pharma has also given me insights into real-world applications of engineering principles. Additionally, I share my expertise through workshops—most recently on Blender basics—and I’m developing a beginner-friendly but practical course on Premiere Pro video editing."
    },
    {
      title: "Exploring the World Through Different Lenses",
      content: "My interests go beyond academia and industry. As a fan of immersive fandom games like The Witcher and God of War, I appreciate the blend of storytelling and world-building. I also engage in deep philosophical discussions, such as my upcoming podcast, ‘Islam in the Eyes of Gen-Z,’ where I explore the challenges of practicing faith in a demanding academic and professional environment."
    },
    {
      title: "What’s Next?",
      content: "Currently, I’m developing my portfolio website using WordPress and XAMPP, creating a digital hub for my work and projects. I’m also working on an acoustic-based 3D mapping project that combines real-time visualization with deep learning. This space will be a reflection of everything I am—an engineer, researcher, storyteller, entrepreneur, and lifelong learner. Stay tuned as I continue to push boundaries and share my journey with you! Welcome aboard!"
    }
  ]
};

export const HERO_TEXT = {
  greeting: "Hi!",
  headline: "An Engineer, A Youtuber & A Learner",
  bio: "I'm Md Naiem Mobasshir Monim, a mechanical engineer with an insatiable curiosity for the deep and intricate workings of the world. From exploring the complexities of robotics and machine learning to crafting compelling stories through video content and artistic expression, my journey has been anything but conventional.",
  subBio: "B.Sc. in Mechanical Engineering, BUET"
};

export const RESUME_EDUCATION: ResumeItem[] = [
  {
    title: "Bachelor of Science in Mechanical Engineering",
    organization: "Bangladesh University of Engineering and Technology (BUET)",
    date: "Jan 2022 – June 2026",
    points: [
      "Industrial training at Synovia Pharmaceuticals PLC",
      "Undergraduate thesis under Prof. Dr. Mohammad Mamun"
    ]
  },
  {
    title: "Higher Secondary Certificate (HSC)",
    organization: "Rajshahi College",
    date: "2020",
    points: [
      "GPA 5.00 with Board Scholarship"
    ]
  },
  {
    title: "Secondary School Certificate (SSC)",
    organization: "Rajshahi Collegiate School",
    date: "2018",
    points: [
      "GPA 5.00/5.00"
    ]
  }
];

export const RESUME_LEADERSHIP: ResumeItem[] = [
  {
    title: "President",
    organization: "BUET Entrepreneurship Development Club",
    date: "July 2025 – June 2026",
    points: [
      "Spearheaded the university's largest “Entrepreneurs Summit”, hosting 50+ stalls for student startups and corporate entities.",
      "Orchestrated 7 flagship events reaching a cumulative audience of 100,000+ across online and offline platforms.",
      "Secured partnerships with 100+ sponsors and managed a total financial portfolio of over 50 Lakh BDT.",
      "Rose through the ranks from Secretary to President, nurturing 7+ startups and directing creative branding strategies."
    ]
  },
  {
    title: "Campus Spark",
    organization: "Unilever Bangladesh",
    date: "July 2025 – June 2026",
    points: [
      "Led brand engagement on campus, increasing participation in UFLP and case competitions.",
      "Coordinated club collaborations and reported student insights to support recruitment and marketing strategies."
    ]
  },
  {
    title: "General Secretary",
    organization: "BUET Animata – Animation & VFX Club",
    date: "Oct 2025 – June 2026",
    points: [
      "Served as Founding Assistant General Secretary; organized workshops on basic animation and 3D modeling.",
      "Designed and animated the official club logo and visual assets."
    ]
  },
  {
    title: "Association Representative",
    organization: "Mechanical Engineering Association, BUET",
    date: "Aug 2025 – June 2026",
    points: [
      "Organized ME FEST 2026, ME FEST 2024, ME FEST 2023 and ME Reception 2023, catering to a total of 20,000+ participants."
    ]
  },
  {
    title: "Co-Leader | Animation Lead, Software Sub-team",
    organization: "Team Interplanetar-A (BUET Mars Rover Team)",
    date: "July 2024 – June 2025",
    points: [
      "Contributed to rover communication and perception systems for ERC 2023/2024, ARC 2023/2024 and URC 2023.",
      "Animated and simulated rover performance for ERC 2023–2025 and IRDC 2023–2024."
    ]
  },
  {
    title: "Campus Lead",
    organization: "Grameenphone",
    date: "April 2024 – Mar 2025",
    points: [
      "Organized flagship events (Platform SHE roadshow, Next Business Leader) at BUET, aligning club activities with corporate culture.",
      "Facilitated exposure for 500+ students to Grameenphone's professional ecosystem and events."
    ]
  },
  {
    title: "Campus Ambassador",
    organization: "Perfetti Van Melle Bangladesh",
    date: "April 2024 – Mar 2025",
    points: [
      "Bridged PVM marketing initiatives with BUET campus activities to enhance brand visibility."
    ]
  }
];

export const RESUME_EXPERIENCE: ResumeItem[] = [
  {
    title: "Industrial Trainee",
    organization: "Synovia Pharmaceuticals PLC",
    date: "March 2025 – April 2025",
    points: [
      "Analyzed 8M+ kWh of energy consumption data; identified a 5.1% YoY increase and 46% cost rise, and recommended solar adoption and heat recovery systems.",
      "Proposed IoT sensors for predictive maintenance on pharma machinery, estimating a 15–20% reduction in downtime via real-time monitoring.",
      "Recommended AI-driven quality control for packaging and LIMS integration, projecting 30–40% better defect detection and improved traceability across 1000+ test batches/year.",
      "Evaluated HVAC and cleanroom data (temperature, humidity, particle count) across 20+ zones; tuned parameters to maintain >98% GMP compliance and cut deviation incidents by 15%.",
      "Studied procurement and inventory in Oracle ERP across 5000+ SKUs; flagged opportunities for data-driven forecasting and supply chain optimization.",
      "Collaborated with 5+ cross-functional teams (engineering, QA, procurement, utilities, IT) on optimizations in water treatment, energy and production efficiency."
    ]
  }
];

export const RESUME_ACHIEVEMENTS_LEADERSHIP: AchievementItem[] = [
  { text: "Finalist of Bizmaestros x UFLP 2026 and Top 3 in Supply Chain" },
  { text: "Winner of the Cleantech Innovation Award and grant, organized by UNIDO, the Government of the People's Republic of Bangladesh and the Embassy of Norway" },
  { text: "Champion of Orange Corners BD Ideation Challenge 5.0 with Team MycoMatters" },
  { text: "Champion of Cohort 5 of the University Innovation Hub Program (UIHP) at RISE, BUET, organized by Bangladesh Hi-Tech Park Authority and ICT Division" },
  { text: "Secured a 70% scholarship at the ISCEA Prize Global Case Competition 2025" },
  { text: "Finalist of HULT Prize BUET 2026" },
  { text: "Champion of the Idea Presentation segment at Bangladesh Youth Climate Sustainability and Innovation Summit" },
  { text: "Semifinalist of HULT Prize BUET 2024" },
  { text: "Selected for the second cohort of the University Hub Program 2024 at RISE, BUET" },
  { text: "Runners-up of the Video Essay Challenge – BUET Brainiacs" },
  { text: "Selected for the Sustain Launch Labs Cohort" }
];

export const RESUME_ACHIEVEMENTS_ROVER: AchievementItem[] = [
  { text: "1st Place – Anatolian Rover Challenge 2023 (Preliminary Round)" },
  { text: "2nd Place – Anatolian Rover Challenge 2024 (Preliminary Round)" },
  { text: "13th – European Rover Challenge 2023 (Remote Edition)" },
  { text: "15th – International Rover Design Challenge 2023" },
  { text: "27th – University Rover Challenge 2023" }
];

export const RESUME_TECHNICAL_SKILLS: string[] = [
  "Python",
  "MATLAB",
  "SQL",
  "C / C++",
  "JavaScript",
  "Kotlin",
  "Pandas",
  "NumPy",
  "scikit-learn",
  "TensorFlow",
  "Keras",
  "Matplotlib",
  "Excel",
  "Google Sheets",
  "Jupyter",
  "Google Colab",
  "Git",
  "Anaconda",
  "SolidWorks",
  "ANSYS",
  "Simulink",
  "AutoCAD",
  "LaTeX",
  "Bash / Linux",
  "Adobe After Effects",
  "Adobe Premiere Pro",
  "Blender",
  "Audacity",
  "Illustrator",
  "Photoshop",
  "Canva"
];

export const RESUME_SOFT_SKILLS: string[] = [
  "Communication",
  "Leadership",
  "Research",
  "Teaching",
  "Critical Thinking",
  "Management",
  "Networking",
  "Teamwork"
];

export const ACADEMIC_PUBLICATIONS: AcademicPublication[] = [
  {
    id: 1,
    title: "Assistive Communication via AI-Driven Real-Time BdSL Gesture Generation on a Robotic Hand Platform",
    authors: ["Md Naiem Mobasshir Monim", "Zul Ikram Musaddik Rayat", "Sakib Javed"],
    venue: "IEEE International Conference on Telecommunications and Photonics 2025",
    date: "2025",
    type: "Conference",
    abstract: "Bangladeshi Sign Language (BdSL) is the primary mode of communication for the deaf and hard-of-hearing community in Bangladesh. However, the lack of widespread proficiency in BdSL among the hearing population creates a significant communication gap, limiting accessibility to education, healthcare and public services. Real-time BdSL translation systems can bridge this gap, enabling seamless interaction between sign language users and non-signers. This paper presents a real-time BdSL translation framework that converts spoken Bangla into corresponding sign gestures using a 3D-printed robotic hand. The proposed system integrates the BanglaSpeech2Text model for speech-to-text transcription, MediaPipe-based hand landmark detection, and a Multilayer Perceptron (MLP) classifier for gesture classification. Recognized gestures are mapped to a calibrated servo configuration dataset, enabling precise control of six actuators (five fingers and a wrist) for accurate sign reproduction. Experimental evaluation on a preprocessed BdSL dataset achieved a test accuracy of 91.11\%, with balanced precision, recall, and F1-scores, and perfect recall for visually distinct gestures. The prototype demonstrated very low end-to-end latency, ensuring natural conversational flow. This AI-embedded assistive robotic platform demonstrates the potential for smart accessibility technologies and Industry 4.0-aligned inclusive automation.",
    keywords: ["Bangladeshi Sign Language (BdSL)", "AI", "ML", "MediaPipe", "Multilayer Perceptron (MLP)", "Speech-to-Text", "Human–Robot Communication", "Assistive Robotics", "Real-Time Systems", "AI-embedded system", "Industry 4.0"],
    doiUrl: "#"
  },
  {
    id: 2,
    title: "Inverse Navier-Stokes Field Reconstruction of High-Reynolds Urban Flows via Hard-Constraint Physics-Informed Neural Networks with Curriculum Learning",
    authors: ["Md Naiem Mobasshir Monim", "Zul Ikram Musaddik Rayat", "Prof. M. Mamun"],
    venue: "IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence and Networking (QPAIN) 2026",
    date: "2026",
    type: "Conference",
    abstract: "Reconstructing physically consistent flow fields from sparse, indirect observations is a fundamental challenge in scientific machine learning. In urban environments, wind velocity measurements are scarce, whereas low-cost scalar pollutant sensors are increasingly ubiquitous. This paper presents a physics-informed deep learning framework that reconstructs full wind velocity fields using only sparse scalar concentration measurements, effectively converting pollution sensors into virtual velocity sensors. The framework introduces two key architectural innovations: (i) hard enforcement of boundary conditions via a distance-function ansatz, which embeds no-slip constraints directly into the network to eliminate boundary leakage; and (ii) a Reynolds number curriculum learning strategy (homotopy continuation) that mitigates spectral bias and stabilizes optimization in convection-dominated regimes. Without relying on explicit turbulence models, the approach captures dominant flow structures using a geometry-governed Effective Reynolds number formulation. Validation against the CODASC wind tunnel benchmark demonstrates accurate reconstruction of the primary vortex topology and leeward pollutant accumulation, confirming the method's robust generalization to real physical systems.",
    keywords: ["Physics-Informed Neural Networks (PINNs)","Computational Fluid Dynamics","Optimization Techniques","Neural Network Architectures","Boundary Condition Enforcement","Inverse Problems","Urban Airflow Modeling","Sparse and Indirect Observations","Curriculum Learning","Hard Boundary Constraints","Representation Learning","Reynolds Number Homotopy","Spectral Bias Mitigation","Data-Driven Modeling","Scientific Machine Learning"],
    doiUrl: "#"
  },
  {
    id: 3,
    title: "PM2.5 Timeseries Forecasting with Weather-Aware Attention Mechanism: A Multivariate Deep Learning Approach Based on Long-Term Data from Dhaka",
    authors: ["Zul Ikram Musaddik Rayat","Md Naiem Mobasshir Monim", "Prof. M. Mamun"],
    venue: "IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence and Networking (QPAIN) 2026",
    date: "2026",
    type: "Conference",
    abstract: `Dhaka is among the world's most polluted megacities, with its Air Quality Index (AQI) frequently reaching Unhealthy to Hazardous levels, necessitating accurate air quality forecasting to mitigate public health risks. This study presents a multivariate time series analysis of PM2.5 in Dhaka using advanced deep learning architectures. The proposed framework integrates eight years (2017–2024) of meteorological variables—temperature, rainfall, humidity, and wind speed—alongside PM2.5 concentrations. We introduce a novel "Weather-Aware" Variable Attention mechanism coupled with LSTM and GRU recurrent layers to dynamically prioritize meteorological features. Experimental results demonstrate that the Variable Attention-based GRU model significantly outperforms standard benchmarks, achieving an $R^2$ of 0.9956 and a Mean Absolute Percentage Error (MAPE) of 3.65% for hourly forecasts. For daily predictions, the model remains robust with an $R^2$ of 0.9892 and a MAPE of 5.56%. Robustness analysis across five random seeds further validates the model's stability with a narrow 95% confidence interval. These findings highlight the critical importance of multivariate, weather-informed modeling for urban air quality prediction and provide actionable insights for policymakers to address pollution risks in South Asian megacities.`,
    keywords: ["time series", "forecast", "air pollution", "AQI", "PM2.5", "machine learning", "attention mechanism", "LSTM", "GRU", "RNN"],
    doiUrl: "#"
  }
  // {
  //   id: 4,
  //   title: "Real-Time 3D Face Generation in Blender Using MediaPipe: A Procedural Approach",
  //   authors: ["Md Naiem Mobasshir Monim"],
  //   venue: "Digital Arts and Animation Workshop",
  //   date: "2024",
  //   type: "Workshop",
  //   abstract: "This paper documents a technical approach to real-time 3D facial landmark mapping in Blender using MediaPipe's Face Mesh model. The implementation achieves smooth facial landmark tracking with optimized rendering performance, enabling interactive applications in digital content creation and virtual communication.",
  //   keywords: ["MediaPipe", "Blender", "3D Face Tracking", "Real-Time Rendering", "Computer Vision"],
  //   pdfUrl: "#"
  // },
  // {
  //   id: 5,
  //   title: "Sustainable Packaging Solutions: Mycelium-Based Alternatives to Polystyrene",
  //   authors: ["Md Naiem Mobasshir Monim", "Co-founders of MycoMatters"],
  //   venue: "Bangladesh Youth Climate Sustainability and Innovation Summit",
  //   date: "2025",
  //   type: "Conference",
  //   abstract: "MycoMatters presents a biotechnology-driven approach to developing sustainable packaging materials using mycelium composites as alternatives to conventional polystyrene. This research addresses environmental challenges in packaging waste through innovative material science and circular economy principles.",
  //   keywords: ["Biotechnology", "Sustainability", "Mycelium", "Packaging", "Environmental Innovation"],
  //   doiUrl: "#"
  // }
];