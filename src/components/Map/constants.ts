export const MIN_PIN_ZOOM = 10;
export const DEFAULT_ZOOM = 16;
export const MAX_ZOOM = 18;
export const MAX_CITY_ZOOM = 15;

import { MapTiles, Search } from '@/api/data';

export const mapTiles: MapTiles = [
  {
    name: 'default',
    title: 'Open street map',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  {
    name: 'satellite',
    title: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© <a href="https://www.arcgis.com">Powered by Esri</a>'
  }
];

export const initSearch: Search = {
  places: [
    {
      id: 2924,
      category: 'Локація',
      name: 'Львів',
      location: {
        latitude: '49.83968300000001',
        longitude: '24.029717000000005'
      }
    },
    {
      id: 2689,
      category: 'Локація',
      name: 'Яремче',
      location: {
        latitude: '48.481557',
        longitude: '24.581917399999952'
      }
    },
    {
      id: 2686,
      category: 'Локація',
      name: 'Поляниця (Буковель)',
      location: {
        latitude: '48.3623404',
        longitude: '24.405497999999966'
      }
    },
    {
      id: 2975,
      category: 'Локація',
      name: 'Славське',
      location: {
        latitude: '48.834578',
        longitude: '23.44722580000007'
      }
    },
    {
      id: 2685,
      category: 'Локація',
      name: 'Микуличин',
      location: {
        latitude: '48.40995419999999',
        longitude: '24.61664870000004'
      }
    }
  ],
  hotels: [
    {
      name: 'Трускавець - 365',
      price: '2300грн',
      body: 'Готель "Трускавець" розташований в центральній частині міста, недалеко від нижнього бювету. Нині готель пропонує 96 реконструйованих номерів: 32 двомісних і 64 одномісних. У кожному стандартному номері: міні-бар, холодильник, супутникове телебачення (30 каналів), телефон, фен. Дизайн, інтер’єр і обладнання номерів повністю відповідають міжнародним стандартам, і можуть бути прирівняні до класу...',
      pricetext: 'Ціна за номер',
      category: 'Проживання',
      subcategory: 'Готель',
      image: 'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/hotels24/truskavec_-_365.jpg',
      location: {
        latitude: '49.28141927891803',
        street: 'Трускавець, Дрогобицька , 7',
        longitude: '23.50270628929102'
      },
      id: 20675,
      url: 'https://karpaty.rocks/truskavec-365',
      height: 384
    },
    {
      name: 'Красна садиба',
      price: '1400грн',
      body: 'Готель "Красна садиба" розташований на березі річки Прут і складається з двох корпусів. Чотириповерхова старовинна австрійська будівля старого корпусу складається з дев’яти номерів, з яких три двомісні номери, чотири напівлюкси, два люкси. Один номер категорії "Люкс" складається з двох суміжних кімнат, вітальні та спальні. Триповерхова будівля нового дерев’яного корпусу в гуцульському стилі с...',
      pricetext: 'Ціна за номер',
      category: 'Проживання',
      subcategory: 'Готель',
      image: 'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/hotels24/krasna_sadyba.jpg',
      location: {
        latitude: '48.4445274',
        street: 'Яремче, Івасюка, 6',
        longitude: '24.5532417'
      },
      id: 20551,
      url: 'https://karpaty.rocks/krasna-sadiba',
      height: 539
    },
    {
      name: 'Готельний комплекс "Красна Поляна" в Буковелі',
      price: '',
      body: 'Готельний комплекс "Красна Поляна" в Буковелі, що складається з 16 двоповерхових дерев’яних котеджів і розрахований на 36 номерів (116 основних та 26 додаткових місць). В кожному котеджі — 4-8 місць. Розміщений у селищі Поляниця, за 15 хвилин їзди на автомобілі від гірськолижного курорту Буковель. З вікон закладу відкривається чудовий вид на Карпати. До послуг гостей цілодобова стійка реєстра...',
      pricetext: '',
      category: 'Проживання',
      subcategory: 'Готель',
      image:
        'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/hotel/gotelnyy_kompleks_krasna_polyana_v_bukoveli.jpg',
      location: {
        latitude: '48.34795591623345',
        street: 'присілок Прохідний, Поляниця, Івано-Франківська область, Україна',
        longitude: '24.46661686829225'
      },
      id: 7969,
      url: 'https://karpaty.rocks/gotelniy-kompleks-krasna-polyana-v-bukoveli',
      height: 906
    }
  ],
  culture: [
    {
      name: 'Озеро Синевир',
      price: '',
      body: 'Озеро Синевир, що знаходиться на території однойменного Національного природного парку в Міжгірському районі Закарпатської області, – найбільше і одне з найкрасивіших гірських озер України, яке оточене численними загадками та легендами, і по праву вважається візитівкою Українських Карпат. Тому і не дивно, що щороку величезна кількість туристів з усієї Європі прагне помилуватися його кришталев...',
      pricetext: '',
      category: "Пам'ятки культури",
      subcategory: 'Озера',
      image: 'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/ozero_synevyr.jpg',
      location: {
        latitude: '48.61642723683718',
        street: 'Синевирская Поляна, Закарпатська область, Україна',
        longitude: '23.684990326953084'
      },
      id: 13807,
      url: 'https://karpaty.rocks/ozero-synevyr-synevyrska-polyana',
      height: 989
    },
    {
      name: 'Стежка Довбуша в Яремче',
      price: '',
      body: 'В Українських Карпатах є багато об’єктів, названих на честь ватажка опришків Олекси Довбуша: Скелі Довбуша, Камінь Довбуша, Печера Довбуша. Біля прикарпатського міста Яремче знаходиться цікава туристична атракція – "Стежка Довбуша". Якщо ви шукаєте не надто довгий, але дуже цікавий маршрут – "Стежка Довбуша" поблизу Яремча підійде ідеально. Розташовується вона в межах Карпатського національно...',
      pricetext: '',
      category: "Пам'ятки культури",
      subcategory: 'Ландшафтні',
      image:
        'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/stezhka_dovbusha_v_yaremche.jpg',
      location: {
        latitude: '48.481557',
        street: 'Яремче, Івано-Франківська область, Україна',
        longitude: '24.581917399999952'
      },
      id: 3505,
      url: 'https://karpaty.rocks/stezhka-dovbusha-v-yaremche',
      height: 539
    },
    {
      name: 'Водоспад Пробій, Яремче',
      price: '',
      body: 'Водоспад Пробій розташований в самому серці курортних Карпат, у місті Яремче. Ця природна пам’ятка є однією з найкрасивіших в Україні. Пробій — каскадний водоспад в Українських Карпатах, на річці Прут. Води Прута спадають вниз з висоти 8 метрів. Більшість карпатських водоспадів можна роздивитись лише з річкових долин, а Пробій — з усіх можливих ракурсів. Наприклад, можна спуститись до самого ...',
      pricetext: '',
      category: "Пам'ятки культури",
      subcategory: 'Водоспади',
      image:
        'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/vodospad_probiy_yaremche.jpg',
      location: {
        latitude: '48.43953835628029',
        street: 'вулиця Михайла Грушевського, 29, Яремче, Івано-Франківська область, Україна, 78500',
        longitude: '24.539846455017127'
      },
      id: 14706,
      url: 'https://karpaty.rocks/vodospad-probiy-yaremche',
      height: 529
    },
    {
      name: 'Полонина Кукул (Кукуль), Вороненко',
      price: '',
      body: 'Полонина Кукуль - полонина в Український Карпатах, у межах хребта Кукуль (г. Кукуль - 1539 м н. р. м.), адмінстративно розташована в межах Закарпатської області. Приблизна висота над рівнем моря - 1440 м. Відстань до хутора Завоєля - 5 км. Відстань до дороги спортбаза "Заросляк" - смт Ворохта - 4 км. Полонину можна умовно поділити на дві частини, одна з яких лежить вище, а інше називають "зад...',
      pricetext: '',
      category: "Пам'ятки культури",
      subcategory: 'Полонини',
      image:
        'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/polonyna_kukul_voronenko.jpg',
      location: {
        latitude: '48.2197988569184',
        street: 'Вороненко, Івано-Франківська область, Україна',
        longitude: '24.54091349453123'
      },
      id: 17167,
      url: 'https://karpaty.rocks/polonyna-kukul-kukul-voronenko',
      height: 1440
    },
    {
      name: 'Полонина Хом’яків',
      price: '',
      body: 'Велика похила полонина на північних схилах хребта Синяка-Хом’яка. Звідси ідуть стежки: в долину потоку Женець (довга пряма просіка на північ), підйом на гору Хом’як (на південний захід), стежка хребтом через жереп на вершину Синяка (на південний схід), траверс вершини Хом’яка до полонини Бараня і джерела (на схід) і далі серпантин в долину Прутця Яблуницького. Колиби на полонині Хом’яків Зруч...',
      pricetext: '',
      category: "Пам'ятки культури",
      subcategory: 'Полонини',
      image: 'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/polonyna_homyakiv.jpg',
      location: {
        latitude: '48.375673706814474',
        street: 'Татарів, Івано-Франківська область, Україна',
        longitude: '24.493105885095197'
      },
      id: 17170,
      url: 'https://karpaty.rocks/polonyna-homyakiv',
      height: 1525
    },
    {
      name: 'Бухтівецький водоспад, Букове',
      price: '',
      body: 'Бухтівецький водоспад (Водоспад Бухтівець) - водоспад в Українських Карпатах, в масиві Ґорґани; гідрологічна пам’ятка природи місцевого значення (з 1972 року). Розташований на річці Бухтівець (ліва притока Бистриці Надвірнянської), біля села Букове, в урочищі Бухтівець. у 1972 році Бухтівецький водоспад було відзначено як гідрологічну пам’ятку природи місцевого значення та взято під охорону. ...',
      pricetext: '',
      category: "Пам'ятки культури",
      subcategory: 'Водоспади',
      image:
        'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/buhtiveckyy_vodospad_bukove_1.jpg',
      location: {
        latitude: '48.6035896',
        street: 'Буковe, Івано-Франківська область, Україна',
        longitude: '24.3700826'
      },
      id: 14935,
      url: 'https://karpaty.rocks/buhtiveckiy-vodospad-bukove',
      height: 544
    }
  ],
  rocks: [
    {
      name: 'Гора Синяк',
      price: '',
      body: 'Гора Синяк, висотою 1665 м, – одна із вершин Горганського масиву Українських Карпат, що розташована на території Надвірнянського району Івано-Франківської області. Знаходиться в межах Карпатського національного природного парку. Свою назву гора отримала через синюватий відтінок. Справа у тім, що крізь гірське мерехтливе повітря кам’яні схили Синяка, рясно покриті жовтувато-сіруватим лишайнико...',
      pricetext: '',
      category: 'Вершини',
      subcategory: 'Вершини',
      image: 'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/gora_synyak_2.jpg',
      location: {
        latitude: '48.38834565181009',
        street: 'Туристичний маршрут на гору Синяк, Івано-Франківська область, Україна',
        longitude: '24.457317881506356'
      },
      id: 12699,
      url: 'https://karpaty.rocks/gora-sinyak',
      height: 1665
    },
    {
      name: 'Гора Говерла',
      price: '',
      body: 'Запам’ятай: гора Говерла має складний маршрут і до сходження треба завчасно готуватися. В похід на Говерлу вам потрібен досвідчений друг, компанія або провідник, до якого краще записатися наперед. Це головна і найбільша гора наших рідних Карпат, яка вважається, що вищої точки в Україні (2061 м) не існує наразі. Гора Говерла географічно є складовою Чорногірського масиву, розташована на межі Ів...',
      pricetext: '',
      category: 'Вершини',
      subcategory: 'Вершини',
      image:
        'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/gora_goverla_marshrut.jpg',
      location: {
        latitude: '48.16018510799204',
        street: 'Еколого-пізнавальна стежка "На г. Говерла", Івано-Франківська область, Україна',
        longitude: '24.500104479711922'
      },
      id: 11953,
      url: 'https://karpaty.rocks/gora-goverla',
      height: 2061
    },
    {
      name: 'Гора Маковиця, Яремче',
      price: '',
      body: 'Щороку Карпати відвідують тисячі людей. Переважно сюди їдуть, щоб відпочити від міського ритму життя та насолодитися природою. Крім того, від цих гір віє якимось містицизмом. Це також притягує сюди туристів. Одним із таких магнетичних місць є гора Маковиця, що біля Яремче. Одразу потрібно наголосити, що не варто плутати її з горою Маківкою, що біля Славського на Львівщині.  Існує версія, що н...',
      pricetext: '',
      category: 'Вершини',
      subcategory: 'Вершини',
      image:
        'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/doroga_na_makovycyu_1.jpg',
      location: {
        latitude: '48.451109671025',
        street: 'Яремче, Івано-Франківська область, Україна',
        longitude: '24.589470500585985'
      },
      id: 14820,
      url: 'https://karpaty.rocks/gora-makovicya-yaremche',
      height: 984
    },
    {
      name: 'Гора Хом’як',
      price: '',
      body: 'Хом’як – вершина Горганського гірського масиву висотою 1542 м. Подейкують, що гору названо так, тому що вона своєю формою схожа на спину хом’яка. Мабуть, у кого добре розвинута фантазія, то без проблем зможе розгледіти таку схожість… В хорошу безхмарну погоду з вершини можна побачити Чорногору з Говерлою та Петросом, Явірник і Свидовець, а також навколишні селища – Татарів, Микуличин і Поляни...',
      pricetext: '',
      category: 'Вершини',
      subcategory: 'Вершини',
      image: 'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/gora_homyak_1.jpg',
      location: {
        latitude: '48.36753702034781',
        street: 'Туристичний маршрут на гору Хом’як, Івано-Франківська область, Україна',
        longitude: '24.49641376010743'
      },
      id: 12760,
      url: 'https://karpaty.rocks/gora-homyak',
      height: 1542
    },
    {
      name: 'Гора Петрос',
      price: '',
      body: 'Гора Петрос – четверта за висотою (2020 м) вершина Українських Карпат після Говерли (2061), Бребенескула (2035 м) та Попа Івана Чорногірського (2028 м). Розташована на території Рахівського району Закарпатської області. Петрос, будучи однією із найвищих гір Чорногірського гірського масиву, є одним із найбільш популярних об’єктів пішохідного туризму, на який щорічно сходять тисячі любителів ак...',
      pricetext: '',
      category: 'Вершини',
      subcategory: 'Вершини',
      image: 'https://karpaty.rocks/sites/default/files/styles/400x400jpeg/public/photo/history/gora_petros.jpg',
      location: {
        latitude: '48.17186346999781',
        street: 'Туристичний маршрут на гору Петрос, Закарпатська область, Україна',
        longitude: '24.421140246313485'
      },
      id: 12462,
      url: 'https://karpaty.rocks/gora-petros',
      height: 2020
    }
  ],
  trails: []
};
