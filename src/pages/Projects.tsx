import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DetailModal from "@/components/DetailModal";
import { useState } from "react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      title: "Archie: AI-Powered Dating Confidante & Matchmaker",
      shortDescription: "Voice-first AI dating assistant that creates authentic connections through natural conversations, moving beyond traditional dating apps to foster meaningful relationships.",
      fullDescription: "**What is Archie?** Archie is an AI-powered dating confidante designed to guide users toward meaningful, long-term connections. Operating as a simple phone number for calls and texts, Archie represents a fundamental shift from traditional dating apps by fostering authenticity through natural conversations. No app download required – just genuine, voice-first interactions with a friendly, empathetic AI that's slightly playful and always supportive. **Profile Creation & Understanding** Archie builds comprehensive user profiles through 7-8 minute phone calls, gathering insights about personality, interests, dating preferences, and future goals without typing pressure. The AI continuously learns from conversations and date feedback, capturing behavioral insights including routines, habits, values, and lifestyle details for better matching. **Smart Matching Process** Using relationship science research, Archie considers factors like mutual connections, education, location, and user intent to predict real-life chemistry. Matches are introduced individually via detailed text messages explaining compatibility factors, with a double opt-in system ensuring mutual interest before introductions. **24/7 Support & Coaching** Available around the clock for post-match support, date planning assistance, and personalized coaching. Archie helps users discuss potential matches, gathers feedback to refine the algorithm, and provides insights after each interaction to improve future dating experiences. **Proven Results & User Feedback** During beta testing, Archie facilitated successful matches with 70% profile completion rates and 8.7-minute average call durations. Users described conversations as 'very natural' and 'strangely comfortable,' with high engagement and anticipation for matches. The platform addresses dating app fatigue by eliminating appearance-based swiping and fostering authentic connections in a judgment-free environment.",
      image: "/images/projects/archie-ai-preview.jpg",
      tags: ["AI", "Dating Technology", "Voice AI", "Matchmaking", "Conversational AI"]
    },
    {
      title: "ImprintAI: Voice Cloning & AI Persona Platform",
      shortDescription: "Open-source voice cloning and AI chatbot platform that creates digital twins with zero-shot voice synthesis and intelligent knowledge bases using RAG architecture.",
      fullDescription: "ImprintAI addresses the high cost barrier of commercial voice cloning solutions (Resemble AI: $700+, 11Labs: $1300+) by leveraging cutting-edge open-source models. The platform combines ChatterboxTTS for zero-shot voice synthesis with Stella EN 1.5B embeddings for intelligent document retrieval, creating a comprehensive AI persona system. The architecture implements Retrieval Augmented Generation (RAG) to enable context-aware responses from uploaded documents, supporting multiple file formats (PDF, DOC, TXT). Key technical achievements include sub-200ms voice generation on GPU hardware, 44.1kHz audio quality output, and integration of a 1.5B parameter embedding model with an industry-leading MTEB score of 64.4. The system requires only 3-5 seconds of audio input for accurate voice cloning and includes personality configuration capabilities for custom AI persona creation. The full-stack implementation uses FastAPI for backend services, React with TypeScript for the frontend, and ChromaDB for vector-based document storage and retrieval. This project demonstrates the feasibility of democratizing voice AI technology through open-source alternatives while maintaining professional-grade performance standards.",
      image: "/images/projects/imprintai.png",
      videoUrl: "https://www.youtube.com/watch?v=i67Q6FFod6o",
      linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7336095738461921280/",
      tags: ["AI", "Voice Cloning", "Machine Learning", "RAG", "FastAPI", "React", "Open Source", "TTS"]
    },
    {
      title: "Replicating Natural Nanoscale Structural Color",
      shortDescription: "Research and development of structural color replication inspired by natural organisms, combining biology and nanotechnology for potential applications in sensors, displays, and photovoltaics.",
      fullDescription: "Structural color, where vibrant colors are produced through nanostructures instead of pigments, has been researched in artistic and scientific communities. Many biological species have developed structural properties that assist in camouflage, send warning signals, attract mates, regulate body temperature, etc. Structural color showcases the remarkable ingenuity of biological systems in achieving vivid and iridescent colors using limited materials. In contrast to humans, who have an extensive array of pigments and dyes at their disposal, nature employs a relatively small set of 'building blocks' to create an astonishing variety of colors. The study of natural structural color holds immense potential for inspiring and advancing nanotechnologies in the field of nanophotonics. The applications to medical solutions, optical sensing, communication, and even defense are broad and promising. By understanding the intricate mechanisms behind natural structural coloration, scientists can gain insights into designing and fabricating artificial nanostructures that exhibit desired optical properties. This interdisciplinary approach, combining biology and nanotechnology will pave the way for innovation in these fields of sensors, displays, and photovoltaics, among others.",
      image: "/images/projects/sem.png",

      tags: ["Nanotechnology", "Research", "Senior Design", "Nanophotonics"],
      pdfs: [
        {
          url: "/files/seniordesign.pdf",
          title: "Final Poster Presentation"
        }
      ]
    },
    {
      title: "Improved 2D Object Detection for Autonomous Scale Vehicles",
      shortDescription: "Implemented object detection model for car identification on track, enabling route planning, collision avoidance, and overtaking capabilities.",
      fullDescription: "Enrolling in DSC (Data Science) 178 at UCSD opened up a whole new world for me, introducing me to Linux, ROS2, Docker, and NVIDIA Jetson Nanos. As the only non-data science major in the class, I faced a steep learning curve, but the opportunity to work with robots made the process enjoyable. After weeks of acquiring the necessary skills, my team was given the freedom to choose our own project. We decided to focus on implementing an object detection model to identify cars on the track. Our aim was to enhance our robot's capabilities by enabling it to identify and track other cars, allowing it to plan its route effectively, avoid collisions, and potentially even overtake competing vehicles.",
      image: "/images/projects/jetson.jpg",
      gallery: [
        "/images/projects/robocar.jpg",
        "/images/projects/robotics.jpg",
      ],
      tags: ["Robotics", "Computer Vision", "ROS2", "Docker","NVIDIA Jetson"],
      pdfs: [
        {
          url: "/files/robocar.pdf",
          title: "Final Presentation"
        }
      ]
    },
    {
      title: "Zinc Oxide Nanoparticle Fabrication",
      shortDescription: "Synthesized metal nanoparticles using solution-based methods and assembled them into films for large-scale applications in LSPR-based biosensing.",
      fullDescription: "This experiment focuses on the synthesis of metal nanoparticles using solution-based methods and assembling them into films for large-scale applications. Metal nanoparticles, specifically silver and gold, have localized surface plasmon resonances that are dependent on their size and shape and can be excited in the optical range, making them suitable for LSPR-based biosensing in various fields. LSPR sensors are optical devices that detect changes in refractive index at the metal surface, allowing for ultrasensitive detection of molecular events such as protein binding.",
      image: "/images/projects/zincoxide.png",
      tags: ["Nanotechnology", "Research", "Biosensing", "Materials Science"],
      pdfs: [
        {
          url: "/files/report.pdf",
          title: "Experiment Report"
        }
      ]
    },
    {
      title: "Harvesting Kinetic Energy from Arm Movements: Development of a Piezoelectric Arm Sleeve",
      shortDescription: "Designed a piezoelectric arm sleeve that harnesses kinetic energy from arm movements to power autonomous glucose monitoring, combining materials science and medical technology.",
      fullDescription: "This research proposal focused on developing an innovative arm sleeve equipped with a cantilever beam transducer piezoelectric system designed to harness kinetic energy from arm flexion. The generated power sustains a built-in glucose monitor, providing a seamless, sustainable approach to glucose monitoring for diabetic patients. By converting everyday movements into electrical energy, this device enhances user convenience, ensures uninterrupted operation, and broadens the applicability of wearable health technologies. The project utilized Polyvinylidene Fluoride (PVDF) as the primary piezoelectric material within cantilever beam transducers, chosen for its flexibility, biocompatibility, and excellent piezoelectric properties. The design incorporated advanced energy management systems and was validated through comprehensive testing and clinical trials.",
      image: "/images/projects/soft.png",
      tags: ["Nanotechnology", "Medical Technology", "Energy Harvesting", "Wearable Devices"],
      pdfs: [
        {
          url: "/files/softelectronics.pdf",
          title: "Research Proposal"
        }
      ]
    },
    {
      title: "3D Printing of Hydroxyapatite Particle-Reinforced Chitosan Hydrogel Structures",
      shortDescription: "Developed innovative bone scaffolding proposal using 3D-printed hydroxyapatite-reinforced chitosan hydrogels, addressing articular cartilage damage through advanced biomaterials engineering.",
      fullDescription: "This research proposal focused on developing a novel approach to articular cartilage repair using 3D-printed hydroxyapatite particle-reinforced chitosan hydrogel structures. The project addressed the critical challenge of cartilage lesions, which have limited self-healing capabilities and affect over 32.5 million US adults with osteoarthritis. The research involved three specific aims: optimizing the printing process with hydroxyapatite-chitosan bioink, characterizing mechanical properties of printed scaffolds, and assessing biocompatibility. The project successfully demonstrated enhanced mechanical properties through nanoparticle reinforcement, improved printing accuracy, and maintained biological compatibility. This work contributes to the advancement of tissue engineering solutions for cartilage repair, offering a potential alternative to traditional clinical methods.",
      image: "/images/projects/bone.png",
      tags: ["Biomaterials", "3D Printing", "Tissue Engineering", "Research"],
      pdfs: [
        {
          url: "/files/bone.pdf",
          title: "Research Presentation"
        }
      ]
    },
    {
      title: "Graduate Class Research Proposal: Nanophotonics for Medical Technology",
      shortDescription: "Developed a comprehensive research proposal applying photonics principles to medical technology, demonstrating mathematical understanding and practical application skills.",
      fullDescription: "This research proposal explores using upconverting nanoparticles (UCNs) to enable non-invasive optogenetic treatment of epilepsy by converting near-infrared light to blue light for transcranial activation of ChR2 opsins in hippocampal neurons. The project advances your knowledge by integrating multiple cutting-edge fields - combining nanophotonics principles (UCN light conversion mechanisms), neuroscience (epilepsy pathophysiology and hippocampal circuitry), optogenetics (ChR2 channel function and AAV gene delivery), and biomedical engineering (transcranial stimulation and EEG monitoring). Through designing this three-phase experimental approach, you developed understanding of how photon upconversion can overcome the limited tissue penetration of blue light, learned about targeting specific neural circuits (KCNQ2/3 channels) for therapeutic intervention, and gained insight into translating nanotechnology applications from in vitro phantom models to in vivo animal studies. This project particularly enhanced your grasp of how optical properties of nanomaterials can be engineered to solve clinical challenges, bridging fundamental photonics concepts with practical medical applications in a way that demonstrates the interdisciplinary nature of modern biomedical research.",
      image: "/images/projects/optogenetics.png",
      tags: ["Research", "Photonics", "Medical Technology", "Graduate Studies"],
      pdfs: [
        {
          url: "/files/mae.pdf",
          title: "Final Presentation"
        },
        {
          url: "/files/proposal.pdf",
          title: "Research Proposal"
        }
      ],
    },
    {
      title: "Drone Design Challenge",
      shortDescription: "Designed and built a drone for package delivery through obstacles, winning best design award and successfully completing the challenge.",
      fullDescription: "This is a special project to me, primarily because I won a $25 gift card which officially marks my first time as a 'paid' engineer! I was tasked with building a drone to transport a small package from one location to another roughly 25 yards away, while flying through and around obstacles. Competing against nearly 50 other students, I won the award for best design, and also was the only student to complete the challenge. I remember this experience fondly as my first time leveraging CAD design and 3D printing to achieve a specific goal. This sparked my interest in drones and resulted in my career as a drone photographer during high school.",
      image: "/images/projects/drone.jpg",
      tags: ["Drone Design", "CAD", "3D Printing", "Aerospace"],
    },
    {
      title: "Photovoltaic Cell",
      shortDescription: "Developed a miniature photovoltaic cell using graphene layering on a microchip, implementing advanced fabrication techniques for optimal performance.",
      fullDescription: "The process of creating and layering graphene on a microchip to develop a miniature photovoltaic cell involves several crucial steps. Graphene, a single layer of carbon atoms arranged in a hexagonal lattice, exhibits remarkable electrical conductivity and optical properties, making it an ideal material for photovoltaic applications. The process includes substrate preparation, graphene growth through CVD, transfer process, graphene integration, electrical contacts, and encapsulation to protect the delicate structure.",
      image: "/images/projects/cell.jpeg",
      gallery: [
        "/images/projects/cell-1.jpeg",
        "/images/projects/cell-2.jpeg",
        "/images/projects/cell-3.jpeg"
      ],
      tags: ["Photovoltaics", "Graphene", "Microfabrication", "Renewable Energy"],
    }
  ];

  const handleCardClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Work, experiments, and creative endeavors.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-border/50 cursor-pointer"
              onClick={() => handleCardClick(project)}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-accent-foreground transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Template Card for New Projects
        <div className="mt-8">
          <Card className="border-dashed border-2 border-border/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Add Your Next Project</h3>
              <p className="text-muted-foreground">
                Copy the card structure above to add more projects to your portfolio.
              </p>
            </CardContent>
          </Card>
        </div> */}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedProject.title}
          description={selectedProject.fullDescription}
          tags={selectedProject.tags}
          images={[{ src: selectedProject.image, alt: selectedProject.title }]}
          gallery={selectedProject.gallery}
          type="project"
          pdfs={selectedProject.pdfs}
          videoUrl={selectedProject.videoUrl}
          linkedinUrl={selectedProject.linkedinUrl}
        />
      )}
    </Layout>
  );
}
