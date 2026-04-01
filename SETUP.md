# JDM Direct — Setup Guide

## 1. Supabase (Database)

1. Create a free account at https://supabase.com
2. Create a new project
3. Go to SQL Editor and run this to create the orders table:

```sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique not null,
  stripe_payment_intent_id text,
  vehicle_id text,
  stock_number text,
  vehicle_make text,
  vehicle_model text,
  vehicle_year int,
  customer_email text,
  customer_name text,
  shipping_address jsonb,
  total_paid numeric,
  status text default 'payment_confirmed',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security (admin-only reads via service role key)
alter table orders enable row level security;
```

4. Copy your Project URL and API keys into `.env.local`

---

## 2. Stripe (Payments)

1. Create a free account at https://stripe.com
2. Go to https://dashboard.stripe.com/apikeys
3. Copy your Publishable Key and Secret Key into `.env.local`
4. Set up a webhook:
   - Go to https://dashboard.stripe.com/webhooks
   - Add endpoint: `https://your-domain.com/api/webhook`
   - Select event: `checkout.session.completed`
   - Copy the Webhook Signing Secret into `.env.local`

For local testing: `npx stripe listen --forward-to localhost:3000/api/webhook`

---

## 3. BeForward API (Vehicle Inventory)

Currently using mock data. To connect to real live inventory:

1. Apply for a dealer/agent account at:
   https://www.beforward.jp/contact/dealer-registration/

2. Once approved, get your API key and uncomment the `fetchFromBeForward()` function in:
   `src/lib/vehicles-api.ts`

Alternative sources with developer programs:
- **Goo-net Export**: https://www.goo-net-exchange.com
- **SBI Motor Japan**: https://www.sbi-motorjapan.com
- **JapanBid**: https://japanbid.net

---

## 4. Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at https://vercel.com/new

Add all your `.env.local` variables to Vercel's Environment Variables dashboard.

---

## 5. Import/Fulfillment Partners

For handling the actual vehicle sourcing and shipping, contact:

- **Toprank Importers** — https://www.toprankimporter.com (US-based, full service)
- **JDM of California** — dealer with import expertise
- **Westcoast JDM** — West Coast broker

RoRo shipping lines from Japan:
- **K-Line**: https://www.kline.co.jp
- **NYK**: https://www.nyk.com  
- **MOL**: https://www.mol.co.jp

Customs broker recommendation: Use a licensed CHB (Customs House Broker). Many freight forwarders bundle this in.

---

## Local Development

```bash
cd jdm-imports
npm install
npm run dev
# Open http://localhost:3000
```
