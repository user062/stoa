-- show processlist;-- to show the processes in our case to check event_scheduler
-- set global event_scheduler= on; to enable the event scheduler
-- set global event_scheduler= off;-- to desable the event_scheduler
-- show events ;  to list all the events
-- -----------------------------------------------------------------------
-- ------------------------------------------------------------------------
-- validation event 1 --
create event if not exists E1
on schedule every 1 hour
starts current_timestamp
do 
delete from compte 
where 
vcode <> 0
and
 {fn TIMESTAMPDIFF(SQL_TSI_hour,date_inscrit,current_timestamp)} > 6;



