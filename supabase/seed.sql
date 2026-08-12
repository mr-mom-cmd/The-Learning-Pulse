-- The Learning Pulse - Comprehensive Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
--
-- NOTE: These user records are profile entries only. To log in,
-- create matching accounts via Supabase Auth (Dashboard > Authentication)
-- using the same email addresses below, or sign up through the app.
-- After creating auth accounts, update the UUIDs here to match.

-- ============================================
-- USERS — 8 admins (team) + 17 regular users
-- ============================================

INSERT INTO users (id, email, name, role, created_at) VALUES
-- Team members (admins)
('a0000001-0000-0000-0000-000000000001', 'chinboon.lim@mail.com', 'Lim Chin Boon', 'admin', '2026-05-10 09:00:00+08'),
('a0000001-0000-0000-0000-000000000002', 'ziyin.chen@mail.com', 'Chen Ziyin', 'admin', '2026-05-10 09:00:00+08'),
('a0000001-0000-0000-0000-000000000003', 'yisheng.kong@mail.com', 'Kong Yi Sheng', 'admin', '2026-05-10 09:00:00+08'),
('a0000001-0000-0000-0000-000000000004', 'shailen.nanu@mail.com', 'Shailen Joshua Nanu', 'admin', '2026-05-10 09:00:00+08'),
('a0000001-0000-0000-0000-000000000005', 'thivaan.shah@mail.com', 'Thivaan Shah', 'admin', '2026-05-10 09:00:00+08'),
('a0000001-0000-0000-0000-000000000006', 'wheihung.toh@mail.com', 'Toh Whei Hung', 'admin', '2026-05-10 09:00:00+08'),
('a0000001-0000-0000-0000-000000000007', 'jiale.wong@mail.com', 'Wong Jia Le', 'admin', '2026-05-10 09:00:00+08'),
('a0000001-0000-0000-0000-000000000008', 'liwei.yeoh@mail.com', 'Yeoh Li Wei', 'admin', '2026-05-10 09:00:00+08'),

-- Regular users
('b0000001-0000-0000-0000-000000000001', 'ahmad.razak@mail.com', 'Ahmad Razak', 'user', '2026-05-15 10:30:00+08'),
('b0000001-0000-0000-0000-000000000002', 'siti.aminah@mail.com', 'Siti Aminah', 'user', '2026-05-18 14:20:00+08'),
('b0000001-0000-0000-0000-000000000003', 'raj.kumar@mail.com', 'Raj Kumar', 'user', '2026-05-20 08:15:00+08'),
('b0000001-0000-0000-0000-000000000004', 'mei.ling@mail.com', 'Tan Mei Ling', 'user', '2026-05-22 16:45:00+08'),
('b0000001-0000-0000-0000-000000000005', 'jason.lee@mail.com', 'Jason Lee', 'user', '2026-05-25 11:00:00+08'),
('b0000001-0000-0000-0000-000000000006', 'priya.nair@mail.com', 'Priya Nair', 'user', '2026-05-28 09:30:00+08'),
('b0000001-0000-0000-0000-000000000007', 'daniel.wong@mail.com', 'Daniel Wong', 'user', '2026-06-01 13:00:00+08'),
('b0000001-0000-0000-0000-000000000008', 'nurul.huda@mail.com', 'Nurul Huda', 'user', '2026-06-03 15:20:00+08'),
('b0000001-0000-0000-0000-000000000009', 'kevin.tan@mail.com', 'Kevin Tan', 'user', '2026-06-05 10:10:00+08'),
('b0000001-0000-0000-0000-000000000010', 'aisyah.ismail@mail.com', 'Aisyah Ismail', 'user', '2026-06-08 12:00:00+08'),
('b0000001-0000-0000-0000-000000000011', 'harish.singh@mail.com', 'Harish Singh', 'user', '2026-06-10 17:30:00+08'),
('b0000001-0000-0000-0000-000000000012', 'jessica.lim@mail.com', 'Jessica Lim', 'user', '2026-06-12 08:45:00+08'),
('b0000001-0000-0000-0000-000000000013', 'faizal.rahman@mail.com', 'Faizal Rahman', 'user', '2026-06-15 14:00:00+08'),
('b0000001-0000-0000-0000-000000000014', 'yi.xuan@mail.com', 'Chong Yi Xuan', 'user', '2026-06-18 09:20:00+08'),
('b0000001-0000-0000-0000-000000000015', 'arun.muthu@mail.com', 'Arun Muthu', 'user', '2026-06-20 11:15:00+08'),
('b0000001-0000-0000-0000-000000000016', 'sarah.chen@mail.com', 'Sarah Chen', 'user', '2026-06-22 16:00:00+08'),
('b0000001-0000-0000-0000-000000000017', 'hafiz.abdullah@mail.com', 'Hafiz Abdullah', 'user', '2026-06-25 10:30:00+08');


-- ============================================
-- COURSES (25 courses — expanding from 20)
-- ============================================

INSERT INTO courses (id, title, description, category, cost, mode, duration, education_type, external_url, status, featured, created_at) VALUES

-- Technology & IT
('c0000001-0000-0000-0000-000000000001', 'CS50: Introduction to Computer Science', 'Harvard University''s introduction to computer science and the art of programming. Covers algorithms, data structures, web development, and more.', 'technology', 'free', 'online', 'medium', 'formal', 'https://cs50.harvard.edu/', 'approved', true, '2026-05-12 10:00:00+08'),

('c0000001-0000-0000-0000-000000000002', 'Google IT Support Professional Certificate', 'Prepare for a career in IT support with this professional certificate from Google. Learn troubleshooting, networking, operating systems, and security.', 'technology', 'paid', 'online', 'medium', 'non_formal', 'https://www.coursera.org/professional-certificates/google-it-support', 'approved', true, '2026-05-12 10:00:00+08'),

('c0000001-0000-0000-0000-000000000003', 'freeCodeCamp Full Stack Web Development', 'Learn HTML, CSS, JavaScript, Node.js, React, and databases through hands-on projects. Completely free and self-paced curriculum.', 'technology', 'free', 'online', 'long', 'non_formal', 'https://www.freecodecamp.org/', 'approved', false, '2026-05-13 10:00:00+08'),

('c0000001-0000-0000-0000-000000000004', 'MDEC Digital Skills Training', 'Malaysia Digital Economy Corporation''s initiative to upskill Malaysians in digital technologies including AI, cloud computing, and data analytics.', 'technology', 'free', 'hybrid', 'short', 'non_formal', 'https://mdec.my/', 'approved', true, '2026-05-14 10:00:00+08'),

('c0000001-0000-0000-0000-000000000005', 'AWS Cloud Practitioner Certification', 'Entry-level cloud computing certification from Amazon Web Services. Covers cloud concepts, security, technology, and billing.', 'technology', 'paid', 'online', 'short', 'non_formal', 'https://aws.amazon.com/certification/certified-cloud-practitioner/', 'approved', false, '2026-05-15 10:00:00+08'),

('c0000001-0000-0000-0000-000000000006', 'Python for Everybody (University of Michigan)', 'A beginner-friendly specialization that teaches Python programming from scratch. Covers data structures, web scraping, and databases.', 'technology', 'free', 'online', 'medium', 'non_formal', 'https://www.coursera.org/specializations/python', 'approved', false, '2026-05-16 10:00:00+08'),

-- Business & Management
('c0000001-0000-0000-0000-000000000007', 'Khan Academy Economics & Finance', 'Free courses covering microeconomics, macroeconomics, finance, and capital markets. Self-paced with interactive exercises.', 'business', 'free', 'online', 'medium', 'non_formal', 'https://www.khanacademy.org/economics-finance-domain', 'approved', false, '2026-05-17 10:00:00+08'),

('c0000001-0000-0000-0000-000000000008', 'HRDF Certified Training Programs', 'Human Resources Development Fund Malaysia certified programs for workforce upskilling. Various business and management courses available.', 'business', 'scholarship', 'in_person', 'short', 'non_formal', 'https://www.hrdf.com.my/', 'approved', true, '2026-05-18 10:00:00+08'),

('c0000001-0000-0000-0000-000000000009', 'Coursera Business Specialization', 'Comprehensive business courses from top universities including Wharton, INSEAD, and University of Michigan. Topics include strategy, marketing, and leadership.', 'business', 'paid', 'online', 'medium', 'non_formal', 'https://www.coursera.org/browse/business', 'approved', false, '2026-05-19 10:00:00+08'),

('c0000001-0000-0000-0000-000000000010', 'Project Management Professional (PMP)', 'Globally recognized project management certification. Covers project planning, execution, monitoring, and closing.', 'business', 'paid', 'hybrid', 'medium', 'formal', 'https://www.pmi.org/certifications/project-management-pmp', 'approved', false, '2026-05-20 10:00:00+08'),

('c0000001-0000-0000-0000-000000000011', 'Google Digital Marketing Certificate', 'Learn digital marketing fundamentals including SEO, SEM, social media, and analytics. Industry-recognized certification.', 'business', 'paid', 'online', 'short', 'non_formal', 'https://grow.google/certificates/digital-marketing-ecommerce/', 'approved', false, '2026-05-21 10:00:00+08'),

-- Creative Arts & Design
('c0000001-0000-0000-0000-000000000012', 'Canva Design School', 'Free design courses covering graphic design fundamentals, branding, social media design, and presentation skills using Canva.', 'creative', 'free', 'online', 'short', 'non_formal', 'https://www.canva.com/designschool/', 'approved', false, '2026-05-22 10:00:00+08'),

('c0000001-0000-0000-0000-000000000013', 'Skillshare Creative Courses', 'Online learning community with thousands of classes in illustration, design, photography, video, and creative writing.', 'creative', 'paid', 'online', 'short', 'non_formal', 'https://www.skillshare.com/', 'approved', true, '2026-05-23 10:00:00+08'),

('c0000001-0000-0000-0000-000000000014', 'Bachelor of Design (Multimedia)', 'Full undergraduate degree program in multimedia design covering UI/UX, motion graphics, 3D modeling, and interactive media.', 'creative', 'paid', 'in_person', 'long', 'formal', 'https://www.apu.edu.my/', 'approved', false, '2026-05-24 10:00:00+08'),

('c0000001-0000-0000-0000-000000000015', 'Udemy Photography Masterclass', 'Comprehensive photography course covering camera settings, composition, lighting, and post-processing techniques.', 'creative', 'paid', 'online', 'medium', 'non_formal', 'https://www.udemy.com/', 'approved', false, '2026-05-25 10:00:00+08'),

('c0000001-0000-0000-0000-000000000016', 'Adobe Creative Suite Fundamentals', 'Learn Photoshop, Illustrator, and InDesign from scratch. Project-based curriculum covering print and digital design.', 'creative', 'paid', 'online', 'medium', 'non_formal', 'https://www.adobe.com/learn.html', 'approved', false, '2026-05-26 10:00:00+08'),

-- Health & Sciences
('c0000001-0000-0000-0000-000000000017', 'Coursera Public Health Specialization', 'Johns Hopkins University''s public health courses covering epidemiology, biostatistics, health policy, and global health challenges.', 'health', 'paid', 'online', 'medium', 'non_formal', 'https://www.coursera.org/specializations/public-health', 'approved', false, '2026-05-27 10:00:00+08'),

('c0000001-0000-0000-0000-000000000018', 'First Aid & CPR Certification', 'Malaysian Red Crescent Society certified first aid and CPR training. Essential life-saving skills for everyone.', 'health', 'paid', 'in_person', 'short', 'non_formal', 'https://www.redcrescent.org.my/', 'approved', false, '2026-05-28 10:00:00+08'),

('c0000001-0000-0000-0000-000000000019', 'edX Biology & Life Sciences', 'Free courses from MIT, Harvard, and other top universities covering molecular biology, genetics, neuroscience, and ecology.', 'health', 'free', 'online', 'medium', 'non_formal', 'https://www.edx.org/learn/biology', 'approved', true, '2026-05-29 10:00:00+08'),

('c0000001-0000-0000-0000-000000000020', 'Mental Health First Aid Malaysia', 'Learn to recognise signs of mental health challenges and provide initial support. Certified by the Malaysian Mental Health Association.', 'health', 'paid', 'hybrid', 'short', 'non_formal', 'https://www.mmha.org.my/', 'approved', false, '2026-05-30 10:00:00+08'),

-- Vocational & Trade Skills
('c0000001-0000-0000-0000-000000000021', 'TVET Malaysia Programs', 'Technical and Vocational Education and Training programs in Malaysia. Covers electrical, mechanical, automotive, and construction trades.', 'vocational', 'scholarship', 'in_person', 'long', 'vocational', 'https://www.mypolycc.edu.my/', 'approved', false, '2026-06-01 10:00:00+08'),

('c0000001-0000-0000-0000-000000000022', 'Petronas Technical Training Scheme', 'Petronas-sponsored technical training for Malaysian youth. Includes scholarships for engineering and technical vocational programs.', 'vocational', 'scholarship', 'in_person', 'long', 'vocational', 'https://www.petronas.com/', 'approved', false, '2026-06-02 10:00:00+08'),

('c0000001-0000-0000-0000-000000000023', 'Community Cooking Workshop', 'Local community-organized cooking workshops teaching traditional Malaysian and international cuisine. Weekly sessions.', 'vocational', 'free', 'in_person', 'short', 'non_formal', 'https://www.community-cooking.example.com/', 'approved', false, '2026-06-03 10:00:00+08'),

('c0000001-0000-0000-0000-000000000024', 'Barista Skills & Coffee Art', 'Professional barista training covering espresso techniques, latte art, coffee origins, and cafe operations. Industry-recognised certification.', 'vocational', 'paid', 'in_person', 'short', 'vocational', 'https://www.baristainstitute.com/', 'approved', false, '2026-06-04 10:00:00+08'),

('c0000001-0000-0000-0000-000000000025', 'AutoCAD & Technical Drawing', 'Learn 2D and 3D technical drawing using AutoCAD. Essential for engineering, architecture, and manufacturing roles.', 'vocational', 'paid', 'hybrid', 'medium', 'vocational', 'https://www.autodesk.com/learn', 'approved', false, '2026-06-05 10:00:00+08');


-- ============================================
-- RESOURCES (educational content + links)
-- ============================================

INSERT INTO resources (title, content, category, external_url, "order") VALUES

('What is Formal Education?', '<p>Formal education refers to the structured educational system that runs from primary school through university. It follows a curriculum set by educational authorities and leads to formally recognised qualifications such as diplomas, degrees, and certificates.</p>
<p><strong>Key characteristics:</strong></p>
<ul>
<li>Follows a structured curriculum and syllabus</li>
<li>Delivered by trained and certified teachers/lecturers</li>
<li>Leads to recognised qualifications (SPM, diploma, degree, etc.)</li>
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

('What is Non-Formal Education?', '<p>Non-formal education refers to organised learning activities outside the formal education system. While structured and intentional, these programs are more flexible and don''t necessarily lead to formal qualifications.</p>
<p><strong>Key characteristics:</strong></p>
<ul>
<li>Organised but flexible in structure</li>
<li>Learner-centred and often practical</li>
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

('What is Lifelong Learning?', '<p>Lifelong learning is the ongoing, voluntary, and self-motivated pursuit of knowledge for personal or professional development. It extends beyond formal education and encompasses all learning throughout one''s life.</p>
<p><strong>Why is lifelong learning important?</strong></p>
<ul>
<li><strong>Career relevance:</strong> The job market evolves rapidly — continuous learning helps you stay competitive</li>
<li><strong>Personal growth:</strong> Learning new skills and knowledge enriches your life and perspective</li>
<li><strong>Adaptability:</strong> Lifelong learners are better equipped to adapt to change</li>
<li><strong>Economic contribution:</strong> A skilled workforce drives economic growth and innovation</li>
</ul>
<p><strong>How to practise lifelong learning:</strong></p>
<ul>
<li>Set personal learning goals each year</li>
<li>Take advantage of free online courses</li>
<li>Join learning communities and study groups</li>
<li>Read widely and stay curious</li>
<li>Attend workshops, webinars, and conferences</li>
</ul>', 'lifelong_learning', NULL, 1),

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

('The Role of Technology in Education Access', '<p>Technology has transformed how people access education, but significant challenges remain.</p>
<p><strong>Opportunities:</strong></p>
<ul>
<li>MOOCs (Massive Open Online Courses) have made university-level content freely available worldwide</li>
<li>Mobile learning enables access in areas without traditional infrastructure</li>
<li>AI-powered personalisation can match learners with suitable courses</li>
<li>Online communities create peer learning networks across borders</li>
</ul>
<p><strong>Challenges:</strong></p>
<ul>
<li>The digital divide means not everyone has reliable internet or devices</li>
<li>Information overload makes it hard to find quality, relevant courses</li>
<li>Accreditation and quality vary widely across online platforms</li>
<li>Self-directed learning requires motivation and digital literacy skills</li>
</ul>
<p>Platforms like The Learning Pulse address the discoverability challenge by curating and organising existing resources into a searchable directory.</p>', 'sdg_info', NULL, 2),

-- External links
('UNESCO Education Resources', 'Official UNESCO resources on education, lifelong learning, and SDG 4', 'external_link', 'https://www.unesco.org/en/education', 1),
('Ministry of Education Malaysia', 'Official Malaysian Ministry of Education portal with policies and programs', 'external_link', 'https://www.moe.gov.my/', 2),
('Coursera — Free Online Courses', 'Access thousands of free courses from top universities worldwide', 'external_link', 'https://www.coursera.org/', 3),
('edX — Online Learning Platform', 'Harvard and MIT-founded platform offering free courses from top institutions', 'external_link', 'https://www.edx.org/', 4),
('Khan Academy — Free Learning', 'Free world-class education for anyone, anywhere', 'external_link', 'https://www.khanacademy.org/', 5),
('HRDF Malaysia', 'Human Resources Development Fund for Malaysian workforce training', 'external_link', 'https://www.hrdf.com.my/', 6),
('MyMOOC Malaysia', 'Malaysia''s Massive Open Online Course platform for lifelong learning', 'external_link', 'https://www.openlearning.com/malaysiamoocs/', 7),
('UN SDG 4 — Quality Education', 'Official United Nations page for Sustainable Development Goal 4', 'external_link', 'https://sdgs.un.org/goals/goal4', 8),
('Malaysian Qualifications Agency (MQA)', 'National body for quality assurance of higher education in Malaysia', 'external_link', 'https://www.mqa.gov.my/', 9),
('Google Digital Garage', 'Free online courses from Google covering digital skills, data, and career development', 'external_link', 'https://learndigital.withgoogle.com/', 10);


-- ============================================
-- THREADS + REPLIES
-- ============================================

INSERT INTO threads (id, title, body, author_id, category, is_pinned, created_at) VALUES
('d0000001-0000-0000-0000-000000000001',
 'Welcome to The Learning Pulse Community!',
 'Hey everyone! Welcome to our community forum. This is a space to discuss courses, share learning experiences, ask questions, and support each other on our education journeys. Feel free to introduce yourself and tell us what you''re currently learning!',
 'a0000001-0000-0000-0000-000000000001',
 'General Discussion', true, '2026-05-15 12:00:00+08'),

('d0000001-0000-0000-0000-000000000002',
 'Best free courses for learning Python in 2026?',
 'I''m a complete beginner looking to learn Python. I''ve seen a few options like freeCodeCamp and Coursera but I''m not sure which one to pick. Any recommendations? I prefer something with hands-on projects rather than just watching videos.',
 'b0000001-0000-0000-0000-000000000001',
 'Course Reviews', false, '2026-05-20 14:30:00+08'),

('d0000001-0000-0000-0000-000000000003',
 'Anyone done the HRDF training programs?',
 'I saw HRDF courses listed on here and I''m curious if anyone has gone through their programs. How was the experience? Was it useful for your career? I''m a working professional looking to upskill in project management.',
 'b0000001-0000-0000-0000-000000000004',
 'Course Reviews', false, '2026-05-25 09:15:00+08'),

('d0000001-0000-0000-0000-000000000004',
 'Study group for CS50?',
 'Is anyone else currently going through CS50? I''m on week 3 and it''s getting challenging. Would love to form a study group where we can discuss problem sets and help each other out. I''m based in KL but happy to meet online too.',
 'b0000001-0000-0000-0000-000000000005',
 'Study Groups', false, '2026-06-01 16:00:00+08'),

('d0000001-0000-0000-0000-000000000005',
 'Career change from accounting to tech — where to start?',
 'I''ve been working in accounting for 5 years and I want to transition into tech, specifically data analytics or web development. I have no coding background. What courses would you recommend for someone making this switch? Budget isn''t a major concern but I prefer something structured.',
 'b0000001-0000-0000-0000-000000000006',
 'Career Advice', false, '2026-06-05 11:45:00+08'),

('d0000001-0000-0000-0000-000000000006',
 'Useful YouTube channels for self-study',
 'I wanted to share some YouTube channels I''ve found really helpful for learning alongside formal courses:\n\n- 3Blue1Brown (maths visualisation)\n- Traversy Media (web dev)\n- CrashCourse (general subjects)\n- Ali Abdaal (productivity & study tips)\n\nFeel free to add your own recommendations!',
 'b0000001-0000-0000-0000-000000000009',
 'Resources & Tips', false, '2026-06-10 13:20:00+08'),

('d0000001-0000-0000-0000-000000000007',
 'Tips for staying motivated during online courses',
 'I keep starting online courses but never finishing them. I''ve started and abandoned probably 5 courses this year. Does anyone have tips for actually completing an online course? How do you stay motivated when there''s no deadline or classmates to keep you accountable?',
 'b0000001-0000-0000-0000-000000000008',
 'General Discussion', false, '2026-06-15 10:00:00+08'),

('d0000001-0000-0000-0000-000000000008',
 'TVET programs in Malaysia — underrated?',
 'I feel like vocational training in Malaysia doesn''t get enough attention. TVET programs offer solid career pathways in technical fields and many come with scholarships. Has anyone here gone through a TVET program? What was your experience?',
 'b0000001-0000-0000-0000-000000000013',
 'General Discussion', false, '2026-06-20 15:30:00+08');


-- Thread replies
INSERT INTO thread_replies (thread_id, author_id, body, created_at) VALUES
-- Replies to "Welcome" thread
('d0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000002', 'Thanks for creating this space! I''m Siti, currently studying business management and looking to pick up some digital marketing skills on the side. Excited to connect with everyone here.', '2026-05-16 08:30:00+08'),
('d0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000003', 'Hi everyone! I''m Raj, a software developer. I''m here because I believe in lifelong learning — currently exploring AI/ML courses on Coursera. Looking forward to sharing recommendations!', '2026-05-16 12:15:00+08'),
('d0000001-0000-0000-0000-000000000001', 'b0000001-0000-0000-0000-000000000007', 'Great initiative! I just graduated and I''m trying to figure out what skills to develop before entering the job market. This platform is exactly what I needed.', '2026-05-17 09:00:00+08'),

-- Replies to "Python" thread
('d0000001-0000-0000-0000-000000000002', 'b0000001-0000-0000-0000-000000000003', 'Definitely recommend "Python for Everybody" on Coursera. It''s by the University of Michigan and the instructor explains things very clearly. Plus it''s free to audit. The assignments are hands-on too.', '2026-05-21 10:00:00+08'),
('d0000001-0000-0000-0000-000000000002', 'b0000001-0000-0000-0000-000000000005', 'I started with freeCodeCamp''s Python section and then moved to CS50. Both are great but CS50 is more rigorous. If you want quick wins, start with freeCodeCamp. If you want depth, go CS50.', '2026-05-21 14:30:00+08'),
('d0000001-0000-0000-0000-000000000002', 'b0000001-0000-0000-0000-000000000009', 'Automate the Boring Stuff with Python — it''s free online and focuses on practical automation tasks. Really motivating because you can immediately use what you learn.', '2026-05-22 09:45:00+08'),

-- Replies to "HRDF" thread
('d0000001-0000-0000-0000-000000000003', 'b0000001-0000-0000-0000-000000000010', 'I did an HRDF-funded project management workshop last year. It was 3 days in-person and quite intensive. The content was solid and the networking was valuable. Highly recommend if your employer supports it.', '2026-05-26 11:00:00+08'),
('d0000001-0000-0000-0000-000000000003', 'b0000001-0000-0000-0000-000000000011', 'Check with your HR department — many companies have HRDF credits they don''t use. The programs are usually well-structured since they have to meet HRDF standards.', '2026-05-27 16:20:00+08'),

-- Replies to "CS50 study group" thread
('d0000001-0000-0000-0000-000000000004', 'b0000001-0000-0000-0000-000000000001', 'I''m on week 4! Would love to join a study group. We could use Discord or WhatsApp? Week 3 was tough for me too — the sorting algorithms took a while to click.', '2026-06-02 10:30:00+08'),
('d0000001-0000-0000-0000-000000000004', 'b0000001-0000-0000-0000-000000000012', 'Count me in! I just started CS50 two weeks ago. Having study partners would definitely help. I''m also in KL so either online or in-person works for me.', '2026-06-02 14:00:00+08'),

-- Replies to "Career change" thread
('d0000001-0000-0000-0000-000000000005', 'b0000001-0000-0000-0000-000000000007', 'I made a similar switch from finance to data analytics last year. I''d suggest starting with Google''s Data Analytics Certificate on Coursera — it''s structured, practical, and respected by employers. Your accounting background is actually a huge advantage for data work!', '2026-06-06 09:00:00+08'),
('d0000001-0000-0000-0000-000000000005', 'b0000001-0000-0000-0000-000000000003', 'For web dev, freeCodeCamp is the best free option. For data analytics, consider the IBM Data Science Professional Certificate on Coursera. Both are listed on this platform actually.', '2026-06-06 15:30:00+08'),
('d0000001-0000-0000-0000-000000000005', 'b0000001-0000-0000-0000-000000000015', 'Don''t underestimate your existing skills! Accounting to data analytics is one of the smoother career transitions because you already understand data, spreadsheets, and business logic. SQL would be a great first language to learn.', '2026-06-07 11:20:00+08'),

-- Replies to "YouTube channels" thread
('d0000001-0000-0000-0000-000000000006', 'b0000001-0000-0000-0000-000000000004', 'Adding to the list: Fireship (short tech explainers), The Organic Chemistry Tutor (maths & science), and TED-Ed (general knowledge). All incredible free resources!', '2026-06-11 08:45:00+08'),
('d0000001-0000-0000-0000-000000000006', 'b0000001-0000-0000-0000-000000000014', 'For design, The Futur and Flux Academy are amazing. And for business, I''d add Harvard Business Review''s channel — they have great short videos on management concepts.', '2026-06-11 16:00:00+08'),

-- Replies to "Staying motivated" thread
('d0000001-0000-0000-0000-000000000007', 'b0000001-0000-0000-0000-000000000002', 'What works for me: I set a daily minimum of just 15 minutes. Some days I do more, but the low bar means I never skip. Also, I tell a friend what I''m learning — accountability helps a lot.', '2026-06-16 09:30:00+08'),
('d0000001-0000-0000-0000-000000000007', 'b0000001-0000-0000-0000-000000000006', 'I had the same problem! Two things that helped: 1) Pick courses with certificates — having something tangible to work toward matters. 2) Join a study group or community forum (like this one!) so you have people to discuss the material with.', '2026-06-16 14:00:00+08'),
('d0000001-0000-0000-0000-000000000007', 'b0000001-0000-0000-0000-000000000016', 'Try blocking out a specific time in your calendar for learning, like 8–9am every day. Treat it like a meeting you can''t skip. Once it becomes a habit, it''s much easier to stick with.', '2026-06-17 10:15:00+08'),

-- Replies to "TVET" thread
('d0000001-0000-0000-0000-000000000008', 'b0000001-0000-0000-0000-000000000017', 'Completely agree that TVET is underrated. I did a certificate in electrical technology through a government polytechnic and it led directly to a job. The hands-on training was more valuable than any theory class I took in school.', '2026-06-21 09:00:00+08'),
('d0000001-0000-0000-0000-000000000008', 'b0000001-0000-0000-0000-000000000001', 'The Petronas training scheme is excellent if you can get in. They cover everything — tuition, living expenses, and even guarantee job placement. Definitely worth looking into for younger learners.', '2026-06-21 14:45:00+08');


-- ============================================
-- QUIZ RESULTS (15 sample results)
-- ============================================

INSERT INTO quiz_results (user_id, participated_12_months, education_level, interest_field, learning_goal, preferred_mode, budget, time_commitment, recommended_course_ids, created_at) VALUES
('b0000001-0000-0000-0000-000000000001', true, 'Undergraduate', 'technology', 'Career advancement', 'online', 'free', 'short', ARRAY['c0000001-0000-0000-0000-000000000001'::uuid, 'c0000001-0000-0000-0000-000000000003'::uuid], '2026-05-22 15:00:00+08'),
('b0000001-0000-0000-0000-000000000002', false, 'Diploma', 'business', 'Upskilling', 'hybrid', 'under_100', 'medium', ARRAY['c0000001-0000-0000-0000-000000000008'::uuid, 'c0000001-0000-0000-0000-000000000009'::uuid], '2026-05-24 10:30:00+08'),
('b0000001-0000-0000-0000-000000000003', true, 'Postgraduate', 'technology', 'Career advancement', 'online', '', 'short', ARRAY['c0000001-0000-0000-0000-000000000002'::uuid, 'c0000001-0000-0000-0000-000000000005'::uuid], '2026-05-26 14:00:00+08'),
('b0000001-0000-0000-0000-000000000004', true, 'Working professional', 'business', 'Career change', 'in_person', 'under_500', 'medium', ARRAY['c0000001-0000-0000-0000-000000000010'::uuid, 'c0000001-0000-0000-0000-000000000008'::uuid], '2026-05-28 09:00:00+08'),
('b0000001-0000-0000-0000-000000000005', true, 'Undergraduate', 'technology', 'Academic requirement', 'online', 'free', 'long', ARRAY['c0000001-0000-0000-0000-000000000001'::uuid, 'c0000001-0000-0000-0000-000000000006'::uuid], '2026-06-01 11:30:00+08'),
('b0000001-0000-0000-0000-000000000006', false, 'Working professional', 'health', 'Upskilling', 'hybrid', 'under_100', 'short', ARRAY['c0000001-0000-0000-0000-000000000018'::uuid, 'c0000001-0000-0000-0000-000000000020'::uuid], '2026-06-04 16:00:00+08'),
('b0000001-0000-0000-0000-000000000007', true, 'Undergraduate', 'creative', 'Personal interest', 'online', 'free', 'short', ARRAY['c0000001-0000-0000-0000-000000000012'::uuid, 'c0000001-0000-0000-0000-000000000015'::uuid], '2026-06-07 10:00:00+08'),
('b0000001-0000-0000-0000-000000000008', false, 'Secondary school', 'vocational', 'Career advancement', 'in_person', 'free', 'long', ARRAY['c0000001-0000-0000-0000-000000000021'::uuid, 'c0000001-0000-0000-0000-000000000022'::uuid], '2026-06-09 13:30:00+08'),
('b0000001-0000-0000-0000-000000000009', true, 'Diploma', 'technology', 'Upskilling', 'online', 'under_500', 'medium', ARRAY['c0000001-0000-0000-0000-000000000002'::uuid, 'c0000001-0000-0000-0000-000000000005'::uuid], '2026-06-12 08:45:00+08'),
('b0000001-0000-0000-0000-000000000010', true, 'Working professional', 'business', 'Career advancement', 'online', '', 'short', ARRAY['c0000001-0000-0000-0000-000000000011'::uuid, 'c0000001-0000-0000-0000-000000000009'::uuid], '2026-06-14 15:00:00+08'),
(NULL, false, 'Other', 'creative', 'Personal interest', 'online', 'free', 'short', ARRAY['c0000001-0000-0000-0000-000000000012'::uuid], '2026-06-16 11:00:00+08'),
('b0000001-0000-0000-0000-000000000012', true, 'Undergraduate', 'health', 'Academic requirement', 'hybrid', 'under_100', 'medium', ARRAY['c0000001-0000-0000-0000-000000000017'::uuid, 'c0000001-0000-0000-0000-000000000019'::uuid], '2026-06-18 14:20:00+08'),
('b0000001-0000-0000-0000-000000000014', false, 'Secondary school', 'technology', 'Career advancement', 'online', 'free', 'medium', ARRAY['c0000001-0000-0000-0000-000000000001'::uuid, 'c0000001-0000-0000-0000-000000000003'::uuid, 'c0000001-0000-0000-0000-000000000006'::uuid], '2026-06-20 09:30:00+08'),
(NULL, true, 'Working professional', 'business', 'Upskilling', 'online', 'under_500', 'short', ARRAY['c0000001-0000-0000-0000-000000000010'::uuid, 'c0000001-0000-0000-0000-000000000011'::uuid], '2026-06-22 16:45:00+08'),
('b0000001-0000-0000-0000-000000000016', true, 'Diploma', 'creative', 'Career change', 'online', 'under_100', 'medium', ARRAY['c0000001-0000-0000-0000-000000000013'::uuid, 'c0000001-0000-0000-0000-000000000016'::uuid], '2026-06-25 10:00:00+08');


-- ============================================
-- BOOKMARKS (scattered across users)
-- ============================================

INSERT INTO bookmarks (user_id, course_id) VALUES
('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001'),
('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000003'),
('b0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000006'),
('b0000001-0000-0000-0000-000000000002', 'c0000001-0000-0000-0000-000000000008'),
('b0000001-0000-0000-0000-000000000002', 'c0000001-0000-0000-0000-000000000011'),
('b0000001-0000-0000-0000-000000000003', 'c0000001-0000-0000-0000-000000000001'),
('b0000001-0000-0000-0000-000000000003', 'c0000001-0000-0000-0000-000000000005'),
('b0000001-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000010'),
('b0000001-0000-0000-0000-000000000005', 'c0000001-0000-0000-0000-000000000001'),
('b0000001-0000-0000-0000-000000000005', 'c0000001-0000-0000-0000-000000000004'),
('b0000001-0000-0000-0000-000000000006', 'c0000001-0000-0000-0000-000000000017'),
('b0000001-0000-0000-0000-000000000006', 'c0000001-0000-0000-0000-000000000020'),
('b0000001-0000-0000-0000-000000000007', 'c0000001-0000-0000-0000-000000000012'),
('b0000001-0000-0000-0000-000000000007', 'c0000001-0000-0000-0000-000000000015'),
('b0000001-0000-0000-0000-000000000009', 'c0000001-0000-0000-0000-000000000002'),
('b0000001-0000-0000-0000-000000000009', 'c0000001-0000-0000-0000-000000000005'),
('b0000001-0000-0000-0000-000000000010', 'c0000001-0000-0000-0000-000000000009'),
('b0000001-0000-0000-0000-000000000012', 'c0000001-0000-0000-0000-000000000019'),
('b0000001-0000-0000-0000-000000000013', 'c0000001-0000-0000-0000-000000000021'),
('b0000001-0000-0000-0000-000000000014', 'c0000001-0000-0000-0000-000000000001'),
('b0000001-0000-0000-0000-000000000014', 'c0000001-0000-0000-0000-000000000006'),
('b0000001-0000-0000-0000-000000000016', 'c0000001-0000-0000-0000-000000000013'),
('b0000001-0000-0000-0000-000000000016', 'c0000001-0000-0000-0000-000000000016'),
('b0000001-0000-0000-0000-000000000017', 'c0000001-0000-0000-0000-000000000021');
