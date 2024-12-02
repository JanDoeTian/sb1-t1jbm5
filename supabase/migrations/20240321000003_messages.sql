-- Create messages table
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  offer_id uuid references public.offers not null,
  sender_id uuid references public.profiles not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.messages enable row level security;

-- Create RLS policies
create policy "Messages are viewable by conversation participants"
  on messages for select
  using (
    auth.uid() in (
      select buyer.user_id
      from offers o
      join buy_requests buyer on buyer.id = o.request_id
      where o.id = offer_id
      union
      select o.seller_id
      from offers o
      where o.id = offer_id
    )
  );

create policy "Users can send messages if they're conversation participants"
  on messages for insert
  with check (
    auth.uid() in (
      select buyer.user_id
      from offers o
      join buy_requests buyer on buyer.id = o.request_id
      where o.id = offer_id
      union
      select o.seller_id
      from offers o
      where o.id = offer_id
    )
  );

-- Create indexes
create index messages_offer_id_idx on messages(offer_id);
create index messages_sender_id_idx on messages(sender_id);
create index messages_created_at_idx on messages(created_at desc);