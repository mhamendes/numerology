"use client"

import React, { createContext, useContext, useState } from "react";

type Language = "en" | "it" | "pt-br";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Header translations
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    qa: "Q&A",
    bookReading: "Book a Reading",

    // Hero section translations
    calculateLifePath: "Your Numerology Map Awaits",
    fullName: "Full Name",
    birthDate: "Birth Date",
    enterFullName: "Enter your full birth name",
    revealNumbers: "Reveal My Numbers",
    discoverDestiny:
      "Discover how your birth date and name influence your destiny",
    unlockDestiny: "Unlock Your Destiny Through",
    numerology: "Numerology",
    discoverHidden:
      "Discover the hidden meanings behind your numbers and how they influence every aspect of your life journey.",
    premiumAnalysis: "Premium Number Analysis",
    getBirthMap: "Learn More",
    discoverPath: "Discover Your Life Path",
    numerologyDesc:
      "Numerology is the mystical study of numbers and their influence on human life. Each number carries a unique vibration that can reveal insights about your personality, talents, obstacles, and opportunities.",

    // Services section translations
    ourNumerologyServices: "Our Numerology Services",
    servicesDescription:
      "Explore our range of personalized numerology services designed to provide clarity, guidance, and insight into your life's journey.",
    birthMap: "Birth Map",
    birthMapDescription:
      "Complete report with all your numbers based on the Seven Hermetic Principles, revealing energy patterns that influence your journey.",
    personalReading: "Personal Numerology Reading",
    personalReadingDescription:
      "A comprehensive analysis of your core numbers and how they influence your personality, strengths, challenges, and life path.",
    relationshipCompatibility: "Relationship Compatibility",
    relationshipCompatibilityDescription:
      "Discover how your numbers interact with your partner's and gain insights into the strengths and challenges of your relationship.",
    businessNumerology: "Business Numerology",
    businessNumerologyDescription:
      "Optimize your business decisions with numerological insights into timing, naming, and strategic planning.",
    calculateNow: "Calculate Now",
    bookNow: "Book Now",
    needCustom: "Need Something Custom?",
    customDescription:
      "We offer tailored numerology services to address your specific questions and needs.",
    contactCustom: "Contact Us for Custom Services",
    mostPopular: "Most Popular",
    session: "session",

    // Additional service features
    personalityNumber: "Personality Number Reading",
    currentYearForecast: "Current Year Forecast",
    sixtyMinuteConsultation: "60-minute consultation",
    individualNumberAnalysis: "Individual Number Analysis for Both Partners",
    compatibilityAssessment: "Compatibility Assessment",
    relationshipStrengths: "Relationship Strengths & Challenges",
    communicationStyle: "Communication Style Analysis",
    relationshipForecast: "Relationship Forecast",
    ninetyMinuteJointConsultation: "90-minute joint consultation",
    businessNameAnalysis: "Business Name Analysis",
    optimalLaunchDate: "Optimal Launch Date Selection",
    teamCompatibility: "Team Compatibility Assessment",
    strategicTiming: "Strategic Timing Recommendations",
    growthOpportunity: "Growth Opportunity Forecast",
    oneHundredTwentyMinuteConsultation:
      "120-minute consultation with follow-up",

    // Footer translations
    unlockingSecrets:
      "Unlocking the secrets of numerology to guide you on your life's journey.",
    quickLinks: "Quick Links",
    resources: "Resources",
    numerologyBlog: "Numerology Blog",
    freeCalculator: "Free Number Calculator",
    numerologyGuide: "Numerology Guide",
    faqs: "FAQs",
    privacyPolicy: "Privacy Policy",
    stayUpdated: "Stay Updated",
    newsletterDesc:
      "Subscribe to our newsletter for numerology insights and special offers.",
    yourEmail: "Your email",
    subscribe: "Subscribe",
    allRightsReserved: "All rights reserved.",

    // Testimonials section
    whatClientsSay: "What Our Clients Say",
    testimonialsDescription:
      "Discover how numerology readings have transformed the lives of people just like you.",

    // QA page
    frequentlyAskedQuestions: "Frequently Asked Questions",
    qaDescription:
      "Find answers to common questions about our numerology services and the Birth Map.",
    searchQuestions: "Search questions...",
    noQuestionsFound: "No questions found matching your search.",
    clearSearch: "Clear Search",
    stillHaveQuestions: "Still Have Questions?",
    cantFindAnswer:
      "If you couldn't find the answer you were looking for, feel free to contact us directly.",
    contactUs: "Contact Us",

    // Home page
    lifePathNumber: "Life Path Number",
    lifePathDescription:
      "Discover your core purpose and the path you're meant to follow in this lifetime.",
    destinyNumber: "Destiny Number",
    destinyDescription:
      "Uncover the talents and abilities you possess to fulfill your life's mission.",
    soulUrgeNumber: "Soul Urge Number",
    soulUrgeDescription:
      "Reveal your inner desires, motivations, and what truly makes your heart sing.",
    calculateYourNumbers: "Calculate Your Numbers",
    beginJourney: "Begin Your Numerological Journey Today",
    unlockHiddenMeanings:
      "Unlock the hidden meanings behind your numbers and discover the path to your highest potential.",
    getPersonalReading: "Get Your Personal Reading",

    // Contact page
    contactUs: "Contact Us",
    contactDescription:
      "Have questions about our numerology services? We're here to help. Reach out to us using any of the methods below.",
    sendMessage: "Send Us a Message",
    yourName: "Your Name",
    enterYourName: "Enter your full name",
    emailAddress: "Email Address",
    enterYourEmail: "Enter your email address",
    subject: "Subject",
    whatIsYourMessageAbout: "What is your message about?",
    message: "Message",
    enterYourMessage: "Enter your message here",
    sendMessageBtn: "Send Message",
    contactInformation: "Contact Information",
    emailUs: "Email Us",
    emailResponse: "We respond to all messages within 24 hours.",
    callUs: "Call Us",
    callHours: "Available Monday-Friday, 9am-5pm EST",
    visitUs: "Visit Us",
    byAppointment: "By appointment only",

    // Birth Map page
    yourBirthMap: "Your Birth Map",
    birthMapPageDescription:
      "Discover the hidden patterns in your life with our comprehensive Birth Map analysis",
    getBirthMapTitle: "Get Your Birth Map",
    continueToPayment: "Continue to Payment",
    orderThankYou: "Thank You for Your Order!",
    orderReceived:
      "Your Birth Map order has been received and is being processed. We'll deliver your personalized Birth Map to",
    withinHours: "within a couple of hours.",
    expectedDelivery: "Expected Delivery",
    deliveryTime:
      "Usually within a couple of hours, but no later than 24 hours from now",
    orderAnother: "Order Another Birth Map",
    whatsIncluded: "What's Included in Your Birth Map",
    oneTimePayment: "one-time payment",
    deliveryNotice:
      "Your Birth Map will be delivered within a couple of hours after purchase",
    motivationNumber: "Motivation Number",
    motivationDesc:
      "Represents your deepest desires, what drives you and makes you feel fulfilled.",
    expressionNumber: "Expression & Impression Number",
    expressionDesc:
      "Shows how you present yourself to the world and how people perceive you.",
    birthDayNumber: "Birth Day Number",
    birthDayDesc:
      "The specific energy of your birth day, indicating natural talents and challenges.",
    hiddenTalent: "Hidden Talent Number",
    hiddenTalentDesc:
      "Latent characteristics and abilities that can be developed between the ages of 20 and 30.",
    conjugalVibration: "Conjugal Vibration Number",
    conjugalDesc:
      "The energy that governs your love relationships and how you deal with love.",
    hiddenTendency: "Hidden Tendency & Subconscious Response",
    hiddenTendencyDesc:
      "How you instinctively react to challenges and unforeseen events.",
    destinyNumberTitle: "Destiny Number (Life Path)",
    destinyNumberDesc:
      "Describes influences on personality, obstacles, and opportunities you will encounter throughout life.",
    missionNumber: "Mission Number",
    missionDesc:
      "The greater purpose of your existence and the tasks and learnings you came to experience.",
    karmicLessons: "Karmic Lessons & Debts",
    karmicDesc:
      "Skills and experiences that were neglected in past lives and that you need to develop in this incarnation.",
    lifeCycles: "Life Cycles & Challenges",
    lifeCyclesDesc:
      "The three major phases of your journey (Youth, Maturity, and Old Age), each with specific learnings and energies.",
    decisiveMoments: "Decisive Moments Analysis",
    decisiveMomentsDesc:
      "Remarkable periods in your trajectory that bring significant changes and transformations.",
    invertedTriangle: "Inverted Triangle of Life",
    invertedTriangleDesc:
      "Reveals challenging vibrational patterns, and how to deal with them to avoid energy blockages.",
    personalYears: "Personal Years (9-year forecast)",
    personalYearsDesc:
      "Annual energies that influence your life provided for the next 9 years.",
    monthlyGuidance: "Monthly & Daily Energy Guidance",
    monthlyGuidanceDesc:
      "Detailed energy direction for each month and day, with forecasts for 1 year.",

    // About page
    aboutCosmicNumbers: "About CosmicNumbers",
    aboutDescription:
      "Dedicated to revealing the hidden patterns in your life through the ancient wisdom of numerology.",
    ourMission: "Our Mission",
    missionText1:
      "At CosmicNumbers, we believe that understanding the numerical vibrations that influence your life can lead to greater self-awareness, better decision-making, and a more fulfilling existence.",
    missionText2:
      "Our mission is to make the ancient wisdom of numerology accessible to everyone, providing insights that can help you navigate life's challenges and embrace your unique path.",
    ourApproach: "Our Approach",
    approachText1:
      "We combine traditional numerological principles with modern interpretations to deliver readings that are both profound and practical. Our analyses are based on the Seven Hermetic Principles described in The Kybalion, offering a comprehensive view of your numerological blueprint.",
    approachText2:
      "Whether you're seeking clarity about your life purpose, relationship dynamics, or career path, our numerologists provide personalized insights to illuminate your journey.",
    ourExpertise: "Our Expertise",
    certifiedNumerologists: "Certified Numerologists",
    certifiedDesc:
      "Our team consists of experienced numerologists with years of practice and deep knowledge of numerological principles.",
    personalizedApproach: "Personalized Approach",
    personalizedDesc:
      "We believe in tailoring our readings to your unique situation, providing insights that are relevant to your specific life circumstances.",
    practicalGuidance: "Practical Guidance",
    practicalDesc:
      "Our readings go beyond theory to offer actionable insights that you can apply to enhance your life and overcome challenges.",
    beginYourJourney: "Begin Your Numerological Journey",
    journeyText:
      "Whether you're new to numerology or have been exploring its wisdom for years, we invite you to discover the profound insights that your numbers hold.",

    // Booking page
    bookYourReading: "Book Your Numerology Reading",
    bookingDescription:
      "Take the first step towards understanding your numerological blueprint and unlocking your potential.",
    selectService: "Select Service",
    yourDetails: "Your Details",
    confirmation: "Confirmation",
    yourInformation: "Your Information",
    phoneNumber: "Phone Number",
    enterPhoneNumber: "Enter your phone number",
    dateOfBirth: "Date of Birth",
    specificQuestions: "Specific Questions or Concerns (Optional)",
    questionsPlaceholder:
      "Is there anything specific you'd like us to address in your reading?",
    back: "Back",
    partnerInformation: "Partner Information",
    partnersFullName: "Partner's Full Name",
    enterPartnersName: "Enter your partner's full name",
    partnersDateOfBirth: "Partner's Date of Birth",
    businessInformation: "Business Information",
    businessName: "Business Name",
    enterBusinessName: "Enter your business name",
    businessType: "Business Type",
    selectBusinessType: "Select business type",
    startup: "Startup",
    smallBusiness: "Small Business",
    mediumEnterprise: "Medium Enterprise",
    largeCorporation: "Large Corporation",
    bookingConfirmed: "Booking Confirmed!",
    bookingThankYou:
      "Thank you for booking your numerology reading with us. We've sent a confirmation email with all the details to your inbox.",
    nextSteps: "Next Steps",
    birthMapDelivery:
      "Your Birth Map will be prepared and delivered to your email within 2 business days.",
    numerologistContact:
      "Our numerologist will contact you within 24 hours to schedule your session.",
    bookAnother: "Book Another Reading",
  },
  it: {
    // Header translations
    home: "Home",
    services: "Servizi",
    about: "Chi Siamo",
    contact: "Contatto",
    qa: "Domande",
    bookReading: "Prenota una Lettura",

    // Hero section translations
    calculateLifePath: "La Tua Mappa Numerologica Ti Attende",
    fullName: "Nome Completo",
    birthDate: "Data di Nascita",
    enterFullName: "Inserisci il tuo nome completo di nascita",
    revealNumbers: "Rivela i Miei Numeri",
    discoverDestiny:
      "Scopri come la tua data di nascita e il tuo nome influenzano il tuo destino",
    unlockDestiny: "Sblocca il Tuo Destino Attraverso la",
    numerology: "Numerologia",
    discoverHidden:
      "Scopri i significati nascosti dietro i tuoi numeri e come influenzano ogni aspetto del tuo percorso di vita.",
    premiumAnalysis: "Analisi Numerologica Premium",
    getBirthMap: "Scopri di Più",
    discoverPath: "Scopri il Tuo Percorso di Vita",
    numerologyDesc:
      "La numerologia è lo studio mistico dei numeri e della loro influenza sulla vita umana. Ogni numero porta una vibrazione unica che può rivelare intuizioni sulla tua personalità, talenti, ostacoli e opportunità.",

    // Services section translations
    ourNumerologyServices: "I Nostri Servizi di Numerologia",
    servicesDescription:
      "Esplora la nostra gamma di servizi numerologici personalizzati progettati per fornire chiarezza, guida e intuizione nel viaggio della tua vita.",
    birthMap: "Mappa di Nascita",
    birthMapDescription:
      "Rapporto completo con tutti i tuoi numeri basato sui Sette Principi Ermetici, rivelando modelli energetici che influenzano il tuo viaggio.",
    personalReading: "Lettura Numerologica Personale",
    personalReadingDescription:
      "Un'analisi completa dei tuoi numeri fondamentali e di come influenzano la tua personalità, i punti di forza, le sfide e il percorso di vita.",
    relationshipCompatibility: "Compatibilità di Relazione",
    relationshipCompatibilityDescription:
      "Scopri come i tuoi numeri interagiscono con quelli del tuo partner e ottieni informazioni sui punti di forza e le sfide della tua relazione.",
    businessNumerology: "Numerologia Aziendale",
    businessNumerologyDescription:
      "Ottimizza le tue decisioni aziendali con intuizioni numerologiche su tempistica, denominazione e pianificazione strategica.",
    calculateNow: "Calcola Ora",
    bookNow: "Prenota Ora",
    needCustom: "Hai Bisogno di Qualcosa di Personalizzato?",
    customDescription:
      "Offriamo servizi numerologici su misura per rispondere alle tue domande e necessità specifiche.",
    contactCustom: "Contattaci per Servizi Personalizzati",
    mostPopular: "Più Popolare",
    session: "sessione",

    // Additional service features
    personalityNumber: "Lettura del Numero di Personalità",
    currentYearForecast: "Previsione dell'Anno Corrente",
    sixtyMinuteConsultation: "Consulenza di 60 minuti",
    individualNumberAnalysis:
      "Analisi Numerica Individuale per Entrambi i Partner",
    compatibilityAssessment: "Valutazione della Compatibilità",
    relationshipStrengths: "Punti di Forza e Sfide della Relazione",
    communicationStyle: "Analisi dello Stile di Comunicazione",
    relationshipForecast: "Previsione della Relazione",
    ninetyMinuteJointConsultation: "Consulenza congiunta di 90 minuti",
    businessNameAnalysis: "Analisi del Nome Aziendale",
    optimalLaunchDate: "Selezione della Data di Lancio Ottimale",
    teamCompatibility: "Valutazione della Compatibilità del Team",
    strategicTiming: "Raccomandazioni di Tempistica Strategica",
    growthOpportunity: "Previsione delle Opportunità di Crescita",
    oneHundredTwentyMinuteConsultation:
      "Consulenza di 120 minuti con follow-up",

    // Footer translations
    unlockingSecrets:
      "Svelando i segreti della numerologia per guidarti nel viaggio della tua vita.",
    quickLinks: "Collegamenti Rapidi",
    resources: "Risorse",
    numerologyBlog: "Blog di Numerologia",
    freeCalculator: "Calcolatore Numerico Gratuito",
    numerologyGuide: "Guida alla Numerologia",
    faqs: "Domande Frequenti",
    privacyPolicy: "Politica sulla Privacy",
    stayUpdated: "Resta Aggiornato",
    newsletterDesc:
      "Iscriviti alla nostra newsletter per approfondimenti numerologici e offerte speciali.",
    yourEmail: "La tua email",
    subscribe: "Iscriviti",
    allRightsReserved: "Tutti i diritti riservati.",

    // Testimonials section
    whatClientsSay: "Cosa Dicono i Nostri Clienti",
    testimonialsDescription:
      "Scopri come le letture numerologiche hanno trasformato la vita di persone proprio come te.",

    // QA page
    frequentlyAskedQuestions: "Domande Frequenti",
    qaDescription:
      "Trova risposte alle domande comuni sui nostri servizi di numerologia e sulla Mappa di Nascita.",
    searchQuestions: "Cerca domande...",
    noQuestionsFound:
      "Nessuna domanda trovata corrispondente alla tua ricerca.",
    clearSearch: "Cancella Ricerca",
    stillHaveQuestions: "Hai Ancora Domande?",
    cantFindAnswer:
      "Se non hai trovato la risposta che stavi cercando, non esitare a contattarci direttamente.",
    contactUs: "Contattaci",

    // Home page
    lifePathNumber: "Numero del Percorso di Vita",
    lifePathDescription:
      "Scopri il tuo scopo principale e il percorso che sei destinato a seguire in questa vita.",
    destinyNumber: "Numero del Destino",
    destinyDescription:
      "Scopri i talenti e le abilità che possiedi per realizzare la missione della tua vita.",
    soulUrgeNumber: "Numero del Desiderio dell'Anima",
    soulUrgeDescription:
      "Rivela i tuoi desideri interiori, le motivazioni e ciò che fa veramente cantare il tuo cuore.",
    calculateYourNumbers: "Calcola i Tuoi Numeri",
    beginJourney: "Inizia Oggi il Tuo Viaggio Numerologico",
    unlockHiddenMeanings:
      "Sblocca i significati nascosti dietro i tuoi numeri e scopri il percorso verso il tuo massimo potenziale.",
    getPersonalReading: "Ottieni la Tua Lettura Personale",

    // Contact page
    contactUs: "Contattaci",
    contactDescription:
      "Hai domande sui nostri servizi di numerologia? Siamo qui per aiutarti. Contattaci utilizzando uno dei metodi seguenti.",
    sendMessage: "Inviaci un Messaggio",
    yourName: "Il Tuo Nome",
    enterYourName: "Inserisci il tuo nome completo",
    emailAddress: "Indirizzo Email",
    enterYourEmail: "Inserisci il tuo indirizzo email",
    subject: "Oggetto",
    whatIsYourMessageAbout: "Di cosa tratta il tuo messaggio?",
    message: "Messaggio",
    enterYourMessage: "Inserisci il tuo messaggio qui",
    sendMessageBtn: "Invia Messaggio",
    contactInformation: "Informazioni di Contatto",
    emailUs: "Scrivici",
    emailResponse: "Rispondiamo a tutti i messaggi entro 24 ore.",
    callUs: "Chiamaci",
    callHours: "Disponibile dal lunedì al venerdì, dalle 9 alle 17 EST",
    visitUs: "Visitaci",
    byAppointment: "Solo su appuntamento",

    // Birth Map page
    yourBirthMap: "La Tua Mappa di Nascita",
    birthMapPageDescription:
      "Scopri i modelli nascosti nella tua vita con la nostra analisi completa della Mappa di Nascita",
    getBirthMapTitle: "Ottieni la Tua Mappa di Nascita",
    continueToPayment: "Continua al Pagamento",
    orderThankYou: "Grazie per il Tuo Ordine!",
    orderReceived:
      "Il tuo ordine della Mappa di Nascita è stato ricevuto ed è in fase di elaborazione. Consegneremo la tua Mappa di Nascita personalizzata a",
    withinHours: "entro un paio d'ore.",
    expectedDelivery: "Consegna Prevista",
    deliveryTime: "Di solito entro un paio d'ore, ma non oltre 24 ore da ora",
    orderAnother: "Ordina un'Altra Mappa di Nascita",
    whatsIncluded: "Cosa è Incluso nella Tua Mappa di Nascita",
    oneTimePayment: "pagamento unico",
    deliveryNotice:
      "La tua Mappa di Nascita sarà consegnata entro un paio d'ore dopo l'acquisto",
    motivationNumber: "Numero di Motivazione",
    motivationDesc:
      "Rappresenta i tuoi desideri più profondi, ciò che ti spinge e ti fa sentire realizzato.",
    expressionNumber: "Numero di Espressione e Impressione",
    expressionDesc:
      "Mostra come ti presenti al mondo e come le persone ti percepiscono.",
    birthDayNumber: "Numero del Giorno di Nascita",
    birthDayDesc:
      "L'energia specifica del tuo giorno di nascita, che indica talenti naturali e sfide.",
    hiddenTalent: "Numero del Talento Nascosto",
    hiddenTalentDesc:
      "Caratteristiche e abilità latenti che possono essere sviluppate tra i 20 e i 30 anni.",
    conjugalVibration: "Numero di Vibrazione Coniugale",
    conjugalDesc:
      "L'energia che governa le tue relazioni amorose e come affronti l'amore.",
    hiddenTendency: "Tendenza Nascosta e Risposta Subconscia",
    hiddenTendencyDesc:
      "Come reagisci istintivamente alle sfide e agli eventi imprevisti.",
    destinyNumberTitle: "Numero del Destino (Percorso di Vita)",
    destinyNumberDesc:
      "Descrive le influenze sulla personalità, gli ostacoli e le opportunità che incontrerai durante la vita.",
    missionNumber: "Numero della Missione",
    missionDesc:
      "Lo scopo più grande della tua esistenza e i compiti e gli apprendimenti che sei venuto a sperimentare.",
    karmicLessons: "Lezioni e Debiti Karmici",
    karmicDesc:
      "Abilità ed esperienze che sono state trascurate nelle vite passate e che devi sviluppare in questa incarnazione.",
    lifeCycles: "Cicli di Vita e Sfide",
    lifeCyclesDesc:
      "Le tre fasi principali del tuo viaggio (Giovinezza, Maturità e Vecchiaia), ciascuna con apprendimenti ed energie specifiche.",
    decisiveMoments: "Analisi dei Momenti Decisivi",
    decisiveMomentsDesc:
      "Periodi notevoli nella tua traiettoria che portano cambiamenti e trasformazioni significative.",
    invertedTriangle: "Triangolo Invertito della Vita",
    invertedTriangleDesc:
      "Rivela modelli vibrazionali impegnativi e come affrontarli per evitare blocchi energetici.",
    personalYears: "Anni Personali (previsione di 9 anni)",
    personalYearsDesc:
      "Energie annuali che influenzano la tua vita fornite per i prossimi 9 anni.",
    monthlyGuidance: "Guida Energetica Mensile e Giornaliera",
    monthlyGuidanceDesc:
      "Direzione energetica dettagliata per ogni mese e giorno, con previsioni per 1 anno.",

    // About page
    aboutCosmicNumbers: "Chi è CosmicNumbers",
    aboutDescription:
      "Dedicati a rivelare i modelli nascosti nella tua vita attraverso l'antica saggezza della numerologia.",
    ourMission: "La Nostra Missione",
    missionText1:
      "A CosmicNumbers, crediamo che comprendere le vibrazioni numeriche che influenzano la tua vita possa portare a una maggiore consapevolezza di sé, a decisioni migliori e a un'esistenza più appagante.",
    missionText2:
      "La nostra missione è rendere l'antica saggezza della numerologia accessibile a tutti, fornendo intuizioni che possano aiutarti a navigare nelle sfide della vita e ad abbracciare il tuo percorso unico.",
    ourApproach: "Il Nostro Approccio",
    approachText1:
      "Combiniamo principi numerologici tradizionali con interpretazioni moderne per offrire letture che siano sia profonde che pratiche. Le nostre analisi si basano sui Sette Principi Ermetici descritti nel Kybalion, offrendo una visione completa del tuo schema numerologico.",
    approachText2:
      "Che tu stia cercando chiarezza sul tuo scopo di vita, sulle dinamiche relazionali o sul percorso professionale, i nostri numerologi forniscono intuizioni personalizzate per illuminare il tuo viaggio.",
    ourExpertise: "La Nostra Competenza",
    certifiedNumerologists: "Numerologi Certificati",
    certifiedDesc:
      "Il nostro team è composto da numerologi esperti con anni di pratica e profonda conoscenza dei principi numerologici.",
    personalizedApproach: "Approccio Personalizzato",
    personalizedDesc:
      "Crediamo nell'adattare le nostre letture alla tua situazione unica, fornendo intuizioni che siano rilevanti per le tue specifiche circostanze di vita.",
    practicalGuidance: "Guida Pratica",
    practicalDesc:
      "Le nostre letture vanno oltre la teoria per offrire intuizioni pratiche che puoi applicare per migliorare la tua vita e superare le sfide.",
    beginYourJourney: "Inizia il Tuo Viaggio Numerologico",
    journeyText:
      "Che tu sia nuovo alla numerologia o che tu abbia esplorato la sua saggezza per anni, ti invitiamo a scoprire le profonde intuizioni che i tuoi numeri contengono.",

    // Booking page
    bookYourReading: "Prenota la Tua Lettura Numerologica",
    bookingDescription:
      "Fai il primo passo verso la comprensione del tuo schema numerologico e lo sblocco del tuo potenziale.",
    selectService: "Seleziona Servizio",
    yourDetails: "I Tuoi Dettagli",
    confirmation: "Conferma",
    yourInformation: "Le Tue Informazioni",
    phoneNumber: "Numero di Telefono",
    enterPhoneNumber: "Inserisci il tuo numero di telefono",
    dateOfBirth: "Data di Nascita",
    specificQuestions: "Domande o Preoccupazioni Specifiche (Opzionale)",
    questionsPlaceholder:
      "C'è qualcosa di specifico che vorresti che affrontassimo nella tua lettura?",
    back: "Indietro",
    partnerInformation: "Informazioni sul Partner",
    partnersFullName: "Nome Completo del Partner",
    enterPartnersName: "Inserisci il nome completo del tuo partner",
    partnersDateOfBirth: "Data di Nascita del Partner",
    businessInformation: "Informazioni sull'Azienda",
    businessName: "Nome dell'Azienda",
    enterBusinessName: "Inserisci il nome della tua azienda",
    businessType: "Tipo di Azienda",
    selectBusinessType: "Seleziona il tipo di azienda",
    startup: "Startup",
    smallBusiness: "Piccola Impresa",
    mediumEnterprise: "Media Impresa",
    largeCorporation: "Grande Azienda",
    bookingConfirmed: "Prenotazione Confermata!",
    bookingThankYou:
      "Grazie per aver prenotato la tua lettura numerologica con noi. Abbiamo inviato un'email di conferma con tutti i dettagli alla tua casella di posta.",
    nextSteps: "Prossimi Passi",
    birthMapDelivery:
      "La tua Mappa di Nascita sarà preparata e consegnata alla tua email entro 2 giorni lavorativi.",
    numerologistContact:
      "Il nostro numerologo ti contatterà entro 24 ore per programmare la tua sessione.",
    bookAnother: "Prenota un'Altra Lettura",
  },
  "pt-br": {
    // Header translations
    home: "Início",
    services: "Serviços",
    about: "Sobre",
    contact: "Contato",
    qa: "Perguntas",
    bookReading: "Agendar Leitura",

    // Hero section translations
    calculateLifePath: "Seu Mapa Numerológico Aguarda",
    fullName: "Nome Completo",
    birthDate: "Data de Nascimento",
    enterFullName: "Digite seu nome completo de nascimento",
    revealNumbers: "Revelar Meus Números",
    discoverDestiny:
      "Descubra como sua data de nascimento e nome influenciam seu destino",
    unlockDestiny: "Desbloqueie Seu Destino Através da",
    numerology: "Numerologia",
    discoverHidden:
      "Descubra os significados ocultos por trás dos seus números e como eles influenciam todos os aspectos da sua jornada de vida.",
    premiumAnalysis: "Análise Numerológica Premium",
    getBirthMap: "Saiba Mais",
    discoverPath: "Descubra Seu Caminho de Vida",
    numerologyDesc:
      "A numerologia é o estudo místico dos números e sua influência na vida humana. Cada número carrega uma vibração única que pode revelar insights sobre sua personalidade, talentos, obstáculos e oportunidades.",

    // Services section translations
    ourNumerologyServices: "Nossos Serviços de Numerologia",
    servicesDescription:
      "Explore nossa gama de serviços numerológicos personalizados projetados para fornecer clareza, orientação e insights para a jornada da sua vida.",
    birthMap: "Mapa de Nascimento",
    birthMapDescription:
      "Relatório completo com todos os seus números baseado nos Sete Princípios Herméticos, revelando padrões energéticos que influenciam sua jornada.",
    personalReading: "Leitura Numerológica Pessoal",
    personalReadingDescription:
      "Uma análise abrangente dos seus números principais e como eles influenciam sua personalidade, pontos fortes, desafios e caminho de vida.",
    relationshipCompatibility: "Compatibilidade de Relacionamento",
    relationshipCompatibilityDescription:
      "Descubra como seus números interagem com os do seu parceiro e obtenha insights sobre os pontos fortes e desafios do seu relacionamento.",
    businessNumerology: "Numerologia Empresarial",
    businessNumerologyDescription:
      "Otimize suas decisões de negócios com insights numerológicos sobre timing, nomenclatura e planejamento estratégico.",
    calculateNow: "Calcular Agora",
    bookNow: "Agendar Agora",
    needCustom: "Precisa de Algo Personalizado?",
    customDescription:
      "Oferecemos serviços numerológicos sob medida para atender às suas perguntas e necessidades específicas.",
    contactCustom: "Contate-nos para Serviços Personalizados",
    mostPopular: "Mais Popular",
    session: "sessão",

    // Additional service features
    personalityNumber: "Leitura do Número de Personalidade",
    currentYearForecast: "Previsão do Ano Atual",
    sixtyMinuteConsultation: "Consulta de 60 minutos",
    individualNumberAnalysis:
      "Análise Numérica Individual para Ambos os Parceiros",
    compatibilityAssessment: "Avaliação de Compatibilidade",
    relationshipStrengths: "Pontos Fortes e Desafios do Relacionamento",
    communicationStyle: "Análise do Estilo de Comunicação",
    relationshipForecast: "Previsão do Relacionamento",
    ninetyMinuteJointConsultation: "Consulta conjunta de 90 minutos",
    businessNameAnalysis: "Análise do Nome Empresarial",
    optimalLaunchDate: "Seleção da Data Ideal de Lançamento",
    teamCompatibility: "Avaliação de Compatibilidade da Equipe",
    strategicTiming: "Recomendações de Timing Estratégico",
    growthOpportunity: "Previsão de Oportunidades de Crescimento",
    oneHundredTwentyMinuteConsultation:
      "Consulta de 120 minutos com acompanhamento",

    // Footer translations
    unlockingSecrets:
      "Desvendando os segredos da numerologia para guiá-lo na jornada da sua vida.",
    quickLinks: "Links Rápidos",
    resources: "Recursos",
    numerologyBlog: "Blog de Numerologia",
    freeCalculator: "Calculadora Numérica Gratuita",
    numerologyGuide: "Guia de Numerologia",
    faqs: "Perguntas Frequentes",
    privacyPolicy: "Política de Privacidade",
    stayUpdated: "Mantenha-se Atualizado",
    newsletterDesc:
      "Inscreva-se em nossa newsletter para insights numerológicos e ofertas especiais.",
    yourEmail: "Seu email",
    subscribe: "Inscrever-se",
    allRightsReserved: "Todos os direitos reservados.",

    // Testimonials section
    whatClientsSay: "O Que Nossos Clientes Dizem",
    testimonialsDescription:
      "Descubra como as leituras numerológicas transformaram a vida de pessoas como você.",

    // QA page
    frequentlyAskedQuestions: "Perguntas Frequentes",
    qaDescription:
      "Encontre respostas para perguntas comuns sobre nossos serviços de numerologia e o Mapa de Nascimento.",
    searchQuestions: "Pesquisar perguntas...",
    noQuestionsFound:
      "Nenhuma pergunta encontrada correspondente à sua pesquisa.",
    clearSearch: "Limpar Pesquisa",
    stillHaveQuestions: "Ainda Tem Perguntas?",
    cantFindAnswer:
      "Se você não encontrou a resposta que estava procurando, sinta-se à vontade para nos contatar diretamente.",
    contactUs: "Contate-nos",

    // Home page
    lifePathNumber: "Número do Caminho de Vida",
    lifePathDescription:
      "Descubra seu propósito central e o caminho que você está destinado a seguir nesta vida.",
    destinyNumber: "Número do Destino",
    destinyDescription:
      "Descubra os talentos e habilidades que você possui para cumprir a missão da sua vida.",
    soulUrgeNumber: "Número do Desejo da Alma",
    soulUrgeDescription:
      "Revele seus desejos internos, motivações e o que realmente faz seu coração cantar.",
    calculateYourNumbers: "Calcule Seus Números",
    beginJourney: "Comece Sua Jornada Numerológica Hoje",
    unlockHiddenMeanings:
      "Desbloqueie os significados ocultos por trás dos seus números e descubra o caminho para seu maior potencial.",
    getPersonalReading: "Obtenha Sua Leitura Pessoal",

    // Contact page
    contactUs: "Contate-nos",
    contactDescription:
      "Tem perguntas sobre nossos serviços de numerologia? Estamos aqui para ajudar. Entre em contato conosco usando qualquer um dos métodos abaixo.",
    sendMessage: "Envie-nos uma Mensagem",
    yourName: "Seu Nome",
    enterYourName: "Digite seu nome completo",
    emailAddress: "Endereço de Email",
    enterYourEmail: "Digite seu endereço de email",
    subject: "Assunto",
    whatIsYourMessageAbout: "Sobre o que é sua mensagem?",
    message: "Mensagem",
    enterYourMessage: "Digite sua mensagem aqui",
    sendMessageBtn: "Enviar Mensagem",
    contactInformation: "Informações de Contato",
    emailUs: "Envie-nos um Email",
    emailResponse: "Respondemos a todas as mensagens em 24 horas.",
    callUs: "Ligue para Nós",
    callHours: "Disponível de segunda a sexta, das 9h às 17h EST",
    visitUs: "Visite-nos",
    byAppointment: "Apenas com agendamento",

    // Birth Map page
    yourBirthMap: "Seu Mapa de Nascimento",
    birthMapPageDescription:
      "Descubra os padrões ocultos em sua vida com nossa análise abrangente do Mapa de Nascimento",
    getBirthMapTitle: "Obtenha Seu Mapa de Nascimento",
    continueToPayment: "Continuar para Pagamento",
    orderThankYou: "Obrigado pelo Seu Pedido!",
    orderReceived:
      "Seu pedido de Mapa de Nascimento foi recebido e está sendo processado. Entregaremos seu Mapa de Nascimento personalizado para",
    withinHours: "dentro de algumas horas.",
    expectedDelivery: "Entrega Prevista",
    deliveryTime:
      "Geralmente dentro de algumas horas, mas não mais que 24 horas a partir de agora",
    orderAnother: "Solicitar Outro Mapa de Nascimento",
    whatsIncluded: "O Que Está Incluído no Seu Mapa de Nascimento",
    oneTimePayment: "pagamento único",
    deliveryNotice:
      "Seu Mapa de Nascimento será entregue dentro de algumas horas após a compra",
    motivationNumber: "Número de Motivação",
    motivationDesc:
      "Representa seus desejos mais profundos, o que o impulsiona e o faz se sentir realizado.",
    expressionNumber: "Número de Expressão e Impressão",
    expressionDesc:
      "Mostra como você se apresenta ao mundo e como as pessoas o percebem.",
    birthDayNumber: "Número do Dia de Nascimento",
    birthDayDesc:
      "A energia específica do seu dia de nascimento, indicando talentos naturais e desafios.",
    hiddenTalent: "Número do Talento Oculto",
    hiddenTalentDesc:
      "Características e habilidades latentes que podem ser desenvolvidas entre os 20 e 30 anos.",
    conjugalVibration: "Número de Vibração Conjugal",
    conjugalDesc:
      "A energia que governa seus relacionamentos amorosos e como você lida com o amor.",
    hiddenTendency: "Tendência Oculta e Resposta Subconsciente",
    hiddenTendencyDesc:
      "Como você reage instintivamente a desafios e eventos imprevistos.",
    destinyNumberTitle: "Número do Destino (Caminho de Vida)",
    destinyNumberDesc:
      "Descreve influências na personalidade, obstáculos e oportunidades que você encontrará ao longo da vida.",
    missionNumber: "Número da Missão",
    missionDesc:
      "O propósito maior da sua existência e as tarefas e aprendizados que você veio experimentar.",
    karmicLessons: "Lições e Dívidas Kármicas",
    karmicDesc:
      "Habilidades e experiências que foram negligenciadas em vidas passadas e que você precisa desenvolver nesta encarnação.",
    lifeCycles: "Ciclos de Vida e Desafios",
    lifeCyclesDesc:
      "As três fases principais da sua jornada (Juventude, Maturidade e Velhice), cada uma com aprendizados e energias específicas.",
    decisiveMoments: "Análise de Momentos Decisivos",
    decisiveMomentsDesc:
      "Períodos notáveis em sua trajetória que trazem mudanças e transformações significativas.",
    invertedTriangle: "Triângulo Invertido da Vida",
    invertedTriangleDesc:
      "Revela padrões vibracionais desafiadores e como lidar com eles para evitar bloqueios energéticos.",
    personalYears: "Anos Pessoais (previsão de 9 anos)",
    personalYearsDesc:
      "Energias anuais que influenciam sua vida fornecidas para os próximos 9 anos.",
    monthlyGuidance: "Orientação Energética Mensal e Diária",
    monthlyGuidanceDesc:
      "Direção energética detalhada para cada mês e dia, com previsões para 1 ano.",

    // About page
    aboutCosmicNumbers: "Sobre a CosmicNumbers",
    aboutDescription:
      "Dedicados a revelar os padrões ocultos em sua vida através da antiga sabedoria da numerologia.",
    ourMission: "Nossa Missão",
    missionText1:
      "Na CosmicNumbers, acreditamos que entender as vibrações numéricas que influenciam sua vida pode levar a uma maior autoconsciência, melhores tomadas de decisão e uma existência mais gratificante.",
    missionText2:
      "Nossa missão é tornar a antiga sabedoria da numerologia acessível a todos, fornecendo insights que podem ajudá-lo a navegar pelos desafios da vida e abraçar seu caminho único.",
    ourApproach: "Nossa Abordagem",
    approachText1:
      "Combinamos princípios numerológicos tradicionais com interpretações modernas para oferecer leituras que são profundas e práticas. Nossas análises são baseadas nos Sete Princípios Herméticos descritos no Kybalion, oferecendo uma visão abrangente do seu esquema numerológico.",
    approachText2:
      "Seja você esteja buscando clareza sobre seu propósito de vida, dinâmicas de relacionamento ou caminho profissional, nossos numerólogos fornecem insights personalizados para iluminar sua jornada.",
    ourExpertise: "Nossa Expertise",
    certifiedNumerologists: "Numerólogos Certificados",
    certifiedDesc:
      "Nossa equipe é composta por numerólogos experientes com anos de prática e profundo conhecimento dos princípios numerológicos.",
    personalizedApproach: "Abordagem Personalizada",
    personalizedDesc:
      "Acreditamos em adaptar nossas leituras à sua situação única, fornecendo insights que são relevantes para suas circunstâncias específicas de vida.",
    practicalGuidance: "Orientação Prática",
    practicalDesc:
      "Nossas leituras vão além da teoria para oferecer insights acionáveis que você pode aplicar para melhorar sua vida e superar desafios.",
    beginYourJourney: "Comece Sua Jornada Numerológica",
    journeyText:
      "Seja você novo na numerologia ou tenha explorado sua sabedoria por anos, convidamos você a descobrir os profundos insights que seus números contêm.",

    // Booking page
    bookYourReading: "Agende Sua Leitura Numerológica",
    bookingDescription:
      "Dê o primeiro passo para entender seu esquema numerológico e desbloquear seu potencial.",
    selectService: "Selecione o Serviço",
    yourDetails: "Seus Detalhes",
    confirmation: "Confirmação",
    yourInformation: "Suas Informações",
    phoneNumber: "Número de Telefone",
    enterPhoneNumber: "Digite seu número de telefone",
    dateOfBirth: "Data de Nascimento",
    specificQuestions: "Perguntas ou Preocupações Específicas (Opcional)",
    questionsPlaceholder:
      "Há algo específico que você gostaria que abordássemos em sua leitura?",
    back: "Voltar",
    partnerInformation: "Informações do Parceiro",
    partnersFullName: "Nome Completo do Parceiro",
    enterPartnersName: "Digite o nome completo do seu parceiro",
    partnersDateOfBirth: "Data de Nascimento do Parceiro",
    businessInformation: "Informações da Empresa",
    businessName: "Nome da Empresa",
    enterBusinessName: "Digite o nome da sua empresa",
    businessType: "Tipo de Empresa",
    selectBusinessType: "Selecione o tipo de empresa",
    startup: "Startup",
    smallBusiness: "Pequena Empresa",
    mediumEnterprise: "Média Empresa",
    largeCorporation: "Grande Corporação",
    bookingConfirmed: "Agendamento Confirmado!",
    bookingThankYou:
      "Obrigado por agendar sua leitura numerológica conosco. Enviamos um email de confirmação com todos os detalhes para sua caixa de entrada.",
    nextSteps: "Próximos Passos",
    birthMapDelivery:
      "Seu Mapa de Nascimento será preparado e entregue em seu email dentro de 2 dias úteis.",
    numerologistContact:
      "Nosso numerólogo entrará em contato com você dentro de 24 horas para agendar sua sessão.",
    bookAnother: "Agendar Outra Leitura",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
