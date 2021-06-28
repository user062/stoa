
delimiter ;;
create procedure P1(IN comptID int, IN pollID int, IN postID INT)
begin
if exists(SELECT pv.POLL_ID, pv.COMPTEID, POST_ID 
from POLL_VOTE pv
join POLL_ELEMENT pe on pe.POLL_ID = pv.POLL_ID
 where COMPTEID= comptID and POST_ID= postID)            
then            
 update POLL_VOTE set POLL_ID= pollID where COMPTEID= comptID and POLL_ID in (SELECT pv.POLL_ID
                                                                              from POLL_VOTE pv
                                                                              join POLL_ELEMENT pe on pe.POLL_ID = pv.POLL_ID
                                                                              where COMPTEID= comptID and POST_ID= postID);
else              
insert into POLL_VOTE (POLL_ID, COMPTEID) values (pollID, comptID);
end if;
end ;;
delimiter ;
