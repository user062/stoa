DROP TABLE IF EXISTS COMMENTAIRE;
CREATE TABLE COMMENTAIRE (
  ID_COMMENTAIRE int(11) NOT NULL AUTO_INCREMENT,
  COMPTEID int(11) DEFAULT NULL,
  ID_REPONSE int(11) DEFAULT NULL,
  DATE_AJOUTE timestamp NOT NULL DEFAULT current_timestamp(),
  COMM_CORE longtext DEFAULT NULL,
  DATE_EDIT datetime DEFAULT NULL,
  PRIMARY KEY (ID_COMMENTAIRE)
) ;

DROP TABLE IF EXISTS COMPTE;
CREATE TABLE COMPTE (
  COMPTEID int(11) NOT NULL AUTO_INCREMENT,
  EMAIL varchar(80) DEFAULT NULL,
  PASSWORD varchar(80) DEFAULT NULL,
  NOM varchar(40) DEFAULT NULL,
  PRENOM varchar(30) DEFAULT NULL,
  SEXE char(1) DEFAULT NULL CHECK (SEXE = 'F' or SEXE = 'H'),
  DATE_NAISSANCE date DEFAULT NULL,
  vcode int(11) DEFAULT 0,
  date_inscrit timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  TYPE char(1) DEFAULT NULL CHECK (TYPE = 'E' or TYPE = 'P'),
  PRIMARY KEY (COMPTEID),
  UNIQUE KEY EMAIL (EMAIL)
) ;

DROP TABLE IF EXISTS CONCERNE;
CREATE TABLE CONCERNE (
  POST_ID int(11) NOT NULL,
  ID_DOSSIER int(11) NOT NULL,
  PRIMARY KEY (POST_ID,ID_DOSSIER)
);

DROP TABLE IF EXISTS MODULE;
CREATE TABLE MODULE (
  ID_MODULE int(11) NOT NULL AUTO_INCREMENT,
  NOM_MODULE varchar(10) DEFAULT NULL,
  description text DEFAULT NULL,
  PRIMARY KEY (ID_MODULE)
);


DROP TABLE IF EXISTS DOCUMENT;
CREATE TABLE DOCUMENT (
  ID_DOCUMENT int(11) NOT NULL AUTO_INCREMENT,
  ID_MODULE int(11) DEFAULT NULL,
  NOM varchar(255) DEFAULT NULL,
  path longtext DEFAULT NULL,
  type char(1)  DEFAULT NULL CHECK (type = 'c' or type = 't' or type = 'h'),
  date_ajoute timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (ID_DOCUMENT),
  KEY ID_MODULE (ID_MODULE),
  CONSTRAINT DOCUMENT_ibfk_1 FOREIGN KEY (ID_MODULE) REFERENCES MODULE (ID_MODULE)
);

DROP TABLE IF EXISTS DOSSIER;
CREATE TABLE DOSSIER (
  ID_DOSSIER int(11) NOT NULL AUTO_INCREMENT,
  COMPTEID int(11) DEFAULT NULL,
  ID_MODULE int(11) DEFAULT NULL,
  nom_dossier varchar(40) DEFAULT NULL,
  PRIMARY KEY (ID_DOSSIER)
) ;
DROP TABLE IF EXISTS INSCRIT;

CREATE TABLE INSCRIT (
  ID_MODULE int(11) NOT NULL,
  COMPTEID int(11) NOT NULL,
  DATE_INSCRIT timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (ID_MODULE,COMPTEID),
  CONSTRAINT INSCRIT_ibfk_1 FOREIGN KEY (ID_MODULE) REFERENCES MODULE (ID_MODULE) ON DELETE CASCADE
);


DROP TABLE IF EXISTS POLL_ELEMENT;
CREATE TABLE POLL_ELEMENT (
  POLL_ID int(11) NOT NULL AUTO_INCREMENT,
  POST_ID int(11) DEFAULT NULL,
  ELEMENT varchar(100) DEFAULT NULL,
  VOTES int(11) DEFAULT 0,
  PRIMARY KEY (POLL_ID)
);

DROP TABLE IF EXISTS POLL_VOTE;
CREATE TABLE POLL_VOTE (
  POLL_ID int(11) NOT NULL,
  COMPTEID int(11) NOT NULL,
  PRIMARY KEY (POLL_ID,COMPTEID)
);

DROP TABLE IF EXISTS POST;
CREATE TABLE POST (
  POST_ID int(11) NOT NULL AUTO_INCREMENT,
  COMPTEID int(11) DEFAULT NULL,
  title varchar(200) NOT NULL,
  DATE_AJOUTE timestamp NOT NULL DEFAULT current_timestamp(),
  TYPE char(1) DEFAULT NULL,
  POST_CORE longtext DEFAULT NULL,
  DATE_EDIT datetime DEFAULT NULL,
  PRIMARY KEY (POST_ID)
);

DROP TABLE IF EXISTS REPONSE;
CREATE TABLE REPONSE (
  ID_REPONSE int(11) NOT NULL AUTO_INCREMENT,
  COMPTEID int(11) DEFAULT NULL,
  POST_ID int(11) DEFAULT NULL,
  DATE_AJOUTE timestamp NOT NULL DEFAULT current_timestamp(),
  REPONSE_CORE longtext DEFAULT NULL,
  VOTES int(11) DEFAULT 0,
  DATE_EDIT datetime DEFAULT NULL,
  PRIMARY KEY (ID_REPONSE)
);

DROP TABLE IF EXISTS UP_DOWN_VOTE;
CREATE TABLE UP_DOWN_VOTE (
  ID_REPONSE int(11) NOT NULL,
  COMPTEID int(11) NOT NULL,
  vote int(11) DEFAULT NULL CHECK (vote = 1 or vote = -1),
  PRIMARY KEY (ID_REPONSE,COMPTEID)
);

DROP TABLE IF EXISTS comment_notifications;
CREATE TABLE comment_notifications (
  notification_id int(11) NOT NULL AUTO_INCREMENT,
  COMPTEID int(11) DEFAULT NULL,
  ID_MODULE int(11) DEFAULT NULL,
  POST_ID int(11) DEFAULT NULL,
  ID_REPONSE int(11) DEFAULT NULL,
  ID_COMMENTAIRE int(11) DEFAULT NULL,
  date_ajoute timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (notification_id),
  KEY ID_COMMENTAIRE (ID_COMMENTAIRE),
  KEY ID_REPONSE (ID_REPONSE),
  KEY POST_ID (POST_ID),
  KEY ID_MODULE (ID_MODULE),
  KEY COMPTEID (COMPTEID),
  CONSTRAINT comment_notifications_ibfk_1 FOREIGN KEY (ID_COMMENTAIRE) REFERENCES COMMENTAIRE (ID_COMMENTAIRE) ON DELETE CASCADE,
  CONSTRAINT comment_notifications_ibfk_2 FOREIGN KEY (ID_REPONSE) REFERENCES REPONSE (ID_REPONSE) ON DELETE CASCADE,
  CONSTRAINT comment_notifications_ibfk_3 FOREIGN KEY (POST_ID) REFERENCES POST (POST_ID) ON DELETE CASCADE,
  CONSTRAINT comment_notifications_ibfk_4 FOREIGN KEY (ID_MODULE) REFERENCES MODULE (ID_MODULE) ON DELETE CASCADE,
  CONSTRAINT comment_notifications_ibfk_5 FOREIGN KEY (COMPTEID) REFERENCES COMPTE (COMPTEID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS enseigner;
CREATE TABLE enseigner (
  COMPTEID int(11) NOT NULL,
  ID_MODULE int(11) NOT NULL,
  PRIMARY KEY (ID_MODULE,COMPTEID),
  KEY FK_enseigner1 (COMPTEID),
  CONSTRAINT FK_enseigner1 FOREIGN KEY (COMPTEID) REFERENCES COMPTE (COMPTEID) ON DELETE CASCADE,
  CONSTRAINT FK_enseigner2 FOREIGN KEY (ID_MODULE) REFERENCES MODULE (ID_MODULE) ON DELETE CASCADE
);

CREATE TABLE file (
  ID_file int(11) NOT NULL AUTO_INCREMENT,
  POST_ID int(11) DEFAULT NULL,
  ID_REPONSE int(11) DEFAULT NULL,
  file_path longtext DEFAULT NULL,
  file_name longtext DEFAULT NULL,
  PRIMARY KEY (ID_file)
);

DROP TABLE IF EXISTS posts_notifications;
CREATE TABLE posts_notifications (
  notification_id int(11) NOT NULL AUTO_INCREMENT,
  COMPTEID int(11) DEFAULT NULL,
  ID_MODULE int(11) DEFAULT NULL,
  POST_ID int(11) DEFAULT NULL,
  type char(1) DEFAULT NULL CHECK (type = 'q' or type = 'p' or type = 'n'),
  date_ajoute timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (notification_id),
  KEY POST_ID (POST_ID),
  KEY ID_MODULE (ID_MODULE),
  KEY COMPTEID (COMPTEID),
  CONSTRAINT posts_notifications_ibfk_1 FOREIGN KEY (POST_ID) REFERENCES POST (POST_ID) ON DELETE CASCADE,
  CONSTRAINT posts_notifications_ibfk_2 FOREIGN KEY (ID_MODULE) REFERENCES MODULE (ID_MODULE) ON DELETE CASCADE,
  CONSTRAINT posts_notifications_ibfk_3 FOREIGN KEY (COMPTEID) REFERENCES COMPTE (COMPTEID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS reply_notifications;

CREATE TABLE reply_notifications (
  notification_id int(11) NOT NULL AUTO_INCREMENT,
  COMPTEID int(11) DEFAULT NULL,
  ID_MODULE int(11) DEFAULT NULL,
  POST_ID int(11) DEFAULT NULL,
  ID_REPONSE int(11) DEFAULT NULL,
  date_ajoute timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (notification_id),
  KEY ID_REPONSE (ID_REPONSE),
  KEY POST_ID (POST_ID),
  KEY ID_MODULE (ID_MODULE),
  KEY COMPTEID (COMPTEID),
  CONSTRAINT reply_notifications_ibfk_1 FOREIGN KEY (ID_REPONSE) REFERENCES REPONSE (ID_REPONSE) ON DELETE CASCADE,
  CONSTRAINT reply_notifications_ibfk_2 FOREIGN KEY (POST_ID) REFERENCES POST (POST_ID) ON DELETE CASCADE,
  CONSTRAINT reply_notifications_ibfk_3 FOREIGN KEY (ID_MODULE) REFERENCES MODULE (ID_MODULE) ON DELETE CASCADE,
  CONSTRAINT reply_notifications_ibfk_4 FOREIGN KEY (COMPTEID) REFERENCES COMPTE (COMPTEID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS resources_notifications;
CREATE TABLE resources_notifications (
  notification_id int(11) NOT NULL AUTO_INCREMENT,
  COMPTEID int(11) DEFAULT NULL,
  ID_MODULE int(11) DEFAULT NULL,
  ID_DOCUMENT int(11) DEFAULT NULL,
  type char(1) DEFAULT NULL CHECK (type = 'c' or type = 't' or type = 'h'),
  date_ajoute timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (notification_id),
  KEY ID_DOCUMENT (ID_DOCUMENT),
  KEY ID_MODULE (ID_MODULE),
  KEY COMPTEID (COMPTEID),
  CONSTRAINT resources_notifications_ibfk_1 FOREIGN KEY (ID_DOCUMENT) REFERENCES DOCUMENT (ID_DOCUMENT) ON DELETE CASCADE,
  CONSTRAINT resources_notifications_ibfk_2 FOREIGN KEY (ID_MODULE) REFERENCES MODULE (ID_MODULE) ON DELETE CASCADE,
  CONSTRAINT resources_notifications_ibfk_3 FOREIGN KEY (COMPTEID) REFERENCES COMPTE (COMPTEID) ON DELETE CASCADE
);

DELIMITER ;;

CREATE TRIGGER notify_resources AFTER INSERT ON DOCUMENT
       FOR EACH ROW
       BEGIN
        insert into resources_notifications (COMPTEID, ID_MODULE, ID_DOCUMENT, type)
        select
             I.COMPTEID, I.ID_MODULE as ID_MODULE, NEW.ID_DOCUMENT as ID_DOCUMENT, NEW.type as type
        from
             INSCRIT I
        where
               I.ID_MODULE=NEW.ID_MODULE
               and
               I.COMPTEID not in (select e.COMPTEID from enseigner e where e.ID_MODULE=NEW.ID_MODULE);
       END;
;;
CREATE TRIGGER notify_posts AFTER INSERT ON CONCERNE 
       FOR EACH ROW
       BEGIN
        insert into posts_notifications (COMPTEID, ID_MODULE, POST_ID, type)
        select
             I.COMPTEID, I.ID_MODULE, NEW.POST_ID, P.type
        from
             POST P
             join
             CONCERNE C on C.POST_ID = P.POST_ID
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             P.POST_ID = NEW.POST_ID
             and
             P.COMPTEID <> I.COMPTEID
        group by I.COMPTEID;
       END;
;;

CREATE TRIGGER notify_reply AFTER INSERT ON REPONSE 
       FOR EACH ROW
       BEGIN
        insert into reply_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE)
        select
             R.COMPTEID, I.ID_MODULE, NEW.POST_ID, NEW.ID_REPONSE
        from
             REPONSE R
             join
             POST P on R.POST_ID = P.POST_ID
             join
             CONCERNE C on P.POST_ID = C.POST_ID
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             I.COMPTEID = R.COMPTEID
             and
             R.POST_ID = NEW.POST_ID
             and
             R.COMPTEID <> NEW.COMPTEID
        group by R.COMPTEID;

        insert into reply_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE)
        select
             P.COMPTEID, I.ID_MODULE, NEW.POST_ID, NEW.ID_REPONSE
        from
             POST P
             join
             CONCERNE C on P.POST_ID = C.POST_ID
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             P.POST_ID = NEW.POST_ID
             and
             I.COMPTEID = P.COMPTEID
             and
             P.COMPTEID <> NEW.COMPTEID
             and
             P.COMPTEID NOT IN (select COMPTEID from REPONSE where POST_ID=NEW.POST_ID)
        group by
             P.POST_ID;
       END;
;;   

CREATE TRIGGER notify_comment AFTER INSERT ON COMMENTAIRE 
       FOR EACH ROW 
       BEGIN
        insert into comment_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE, ID_COMMENTAIRE)
        select
             CO.COMPTEID, I.ID_MODULE, R.POST_ID, NEW.ID_REPONSE, NEW.ID_COMMENTAIRE
        from
             COMMENTAIRE CO
             join
             REPONSE R on CO.ID_REPONSE = R.ID_REPONSE
             join
             POST P on R.POST_ID = P.POST_ID
             join
             CONCERNE C on P.POST_ID = C.POST_ID
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             NEW.ID_REPONSE = CO.ID_REPONSE
             and
             I.COMPTEID = CO.COMPTEID
             and
             NEW.COMPTEID <> CO.COMPTEID
        group by CO.COMPTEID; 

        insert into comment_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE, ID_COMMENTAIRE)
        select
             R.COMPTEID, I.ID_MODULE, R.POST_ID, NEW.ID_REPONSE, NEW.ID_COMMENTAIRE
        from
             REPONSE R
             join
             POST P on R.POST_ID = P.POST_ID
             join
             CONCERNE C on P.POST_ID = C.POST_ID
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             NEW.ID_REPONSE = R.ID_REPONSE
             and
             I.COMPTEID = R.COMPTEID
             and
             R.COMPTEID NOT IN (select C1.COMPTEID from COMMENTAIRE C1 where C1.ID_REPONSE=NEW.ID_REPONSE)
        group by R.COMPTEID; 

        insert into comment_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE, ID_COMMENTAIRE)
        select
             P.COMPTEID, I.ID_MODULE, P.POST_ID, NEW.ID_REPONSE, NEW.ID_COMMENTAIRE
        from
             REPONSE R
             join
             POST P on R.POST_ID = P.POST_ID
             join
             CONCERNE C on P.POST_ID = C.POST_ID
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             NEW.ID_REPONSE = R.ID_REPONSE
             and
             I.COMPTEID = P.COMPTEID
             and
             P.COMPTEID NOT IN (select C1.COMPTEID from COMMENTAIRE C1 where C1.ID_REPONSE=NEW.ID_REPONSE)
             and
             P.COMPTEID <> R.COMPTEID 
        group by P.COMPTEID; 
       END;
;;

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
 {fn TIMESTAMPDIFF(SQL_TSI_hour,date_inscrit,current_timestamp)} > 6;;
