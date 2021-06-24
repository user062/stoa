
/*==============================================================*/
/* Table : COMMENTAIRE                                          */
/*==============================================================*/
create table COMMENTAIRE
(
   ID_COMMENTAIRE       int auto_increment primary key,
   COMPTEID              int,
   ID_REPONSE           int,
   DATE_AJOUTE        timestamp default current_timestamp,
   COMM_CORE            longtext
);

/*==============================================================*/
/* Table : COMPTE                                               */
/*==============================================================*/
create table COMPTE
(
   COMPTEID              int auto_increment primary key,
   EMAIL                varchar(80) UNIQUE,
   PASSWORD             varchar(80),
   NOM                  varchar(40),
   PRENOM               varchar(30),
   SEXE                 char(1) check (SEXE='F' or SEXE='H'),
   DATE_NAISSANCE    	date,
   vcode				int default 0,
   date_inscrit			timestamp default current_timestamp,
   TYPE                 char(1) check (TYPE='E' or TYPE='P')
);

/*==============================================================*/
/* Table : CONCERNE                                             */
/*==============================================================*/
create table CONCERNE
(
   POST_ID              int,
   ID_DOSSIER           int,
   primary key (POST_ID, ID_DOSSIER)
);

/*==============================================================*/
/* Table : DOCUMENT                                             */
/*==============================================================*/
create table DOCUMENT
(
   ID_DOCUMENT          int auto_increment primary key,
   ID_MODULE            int,
   NOM                  varchar(255),
   path                 longtext,
   type                 char(1) check (type='c' or type='t' or type='h'),
   date_ajoute          timestamp default current_timestamp,
FOREIGN KEY (ID_MODULE)
        REFERENCES MODULE (ID_MODULE)
   );

/*==============================================================*/
/* Table : DOSSIER                                              */
/*==============================================================*/
create table DOSSIER
(
   ID_DOSSIER           int auto_increment primary key,
   COMPTEID              int,
   ID_MODULE            int,
   nom_dossier        varchar(40)
);

/*==============================================================*/
/* Table : FICHIER                                              */
/*==============================================================*/
create table file
(
   ID_file           int auto_increment primary key,
   POST_ID              int default null,
   ID_REPONSE           int default null,
   file_path            longtext,
   file_name            varchar(255)
);


/*==============================================================*/
/* Table : INSCRET                                              */
/*==============================================================*/
create table INSCRET
(
   ID_DOSSIER           int ,
   COMPTEID              int,
   DATE_INSCIT        date,
   primary key (ID_DOSSIER, COMPTEID)
);

/*==============================================================*/
/* Table : MODULE                                               */
/*==============================================================*/
create table MODULE
(
   ID_MODULE            int auto_increment primary key,
   NOM_MODULE           varchar(10)
);

/*==============================================================*/
/* Table : POLL_ELEMENT                                         */
/*==============================================================*/
create table POLL_ELEMENT
(
   POLL_ID              int auto_increment primary key,
   POST_ID              int,
   ELEMENT              varchar(100),
   VOTES                int
);

/*==============================================================*/
/* Table : POLL_VOTE                                            */
/*==============================================================*/
create table POLL_VOTE
(
   POLL_ID              int,
   COMPTEID              int,
   primary key (POLL_ID, COMPTEID)
);

/*==============================================================*/
/* Table : POST                                                 */
/*==============================================================*/
create table POST
(
   POST_ID              int auto_increment primary key,
   COMPTEID              int,
   title				varchar(200) not null,
   DATE_AJOUTE          timestamp default current_timestamp,
   TYPE                 char(1),
   POST_CORE            longtext
);

/*==============================================================*/
/* Table : REPONSE                                              */
/*==============================================================*/
create table REPONSE
(
   ID_REPONSE           int auto_increment primary key,
   COMPTEID              int,
   POST_ID              int,
   DATE_AJOUTE          timestamp default current_timestamp,
   REPONSE_CORE         longtext,
   VOTES             int default 0
);

/*==============================================================*/
/* Table : UP_DOWN_VOTE                                         */
/*==============================================================*/
create table UP_DOWN_VOTE
(
   ID_REPONSE           int,
   COMPTEID              int,
   vote					int check (vote=1 or vote=-1),
   primary key (ID_REPONSE, COMPTEID)
);


create table resources_notifications
(
   notification_id       int auto_increment primary key,
   COMPTEID              int,
   ID_MODULE             int,
   ID_DOCUMENT           int,
   type                  char(1) check (type='c' or type='t' or type='h'),
   date_ajoute           timestamp default current_timestamp,
FOREIGN KEY (ID_DOCUMENT)
        REFERENCES DOCUMENT (ID_DOCUMENT) on delete cascade,
FOREIGN KEY (ID_MODULE)
        REFERENCES MODULE (ID_MODULE) on delete cascade,
FOREIGN KEY (COMPTEID)
        REFERENCES COMPTE (COMPTEID) on delete cascade
   );

create table posts_notifications
(
   notification_id          int auto_increment primary key,
   COMPTEID                 int,
   ID_MODULE                int,
   POST_ID                  int,
   type                     char(1) check (type='q' or type='p' or type='n'),
   date_ajoute              timestamp default current_timestamp,
FOREIGN KEY (POST_ID)
        REFERENCES POST (POST_ID) on delete cascade,
FOREIGN KEY (ID_MODULE)
        REFERENCES MODULE (ID_MODULE) on delete cascade,
FOREIGN KEY (COMPTEID)
        REFERENCES COMPTE (COMPTEID) on delete cascade
   );

create table reply_notifications
(
   notification_id          int auto_increment primary key,
   COMPTEID                 int,
   ID_MODULE                int,
   POST_ID                  int,
   ID_REPONSE               int,
   date_ajoute              timestamp default current_timestamp,
FOREIGN KEY (ID_REPONSE)
        REFERENCES REPONSE (ID_REPONSE) on delete cascade,
FOREIGN KEY (POST_ID)
        REFERENCES POST (POST_ID) on delete cascade,
FOREIGN KEY (ID_MODULE)
        REFERENCES MODULE (ID_MODULE) on delete cascade,
FOREIGN KEY (COMPTEID)
        REFERENCES COMPTE (COMPTEID) on delete cascade
   );

create table comment_notifications
(
   notification_id          int auto_increment primary key,
   COMPTEID                 int,
   ID_MODULE                int,
   POST_ID                  int,
   ID_REPONSE               int,
   ID_COMMENTAIRE           int,
   date_ajoute              timestamp default current_timestamp,
FOREIGN KEY (ID_COMMENTAIRE)
        REFERENCES COMMENTAIRE (ID_COMMENTAIRE) on delete cascade,
FOREIGN KEY (ID_REPONSE)
        REFERENCES REPONSE (ID_REPONSE) on delete cascade,
FOREIGN KEY (POST_ID)
        REFERENCES POST (POST_ID) on delete cascade,
FOREIGN KEY (ID_MODULE)
        REFERENCES MODULE (ID_MODULE) on delete cascade,
FOREIGN KEY (COMPTEID)
        REFERENCES COMPTE (COMPTEID) on delete cascade
   );

 CREATE TABLE `INSCRIT` (
  `ID_MODULE` int(11) NOT NULL,
  `COMPTEID` int(11) NOT NULL,
  `DATE_INSCRIT` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ID_MODULE`,`COMPTEID`),
FOREIGN KEY (ID_MODULE)
        REFERENCES MODULE (ID_MODULE) on delete cascade
);

insert into resources_notifications (ID_DOCUMENT) values (doc_id);
insert into posts_notifications (POST_ID) values (post_id);
insert into post_notifications (ID_REPONSE) values (reponse_id);
insert into post_notifications (ID_COMMENTAIRE) values (comment_id);

DELIMITER ;;
CREATE PROCEDURE InsertIntoResourcesNotifications(IN comptID int)
BEGIN
insert into resources_notifications (COMPTEID, ID_DOCUMENT, ID_MODULE, type)
select
    comptID as COMPTEID, D.ID_DOCUMENT, D.ID_MODULE, D.type
from
    DOCUMENT D join INSCRIT I on D.ID_MODULE=I.ID_MODULE
where
    I.COMPTEID=comptID
and
comptID not in (select COMPTEID from enseigner e where ID_MODULE=I.ID_MODULE)
and
    D.ID_DOCUMENT
    >
    coalesce((select ID_DOCUMENT
              from resources_notifications res
              where res.COMPTEID=comptID
              order by notification_id desc limit 1),

             (select DI.ID_DOCUMENT
             from DOCUMENT DI
             where DI.ID_MODULE=I.ID_MODULE
             and DI.date_ajoute<I.DATE_INSCRIT
             order by DI.date_ajoute desc limit 1),
             0);

END;
;;

DELIMITER ;;
CREATE PROCEDURE InsertIntoPostsNotifications(IN comptID int)
BEGIN

insert into
posts_notifications (COMPTEID, POST_ID, ID_MODULE, type)
select
    comptID as COMPTEID, P.POST_ID, D.ID_MODULE, P.type
from
    POST P
    join
    CONCERNE C on P.POST_ID=C.POST_ID
    join DOSSIER D on D.ID_DOSSIER=C.ID_DOSSIER
    join INSCRIT I on D.ID_MODULE=I.ID_MODULE
where
    I.COMPTEID=comptID
    and
    P.COMPTEID <> comptID
    and
    P.POST_ID>
    coalesce(
        (select POST_ID from posts_notifications pos where pos.COMPTEID=comptID order by notification_id desc limit 1),
        (select PI.POST_ID from 
    POST PI
    join
    CONCERNE CI on PI.POST_ID=CI.POST_ID
    join DOSSIER DI on DI.ID_DOSSIER=CI.ID_DOSSIER
    join INSCRIT II on DI.ID_MODULE=II.ID_MODULE
    where II.ID_MODULE=I.ID_MODULE
    and PI.DATE_AJOUTE<I.DATE_INSCRIT
    order by PI.DATE_AJOUTE desc limit 1),
    0)
    group by P.POST_ID;

END;
;;

DELIMITER ;;
CREATE PROCEDURE InsertIntoReply_Notifications(IN comptID int)
BEGIN

insert into
reply_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE)
select
    comptID as COMPTEID, D.ID_MODULE, R.POST_ID, R.ID_REPONSE
from
    POST P
    join
    REPONSE R on R.POST_ID=P.POST_ID 
    join
    CONCERNE C on R.POST_ID=C.POST_ID
    join DOSSIER D on D.ID_DOSSIER=C.ID_DOSSIER
    join INSCRIT I on D.ID_MODULE=I.ID_MODULE

where
    I.COMPTEID=comptID
    and
    P.COMPTEID=comptID
    and
    R.COMPTEID <> comptID
    and
    ID_REPONSE>coalesce(
                (select ID_REPONSE
                 from reply_notifications rep
                 where rep.COMPTEID=comptID
                 order by notification_id desc limit 1),
                (select RI.ID_REPONSE
                 from REPONSE RI 
                 join CONCERNE CI on RI.POST_ID=CI.POST_ID
                 join DOSSIER DI on DI.ID_DOSSIER=CI.ID_DOSSIER
                 join INSCRIT II on DI.ID_MODULE=II.ID_MODULE
                 where II.ID_MODULE=I.ID_MODULE
                 and RI.DATE_AJOUTE<I.DATE_INSCRIT
                 order by RI.DATE_AJOUTE desc limit 1),
                0)
group by R.ID_REPONSE;

END;
;;

DELIMITER ;;
CREATE PROCEDURE InsertIntoComment_Notifications(IN comptID int)
BEGIN

insert into comment_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE, ID_COMMENTAIRE)
select
comptID as COMPTEID, D.ID_MODULE, R.POST_ID, CO.ID_REPONSE, CO.ID_COMMENTAIRE
from
    COMMENTAIRE CO
    join
    REPONSE R on R.ID_REPONSE = CO.ID_REPONSE 
    join
    CONCERNE C on R.POST_ID=C.POST_ID
    join
    DOSSIER D on D.ID_DOSSIER=C.ID_DOSSIER
    join
    INSCRIT I on D.ID_MODULE=I.ID_MODULE
where
I.COMPTEID=comptID
and
R.COMPTEID=comptID
and
CO.COMPTEID <> comptID
and
ID_COMMENTAIRE>coalesce(
                (select ID_COMMENTAIRE
                 from comment_notifications com
                 where com.COMPTEID=comptID
                 order by notification_id desc limit 1),

                (select COI.ID_COMMENTAIRE from 
                 COMMENTAIRE COI
                 join
                 REPONSE RI on R.ID_REPONSE = CO.ID_REPONSE 
                 join
                 CONCERNE CI on RI.POST_ID=CI.POST_ID
                 join
                 DOSSIER DI on DI.ID_DOSSIER=CI.ID_DOSSIER
                 join
                 INSCRIT II on DI.ID_MODULE=II.ID_MODULE
                 where
                 II.ID_MODULE=I.ID_MODULE
                 and
                 RI.DATE_AJOUTE<I.DATE_INSCRIT
                 order by COI.DATE_AJOUTE desc limit 1),
                0)
group by CO.ID_COMMENTAIRE;

END;
;;








select
    D.ID_DOCUMENT, D.ID_MODULE
from
    DOCUMENT D join INSCRIT I on D.ID_MODULE=I.ID_MODULE
where
    I.COMPTEID=compteID
and
    D.ID_DOCUMENT
    >
    coalesce((select ID_DOCUMENT
              from resources_notifications
              where COMPTEID=compteID
              order by notification_id desc limit 1;),

             (select ID_DOCUMENT
             from DOCUMENT DI
             where DI.ID_MODULE=I.ID_MODULE
             and DI.date_ajoute<I.DATE_INSCRIT
             order by DI.date_ajoute desc limit 1;))


select
    P.POST_ID, D.ID_MODULE
from
    POST P
    join
    CONCERNE C on P.POST_ID=C.POST_ID
    join DOSSIER D on D.ID_DOSSIER=C.ID_DOSSIER
    join INSCRIT I on D.ID_MODULE=I.ID_MODULE
where
    I.COMPTEID=compteID
    and
    P.POST_ID>
    coalesce(
        (select POST_ID from posts_notifications order by notification_id desc limit 1;),
        (select PI.POST_ID from 
    POST PI
    join
    CONCERNE CI on PI.POST_ID=CI.POST_ID
    join DOSSIER DI on DI.ID_DOSSIER=CI.ID_DOSSIER
    join INSCRIT II on DI.ID_MODULE=II.ID_MODULE
    where II.ID_MODULE=I.ID_MODULE
    and PI.DATE_AJOUTE<I.DATE_INSCRIT
    order by PI.DATE_AJOUTE desc limit 1;))
    group by P.POST_ID;




select
    R.ID_REPONSE, R.POST_ID, D.ID_MODULE
from
    REPONSE R 
    join
    CONCERNE C on R.POST_ID=C.POST_ID
    join DOSSIER D on D.ID_DOSSIER=C.ID_DOSSIER
    join INSCRIT I on D.ID_MODULE=I.ID_MODULE

where
    COMPTEID=compteID
    and ID_REPONSE>coalesce((select ID_REPONSE from post_notifications order by notification_id desc limit 1;),
(select RI.ID_REPONSE from 
REPONSE RI 
    join
    CONCERNE CI on RI.POST_ID=CI.POST_ID
    join DOSSIER DI on DI.ID_DOSSIER=CI.ID_DOSSIER
    join INSCRIT II on DI.ID_MODULE=II.ID_MODULE
    where II.ID_MODULE=I.ID_MODULE
    and RI.DATE_AJOUTE<I.DATE_INSCRIT
    order by RI.DATE_AJOUTE desc limit 1;))
group by R.ID_REPONSE;



select
CO.ID_COMMENTAIRE, CO.ID_REPONSE, R.POST_ID, C.ID_MODULE
from
    COMMENTAIRE CO
    join
    REPONSE R on R.ID_REPONSE = CO.ID_REPONSE 
    join
    CONCERNE C on R.POST_ID=C.POST_ID
    join
    DOSSIER D on D.ID_DOSSIER=C.ID_DOSSIER
    join
    INSCRIT I on D.ID_MODULE=I.ID_MODULE
where
COMPTEID=compteID
and
ID_COMMENTAIRE>coalesce((select ID_COMMENTAIRE from post_notifications order by notification_id desc limit 1;),
(select COI.ID_COMMENTAIRE from 
    COMMENTAIRE COI
    join
    REPONSE RI on R.ID_REPONSE = CO.ID_REPONSE 
    join
    CONCERNE CI on RI.POST_ID=CI.POST_ID
    join
    DOSSIER DI on DI.ID_DOSSIER=CI.ID_DOSSIER
    join
    INSCRIT II on DI.ID_MODULE=II.ID_MODULE
    where
    II.ID_MODULE=I.ID_MODULE
    and
    RI.DATE_AJOUTE<I.DATE_INSCRIT
    order by COI.DATE_AJOUTE desc limit 1;))
group by CO.ID_COMMENTAIRE;

select ID_DOCUMENT, ID_MODULE
from DOCUMENT D join INSCRIT I on D.ID_MODULE=I.ID_MODULE
where COMPTEID=compteID and ID_DOCUMENT>(select ID_DOCUMENT from resources_notifications where notification_id=(select(max(notification_id) from resources_notifications where COMPTEID=compteID;));

select P.POST_ID, D.ID_MODULE
from POST P join CONCERNE C on P.POST_ID=C.POST_ID join INSCRIT I on C.ID_MODULE=I.ID_MODULE
where COMPTEID=compteID and POST_ID>(select POST_ID from posts_notifications where notification_id=(select(max(notification_id) from posts_notifications where COMPTEID=compteID;));
group by POST_ID;

select R.ID_REPONSE, R.POST_ID, D.ID_MODULE
from REPONSE R join CONCERNE C on R.POST_ID=C.POST_ID join INSCRIT I on C.ID_MODULE=I.ID_MODULE
where COMPTEID=compteID and ID_REPONSE>(select ID_REPONSE from post_notifications where notification_id=(select(max(notification_id) from reply_notifications where COMPTEID=compteID;));
group by ID_REPONSE;

select ID_COMMENTAIRE, ID_REPONSE, POST_ID, ID_MODULE
from COMMENTAIRE C join REPONSE R on C.ID_REPONSE=R.ID_REPONSE join CONCERNE CO on R.POST_ID=CO.POST_ID join INSCRIT I on CO.ID_MODULE=I.ID_MODULE
where COMPTEID=compteID and ID_COMMENTAIRE>(select ID_COMMENTAIRE from post_notifications where notification_id=(select(max(notification_id) from comment_notifications where COMPTEID=compteID;))
group by ID_COMMENTAIRE;

select
    P.POST_ID, D.ID_MODULE
from
    POST P
    join
    CONCERNE C on P.POST_ID=C.POST_ID
    join DOSSIER D on D.ID_DOSSIER=C.ID_DOSSIER
    join INSCRIT I on D.ID_MODULE=I.ID_MODULE
where
    I.COMPTEID=2
    and
    P.POST_ID>
    coalesce(
        (select POST_ID from posts_notifications pos where pos.COMPTEID=2 order by notification_id desc limit 1),
        (select PI.POST_ID from 
    POST PI
    join
    CONCERNE CI on PI.POST_ID=CI.POST_ID
    join DOSSIER DI on DI.ID_DOSSIER=CI.ID_DOSSIER
    join INSCRIT II on DI.ID_MODULE=II.ID_MODULE
    where II.ID_MODULE=I.ID_MODULE
    and PI.DATE_AJOUTE<I.DATE_INSCRIT
    order by PI.DATE_AJOUTE desc limit 1))
    group by P.POST_ID;
select POST_ID from posts_notifications pos where pos.COMPTEID=2 order by notification_id desc limit 1
