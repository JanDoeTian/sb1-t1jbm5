-- Create buy requests table
create table public.buy_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles not null,
  title text not null,
  description text not null,
  status text not null check (status in ('pending', 'matched', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.buy_requests enable row level security;

-- Create RLS policies
create policy "Buy requests are viewable by everyone"
  on buy_requests for select
  using (true);

create policy "Users can create their own buy requests"
  on buy_requests for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own buy requests"
  on buy_requests for update
  using (auth.uid() = user_id);

-- Create updated_at trigger
create trigger handle_buy_requests_updated_at
  before update on buy_requests
  for each row
  execute function handle_updated_at();

-- Create index for faster queries
create index buy_requests_user_id_idx on buy_requests(user_id);
create index buy_requests_status_idx on buy_requests(status);
create index buy_requests_created_at_idx on buy_requests(created_at desc);