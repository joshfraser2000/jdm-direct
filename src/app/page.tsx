import Link from 'next/link'
import { VehicleCard } from '@/components/vehicle-card'
import { getFeaturedVehicles } from '@/lib/vehicles-api'
import { Shield, Ship, CreditCard, FileCheck } from 'lucide-react'

export default async function HomePage() {
  const featured = await getFeaturedVehicles()

  return (
    <div style={{ background: '#010101' }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center"
        style={{
          minHeight: '74vh',
          background: `linear-gradient(rgba(1,1,1,0.55), rgba(1,1,1,0.75)),
            url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/1999_Nissan_Skyline_R34_GT-R_V-spec%2C_front_8.3.19.jpg/1280px-1999_Nissan_Skyline_R34_GT-R_V-spec%2C_front_8.3.19.jpg')
            center center / cover no-repeat`,
        }}
      >
        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <p
            className="rpm-heading font-light tracking-[0.3em] mb-4"
            style={{ color: '#d31f26', fontSize: '0.85rem' }}
          >
            DIRECT FROM JAPAN
          </p>
          <h1
            className="rpm-heading font-light leading-none mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              color: '#fefefe',
              textShadow: '2px 2px 1px #010101',
            }}
          >
            UPGRADE YOUR RIDE<br />TO THE NEXT LEVEL
          </h1>
          <p
            className="font-light tracking-widest mb-10 max-w-xl mx-auto"
            style={{ color: '#aaa', fontSize: '0.95rem' }}
          >
            Authentic JDM icons imported directly to your door. Every vehicle 25-year compliant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vehicles">
              <button className="btn-rpm px-10 py-3 text-sm">
                Browse Inventory
              </button>
            </Link>
            <Link href="/how-it-works">
              <button
                className="rpm-heading px-10 py-3 text-sm font-light tracking-widest transition-colors"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fefefe',
                  borderRadius: '0.35rem',
                }}
              >
                How It Works
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom fade into page */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #010101)' }}
        />
      </section>

      {/* ── FEATURED VEHICLES ─────────────────────────────────── */}
      <section className="py-16" style={{ background: '#010101' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h4
              className="rpm-heading font-normal tracking-[0.2em]"
              style={{ color: '#fefefe', fontSize: '1rem' }}
            >
              Featured Vehicles
            </h4>
            <Link
              href="/vehicles"
              className="rpm-heading font-light tracking-widest text-xs transition-colors hover:text-[#d31f26]"
              style={{ color: '#aaa' }}
            >
              View All →
            </Link>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div
            className="flex gap-5 overflow-x-auto pb-4 red-scrollbar md:grid md:grid-cols-4 md:overflow-visible"
          >
            {featured.map((vehicle) => (
              <div key={vehicle.id} className="min-w-[280px] md:min-w-0">
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ── STATS BAND ────────────────────────────────────────── */}
      <section style={{ background: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '200+', label: 'Vehicles in Stock' },
              { value: '100%', label: '25-Year Compliant' },
              { value: '$0', label: 'Hidden Fees' },
              { value: '60–90', label: 'Days to Delivery' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="rpm-heading font-black"
                  style={{ fontSize: '2rem', color: '#d31f26' }}
                >
                  {stat.value}
                </div>
                <div
                  className="rpm-heading font-light tracking-widest mt-1"
                  style={{ fontSize: '0.7rem', color: '#aaa' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#010101' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h4
              className="rpm-heading font-normal tracking-[0.3em] mb-3"
              style={{ color: '#fefefe', fontSize: '1rem' }}
            >
              How JDM Direct Works
            </h4>
            <p className="font-light tracking-wide" style={{ color: '#aaa', fontSize: '0.9rem' }}>
              Zero hassle. We handle everything from Japan to your driveway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Shield className="w-7 h-7" style={{ color: '#d31f26' }} />, step: '01', title: 'Browse & Select', desc: 'Filter our live inventory from Japanese auction houses. Every vehicle is 25-year compliant and auction-graded.' },
              { icon: <CreditCard className="w-7 h-7" style={{ color: '#d31f26' }} />, step: '02', title: 'Secure Purchase', desc: 'Pay securely via Stripe. Full price upfront locks your vehicle. We source it immediately from our Japan network.' },
              { icon: <Ship className="w-7 h-7" style={{ color: '#d31f26' }} />, step: '03', title: 'We Ship It', desc: 'Your vehicle loads onto an RoRo vessel from Japan to a US port near you. Fully insured throughout transit.' },
              { icon: <FileCheck className="w-7 h-7" style={{ color: '#d31f26' }} />, step: '04', title: 'Title & Delivery', desc: 'We handle customs, EPA/DOT documentation, and state title. Keys in hand in 60–90 days.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-lg mx-auto mb-5"
                  style={{ background: 'hsla(0,0%,100%,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {item.icon}
                </div>
                <div
                  className="rpm-heading font-bold mb-2"
                  style={{ color: '#d31f26', fontSize: '0.7rem', letterSpacing: '0.3em' }}
                >
                  {item.step}
                </div>
                <h3
                  className="rpm-heading font-normal tracking-widest mb-3"
                  style={{ color: '#fefefe', fontSize: '0.85rem' }}
                >
                  {item.title}
                </h3>
                <p className="font-light leading-relaxed" style={{ color: '#aaa', fontSize: '0.85rem' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* ── COMING SOON CTA ───────────────────────────────────── */}
      <section
        className="py-20 relative"
        style={{
          background: `linear-gradient(rgba(1,1,1,0.7), rgba(1,1,1,0.7)),
            url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Nissan_GT-R_R35_-_Hagerty_-_004.jpg/1280px-Nissan_GT-R_R35_-_Hagerty_-_004.jpg')
            center center / cover no-repeat`,
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p
            className="rpm-heading font-light tracking-[0.3em] mb-4"
            style={{ color: '#d31f26', fontSize: '0.8rem' }}
          >
            Not Yet Eligible
          </p>
          <h2
            className="rpm-heading font-light mb-4"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              color: '#fefefe',
              textShadow: '2px 2px 1px #010101',
            }}
          >
            Newer Models on the Horizon
          </h2>
          <p className="font-light tracking-wide mb-10 max-w-xl mx-auto" style={{ color: '#aaa' }}>
            R35 GT-R, GR Supra, FK8 Civic Type R — track exactly when they become eligible.
          </p>
          <Link href="/coming-soon">
            <button className="btn-rpm px-10 py-3 text-sm">
              View Coming Soon
            </button>
          </Link>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #010101)' }}
        />
      </section>

    </div>
  )
}
