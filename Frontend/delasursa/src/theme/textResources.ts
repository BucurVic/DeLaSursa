export const textResources = {
    loginPage: {
        logoAlt: "Logo DeLaSursă",
        title: "Autentificare",
        noAccount: "Nu ai cont?",
        registerLink: "Înregistrează-te!",
        emailLabel: "Email",
        emailPlaceholder: "Introdu email-ul",
        passwordLabel: "Parolă",
        passwordPlaceholder: "Introdu parola",
        rememberMe: "Ține-mă minte!",
        forgotPassword: "Ai uitat parola?",
        submitButton: "Autentificare",
    },


    forgotPasswordPage: {
        logoAlt: "Logo DeLaSursă",
        title: "Ai uitat parola?",
        rememberPassword: "Îți amintești parola?",
        loginLink: "Autentifică-te!",
        emailLabel: "Email",
        emailPlaceholder: "Introdu email-ul",
        submitButton: "Trimite",
    },

    searchBar: {
        placeholder: "Caută produse...",
    },
    uploader: {
        title: 'Apasă pentru a încărca',
        acceptedFiles: 'Fișiere acceptate: ',
    },
    pages: {
        uploadFormTitle: 'Formular de Upload',
    },
    buttons: {
        submit: 'Salvează',
        cancel: 'Anulează',
        edit: "Editează",
        deactivate: "Dezactivează",
        delete: "Șterge",
    },
    form: {
        title: "Adaugă produs",
        name: "Nume produs",
        category: "Categorie",
        unit: "Unitate de măsură",
        price: "Preț (lei / unitate)",
        stock: "Stoc disponibil",
        region: "Regiune",
        description: "Descriere produs",
        placeholderName: "ex: Roșii Cherry Bio",
        placeholderPrice: "ex: 22",
        placeholderStock: "ex: 45",
        placeholderDescription: "Descrie produsul tău...",
        addButton: "Adaugă produs",
        cancelButton: "Anulează",
        imagesLabel: "Imagini produs"
    },
    brand: {
    name: "DeLaSursă"
  },
  navbar: {
    home: "Acasă",
    products: "Produse",
    producers: "Producători",
    subscriptions: "Abonamente",
    support: "Suport Clienți",
    login: "Autentificare",
    register: "Înregistrare",
    
    // logged-in user elements
    producerPanel: "Panou Producător",
    adminPanel: "Panou Admin",
    myOrders: "Comenzile mele",
    myAccount: "Contul meu",
    myReviews: "Review-urile mele",
    deliveryAddresses: "Adrese de livrare",
    mySubscriptions: "Abonamentele mele",
    logout: "Deconectare",
  },

  // sidebar texts (producator only)
  sidebar: {
    dashboard: "Dashboard",
    products: "Produsele mele",
    orders: "Comenzi primite",
    reviews: "Recenziile mele",
    stats: "Statistici",
    messages: "Mesaje",
    subscriptions: "Abonamente și planuri",
    settings: "Setări cont producător",
  },

  // footer texts
  footer: {
    columns: {
      categoriesTitle: "Categorii de produse",
      categories: ["Toate categoriile", "Lactate", "Carne", "Legume", "Fructe"],

      companyTitle: "DeLaSursă",
      company: ["Producătorii noștri", "Produsele noastre", "Abonamentele noastre", "Termeni și condiții", "Politica de confidențialitate"],

      supportTitle: "Suport",
      support: ["Suport clienți", "Recenzii", "Devino producător!"],

      followTitle: "Urmărește-ne!",
      followShort: "Susținem producătorii locali din 2025."
    },

    copyright: "© 2025 DeLaSursă. Toate drepturile rezervate.",

  },
}as const;
