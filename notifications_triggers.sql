DELIMETER ;;
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

DELIMETER ;;
CREATE TRIGGER notify_posts AFTER INSERT ON POST 
       FOR EACH ROW
       BEGIN
        insert into posts_notifications (COMPTEID, ID_MODULE, POST_ID, type)
        select
             I.COMPTEID, I.ID_MODULE, NEW.POST_ID, NEW.type
        from
             CONCERNE C
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             C.POST_ID = NEW.POST_ID
             and
             NEW.COMPTEID <> I.COMPTEID
        group by I.COMPTEID;
       END;
;;

DELIMITER ;;
CREATE TRIGGER notify_reply AFTER INSERT ON REPONSE 
       FOR EACH ROW
       BEGIN
        insert into reply_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE)
        select
             I.COMPTEID, I.ID_MODULE, NEW.POST_ID, NEW.ID_REPONSE
        from
             CONCERNE C
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             C.POST_ID = NEW.POST_ID
             and
             NEW.COMPTEID <> I.COMPTEID
        group by I.COMPTEID;
       END;
;;   

DELIMITER ;;
CREATE TRIGGER notify_comment AFTER INSERT ON COMMENTAIRE 
       FOR EACH ROW 
       BEGIN
        insert into comment_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE, ID_COMMENTAIRE)
        select
             I.COMPTEID, I.ID_MODULE, R.POST_ID, NEW.ID_REPONSE, NEW.ID_COMMENTAIRE
        from
             REPONSE R
             join
             CONCERNE C on C.POST_ID=R.POST_ID
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             NEW.COMPTEID <> I.COMPTEID
             and
             R.ID_REPONSE=NEW.ID_REPONSE
        group by I.COMPTEID;
       END;
;;
