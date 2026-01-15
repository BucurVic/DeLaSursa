-- ========================================================
-- STEP 1: Inserăm useri (1 admin, 10 clienți, 9 producători)
-- ========================================================
INSERT INTO useri (username, email, parola, is_email_verified, avatar)
VALUES ('admin', 'admin@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/1/admin.png'),

       -- 10 clienti
       ('client1', 'client1@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/2/man.jpg'),
       ('client2', 'client2@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/3/woman.jpg'),
       ('client3', 'client3@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/4/man.jpg'),
       ('client4', 'client4@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/5/woman.jpg'),
       ('client5', 'client5@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/6/man.jpg'),
       ('client6', 'client6@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/7/woman.jpg'),
       ('client7', 'client7@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/8/woman.jpg'),
       ('client8', 'client8@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/9/man.jpg'),
       ('client9', 'client9@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/10/woman.jpg'),
       ('client10', 'client10@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/11/man.jpg'),

       -- 9 producatori
       ('producator1', 'prod1@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/12/man.jpg'),
       ('producator2', 'prod2@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/13/man.jpg'),
       ('producator3', 'prod3@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/14/woman.jpg'),
       ('producator4', 'prod4@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/15/woman.jpg'),
       ('producator5', 'prod5@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/16/man.jpg'),
       ('producator6', 'prod6@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/17/man.jpg'),
       ('producator7', 'prod7@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/18/woman.jpg'),
       ('producator8', 'prod8@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/19/man.jpg'),
       ('producator9', 'prod9@example.com', '$2a$12$yBGoM7/u77A2IR1MSGn2Z.K8S61oVM/8EKhZUDdOtPV7m19XcrxZS', true,
        '/uploads/useri/20/woman.jpg');

INSERT INTO roles (name)
VALUES ('admin'),
       ('client'),
       ('producator');

INSERT INTO users_roles(user_id, role_id)
VALUES (1, 'admin'),
       (2, 'client'),
       (3, 'client'),
       (4, 'client'),
       (5, 'client'),
       (6, 'client'),
       (7, 'client'),
       (8, 'client'),
       (9, 'client'),
       (10, 'client'),
       (11, 'client'),
       (12, 'producator'),
       (13, 'producator'),
       (14, 'producator'),
       (15, 'producator'),
       (16, 'producator'),
       (17, 'producator'),
       (18, 'producator'),
       (19, 'producator'),
       (20, 'producator');

-- ========================================================
-- STEP 2: Inserăm clienți (id-urile 2–11)
-- ========================================================
INSERT INTO clienti (id, nume, telefon, prenume)
VALUES (2, 'Radu', '0701111111', 'George'),
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
INSERT INTO producatori (id, nume, prenume, adresa, telefon, regiune)
VALUES (12, 'Popescu', 'Andrei', 'Str. Unirii 1', '0711111111', 'Nord'),
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
INSERT INTO produse (nume, categorie)
VALUES ('Mere', 'Fructe'),
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
INSERT INTO produs_producator (id_producator, id_produs, cantitate, unitate_masura, pret, imagine)
VALUES (12, 1, 100, 'kg', 2.5, '/uploads/produse/12/mere.jpg'),
       (12, 2, 80, 'kg', 3.0, '/uploads/produse/12/pere.jpg'),
       (13, 3, 50, 'kg', 4.0, '/uploads/produse/13/rosii.jpg'),
       (14, 4, 60, 'kg', 4.5, '/uploads/produse/14/castraveti.jpg'),
       (15, 5, 40, 'kg', 6.0, '/uploads/produse/15/branza_cu_lapte_de_vaca.jpg'),
       (16, 6, 30, 'l', 5.0, '/uploads/produse/16/lapte.jpg'),
       (17, 7, 100, 'buc', 1.0, '/uploads/produse/17/paine.jpg'),
       (18, 8, 80, 'l', 10.0, '/uploads/produse/18/ulei.jpg'),
       (19, 9, 70, 'kg', 8.0, '/uploads/produse/19/cafea.jpg'),
       (20, 10, 90, 'kg', 5.5, '/uploads/produse/20/zahar.jpg');

-- ========================================================
-- STEP 6: Inserăm pachete
-- ========================================================
INSERT INTO pachete (id_producator, nume, imagine)
VALUES (12, 'Pachet Fructe 1', ' '),
       (13, 'Pachet Fructe 2', ' '),
       (14, 'Pachet Legume', ' '),
       (15, 'Pachet Lactate', ' '),
       (16, 'Pachet Mixt 1', ' '),
       (17, 'Pachet Mixt 2', ' '),
       (18, 'Pachet Panificatie', ' '),
       (19, 'Pachet Bauturi', ' '),
       (20, 'Pachet Alimentar', ' '),
       (12, 'Pachet Premium', ' ');

-- ========================================================
-- STEP 7: Inserăm pachet_produs
-- ========================================================
INSERT INTO pachet_produs (id_pachet, id_produs, cantitate, pret_unitar)
VALUES (1, 1, 2, 2.5),
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
-- STEP 8: Inserăm adrese
-- ========================================================
INSERT INTO adresa (nume_complet, telefon, strada_nume_numar, localitate, judet, cod_postal)
VALUES ('ClientNameMock1', '0773823937', 'Teodor Mihali nr1', 'Cluj-Napoca', 'Cluj', '4373'),
       ('ClientNameMock2', '0773823937', 'Teodor Mihali nr1', 'Cluj-Napoca', 'Cluj', '4235'),
       ('ClientNameMock3', '0773823937', 'Teodor Mihali nr1', 'Cluj-Napoca', 'Cluj', '4312'),
       ('ClientNameMock4', '0773823937', 'Teodor Mihali nr1', 'Cluj-Napoca', 'Cluj', '4739'),
       ('ClientNameMock5', '0773823937', 'Teodor Mihali nr1', 'Cluj-Napoca', 'Cluj', '4644'),
       ('ClientNameMock6', '0773823937', 'Teodor Mihali nr1', 'Cluj-Napoca', 'Cluj', '4316'),
       ('ClientNameMock7', '0773823937', 'Teodor Mihali nr1', 'Cluj-Napoca', 'Cluj', '7461');

-- ========================================================
-- STEP 8: Inserăm metoda_livrare_pret
-- ========================================================
INSERT INTO metoda_livrare_pret(metoda_livrare, pret)
VALUES (0, 20),
       (1, 0);
-- ========================================================
-- STEP 8: Inserăm comenzi
-- ========================================================
INSERT INTO comenzi (id_client, data_efectuarii, status_comanda, adresa_livrare_id, adresa_facturare_id,
                     metoda_livrare_id, metoda_plata, observatii)
VALUES (2, '2026-01-01', 0, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock1'),
        (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock1'),
        (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
        0, 'observatie'),
       (3, '2026-01-02', 1, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock2'),
        (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock2'),
        (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
        0, 'observatie'),
       (4, '2026-01-03', 2, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock3'),
        (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock3'),
        (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
        0, 'observatie'),
       (5, '2026-01-04', 3, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock4'),
        (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock4'),
        (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
        0, 'observatie'),
       (6, '2026-01-05', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock4'),
        (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock4'),
        (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
        0, 'observatie'),
       (7, '2026-01-06', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock5'),
        (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock5'),
        (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
        0, 'observatie'),
       (8, '2026-01-07', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock6'),
        (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock6'),
        (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
        0, 'observatie'),
       (9, '2026-01-08', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock7'),
        (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock7'),
        (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
        0, 'observatie'),
       (10, '2026-01-09', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock2'),
        (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock2'),
        (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
        0, 'observatie'),
       (11, '2026-01-10', 3, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock7'),
        (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock7'),
        (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
        0, 'observatie');

-- ========================================================
-- STEP 9: Inserăm comanda_produs
-- ========================================================
INSERT INTO comanda_produs (id_comanda, id_produs, cantitate, pret_unitar)
VALUES
-- comanda 1 → producator 12
(1, 1, 2, 2.5),
(1, 2, 1, 3.0),

-- comanda 2 → producator 13
(2, 3, 3, 4.0),

-- comanda 3 → producator 14
(3, 4, 4, 4.5),

-- comanda 4 → producator 15
(4, 5, 2, 6.0),

-- comanda 5 → producator 16
(5, 6, 3, 5.0),

-- comanda 6 → producator 17
(6, 7, 5, 1.0),

-- comanda 7 → producator 18
(7, 8, 4, 10.0),

-- comanda 8 → producator 19
(8, 9, 3, 8.0),

-- comanda 9 → producator 20
(9, 10, 6, 5.5),

-- comanda 10 → producator 12
(10, 1, 1, 2.5);


-- ========================================================
-- STEP 10: Inserăm comanda_pachet
-- ========================================================
INSERT INTO comanda_pachet (id_comanda, id_pachet, cantitate, pret_unitar)
VALUES
-- comanda 1 → producator 12
(1, 1, 1, 25),

-- comanda 2 → producator 13
(2, 2, 2, 30),

-- comanda 3 → producator 14
(3, 3, 1, 28),

-- comanda 4 → producator 15
(4, 4, 1, 35),

-- comanda 5 → producator 16
(5, 5, 1, 50),

-- comanda 6 → producator 17
(6, 6, 2, 60),

-- comanda 7 → producator 18
(7, 7, 1, 20),

-- comanda 8 → producator 19
(8, 8, 1, 40),

-- comanda 9 → producator 20
(9, 9, 1, 32),

-- comanda 10 → producator 12
(10, 10, 1, 75);


-- ========================================================
-- STEP 11: Inserăm subscriptii
-- ========================================================
INSERT INTO subscriptii (id_client, id_pachet, data_inceput, freceventa, status)
VALUES (2, 1, '2025-01-01', 7, 'activa'),
       (3, 2, '2025-01-02', 14, 'activa'),
       (4, 3, '2025-01-03', 30, 'activa'),
       (5, 4, '2025-01-04', 7, 'inactiva'),
       (6, 5, '2025-01-05', 14, 'activa'),
       (7, 6, '2025-01-06', 30, 'activa'),
       (8, 7, '2025-01-07', 7, 'inactiva'),
       (9, 8, '2025-01-08', 14, 'activa'),
       (10, 9, '2025-01-09', 30, 'activa'),
       (11, 10, '2025-01-10', 7, 'activa');


INSERT INTO admini(id, nume, prenume)
VALUES (1, 'De La', 'Sursa');


update useri
set data_inregistrare = CURRENT_DATE,
    status            = true;

-- ========================================================
-- STEP 12: Inserăm comenzi suplimentare pentru producatori (fiecare sa aiba cel putin 2 comenzi)
-- ========================================================
INSERT INTO comenzi (id_client, data_efectuarii, status_comanda, adresa_livrare_id, adresa_facturare_id,
                     metoda_livrare_id, metoda_plata, observatii)
VALUES
-- producator 12 → client 2
(2, '2026-01-11', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock1'),
 (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock1'),
 (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
 0, 'observatie'),

-- producator 13 → client 3
(3, '2026-01-12', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock2'),
 (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock2'),
 (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
 0, 'observatie'),

-- producator 14 → client 4
(4, '2026-01-13', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock3'),
 (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock3'),
 (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
 0, 'observatie'),

-- producator 15 → client 5
(5, '2026-01-14', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock4'),
 (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock4'),
 (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
 0, 'observatie'),

-- producator 16 → client 6
(6, '2026-01-15', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock5'),
 (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock5'),
 (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
 0, 'observatie'),

-- producator 17 → client 7
(7, '2026-01-16', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock6'),
 (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock6'),
 (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
 0, 'observatie'),

-- producator 18 → client 8
(8, '2026-01-17', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock7'),
 (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock7'),
 (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
 0, 'observatie'),

-- producator 19 → client 9
(9, '2026-01-18', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock2'),
 (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock2'),
 (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
 0, 'observatie'),

-- producator 20 → client 10
(10, '2026-01-19', 4, (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock3'),
 (SELECT id FROM adresa WHERE nume_complet = 'ClientNameMock3'),
 (SELECT id FROM metoda_livrare_pret WHERE metoda_livrare = 0),
 0, 'observatie');

-- ========================================================
-- STEP 13: Inserăm comanda_produs pentru noile comenzi
-- ========================================================
INSERT INTO comanda_produs (id_comanda, id_produs, cantitate, pret_unitar)
VALUES
-- Comanda noua 1 → producator 12
(11, 1, 3, 2.5),

-- Comanda noua 2 → producator 13
(12, 3, 2, 4.0),

-- Comanda noua 3 → producator 14
(13, 4, 4, 4.5),

-- Comanda noua 4 → producator 15
(14, 5, 4, 6.0),

-- Comanda noua 5 → producator 16
(15, 6, 4, 5.0),

-- Comanda noua 6 → producator 17
(16, 7, 4, 1.0),

-- Comanda noua 7 → producator 18
(17, 8, 4, 10.0),

-- Comanda noua 8 → producator 19
(18, 9, 1, 8.0),

-- Comanda noua 9 → producator 20
(19, 10, 4, 5.5);

-- ========================================================
-- STEP 14: Inserăm comanda_pachet pentru noile comenzi
-- ========================================================
INSERT INTO comanda_pachet (id_comanda, id_pachet, cantitate, pret_unitar)
VALUES
-- Comanda noua 1 → producator 12
(11, 1, 1, 25),

-- Comanda noua 2 → producator 13
(12, 2, 1, 30),

-- Comanda noua 3 → producator 14
(13, 3, 1, 28),

-- Comanda noua 4 → producator 15
(14, 4, 1, 35),

-- Comanda noua 5 → producator 16
(15, 5, 1, 50),

-- Comanda noua 6 → producator 17
(16, 6, 1, 60),

-- Comanda noua 7 → producator 18
(17, 7, 1, 20),

-- Comanda noua 8 → producator 19
(18, 8, 1, 40),

-- Comanda noua 9 → producator 20
(19, 9, 1, 32);
