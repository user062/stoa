alter table COMMENTAIRE add constraint FK_COMMENTE foreign key (COMPTEID)
      references COMPTE (COMPTEID) on delete cascade;

alter table COMMENTAIRE add constraint FK_CONSERNE1 foreign key (ID_REPONSE)
      references REPONSE (ID_REPONSE) on delete cascade;

alter table CONCERNE add constraint FK_CONCERNE foreign key (ID_DOSSIER)
      references DOSSIER (ID_DOSSIER) on delete cascade;

alter table CONCERNE add constraint FK_CONCERNE2 foreign key (POST_ID)
      references POST (POST_ID) on delete cascade;

alter table DOCUMENT add constraint FK_CONSISTE foreign key (ID_MODULE)
      references MODULE (ID_MODULE) on delete cascade;

alter table DOSSIER add constraint FK_CREE foreign key (COMPTEID)
      references COMPTE (COMPTEID) on delete cascade;

alter table DOSSIER add constraint FK_FAIT_PARTI foreign key (ID_MODULE)
      references MODULE (ID_MODULE) on delete cascade;

alter table file add constraint FK_AJOUTE foreign key (POST_ID)
      references POST (POST_ID) on delete cascade;

alter table file add constraint FK_AJOUTE2 foreign key (ID_REPONSE)
      references REPONSE (ID_REPONSE) on delete cascade;

alter table INSCRIT add constraint FK_INSCRET foreign key (COMPTEID)
      references COMPTE (COMPTEID) on delete cascade;

alter table INSCRIT add constraint FK_INSCRET2 foreign key (ID_MODULE)
      references MODULE (ID_MODULE) on delete cascade;

alter table POLL_ELEMENT add constraint FK_PEUT_AVOIR foreign key (POST_ID)
      references POST (POST_ID) on delete cascade;

alter table POLL_VOTE add constraint FK_POLL_VOTE foreign key (COMPTEID)
      references COMPTE (COMPTEID) on delete cascade;

alter table POLL_VOTE add constraint FK_POLL_VOTE2 foreign key (POLL_ID)
      references POLL_ELEMENT (POLL_ID) on delete cascade;

alter table POST add constraint FK_CREE_POST foreign key (COMPTEID)
      references COMPTE (COMPTEID) on delete cascade;

alter table REPONSE add constraint FK_AJOUTE_REPONSE foreign key (COMPTEID)
      references COMPTE (COMPTEID) on delete cascade;

alter table REPONSE add constraint FK_CONSERNE2 foreign key (POST_ID)
      references POST (POST_ID) on delete cascade;

alter table UP_DOWN_VOTE add constraint FK_UP_DOWN_VOTE foreign key (COMPTEID)
      references COMPTE (COMPTEID) on delete cascade;

alter table UP_DOWN_VOTE add constraint FK_UP_DOWN_VOTE2 foreign key (ID_REPONSE)
      references REPONSE (ID_REPONSE) on delete cascade;

