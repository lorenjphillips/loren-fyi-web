import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DetailModal from "@/components/DetailModal";
import { useState } from "react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      title: "Skill Vault: AI Tool Backup CLI",
      shortDescription: "A Go CLI that backs up skills, config, memory, and conversation logs across 16 AI coding tools — Claude Code, Cursor, Codex, Windsurf, and more — to Git and cloud storage.",
      fullDescription: "**What is sv?** sv solves a practical problem for developers who rely on AI coding assistants: your agent skills, custom rules, configuration, and conversation history live in scattered local directories with no automatic backup. One bad migration or machine wipe and it's gone. **How it Works** The tool scans ~/.claude, ~/.cursor, ~/.codex, and 13 other well-known AI tool directories to detect installed tools and categorize each path into skills, config, memory, rules, or conversations. It uses rsync and git to version-control skills and config into a remote Git repo, and tar plus a cloud CLI (aws, gcloud, or az) to ship conversation logs — too large for Git — to cloud object storage (S3, GCS, Azure, or iCloud). **Scheduling & Platform Support** On macOS, sv init installs a launchd job so backups run automatically on a configurable interval (default 24h) without cron setup. A preflight check validates required binaries and surfaces missing dependencies as readable warnings. Supports 16 tools: Claude Code, Cursor, Codex, Windsurf, Aider, Continue, Copilot, Amp, Cline, Roo Code, Tabnine, Supermaven, Zed AI, Warp AI, Amazon Q, and Gemini CLI.",
      image: "https://raw.githubusercontent.com/lorenjphillips/sv/main/assets/screenshot.png",
      tags: ["Go", "CLI", "AI Developer Tools", "Backup & Sync", "macOS", "Open Source"],
      githubUrl: "https://github.com/lorenjphillips/sv"
    },
    {
      title: "Rusty Claw: Rust AI Agent CLI",
      shortDescription: "A Rust port of a clean-room architectural study of Claude Code's agent harness — compiled to a single static binary mapping 207 commands, 184 tools, and 29 subsystems.",
      fullDescription: "**Background** When Claude Code's source code leaked in early 2025, it offered a rare window into how Anthropic had architected a production-grade AI agent CLI. Rather than archive the material, I used the structural metadata as a reference to build a clean-room reconstruction — first in Python (claw-code), then ported to Rust as rusty-claw. **Architecture** The project loads and indexes all 207 commands and 184 tools from JSON snapshots embedded at compile time via include_str!, then exposes them through a 22-subcommand CLI built with clap. A token-scoring router matches natural-language prompts to commands and tools, a turn-based query engine simulates multi-turn conversation loops with budget tracking, and a session store persists state to disk as JSON. **Why Rust** Where the Python version required an interpreter and packages, cargo build --release produces a single static binary with all metadata baked in. The codebase spans 20 source modules covering prompt routing, bootstrap graph sequencing, permission modeling, subsystem enumeration, and a parity audit tool. Ships with 31 integration tests using assert_cmd.",
      image: "https://raw.githubusercontent.com/lorenjphillips/rusty-claw/main/assets/rusty-claw-hero.png",
      tags: ["Rust", "CLI", "AI Agent Architecture", "Systems Programming", "LLM Tooling", "Static Binary"],
      githubUrl: "https://github.com/lorenjphillips/rusty-claw"
    },
    {
      title: "Skill Rot: Over-Engineered Claude Code Slash Commands",
      shortDescription: "Absurdly over-engineered Claude Code slash commands that answer trivially simple questions through elaborate chains of real APIs, satellite data, and scientific algorithms.",
      fullDescription: "skill-rot is a satirical engineering project built as a Claude Code CLI plugin. It implements four slash commands (/flip-a-coin, /is-it-friday, /am-i-online, /weather) where each command answers a dead-simple question through a deliberately excessive multi-step process using real, publicly available scientific APIs — no auth required. **The Bit** /flip-a-coin harvests entropy from four independent physical sources: the Australian National University's quantum random number generator (vacuum electromagnetic fluctuations), NOAA's DSCOVR satellite measuring solar wind proton density at the Sun-Earth L1 point, the OS kernel CSPRNG, and CPU nanosecond jitter — then XOR-combines and SHA-256 whitens them before returning HEADS or TAILS. /is-it-friday cross-verifies the day of the week using the IERS Earth rotation bulletin, Julian Day Numbers, NASA's JPL Horizons DE441 planetary ephemeris, DNS round-trip triangulation, and Zeller's 1882 congruence formula. /am-i-online audits all seven OSI layers, checking ICMP pings to DNS root servers, BGP prefix visibility across 300+ global peers via RIPE RIS, and NOAA outage signals — returning a score out of 100 with verdicts like 'PHILOSOPHICALLY QUESTIONABLE.' /weather derives local conditions from first principles without a weather API, computing solar irradiance from the Kasten-Young formula and decoding raw METAR reports field-by-field.",
      image: "https://opengraph.githubassets.com/1/lorenjphillips/skill-rot",
      tags: ["Claude Code", "Python", "CLI", "APIs & Data Engineering", "Satire", "Developer Tools"],
      githubUrl: "https://github.com/lorenjphillips/skill-rot"
    },
    {
      title: "Headless Horsemen: AI Demo Video Generator",
      shortDescription: "Give it a URL and a task — get back a narrated, music-backed demo video. Built in 48 hours for the YC x Browserbase hackathon.",
      fullDescription: "**What is Headless Horsemen?** Give it a URL and a task description and the system returns a polished, narrated MP4 demo video. Built in under 48 hours for the YC x Browserbase hackathon, it autonomously navigates websites and composes the footage into a professional product demo without any manual recording setup. **Four-Stage Pipeline** First, Gemini 2.0 Pro generates a structured JSON action plan from the user's prompt (Navigate, Act, Scroll, Wait steps). Second, that plan executes inside a Browserbase cloud Chromium instance controlled via Stagehand, a natural-language browser automation framework — with a custom screenshot loop at ~15fps using direct CDP calls. Third, Gemini 2.5 Flash TTS generates step-by-step voice narration. Fourth, FFmpeg interpolates screenshots to 60fps, burns in captions, mixes AI-generated background music via Google Lyria 3, and outputs an H.264 MP4. **Memory & API** ChromaDB stores completed demo embeddings for few-shot context on future requests. A lightweight Express server exposes REST endpoints for job creation, real-time status, and video streaming — backed by a dark-themed web UI with a live progress display.",
      image: "https://opengraph.githubassets.com/1/lorenjphillips/headless-horsemen",
      tags: ["Browserbase", "Stagehand", "Gemini API", "Browser Automation", "AI Video Generation", "TypeScript"],
      githubUrl: "https://github.com/lorenjphillips/headless-horsemen"
    },
    {
      title: "Persistent AI Coding Agent Platform",
      shortDescription: "A fully stateful AI coding agent running as a persistent background service, integrated with Slack, GitHub, Linear, Datadog, and a read-only production database.",
      fullDescription: "**What is it?** This project implements a persistent, always-on AI coding agent that runs as a local daemon via a LaunchAgent, exposing an HTTP gateway integrated with a configurable set of external platforms. The agent is driven by a multi-file identity and memory system — Markdown documents defining persona, scope, behavioral constraints, and session continuity across restarts. State is durable via files rather than held in memory. **Integrations** The platform connects to Slack (Socket Mode, Bolt SDK) for real-time bidirectional communication, GitHub CLI for branch and PR operations across a multi-repo organization, Linear via GraphQL API for issue management, Datadog for log queries and monitor management, PostHog for read-only analytics, and a Postgres read-only replica through a hardened wrapper script. Model routing runs through a local Claude proxy with configurable fallback chains for reasoning-heavy second opinions. **Security & Scope** Tiered action policies enforce read-only access for general queries, write actions for verified users only, and explicit confirmation for destructive operations. Prompt injection resistance, credential non-exposure rules, and identity verification pinned to platform user IDs are baked into the design. Destructive actions — production deploys, database migrations, cron scheduling — are explicitly out of scope and delegated to sibling systems.",
      image: "https://opengraph.githubassets.com/1/lorenjphillips/loco",
      tags: ["AI Agents", "Claude", "Slack Bots", "Developer Tooling", "Multi-Platform Automation", "Go"]
    },
    {
      title: "Programmatic SEO Content Pipeline",
      shortDescription: "A TypeScript pipeline that manages 130+ SEO articles from keyword research through AI-assisted drafting to automated Framer CMS publishing.",
      fullDescription: "This project is a programmatic SEO content system built in TypeScript, managing a multi-stage pipeline: keyword-researched briefs, a review queue, and published articles tracked in a master index of 131 content pieces with keyword volume and difficulty metadata synced from Google Sheets. **Sync Layer** A shell script bridges Google Sheets and Google Docs via the Sheets and Drive REST APIs, performing bidirectional count-validation and supporting targeted sync modes (--sheet-only, --docs-only, --full) to minimize API calls during iterative sessions. **Publishing Pipeline** The publishing script uses the Framer CMS Server API to push approved content programmatically. It parses YAML frontmatter, converts Markdown to HTML, introspects the live CMS collection schema dynamically, and maps article fields to Framer field IDs before moving files from review to finished status. **Community Intelligence** A WhatsApp export from a 200-person voice AI founder community (~7,400 lines) was processed to extract search intent signals and topic gaps, sourcing 28 additional content briefs to inform keyword prioritization.",
      image: "https://opengraph.githubassets.com/1/lorenjphillips/coval-seo",
      tags: ["TypeScript", "SEO Automation", "Framer CMS API", "Google Sheets API", "Content Pipeline", "Programmatic Publishing"]
    },
    {
      title: "TokenWise: LLM Token Compression",
      shortDescription: "A web app that compresses natural language before sending it to LLMs, reducing token count and API cost while preserving semantic meaning.",
      fullDescription: "TokenWise tackles a practical problem in working with large language models: token cost. By compressing user inputs before they hit the LLM, the app reduces tokens consumed per request — lowering API spend without sacrificing the model's ability to understand intent. **Compression Algorithms** The app ships two distinct algorithms. The first strips stopwords, transition phrases, and non-essential punctuation, producing dense text that LLMs still parse accurately ('This is an example of how compression works' becomes 'example compression works'). The second applies regex-based slang transformations — phonetic substitutions and texting abbreviations — for maximum character reduction. **Architecture** Serverless functions handle compression logic and OpenAI API calls, deployed via Vercel. The frontend is built with React, TypeScript, and Tailwind CSS, providing a clean interface for comparing token counts before and after compression. Decompression utilities calculate character reduction percentages and readability scores.",
      image: "https://opengraph.githubassets.com/1/lorenjphillips/llm-compression-demo",
      tags: ["React", "TypeScript", "Node.js", "LLM", "OpenAI", "Token Optimization", "Vercel"],
      githubUrl: "https://github.com/lorenjphillips/llm-compression-demo"
    },
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
          githubUrl={selectedProject.githubUrl}
        />
      )}
    </Layout>
  );
}
