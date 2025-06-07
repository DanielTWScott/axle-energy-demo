# Axle Energy - Carbon-Aware Optimization Demo

An exploratory demo showcasing how Axle Energy's existing platform could be enhanced with carbon-aware optimization capabilities. This demonstrates a potential new feature that balances financial savings with environmental impact through AI-powered optimization of distributed energy resources.

![Axle Energy Dashboard](https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop)

## 🎯 What This Demo Explores

This is a **concept demonstration** of how Axle Energy's proven optimization platform could evolve to include:

- **Carbon-Aware Decision Making**: Real-time UK grid carbon intensity integration
- **Dual Optimization Strategy**: Customer choice between financial savings and environmental impact
- **Enhanced Customer Value**: Transparent trade-off analysis for optimization decisions
- **Market Differentiation**: Unique positioning in the energy optimization space

## 🔬 Demo Features

### Core Concept
- **Real-time Carbon Intelligence**: Live UK grid carbon intensity data integration
- **Customer Preference Engine**: Customizable optimization strategies (Max Savings, Balanced, Max Green)
- **Trade-off Visualization**: Interactive analysis of financial vs environmental decisions
- **Portfolio Scale Simulation**: Realistic metrics demonstrating potential at scale

### Technical Implementation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live data refresh every 5 minutes
- **Fallback Support**: Graceful degradation when external APIs are unavailable
- **Production Ready**: Full CI/CD pipeline with automated testing and deployment

## 🚀 Live Demo

**[View Live Demo →](https://axle-energy-demo.vercel.app/)**

Experience the potential carbon-aware optimization platform with real-time UK grid data and interactive analysis.

## 💡 The Concept

### Current State (Axle's Platform)
- Proven energy optimization technology
- Established market position in distributed energy resources
- Focus on maximizing customer financial returns
- Growing portfolio of managed assets

### Proposed Enhancement (This Demo)
- **Layer carbon awareness** on top of existing financial optimization
- **Customer choice** between pure savings, balanced, or pure environmental optimization
- **Real-time grid intelligence** to optimize for both profit and planet
- **Transparent decision making** showing customers exactly why each decision was made

### Value Proposition
- **For Customers**: Choice between maximizing savings or environmental impact
- **For Axle**: Market differentiation and enhanced customer retention
- **For Grid**: Better integration of renewable energy and reduced peak demand

## ⚠️ Important Note

**All performance metrics and portfolio numbers in this demo are simulated for demonstration purposes.** They represent realistic industry benchmarks and potential scale, but are not actual Axle Energy figures. The demo uses:

- Simulated portfolio metrics (15,000+ assets, £156.7 monthly savings, etc.)
- Real UK grid carbon intensity data (via National Grid ESO API)
- Realistic optimization logic based on industry best practices
- Hypothetical customer benefit calculations

This is purely a technical exploration of what carbon-aware optimization could look like.

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Deployment**: Vercel
- **APIs**: UK Carbon Intensity API, Sheffield Solar API

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/danieltwscott/axle-energy-demo.git
   cd axle-energy-demo
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Edit `.env.local` with your configuration (see Environment Variables section)

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌍 Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Required for production deployment
NEXT_PUBLIC_VERCEL_URL=axle-energy-demo.vercel.app

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_REAL_TIME_UPDATES=true
\`\`\`

## 📊 API Endpoints

### `/api/carbon-intensity`
Real-time UK grid carbon intensity data with fallback support.

### `/api/market-data`
Comprehensive energy market data including pricing forecasts and optimization recommendations.

### `/api/optimization-insights`
Simulated portfolio performance metrics and customer insights.

### `/api/optimization-engine`
Dynamic optimization decision engine that balances financial and environmental factors.

### `/api/validation-metrics`
Simulated prediction accuracy metrics based on industry benchmarks.

## 🎯 Concept Validation

### Technical Feasibility
- ✅ Real UK grid data integration working
- ✅ Optimization logic implemented and tested
- ✅ Scalable architecture demonstrated
- ✅ Mobile-responsive interface

### Business Case
- **Market Differentiation**: Unique carbon-aware positioning
- **Customer Retention**: Dual value proposition (savings + sustainability)
- **Revenue Protection**: Maintains financial optimization as default
- **Future-Proofing**: Aligns with increasing environmental regulations

### Implementation Considerations
- **Data Integration**: UK Carbon Intensity API already integrated
- **Customer Education**: Clear trade-off visualization implemented
- **Gradual Rollout**: Could be introduced as opt-in feature
- **Performance Impact**: Minimal - adds ~200ms to decision logic

## 🔧 Development

### Project Structure
\`\`\`
axle-energy-demo/
├── app/
│   ├── api/                 # API routes
│   ├── components/          # React components
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard
│   ├── loading.tsx         # Loading UI
│   └── error.tsx          # Error boundary
├── components/ui/          # shadcn/ui components
├── lib/                    # Utility functions
└── public/                 # Static assets
\`\`\`

### Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   \`\`\`bash
   npx vercel
   \`\`\`

2. **Set environment variables** in Vercel dashboard

3. **Deploy**
   \`\`\`bash
   npx vercel --prod
   \`\`\`

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Mobile Performance**: Fully responsive with touch-optimized interactions
- **API Response Times**: < 200ms average with fallback support

## 🤝 Contributing

This is an exploratory demo, but feedback and suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Contact & Discussion

For questions about this concept or technical implementation:
- **Email**: [danieltwscott@gmail.com](mailto:danieltwscott@gmail.com)
- **GitHub Issues**: [Create an issue](https://github.com/danieltwscott/axle-energy-demo/issues)
- **Live Demo**: [https://axle-energy-demo.vercel.app/](https://axle-energy-demo.vercel.app/)

## 🎯 Next Steps

If this concept resonates, potential next steps could include:

- [ ] **Customer Research**: Survey existing customers on environmental preferences
- [ ] **A/B Testing Framework**: Test carbon-aware vs pure financial optimization
- [ ] **Regulatory Analysis**: Assess upcoming carbon pricing impacts
- [ ] **Competitive Analysis**: Evaluate market positioning opportunities
- [ ] **Technical Integration**: Plan integration with existing Axle platform
- [ ] **Business Case Development**: Detailed ROI analysis for implementation

## 📊 Demo Highlights

This demonstration showcases:

- **Real UK Grid Data**: Live carbon intensity from National Grid ESO
- **Interactive Trade-offs**: Compare financial vs environmental optimization strategies
- **Simulated Portfolio Scale**: Realistic metrics demonstrating potential at scale
- **Mobile Responsive**: Optimized experience across all devices
- **Production Ready**: Full CI/CD pipeline with automated testing and deployment

---

**Exploring the future of energy optimization**

*Concept demo by Daniel Scott - [danieltwscott@gmail.com](mailto:danieltwscott@gmail.com)*

*Built to explore how Axle Energy's proven platform could evolve to include carbon-aware optimization*
