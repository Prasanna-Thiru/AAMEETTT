import type { Metadata } from "next";
import PageHero from "@/frontend/components/ui/PageHero";
import { CTABanner, SectionHeader, AnimatedCard, FeatureItem } from "@/frontend/components/ui";
import { FaDesktop, FaRobot, FaBroadcastTower, FaMicroscope, FaBookReader, FaBaseballBall, FaFutbol, FaBasketballBall, FaSwimmer, FaCrosshairs, FaBed, FaUtensils, FaBook, FaUserShield, FaBus, FaLeaf, FaMapMarkerAlt, FaShieldAlt, FaBuilding } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Explore world-class facilities at MNRS — smart classrooms, AI lab, sports grounds, swimming pool, hostel, and a serene 10-acre green campus.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        title="World-Class"
        highlight="Facilities"
        subtitle="Every space at MNRS is designed to inspire learning, growth, and excellence."
        breadcrumb="Facilities"
      />

      {/* Academics & Labs */}
      <section className="section-pad bg-white" id="academics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Academics & Labs" title="Smart Learning" highlight="Environments" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaDesktop,        title: "Smart Classrooms",              desc: "Interactive digital boards, high-speed internet, and multimedia tools that transform lessons into immersive experiences." },
              { icon: FaRobot,          title: "AI & Robotics Lab",             desc: "State-of-the-art lab where students explore AI, robotics, coding, and STEM projects — building the skills of tomorrow." },
              { icon: FaBroadcastTower, title: "Broadcasting & Media Studio",   desc: "Professional-grade studio for student journalism, podcasting, video production, and public speaking." },
              { icon: FaMicroscope,     title: "Experiential Learning Spaces",  desc: "Science labs, maker spaces, and project rooms for hands-on, inquiry-based learning." },
            ].map((f, i) => (
              <AnimatedCard key={f.title} delay={i * 0.08}>
                <div className="card p-6 h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4">
                    <f.icon className="text-brand-blue text-xl" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-brand-dark mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Library */}
      <section className="section-pad bg-brand-cream" id="library">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedCard>
              <div className="bg-gradient-to-br from-brand-green-dark to-brand-blue rounded-2xl p-12 text-center text-white">
                <FaBookReader className="text-6xl text-brand-gold mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-3">MNRS Library</h3>
                <p className="text-green-100 text-sm leading-relaxed">A rich, curated reading environment stocked with thousands of books spanning fiction, non-fiction, science, arts, and world literature.</p>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.15}>
              <p className="text-brand-blue-light text-xs font-semibold uppercase tracking-widest mb-3">Library</p>
              <h2 className="font-serif text-3xl font-bold text-brand-dark mb-5">A World of <span className="text-brand-gold">Knowledge</span></h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">The MNRS library is designed to foster a love of reading and independent inquiry — a sanctuary for curious minds of all ages.</p>
              <ul className="space-y-3">
                {["Extensive curated book collection", "Digital resources and e-library access", "Dedicated reading zones for different age groups", "Regular reading programs and book clubs", "Quiet study and research spaces"].map((item) => (
                  <FeatureItem key={item} text={item} />
                ))}
              </ul>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Sports */}
      <section className="section-pad bg-white" id="sports">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Sports Infrastructure" title="Champions Are" highlight="Made Here" subtitle="World-class sports facilities that develop physical fitness, teamwork, and competitive spirit." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { icon: FaBaseballBall,    title: "Cricket Ground",    desc: "Full-size ground with practice nets and professional coaching." },
              { icon: FaFutbol,          title: "Football & Hockey", desc: "Dedicated grounds with proper turf and goal posts." },
              { icon: FaBasketballBall,  title: "Basketball Court",  desc: "Regulation-size court for training and competitions." },
              { icon: FaBook,            title: "Badminton Courts",  desc: "Multiple indoor courts for year-round play." },
              { icon: FaSwimmer,         title: "Swimming Pool",     desc: "Supervised pool with trained coaches for all skill levels." },
              { icon: FaBook,            title: "Indoor Games",      desc: "Table tennis, chess, carrom, and more." },
              { icon: FaCrosshairs,      title: "Rifle Shooting Range", desc: "Professional range for precision sports and national competitions." },
              { icon: FaBook,            title: "Athletics Track",   desc: "Full athletics track for running, field events, and fitness." },
            ].map((s, i) => (
              <AnimatedCard key={s.title} delay={i * 0.06}>
                <div className="card p-5 text-center h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="text-brand-gold" />
                  </div>
                  <h3 className="font-semibold text-brand-dark text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Residential */}
      <section className="section-pad bg-brand-cream" id="residential">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Residential Life" title="A Home Away" highlight="From Home" subtitle="Our residential facilities are designed to provide comfort, safety, and a nurturing community." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaBed,        title: "Comfortable Hostel",          desc: "Hygienic, well-maintained dormitories with proper ventilation, furniture, and storage." },
              { icon: FaUtensils,   title: "Nutritious Meals",            desc: "Balanced meals prepared under hygienic conditions — breakfast, lunch, snacks, and dinner." },
              { icon: FaBook,       title: "Supervised Study Sessions",   desc: "Structured evening study hours with faculty supervision and academic support." },
              { icon: FaUserShield, title: "Dedicated Wardens & Mentors", desc: "Round-the-clock supervision for the safety and well-being of every residential student." },
            ].map((r, i) => (
              <AnimatedCard key={r.title} delay={i * 0.08}>
                <div className="card p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                    <r.icon className="text-brand-green text-xl" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-brand-dark mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Transport + Campus */}
      <section className="section-pad bg-white" id="campus">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Transport */}
            <AnimatedCard>
              <div className="card p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4">
                  <FaBus className="text-brand-blue text-xl" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">Transport</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">GPS-tracked, air-conditioned buses covering key routes along the ECR corridor. Safe, punctual, and comfortable commutes for day scholars.</p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
                  Detailed route maps and vehicle information will be published prior to school commencement. <a href="/contact" className="font-semibold underline">Enquire about transport</a> for your area.
                </div>
              </div>
            </AnimatedCard>

            {/* Campus */}
            <AnimatedCard delay={0.15}>
              <div className="bg-gradient-to-br from-brand-green-dark to-brand-blue rounded-2xl p-8 text-white h-full">
                <h3 className="font-serif text-xl font-bold mb-5">The Campus</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: FaLeaf,           title: "10-Acre Green Campus",       desc: "Lush greenery and pollution-free environment." },
                    { icon: FaMapMarkerAlt,   title: "Prime ECR Location",         desc: "Scenic East Coast Road, accessible yet serene." },
                    { icon: FaShieldAlt,      title: "24/7 Security",              desc: "CCTV surveillance and controlled access." },
                    { icon: FaBuilding,       title: "Modern Infrastructure",      desc: "Purpose-built for optimal learning and comfort." },
                  ].map((c) => (
                    <div key={c.title} className="bg-white/10 rounded-xl p-4">
                      <c.icon className="text-brand-gold mb-2" />
                      <p className="font-semibold text-sm mb-1">{c.title}</p>
                      <p className="text-xs text-green-100">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <CTABanner
        title="See It For Yourself"
        subtitle="Schedule a campus tour and experience MNRS's world-class facilities in person."
        primaryLabel="Book a Campus Visit"
        primaryHref="/contact"
        secondaryLabel="Apply for Admissions"
        secondaryHref="/admissions"
      />
    </>
  );
}
