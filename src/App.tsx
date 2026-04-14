import React, { useState, useEffect } from 'react';
import { Code, Globe, ArrowRight, CheckCircle, Menu, X, Mail, Phone, Send, Warehouse, ScanLine, Users, ShieldCheck } from 'lucide-react';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import logo from './assets/BSAB_NO_TEXT_LOGO.png'

// Interfaces
interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

// Main Component
const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');

  useEffect(() => {
    const handleScroll = (): void => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services: Service[] = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Single Page Applications",
      description: "Lightning-fast SPAs built with React, Vue, and Angular that deliver exceptional user experiences and seamless navigation.",
      features: ["React/Vue/Angular", "State Management", "Progressive Web Apps"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Web Applications",
      description: "End-to-end web solutions from database design to user interface, built with modern frameworks and best practices.",
      features: ["Node.js/Java", "Database Design", "API Development"]
    }
  ];

  const stats = [
    { value: "5+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "3+", label: "Years Experience" }
  ];

  const aboutFeatures: string[] = [
    "Expert consultants with proven track records",
    "Modern frameworks and cutting-edge technologies",
    "Scalable solutions that grow with your business",
    "Dedicated support and ongoing optimization"
  ];

  const featuredSolutions = [
    {
      eyebrow: 'Featured Solution',
      title: 'Inventor-Y',
      description:
        'Inventor-Y is a modern inventory management web application built for businesses and teams that need clear control over stock, item locations, warehouse organization, QR workflows, and team-based access.',
      details:
        'The platform supports inventory creation, multi-location quantity tracking, fast stock transfers, responsive scanning workflows, subscription-aware collaboration, and role-based controls in a polished business-focused experience.',
      summary:
        'A professional inventory system focused on visibility, speed, and maintainable operations at scale.',
      capabilities: [
        'Create and manage inventory items with dependable state handling',
        'Assign and move stock across rooms, shelves, rows, drawers, and slots',
        'Use QR-enabled workflows for fast updates, audits, and fulfillment actions',
        'Invite teammates with role-based permissions and shared billing logic'
      ],
      pillars: [
        {
          icon: <Warehouse className="w-6 h-6" />,
          title: 'Structured storage',
          description: 'Model warehouse-style location hierarchies with clear operational visibility.'
        },
        {
          icon: <ScanLine className="w-6 h-6" />,
          title: 'QR efficiency',
          description: 'Enable faster day-to-day updates with scan-first inventory workflows.'
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Team collaboration',
          description: 'Support invitations, shared access, and subscription-aware team management.'
        },
        {
          icon: <ShieldCheck className="w-6 h-6" />,
          title: 'Business-ready control',
          description: 'Protect critical actions with role-based permissions and maintainable architecture.'
        }
      ]
    },
    {
      eyebrow: 'Claims Platform',
      title: 'Claims Manager',
      description:
        'Claims Manager is a modern claims management platform designed to make warranty, service, and operational claim handling faster, clearer, and more collaborative.',
      details:
        'Built for organizations that need better oversight and smoother workflows, Claims Manager helps teams create, assign, track, and resolve claims in one secure system with documentation, in-context communication, and full lifecycle visibility.',
      summary:
        'Claims Manager is a secure, full-featured claims management solution that helps organizations register, track, and resolve claims with greater speed and clarity.',
      capabilities: [
        'Centralize claim intake, progress tracking, and resolution workflows',
        'Enable role-based access for teams, administrators, and external users',
        'Provide real-time updates and notifications to keep stakeholders informed',
        'Support admin reporting, secure authentication, and business-critical data handling'
      ],
      pillars: [
        {
          icon: <CheckCircle className="w-6 h-6" />,
          title: 'Workflow clarity',
          description: 'Bring every claim into one structured system with better visibility and accountability.'
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Collaborative handling',
          description: 'Keep internal teams and external users aligned with contextual communication.'
        },
        {
          icon: <Globe className="w-6 h-6" />,
          title: 'Operational oversight',
          description: 'Use reporting and admin tooling to manage organizations, users, and ongoing claims.'
        },
        {
          icon: <ShieldCheck className="w-6 h-6" />,
          title: 'Secure by design',
          description: 'Protect sensitive claim workflows with strong authentication and controlled access.'
        }
      ]
    }
  ];

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (): void => {
    setIsMenuOpen(false);
  };

  const handleCTAClick = (action: string): void => {
    const sectionMap: Record<string, string> = {
      'get-started': 'contact',
      consultation: 'contact',
      quote: 'contact',
      'view-work': 'featured'
    };

    const targetId = sectionMap[action];

    if (targetId) {
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Replace this URL with your actual serverless function endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
        setContactForm({ name: '', email: '', company: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <GlobalStyle />
      
      {/* Navigation */}
      <StyledNav scrolled={scrollY > 50}>
        <MaxWidthContainer>
          <NavContainer>
            <Logo>
              <img src={logo} alt="ByteSlide Logo" />
              <span>ByteSlide</span>
            </Logo>
            
            <NavLinks>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#featured">Featured Solutions</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </NavLinks>

            <MobileMenuButton onClick={handleMenuToggle} aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </MobileMenuButton>
          </NavContainer>

          {/* Mobile menu */}
          {isMenuOpen && (
            <MobileMenu>
              <FlexContainer direction="col" style={{ gap: '1rem' }}>
                <NavLink href="#services" mobile onClick={handleNavClick}>Services</NavLink>
                <NavLink href="#featured" mobile onClick={handleNavClick}>Featured Solutions</NavLink>
                <NavLink href="#about" mobile onClick={handleNavClick}>About</NavLink>
                <NavLink href="#contact" mobile onClick={handleNavClick}>Contact</NavLink>
              </FlexContainer>
            </MobileMenu>
          )}
        </MaxWidthContainer>
      </StyledNav>

      {/* Hero Section */}
      <HeroSection>
        <MaxWidthContainer style={{ position: 'relative', paddingTop: '4rem' }}>
          <div style={{ textAlign: 'center' }}>
            <Heading1>
              <GradientText>ByteSlide</GradientText>
            </Heading1>
            <Heading2 style={{ fontSize: '1.875rem', fontWeight: 300, marginBottom: '2rem' }}>
              Your Solution to Complex Web Challenges
            </Heading2>
            <Paragraph size="xl" style={{ marginBottom: '3rem', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}>
              We specialize in crafting cutting-edge web applications and single-page applications that drive business growth. 
              Transform your digital presence with scalable, high-performance solutions built by expert consultants.
            </Paragraph>
            
            <FlexContainer justify="center" align="center" style={{ gap: '1rem', flexDirection: 'column' }}>
              <StyledButton variant="primary" onClick={() => handleCTAClick('get-started')}>
                Get Started Today
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </StyledButton>
              <StyledButton variant="outline" onClick={() => handleCTAClick('view-work')}>
                View Our Work
              </StyledButton>
            </FlexContainer>
          </div>

          {/* Floating elements */}
          <FloatingCircle color="#dbeafe" top="5rem" left="2.5rem" size="5rem" animation="bounce" />
          <FloatingCircle color="#e2e8f0" top="10rem" right="5rem" size="4rem" animation="pulse" />
          <FloatingCircle color="#bfdbfe" bottom="5rem" left="5rem" size="3rem" animation="bounce" />
        </MaxWidthContainer>
      </HeroSection>

      {/* Services Section */}
      <Section id="services" bgColor="#f9fafb">
        <MaxWidthContainer>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Heading2>Our Expertise</Heading2>
            <Paragraph size="xl" style={{ maxWidth: '42rem', margin: '0 auto' }}>
              Delivering comprehensive web solutions that exceed expectations and drive measurable results
            </Paragraph>
          </div>

          <GridContainer cols={2} gap={3}>
            {services.map((service: Service, index: number) => (
              <ServiceCard key={index}>
                <ServiceIcon>
                  {service.icon}
                </ServiceIcon>
                <Heading3>{service.title}</Heading3>
                <Paragraph style={{ marginBottom: '1.5rem' }}>{service.description}</Paragraph>
                <ul style={{ listStyle: 'none' }}>
                  {service.features.map((feature: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </ServiceCard>
            ))}
          </GridContainer>
        </MaxWidthContainer>
      </Section>

      {/* Featured Product Section */}
      <Section id="featured">
        <MaxWidthContainer>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Heading2>Featured Solutions</Heading2>
            <Paragraph size="xl" style={{ maxWidth: '48rem', margin: '0 auto' }}>
              A selection of business-focused platforms designed for operational clarity, secure collaboration, and scalable day-to-day workflows.
            </Paragraph>
          </div>

          <FeaturedSolutionsStack>
            {featuredSolutions.map((solution, solutionIndex: number) => (
              <ProductShowcase key={solution.title}>
                <div>
                  <SectionEyebrow>{solution.eyebrow}</SectionEyebrow>
                  <Heading2 style={{ marginBottom: '1rem' }}>{solution.title}</Heading2>
                  <Paragraph size="lg" style={{ marginBottom: '1rem' }}>
                    {solution.description}
                  </Paragraph>
                  <Paragraph style={{ marginBottom: '1rem' }}>
                    {solution.details}
                  </Paragraph>

                  <MarketingQuote>
                    {solution.summary}
                  </MarketingQuote>

                  <FeatureList>
                    {solution.capabilities.map((capability: string, index: number) => (
                      <FeatureListItem key={index}>
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span>{capability}</span>
                      </FeatureListItem>
                    ))}
                  </FeatureList>
                </div>

                <ShowcasePanel>
                  <PanelHeading>{solutionIndex === 0 ? 'Built for modern inventory operations' : 'Designed for modern claims workflows'}</PanelHeading>
                  <PillarGrid>
                    {solution.pillars.map((pillar, index: number) => (
                      <PillarCard key={index}>
                        <PillarIcon>{pillar.icon}</PillarIcon>
                        <h3>{pillar.title}</h3>
                        <p>{pillar.description}</p>
                      </PillarCard>
                    ))}
                  </PillarGrid>
                </ShowcasePanel>
              </ProductShowcase>
            ))}
          </FeaturedSolutionsStack>
        </MaxWidthContainer>
      </Section>

      {/* About Section */}
      <Section id="about">
        <MaxWidthContainer>
          <GridContainer cols={2} gap={4}>
            <div>
              <Heading2>Why Choose ByteSlide?</Heading2>
              <Paragraph size="lg" style={{ marginBottom: '2rem' }}>
                We're not just developers – we're strategic partners who understand that every line of code should serve your business objectives. 
                With years of experience in modern web technologies, we deliver solutions that are both innovative and reliable.
              </Paragraph>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {aboutFeatures.map((item: string, index: number) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <StatsContainer>
                <GridContainer cols={2} gap={2}>
                  {stats.map((stat, index: number) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{stat.value}</div>
                      <div style={{ color: '#bfdbfe' }}>{stat.label}</div>
                    </div>
                  ))}
                </GridContainer>
              </StatsContainer>
            </div>
          </GridContainer>
        </MaxWidthContainer>
      </Section>

      {/* Contact Section */}
      <Section id="contact" bgColor="#f9fafb">
        <MaxWidthContainer>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Heading2>Get In Touch</Heading2>
            <Paragraph size="xl" style={{ maxWidth: '42rem', margin: '0 auto' }}>
              Ready to start your project? Let's discuss how we can help you achieve your goals.
            </Paragraph>
          </div>

          <GridContainer cols={2} gap={4}>
            <div>
              <Heading3>Let's Talk About Your Project</Heading3>
              <Paragraph style={{ marginBottom: '2rem' }}>
                We're here to help you transform your ideas into powerful web applications. 
                Reach out to us and let's discuss how we can bring your vision to life.
              </Paragraph>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <span>TommyDahlin95@outlook.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <span>+46709544189</span>
                </div>
              </div>
            </div>

            <ContactFormContainer>
              <form onSubmit={handleContactSubmit}>
                <FormGrid>
                  <FormGroup>
                    <FormLabel htmlFor="name">Name *</FormLabel>
                    <FormInput
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      required
                      placeholder="Your full name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="email">Email *</FormLabel>
                    <FormInput
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required
                      placeholder="your@email.com"
                    />
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <FormLabel htmlFor="company">Company</FormLabel>
                  <FormInput
                    type="text"
                    id="company"
                    name="company"
                    value={contactForm.company}
                    onChange={handleContactFormChange}
                    placeholder="Your company name"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="message">Message *</FormLabel>
                  <FormTextarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                  />
                </FormGroup>

                <StyledButton 
                  type="submit" 
                  variant="primary" 
                  disabled={isSubmitting}
                  style={{ width: '100%' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="inline-block ml-2 w-5 h-5" />
                </StyledButton>

                {submitMessage && (
                  <SubmitMessage success={submitMessage.includes('Thank you')}>
                    {submitMessage}
                  </SubmitMessage>
                )}
              </form>
            </ContactFormContainer>
          </GridContainer>
        </MaxWidthContainer>
      </Section>

      {/* CTA Section */}
      <CTASection>
        <MaxWidthContainer>
          <Heading2 style={{ color: 'white', marginBottom: '1.5rem' }}>
            Ready to Transform Your Digital Presence?
          </Heading2>
          <Paragraph size="xl" style={{ maxWidth: '42rem', margin: '0 auto 2.5rem' }}>
            Let's discuss how ByteSlide can help you build the perfect web solution for your business needs.
          </Paragraph>
          
          <FlexContainer justify="center" align="center" style={{ gap: '1rem', flexWrap: 'wrap' }}>
            <StyledButton variant="secondary" onClick={() => handleCTAClick('consultation')}>
              Schedule a Consultation
            </StyledButton>
            <StyledButton 
              variant="outline" 
              style={{ borderColor: '#94a3b8', color: 'white', background: 'transparent' }}
              onClick={() => handleCTAClick('quote')}
            >
              Get a Quote
            </StyledButton>
          </FlexContainer>
        </MaxWidthContainer>
      </CTASection>

      {/* Footer */}
      <Footer>
        <MaxWidthContainer>
          <FooterGrid>
            <div>
              <Logo style={{ color: 'white', marginBottom: '0.75rem' }}>
                <img src={logo} alt="ByteSlide Logo" />
                <span>ByteSlide</span>
              </Logo>
              <Paragraph style={{ color: '#9ca3af' }}>
                Professional web consulting services for modern businesses.
              </Paragraph>
            </div>
            <FooterColumn>
              <h4>Services</h4>
              <ul>
                <li>Web Applications</li>
                <li>Single Page Apps</li>
                <li>Performance Optimization</li>
                <li>Consulting</li>
              </ul>
            </FooterColumn>
            
            <FooterColumn>
              <h4>Company</h4>
              <ul>
                <li>About Us</li>
                <li>Our Process</li>
                <li>Case Studies</li>
                <li>Contact</li>
              </ul>
            </FooterColumn>
            
            <FooterColumn>
              <h4>Connect</h4>
              <ul>
                <li>TommyDahlin95@outlook.com</li>
                <li>+46709544189</li>
              </ul>
            </FooterColumn>
          </FooterGrid>
          
          <FooterBottom>
            <p>&copy; 2025 ByteSlide. All rights reserved.</p>
          </FooterBottom>
        </MaxWidthContainer>
      </Footer>
    </Container>
  );
};

export default App;

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    color: #334155;
    background-color: #ffffff;
  }
`;

// Animations
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
`;

// Common styled components
const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: white;
`;

const Section = styled.section<{ bgColor?: string }>`
  padding: 5.5rem 0;
  ${props => props.bgColor && `background-color: ${props.bgColor};`}

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const MaxWidthContainer = styled.div`
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Heading1 = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #0f172a;
  margin-bottom: 1.25rem;
  line-height: 1.05;

  @media (min-width: 768px) {
    font-size: 4.25rem;
  }
`;

const Heading2 = styled.h2`
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #0f172a;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 2.85rem;
  }
`;

const Heading3 = styled.h3`
  font-size: 1.45rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`;

const Paragraph = styled.p<{ size?: 'base' | 'lg' | 'xl' }>`
  line-height: 1.75;
  color: #475569;
  ${props => {
    switch (props.size) {
      case 'xl': return css`font-size: 1.2rem;`;
      case 'lg': return css`font-size: 1.075rem;`;
      default: return css`font-size: 1rem;`;
    }
  }}
`;

const GradientText = styled.span`
  color: #1d4ed8;
  letter-spacing: -0.03em;
`;

const FlexContainer = styled.div<{ direction?: 'row' | 'col', justify?: string, align?: string }>`
  display: flex;
  ${props => props.direction && `flex-direction: ${props.direction};`}
  ${props => props.justify && `justify-content: ${props.justify};`}
  ${props => props.align && `align-items: ${props.align};`}
`;

const GridContainer = styled.div<{ cols?: number, gap?: number }>`
  display: grid;
  ${props => props.cols && `grid-template-columns: repeat(${props.cols}, 1fr);`}
  ${props => props.gap && `gap: ${props.gap}rem;`}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Navigation
const StyledNav = styled.nav<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  ${props => props.scrolled && css`
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  `}
`;

const SubmitMessage = styled.p<{ success?: boolean }>`
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => (props.success ? 'green' : 'red')};
`;


const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #0f172a;

  img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
    display: block;
    flex-shrink: 0;
  }
  
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: inherit;
    line-height: 1;
  }
`;


const NavLinks = styled.div`
  display: none;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  background-color: white;
  border-top: 1px solid #e5e7eb;
  padding: 1rem 0;

  @media (min-width: 768px) {
    display: none;
  }
`;

// Buttons
const StyledButton = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background-color: #1d4ed8;
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #1e40af;
            box-shadow: 0 10px 20px rgba(29, 78, 216, 0.18);
            transform: translateY(-1px);
          }
        `;
      case 'secondary':
        return css`
          background-color: white;
          color: #0f172a;
          border-color: #cbd5e1;
          
          &:hover:not(:disabled) {
            background-color: #f8fafc;
          }
        `;
      case 'outline':
        return css`
          border-color: #94a3b8;
          background: white;
          color: #0f172a;
          
          &:hover:not(:disabled) {
            background-color: #eff6ff;
            border-color: #1d4ed8;
            color: #1d4ed8;
          }
        `;
      default:
        return css`
          background-color: #1d4ed8;
          color: white;
        `;
    }
  }}
`;

const NavLink = styled.a<{ mobile?: boolean }>`
  color: #334155;
  transition: color 0.25s ease;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    color: #1d4ed8;
  }
  
  ${props => props.mobile && css`
    display: block;
    padding: 0.5rem 0;
  `}
`;

// Hero Section
const HeroSection = styled(Section)`
  position: relative;
  padding-top: 6rem;
  padding-bottom: 5rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #f8fbff;
  }
`;

const FloatingCircle = styled.div<{ color: string, top?: string, right?: string, bottom?: string, left?: string, size: string, animation: string }>`
  position: absolute;
  ${props => props.top && `top: ${props.top};`}
  ${props => props.right && `right: ${props.right};`}
  ${props => props.bottom && `bottom: ${props.bottom};`}
  ${props => props.left && `left: ${props.left};`}
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background-color: ${props => props.color};
  opacity: 0.18;
  filter: blur(1px);
  ${props => props.animation === 'bounce' && css`animation: ${bounce} 4s infinite;`}
  ${props => props.animation === 'pulse' && css`animation: ${pulse} 4s infinite;`}
`;

// Service Card
const ServiceCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
    
    > div:first-child {
      transform: scale(1.05);
    }
  }
`;

const ServiceIcon = styled.div`
  color: #2563eb;
  margin-bottom: 1rem;
  transition: transform 0.3s;
`;

// Stats Section
const StatsContainer = styled.div`
  background: #1e3a8a;
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  box-shadow: 0 20px 40px rgba(30, 58, 138, 0.18);
`;

const FeaturedSolutionsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProductShowcase = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: stretch;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  background: white;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.05);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }
`;

const SectionEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const FeatureListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
`;

const ShowcasePanel = styled.div`
  background: #0f172a;
  color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.18);
`;

const MarketingQuote = styled.div`
  margin-bottom: 1.25rem;
  padding: 1rem 1.1rem;
  border-left: 4px solid #1d4ed8;
  background: #f8fafc;
  border-radius: 0.75rem;
  color: #1e293b;
  font-weight: 600;
`;

const PanelHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const PillarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PillarCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.85rem;
  padding: 1rem;
  text-align: left;

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #d1d5db;
    line-height: 1.5;
    font-size: 0.95rem;
  }
`;

const PillarIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: #1d4ed8;
  margin-bottom: 0.75rem;
`;

// CTA Section
const CTASection = styled(Section)`
  background: #0f172a;
  text-align: center;

  ${Paragraph} {
    color: #cbd5e1;
  }
`;

// Footer
const Footer = styled.footer`
  background-color: #0b1220;
  color: white;
  padding: 3rem 0;
`;

const FooterGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterColumn = styled.div`
  h4 {
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    
    li {
      color: #9ca3af;
      margin-bottom: 0.5rem;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #374151;
  padding-top: 2rem;
  margin-top: 3rem;
  text-align: center;
  color: #9ca3af;
`;

// Contact Form Styles
const ContactFormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

