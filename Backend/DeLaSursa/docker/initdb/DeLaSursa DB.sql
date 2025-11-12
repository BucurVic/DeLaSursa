CREATE TABLE useri (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username varchar,
  email varchar,
  parola varchar
);

CREATE TABLE roles (
  name varchar PRIMARY KEY
);

CREATE TABLE users_roles(
  user_id integer REFERENCES useri(id),
  role_id varchar REFERENCES roles(name)
);

CREATE TABLE producatori (
  id integer PRIMARY KEY REFERENCES useri(id) ON DELETE CASCADE,
  nume varchar,
  prenume varchar,
  adresa varchar,
  telefon varchar,
  regiune varchar
);

CREATE TABLE clienti (
  id integer PRIMARY KEY REFERENCES useri(id) ON DELETE CASCADE,
  nume varchar,
  telefon varchar,
  prenume varchar
);

CREATE TABLE comenzi (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_client integer NOT NULL REFERENCES clienti(id) ,
  data_efectuarii date
);


CREATE TABLE produse (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nume varchar,
  categorie varchar
);

CREATE TABLE pachete (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_producator integer NOT NULL references producatori(id),
  nume varchar,
  categorie varchar,
  cantitate integer,
  pret float
);

CREATE TABLE subscriptii (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_client integer NOT NULL references clienti(id),
  id_pachet integer NOT NULL references pachete(id),
  data_inceput date,
  freceventa integer,
  status varchar
);



CREATE TABLE comanda_produs (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_comanda integer NOT NULL REFERENCES comenzi(id),
  id_produs integer NOT NULL REFERENCES  produse(id),
  cantitate float,
  pret_unitar float
);


CREATE TABLE produs_producator (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_producator integer NOT NULL REFERENCES producatori(id),
  id_produs integer NOT NULL REFERENCES produse(id),
  cantitate float,
  unitate_masura varchar,
  pret float
);


CREATE TABLE pachet_produs (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_pachet integer NOT NULL references pachete(id),
  id_produs integer NOT NULL references produse(id),
  cantitate float,
  pret_unitar float
);


CREATE TABLE comanda_pachet (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id_comanda integer NOT NULL references comenzi(id),
  id_pachet integer NOT NULL references pachete(id),
  cantitate float,
  pret_unitar float
);
