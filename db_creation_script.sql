/*==============================================================*/
/* Table : AJOUTE_REPONSE                                       */
/*==============================================================*/
create table AJOUTE_REPONSE
(
   USERNAME             varchar(30) not null,
   POST_ID              int not null,
   ID_REPONSE           int not null,
   primary key (USERNAME, POST_ID)
);

/*==============================================================*/
/* Table : AJOUTE_UN_COMM_SUR_UNREPONSE                         */
/*==============================================================*/
create table AJOUTE_UN_COMM_SUR_UNREPONSE
(
   USERNAME             varchar(30) not null,
   ID_REPONSE           int not null,
   ID_COMMENTAIRE       int not null,
   primary key (USERNAME, ID_REPONSE)
);

/*==============================================================*/
/* Table : COMMENTAIRE                                          */
/*==============================================================*/
create table COMMENTAIRE
(
   ID_COMMENTAIRE       int not null,
   USERNAME             varchar(30) not null,
   ID_REPONSE           int not null,
   DATE_D_AJOUTE        date,
   COMM_CORE            longtext,
   primary key (ID_COMMENTAIRE)
);

/*==============================================================*/
/* Table : COMPTE                                               */
/*==============================================================*/
create table COMPTE
(
   USERNAME             varchar(30) not null,
   EMAIL                varchar(80),
   PASSWORD             varchar(30),
   NOM                  longtext,
   PRENOM               varchar(30),
   SEXE                 char(1),
   DATE_DE_NESSANCE     date,
   TYPE                 varchar(10),
   primary key (USERNAME)
);

/*==============================================================*/
/* Table : CONCERNE                                             */
/*==============================================================*/
create table CONCERNE
(
   POST_ID              int not null,
   ID_DOSSIER           int not null,
   primary key (POST_ID, ID_DOSSIER)
);

/*==============================================================*/
/* Table : CREE                                                 */
/*==============================================================*/
create table CREE
(
   ID_MODULE            int not null,
   USERNAME             varchar(30) not null,
   ID_DOSSIER           int not null,
   primary key (ID_MODULE, USERNAME)
);

/*==============================================================*/
/* Table : DOCUMENT                                             */
/*==============================================================*/
create table DOCUMENT
(
   ID_DOCUMENT          int not null,
   ID_DOSSIER           int not null,
   NOM                  longtext,
   DOC_CORE             char(10),
   primary key (ID_DOCUMENT)
);

/*==============================================================*/
/* Table : DOSSIER                                              */
/*==============================================================*/
create table DOSSIER
(
   ID_DOSSIER           int not null,
   ID_MODULE            int not null,
   USERNAME             varchar(30) not null,
   TITRE_DE_COUR        varchar(40),
   primary key (ID_DOSSIER)
);

/*==============================================================*/
/* Table : FICHIER_1                                            */
/*==============================================================*/
create table FICHIER_1
(
   ID_FICHIER           int not null,
   POST_ID              int not null,
   FICHIER_CORE         char(10),
   primary key (ID_FICHIER)
);

/*==============================================================*/
/* Table : FICHIER_2                                            */
/*==============================================================*/
create table FICHIER_2
(
   ID_FILE              int not null,
   ID_REPONSE           int not null,
   FILE_CORE            char(10),
   primary key (ID_FILE)
);

/*==============================================================*/
/* Table : INSCRET                                              */
/*==============================================================*/
create table INSCRET
(
   ID_DOSSIER           int not null,
   USERNAME             varchar(30) not null,
   DATE_D_INSCIT        date,
   primary key (ID_DOSSIER, USERNAME)
);

/*==============================================================*/
/* Table : MODULE                                               */
/*==============================================================*/
create table MODULE
(
   ID_MODULE            int not null,
   COEFF                int,
   NOM_MODULE           varchar(40),
   primary key (ID_MODULE)
);

/*==============================================================*/
/* Table : POLL_ELEMENT                                         */
/*==============================================================*/
create table POLL_ELEMENT
(
   POLL_ID              int not null,
   POST_ID              int not null,
   ELEMENT              varchar(100),
   VOTES                char(10),
   primary key (POLL_ID)
);

/*==============================================================*/
/* Table : POLL_VOTE                                            */
/*==============================================================*/
create table POLL_VOTE
(
   POLL_ID              int not null,
   USERNAME             varchar(30) not null,
   primary key (POLL_ID, USERNAME)
);

/*==============================================================*/
/* Table : POST                                                 */
/*==============================================================*/
create table POST
(
   POST_ID              int not null,
   USERNAME             varchar(30) not null,
   DATE_D_AJOUTE        date,
   TYPE                 varchar(10),
   POST_CORE            longtext,
   primary key (POST_ID)
);

/*==============================================================*/
/* Table : REPONSE                                              */
/*==============================================================*/
create table REPONSE
(
   ID_REPONSE           int not null,
   USERNAME             varchar(30) not null,
   POST_ID              int not null,
   DATE_D_AJOUTE        date,
   REPONSE_CORE         longtext,
   UP_VOTES             int,
   DOWN_VOTES           int,
   primary key (ID_REPONSE)
);

/*==============================================================*/
/* Table : UP_DOWN_VOTE                                         */
/*==============================================================*/
create table UP_DOWN_VOTE
(
   ID_REPONSE           int not null,
   USERNAME             varchar(30) not null,
   primary key (ID_REPONSE, USERNAME)
);

alter table AJOUTE_REPONSE add constraint FK_AJOUTE_REPONSE foreign key (POST_ID)
      references POST (POST_ID) on delete restrict on update restrict;

alter table AJOUTE_REPONSE add constraint FK_AJOUTE_REPONSE2 foreign key (ID_REPONSE)
      references REPONSE (ID_REPONSE) on delete restrict on update restrict;

alter table AJOUTE_REPONSE add constraint FK_AJOUTE_REPONSE4 foreign key (USERNAME)
      references COMPTE (USERNAME) on delete restrict on update restrict;

alter table AJOUTE_UN_COMM_SUR_UNREPONSE add constraint FK_AJOUTE_UN_COMM_SUR_UNREPONSE foreign key (ID_REPONSE)
      references REPONSE (ID_REPONSE) on delete restrict on update restrict;

alter table AJOUTE_UN_COMM_SUR_UNREPONSE add constraint FK_AJOUTE_UN_COMM_SUR_UNREPONSE2 foreign key (USERNAME)
      references COMPTE (USERNAME) on delete restrict on update restrict;

alter table AJOUTE_UN_COMM_SUR_UNREPONSE add constraint FK_AJOUTE_UN_COMM_SUR_UNREPONSE3 foreign key (ID_COMMENTAIRE)
      references COMMENTAIRE (ID_COMMENTAIRE) on delete restrict on update restrict;

alter table COMMENTAIRE add constraint FK_AJOUTE_UN_COMM_SUR_UNREPONSE4 foreign key (USERNAME, ID_REPONSE)
      references AJOUTE_UN_COMM_SUR_UNREPONSE (USERNAME, ID_REPONSE) on delete restrict on update restrict;

alter table CONCERNE add constraint FK_CONCERNE foreign key (ID_DOSSIER)
      references DOSSIER (ID_DOSSIER) on delete restrict on update restrict;

alter table CONCERNE add constraint FK_CONCERNE2 foreign key (POST_ID)
      references POST (POST_ID) on delete restrict on update restrict;

alter table CREE add constraint FK_CREE foreign key (USERNAME)
      references COMPTE (USERNAME) on delete restrict on update restrict;

alter table CREE add constraint FK_CREE2 foreign key (ID_DOSSIER)
      references DOSSIER (ID_DOSSIER) on delete restrict on update restrict;

alter table CREE add constraint FK_CREE4 foreign key (ID_MODULE)
      references MODULE (ID_MODULE) on delete restrict on update restrict;

alter table DOCUMENT add constraint FK_CONSISTE foreign key (ID_DOSSIER)
      references DOSSIER (ID_DOSSIER) on delete restrict on update restrict;

alter table DOSSIER add constraint FK_CREE3 foreign key (ID_MODULE, USERNAME)
      references CREE (ID_MODULE, USERNAME) on delete restrict on update restrict;

alter table FICHIER_1 add constraint FK_AJOUTE foreign key (POST_ID)
      references POST (POST_ID) on delete restrict on update restrict;

alter table FICHIER_2 add constraint FK_AJOUTE2 foreign key (ID_REPONSE)
      references REPONSE (ID_REPONSE) on delete restrict on update restrict;

alter table INSCRET add constraint FK_INSCRET foreign key (USERNAME)
      references COMPTE (USERNAME) on delete restrict on update restrict;

alter table INSCRET add constraint FK_INSCRET2 foreign key (ID_DOSSIER)
      references DOSSIER (ID_DOSSIER) on delete restrict on update restrict;

alter table POLL_ELEMENT add constraint FK_PEUT_AVOIR foreign key (POST_ID)
      references POST (POST_ID) on delete restrict on update restrict;

alter table POLL_VOTE add constraint FK_POLL_VOTE foreign key (USERNAME)
      references COMPTE (USERNAME) on delete restrict on update restrict;

alter table POLL_VOTE add constraint FK_POLL_VOTE2 foreign key (POLL_ID)
      references POLL_ELEMENT (POLL_ID) on delete restrict on update restrict;

alter table POST add constraint FK_CREE_POST foreign key (USERNAME)
      references COMPTE (USERNAME) on delete restrict on update restrict;

alter table REPONSE add constraint FK_AJOUTE_REPONSE3 foreign key (USERNAME, POST_ID)
      references AJOUTE_REPONSE (USERNAME, POST_ID) on delete restrict on update restrict;

alter table UP_DOWN_VOTE add constraint FK_UP_DOWN_VOTE foreign key (USERNAME)
      references COMPTE (USERNAME) on delete restrict on update restrict;

alter table UP_DOWN_VOTE add constraint FK_UP_DOWN_VOTE2 foreign key (ID_REPONSE)
      references REPONSE (ID_REPONSE) on delete restrict on update restrict;
