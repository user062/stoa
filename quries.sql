

insert into post (COMPTEID, title, TYPE, POST_CORE)
values (?, ?, ?, ?);


insert into reponse (COMPTEID, POST_ID, REPONSE_CORE, POST_CORE)
values (?, ?, ?, ?);

insert into commentaire (COMPTEID, ID_REPONSE, COMM_CORE)
values (?, ?, ?, ?);

select * from module;

select * from post;

select * from reponse;

select * from commentaire;

