
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
   ID_DOSSIER           int,
   NOM                  varchar(40),
   DOC_CORE             LONGBLOB
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

