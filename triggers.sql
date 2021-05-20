create or replace trigger T1 before insert on COMMENTAIRE
for each row
set new.DATE_AJOUTE= current_timestamp;
create or replace trigger T2 before insert on POST
for each row
set new.DATE_AJOUTE= current_timestamp;
create or replace trigger T3 before insert on REPONSE
for each row
set new.DATE_AJOUTE= current_timestamp;
create or replace trigger T4 before insert on INSCRET
for each row
set new.DATE_INSCIT= current_timestamp;
create or replace trigger T5 before insert on COMPTE
for each row
set new.DATE_INSCRIT= current_timestamp;

