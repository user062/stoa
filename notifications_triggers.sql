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
       END;
;;
