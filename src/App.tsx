import React, { useState, useEffect } from 'react';
import {  Code, Globe, Zap, ArrowRight, CheckCircle, Star, Menu, X, Mail, Phone, Send } from 'lucide-react';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';


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

  const handleMenuToggle = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (): void => {
    setIsMenuOpen(false);
  };

  const handleCTAClick = (action: string): void => {
    if (action === 'consultation' || action === 'quote') {
      // Scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      console.log(`CTA clicked: ${action}`);
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
              <LogoIcon />
              <span>ByteSlide</span>
            </Logo>
            
            <NavLinks>
              <NavLink href="#services">Services buh</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
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
                <NavLink href="#about" mobile onClick={handleNavClick}>About</NavLink>
                <NavLink href="#testimonials" mobile onClick={handleNavClick}>Testimonials</NavLink>
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
          <FloatingCircle color="#bfdbfe" top="5rem" left="2.5rem" size="5rem" animation="bounce" />
          <FloatingCircle color="#e9d5ff" top="10rem" right="5rem" size="4rem" animation="pulse" />
          <FloatingCircle color="#c7d2fe" bottom="5rem" left="5rem" size="3rem" animation="bounce" />
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
          <Paragraph size="xl" style={{ color: '#bfdbfe', marginBottom: '2.5rem', maxWidth: '42rem', margin: '0 auto' }}>
            Let's discuss how ByteSlide can help you build the perfect web solution for your business needs.
          </Paragraph>
          
          <FlexContainer justify="center" style={{ gap: '1rem', flexDirection: 'column' }}>
            <StyledButton variant="secondary" onClick={() => handleCTAClick('consultation')}>
              Schedule a Consultation
            </StyledButton>
            <StyledButton 
              variant="outline" 
              style={{ borderColor: 'white', color: 'white' }}
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
              <Logo style={{ color: 'linear-gradient(to left, #2563eb, #9333ea)' }}>
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
    color: #374151;
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
  padding: 5rem 0;
  ${props => props.bgColor && `background-color: ${props.bgColor};`}
`;

const MaxWidthContainer = styled.div`
  max-width: 80rem;
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
  font-weight: bold;
  color: #111827;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const Heading2 = styled.h2`
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Heading3 = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p<{ size?: 'base' | 'lg' | 'xl' }>`
  line-height: 1.625;
  ${props => {
    switch (props.size) {
      case 'xl': return css`font-size: 1.25rem;`;
      case 'lg': return css`font-size: 1.125rem;`;
      default: return css`font-size: 1rem;`;
    }
  }}
`;

const GradientText = styled.span`
  background: linear-gradient(to right, #2563eb, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  transition: all 0.3s;
  ${props => props.scrolled && css`
    background-color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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
  padding: 1rem 0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #111827;
  }
`;

const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(to right, #2563eb, #9333ea);
  color: linear-gradient(to left, #2563eb, #9333ea);
  border-radius: 0.5rem;
  margin-right: 0.75rem;
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
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  border: none;
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
          background: linear-gradient(to right, #2563eb, #9333ea);
          color: white;
          
          &:hover:not(:disabled) {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateY(-0.25rem);
          }
        `;
      case 'secondary':
        return css`
          background-color: white;
          color: #2563eb;
          
          &:hover:not(:disabled) {
            background-color: #f9fafb;
          }
        `;
      case 'outline':
        return css`
          border: 2px solid #d1d5db;
          background: transparent;
          color: #374151;
          
          &:hover:not(:disabled) {
            border-color: #2563eb;
            color: #2563eb;
          }
        `;
      default:
        return css`
          background: linear-gradient(to right, #2563eb, #9333ea);
          color: white;
        `;
    }
  }}
`;

const NavLink = styled.a<{ mobile?: boolean }>`
  color: #374151;
  transition: color 0.3s;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: #2563eb;
  }
  
  ${props => props.mobile && css`
    display: block;
    padding: 0.5rem 0;
  `}
`;

// Hero Section
const HeroSection = styled(Section)`
  position: relative;
  padding-top: 5rem;
  padding-bottom: 4rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, #dbeafe, white, #fae8ff);
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
  opacity: 0.3;
  ${props => props.animation === 'bounce' && css`animation: ${bounce} 2s infinite;`}
  ${props => props.animation === 'pulse' && css`animation: ${pulse} 2s infinite;`}
`;

// Service Card
const ServiceCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  
  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    
    > div:first-child {
      transform: scale(1.1);
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
  background: linear-gradient(to right, #2563eb, #9333ea);
  border-radius: 1rem;
  padding: 2rem;
  color: white;
`;

// CTA Section
const CTASection = styled(Section)`
  background: linear-gradient(to right, #2563eb, #9333ea);
  text-align: center;
`;

// Footer
const Footer = styled.footer`
  background-color: #111827;
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
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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

