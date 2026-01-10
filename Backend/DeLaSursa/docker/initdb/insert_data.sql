-- ========================================================
-- STEP 1: Inserăm useri (1 admin, 10 clienți, 9 producători)
-- ========================================================
INSERT INTO useri (username, email, parola, is_email_verified,avatar) VALUES
    ('admin', 'admin@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/1/admin.png'),

    -- 10 clienti
    ('client1', 'client1@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/2/man.jpg'),
    ('client2', 'client2@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/3/woman.jpg'),
    ('client3', 'client3@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/4/man.jpg'),
    ('client4', 'client4@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/5/woman.jpg'),
    ('client5', 'client5@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/6/man.jpg'),
    ('client6', 'client6@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/7/woman.jpg'),
    ('client7', 'client7@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/8/woman.jpg'),
    ('client8', 'client8@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/9/man.jpg'),
    ('client9', 'client9@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/10/woman.jpg'),
    ('client10', 'client10@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/11/man.jpg'),

    -- 9 producatori
    ('producator1', 'prod1@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/12/man.jpg'),
    ('producator2', 'prod2@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/13/man.jpg'),
    ('producator3', 'prod3@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/14/woman.jpg'),
    ('producator4', 'prod4@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/15/woman.jpg'),
    ('producator5', 'prod5@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/16/man.jpg'),
    ('producator6', 'prod6@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/17/man.jpg'),
    ('producator7', 'prod7@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/18/woman.jpg'),
    ('producator8', 'prod8@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/19/man.jpg'),
    ('producator9', 'prod9@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS',true,'/uploads/useri/20/woman.jpg');

INSERT INTO roles (name) VALUES
    ('admin'),
    ('client'),
    ('producator');

INSERT INTO users_roles(user_id,role_id) VALUES
    (1,'admin'),
    (2,'client'),
    (3,'client'),
    (4,'client'),
    (5,'client'),
    (6,'client'),
    (7,'client'),
    (8,'client'),
    (9,'client'),
    (10,'client'),
    (11,'client'),
    (12,'producator'),
    (13,'producator'),
    (14,'producator'),
    (15,'producator'),
    (16,'producator'),
    (17,'producator'),
    (18,'producator'),
    (19,'producator'),
    (20,'producator');

-- ========================================================
-- STEP 2: Inserăm clienți (id-urile 2–11)
-- ========================================================
INSERT INTO clienti (id, nume, telefon, prenume) VALUES
    (2, 'Radu', '0701111111', 'George'),
    (3, 'Marinescu', '0702222222', 'Diana'),
    (4, 'Petrescu', '0703333333', 'Mihai'),
    (5, 'Iftimie', '0704444444', 'Alexandra'),
    (6, 'Dobre', '0705555555', 'Ioan'),
    (7, 'Avram', '0706666666', 'Cristina'),
    (8, 'Tudor', '0707777777', 'Elena'),
    (9, 'Matei', '0708888888', 'Andrei'),
    (10, 'Barbu', '0709999999', 'Ana'),
    (11, 'Pop', '0700000000', 'Vlad');

-- ========================================================
-- STEP 3: Inserăm producători (id-urile 12–20)
-- ========================================================
INSERT INTO producatori (id, nume, prenume, adresa, telefon, regiune) VALUES
    (12, 'Popescu', 'Andrei', 'Str. Unirii 1', '0711111111', 'Nord'),
    (13, 'Ionescu', 'Mihai', 'Str. Victoriei 22', '0722222222', 'Sud'),
    (14, 'Georgescu', 'Raluca', 'Str. Libertatii 5', '0733333333', 'Vest'),
    (15, 'Marin', 'Elena', 'Str. Florilor 8', '0744444444', 'Est'),
    (16, 'Dumitru', 'Alex', 'Str. Mioritei 13', '0755555555', 'Centru'),
    (17, 'Stan', 'Radu', 'Str. Primaverii 19', '0766666666', 'Nord'),
    (18, 'Badea', 'Ioana', 'Str. Aviatorilor 7', '0777777777', 'Vest'),
    (19, 'Nistor', 'Teodor', 'Str. Mihai Viteazul 14', '0788888888', 'Sud'),
    (20, 'Popa', 'Maria', 'Str. Tineretului 4', '0799999999', 'Centru');

-- ========================================================
-- STEP 4: Inserăm produse
-- ========================================================
INSERT INTO produse (nume, categorie) VALUES
    ('Mere', 'Fructe'),
    ('Pere', 'Fructe'),
    ('Rosii', 'Legume'),
    ('Castraveti', 'Legume'),
    ('Branza', 'Lactate'),
    ('Lapte', 'Lactate'),
    ('Paine', 'Panificatie'),
    ('Ulei', 'Alimentar'),
    ('Cafea', 'Bauturi'),
    ('Zahar', 'Alimentar');

-- ========================================================
-- STEP 5: Inserăm produs_producator
-- ========================================================
INSERT INTO produs_producator (id_producator, id_produs, cantitate, unitate_masura, pret,imagine) VALUES
    (12, 1, 100, 'kg', 2.5,'/uploads/produse/12/mere.jpg'),
    (12, 2, 80, 'kg', 3.0,'/uploads/produse/12/pere.jpg'),
    (13, 3, 50, 'kg', 4.0,'/uploads/produse/13/rosii.jpg'),
    (14, 4, 60, 'kg', 4.5,'/uploads/produse/14/castraveti.jpg'),
    (15, 5, 40, 'kg', 6.0,'/uploads/produse/15/branza_cu_lapte_de_vaca.jpg'),
    (16, 6, 30, 'l', 5.0,'/uploads/produse/16/lapte.jpg'),
    (17, 7, 100, 'buc', 1.0,'/uploads/produse/17/paine.jpg'),
    (18, 8, 80, 'l', 10.0,'/uploads/produse/18/ulei.jpg'),
    (19, 9, 70, 'kg', 8.0,'/uploads/produse/19/cafea.jpg'),
    (20, 10, 90, 'kg', 5.5,'/uploads/produse/20/zahar.jpg');

-- ========================================================
-- STEP 6: Inserăm pachete
-- ========================================================
INSERT INTO pachete (id_producator, nume, imagine) VALUES
    (12, 'Pachet Fructe 1',' '),
    (13, 'Pachet Fructe 2',' '),
    (14, 'Pachet Legume',' '),
    (15, 'Pachet Lactate',' '),
    (16, 'Pachet Mixt 1',' '),
    (17, 'Pachet Mixt 2',' '),
    (18, 'Pachet Panificatie',' '),
    (19, 'Pachet Bauturi',' '),
    (20, 'Pachet Alimentar',' '),
    (12, 'Pachet Premium',' ');

-- ========================================================
-- STEP 7: Inserăm pachet_produs
-- ========================================================
INSERT INTO pachet_produs (id_pachet, id_produs, cantitate, pret_unitar) VALUES
    (1, 1, 2, 2.5),
    (1, 2, 2, 3.0),
    (2, 3, 3, 4.0),
    (3, 4, 3, 4.5),
    (4, 5, 1, 6.0),
    (5, 6, 2, 5.0),
    (6, 7, 4, 1.0),
    (7, 8, 3, 10.0),
    (8, 9, 2, 8.0),
    (9, 10, 5, 5.5);

-- ========================================================
-- STEP 8: Inserăm comenzi
-- ========================================================
INSERT INTO comenzi (id_client, data_efectuarii) VALUES
    (2, '2025-01-01'),
    (3, '2025-01-02'),
    (4, '2025-01-03'),
    (5, '2025-01-04'),
    (6, '2025-01-05'),
    (7, '2025-01-06'),
    (8, '2025-01-07'),
    (9, '2025-01-08'),
    (10, '2025-01-09'),
    (11, '2025-01-10');

-- ========================================================
-- STEP 9: Inserăm comanda_produs
-- ========================================================
INSERT INTO comanda_produs (id_comanda, id_produs, cantitate, pret_unitar) VALUES
    (1, 1, 2, 2.5),
    (2, 2, 1, 3.0),
    (3, 3, 3, 4.0),
    (4, 4, 4, 4.5),
    (5, 5, 2, 6.0),
    (6, 6, 3, 5.0),
    (7, 7, 5, 1.0),
    (8, 8, 4, 10.0),
    (9, 9, 3, 8.0),
    (10, 10, 6, 5.5);

-- ========================================================
-- STEP 10: Inserăm comanda_pachet
-- ========================================================
INSERT INTO comanda_pachet (id_comanda, id_pachet, cantitate, pret_unitar) VALUES
    (1, 1, 1, 25),
    (2, 2, 2, 30),
    (3, 3, 3, 28),
    (4, 4, 2, 35),
    (5, 5, 1, 50),
    (6, 6, 3, 60),
    (7, 7, 2, 20),
    (8, 8, 1, 40),
    (9, 9, 2, 32),
    (10, 10, 1, 75);

-- ========================================================
-- STEP 11: Inserăm subscriptii
-- ========================================================
INSERT INTO subscriptii (id_client, id_pachet, data_inceput, freceventa, status) VALUES
    (2, 1, '2025-01-01', 7, 'activa'),
    (3, 2, '2025-01-02', 14, 'activa'),
    (4, 3, '2025-01-03', 30, 'activa'),
    (5, 4, '2025-01-04', 7, 'inactiva'),
    (6, 5, '2025-01-05', 14, 'activa'),
    (7, 6, '2025-01-06', 30, 'activa'),
    (8, 7, '2025-01-07', 7, 'inactiva'),
    (9, 8, '2025-01-08', 14, 'activa'),
    (10, 9, '2025-01-09', 30, 'activa'),
    (11, 10, '2025-01-10', 7, 'activa');


INSERT INTO admini(id,nume,prenume) VALUES
    (1, 'De La', 'Sursa');


update useri set data_inregistrare = CURRENT_DATE, status = true;