export interface ProjectPdf { url: string; title: string }
export interface ProjectImage { src: string; alt?: string }

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image?: string;
  imageFit?: string;
  tags?: string[];
  gallery?: ProjectImage[];
  pdfs?: ProjectPdf[];
  githubUrl?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  videoUrl?: string;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const raw = [
    {
      title: "Polacard: Instant-Film Photos for Apple Wallet",
      shortDescription: "An iPhone app that turns any photo into a retro instant-film print and signs it into Apple Wallet on-device.",
      fullDescription: "**What it is** Polacard turns a photo from your library into a retro instant-film print and saves it to Apple Wallet, so a picture of the people you care about sits right next to your boarding passes and tickets. You pick a photo, frame it, write a caption in a handwritten-style font, and choose a film look. Everything runs on the phone. No account, no server, no network calls. **Signing Wallet passes on the device** This was the core technical problem. An Apple Wallet pass is not an image, it is a signed bundle, and the signature has to come from a Pass Type ID certificate that normally lives on a server you control. Almost every app that adds passes calls a backend to build and sign them. I wanted Polacard to work for anyone who downloads it with no setup at all, which meant doing the signing on the phone itself. So the app bundles a Pass Type ID certificate and builds the entire pass client side: it lays out the pass JSON and images, hashes every file into a manifest, produces a PKCS#7 detached signature with Apple's swift-certificates library, and zips the result into a .pkpass with ZIPFoundation. The frustrating part is that Wallet rejects the whole pass with no useful error if a single hash or field is off, so getting the manifest and signature byte-exact took a lot of slow trial and error. **The iOS 26 versus iOS 27 problem** This shaped the whole product. On iOS 27, a pass can render its artwork edge to edge and fill the card, so a Polacard looks like a full instant print inside Wallet. On iOS 26, the same pass shows up smaller, framed inside the standard pass layout, and iOS 27 is still in beta so most people will see the iOS 26 version first. There was no way to fake the newer look on the older OS, so instead of hiding it I designed both versions to look deliberate and was honest about it on the marketing site, with a side by side of exactly what each one looks like. The app checks the OS at runtime and picks the pass style that will actually render. **Avoiding the Polaroid trademark** The obvious name and vocabulary for this thing is a trademark owned by Polaroid IP B.V., so the word cannot appear anywhere in the app or the store listing. I scrubbed it from every string and wrote a test that fails the build if it creeps back into the UI, which is easy to do when you are rewriting copy quickly. **Getting through App Store review** A paid utility that signs its own passes touches several things reviewers look at closely. I added a privacy manifest declaring no tracking and no data collection, confirmed the only cryptography in the app is pass signing so it qualifies for the encryption export exemption, locked it to iPhone, made sure the icon carried no alpha channel, and compiled every demo and screenshot hook out of the release build behind flags. The shipped binary has no analytics and makes no network requests. **Rendering** The frames, film looks, and grain are composited with Core Image at full Wallet resolution and moved off the main thread so the editor stays responsive while a pass renders. There are five frame styles plus Noir and Vintage treatments, and the same render path feeds both the on-screen preview and the final pass artwork, so what you see while editing is what gets saved.",
      image: "/images/projects/polacard-site.jpg",
      gallery: ["/images/projects/polacard-app.jpg"],
      tags: ["Swift", "SwiftUI", "iOS", "Apple Wallet / PassKit", "On-Device Signing", "Core Image", "App Store"],
      websiteUrl: "https://polacard.com"
    },
    {
      title: "Skill Vault: AI Tool Backup CLI",
      shortDescription: "A Go CLI that backs up skills, config, and memory across 16 AI coding tools to Git and cloud storage.",
      fullDescription: "**What is sv?** sv solves a practical problem for developers who rely on AI coding assistants: your agent skills, custom rules, configuration, and conversation history live in scattered local directories with no automatic backup. One bad migration or machine wipe and it's gone. **How it Works** The tool scans ~/.claude, ~/.cursor, ~/.codex, and 13 other well-known AI tool directories to detect installed tools and categorize each path into skills, config, memory, rules, or conversations. It uses rsync and git to version-control skills and config into a remote Git repo, and tar plus a cloud CLI (aws, gcloud, or az) to ship conversation logs (too large for Git) to cloud object storage (S3, GCS, Azure, or iCloud). **Scheduling & Platform Support** On macOS, sv init installs a launchd job so backups run automatically on a configurable interval (default 24h) without cron setup. A preflight check validates required binaries and surfaces missing dependencies as readable warnings. Supports 16 tools: Claude Code, Cursor, Codex, Windsurf, Aider, Continue, Copilot, Amp, Cline, Roo Code, Tabnine, Supermaven, Zed AI, Warp AI, Amazon Q, and Gemini CLI.",
      image: "https://raw.githubusercontent.com/lorenjphillips/sv/main/assets/screenshot.png",
      tags: ["Go", "CLI", "AI Developer Tools", "Backup & Sync", "macOS", "Open Source"],
      githubUrl: "https://github.com/lorenjphillips/sv"
    },
    {
      title: "Rusty Claw: Rust AI Agent CLI",
      shortDescription: "A Rust port of a clean-room study of Claude Code's agent harness, compiled to a single static binary.",
      fullDescription: "**Background** When Claude Code's source code leaked in early 2025, it offered a rare window into how Anthropic had architected a production-grade AI agent CLI. Rather than archive the material, I used the structural metadata as a reference to build a clean-room reconstruction, first in Python (claw-code), then ported to Rust as rusty-claw. **Architecture** The project loads and indexes all 207 commands and 184 tools from JSON snapshots embedded at compile time via include_str!, then exposes them through a 22-subcommand CLI built with clap. A token-scoring router matches natural-language prompts to commands and tools, a turn-based query engine simulates multi-turn conversation loops with budget tracking, and a session store persists state to disk as JSON. **Why Rust** Where the Python version required an interpreter and packages, cargo build --release produces a single static binary with all metadata baked in. The codebase spans 20 source modules covering prompt routing, bootstrap graph sequencing, permission modeling, subsystem enumeration, and a parity audit tool. Ships with 31 integration tests using assert_cmd.",
      image: "https://raw.githubusercontent.com/lorenjphillips/rusty-claw/main/assets/rusty-claw-hero.png",
      tags: ["Rust", "CLI", "AI Agent Architecture", "Systems Programming", "LLM Tooling", "Static Binary"],
      githubUrl: "https://github.com/lorenjphillips/rusty-claw"
    },
    {
      title: "Skill Rot: Over-Engineered Claude Code Slash Commands",
      shortDescription: "Claude Code slash commands that answer trivial questions through absurd chains of real APIs and satellite data.",
      fullDescription: "skill-rot is a satirical engineering project built as a Claude Code CLI plugin. It implements four slash commands (/flip-a-coin, /is-it-friday, /am-i-online, /weather) where each command answers a dead-simple question through a deliberately excessive multi-step process using real, publicly available scientific APIs, no auth required. **The Bit** /flip-a-coin harvests entropy from four independent physical sources: the Australian National University's quantum random number generator (vacuum electromagnetic fluctuations), NOAA's DSCOVR satellite measuring solar wind proton density at the Sun-Earth L1 point, the OS kernel CSPRNG, and CPU nanosecond jitter. It then XOR-combines and SHA-256 whitens them before returning HEADS or TAILS. /is-it-friday cross-verifies the day of the week using the IERS Earth rotation bulletin, Julian Day Numbers, NASA's JPL Horizons DE441 planetary ephemeris, DNS round-trip triangulation, and Zeller's 1882 congruence formula. /am-i-online audits all seven OSI layers, checking ICMP pings to DNS root servers, BGP prefix visibility across 300+ global peers via RIPE RIS, and NOAA outage signals, returning a score out of 100 with verdicts like 'PHILOSOPHICALLY QUESTIONABLE.' /weather derives local conditions from first principles without a weather API, computing solar irradiance from the Kasten-Young formula and decoding raw METAR reports field-by-field.",
      image: "/images/projects/skill-rot.png",
      imageFit: "contain",
      tags: ["Claude Code", "Python", "CLI", "APIs & Data Engineering", "Satire", "Developer Tools"],
      githubUrl: "https://github.com/lorenjphillips/skill-rot"
    },
    {
      title: "Headless Horsemen: AI Demo Video Generator",
      shortDescription: "Give it a URL and a task, get back a narrated demo video; built in 48 hours at the YC x Browserbase hackathon.",
      fullDescription: "**What is Headless Horsemen?** Give it a URL and a task description and the system returns a polished, narrated MP4 demo video. Built in under 48 hours for the YC x Browserbase hackathon, it autonomously navigates websites and composes the footage into a professional product demo without any manual recording setup. **Four-Stage Pipeline** First, Gemini 2.0 Pro generates a structured JSON action plan from the user's prompt (Navigate, Act, Scroll, Wait steps). Second, that plan executes inside a Browserbase cloud Chromium instance controlled via Stagehand, a natural-language browser automation framework, with a custom screenshot loop at ~15fps using direct CDP calls. Third, Gemini 2.5 Flash TTS generates step-by-step voice narration. Fourth, FFmpeg interpolates screenshots to 60fps, burns in captions, mixes AI-generated background music via Google Lyria 3, and outputs an H.264 MP4. **Memory & API** ChromaDB stores completed demo embeddings for few-shot context on future requests. A lightweight Express server exposes REST endpoints for job creation, real-time status, and video streaming, backed by a dark-themed web UI with a live progress display.",
      image: "/images/projects/headless-horsemen.png",
      tags: ["Browserbase", "Stagehand", "Gemini API", "Browser Automation", "AI Video Generation", "TypeScript"],
      githubUrl: "https://github.com/lorenjphillips/headless-horsemen"
    },
    {
      title: "Programmatic SEO Content Pipeline",
      shortDescription: "A Git-versioned TypeScript pipeline running an SEO operation end to end across 100+ tracked pieces.",
      fullDescription: "A programmatic SEO content system built in TypeScript that runs an entire organic-growth content operation, from keyword-researched briefs to published articles, as a single, version-controlled Git repository instead of a sprawl of Google Docs tabs. Because every brief, draft, and index lives in the repo, the whole pipeline is diffable, reviewable, and reproducible. **Repository Structure** The library is organized into purpose-built directories: a content/ tree split into upcoming/ (content briefs enriched with keyword research) and finished/ (full articles pulled down from Google Docs); an INDEX.md master index that tracks every piece alongside keyword volume and difficulty metadata; a context/ folder of product feature docs that serves as the source-of-truth so generated copy stays accurate and on-brand; a scripts/ folder of sync and maintenance automation; and a slack/ folder capturing channel intelligence and marketing context. At last count the index tracked 103 pieces: 33 finished articles and 70 upcoming briefs. **Sync Layer** The core automation is sync-content.sh, a shell orchestrator that bridges a master Google Sheet (the 'SEO/GEO Content Production Sheet') and Google Docs through the Sheets and Drive REST APIs. It exposes targeted modes to keep iterative sessions cheap: --full runs a complete sheet-plus-docs sync, --sheet-only checks the sheet for newly added rows, and --docs-only re-pulls article text from Docs. Every run performs bidirectional count-validation, reconciling sheet rows against files on disk so a partial API response can never silently drop or overwrite content. **Publishing Pipeline** A publishing script ships approved articles to a live Framer site via the Framer CMS Server API. It parses YAML frontmatter, converts Markdown to HTML, introspects the CMS collection schema dynamically at runtime, and maps each article field to the correct Framer field ID before promoting a file from review to finished. No hand-copying, no stale field mappings. **Community Intelligence** To ground keyword choices in real demand, a founder-community chat export (~7,400 lines) was mined for search-intent signals and topic gaps, sourcing roughly 28 additional briefs that fed the upcoming queue and sharpened prioritization. **The Result** Production Sheet → Google Docs → automated sync scripts → an organized, Git-tracked content library → published pages: work that is usually manual copy-paste content ops becomes a repeatable, auditable system a single command can drive.",
      image: "/images/projects/coval-seo.png",
      imageFit: "contain",
      tags: ["TypeScript", "Bash Automation", "SEO Automation", "Framer CMS API", "Google Sheets API", "Programmatic Publishing"],
      githubUrl: "https://github.com/lorenjphillips/coval-seo"
    },
    {
      title: "TokenWise: LLM Token Compression",
      shortDescription: "A web app that compresses prompts before they reach an LLM, cutting token cost while preserving meaning.",
      fullDescription: "TokenWise tackles a practical problem in working with large language models: token cost. By compressing prompts before they hit the model, the app reduces the tokens consumed per request, lowering API spend without sacrificing the model's ability to understand intent. **Comparison Mode** Rather than guessing which compression style wins, TokenWise runs three methods side by side on the same input. **Baseline** strips stopwords, transition phrases, and non-essential punctuation into dense-but-readable text ('This is an example of how compression works' becomes 'example compression works'). **Millennial** applies regex-based slang and texting transformations (phonetic substitutions and abbreviations) for maximum character reduction. **LLM-Optimized** is tuned to keep the structure models parse most reliably. A companion 'Why over-compression fails' explainer shows where aggressive compression begins to degrade comprehension, so users can find the sweet spot instead of blindly minimizing tokens. **Cost & Token Awareness** The interface is model-aware: pick a target model (e.g. GPT-4.1 Mini at $0.40/1M input, $1.60/1M output) and TokenWise live-estimates the token count and cost of your input, updating a stats panel (tokens_in, cost_est) as you type. Built-in example presets ([ex1]-[ex4]) let you benchmark different writing styles quickly, and advanced settings expose knobs for tuning the compression pipeline. **Architecture** Serverless functions handle the compression logic and OpenAI API calls, deployed on Vercel. The frontend (React, TypeScript, and Tailwind CSS wrapped in a retro terminal aesthetic) provides a clean interface for comparing token counts before and after compression, while decompression utilities calculate character-reduction percentages and readability scores.",
      image: "/images/projects/tokenwise.png",
      tags: ["React", "TypeScript", "Node.js", "LLM", "OpenAI", "Token Optimization", "Vercel"],
      githubUrl: "https://github.com/lorenjphillips/llm-compression-demo"
    },
    {
      title: "Archie: AI-Powered Dating Confidante & Matchmaker",
      shortDescription: "A voice-first dating assistant that matches people through natural conversation rather than swiping.",
      fullDescription: "**What is Archie?** Archie is an AI-powered dating confidante designed to guide users toward meaningful, long-term connections. Operating as a simple phone number for calls and texts, Archie represents a fundamental shift from traditional dating apps by fostering authenticity through natural conversations. There's no app download required, just genuine, voice-first interactions with a friendly, empathetic AI that's slightly playful and always supportive. **Profile Creation & Understanding** Archie builds comprehensive user profiles through 7-8 minute phone calls, gathering insights about personality, interests, dating preferences, and future goals without typing pressure. The AI continuously learns from conversations and date feedback, capturing behavioral insights including routines, habits, values, and lifestyle details for better matching. **Smart Matching Process** Using relationship science research, Archie considers factors like mutual connections, education, location, and user intent to predict real-life chemistry. Matches are introduced individually via detailed text messages explaining compatibility factors, with a double opt-in system ensuring mutual interest before introductions. **24/7 Support & Coaching** Available around the clock for post-match support, date planning assistance, and personalized coaching. Archie helps users discuss potential matches, gathers feedback to refine the algorithm, and provides insights after each interaction to improve future dating experiences. **Proven Results & User Feedback** During beta testing, Archie facilitated successful matches with 70% profile completion rates and 8.7-minute average call durations. Users described conversations as 'very natural' and 'strangely comfortable,' with high engagement and anticipation for matches. The platform addresses dating app fatigue by eliminating appearance-based swiping and fostering authentic connections in a judgment-free environment.",
      image: "/images/projects/archie-ai-preview.jpg",
      tags: ["AI", "Dating Technology", "Voice AI", "Matchmaking", "Conversational AI"]
    },
    {
      title: "ImprintAI: Voice Cloning & AI Persona Platform",
      shortDescription: "An open-source platform building digital twins from zero-shot voice synthesis and RAG knowledge bases.",
      fullDescription: "ImprintAI addresses the high cost barrier of commercial voice cloning solutions (Resemble AI: $700+, 11Labs: $1300+) by leveraging cutting-edge open-source models. The platform combines ChatterboxTTS for zero-shot voice synthesis with Stella EN 1.5B embeddings for intelligent document retrieval, creating a comprehensive AI persona system. The architecture implements Retrieval Augmented Generation (RAG) to enable context-aware responses from uploaded documents, supporting multiple file formats (PDF, DOC, TXT). Key technical achievements include sub-200ms voice generation on GPU hardware, 44.1kHz audio quality output, and integration of a 1.5B parameter embedding model with an industry-leading MTEB score of 64.4. The system requires only 3-5 seconds of audio input for accurate voice cloning and includes personality configuration capabilities for custom AI persona creation. The full-stack implementation uses FastAPI for backend services, React with TypeScript for the frontend, and ChromaDB for vector-based document storage and retrieval. This project demonstrates the feasibility of democratizing voice AI technology through open-source alternatives while maintaining professional-grade performance standards.",
      image: "/images/projects/imprintai.png",
      videoUrl: "https://www.youtube.com/watch?v=i67Q6FFod6o",
      linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7336095738461921280/",
      tags: ["AI", "Voice Cloning", "Machine Learning", "RAG", "FastAPI", "React", "Open Source", "TTS"]
    },
    {
      title: "Replicating Natural Nanoscale Structural Color",
      shortDescription: "Replicating the nanoscale structural color found in nature for use in sensors, displays, and photovoltaics.",
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
      shortDescription: "An object detection model that identifies cars on track for route planning, collision avoidance, and overtaking.",
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
      shortDescription: "Solution-synthesised metal nanoparticles assembled into films for LSPR-based biosensing at scale.",
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
      shortDescription: "A piezoelectric sleeve that harvests kinetic energy from arm movement to power autonomous glucose monitoring.",
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
      shortDescription: "A bone scaffolding proposal using 3D-printed hydroxyapatite-reinforced chitosan hydrogels for cartilage damage.",
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
      shortDescription: "A research proposal applying nanophotonics to medical imaging technology.",
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
      shortDescription: "A package-delivery drone built to navigate obstacles, which won the best design award.",
      fullDescription: "This is a special project to me, primarily because I won a $25 gift card which officially marks my first time as a 'paid' engineer! I was tasked with building a drone to transport a small package from one location to another roughly 25 yards away, while flying through and around obstacles. Competing against nearly 50 other students, I won the award for best design, and also was the only student to complete the challenge. I remember this experience fondly as my first time leveraging CAD design and 3D printing to achieve a specific goal. This sparked my interest in drones and resulted in my career as a drone photographer during high school.",
      image: "/images/projects/drone.jpg",
      tags: ["Drone Design", "CAD", "3D Printing", "Aerospace"],
    },
    {
      title: "Photovoltaic Cell",
      shortDescription: "A miniature photovoltaic cell built with graphene layering on a microchip.",
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
// gallery entries are authored as bare paths; normalise them to ProjectImage
// so consumers never have to guess which shape they are handling.
export const projects: Project[] = (raw as Array<Record<string, unknown>>).map((p) => ({
  ...(p as Omit<Project, "slug" | "gallery">),
  gallery: Array.isArray(p.gallery)
    ? (p.gallery as Array<string | ProjectImage>).map((g) =>
        typeof g === "string" ? { src: g } : g,
      )
    : undefined,
  slug: slugify(p.title as string),
}));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
