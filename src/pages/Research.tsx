import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DetailModal from "@/components/DetailModal";
import { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// PDF viewer options
const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
};

export default function Research() {
  const [selectedResearch, setSelectedResearch] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const researchItems = [
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

The TRELS program provided more than just financial support—it offered invaluable mentorship and opened doors to intellectual opportunities that extended well beyond traditional classroom learning. Under the guidance of distinguished UC San Diego faculty, I was able to explore interdisciplinary connections between nanotechnology, medical imaging, and collaborative research methodologies.

## Impact and Broader Vision

What makes the TRELS program particularly meaningful is its commitment to supporting students who might otherwise face barriers to pursuing advanced research opportunities. This emphasis on inclusivity aligns with my belief that diverse perspectives drive scientific innovation. The program's holistic approach to education has shaped not only my technical skills but also my understanding of how research can serve broader societal needs.

Through this experience, I've developed crucial skills in cross-institutional collaboration, project management, and translating complex scientific concepts into practical applications. The logistical challenges of coordinating research across multiple universities have taught me valuable lessons about communication, planning, and adaptability—skills that will serve me throughout my career.

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

  const handleCardClick = (research: any) => {
    setSelectedResearch(research);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResearch(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Research
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Research at UC San Diego Jacobs School of Engineering.
          </p>
        </div>

        {/* Research Items */}
        <div className="space-y-6">
          {researchItems.map((item, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-2 border-border/70 hover:border-border cursor-pointer hover:-translate-y-1 active:translate-y-0 hover:scale-[1.01] active:scale-[0.99]"
              onClick={() => handleCardClick(item)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="group-hover:text-accent-foreground transition-colors text-xl">
                    {item.title}
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md font-medium">
                      {item.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.date}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {item.description}
                  </p>
                  {item.images && item.images.length > 0 && (
                    <div className="w-32 h-32 relative rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.images[0].src}
                        alt={item.images[0].alt}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedResearch && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedResearch.title}
          description={selectedResearch.fullDescription}
          category={selectedResearch.category}
          date={selectedResearch.date}
          type="research"
          images={selectedResearch.images}
          pdfs={selectedResearch.pdfs}
        />
      )}
    </Layout>
  );
}
