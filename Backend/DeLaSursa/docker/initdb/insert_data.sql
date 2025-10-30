-- ========================================================
-- STEP 1: Inserăm useri (1 admin, 10 clienți, 9 producători)
-- ========================================================
INSERT INTO useri (username, email, parola, rol) VALUES
    ('admin', 'admin@example.com', 'adminpass', 'admin'),

    -- 10 clienti
    ('client1', 'client1@example.com', 'pass1', 'client'),
    ('client2', 'client2@example.com', 'pass2', 'client'),
    ('client3', 'client3@example.com', 'pass3', 'client'),
    ('client4', 'client4@example.com', 'pass4', 'client'),
    ('client5', 'client5@example.com', 'pass5', 'client'),
    ('client6', 'client6@example.com', 'pass6', 'client'),
    ('client7', 'client7@example.com', 'pass7', 'client'),
    ('client8', 'client8@example.com', 'pass8', 'client'),
    ('client9', 'client9@example.com', 'pass9', 'client'),
    ('client10', 'client10@example.com', 'pass10', 'client'),

    -- 9 producatori
    ('producator1', 'prod1@example.com', 'pass11', 'producator'),
    ('producator2', 'prod2@example.com', 'pass12', 'producator'),
    ('producator3', 'prod3@example.com', 'pass13', 'producator'),
    ('producator4', 'prod4@example.com', 'pass14', 'producator'),
    ('producator5', 'prod5@example.com', 'pass15', 'producator'),
    ('producator6', 'prod6@example.com', 'pass16', 'producator'),
    ('producator7', 'prod7@example.com', 'pass17', 'producator'),
    ('producator8', 'prod8@example.com', 'pass18', 'producator'),
    ('producator9', 'prod9@example.com', 'pass19', 'producator');

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
INSERT INTO produs_producator (id_producator, id_produs, cantitate, unitate_masura, pret) VALUES
    (12, 1, 100, 'kg', 2.5),
    (12, 2, 80, 'kg', 3.0),
    (13, 3, 50, 'kg', 4.0),
    (14, 4, 60, 'kg', 4.5),
    (15, 5, 40, 'kg', 6.0),
    (16, 6, 30, 'l', 5.0),
    (17, 7, 100, 'buc', 1.0),
    (18, 8, 80, 'l', 10.0),
    (19, 9, 70, 'kg', 8.0),
    (20, 10, 90, 'kg', 5.5);

-- ========================================================
-- STEP 6: Inserăm pachete
-- ========================================================
INSERT INTO pachete (id_producator, nume, categorie, cantitate, pret) VALUES
    (12, 'Pachet Fructe 1', 'Fructe', 10, 25),
    (13, 'Pachet Fructe 2', 'Fructe', 15, 30),
    (14, 'Pachet Legume', 'Legume', 12, 28),
    (15, 'Pachet Lactate', 'Lactate', 8, 35),
    (16, 'Pachet Mixt 1', 'Mixt', 20, 50),
    (17, 'Pachet Mixt 2', 'Mixt', 25, 60),
    (18, 'Pachet Panificatie', 'Panificatie', 18, 20),
    (19, 'Pachet Bauturi', 'Bauturi', 12, 40),
    (20, 'Pachet Alimentar', 'Alimentar', 16, 32),
    (12, 'Pachet Premium', 'Deluxe', 10, 75);

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
INSERT INTO comanda_pachet (id_comanda, id_produs, cantitate, pret_unitar) VALUES
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
