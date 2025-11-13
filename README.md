# DeLaSursa

Am adaugat repository-uri ce au deja functionalitati crud pentru fiecare entitate, plus service-uri pentru entitati

Pentru compose up: "docker compose up --build -d"
Pentru compose down: "docker compose down -v" (-v sterge si volumele create)


Pentru ca sa poti rula proiectul din IntelliJ trebuie editate niste configuratii.

Pentru configuratia de rulare pentru DeLaSursaApplication trebuie moodificat locul in care se ruleaza proiectul. In mendiul de Edit al configuratiei, in sectiunea "Run on:" in mod normal ar trebui sa apara Local Machine. Trebuie schimbat in Docker Compose. IntelliJ ar trebuie sa detecteze automat fisierul docker-compose.yml. In sectiunea Service trebuie selectat "app". La sectiunea de Jdk Configuration ar trebui sa apara "/opt/java/openjdk" daca nu, pune valoarea asta, + versiunea 17.0.6 in caz ca nu apare.


Pentru a putea porni baza de date direct din IntelliJ, trebuie creata o configuratie noua, de "Docker Compose", aceleasi setari ca la configuratia de aplicatie, dar la sectiunea Service trebuie selectat "postgres".


Pentru a crea DataSource in Intellij variabilele "POSTGRES_DB" "DB_URL" "DB_USER" "DB_PASS" din docker-compose.yml. Singura schimbare este ca hostul va fi "localhost", nu "postgres".
