-- Function to get conversation messages
create or replace function get_conversation_messages(p_offer_id uuid)
returns table (
  id uuid,
  content text,
  sender_name text,
  sender_avatar text,
  created_at timestamptz
)
language sql
security definer
as $$
  select 
    m.id,
    m.content,
    p.username as sender_name,
    p.avatar_url as sender_avatar,
    m.created_at
  from messages m
  join profiles p on p.id = m.sender_id
  where m.offer_id = p_offer_id
  order by m.created_at asc;
$$;

-- Function to get user's buy requests with offer counts
create or replace function get_user_buy_requests(p_user_id uuid)
returns table (
  id uuid,
  title text,
  description text,
  status text,
  created_at timestamptz,
  offer_count bigint,
  lowest_offer decimal(12,2)
)
language sql
security definer
as $$
  select 
    br.id,
    br.title,
    br.description,
    br.status,
    br.created_at,
    count(o.id) as offer_count,
    min(o.price) as lowest_offer
  from buy_requests br
  left join offers o on o.request_id = br.id
  where br.user_id = p_user_id
  group by br.id, br.title, br.description, br.status, br.created_at
  order by br.created_at desc;
$$;