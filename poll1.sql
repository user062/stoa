-- set default to 0 instead of null
alter table poll_element modify column VOTES int default 0;
-- insert query
insert into poll_element (POST_ID, ELEMENT) values (?, ?);
insert into poll_vote (POLL_ID, COMPTEID) values (?, ?);

-- trigger for increment
create trigger T1 after insert on poll_vote
for each row
update poll_element p set VOTES= VOTES+ 1 where new.POLL_ID = p.POLL_ID;
-- select 
select COMPTEID, pe.POLL_ID, POST_ID, ELEMENT, VOTES
from poll_element pe
join poll_vote pv on pv.POLL_ID = pe.POLL_ID;
