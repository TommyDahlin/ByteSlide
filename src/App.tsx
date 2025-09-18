import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { X, ChevronRight, Code, Globe, Zap, Users, CheckCircle, Star } from 'lucide-react';

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #333;
    background-color: #f8fafc;
    line-height: 1.6;
  }
`;

// Styled components
const AppContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  
  span {
    background: linear-gradient(45deg, #fff, #e0e7ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  border-radius: 8px;
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #4f46e5;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.button`
  color: white;
  background: none;
  border: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #e0e7ff;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #e0e7ff;
      transform: scaleX(1);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #e0e7ff;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background: white;
  z-index: 1000;
  padding: 2rem;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MobileNavItem = styled.button`
  color: #4f46e5;
  background: none;
  border: none;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  text-align: left;
  cursor: pointer;
  padding: 0.5rem 0;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  
  &:hover {
    color: #334155;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  padding-right: 2rem;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ServiceCard = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceIcon = styled.div`
  color: #4f46e5;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ServiceDescription = styled.p`
  color: #64748b;
  margin-bottom: 1rem;
`;

const FeatureList = styled.ul`
  list-style: none;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #475569;
  font-size: 0.9rem;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TestimonialCard = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
`;

const TestimonialText = styled.p`
  color: #475569;
  font-style: italic;
  margin-bottom: 1rem;
`;

const TestimonialAuthor = styled.div`
  font-weight: 600;
  color: #1e293b;
`;

const TestimonialCompany = styled.div`
  color: #64748b;
  font-size: 0.9rem;
`;

const Rating = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const AboutContent = styled.div`
  line-height: 1.8;
`;

const AboutParagraph = styled.p`
  margin-bottom: 1.5rem;
  color: #475569;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }
`;

const HeroSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #fdf4ff 100%);
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin-bottom: 2rem;
`;

// Data for the modals
const servicesData = [
  {
    icon: <Globe size={24} />,
    title: "Single Page Applications",
    description: "Lightning-fast SPAs built with React, Vue, and Angular that deliver exceptional user experiences.",
    features: ["React/Vue/Angular", "State Management", "Progressive Web Apps"]
  },
  {
    icon: <Code size={24} />,
    title: "Full-Stack Web Applications",
    description: "End-to-end web solutions from database design to user interface, built with modern frameworks.",
    features: ["Node.js/Python/Java", "Database Design", "API Development"]
  },
  {
    icon: <Zap size={24} />,
    title: "Performance Optimization",
    description: "Transform slow applications into high-performance solutions that scale with your business growth.",
    features: ["Speed Optimization", "Scalability", "SEO Enhancement"]
  }
];

const testimonialsData = [
  {
    name: "Sarah Chen",
    company: "TechStart Solutions",
    text: "ByteSlide transformed our outdated system into a modern, efficient platform. Our productivity increased by 40%.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    company: "Global Enterprises",
    text: "The team's expertise in SPAs helped us create a seamless user experience that our customers love.",
    rating: 5
  }
];

const aboutContent = `
  We're not just developers – we're strategic partners who understand that every line of code should serve your business objectives. 
  With years of experience in modern web technologies, we deliver solutions that are both innovative and reliable.

  Our team of expert consultants has a proven track record of delivering high-quality solutions across various industries.
  We use modern frameworks and cutting-edge technologies to build scalable solutions that grow with your business.

  We believe in building long-term relationships with our clients, providing dedicated support and ongoing optimization
  to ensure your digital presence remains effective and competitive.
`;

// Main component
const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const navItems = [
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  const openModal = (modalId) => {
    setActiveModal(modalId);
    setMobileMenuOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'services':
        return (
          <>
            <ModalTitle>Our Services</ModalTitle>
            <ServiceGrid>
              {servicesData.map((service, index) => (
                <ServiceCard key={index}>
                  <ServiceIcon>{service.icon}</ServiceIcon>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <FeatureList>
                    {service.features.map((feature, i) => (
                      <FeatureItem key={i}>
                        <CheckCircle size={16} style={{ marginRight: '0.5rem', color: '#10b981' }} />
                        {feature}
                      </FeatureItem>
                    ))}
                  </FeatureList>
                </ServiceCard>
              ))}
            </ServiceGrid>
          </>
        );
      case 'about':
        return (
          <>
            <ModalTitle>About Us</ModalTitle>
            <AboutContent>
              {aboutContent.split('\n\n').map((paragraph, i) => (
                <AboutParagraph key={i}>{paragraph}</AboutParagraph>
              ))}
            </AboutContent>
          </>
        );
      case 'testimonials':
        return (
          <>
            <ModalTitle>What Our Clients Say</ModalTitle>
            <TestimonialGrid>
              {testimonialsData.map((testimonial, index) => (
                <TestimonialCard key={index}>
                  <Rating>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={20} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </Rating>
                  <TestimonialText>"{testimonial.text}"</TestimonialText>
                  <TestimonialAuthor>{testimonial.name}</TestimonialAuthor>
                  <TestimonialCompany>{testimonial.company}</TestimonialCompany>
                </TestimonialCard>
              ))}
            </TestimonialGrid>
          </>
        );
      case 'contact':
        return (
          <>
            <ModalTitle>Get In Touch</ModalTitle>
            <ContactForm>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" placeholder="Your name" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Your email address" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea id="message" placeholder="How can we help you?"></TextArea>
              </FormGroup>
              <SubmitButton type="submit">Send Message</SubmitButton>
            </ContactForm>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <AppContainer>
      <GlobalStyle />
      
      <Header>
        <NavContainer>
          <Logo>
            <LogoIcon>B</LogoIcon>
            <span>ByteSlide</span>
          </Logo>
          
          <NavItems>
            {navItems.map(item => (
              <NavItem key={item.id} onClick={() => openModal(item.id)}>
                {item.label}
              </NavItem>
            ))}
          </NavItems>
          
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <Users size={24} />
          </MobileMenuButton>
        </NavContainer>
      </Header>

      {mobileMenuOpen && (
        <>
          <Overlay onClick={() => setMobileMenuOpen(false)} />
          <MobileMenu>
            <CloseButton onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </CloseButton>
            {navItems.map(item => (
              <MobileNavItem key={item.id} onClick={() => openModal(item.id)}>
                {item.label}
              </MobileNavItem>
            ))}
          </MobileMenu>
        </>
      )}

      {activeModal && (
        <Overlay onClick={closeModal}>
          <Modal onClick={e => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>
              <X size={24} />
            </CloseButton>
            {renderModalContent()}
          </Modal>
        </Overlay>
      )}

      <HeroSection>
        <HeroTitle>ByteSlide Solutions</HeroTitle>
        <HeroSubtitle>
          Your partner for cutting-edge web applications and digital transformation
        </HeroSubtitle>
        <p>Click on the navigation items above to explore our services</p>
      <NavItems>
        <StyledDiv>
            {navItems.map(item => (
              <NavItem key={item.id} onClick={() => openModal(item.id)}>
                {item.label}
              </NavItem>
            ))}
            </StyledDiv>
          </NavItems>
      </HeroSection>
    </AppContainer>
  );
};

export default App;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 30vw;
  padding: 1rem;
  border-radius: 7px;
  color: white;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
`;
