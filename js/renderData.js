// =============== Mock Database (Multi-language Support) ===================
const mockDB = {
  currentUser: {
    id: 1,
    username: "GuestReader",
    email: "reader@nextpage.com",
    savedLibraryIds: [101, 103, 107, 114, 118],
    preferences: {
      moreRomance: false,
      moreFantasy: true,
      language: "en"
    }
  },

  categories: [
    { id: "cat1", en: "Fantasy", ar: "خيال", es: "Fantasía", image: "imgs/novel1.webp" },
    { id: "cat2", en: "Sci-Fi", ar: "خيال علمي", es: "Ciencia Ficción", image: "imgs/novel2.webp" },
    { id: "cat3", en: "Romance", ar: "رومانسي", es: "Romance", image: "imgs/novel3.webp" },
    { id: "cat4", en: "Mystery", ar: "غموض", es: "Misterio", image: "imgs/novel4.jpg" },
    { id: "cat5", en: "Dark Fantasy", ar: "فانتازيا مظلمة", es: "Fantasía Oscura", image: "imgs/novel5.jpg" },
    { id: "cat6", en: "Medieval", ar: "عصور وسطى", es: "Medieval", image: "imgs/novel6.jpg" },
  ],

  authors: [
    {
      id: 201,
      en: { name: "Arthur Penhaligon", bio: "Master of medieval settings and complex character webs." },
      ar: { name: "آرثر بنهاليغون", bio: "سيد العصور الوسطى وشبكات الشخصيات المعقدة." },
      es: { name: "Arthur Penhaligon", bio: "Maestro de los escenarios medievales y de las complejas redes de personajes." },
      image: "imgs/author1.jpg",
    },
    {
      id: 202,
      en: { name: "Peter Brown", bio: "Award-winning creator of sci-fi adventures." },
      ar: { name: "بيتر براون", bio: "مبدع مغامرات الخيال العلمي الحائز على جوائز." },
      es: { name: "Peter Brown", bio: "Premiado creador de aventuras de ciencia ficción." },
      image: "imgs/author2.jpg",
    },
    {
      id: 203,
      en: { name: "Carlo Collodi", bio: "Specializes in dark, atmospheric world-building." },
      ar: { name: "كارلو كولودي", bio: "متخصص في بناء العوالم المظلمة والجوية." },
      es: { name: "Carlo Collodi", bio: "Especialista en la construcción de mundos oscuros y atmosféricos." },
      image: "imgs/author3.jpg",
    },
    {
      id: 204,
      en: { name: "Elena Vance", bio: "Weaves intricate romances and mysteries." },
      ar: { name: "إيلينا فانس", bio: "تنسج قصص الرومانسية والغموض المعقدة." },
      es: { name: "Elena Vance", bio: "Teje intrincados romances y misterios." },
      image: "imgs/author4.jpg",
    },
    {
      id: 205,
      en: { name: "Marcus Thorne", bio: "Explores the bleak, cyberpunk future." },
      ar: { name: "ماركوس ثورن", bio: "يستكشف مستقبل السايبربانك الكئيب." },
      es: { name: "Marcus Thorne", bio: "Explora el sombrío futuro ciberpunk." },
      image: "imgs/author5.jpg",
    },
  ],

  novels: [
    {
      id: 101,
      en: { title: "The Wild Robot", description: "A robot finds herself stranded on a remote, wild island, forced to adapt." },
      ar: { title: "الروبوت البري", description: "روبوت تجد نفسها عالقة في جزيرة برية نائية، وتضطر للتكيف مع محيطها." },
      es: { title: "El Robot Salvaje", description: "Un robot se encuentra varado en una remota isla salvaje y se ve obligado a adaptarse." },
      authorId: 202,
      price: 14.99,
      categories: ["cat2"],
      imgSrc: "imgs/novel1.webp",
      rating: 4.8,
      views: 18900,
      dateAdded: "2024-03-01",
      chapters: [
        { id: 1, en: "The Awakening", ar: "الصحوة", es: "El despertar" },
        { id: 2, en: "Wild Waters", ar: "المياه البرية", es: "Aguas salvajes" }
      ],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 102,
      en: { title: "Echoes of the Void", description: "A lone astronaut drifts through the darkness between galaxies, hearing transmissions." },
      ar: { title: "أصداء الفراغ", description: "رائد فضاء وحيد ينجرف عبر الظلام بين المجرات، ويسمع إرسالات مستحيلة." },
      es: { title: "Ecos del Vacío", description: "Un astronauta solitario vaga por la oscuridad entre galaxias, escuchando transmisiones." },
      authorId: 202,
      price: 9.99,
      categories: ["cat2"],
      imgSrc: "imgs/novel2.webp",
      rating: 4.8,
      views: 18900,
      dateAdded: "2024-03-05",
      chapters: [
        { id: 1, en: "Stardust", ar: "غبار النجوم", es: "Polvo de estrellas" },
        { id: 2, en: "The Silent Signal", ar: "الإشارة الصامتة", es: "La señal silenciosa" }
      ],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 103,
      en: { title: "The Quartz Heart", description: "In a city of deceit, a puppet must collect enough quartz to uncover the truth." },
      ar: { title: "قلب الكوارتز", description: "في مدينة الخداع، يجب على دمية جمع ما يكفي من الكوارتز للكشف عن الحقيقة." },
      es: { title: "El Corazón de Cuarzo", description: "En una ciudad de engaños, una marioneta debe reunir suficiente cuarzo para descubrir la verdad." },
      authorId: 203,
      price: 19.99,
      categories: ["cat4", "cat5"],
      imgSrc: "imgs/novel3.webp",
      rating: 4.7,
      views: 15050,
      dateAdded: "2024-02-10",
      chapters: [
        { id: 1, en: "Gears and Glass", ar: "التروس والزجاج", es: "Engranajes y vidrio" },
        { id: 2, en: "The Merchant's Lie", ar: "كذبة التاجر", es: "La mentira del mercader" }
      ],
      isFeatured: true,
      isBestSeller: false,
    },
    {
      id: 104,
      en: { title: "Echoes of Mia", description: "A gripping story of lost memories, hidden identities, and a love that spans worlds." },
      ar: { title: "أصداء ميا", description: "قصة مثيرة عن ذكريات مفقودة، وهويات خفية، وحب يمتد عبر عوالم متوازية." },
      es: { title: "Ecos de Mia", description: "Una historia apasionante de recuerdos perdidos, identidades ocultas y un amor que abarca mundos." },
      authorId: 204,
      price: 4.99,
      categories: ["cat3", "cat4"],
      imgSrc: "imgs/novel4.jpg",
      rating: 4.2,
      views: 8400,
      dateAdded: "2024-03-10",
      chapters: [
        { id: 1, en: "Fragmented Memory", ar: "ذكرى مجزأة", es: "Memoria fragmentada" },
        { id: 2, en: "Across the Veil", ar: "عبر الحجاب", es: "A través del velo" }
      ],
      isFeatured: true,
      isBestSeller: false,
    },
    {
      id: 105,
      en: { title: "Neon Skies", description: "A rogue hacker discovers a conspiracy that reaches the highest levels." },
      ar: { title: "سماء النيون", description: " هاكر متمرد يكتشف مؤامرة تصل إلى أعلى مستويات النخبة المدارية." },
      es: { title: "Cielos de Neón", description: "Un hacker rebelde descubre una conspiración que alcanza los niveles más altos." },
      authorId: 205,
      price: 29.99,
      categories: ["cat2"],
      imgSrc: "imgs/novel5.jpg",
      rating: 4.5,
      views: 12200,
      dateAdded: "2024-01-20",
      chapters: [
        { id: 1, en: "Grid Access", ar: "الوصول إلى الشبكة", es: "Acceso a la red" },
        { id: 2, en: "Zero Day", ar: "اليوم صفر", es: "Día cero" }
      ],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 106,
      en: { title: "Whispers in the Keep", description: "An aging king must solve a string of murders inside his own fortress." },
      ar: { title: "همسات في القلعة", description: "يجب على ملك مسن حل سلسلة من جرائم القتل داخل حصنه المنيع." },
      es: { title: "Susurros en la Fortaleza", description: "Un rey anciano debe resolver una serie de asesinatos dentro de su propia fortaleza." },
      authorId: 201,
      price: 9.99,
      categories: ["cat6", "cat4"],
      imgSrc: "imgs/novel6.jpg",
      rating: 4.1,
      views: 5600,
      dateAdded: "2024-03-20",
      chapters: [
        { id: 1, en: "The Cold Throne", ar: "العرش البارد", es: "El trono frío" },
        { id: 2, en: "Blood in the Halls", ar: "دماء في القاعات", es: "Sangre en los pasillos" }
      ],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 107,
      en: { title: "Crimson Veil", description: "Two rival mages are forced into an arranged marriage to stop a war." },
      ar: { title: "الحجاب القرمزي", description: "يُجبر ساحران متنافسان على زواج مدبر لوقف حرب مدمرة." },
      es: { title: "Velo Carmesí", description: "Dos magos rivales se ven obligados a un matrimonio concertado para detener una guerra." },
      authorId: 204,
      price: 9.99,
      categories: ["cat3", "cat1"],
      imgSrc: "imgs/novel7.jpg",
      rating: 4.6,
      views: 21000,
      dateAdded: "2024-02-28",
      chapters: [
        { id: 1, en: "The Eternal Pact", ar: "الميثاق الأبدي", es: "El pacto eterno" },
        { id: 2, en: "Forbidden Sparks", ar: "شرارات محرمة", es: "Chispas prohibidas" }
      ],
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 108,
      en: { title: "Gears of Destiny", description: "A mechanic discovers that the city's infrastructure is fueled by souls." },
      ar: { title: "تروس القدر", description: "ميكانيكي يكتشف أن البنية التحتية للمدينة تعمل بأرواح البشر." },
      es: { title: "Engranajes del Destino", description: "Un mecánico descubre que la infraestructura de la ciudad se alimenta de almas humanas." },
      authorId: 203,
      price: 19.99,
      categories: ["cat2", "cat5"],
      imgSrc: "imgs/novel8.jpg",
      rating: 4.3,
      views: 9100,
      dateAdded: "2024-03-22",
      chapters: [
        { id: 1, en: "Fuel of Souls", ar: "وقود الأرواح", es: "Combustible de almas" }
      ],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 109,
      en: { title: "Blade of the Fallen", description: "A disgraced knight seeks redemption by hunting down a mythical beast." },
      ar: { title: "نصل الساقطين", description: "فارس مهان يسعى للخلاص من خلال مطاردة وحش أسطوري دمر نظامه." },
      es: { title: "Espada de los Caídos", description: "Un caballero caído en desgracia busca la redención cazando a la bestia mítica." },
      authorId: 201,
      price: 29.99,
      categories: ["cat6", "cat1"],
      imgSrc: "imgs/novel9.jpg",
      rating: 4.8,
      views: 28000,
      dateAdded: "2024-01-15",
      chapters: [
        { id: 1, en: "The Broken Vow", ar: "العهد المكسور", es: "El voto roto" }
      ],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 119,
      en: { title: "The Last Automaton", description: "The last machine in a dead world plants a single tree." },
      ar: { title: "الآلي الأخير", description: "آخر آلة في عالم ميت تحاول زراعة شجرة واحدة." },
      es: { title: "El Último Autómata", description: "La última máquina en un mundo muerto intenta plantar un solo árbol." },
      authorId: 203,
      price: 59.99,
      categories: ["cat2", "cat5"],
      imgSrc: "imgs/novel19.jpg",
      rating: 4.9,
      views: 31000,
      dateAdded: "2024-04-01",
      chapters: [
        { id: 1, en: "A Singularity", ar: "طفرة", es: "Una singularidad" }
      ],
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 110,
      en: { title: "Sands of Time", description: "An archaeologist uncovers a portal to an ancient civilization." },
      ar: { title: "رمال الزمن", description: "عالم آثار يكتشف بوابة لحضارة قديمة مفقودة تحت الصحراء." },
      es: { title: "Arenas del Tiempo", description: "Un arqueólogo descubre un portal a una civilización antigua." },
      authorId: 201,
      price: 12.50,
      categories: ["cat6", "cat4"],
      imgSrc: "imgs/novel10.jpg",
      rating: 4.4,
      views: 7200,
      dateAdded: "2024-03-25",
      chapters: [{ id: 1, en: "The First Dig", ar: "الحفر الأول", es: "La primera excavación" }],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 111,
      en: { title: "Shadow Waltz", description: "A spy must dance through a ball of enemies to retrieve a secret." },
      ar: { title: "فالس الظل", description: "يجب على جاسوس الرقص عبر حفلة من الأعداء لاستعادة سر خطير." },
      es: { title: "Vals de las Sombras", description: "Un espía debe bailar a través de un baile de enemigos." },
      authorId: 204,
      price: 15.00,
      categories: ["cat3", "cat4"],
      imgSrc: "imgs/novel11.jpg",
      rating: 4.6,
      views: 11500,
      dateAdded: "2024-03-28",
      chapters: [{ id: 1, en: "Masquerade", ar: "تنكر", es: "Mascarada" }],
      isFeatured: true,
      isBestSeller: false,
    },
    {
      id: 112,
      en: { title: "Orbital Drift", description: "Space station survivors deal with a strange entity." },
      ar: { title: "الانجراف المداري", description: "ناجون في محطة فضائية يتعاملون مع كيان غريب غامض." },
      es: { title: "Deriva Orbital", description: "Sobrevivientes de una estación espacial lidian con una entidad extraña." },
      authorId: 202,
      price: 19.99,
      categories: ["cat2"],
      imgSrc: "imgs/novel12.jpg",
      rating: 4.3,
      views: 9800,
      dateAdded: "2024-02-15",
      chapters: [{ id: 1, en: "Oxygen Low", ar: "الأكسجين منخفض", es: "Oxígeno bajo" }],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 113,
      en: { title: "The Alchemist's Debt", description: "A young alchemist must pay off a debt to a literal demon." },
      ar: { title: "دين الخيميائي", description: "يجب على خيميائي شاب سداد دين لشيطان حقيقي." },
      es: { title: "La Deuda del Alquimista", description: "Un joven alquimista debe pagar una deuda a un demonio literal." },
      authorId: 203,
      price: 24.99,
      categories: ["cat1", "cat5"],
      imgSrc: "imgs/novel13.jpg",
      rating: 4.7,
      views: 14200,
      dateAdded: "2024-01-10",
      chapters: [{ id: 1, en: "Transmutation", ar: "التحويل", es: "Transmutación" }],
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 114,
      en: { title: "Midnight Protocol", description: "Digital ghosts haunt the city's megastructures." },
      ar: { title: "بروتوكول منتصف الليل", description: "أشباح رقمية تطارد الهياكل العملاقة في المدينة." },
      es: { title: "Protocolo de Medianoche", description: "Fantasmas digitales acechan las megaestructuras de la ciudad." },
      authorId: 205,
      price: 0.00,
      categories: ["cat2", "cat4"],
      imgSrc: "imgs/novel14.jpg",
      rating: 4.5,
      views: 22000,
      dateAdded: "2024-03-30",
      chapters: [{ id: 1, en: "Login Error", ar: "خطأ في تسجيل الدخول", es: "Error de inicio de sesión" }],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 115,
      en: { title: "The Iron King", description: "A story of a kingdom ruled by a monarch who is literally made of iron." },
      ar: { title: "الملك الحديدي", description: "قصة مملكة يحكمها ملك مصنوع حرفياً من الحديد." },
      es: { title: "El Rey de Hierro", description: "La historia de un reino gobernado por un monarca hecho de hierro." },
      authorId: 201,
      price: 34.99,
      categories: ["cat6", "cat1"],
      imgSrc: "imgs/novel15.jpg",
      rating: 4.8,
      views: 17500,
      dateAdded: "2024-02-20",
      chapters: [{ id: 1, en: "Forged in Fire", ar: "صُنع في النار", es: "Forjado en fuego" }],
      isFeatured: false,
      isBestSeller: true,
    },
    {
      id: 116,
      en: { title: "Starlit Promises", description: "A romance set on a colony planet under three suns." },
      ar: { title: "وعود تحت ضوء النجوم", description: "قصة حب تدور أحداثها في كوكب مستعمرة تحت ثلاث شموس." },
      es: { title: "Promesas Estelares", description: "Un romance ambientado en un planeta colonia bajo tres soles." },
      authorId: 204,
      price: 11.99,
      categories: ["cat3", "cat2"],
      imgSrc: "imgs/novel16.jpg",
      rating: 4.4,
      views: 6300,
      dateAdded: "2024-03-05",
      chapters: [{ id: 1, en: "Under Three Suns", ar: "تحت ثلاث شموس", es: "Bajo tres soles" }],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 117,
      en: { title: "Void Walker", description: "Searching for the end of the universe at the edge of the void." },
      ar: { title: "سائر الفراغ", description: "البحث عن نهاية الكون عند حافة الفراغ السحيق." },
      es: { title: "Caminante del Vacío", description: "Buscando el fin del universo en el borde del vacío." },
      authorId: 202,
      price: 21.00,
      categories: ["cat2", "cat5"],
      imgSrc: "imgs/novel17.jpg",
      rating: 4.9,
      views: 29000,
      dateAdded: "2024-04-05",
      chapters: [{ id: 1, en: "The Edge", ar: "الحافة", es: "El borde" }],
      isFeatured: true,
      isBestSeller: true,
    },
    {
      id: 118,
      en: { title: "Curse of the Raven", description: "A detective must solve a murder committed by a ghost." },
      ar: { title: "لعنة الغراب", description: "يجب على محقق حل جريمة قتل ارتكبها شبح غامض." },
      es: { title: "La Maldición del Cuervo", description: "Un detective debe resolver un asesinato cometido por un fantasma." },
      authorId: 204,
      price: 9.99,
      categories: ["cat4", "cat5"],
      imgSrc: "imgs/novel18.jpg",
      rating: 4.2,
      views: 5400,
      dateAdded: "2024-03-12",
      chapters: [{ id: 1, en: "The Raven's Cry", ar: "صرخة الغراب", es: "El grito del cuervo" }],
      isFeatured: false,
      isBestSeller: false,
    },
    {
      id: 120,
      en: { title: "Chronos Protocol", description: "Time travelers accidentally delete the 21st century." },
      ar: { title: "بروتوكول كرونوس", description: "مسافرون عبر الزمن يحذفون القرن الحادي والعشرين عن طريق الخطأ." },
      es: { title: "Protocolo Chronos", description: "Viajeros del tiempo borran accidentalmente el siglo XXI." },
      authorId: 205,
      price: 49.99,
      categories: ["cat2", "cat4"],
      imgSrc: "imgs/novel20.jpg",
      rating: 4.7,
      views: 18000,
      dateAdded: "2024-04-10",
      chapters: [{ id: 1, en: "Temporal Rift", ar: "صدع زمني", es: "Grieta temporal" }],
      isFeatured: true,
      isBestSeller: true,
    }
  ],
};

// =============== Helper Functions (Simulating Backend Queries) ===================

function getActiveLang() {
  return localStorage.getItem("preferredLang") || "en";
}

function getTranslation(obj, field) {
  const lang = getActiveLang();
  return obj[lang] ? obj[lang][field] : (obj.en ? obj.en[field] : "");
}

function getFeaturedNovels() {
  return mockDB.novels.filter((novel) => novel.isFeatured);
}

function getBestSellers() {
  return mockDB.novels
    .filter((novel) => novel.isBestSeller)
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
}

function getUserLibrary() {
  return mockDB.novels.filter((novel) =>
    mockDB.currentUser.savedLibraryIds.includes(novel.id),
  );
}

window.getActiveLang = getActiveLang;
window.getTranslation = getTranslation;
window.getUserLibrary = getUserLibrary;

function getAuthorName(authorId) {
  const author = mockDB.authors.find((a) => a.id === authorId);
  return author ? getTranslation(author, "name") : "Unknown Author";
}

function createNovelCard(novel) {
  const authorName = getAuthorName(novel.authorId);
  const title = getTranslation(novel, "title");
  const description = getTranslation(novel, "description");

  return `
  <a href="novel_details.html?id=${novel.id}" class="text-decoration-none text-dark novel-link-wrapper">
    <div class="card h-100 shadow-sm border-secondary">
      <img src="${novel.imgSrc}" class="card-img-top" alt="${title}" style="height: 280px; object-fit: cover;" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title fw-bold mb-1">${title}</h5>
        <p class="text-muted small mb-2"><i class="bi bi-pen"></i> ${authorName}</p>
        
        <p class="card-text small mb-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
          ${description}
        </p>
        
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <span class="text-warning fw-bold small"><i class="bi bi-star-fill"></i> ${novel.rating}</span>
          <span class="text-secondary small"><i class="bi bi-eye"></i> ${novel.views.toLocaleString()}</span>
        </div>
      </div>
    </div>
  </a>
  `;
}

// =============== Injecting the HTML into the DOM ===================
function renderAllData() {
  const lang = getActiveLang();
  const novelSlider = document.getElementById("novelSlider");
  const bestSellerSlider = document.getElementById("bestSellerSlider");
  const categoryContainer = document.getElementById("categoryContainer");

  if (novelSlider) {
    const featuredNovels = getFeaturedNovels();
    novelSlider.innerHTML = featuredNovels.map((n) => createNovelCard(n)).join("");
  }

  if (bestSellerSlider) {
    const bestSellers = getBestSellers();
    bestSellerSlider.innerHTML = bestSellers.map((n) => createNovelCard(n)).join("");
  }

  if (categoryContainer) {
    categoryContainer.innerHTML = mockDB.categories
      .map((cat) => {
        const catName = cat[lang] || cat.en;

        // Find all novels that belong to this category
        const categoryNovels = mockDB.novels.filter((novel) =>
          novel.categories.includes(cat.id)
        );

        // Pick a random novel cover or use the default category image
        let coverImage = cat.image;
        if (categoryNovels.length > 0) {
          const randomIndex = Math.floor(Math.random() * categoryNovels.length);
          coverImage = categoryNovels[randomIndex].imgSrc;
        }

        return `
        <div class="col-6 col-md-4 col-lg-2 mb-3">
          <a href="discover.html?category=${encodeURIComponent(cat.id)}" class="text-decoration-none">
            <div class="card category-card border-0 shadow-sm overflow-hidden" style="height: 140px; cursor: pointer; transition: transform 0.2s; border-radius: 0.75rem; background-color: #1a1a1a;">
              <img src="${coverImage}" class="card-img" style="height: 100%; width: 100%; object-fit: cover; border-radius: 0.75rem;" alt="${catName}" />
              <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center" style="background: rgba(0, 0, 0, 0.5); border-radius: 0.75rem;">
                <h5 class="card-title fw-bold text-white m-0 text-center text-uppercase" style="letter-spacing: 1px; font-size: 0.95rem;">
                  ${catName}
                </h5>
              </div>
            </div>
          </a>
        </div>`;
      }).join("");
  }
}

document.addEventListener("DOMContentLoaded", renderAllData);
window.renderAllData = renderAllData; // Expose to i18n switcher
