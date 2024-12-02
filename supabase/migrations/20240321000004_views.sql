-- Create view for offer summaries
create view offer_summaries as
select 
  o.id as offer_id,
  o.request_id,
  o.price,
  o.status,
  o.created_at,
  p.username as seller_name,
  p.rating as seller_rating,
  p.avatar_url as seller_avatar,
  (
    select count(*)
    from messages m
    where m.offer_id = o.id
  ) as message_count,
  (
    select m.content
    from messages m
    where m.offer_id = o.id
    order by m.created_at desc
    limit 1
  ) as latest_message
from offers o
join profiles p on p.id = o.seller_id;

-- Create view for buy request summaries
create view buy_request_summaries as
select 
  br.id,
  br.title,
  br.description,
  br.status,
  br.created_at,
  p.username as buyer_name,
  p.avatar_url as buyer_avatar,
  (
    select count(*)
    from offers o
    where o.request_id = br.id
  ) as offer_count,
  (
    select min(price)
    from offers o
    where o.request_id = br.id
  ) as lowest_offer
from buy_requests br
join profiles p on p.id = br.user_id;