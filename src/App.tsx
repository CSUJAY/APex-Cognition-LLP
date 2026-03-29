import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { DashboardCaseStudies } from './components/DashboardCaseStudies'
import { DashboardCaseStudiesPage } from './components/DashboardCaseStudiesPage'
import { DashboardCaseStudyDetailPage } from './components/DashboardCaseStudyDetailPage'
import { About } from './components/About'
import { Team } from './components/Team'
import { Services } from './components/Services'
import { ThreeDDesign } from './components/ThreeDDesign'
import { CyberAIDesign } from './components/CyberAIDesign'
import { MeetingBuddy } from './components/MeetingBuddy'
import { Projects } from './components/Projects'
import { WhyChooseUs } from './components/WhyChooseUs'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { WebDesignServicesPage } from './components/WebDesignServicesPage'

function App() {
  const pathname = window.location.pathname.toLowerCase()
  const isServicesPage = pathname === '/services' || pathname === '/services/'
  const isCaseStudiesPage =
    pathname === '/dashboard-case-studies' || pathname === '/dashboard-case-studies/'
  const caseStudyDetailPrefix = '/dashboard-case-studies/'
  const isCaseStudyDetailPage =
    pathname.startsWith(caseStudyDetailPrefix) && pathname !== '/dashboard-case-studies/'
  const caseStudySlug = isCaseStudyDetailPage
    ? pathname.slice(caseStudyDetailPrefix.length).replace(/\/+$/, '')
    : ''

  return (
    <div className="min-h-dvh bg-apex-void text-zinc-100">
      <Navbar />
      <main>
        {isServicesPage ? (
          <WebDesignServicesPage />
        ) : isCaseStudyDetailPage ? (
          <DashboardCaseStudyDetailPage slug={caseStudySlug} />
        ) : isCaseStudiesPage ? (
          <DashboardCaseStudiesPage />
        ) : (
          <>
            <Hero />
            <DashboardCaseStudies />
            <About />
            <Services />
            <ThreeDDesign />
            <CyberAIDesign />
            <MeetingBuddy />
            <Projects />
            <WhyChooseUs />
            <Team />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
