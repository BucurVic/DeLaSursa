CREATE TABLE "useri" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "parola" varchar,
  "rol" varchar
);

CREATE TABLE "producatori" (
  "id" integer PRIMARY KEY,
  "nume" varchar,
  "prenume" varchar,
  "adresa" varchar,
  "telefon" varchar,
  "regiune" varchar
);

CREATE TABLE "clienti" (
  "id" integer PRIMARY KEY,
  "nume" varchar,
  "telefon" varchar,
  "prenume" varchar
);

CREATE TABLE "comenzi" (
  "id" integer PRIMARY KEY,
  "id_client" integer NOT NULL,
  "data_efectuarii" datetime
);

CREATE TABLE "comandaProdus" (
  "id" integer PRIMARY KEY,
  "id_comanda" integer NOT NULL,
  "id_produs" integer NOT NULL,
  "cantitate" float,
  "pret_unitar" float
);

CREATE TABLE "produse" (
  "id" integer PRIMARY KEY,
  "nume" varchar,
  "categorie" varchar
);

CREATE TABLE "produsProducator" (
  "id" integer PRIMARY KEY,
  "id_producator" integer NOT NULL,
  "id_produs" integer NOT NULL,
  "cantitate" float,
  "unitate_masura" varchar,
  "pret" float
);

CREATE TABLE "pachete" (
  "id" integer PRIMARY KEY,
  "id_producator" integer NOT NULL,
  "nume" varchar,
  "categorie" varchar,
  "cantitate" integer,
  "pret" float
);

CREATE TABLE "pachetProdus" (
  "id" integer PRIMARY KEY,
  "id_pachet" integer NOT NULL,
  "id_produs" integer NOT NULL,
  "cantitate" float,
  "pret_unitar" float
);

CREATE TABLE "subscriptii" (
  "id" integer PRIMARY KEY,
  "id_client" integer NOT NULL,
  "id_pachet" integer NOT NULL,
  "data_inceput" date,
  "freceventa" integer,
  "status" varchar
);

CREATE TABLE "comandaPachet" (
  "id" integer PRIMARY KEY,
  "id_comanda" integer NOT NULL,
  "id_produs" integer NOT NULL,
  "cantitate" float,
  "pret_unitar" float
);

ALTER TABLE "producatori" ADD FOREIGN KEY ("id") REFERENCES "useri" ("id");

ALTER TABLE "clienti" ADD FOREIGN KEY ("id") REFERENCES "useri" ("id");

ALTER TABLE "comenzi" ADD FOREIGN KEY ("id_client") REFERENCES "clienti" ("id");

ALTER TABLE "comandaProdus" ADD FOREIGN KEY ("id_comanda") REFERENCES "comenzi" ("id");

ALTER TABLE "comandaProdus" ADD FOREIGN KEY ("id_produs") REFERENCES "produse" ("id");

ALTER TABLE "produsProducator" ADD FOREIGN KEY ("id_producator") REFERENCES "producatori" ("id");

ALTER TABLE "produsProducator" ADD FOREIGN KEY ("id_produs") REFERENCES "produse" ("id");

ALTER TABLE "pachete" ADD FOREIGN KEY ("id_producator") REFERENCES "producatori" ("id");

ALTER TABLE "pachetProdus" ADD FOREIGN KEY ("id_pachet") REFERENCES "pachete" ("id");

ALTER TABLE "pachetProdus" ADD FOREIGN KEY ("id_produs") REFERENCES "produse" ("id");

ALTER TABLE "subscriptii" ADD FOREIGN KEY ("id_client") REFERENCES "clienti" ("id");

ALTER TABLE "subscriptii" ADD FOREIGN KEY ("id_pachet") REFERENCES "pachete" ("id");

ALTER TABLE "comandaPachet" ADD FOREIGN KEY ("id_comanda") REFERENCES "comenzi" ("id");

ALTER TABLE "comandaPachet" ADD FOREIGN KEY ("id_produs") REFERENCES "pachete" ("id");