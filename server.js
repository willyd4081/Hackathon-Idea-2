const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// In-memory storage (replace with real database in production)
let doctors = [];
let patientCases = [];
let hospitalDirectory = [
  { id: 'mayo-clinic', name: 'Mayo Clinic', region: 'us-midwest', verified: true },
  { id: 'johns-hopkins', name: 'Johns Hopkins Hospital', region: 'us-northeast', verified: true },
  { id: 'cleveland-clinic', name: 'Cleveland Clinic', region: 'us-midwest', verified: true },
  { id: 'mgh', name: 'Massachusetts General Hospital', region: 'us-northeast', verified: true },
  { id: 'ucsf', name: 'UCSF Medical Center', region: 'us-west', verified: true },
  { id: 'cedars-sinai', name: 'Cedars-Sinai Medical Center', region: 'us-west', verified: true }
];

// Initialize with fake data
const initializeFakeData = () => {
  // Add fake lymphoma cases
  const fakeCases = [
    {
      id: uuidv4(),
      patientId: 'patient-' + Math.random().toString(36).substr(2, 9),
      ageRange: '40-49',
      sex: 'female',
      cancerSubtype: 'hodgkin-lymphoma',
      genomicVariants: 'CD30+ Reed-Sternberg cells, EBV positive, normal karyotype',
      treatments: 'ABVD chemotherapy (6 cycles), achieved complete remission after 4 cycles',
      symptoms: ['enlarged-lymph-nodes', 'fever', 'night-sweats', 'weight-loss'],
      progressionNotes: 'Excellent response to standard ABVD. PET-CT showed complete metabolic response. No recurrence at 18-month follow-up. Patient remains in remission.',
      admissionDate: '2023-06-15',
      submittedBy: 'dr-smith-001',
      submittedAt: new Date('2023-12-01').toISOString(),
      region: 'us-northeast',
      outcome: 'complete-remission',
      followUpMonths: 18,
      resistanceFlags: false
    },
    {
      id: uuidv4(),
      patientId: 'patient-' + Math.random().toString(36).substr(2, 9),
      ageRange: '60-69',
      sex: 'male',
      cancerSubtype: 'diffuse-large-b-cell',
      genomicVariants: 'MYC rearrangement t(8;14), BCL2 positive, p53 mutation detected',
      treatments: 'R-CHOP chemotherapy (8 cycles), followed by autologous stem cell transplant, rituximab maintenance',
      symptoms: ['enlarged-lymph-nodes', 'weight-loss', 'fatigue', 'abdominal-pain', 'night-sweats'],
      progressionNotes: 'Initial partial response to R-CHOP due to high-risk cytogenetics. Post-transplant achieved complete remission. Currently on maintenance therapy with excellent tolerance.',
      admissionDate: '2023-03-22',
      submittedBy: 'dr-johnson-002',
      submittedAt: new Date('2023-11-28').toISOString(),
      region: 'us-west',
      outcome: 'complete-remission',
      followUpMonths: 12,
      resistanceFlags: true
    },
    {
      id: uuidv4(),
      patientId: 'patient-' + Math.random().toString(36).substr(2, 9),
      ageRange: '30-39',
      sex: 'male',
      cancerSubtype: 'burkitt-lymphoma',
      genomicVariants: 'MYC translocation t(8;14), high Ki-67 proliferation index >95%, p53 wild type',
      treatments: 'Intensive chemotherapy CODOX-M/IVAC protocol, CNS prophylaxis with high-dose methotrexate',
      symptoms: ['enlarged-lymph-nodes', 'fever', 'weight-loss', 'abdominal-pain', 'fatigue'],
      progressionNotes: 'Highly aggressive presentation with rapid doubling time. Excellent response to intensive protocol. Achieved complete remission after 2 cycles. Continues in remission.',
      admissionDate: '2023-08-10',
      submittedBy: 'dr-wilson-003',
      submittedAt: new Date('2023-12-05').toISOString(),
      region: 'canada',
      outcome: 'complete-remission',
      followUpMonths: 6,
      resistanceFlags: false
    },
    {
      id: uuidv4(),
      patientId: 'patient-' + Math.random().toString(36).substr(2, 9),
      ageRange: '50-59',
      sex: 'female',
      cancerSubtype: 'follicular-lymphoma',
      genomicVariants: 'BCL2 translocation t(14;18), grade 3A histology, CREBBP mutation',
      treatments: 'R-bendamustine induction (6 cycles), rituximab maintenance therapy ongoing',
      symptoms: ['enlarged-lymph-nodes', 'fatigue', 'night-sweats'],
      progressionNotes: 'Indolent course with excellent response to bendamustine-rituximab. Currently on maintenance rituximab every 3 months. Disease remains stable.',
      admissionDate: '2023-05-18',
      submittedBy: 'dr-brown-004',
      submittedAt: new Date('2023-11-30').toISOString(),
      region: 'uk',
      outcome: 'partial-remission',
      followUpMonths: 8,
      resistanceFlags: false
    },
    {
      id: uuidv4(),
      patientId: 'patient-' + Math.random().toString(36).substr(2, 9),
      ageRange: '20-29',
      sex: 'female',
      cancerSubtype: 'hodgkin-lymphoma',
      genomicVariants: 'CD30+ Reed-Sternberg cells, EBV negative, mixed cellularity subtype',
      treatments: 'ABVD chemotherapy (4 cycles), involved field radiation therapy (30 Gy)',
      symptoms: ['enlarged-lymph-nodes', 'fever', 'night-sweats', 'itching'],
      progressionNotes: 'Early stage disease with B symptoms. Combined modality treatment resulted in complete response. Excellent long-term prognosis expected.',
      admissionDate: '2023-07-12',
      submittedBy: 'dr-garcia-005',
      submittedAt: new Date('2023-12-10').toISOString(),
      region: 'us-southeast',
      outcome: 'complete-remission',
      followUpMonths: 5,
      resistanceFlags: false
    },
    {
      id: uuidv4(),
      patientId: 'patient-' + Math.random().toString(36).substr(2, 9),
      ageRange: '70-79',
      sex: 'male',
      cancerSubtype: 'mantle-cell-lymphoma',
      genomicVariants: 'Cyclin D1 overexpression, t(11;14) translocation, TP53 mutation',
      treatments: 'R-CHOP chemotherapy (6 cycles), ibrutinib maintenance',
      symptoms: ['enlarged-lymph-nodes', 'weight-loss', 'fatigue', 'bone-pain'],
      progressionNotes: 'Aggressive variant with TP53 mutation. Good initial response to R-CHOP. Started on ibrutinib maintenance due to high-risk features. Currently stable.',
      admissionDate: '2023-04-28',
      submittedBy: 'dr-lee-006',
      submittedAt: new Date('2023-12-08').toISOString(),
      region: 'asia-pacific',
      outcome: 'stable-disease',
      followUpMonths: 9,
      resistanceFlags: true
    }
  ];

  patientCases.push(...fakeCases);
};

// Initialize fake data
initializeFakeData();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// Doctor verification (simulated IQVIA OneKey integration)
app.post('/api/auth/verify', async (req, res) => {
  try {
    const { medicalId, hospital, region, email } = req.body;

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate verification logic
    const isValidHospital = hospitalDirectory.some(h => h.id === hospital?.value);
    const isValidId = medicalId && medicalId.length >= 6;

    if (!isValidHospital || !isValidId) {
      return res.status(400).json({
        success: false,
        message: 'Verification failed. Please check your credentials.'
      });
    }

    // Create/update doctor record
    const doctorId = `dr-${medicalId}-${Date.now()}`;
    const hospitalInfo = hospitalDirectory.find(h => h.id === hospital.value);
    
    const doctor = {
      id: doctorId,
      medicalId,
      hospital: hospitalInfo,
      region: region?.label || 'Unknown',
      email,
      verified: true,
      verifiedAt: new Date().toISOString()
    };

    doctors.push(doctor);

    // Generate JWT token
    const token = jwt.sign(
      { id: doctorId, medicalId, verified: true },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      doctor,
      token
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during verification'
    });
  }
});

// Get all patient cases (anonymized)
app.get('/api/cases', authenticateToken, (req, res) => {
  try {
    const { 
      cancerSubtype, 
      region, 
      ageRange, 
      genomicMarker, 
      search,
      limit = 50,
      offset = 0 
    } = req.query;

    let filteredCases = [...patientCases];

    // Apply filters
    if (cancerSubtype) {
      filteredCases = filteredCases.filter(case_ => case_.cancerSubtype === cancerSubtype);
    }
    if (region) {
      filteredCases = filteredCases.filter(case_ => case_.region === region);
    }
    if (ageRange) {
      filteredCases = filteredCases.filter(case_ => case_.ageRange === ageRange);
    }
    if (genomicMarker) {
      filteredCases = filteredCases.filter(case_ => 
        case_.genomicVariants.toLowerCase().includes(genomicMarker.toLowerCase())
      );
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCases = filteredCases.filter(case_ =>
        case_.cancerSubtype.toLowerCase().includes(searchLower) ||
        case_.genomicVariants.toLowerCase().includes(searchLower) ||
        case_.treatments.toLowerCase().includes(searchLower) ||
        case_.progressionNotes.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const total = filteredCases.length;
    const paginatedCases = filteredCases.slice(
      parseInt(offset), 
      parseInt(offset) + parseInt(limit)
    );

    res.json({
      success: true,
      cases: paginatedCases,
      total,
      hasMore: (parseInt(offset) + parseInt(limit)) < total
    });

  } catch (error) {
    console.error('Error fetching cases:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching cases'
    });
  }
});

// Create new patient case
app.post('/api/cases', authenticateToken, (req, res) => {
  try {
    const {
      patientAgeRange,
      sex,
      cancerSubtype,
      genomicVariants,
      treatments,
      symptoms,
      progressionNotes,
      admissionDate
    } = req.body;

    // Generate anonymous patient ID
    const patientCase = {
      id: uuidv4(),
      patientId: 'patient-' + Math.random().toString(36).substr(2, 9),
      ageRange: patientAgeRange?.value,
      sex: sex?.value,
      cancerSubtype: cancerSubtype?.value,
      genomicVariants,
      treatments,
      symptoms: symptoms?.map(s => s.value) || [],
      progressionNotes,
      admissionDate,
      submittedBy: req.user.id,
      submittedAt: new Date().toISOString(),
      region: req.user.region || 'unknown',
      resistanceFlags: false,
      followUpMonths: 0
    };

    patientCases.push(patientCase);

    res.json({
      success: true,
      case: patientCase,
      message: 'Patient case uploaded successfully'
    });

  } catch (error) {
    console.error('Error creating case:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating case'
    });
  }
});

// Get analytics data
app.get('/api/analytics', authenticateToken, (req, res) => {
  try {
    const { timeframe = '6months', region = 'global' } = req.query;

    // Calculate analytics from patient cases
    const totalCases = patientCases.length;
    const remissionCases = patientCases.filter(c => c.outcome?.includes('remission')).length;
    const remissionRate = totalCases > 0 ? Math.round((remissionCases / totalCases) * 100) : 0;

    // Cancer type distribution
    const cancerTypes = {};
    patientCases.forEach(case_ => {
      cancerTypes[case_.cancerSubtype] = (cancerTypes[case_.cancerSubtype] || 0) + 1;
    });

    // Regional distribution
    const regions = {};
    patientCases.forEach(case_ => {
      regions[case_.region] = (regions[case_.region] || 0) + 1;
    });

    // Genomic variants frequency
    const genomicVariants = {};
    patientCases.forEach(case_ => {
      const variants = case_.genomicVariants.toLowerCase();
      if (variants.includes('myc')) genomicVariants.myc = (genomicVariants.myc || 0) + 1;
      if (variants.includes('bcl2')) genomicVariants.bcl2 = (genomicVariants.bcl2 || 0) + 1;
      if (variants.includes('p53')) genomicVariants.p53 = (genomicVariants.p53 || 0) + 1;
      if (variants.includes('cd30')) genomicVariants.cd30 = (genomicVariants.cd30 || 0) + 1;
    });

    res.json({
      success: true,
      analytics: {
        totalCases,
        remissionRate,
        cancerTypeDistribution: cancerTypes,
        regionalDistribution: regions,
        genomicVariants,
        timeframe,
        region
      }
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching analytics'
    });
  }
});

// Get hospital directory
app.get('/api/hospitals', (req, res) => {
  try {
    res.json({
      success: true,
      hospitals: hospitalDirectory
    });
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching hospitals'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'oncora API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🏥 oncora API server running on port ${PORT}`);
  console.log(`📊 Initialized with ${patientCases.length} sample lymphoma cases`);
  console.log(`🔒 Security: Rate limiting and authentication enabled`);
});

module.exports = app;
