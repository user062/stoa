create trigger T1 before insert on COMMENTAIRE
for each row
set new.DATE_AJOUTE= CURRENT_DATE;
create trigger T2 before insert on post
for each row
set new.DATE_AJOUTE= CURRENT_DATE;
create trigger T3 before insert on reponse
for each row
set new.DATE_AJOUTE= CURRENT_DATE;
create trigger T4 before insert on inscret
for each row
set new.DATE_INSCIT= CURRENT_DATE;
create trigger T5 before insert on compte
for each row
set new.date_inscrit= current_timestamp;

