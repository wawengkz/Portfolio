import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Camera, MapPin } from 'lucide-react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [projectImages, setProjectImages] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'education', 'projects'];
      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const contentArea = document.getElementById('content-scroll');
    if (contentArea) {
      contentArea.addEventListener('scroll', handleScroll);
      return () => contentArea.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (galleryOpen) {
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen, currentImageIndex]);

  const scrollToSection = (sectionId) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageUpload = (projectId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImages((prev) => ({ ...prev, [projectId]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openGallery = (images, startIndex = 0) => {
    setCurrentGallery(images);
    setCurrentImageIndex(startIndex);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setCurrentGallery([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
  };

  const experiences = [
    {
      id: 1,
      period: '2025 — Present',
      title: 'IT Support Specialist',
      company: 'Nextvas Inc.',
      description: 'Provided comprehensive hardware troubleshooting, repair, and technical support for organization\'s IT infrastructure. Configured and managed local network systems using MikroTik routers and switches. Developed custom inventory management system for IT equipment tracking and created an automated resume checker system for the HR department.',
      tech: ['MikroTik', 'Network Management', 'System Development', 'IT Infrastructure'],
      links: [
        { text: 'Company Page', url: 'https://www.facebook.com/p/NEXTVAS-INC-100086512502836/' }
      ]
    },
    {
      id: 2,
      period: '2024',
      title: 'Social Media Manager',
      company: 'Burgarage/Chow Express',
      description: 'Managed social media platforms and ads for both Burgarage and Chow Express brands. Edited video content and created engaging content for the business. Developed monthly content calendar for strategic posting.',
      tech: ['Social Media', 'Content Creation', 'Video Editing', 'Marketing'],
      links: []
    },
    {
      id: 3,
      period: '2024',
      title: 'Software Developer',
      company: 'AlgOctopus (NFT)',
      description: 'Developed custom image randomizer system for NFT generation using Algorand blockchain technology. Successfully generated and delivered 2,600 unique NFT images, contributing significantly to project success.',
      tech: ['Algorand', 'NFT Development', 'Image Processing', 'Blockchain'],
      links: [
        { text: 'View Project', url: 'https://www.blop.world/' }
      ]
    }
  ];

  const projects = [
    {
      id: 'pettapp',
      title: 'PetTapp',
      description: 'A full-stack pet care platform with React Native mobile app and React.js web application serving pet owners and business owners (veterinary clinics, grooming salons, pet shops, lodging facilities) with dual registration system. Features include admin verification, real-time booking, GPS tracking, payment processing (GCash/Maya), and push notifications.',
      tech: ['React Native', 'React.js', 'Node.js', 'Express.js', 'TypeScript', 'MongoDB'],
      links: [
        { text: 'Live Demo', url: 'https://pettapp-seven.vercel.app/' }
      ],
      defaultImage: '/pettapp-screenshot.png',
      hasDefaultImage: true
    },
    {
      id: 'familyflow',
      title: 'FamilyFlow: Household Task Tracker',
      description: 'Developed a native Android mobile application using Kotlin for household task management with household authentication via PIN validation. Features customizable drag-and-drop interface, real-time chat functionality, event calendar integration, and budget tracking.',
      tech: ['Kotlin', 'Android', 'Gradle', 'Agile/Scrum'],
      links: [],
      defaultImage: '/familyflow-thumbnail.png',
      hasDefaultImage: true,
      gallery: [
        '/familyflow1.png',
        '/familyflow2.png',
        '/familyflow3.png',
        '/familyflow4.png',
        '/familyflow5.png',
        '/familyflow6.png',
        '/familyflow7.png',
        '/familyflow8.png',
        '/familyflow9.png'
      ]
    },
    {
      id: 'brainbytes',
      title: 'BrainBytes AI',
      description: 'Architected and deployed a comprehensive CI/CD pipeline for AI tutoring platform using GitHub Actions with 6 automated workflows. Implemented Docker containerization with multi-environment deployment and comprehensive DevSecOps practices.',
      tech: ['Node.js', 'MongoDB', 'Docker', 'GitHub Actions', 'DevOps'],
      links: []
    },
    {
      id: 'connectly',
      title: 'Connectly Social Media API',
      description: 'Engineered a RESTful API for social media platform using Django and Django REST Framework, implementing authentication and authorization flows with token-based authentication for secure user access and post management.',
      tech: ['Python', 'Django', 'REST API', 'SQLite', 'Design Patterns'],
      links: []
    },
    {
      id: 'motorph',
      title: 'MotorPH Payroll System',
      description: 'Architected an enterprise-grade payroll management system using Java and SQL database, implementing role-based access control (RBAC) for HR administrators and employees with advanced OOP design patterns.',
      tech: ['Java', 'SQL Database', 'OOP', 'Maven'],
      links: []
    },
    {
      id: 'chowgarage',
      title: 'ChowGarage Restaurant Website',
      description: 'Designed and developed a fully responsive restaurant website using HTML5, CSS3, and JavaScript. Created wireframes and prototypes in Figma, implemented interactive navigation with hover effects, and integrated Google Maps API.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Figma', 'GitHub Pages'],
      links: []
    }
  ];

  return (
    <div className="portfolio">
      {/* Cursor Spotlight Effect */}
      <div 
        className="cursor-spotlight"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="profile-section">
              <div className="profile-image-container">
                <label className="profile-image" style={{ cursor: 'pointer' }}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" />
                  ) : (
                    <span className="profile-initial">LT</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <div className="status-indicator"></div>
              </div>
            </div>
            <h1>Lhenard Trinidad</h1>
            <h2>Full-Stack Developer</h2>
            <div className="location">
              <MapPin size={14} />
              <span>Calamba, Laguna, Philippines</span>
            </div>
            <p className="tagline">
              I build responsive and accessible web applications for the digital world.
            </p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">2026</div>
                <div className="stat-label">Expected Grad</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">6+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">Years Exp</div>
              </div>
            </div>
          </div>

          <div className="tech-showcase">
            <h3 className="tech-showcase-title">Tech Stack</h3>
            <div className="tech-showcase-grid">
              <span className="tech-badge">React</span>
              <span className="tech-badge">Node.js</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">MongoDB</span>
              <span className="tech-badge">Python</span>
              <span className="tech-badge">Docker</span>
            </div>
          </div>

          <nav className="nav">
            {['about', 'experience', 'education', 'projects'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-item ${activeSection === section ? 'active' : ''}`}
              >
                <span className="nav-line"></span>
                <span className="nav-text">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
              </button>
            ))}
          </nav>

          <div className="social-links">
            <a href="https://github.com/wawengkz" target="_blank" rel="noopener noreferrer" className="social-link">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin size={24} />
            </a>
            <a href="mailto:trinidadlhenard10@gmail.com" className="social-link">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="content" id="content-scroll">
        <div className="content-wrapper">
          {/* About Section */}
          <section
            ref={(el) => (sectionRefs.current['about'] = el)}
            id="about"
            className="section"
          >
            <div className="section-content">
              <p className="paragraph">
                I'm a passionate Full-Stack Developer currently pursuing my B.S. in Information Technology 
                with a specialization in Software Development at{' '}
                <a href="#" className="link">Mapua Malayan Digital College</a>.
              </p>
              <p className="paragraph">
                With hands-on experience in building mobile and web applications, I specialize in creating 
                scalable solutions using modern technologies like React, Node.js, and MongoDB. I've worked 
                on diverse projects ranging from pet care platforms to NFT generation systems.
              </p>
              <p className="paragraph">
                Currently working as an IT Support Specialist at{' '}
                <a href="#" className="link">Nextvas Inc.</a>, where I develop custom systems 
                for inventory management and HR automation while managing network infrastructure. I care about 
                writing clean code, creating smooth user experiences, and following best practices in 
                frontend development.
              </p>
              <p className="paragraph">
                In my spare time, I enjoy exploring new technologies, contributing to open-source projects, 
                and continuously learning about the latest trends in web development. Expected to graduate 
                in July 2026.
              </p>
            </div>
          </section>

          {/* Experience Section */}
          <section
            ref={(el) => (sectionRefs.current['experience'] = el)}
            id="experience"
            className="section"
          >
            <div className="section-content">
              {experiences.map((exp) => (
                exp.links.length > 0 ? (
                  <a
                    key={exp.id}
                    href={exp.links[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="experience-card-link"
                  >
                    <div className="experience-item">
                      <div className="exp-period">{exp.period}</div>
                      <div className="exp-content">
                        <h3 className="exp-title">
                          {exp.title} · <span className="exp-company">{exp.company}</span>
                          <ExternalLink size={14} className="title-icon" />
                        </h3>
                        <p className="exp-description">{exp.description}</p>
                        <div className="exp-tech">
                          {exp.tech.map((tech) => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div key={exp.id} className="experience-item">
                    <div className="exp-period">{exp.period}</div>
                    <div className="exp-content">
                      <h3 className="exp-title">
                        {exp.title} · <span className="exp-company">{exp.company}</span>
                      </h3>
                      <p className="exp-description">{exp.description}</p>
                      <div className="exp-tech">
                        {exp.tech.map((tech) => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              ))}

              <a href="/resume.pdf" className="view-resume">
                View Full Résumé <ArrowRight size={16} />
              </a>
            </div>
          </section>

          {/* Education Section */}
          <section
            ref={(el) => (sectionRefs.current['education'] = el)}
            id="education"
            className="section"
          >
            <div className="section-content">
              <div className="experience-item education-item">
                <div className="education-layout">
                  <div className="education-period">2022 — 2026</div>
                  <div className="education-logo-large">
                    <img src="/mapua-logo.jpg" alt="Mapua Malayan Digital College" />
                  </div>
                  <div className="education-details">
                    <h3 className="exp-title">
                      B.S. in Information Technology · <span className="exp-company">Mapua Malayan Digital College</span>
                    </h3>
                    <p className="exp-description">
                      Specialization in Software Development. Relevant coursework includes Software Development, 
                      Data Structures & Algorithms, DevOps, Mobile Development, and Capstone Project. Expected 
                      graduation: July 2026.
                    </p>
                    <div className="exp-tech">
                      <span className="tech-tag">Software Development</span>
                      <span className="tech-tag">Data Structures</span>
                      <span className="tech-tag">DevOps</span>
                      <span className="tech-tag">Mobile Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            ref={(el) => (sectionRefs.current['projects'] = el)}
            id="projects"
            className="section"
          >
            <div className="section-content">
              {projects.map((project) => (
                project.gallery ? (
                  <div
                    key={project.id}
                    onClick={() => openGallery(project.gallery)}
                    className="project-card-link"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="project-item">
                      <div className="project-image-container">
                        {project.hasDefaultImage && project.defaultImage ? (
                          <img src={project.defaultImage} alt={project.title} className="project-image" />
                        ) : projectImages[project.id] ? (
                          <img src={projectImages[project.id]} alt={project.title} className="project-image" />
                        ) : (
                          <div className="project-placeholder">
                            <Camera size={32} />
                          </div>
                        )}
                      </div>
                      <div className="project-content">
                        <h3 className="project-title">
                          {project.title}
                          <span className="gallery-icon">🖼️</span>
                        </h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tech">
                          {project.tech.map((tech) => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a 
                    key={project.id} 
                    href={project.links.length > 0 ? project.links[0].url : '#'}
                    target={project.links.length > 0 ? "_blank" : "_self"}
                    rel={project.links.length > 0 ? "noopener noreferrer" : ""}
                    className="project-card-link"
                  >
                    <div className="project-item">
                      <div className="project-image-container">
                        {project.hasDefaultImage && project.defaultImage ? (
                          <img src={project.defaultImage} alt={project.title} className="project-image" />
                        ) : projectImages[project.id] ? (
                          <img src={projectImages[project.id]} alt={project.title} className="project-image" />
                        ) : (
                          <div className="project-placeholder">
                            <Camera size={32} />
                          </div>
                        )}
                        {!project.hasDefaultImage && (
                          <label className="upload-overlay" onClick={(e) => e.preventDefault()}>
                            <Camera size={20} />
                            <span>Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(project.id, e)}
                              style={{ display: 'none' }}
                            />
                          </label>
                        )}
                      </div>
                      <div className="project-content">
                        <h3 className="project-title">
                          {project.title}
                          {project.links.length > 0 && <ExternalLink size={16} className="title-icon" />}
                        </h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tech">
                          {project.tech.map((tech) => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </a>
                )
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <p>
              Designed in <a href="https://www.figma.com/" className="footer-link">Figma</a> and 
              coded in <a href="https://code.visualstudio.com/" className="footer-link">Visual Studio Code</a>.
              Built with <a href="https://react.dev/" className="footer-link">React</a> and deployed 
              with <a href="https://vercel.com/" className="footer-link">Vercel</a>.
            </p>
          </footer>
        </div>
      </div>

      {/* Gallery Modal */}
      {galleryOpen && (
        <div className="gallery-modal" onClick={closeGallery}>
          <button className="gallery-close" onClick={closeGallery}>×</button>
          <button className="gallery-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
          <button className="gallery-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
          <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={currentGallery[currentImageIndex]} 
              alt={`Gallery ${currentImageIndex + 1}`}
              className="gallery-image"
            />
            <div className="gallery-counter">
              {currentImageIndex + 1} / {currentGallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;