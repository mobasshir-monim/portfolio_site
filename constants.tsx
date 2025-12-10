import { Facebook, Linkedin, Youtube, Instagram, Mail } from "lucide-react";
import { NavItem, SkillCategory, SocialLink, HighlightItem, ResumeItem, AchievementItem, ProjectItem, CertificateItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Youtube", href: "/youtube-feed" },
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
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
    id: 1,
    image: "Assets\\OCB.jpg",
    title: "Champion of Orange Corners Bangladesh Ideation Challenge 5.0",
    description: "Receiving recognition for being startup ideation challenge winner with MycoMatters."
  },
  {
    id: 2,
    image: "Assets\\edctalk.jpg",
    title: "EDC Talk Season 2",
    description: "With CEO and Founder of ACS Numeri Sattar Apar"
  },
  {
    id: 3,
    image: "Assets\\treasurehunt.jpg",
    title: "Winning Treasure Hunt of ME FEST 2023 and 2024",
    description: "Celebrating teamwork and brainpower."
  },
  {
    id: 4,
    image: "Assets\\cohort.jpg",
    title: "Champion of Cohort 5 of University Innovation Hub Program",
    description: "Won pre-seed funding and mentorship for MycoMatters from UIHP organised by Research and Innovation Centre for Science and Engineering (RISE-BUET) and Bangladesh Hi-Tech Park Authority and ICT Division."
  },
  {
    id: 5,
    image: "Assets\\intp.jpg",
    title: "Taking session on video production, editing and motion graphics",
    description: "At Team Interplanetar's Workshop \"Inside Interplanetar\""
  },
  {
    id: 6,
    image: "Assets\\pvm.jpg",
    title: "Appreciation from Perfetti Van Melle Bangladesh",
    description: "For outstanding performance as Elevate Campus Ambassador"
  },
  {
    id: 7,
    image: "Assets\\pres.jpg",
    title: "Poster Presentation about Automation and Robotics in Industries.",
    description: "At BUET Mechanical Engineering Fest 2023"
  },
  {
    id: 8,
    image: "Assets\\drama.jpg",
    title: "Performing at Mecha Fest 2024",
    description: "Was the lead actor in a drama performance organized by BUET Mechanical Engineering Department"
  },
  {
    id: 9,
    image: "Assets\\drama2.jpg",
    title: "Performing Drama on Mecha Fest 2023",
    description: "Acted as one of the main characters in a drama organized by BUET Mechanical Engineering Department"
  },
  {
    id: 10,
    image: "Assets\\pres2.jpg",
    title: "Pitching on MycoMatters",
    description: "At Orange Corners Bangladesh Ideation Challenge 5.0 Final Round"
  },
  {
    id: 11,
    image: "Assets\\intern.jpg",
    title: "Internship at Synovia Pharmaceuticals PLC",
    description: "Gained hands-on experience in pharmaceutical manufacturing and quality control."
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "Visual-Vocal: A Voice Controller Robotic Hand for Real-Time Sign Language Communication",
    image: "Assets/photo_6275925132425936284_w.jpg",
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
    image: "Assets/IMG_20250402_211825_544~2.jpg",
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
    image: "Assets\\rover.jpg",
    bio: "A new generation of rover with the most advanced navigation and communication system and most sophisticated till date science tool for collecting and testing soil designed, simulated and manufactured using advanced Physx Particle simulator.",
    tags: ["ROS", "Python", "Websockets", "Automation"],
    details: ``
  },
  {
    id: 4,
    title: "Real-Time 3D Face Generation in Blender Using MediaPipe",
    image: "Assets\\project4.png",
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
    image: "Assets\\OCB.jpg"
  },
  {
    id: 2,
    title: "Software Engineer at European Rover Challenge 2023",
    issuer: "European Space Foundation",
    date: "2023",
    category: "Awards",
    image: "Assets\\ERC.jpg"
  },
  {
    id: 3,
    title: "Convolutional Neural Networks in TensorFlow",
    issuer: "DeepLearning.AI",
    date: "2024",
    category: "Machine Learning",
    image: "Assets\\CNN.jpeg"
  },
  {
    id: 4,
    title: "Tools for Data Science",
    issuer: "IBM",
    date: "2023",
    category: "Data Science",
    image: "Assets\\tools-for-data-science.jpeg"
  },
  {
    id: 5,
    title: "MATLAB Onramp",
    issuer: "MathWorks",
    date: "2023",
    category: "Matlab",
    image: "Assets\\matlab1.jpg"
  },
  {
    id: 6,
    title: "University Rover Challenge 2023",
    issuer: "The Mars Society",
    date: "2023",
    category: "Awards",
    image: "Assets\\URC.jpg"
  },
  {
    id: 7,
    title: "International Rover Design Challenge 2023",
    issuer: "Space Robotics Society",
    date: "2023",
    category: "Awards",
    image: "Assets\\irdc.jpg"
  },
  {
    id: 8,
    title: "Data Science Methodology",
    issuer: "IBM",
    date: "2023",
    category: "Data Science",
    image: "Assets\\data-science-methodology.jpeg"
  },
  {
    id: 9,
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Coursera (Stanford)",
    date: "2023",
    category: "Machine Learning",
    image: "Assets\\Supervised_learning.jpeg"
  },
  {
    id: 10,
    title: "Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning",
    issuer: "Coursera (Stanford)",
    date: "2023",
    category: "Machine Learning",
    image: "Assets\\intrototf.jpeg"
  },
  {
    id: 11,
    title: "What is Data Science?",
    issuer: "IBM",
    date: "2023",
    category: "Machine Learning",
    image: "Assets\\what-is-data-science.jpeg"
  },
  {
    id: 12,
    title: "Introduction to MATLAB Programming",
    issuer: "Coursera (Vanderbilt University)",
    date: "2023",
    category: "Matlab",
    image: "Assets\\matlab.jpeg"
  },
  {
    id: 13,
    title: "SQL for Data Science",
    issuer: "Coursera (University of California, Davis)",
    date: "2023",
    category: "Data Science",
    image: "Assets\\SQL.jpeg"
  },
  {
    id: 14,
    title: "Signal Processing Onramp",
    issuer: "MathWorks",
    date: "2023",
    category: "Matlab",
    image: "Assets\\signal.png"
  },
  {
    id: 15,
    title: "HerWILL AI and Data Science Education Program",
    issuer: "HerWILL",
    date: "2024",
    category: "Machine Learning",
    image: "Assets\\herwill.png"
  },
  {
    id: 16,
    title: "Solving Nonlinear Systems of Equations in MATLAB",
    issuer: "MathWorks",
    date: "2024",
    category: "Matlab",
    image: "Assets\\matlab3.jpg"
  },
  {
    id: 17,
    title: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    date: "2023",
    category: ["Data Science", "Programming"],
    image: "Assets\\Sqlbasic.jpg"
  },
  {
    id: 18,
    title: "SQL (Intermediate) Certificate",
    issuer: "HackerRank",
    date: "2023",
    category: ["Data Science", "Programming"],
    image: "Assets\\Sqlinter.jpg"
  },
  {
    id: 19,
    title: "JavaScript (Basic) Certificate",
    issuer: "HackerRank",
    date: "2023",
    category: "Programming",
    image: "Assets\\JS.jpg"
  },
  {
    id: 20,
    title: "Champion of Idea Presentation Sector in Bangladesh Youth Climate Sustainability and Innovation Summit",
    issuer: "Youth Messengers Bangladesh",
    date: "2025",
    category: ["Awards", "Entrepreneurship"],
    image: "Assets\\mycoidea.jpg"
  },
  {
    id: 21,
    title: "Elevate Campus Ambassador",
    issuer: "perfetti van melle",
    date: "2025",
    category: "Leadership",
    image: "Assets\\elevate.jpg"
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
  subBio: "Undergraduate Senior Year, Department of Mechanical Engineering"
};

export const RESUME_EDUCATION: ResumeItem[] = [
  {
    title: "Bachelor of Science in Mechanical Engineering",
    organization: "Bangladesh University of Engineering and Technology (BUET)",
    date: "Dec 2021 - Present",
    points: [
      "Industrial Attachment: Synovia Pharmaceuticals PLC",
      "Thesis Project under Prof. M.Mamun"
    ]
  },
  {
    title: "Higher Secondary School Certificate",
    organization: "Rajshahi College | Rajshahi Board",
    date: "2019",
    points: [
      "GPA 5.00/5.00",
      "Scholarship from Board of Education, Rajshahi"
    ]
  },
  {
    title: "Secondary School Certificate",
    organization: "Rajshahi Collegiate School | Rajshahi Board",
    date: "2018",
    points: [
      "GPA 5.00/5.00"
    ]
  }
];

export const RESUME_LEADERSHIP: ResumeItem[] = [
  {
    title: "Campus Spark",
    organization: "Unilever",
    date: "May 2025 – Present",
    points: [
      "Represented Unilever on campus by leading brand engagement initiatives, increasing student participation in UFLP and business case competitions.",
      "Boosted brand visibility through strategic event planning, digital outreach, and collaborations with university clubs.",
      "Collected and delivered insights on student preferences and trends to support Unilever's campus recruitment and marketing strategies.",
      "Contributed in affiliating BUET clubs with grameenphone's corporate culture"
    ]
  },
  {
    title: "Campus Lead",
    organization: "Grameenphone",
    date: "Jan 2024 – March 2025",
    points: [
      "Organized and coordinated Grameenphone's Flagship events like Platform She roadshow, Next Business Leader Roadshow etc. at BUET",
      "Contributed in affiliating BUET clubs with grameenphone's corporate culture"
    ]
  },
  {
    title: "Campus Ambassador",
    organization: "Perfetti Van Melle BD",
    date: "Jan 2024 – April 2025",
    points: [
      "Bridging the PVM marketing sector with BUET campus"
    ]
  },
  {
    title: "President",
    organization: "BUET Entrepreneurship Development Club",
    date: "July 2023 – Present",
    points: [
      "Ex Positions: Assistant General Secretary, Secretary",
      "Organized and hosted multiple events for the club both in administrative and cultural sector",
      "Designed logos, banners, posters etc for the events",
      "Created pitch deck for club's flagship event 'Pioneros'",
      "Animated the club logo"
    ]
  },
  {
    title: "General Secretary",
    organization: "BUET Animata-Animation and VFX club",
    date: "March 2024 – Present",
    points: [
      "Ex Positions: Founding Assistant General Secretary",
      "Organized and hosted multiple events for the club both in administrative and cultural sector",
      "Held workshops on teaching basic animations and 3D modelling.",
      "Animated the club logo"
    ]
  },
  {
    title: "Director of Technicals",
    organization: "BUET Film Society",
    date: "March 2024 – Present",
    points: [
      "Created content for the events like creating motion graphics, logo animation and video editing."
    ]
  },
  {
    title: "Volunteer",
    organization: "Research and Innovation Centre for Science and Engineering (RISE-BUET)",
    date: "March 2024 – Present",
    points: [
      "Designed brochures and posters for different campaigns."
    ]
  },
  {
    title: "Academic Team Member",
    organization: "Bangladesh Mathematical Olympiad",
    date: "March 2021 – Present",
    points: [
      "Created questions and evaluated answers for the Bangladesh Mathematical Olympiad.",
      "Assisted in conducting Olympiad preparation bootcamps."
    ]
  },
  {
    title: "Assistant General Secretary",
    organization: "BUET Brainiacs",
    date: "Sep 2024 – Present",
    points: [
      "Actively involved in creating social media content and engaging in all club events."
    ]
  },
];

export const RESUME_EXPERIENCE: ResumeItem[] = [
  {
    title: "Internship",
    organization: "Synovia Pharmaceuticals PLC",
    date: "March 2025",
    points: [
      "Gained hands-on experience in pharmaceutical manufacturing and industrial processes.",
      "Observed and analyzed quality control procedures in drug production.",
      "Learned about Good Manufacturing Practices (GMP) and regulatory compliance in the pharmaceutical industry.",
      "Explored the role of mechanical engineering in pharmaceutical equipment maintenance and optimization."
    ]
  },
  {
    title: "Animation Lead",
    organization: "Software Sub-team, Team Interplanetar-A BUET Mars Rover Team",
    date: "",
    points: [
      "Contributed in developing communication and perception system of the rover for European Rover Challenge 2023,2024; Anatolian Rover Challenge 2023,2024; University Rover Challenge 2023",
      "Animated and Simulated rover performance for ERC 2023,2024,2025; IRDC 2023,2024",
      "Performance Analysis of the Rover"
    ]
  }
];

export const RESUME_ACHIEVEMENTS_LEADERSHIP: AchievementItem[] = [
  { text: "Champions of Orange Corners BD Ideation Challenge 5.0 2025" },
  { text: "Champion of cohort 5 of University Innovation Hub Program Organized by ICT Division, Bangladesh and RISE, BUET" },
  { text: "Champion of Idea presentation sector in Bangladesh Youth Climate Sustainability and Innovation Summit" },
  { text: "Semifinalist of HULT Prize BUET 2024." },
  { text: "Selected for the second cohort of the University Hub Program 2024 at Research & innovation Center for Science & Engineering- RISE, BUET." },
  { text: "Semifinalist of HULT Prize BUET 2024." },
  { text: "Runners Up of Video Essay Challenge – BUET Brainiacs." },
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
  "SolidWorks CAD",
  "Autocad",
  "Ansys Simulation",
  "Blender",
  "Microsoft Office",
  "Advanced Machine Learning",
  "Adobe Illustrator",
  "Matlab",
  "Python",
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "Canva",
  "Full Stack Web Development",
  "WordPress",
  "Data Science"
];

export const RESUME_SOFT_SKILLS: string[] = [
  "Communication",
  "Leadership",
  "Research",
  "Teaching",
  "Critical thinking",
  "Management",
  "Networking",
  "Team work"
];