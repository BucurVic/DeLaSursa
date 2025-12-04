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
    deleteModal: {
        title: "Confirmare ștergere",
        message: "Ești sigur că vrei să ștergi produsul {productName}? Această acțiune nu poate fi anulată.",
    },

    editModal: {
        title: "Editează produs",
        subtitle: "Modifică informațiile produsului. Unele câmpuri nu pot fi editate.",
        fields: {
            price: "Preț",
            stockNote: "*Stocul se gestionează în secțiunea Inventar",
        },
        buttons: {
            save: "Salvează modificările",
        },
    },

    productCard: {
        inactiveLabel: "Dezactivat",
        priceSuffix: "lei",
        status: {
            active: "Activ",
        },
        buttons: {
            deactivate: "Dezactivează",
            activate: "Activează",
        },
        columns: {
            product: "Produs",
            price: "Preț",
            status: "Status",
            actions: "Acțiuni",
        }
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
      cart: "Coș de cumpărături",
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

  hero: {
    title: "Produse organice proaspete, direct de la sursă",
    subtitle: "Descoperă cele mai bune produse locale de la producători verificați. Sustennabilitate, calitate și prospețime în fiecare comandă.",
    ctaPrimary: "Descoperă produse",
    ctaSecondary: "Devino producător",
    searchPlaceholder: "Caută produse, categorii sau producători...",
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

  products:{
      addText:{
          localProducts:"Produse locale",
          discoverProducts:"Descoperă produse autentice de la producători verificați",
      },
      filters:{
          category:"Categorie",
          region:"Regiune",
          minimumPrice:"Preț minim",
          maximumPrice:"Preț maxim",
          rating:"Rating minim",
          sort:"Sortare",
      },
      checks:{
          available:"Doar disponibile",
          bio:"Bio/Organic",
          new:"Produse noi",
          sale:"Produse la reducere",
      },
      noResults :"Nu s-au găsit produse care să corespundă cu filtrul",
      currency:"RON",
      rating:"Rating",
      activeFiltersLabel:"Filtre active:",
      clearAll:"Resetează filtrele"
  },
    producerPage: {
        title: "Produsele mele",
        subtitle: "Gestionează produsele tale, stocul și promoțiile",

        tabs: {
            list: "Listă produse",
            add: "Adaugă produs",
            inventory: "Stoc / Inventar",
            promotions: "Promoții & Campanii",
        },
    },

    cartPage: {
        title: "Coșul meu de cumpărături",
        emptyCart: "Coșul tău este gol.",
        totalProducts: "Total produse:",
        deliveryFee: "Taxă de livrare:",
        freeDelivery: "Gratuit",
        totalPrice: "Total de plată:",
        proceedToCheckout: "Finalizează comanda",

    },

    productDetailsPage : {
        reviewsTile: " Recenziile clienților",
        addToCartButton: "Adaugă în coș",
        loadingText: "Se încarcă detaliile produsului...",
    },
    
    adminUsers: {
        title: "Gestiune Utilizatori",
        addButton: "Adaugă Utilizator",
        columns: {
            avatar: "Avatar",
            user: "Utilizator",
            role: "Rol",
            joinDate: "Data Înreg.",
        },
        status: {
            suspended: "Suspendat",
        },
        tooltips: {
            suspend: "Suspendă Contul",
            reactivate: "Reactivează Contul",
        },
        messages: {
            deleteConfirmDynamic: "Ești sigur că vrei să ștergi contul utilizatorului {name}? Această acțiune este ireversibilă.",
            deleted: "Utilizatorul cu ID {id} a fost șters."
        },
        editModal: {
            title: "Editează Utilizator",
            addTitle: "Adaugă Utilizator Nou",
            subtitle: "Gestionează datele de acces și permisiunile.",
            fields: {
                username: "Nume utilizator",
                role: "Rol / Permisiuni",
                password: "Schimbă Parola",
                passwordPlaceholderEdit: "Lasă gol pentru a păstra parola actuală",
                passwordPlaceholderAdd: "Setează o parolă",
            }
        },
    },

    checkout: {
        title: "Finalizare Comandă",
        sections: {
            delivery: "Adresă de Livrare",
            billing: "Adresă de Facturare",
            deliveryMethod: "Metoda de Livrare",
            orderSummary: "Sumar Comandă",
            payment: "Metoda de Plată",
            cardDetails: "Datele Cardului",
        },
        fields: {
            fullName: "Nume Complet",
            phone: "Număr de Telefon",
            street: "Stradă și număr",
            city: "Oraș / Localitate",
            county: "Județ",
            zip: "Cod Poștal",
            sameAsDelivery: "Facturarea la aceeași adresă de livrare",
            observations: "Observații comandă (opțional)",
        },
        paymentMethods: {
            card: "Card Online",
            cash: "Ramburs la livrare",
        },
        summary: {
            subtotal: "Subtotal",
            shipping: "Taxă livrare",
            total: "TOTAL DE PLATĂ",
        },
        deliveryMethods: {
            courier: "Curier Rapid (15 RON)",
            pickup: "Ridicare personală (Gratuit)",
        },
        card: {
            number: "Număr Card",
            name: "Nume Deținător",
            expiry: "Data Expirării (MM/YY)",
            cvv: "CVV",
        },
        paymentModal: {
            title: "Confirmare Plată",
            message: "Ești pe cale să plătești suma de {amount} RON. Confirmi tranzacția?",
            confirmButton: "Confirmă Plata",
        },
        button: "Plasează Comanda",
        successMessage: "Comanda a fost plasată cu succes! Vei primi un email de confirmare.",
    },

    becomeProducer: {
        title: "Devino Partener DeLaSursă",
        subtitle: "Completează formularul pentru a-ți activa contul de producător.",
        sections: {
            account: "Creează-ți Contul",
            details: "Detalii Producător",
        },
        fields: {
            lastName: "Nume",
            firstName: "Prenume",
            email: "Email",
            password: "Parolă",
            confirmPassword: "Confirmă Parola",
            farmName: "Nume Fermă / Brand",
            phone: "Telefon Contact",
            region: "Regiune / Județ",
            cui: "CUI (Opțional)",
            description: "Povestea Fermei",
        },
        placeholders: {
            lastName: "ex: Ion",
            firstName: "ex: Popescu",
            farmName: "ex: Ferma Bio Valea Verde",
            description: "Descrie produsele tale și modul de cultivare...",
        },
        button: "Trimite Solicitarea",
        successMessage: "Solicitarea a fost trimisă cu succes!",
        loginQuestion: "Ai deja cont?",
        loginAction: "Autentifică-te",
    },
}as const;
