import TopoBackground from '../components/TopoBackground';
import IdentityCard from '../components/IdentityCard';
import EngineeringLogSection from '../sections/Engineering Log/EngineeringLogSection';
import SelectedProjectsSection from '../sections/SelectedProjects/SelectedProjectsSection';
import DesignLabSection from '../sections/DesignLabSection';
import WritingSection from '../sections/Writing/WritingSection';
import FooterSection from '../sections/Footer/FooterSection';

const Home = () => {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      
      {/* 1. Background stays fixed behind everything */}
      <TopoBackground />

      {/* 2. The Content Grid */}
      <main className="w-full max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 relative z-10">
        {/* Identity Section - Full Width */}
        <div className="col-span-1 lg:col-span-12">
          <IdentityCard />
        </div>

        {/* Design Lab - Full Width Bento Grid */}
        <div className="col-span-1 lg:col-span-12">
          <DesignLabSection />
        </div>

        {/* Featured Project - Main Focus (Left) */}
        <div className="col-span-1 lg:col-span-7">
          <SelectedProjectsSection />
        </div>

        {/* Engineering Log - Side List (Right) */}
        <div className="col-span-1 lg:col-span-5">
           <EngineeringLogSection />
        </div>

        {/* Writing - Full Width */}
        <div className="col-span-1 lg:col-span-12">
          <WritingSection />
        </div>

        {/* Footer */}
        <div className="col-span-1 lg:col-span-12">
          <FooterSection />
        </div>
      </main>
    </div>
  );
};

export default Home;
