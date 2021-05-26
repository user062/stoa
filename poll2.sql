
delimiter $$
create procedure P1(IN comptID int, IN pollID int, IN postID INT)
begin
if exists(SELECT pv.POLL_ID, pv.COMPTEID, POST_ID 
from poll_vote pv
join poll_element pe on pe.POLL_ID = pv.POLL_ID
 where COMPTEID= comptID and POST_ID= postID)            
then            
 update poll_vote set POLL_ID= pollID where COMPTEID= comptID and POLL_ID= pollID;                   
else              
insert into poll_vote (POLL_ID, COMPTEID) values (pollID, comptID);
end if;
end $$
delimiter ;

-- test
select * from compte;
select * from poll_element;
select * from poll_vote;
drop procedure P1;
call P1(2,6,2);
