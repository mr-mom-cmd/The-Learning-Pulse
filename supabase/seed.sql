-- The Learning Pulse - Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor

-- ============================================
-- COURSES (20 sample courses)
-- ============================================

INSERT INTO courses (title, description, category, cost, mode, duration, education_type, external_url, status, featured) VALUES

-- Technology & IT
('CS50: Introduction to Computer Science', 'Harvard University''s introduction to computer science and the art of programming. Covers algorithms, data structures, web development, and more.', 'technology', 'free', 'online', 'medium', 'formal', 'https://cs50.harvard.edu/', 'approved', true),

('Google IT Support Professional Certificate', 'Prepare for a career in IT support with this professional certificate from Google. Learn troubleshooting, networking, operating systems, and security.', 'technology', 'paid', 'online', 'medium', 'non_formal', 'https://www.coursera.org/professional-certificates/google-it-support', 'approved', true),

('freeCodeCamp Full Stack Web Development', 'Learn HTML, CSS, JavaScript, Node.js, React, and databases through hands-on projects. Completely free and self-paced curriculum.', 'technology', 'free', 'online', 'long', 'non_formal', 'https://www.freecodecamp.org/', 'approved', false),

('MDEC Digital Skills Training', 'Malaysia Digital Economy Corporation''s initiative to upskill Malaysians in digital technologies including AI, cloud computing, and data analytics.', 'technology', 'free', 'hybrid', 'short', 'non_formal', 'https://mdec.my/', 'approved', true),

('AWS Cloud Practitioner Certification', 'Entry-level cloud computing certification from Amazon Web Services. Covers cloud concepts, security, technology, and billing.', 'technology', 'paid', 'online', 'short', 'non_formal', 'https://aws.amazon.com/certification/certified-cloud-practitioner/', 'approved', false),

-- Business & Management
('Khan Academy Economics & Finance', 'Free courses covering microeconomics, macroeconomics, finance, and capital markets. Self-paced with interactive exercises.', 'business', 'free', 'online', 'medium', 'non_formal', 'https://www.khanacademy.org/economics-finance-domain', 'approved', false),

('HRDF Certified Training Programs', 'Human Resources Development Fund Malaysia certified programs for workforce upskilling. Various business and management courses available.', 'business', 'scholarship', 'in_person', 'short', 'non_formal', 'https://www.hrdf.com.my/', 'approved', true),

('Coursera Business Specialization', 'Comprehensive business courses from top universities including Wharton, INSEAD, and University of Michigan. Topics include strategy, marketing, and leadership.', 'business', 'paid', 'online', 'medium', 'non_formal', 'https://www.coursera.org/browse/business', 'approved', false),

('Project Management Professional (PMP)', 'Globally recognized project management certification. Covers project planning, execution, monitoring, and closing.', 'business', 'paid', 'hybrid', 'medium', 'formal', 'https://www.pmi.org/certifications/project-management-pmp', 'approved', false),

-- Creative Arts & Design
('Canva Design School', 'Free design courses covering graphic design fundamentals, branding, social media design, and presentation skills using Canva.', 'creative', 'free', 'online', 'short', 'non_formal', 'https://www.canva.com/designschool/', 'approved', false),

('Skillshare Creative Courses', 'Online learning community with thousands of classes in illustration, design, photography, video, and creative writing.', 'creative', 'paid', 'online', 'short', 'non_formal', 'https://www.skillshare.com/', 'approved', true),

('Bachelor of Design (Multimedia)', 'Full undergraduate degree program in multimedia design covering UI/UX, motion graphics, 3D modeling, and interactive media.', 'creative', 'paid', 'in_person', 'long', 'formal', 'https://www.apu.edu.my/', 'approved', false),

-- Health & Sciences
('Coursera Public Health Specialization', 'Johns Hopkins University''s public health courses covering epidemiology, biostatistics, health policy, and global health challenges.', 'health', 'paid', 'online', 'medium', 'non_formal', 'https://www.coursera.org/specializations/public-health', 'approved', false),

('First Aid & CPR Certification', 'Malaysian Red Crescent Society certified first aid and CPR training. Essential life-saving skills for everyone.', 'health', 'paid', 'in_person', 'short', 'non_formal', 'https://www.redcrescent.org.my/', 'approved', false),

('edX Biology & Life Sciences', 'Free courses from MIT, Harvard, and other top universities covering molecular biology, genetics, neuroscience, and ecology.', 'health', 'free', 'online', 'medium', 'non_formal', 'https://www.edx.org/learn/biology', 'approved', true),

-- Vocational & Trade Skills
('TVET Malaysia Programs', 'Technical and Vocational Education and Training programs in Malaysia. Covers electrical, mechanical, automotive, and construction trades.', 'vocational', 'scholarship', 'in_person', 'long', 'vocational', 'https://www.mypolycc.edu.my/', 'approved', false),

('Petronas Technical Training Scheme', 'Petronas-sponsored technical training for Malaysian youth. Includes scholarships for engineering and technical vocational programs.', 'vocational', 'scholarship', 'in_person', 'long', 'vocational', 'https://www.petronas.com/', 'approved', false),

('Google Digital Marketing Certificate', 'Learn digital marketing fundamentals including SEO, SEM, social media, and analytics. Industry-recognized certification.', 'business', 'paid', 'online', 'short', 'non_formal', 'https://grow.google/certificates/digital-marketing-ecommerce/', 'approved', false),

('Udemy Photography Masterclass', 'Comprehensive photography course covering camera settings, composition, lighting, and post-processing techniques.', 'creative', 'paid', 'online', 'medium', 'non_formal', 'https://www.udemy.com/', 'approved', false),

('Community Cooking Workshop', 'Local community-organized cooking workshops teaching traditional Malaysian and international cuisine. Weekly sessions.', 'vocational', 'free', 'in_person', 'short', 'non_formal', 'https://www.community-cooking.example.com/', 'approved', false);


-- ============================================
-- RESOURCES (educational content)
-- ============================================

INSERT INTO resources (title, content, category, external_url, "order") VALUES

-- Formal Education
('What is Formal Education?', '<p>Formal education refers to the structured educational system that runs from primary school through university. It follows a curriculum set by educational authorities and leads to formally recognized qualifications such as diplomas, degrees, and certificates.</p>
<p><strong>Key characteristics:</strong></p>
<ul>
<li>Follows a structured curriculum and syllabus</li>
<li>Delivered by trained and certified teachers/lecturers</li>
<li>Leads to recognized qualifications (SPM, diploma, degree, etc.)</li>
<li>Has defined entry requirements and assessment criteria</li>
<li>Typically takes place in institutional settings (schools, universities)</li>
</ul>
<p><strong>Examples in Malaysia:</strong></p>
<ul>
<li>Public and private university degree programs</li>
<li>Polytechnic diploma courses</li>
<li>Professional certifications (CPA, ACCA, etc.)</li>
<li>Postgraduate programs (Masters, PhD)</li>
</ul>', 'formal_education', NULL, 1),

-- Non-Formal Education
('What is Non-Formal Education?', '<p>Non-formal education refers to organized learning activities outside the formal education system. While structured and intentional, these programs are more flexible and don''t necessarily lead to formal qualifications.</p>
<p><strong>Key characteristics:</strong></p>
<ul>
<li>Organized but flexible in structure</li>
<li>Learner-centered and often practical</li>
<li>May or may not lead to certifications</li>
<li>Accessible to people of all ages and backgrounds</li>
<li>Can be delivered online, in-person, or hybrid</li>
</ul>
<p><strong>Examples:</strong></p>
<ul>
<li>Online courses on Coursera, edX, Udemy</li>
<li>Coding bootcamps and workshops</li>
<li>Community training programs</li>
<li>Professional development workshops</li>
<li>HRDF-sponsored training in Malaysia</li>
</ul>', 'non_formal', NULL, 1),

-- Lifelong Learning
('What is Lifelong Learning?', '<p>Lifelong learning is the ongoing, voluntary, and self-motivated pursuit of knowledge for personal or professional development. It extends beyond formal education and encompasses all learning throughout one''s life.</p>
<p><strong>Why is lifelong learning important?</strong></p>
<ul>
<li><strong>Career relevance:</strong> The job market evolves rapidly — continuous learning helps you stay competitive</li>
<li><strong>Personal growth:</strong> Learning new skills and knowledge enriches your life and perspective</li>
<li><strong>Adaptability:</strong> Lifelong learners are better equipped to adapt to change</li>
<li><strong>Economic contribution:</strong> A skilled workforce drives economic growth and innovation</li>
</ul>
<p><strong>How to practice lifelong learning:</strong></p>
<ul>
<li>Set personal learning goals each year</li>
<li>Take advantage of free online courses</li>
<li>Join learning communities and study groups</li>
<li>Read widely and stay curious</li>
<li>Attend workshops, webinars, and conferences</li>
</ul>', 'lifelong_learning', NULL, 1),

-- SDG 4.3.1
('Understanding SDG 4.3.1', '<p><strong>SDG 4.3.1</strong> is an indicator under the United Nations Sustainable Development Goal 4 (Quality Education). Specifically, it measures:</p>
<blockquote><em>"Participation rate of youth and adults in formal and non-formal education and training in the previous 12 months, by sex."</em></blockquote>
<p><strong>Why does SDG 4.3.1 matter?</strong></p>
<ul>
<li>It tracks whether people are actively engaging in education and training</li>
<li>It helps identify gaps in educational access and participation</li>
<li>It promotes the idea that learning doesn''t stop after school</li>
<li>It supports policies for inclusive and equitable education</li>
</ul>
<p><strong>Global context:</strong></p>
<ul>
<li>Many countries still have significant gaps in participation rates</li>
<li>Access to non-formal education varies widely between urban and rural areas</li>
<li>Digital learning has expanded access but also highlighted the digital divide</li>
<li>Malaysia has made progress through initiatives like HRDF, MDEC, and TVET programs</li>
</ul>
<p>The Learning Pulse supports SDG 4.3.1 by making educational opportunities more discoverable and accessible to everyone.</p>', 'sdg_info', NULL, 1),

-- External links
('UNESCO Education Resources', 'Official UNESCO resources on education, lifelong learning, and SDG 4', 'external_link', 'https://www.unesco.org/en/education', 1),
('Ministry of Education Malaysia', 'Official Malaysian Ministry of Education portal with policies and programs', 'external_link', 'https://www.moe.gov.my/', 2),
('Coursera - Free Online Courses', 'Access thousands of free courses from top universities worldwide', 'external_link', 'https://www.coursera.org/', 3),
('edX - Online Learning Platform', 'Harvard and MIT-founded platform offering free courses from top institutions', 'external_link', 'https://www.edx.org/', 4),
('Khan Academy - Free Learning', 'Free world-class education for anyone, anywhere', 'external_link', 'https://www.khanacademy.org/', 5),
('HRDF Malaysia', 'Human Resources Development Fund for Malaysian workforce training', 'external_link', 'https://www.hrdf.com.my/', 6),
('MyMOOC Malaysia', 'Malaysia''s Massive Open Online Course platform for lifelong learning', 'external_link', 'https://www.openlearning.com/malaysiamoocs/', 7);
