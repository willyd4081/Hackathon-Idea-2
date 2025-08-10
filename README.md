# oncora - AI-Powered Global Cancer Registry

A comprehensive web application for medical professionals to share anonymized cancer patient data, collaborate with experts globally, and access AI-powered insights for lymphoma treatment optimization.

## 🏥 Features

### Authentication & Security
- **Medical Professional Verification**: Integration with international doctor directory APIs (IQVIA OneKey simulation)
- **HIPAA-Compliant**: Full patient anonymization and secure data handling
- **Role-Based Access**: Verified doctors only access to global registry

### Core Functionality
- **Patient Case Upload**: Anonymized genomic, treatment, and progression data
- **Global Case Search**: Find similar cases worldwide with advanced filtering
- **Expert Network**: Connect with verified lymphoma specialists globally
- **AI Analytics**: Machine learning insights on treatment patterns and outcomes

### Specialization
- **Lymphoma Focus**: Hodgkin's and Non-Hodgkin's lymphoma cases
- **Genomic Integration**: Support for genetic markers and variants
- **Treatment Tracking**: Comprehensive therapy protocols and outcomes
- **Regional Analysis**: Global distribution and regional pattern recognition

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Hackathon-Idea-2
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start:
- Frontend (React): http://localhost:3000
- Backend (Express): http://localhost:3001

### Manual Setup

If you prefer to start services individually:

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm start
```

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Forms**: React Hook Form with validation
- **Charts**: Recharts for analytics visualization
- **Styling**: Custom CSS with CSS-in-JS patterns
- **Icons**: Lucide React
- **UI Components**: Custom design system with blue gradients

### Backend (Node.js + Express)
- **Framework**: Express.js
- **Authentication**: JWT with bcrypt
- **Security**: Helmet, CORS, rate limiting
- **Data Storage**: In-memory (demo) - easily replaceable with database
- **API**: RESTful endpoints with comprehensive error handling

### Security Features
- Rate limiting (100 requests per 15 minutes)
- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Secure headers with Helmet

## 📊 Demo Data

The application includes realistic fake data for demonstration:

### Lymphoma Cases (6 sample cases)
- **Hodgkin Lymphoma**: 2 cases with different age groups and treatments
- **Non-Hodgkin Lymphoma**: 4 cases covering DLBCL, Burkitt, Follicular, and Mantle Cell
- **Genomic Data**: Realistic mutations and translocations
- **Treatments**: Standard protocols (ABVD, R-CHOP, intensive regimens)
- **Outcomes**: Complete remission, partial remission, stable disease

### Expert Network (6 sample experts)
- Verified specialists from major cancer centers
- Different specialties and regions
- Availability status and ratings
- Consultation history

## 🔐 Login Credentials (Demo)

Use any of these combinations to test the application:

```
Medical ID: MD123456
Hospital: Johns Hopkins Hospital
Region: United States - Northeast
Password: demo123
```

```
Medical ID: DOC789012
Hospital: Mayo Clinic  
Region: United States - Midwest
Password: demo123
```

The verification system simulates real-world medical directory integration.

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/verify` - Doctor verification with hospital directory

### Patient Cases
- `GET /api/cases` - Fetch anonymized patient cases (with filters)
- `POST /api/cases` - Upload new patient case

### Analytics
- `GET /api/analytics` - Global treatment analytics and insights

### Utilities
- `GET /api/hospitals` - Hospital directory
- `GET /api/health` - API health check

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradients (#4f46e5 to #7c3aed)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)
- **Background**: Gradient (#667eea to #764ba2)

### Typography
- **Font**: Inter (clean, medical-appropriate)
- **Hierarchy**: Clear heading and body text distinction
- **Accessibility**: High contrast ratios

### Components
- **Rounded Design**: 12px border radius throughout
- **Cards**: Glass morphism effect with backdrop blur
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Consistent input styling with focus states

## 🔒 Privacy & Compliance

### Data Anonymization
- Patient identifiers removed and replaced with UUIDs
- Age ranges instead of exact ages
- Regional location instead of specific addresses
- Medical ID verification without storing sensitive credentials

### Access Control
- Doctor verification required for all data access
- Hospital affiliation validation
- Regional access patterns tracked
- Expert network connections logged

### Security Measures
- All data transmission encrypted (HTTPS in production)
- JWT tokens with expiration
- Rate limiting to prevent abuse
- Input validation and sanitization
- No PHI (Protected Health Information) stored

## 🌍 Global Features

### Internationalization Ready
- Multi-language expert profiles
- Regional treatment pattern analysis
- Time zone aware scheduling
- Currency and unit localization support

### Regional Analysis
- Treatment outcome variations by region
- Genomic variant frequency mapping  
- Healthcare system integration patterns
- Expert network density visualization

## 📈 Analytics & AI Features

### Treatment Optimization
- Response rate predictions based on genomic markers
- Treatment protocol recommendations
- Resistance pattern identification
- Survival probability modeling

### Global Insights
- Cross-regional treatment comparison
- Emerging variant tracking
- Clinical trial enrollment optimization
- Resource allocation insights

## 🤝 Expert Network

### Features
- Real-time availability status
- Specialty-based matching
- Rating and review system
- Multi-language communication
- Video consultation integration
- Case-based collaboration

### Verification
- Medical license validation
- Hospital affiliation confirmation
- Specialty certification checks
- Peer review integration

## 🔄 Future Enhancements

### Technical
- [ ] PostgreSQL database integration
- [ ] Real-time WebSocket connections
- [ ] Mobile application (React Native)
- [ ] Advanced ML model deployment
- [ ] Blockchain for data integrity

### Features
- [ ] More cancer types beyond lymphoma
- [ ] Clinical trial matching
- [ ] Patient outcome prediction
- [ ] Drug interaction analysis
- [ ] Telemedicine integration

### Integrations
- [ ] IQVIA OneKey API
- [ ] FHIR healthcare standards
- [ ] Electronic health records (EHR)
- [ ] Genomic databases (COSMIC, ClinVar)
- [ ] Clinical trial registries

## 📞 Support

For technical support or questions about the medical content:
- **Email**: support@oncora.health
- **Documentation**: [Link to full docs]
- **Medical Advisory**: [Link to medical review board]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏆 Acknowledgments

- Medical advisors for clinical guidance
- Open source community for tools and libraries
- Cancer research institutions for protocol references
- Healthcare standards organizations (HL7, FHIR)

---

**Note**: This is a demonstration application. In a production environment, additional security measures, regulatory compliance (HIPAA, GDPR), and medical device regulations would be required.
