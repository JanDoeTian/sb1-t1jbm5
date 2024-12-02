-- Create offers table
create table public.offers (
  id uuid default uuid_generate_v4() primary key,
  request_id uuid references public.buy_requests not null,
  seller_id uuid references public.profiles not null,
  price decimal(12,2) not null check (price > 0),
  description text not null,
  images text[] default array[]::text[],
  status text not null check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Ensure one offer per seller per request
  unique(request_id, seller_id)
);

-- Enable RLS
alter table public.offers enable row level security;

-- Create RLS policies
create policy "Offers are viewable by everyone"
  on offers for select
  using (true);

create policy "Sellers can create offers"
  on offers for insert
  with check (auth.uid() = seller_id);

create policy "Sellers can update their own offers"
  on offers for update
  using (auth.uid() = seller_id);

-- Create updated_at trigger
create trigger handle_offers_updated_at
  before update on offers
  for each row
  execute function handle_updated_at();

-- Create indexes
create index offers_request_id_idx on offers(request_id);
create index offers_seller_id_idx on offers(seller_id);
create index offers_status_idx on offers(status);
create index offers_price_idx on offers(price);