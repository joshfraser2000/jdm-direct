import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'FAQ — JDM Direct',
  description: 'Answers to common questions about importing JDM vehicles to the US.',
}

const FAQS = [
  {
    category: 'Import Eligibility',
    items: [
      {
        q: 'What is the 25-year rule?',
        a: 'US law (49 CFR 591.5) exempts vehicles 25 or more years old from meeting FMVSS safety standards, making them freely importable. This means a 1999 vehicle became eligible in 2024. JDM Direct only lists vehicles that are currently eligible.',
      },
      {
        q: 'Are these vehicles legal to drive in all 50 states?',
        a: 'Yes — federally. All vehicles we sell are street-legal under federal law. However, some states (most notably California) have additional emissions requirements for older vehicles. We recommend checking with your state DMV before purchase.',
      },
      {
        q: 'Are the vehicles right-hand drive?',
        a: 'Yes. All JDM vehicles are right-hand drive (RHD), which is 100% legal in all US states. Many enthusiasts specifically seek out RHD for the authentic JDM experience. You can find RHD conversion specialists in most major cities if desired.',
      },
      {
        q: 'Do I need to modify the vehicle to import it?',
        a: 'Under the 25-year exemption, no FMVSS modifications are required. The vehicle can be imported as-is from Japan. Some states may require a safety inspection after registration, but no federal modifications are mandated.',
      },
    ],
  },
  {
    category: 'Purchasing',
    items: [
      {
        q: 'Why do you collect full payment upfront?',
        a: 'Full payment is required to secure your specific vehicle in Japan and initiate the export process immediately. Japanese auction vehicles are competitive and time-sensitive — a deposit-only model risks losing the car while payment clears.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover) via Stripe. ACH bank transfers are available for orders over $30,000 — contact us to arrange.',
      },
      {
        q: 'Can I request a specific vehicle not listed?',
        a: 'Absolutely. Contact us with the exact make, model, year, grade, and color you want. We can source from Japan\'s auction network directly. There\'s no extra fee for custom sourcing.',
      },
      {
        q: 'What is your refund/cancellation policy?',
        a: 'Once a vehicle has been purchased at auction in Japan, cancellations are subject to a 15% restocking fee to cover auction fees, export costs, and logistics. If the vehicle has not yet been purchased, cancellations are fully refunded. Contact us within 24 hours of order placement for the best outcome.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Typically 60–90 days from the time of payment. This includes 1–2 weeks for sourcing and export documentation, 3–4 weeks ocean transit (RoRo), and 2–4 weeks for customs clearance, title processing, and domestic delivery.',
      },
      {
        q: 'What is RoRo shipping?',
        a: 'Roll-on/Roll-off (RoRo) is how automakers ship new cars worldwide. Vehicles drive onto the ship under their own power and are secured in enclosed decks. It\'s the safest and most cost-effective method for shipping vehicles internationally.',
      },
      {
        q: 'What US ports do you ship to?',
        a: 'We primarily use Los Angeles, Long Beach, and Baltimore. Depending on your location, we\'ll route to the most cost-effective port. See our Shipping page for a full breakdown by region.',
      },
      {
        q: 'Is my vehicle insured during shipping?',
        a: 'Yes. All vehicles are fully insured against damage or loss during ocean transit. In the rare event of an incident, you\'re covered at full vehicle value.',
      },
      {
        q: 'Can I pick up at the port instead of paying for domestic delivery?',
        a: 'Yes, and we encourage it — it saves you $500–$1,500 depending on your location. We\'ll give you ample notice when your vehicle clears customs so you can arrange pickup.',
      },
    ],
  },
  {
    category: 'Title & Registration',
    items: [
      {
        q: 'How does title/registration work?',
        a: 'We handle all federal import documentation (EPA Form 3520-1, DOT HS-7). You\'ll receive a clean Certificate of Title in your name. You then register the vehicle with your state DMV as you would any used vehicle purchase.',
      },
      {
        q: 'Will my state accept a JDM vehicle?',
        a: 'Yes. All 50 states accept federally-compliant imported vehicles. You\'ll register it as a used vehicle with a foreign title, converted to a US title through our customs process.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-black mb-4">Frequently Asked Questions</h1>
        <p className="text-neutral-400 text-lg">
          Everything you need to know about importing a JDM vehicle.
        </p>
      </div>

      <div className="space-y-12">
        {FAQS.map((section) => (
          <div key={section.category}>
            <h2 className="text-lg font-bold text-red-500 uppercase tracking-widest mb-6">
              {section.category}
            </h2>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.q} className="border-b border-neutral-800 pb-6">
                  <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                  <p className="text-neutral-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-neutral-900 border border-neutral-800 rounded-2xl p-10">
        <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
        <p className="text-neutral-400 mb-6">Our team is happy to help with anything not covered above.</p>
        <Link href="/contact">
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8">Contact Us</Button>
        </Link>
      </div>
    </div>
  )
}
