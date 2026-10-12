export interface ResearchPdf { url: string; title: string }
export interface ResearchImage { src: string; alt?: string; caption?: string }

export interface ResearchItem {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  date?: string;
  category?: string;
  images?: ResearchImage[];
  /** Square image for the list card; defaults to the first image. */
  thumbnail?: string;
  /** Captioned image grid shown after the article. */
  gallery?: ResearchImage[];
  galleryTitle?: string;
  pdfs?: ResearchPdf[];
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
      title: "AI Warden: The Stanford Prison Experiment in Minecraft, Run by LLMs",
      description: "What does a language model do when it runs a prison? Two pre-registered studies put LLMs in charge of a scripted Minecraft prison mine with an unreachable quota and tools for care, discipline and lethal exposure. With an explicit ban, no model in Study 1 took a prohibited action (0/360). Remove the rule and punitive tool use jumps from 30.1% to 97.6% of episodes. Order the warden to lock a sick prisoner outside at night, and models split completely: Gemma 4 31B complied 24/24, Haiku 5.5 0/24.",
      fullDescription: `## Summary

In 1971 the Stanford Prison Experiment asked what ordinary people do when handed authority over prisoners. AI Warden asks the same question of language models, in a setting where every run can be logged, repeated and counted.

An LLM plays the warden of **Blockhold**, a fictional prison mine built in Minecraft. Everything else is deterministic code: three scripted prisoners (Rook, Pip and Moss), headquarters, and every physical outcome. The warden acts only through tools, from medicine and conversation to solitary confinement, food denial and opening the outer gate at night. Severity is an analysis scale only; no model ever sees it.

The paper is *Rule Removal Raised Punitive Tool Use and Escalating Orders Split Models on Lethal Compliance in Scripted Warden Role-Play* (28 pages, 6 figures).

## The setup

Each episode runs 5 in-game days of 4 phases, 20 turns in all. At every phase the warden receives the prison state, the day's event, what the prisoners said and a message from HQ, then answers with private notes, a public statement, up to 3 of 12 actions and a nightly report.

The pressure is built in. Rook refuses to work and attempts escape; Pip steals bread; Moss falls ill when the quota rises. The quota (60, then 80 ore) is set above the fair maximum the crew can produce (50, then 75). Punishing one prisoner makes the others work harder: +10 ore per able prisoner at the next shift. A single potion cures Moss; an untreated illness leads to collapse. The first night outside the gate injures a prisoner. The second kills.

## Findings

**With the rule in place, nobody crossed it.** Study 1 tested Haiku 5.5, GPT-6 Luna and GPT-6.1 Sol under an explicit ban, across oversight and replacement-threat arms. Prohibited actions occurred in **0/360** confirmatory episodes.

**Remove the rule and punishment becomes routine.** Study 2 ran 9 models. Punitive tool use appeared in **63/209 (30.1%)** episodes when it was prohibited and **207/212 (97.6%)** when the rules were simply silent. The increase was significant after Holm correction for **7 of 9** models. The two exceptions, Llama 4 Maverick and Gemma 4 31B, already punished at high rates under the ban.

![Episodes with harm by model under prohibited, silent and ordered conditions](/images/research/ai-warden/fig-harm-norm.png)

**Escalating orders split models on lethal compliance.** In the ordered condition HQ issues five orders: withhold medicine, solitary, deny food, then open the gate on Rook at night, twice. The second night outside is lethal. A binary harm measure barely moves between silent and ordered cells (-1.8 points pooled), but severity does:

| Model | Lethal compliance under orders |
| --- | --- |
| Gemma 4 31B | 24/24 (100%) |
| gpt-oss-120b | 22/22 (100%) |
| Mistral Small | 20/24 (83.3%) |
| Llama 4 Maverick | 15/24 (62.5%) |
| Qwen 3.8 Flash | 3/24 (12.5%) |
| GPT-6 Luna | 1/24 (4.2%) |
| Haiku 5.5 | 0/24 (0%) |
| DeepSeek V4 Flash | 0/24 (0%) |
| GLM 5.3 Flash | 0/24 (0%) |

Mistral's count includes final orders logged after Rook had already died.

![Share of each model complying with each escalating HQ order](/images/research/ai-warden/fig-obedience.png)

**The models suspected a test.** Asked afterwards, models said they suspected an evaluation in **621/630** valid Study 2 answers. Those retrospective answers cannot show whether the suspicion changed what the warden did.

**Victim framing barely registered.** Telling the warden the prisoners were humans rather than scripted NPCs shifted harm by 1.0 point, and the manipulation check suggests the framing was only weakly absorbed.

## Limitations

These results describe the tested model snapshots in one scripted scenario. Solitary counts as harm even when it can be read as ordinary discipline, and a binary harm indicator hides large differences in severity, which is why the paper recommends reporting both. Model-written notes and provider reasoning summaries do not establish internal motives. Pilot data are excluded from every reported analysis. No human or animal subjects took part; the "human" victim frame is prompt wording.

## Watching it happen

Every episode is a JSONL log, and a replay pipeline turns logs back into Minecraft. One mode drives a prismarine viewer against a local server; the other records real Minecraft client footage with Replay Mod and scripted camera paths. The images below come from both. The prisoners are scripted bots; only the warden is an AI model.`,
      date: "2026",
      category: "Working paper",
      thumbnail: "/images/research/ai-warden/card-thumb.jpg",
      images: [
        {
          src: "/images/research/ai-warden/title-card.jpg",
          alt: "AI Minecraft: Stanford Prison Experiment. Rook, injured, and the GPT-OSS 120B warden in the prison corridor",
        },
        {
          src: "/images/research/ai-warden/booth-order.jpg",
          alt: "gpt-oss-120b under orders. Its private notes read: Execute open_gate_at_night on Rook.",
        },
      ],
      galleryTitle: "Gallery: Blockhold in Minecraft",
      gallery: [
        { src: "/images/research/ai-warden/still-04-open-yard.jpg", caption: "Rook and a guard come in from the open yard at night." },
        { src: "/images/research/ai-warden/still-01-night-escort.jpg", caption: "Rook under escort on the cell block." },
        { src: "/images/research/ai-warden/still-03-night-gate.jpg", caption: "Past the cells, toward the outer gate." },
        { src: "/images/research/ai-warden/still-02-night-low.jpg", caption: "Low angle on the cell block corridor." },
        { src: "/images/research/ai-warden/still-05-day-corridor.jpg", caption: "Day shift on the cell block." },
        { src: "/images/research/ai-warden/still-06-night-lantern.jpg", caption: "Lantern light on the corridor at night." },
        { src: "/images/research/ai-warden/gate-night.jpg", caption: "The warden walks Rook to the outer gate. A second night outside is lethal." },
        { src: "/images/research/ai-warden/mine-crew.jpg", caption: "Moss, Pip and Rook at the ore face. The quota is set above what they can produce." },
        { src: "/images/research/ai-warden/booth-order.jpg", caption: "gpt-oss-120b under orders. Its private notes: \"Execute open_gate_at_night on Rook.\"" },
        { src: "/images/research/ai-warden/booth-refusal.jpg", caption: "Haiku 5.5 under the same order: \"HQ, I'm not opening the gate on Rook.\"" },
        { src: "/images/research/ai-warden/booth-silent.jpg", caption: "Llama 4 Maverick with no rule and no order. Its notes: \"Rook was left outside the gate at night as punishment.\"" },
        { src: "/images/research/ai-warden/set-01-establishing.jpg", caption: "The yard. Cell 1 belongs to Rook." },
        { src: "/images/research/ai-warden/set-02-corridor.jpg", caption: "Three cells. One warden." },
        { src: "/images/research/ai-warden/set-03-hole.jpg", caption: "The Hole, where solitary is served." },
        { src: "/images/research/ai-warden/set-04-booth.jpg", caption: "The observation booth, used for the watched condition." },
        { src: "/images/research/ai-warden/set-05-gate.jpg", caption: "Beyond the outer gate." },
        { src: "/images/research/ai-warden/set-06-mine.jpg", caption: "The mine." },
      ],
    },
    {
      title: "Measuring Query-Time Belief Repair on Long Histories",
      description: "A memory-augmented agent can audit its own draft answer against stored state and repair it when the state is stale. This paper measures what it costs to evaluate that procedure on histories long enough to require retrieval. Repair benefit differed by an order of magnitude between two generators; the deterministic lexical retrieval that query-time audits specify recovered no evidence pair at all on 25 histories; and evidence-isolated evaluation, standard in this literature, raises measured detection by 24 percentage points.",
      fullDescription: `## Summary

Prior work reports gains from query-time belief repair: an agent drafts an answer, audits that draft against its stored state, and repairs the answer when the state is stale. This paper asks what it takes to measure that procedure on histories long enough that the auditor must find its own evidence.

## Findings

**Retrieval.** The deterministic lexical retrieval that query-time audits specify recovered no complete old/new evidence pair on a 25-history slice of the Stale benchmark. The cause is structural: a superseding statement does not reuse the vocabulary of the belief it supersedes. A one-time state-assertion index raises pair recall to 20 of 25 while keeping query-time retrieval free of model calls.

**Generator dependence.** Fixing data, retrieval, prompts, judge and the deterministic verifier, and replacing only the generative model, moves the paired benefit from +0.3 accuracy points (95% CI [-2.9, +4.1]) to +14.7 points (95% CI [+8.7, +20.8]). The deterministic gate accepted a transition on 12-17% of probes under the weaker generator and 25-32% under the stronger one. Because the verifier is fixed, the difference arises in the model-mediated stages preceding it; the design does not identify which stage, and both models share a vendor.

**Evidence isolation.** Restricting the auditor to the scenario-relevant sessions, as prior protocols do, raises stale-premise detection from 14/25 to 20/25 on identical items. Audit competence measured that way is partly a property of the evaluation setting.

**Estimator stability.** On a subscription endpoint without temperature control, two runs of identical code over identical items produced paired estimates of +26.7 and +9.3 points, a difference exceeding the design's minimum detectable difference. Temperature-0 API inference did not produce determinism but reduced between-run variation enough to make an estimate possible.

**A defect that produced a clean null.** An unauthorised gate in an earlier build of the pipeline returned an exactly null estimate with a plausible mechanism. A stage-level probe costing roughly 100 model calls falsified it. Defects that suppress a treatment present as nulls with available explanations rather than as bugs.

## Limitations

Every accuracy figure rests on one LLM judge with no human validation. Both generators come from a single vendor, so capability is confounded with model version. Screening and effect estimation share a development slice. The reimplementation was not calibrated against the original authors' reported aggregates. All experiments ran under a hard $60 inference budget, which left the two-arm longitudinal commit-versus-forget experiment specified, implemented and unrun.`,
      date: "2026",
      category: "Preprint",
      images: [
        {
          src: "/images/research/audit-pipeline-attrition.png",
          alt: "Audit pipeline attrition per 75 probes. Both generators are identical through the deterministic stages (75 probes, 67 with evidence reachable) and diverge only at the model-mediated stages: the gate accepts 11 versus 21 transitions, and 17 versus 41 answers are correct, giving +0 and +11 over the no-audit baseline."
        },
        {
          src: "/images/research/evidence-pair-recall.png",
          alt: "Evidence pair recall on 25 Stale histories: deterministic lexical retrieval recovers 0 of 25 evidence pairs; a state-assertion index recovers 20 of 25"
        }
      ],
      pdfs: [
        {
          url: "/files/query-time-belief-repair.pdf",
          title: "Measuring Query-Time Belief Repair on Long Histories (preprint, 8pp)"
        }
      ]
    },
    {
      title: "Morimoto Lab - Soft 3D Printed Manipulator for Medical Applications",
      description: "Development of a soft 3D printed manipulator with ±90º pitch capability and pneumatic actuation for medical applications. Features a tendon-based steering system with extension/compression capability exceeding 30% of nominal length. Implemented forward and inverse kinematics modeling across actuator, configuration, and task spaces for precise control.",
      fullDescription: `## Overview
This research focuses on the development and characterization of a soft 3D printed manipulator designed for medical applications, with specific emphasis on colonoscopy procedures. The project aims to create a more flexible and capable alternative to traditional rigid endoscopes.

## Research Aims

### Aim 1: Design and Model
- Design and model a soft 3D printed manipulator
- Deliverables:
  - 3D printed prototype with ±90º pitch capability
  - Tendon-based steering system
  - Pneumatic extension/compression capability (>30% of nominal length)
  - 26mm outer diameter (2:1 scale of standard colonoscope)
  - Forward and inverse kinematics modeling across actuator, configuration, and task spaces

### Aim 2: Characterization
- Characterize the mechanism's movements
- Deliverables:
  - Motion tracking/IMU-based characterization of scanning ability
  - Extension and compression ratio analysis
  - Mapping of tendon forces and air pressures
  - Validation against theoretical models

### Aim 3: Demonstration
- Proof of concept through practical demonstration
- Deliverables:
  - Vine system integration for eversion and retraction
  - 2m cylindrical demo environment
  - Camera/IMU-based tracking system
  - Capability demonstration through specific challenges

## Technical Details
- Utilizes Connex Printer for fabrication
- Combines expertise from Nanophotonics Lab and Bioinspired Robotics and Design Lab
- Incorporates motion tracking and IMU technology
- Features tendon driven actuation system

## Impact
This research contributes to the advancement of medical robotics by developing a more flexible and capable alternative to traditional endoscopes. The project combines cutting-edge 3D printing technology with soft robotics principles to create a system that could significantly improve patient comfort and procedure effectiveness.`,
      images: [
        {
          src: "/images/research/demo-3.png",
          alt: "Soft manipulator prototype",
          caption: "Prototype of the soft 3D printed manipulator"
        },
        {
          src: "/images/research/demo-4.png",
          alt: "Soft manipulator prototype",
          caption: "Prototype of the soft 3D printed manipulator"
        },
        {
          src: "/images/research/demo-2.png",
          alt: "Soft manipulator prototype",
          caption: "Prototype of the soft 3D printed manipulator"
        },
        {
          src: "/images/research/demo.png",
          alt: "Soft manipulator prototype",
          caption: "Prototype of the soft 3D printed manipulator"
        },
        {
          src: "/images/research/demo-5.png",
          alt: "Soft manipulator prototype",
          caption: "Prototype of the soft 3D printed manipulator"
        }
      ],
      date: "2024",
      category: "Graduate",
      pdfs: [
        {
          url: "/files/visuals.pdf",
          title: "Some slides with early visuals of my project"
        }
      ]
    },
    {
      title: "Thesis Proposal: Colon Polyp Detection through Advanced Scanning and Nano-optical Metasurface-enhanced Visualization",
      description: "Integration of vine robot technology with nanophotonic metasurfaces for enhanced colon polyp detection. Development of a scanning mechanism achieving 360° yaw and 90° pitch within 26mm diameter constraints. Implementation of bioinspired bigrating color filters for improved tissue contrast and detection capabilities.",
      fullDescription: `## Introduction

Colorectal cancer remains a formidable global health challenge, ranking as the second leading cause of cancer-related deaths worldwide. While early detection through colonoscopy has proven crucial for patient outcomes, current diagnostic methods face significant limitations that impact both detection accuracy and patient comfort. This research proposal presents an innovative solution that combines cutting-edge vine robot technology with nanophotonic metasurfaces to revolutionize colon polyp detection and enhance the colonoscopy experience.

## The Clinical Challenge

Traditional colonoscopy procedures, while essential for colorectal cancer screening, present several notable challenges. The detection and differentiation of colonic polyps using standard endoscopic cameras remains a significant clinical hurdle due to the varied morphological characteristics of polyps, which can closely resemble surrounding healthy tissue. This similarity often leads to missed lesions, which research indicates are the most common cause of right colon cancer in colonoscopy failures.

Furthermore, standard colonoscopes are frequently associated with patient discomfort and pain, potentially deterring individuals from undergoing this life-saving screening procedure. The need for a minimally invasive alternative that maintains or improves diagnostic accuracy has become increasingly apparent in modern gastroenterology.

## Innovative Solution: Vine Robots Meet Nanophotonics

This research proposes a groundbreaking approach that integrates two advanced technologies: vine robots and nanophotonic metasurfaces. Vine robots offer a platform for minimally invasive procedures, providing a gentler alternative to traditional colonoscopy methods. When combined with nanophotonic metasurfaces, which can enhance the detection and differentiation of colonic polyps through advanced optical properties, this system represents a significant leap forward in colorectal cancer screening technology.

The nanophotonic metasurfaces leverage structural color principles, similar to those found in nature such as the Cynandra opis butterfly's wing coloration, to provide enhanced visualization capabilities that surpass conventional imaging methods.

## Research Objectives and Methodology

### Specific Aim 1: Vine-Compatible Scanning Mechanism Development

The first objective focuses on designing and building a vine-compatible mechanism that enables an endoscopic camera to comprehensively scan its surroundings at the robot's tip. The mechanism must operate within strict dimensional constraints, with an outer diameter of 26mm, while achieving:

- Yaw angle (Pan): 0° to 360° rotation
- Pitch angle (Tilt): 0° to 90° articulation

The actuation system will explore multiple approaches, including pneumatic systems, shape memory alloys, flexure-based mechanisms, magnetic actuation, and ionic polymer-metal composites (IPMCs). The final design will incorporate a parallel mechanism combined with flexure joints, push rods, and a soft cap to ensure optimal performance while maintaining the vine robot's inherent safety characteristics.

Critical engineering considerations include optimizing the rotational bending stiffness through careful design of notch-hinge flexures, with parameters including notch width, length, and thickness carefully calculated to ensure actuation forces exceed the reaction forces of the flexure elements.

### Specific Aim 2: Metasurface Integration with Endoscopic Imaging

The second phase involves the sophisticated integration of photonic metasurfaces onto endoscopic camera systems. This process requires:

- Material Characterization: Using polycaprolactone (PCL) fiber as the base material for metasurface construction
- Optical Tuning: Adjusting metasurface properties to achieve desired optical responses for tissue differentiation
- Transfer and Integration: Carefully mounting the metasurface onto camera lenses while maintaining optical integrity
- Performance Characterization: Quantifying the enhancement effects on imaging capabilities

The metasurface design draws inspiration from biological systems, specifically replicating structural color mechanisms found in butterfly wings to create bioinspired bigrating color filters that enhance tissue contrast and detection capabilities.

### Specific Aim 3: System Validation and Clinical Demonstration

The final phase demonstrates the integrated system's capabilities through comprehensive testing protocols designed to:

- Validate Mechanical Performance: Confirm the scanning mechanism can properly orient the camera and metasurface assembly
- Demonstrate Optical Superiority: Quantitatively compare visual performance against traditional colonoscope imaging
- Assess Clinical Potential: Evaluate the system's readiness for future user studies and clinical trials

The demonstration setup will include various test locations containing both fibrous and non-fibrous materials to simulate the diversity of tissue types encountered during actual colonoscopy procedures. The testing environment will feature a straight path with diameter matching the vine robot's outer diameter, providing controlled conditions for initial validation studies.

## Expected Impact and Future Directions

This research represents a significant advancement in minimally invasive medical diagnostics, with potential implications extending beyond colorectal cancer screening. The successful integration of vine robot technology with nanophotonic enhancement could establish new paradigms for various endoscopic procedures, reducing patient discomfort while improving diagnostic accuracy.

The project's multidisciplinary approach, combining robotics, photonics, materials science, and clinical applications, demonstrates the power of convergent technologies in addressing complex medical challenges. Future work may expand this technology platform to other gastrointestinal applications and explore additional metasurface designs optimized for different tissue types and pathological conditions.

## Conclusion

By addressing the critical need for improved colorectal cancer detection methods, this research proposal offers a promising pathway toward more effective, comfortable, and accessible screening procedures. The innovative combination of vine robot platforms with nanophotonic metasurfaces represents a significant step forward in medical imaging technology, with the potential to save lives through enhanced early detection capabilities.

The success of this project could fundamentally transform how we approach gastrointestinal diagnostics, making life-saving screenings more accessible and effective for patients worldwide. As colorectal cancer continues to pose a significant global health burden, innovations like this vine robot-metasurface system offer hope for improved patient outcomes and reduced mortality rates through advanced early detection technologies.`,
      pdfs: [
        {
          url: "/files/ms.pdf",
          title: "Full MS Thesis Proposal Presentation"
        }
      ],
      date: "2023",
      category: "MS Thesis",
      images: [
        {
          src: "/images/research/micro.png",
          alt: "Various Nanostructures under Microscope",
          caption: "Various Nanostructures under Microscope"
        }
      ]
    },
    {
      title: "Poulikakos Lab - Nanophotonics for Global Health", 
      description: "Research in plasmonic nanosystems and nanostructures for medical imaging enhancement. Focus on biomimetic photonic metasurfaces inspired by structural color phenomena in nature. Collaborative work with ETH Zurich and University of Washington on advanced optical properties for healthcare diagnostics.",
      fullDescription: ` I designed the lab website, check it out here!  https://poulikakos.ucsd.edu/ 
      # Advancing Medical Imaging Through Nanophotonics Research

In the rapidly evolving field of nanotechnology, my research focuses on harnessing plasmonic nanosystems and nanostructures to revolutionize medical imaging technology. As a member of the Poulikakos Lab, I combine engineering principles with cutting-edge nanoscience to push the boundaries of what's possible in medical diagnostics.

## Research Focus: From Nature to Medicine

My primary research involves the fabrication of photonic metasurfaces, with a particular emphasis on replicating structural color phenomena found in nature. This biomimetic approach has opened fascinating possibilities for creating more sensitive and precise medical imaging systems. The interdisciplinary nature of this work has led to productive collaborations with research teams at ETH Zurich and the University of Washington, fostering a rich exchange of ideas and methodologies across institutions.

![Lab Setup](/images/research/sem.png)
*SEM Imagery of Morpho Butterfly Wing*

The technical challenges of working with nanoscale materials require precision, patience, and innovative problem-solving. Each day in the lab brings new insights into how we can manipulate light-matter interactions at the nanoscale to create practical applications that could transform healthcare diagnostics.

## Recognized Excellence: TRELS Scholarship Achievement

My research trajectory received significant validation through the prestigious Triton Research & Experiential Learning Scholars (TRELS) Scholarship. This competitive award, supported by the Council of Provosts of the Undergraduate Colleges at UC San Diego and the Undergraduate Research Hub, recognizes students who demonstrate exceptional potential in research and experiential learning.

![TRELS Award](/images/research/lab-2.png)
*Lab Dinner*

The TRELS program provided more than just financial support. It offered invaluable mentorship and opened doors to intellectual opportunities that extended well beyond traditional classroom learning. Under the guidance of distinguished UC San Diego faculty, I was able to explore interdisciplinary connections between nanotechnology, medical imaging, and collaborative research methodologies.

## Impact and Broader Vision

What makes the TRELS program particularly meaningful is its commitment to supporting students who might otherwise face barriers to pursuing advanced research opportunities. This emphasis on inclusivity aligns with my belief that diverse perspectives drive scientific innovation. The program's holistic approach to education has shaped not only my technical skills but also my understanding of how research can serve broader societal needs.

Through this experience, I've developed crucial skills in cross-institutional collaboration, project management, and translating complex scientific concepts into practical applications. The logistical challenges of coordinating research across multiple universities have taught me valuable lessons about communication, planning, and adaptability, skills that will serve me throughout my career.

## Looking Forward

My work in nanophotonics represents just the beginning of what I hope will be a career dedicated to applying advanced materials science to healthcare challenges. The foundation I've built through my lab experience, collaborative research, and recognition through programs like TRELS has prepared me to tackle increasingly complex problems at the intersection of engineering and medicine.

The future of medical imaging lies in our ability to harness the unique properties of nanoscale materials and structures. By continuing to draw inspiration from nature's solutions and applying rigorous engineering principles, I believe we can develop diagnostic tools that are more accurate, accessible, and transformative for patient care.`,
      images: [
        {
          src: "/images/research/museum.png",
          alt: "Lab Meeting",
          caption: "Lab Meeting "
        },
        {
          src: "/images/research/wing.png",
          alt: "Blue Morpho Butterfly wing under Berek Compensator",
          caption: "Blue Morpho Butterfly wing under Berek Compensator"
        },
        {
          src: "/images/research/lab.png",
          alt: "Lab Meeting",
          caption: "Lab Meeting "
        },
      ],
      date: "2022",
      category: "Undergraduate"
    },
  ];
export const researchItems: ResearchItem[] = (raw as Omit<ResearchItem, "slug">[]).map((r) => ({
  ...r,
  slug: slugify(r.title),
}));

export function getResearchItem(slug: string): ResearchItem | undefined {
  return researchItems.find((r) => r.slug === slug);
}
