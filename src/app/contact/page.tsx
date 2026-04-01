import { ContactForm } from '@/components/contact-form'
import { Mail, Clock, MessageSquare } from 'lucide-react'

export const metadata = {
  title: 'Contact Us — JDM Direct',
  description: 'Get in touch with JDM Direct. Request a specific vehicle, ask import questions, or get a shipping quote.',
}

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-black mb-4">Contact Us</h1>
        <p className="text-neutral-400 text-lg max-w-xl mx-auto">
          Questions, custom vehicle requests, or shipping quotes — we typically respond within a few hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info panel */}
        <div className="space-y-6">
          {[
            {
              icon: <Mail className="w-5 h-5 text-red-500" />,
              title: 'Email',
              desc: 'hello@jdmdirect.com',
              sub: 'We read every email',
            },
            {
              icon: <Clock className="w-5 h-5 text-blue-500" />,
              title: 'Response Time',
              desc: 'Usually within 4 hours',
              sub: 'Mon–Fri, 9am–6pm PST',
            },
            {
              icon: <MessageSquare className="w-5 h-5 text-green-500" />,
              title: 'Custom Vehicle Requests',
              desc: 'Tell us what you want',
              sub: 'We source direct from Japan auction',
            },
          ].map((item) => (
            <div key={item.title} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                {item.icon}
                <span className="font-bold">{item.title}</span>
              </div>
              <p className="text-white text-sm font-medium">{item.desc}</p>
              <p className="text-neutral-500 text-xs mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
