-- insert into poll_element (POST_ID, ELEMENT) values (1, "second poll"); -- add poll element
-- update poll_element set VOTES= votes + 1; -- up_vote is in trigger
-- update poll_element set VOTES= votes - 1; -- down_vote is in trigger

-- poll trriger --
 DELIMITER $$
create trigger T1 after insert on poll_vote
for each row
begin
if new.vote = 1 
then 
update poll_element p set p.votes= p.votes + 1 
where (new.POLL_ID = p.POLL_ID and new.COMPTEID = p.POST_ID);
end if;
end$$
DELIMITER ;

 DELIMITER $$
create trigger T2 after insert on poll_vote
for each row
begin
if new.vote = -1 
then 
update poll_element p set p.votes= p.votes - 1 
where (new.POLL_ID = p.POLL_ID and new.COMPTEID = p.POST_ID);
end if;
end$$
DELIMITER ;

-- alter the database -- will push in the tables.sql if works fine 
-- alter table poll_vote add column vote int check(vote= 1 or vote = -1);
-- alter table poll_element modify column VOTES int default 0;
 /* this for test
select * from compte;
select * from post;
select * from poll_element;
*/