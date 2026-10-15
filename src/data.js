/* =====================================================
   EDIT THIS FILE to change the demo data and the pay terms.
   Changes show up after you save.
   Users who sign up in the app are stored in the browser,
   separately from the users listed here.
   ===================================================== */

const pad = (n) => String(n).padStart(2, "0");
// day(0) = today, day(1) = tomorrow, day(3) = 3 days from now ...
const day = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Shows "demo" buttons: employer accept/decline on the worker's Requests tab,
// the demo OTP on screen, and "+30 min" on a running job
export const demoMode = true;

// true = a worker can press Start Job on ANY day (handy for testing).
// Set to false so Start Job only works on the job's actual date.
export const demoAnyDay = true;

/* ---------------- BILLING RULES ----------------
   Worker is billed from Start Job to End Job.
   - at least MIN_BILLED_MINUTES is billed per day
   - after that, time is rounded UP to the next BILLING_BLOCK_MINUTES */
export const MIN_BILLED_MINUTES = 60;
export const BILLING_BLOCK_MINUTES = 15;

const minEn = MIN_BILLED_MINUTES % 60 === 0 ? `${MIN_BILLED_MINUTES / 60} hour` : `${MIN_BILLED_MINUTES} minutes`;
const minHi = MIN_BILLED_MINUTES % 60 === 0 ? `${MIN_BILLED_MINUTES / 60} घंटा` : `${MIN_BILLED_MINUTES} मिनट`;

/* ---------------- PAY & WORK TERMS ----------------
   Shown in the "Pay terms" popup. guideline: true = a rule that is
   written down but not enforced by the app yet. */
export const payTerms = [
  {
    en: "You are paid per hour at the agreed rate. Time is counted only from Start Job to End Job.",
    hi: "भुगतान तय रेट पर घंटे के हिसाब से होता है। समय सिर्फ़ 'काम शुरू' से 'काम खत्म' तक गिना जाता है।",
  },
  {
    en: "Once a request is accepted, the hourly rate is locked. It can change only if both sides agree.",
    hi: "अनुरोध मंज़ूर होने के बाद रेट तय हो जाता है। रेट तभी बदलेगा जब दोनों पक्ष राज़ी हों।",
  },
  {
    en: "The customer gives you a 4-digit OTP to start the job and a new one to end it. Never share an OTP with anyone else.",
    hi: "काम शुरू करने के लिए ग्राहक आपको 4 अंकों का OTP देगा और खत्म करने के लिए नया OTP। OTP किसी और को न बताएँ।",
  },
  {
    en: `Minimum billing is ${minEn} per day. After that, time is rounded up to every ${BILLING_BLOCK_MINUTES} minutes.`,
    hi: `हर दिन कम से कम ${minHi} का भुगतान मिलेगा। उसके बाद समय हर ${BILLING_BLOCK_MINUTES} मिनट के हिसाब से ऊपर गोल किया जाएगा।`,
  },
  {
    en: "The customer pays you in cash or UPI right after End Job. Tap 'Payment received' only after you have been paid.",
    hi: "काम खत्म होते ही ग्राहक आपको नकद या UPI से पैसे देगा। पैसे मिलने के बाद ही 'पैसे मिल गए' दबाइए।",
  },
  {
    en: "Jobs marked 'Pay by time' have no fixed price because the work is not known in advance. You tell your hourly rate, and the customer pays for the time worked.",
    hi: "'समय के हिसाब से भुगतान' वाले काम का कोई तय दाम नहीं होता, क्योंकि काम पहले से पता नहीं होता। आप अपना घंटे का रेट बताइए, ग्राहक काम के समय के हिसाब से पैसे देगा।",
  },
  {
    en: "Spare parts, materials and travel cost are not part of the hourly pay. Agree on them before you start.",
    hi: "पुर्ज़े, सामान और आने-जाने का खर्च घंटे की मज़दूरी में शामिल नहीं है। काम शुरू करने से पहले इन पर बात कर लीजिए।",
    guideline: true,
  },
  {
    en: "If you cannot come, cancel at least 2 hours before the start time. Repeated no-shows can lead to account review.",
    hi: "अगर आप नहीं आ सकते, तो शुरू होने से कम से कम 2 घंटे पहले रद्द करें। बार-बार न आने पर खाते की जाँच हो सकती है।",
    guideline: true,
  },
  {
    en: "Never pay anyone to get a job. Rozgaar does not charge workers. Report anyone who asks for money.",
    hi: "काम पाने के लिए किसी को पैसे न दें। रोज़गार मज़दूरों से कोई फ़ीस नहीं लेता। पैसे माँगने वाले की शिकायत करें।",
    guideline: true,
  },
  {
    en: "If you disagree about the hours or the pay, do not argue at the site. Contact support and the start and end times will be checked.",
    hi: "अगर घंटों या पैसों पर मतभेद हो, तो वहाँ बहस न करें। सहायता से संपर्क करें, शुरू और खत्म होने का समय जाँचा जाएगा।",
    guideline: true,
  },
];

/* -----------------------------------------------------
   DEMO_CENTER: the demo users and jobs below are placed
   around this point. CHANGE IT to your own town so the demo
   jobs show up near you.
   (In Google Maps, right-click your town, then click the two
   numbers to copy "lat, lng".)  Currently the centre of Pune.
   ----------------------------------------------------- */
export const DEMO_CENTER = { lat: 18.5308, lng: 73.8475 };

// at(eastKm, northKm, "Place name") = a spot that far east/north of DEMO_CENTER
const at = (eastKm, northKm, label) => ({
  label,
  lat: DEMO_CENTER.lat + northKm / 110.574,
  lng: DEMO_CENTER.lng + eastKm / (111.32 * Math.cos((DEMO_CENTER.lat * Math.PI) / 180)),
});

/* ---------------- PROFESSIONS ----------------
   "other" must stay last. Jobs with trade "other" are shown to every worker. */
export const professions = [
  { id: "plumber", en: "Plumber", hi: "प्लंबर", icon: "🚰" },
  { id: "carpenter", en: "Carpenter", hi: "बढ़ई", icon: "🪚" },
  { id: "electrician", en: "Electrician", hi: "इलेक्ट्रीशियन", icon: "💡" },
  { id: "painter", en: "Painter", hi: "पेंटर", icon: "🎨" },
  { id: "mason", en: "Mason", hi: "राजमिस्त्री", icon: "🧱" },
  { id: "welder", en: "Welder", hi: "वेल्डर", icon: "🔥" },
  { id: "tiler", en: "Tile fitter", hi: "टाइल मिस्त्री", icon: "🔲" },
  { id: "mechanic", en: "Mechanic", hi: "मैकेनिक", icon: "🔧" },
  { id: "ac", en: "AC technician", hi: "एसी मैकेनिक", icon: "❄️" },
  { id: "driver", en: "Driver", hi: "ड्राइवर", icon: "🚗" },
  { id: "delivery", en: "Delivery helper", hi: "डिलीवरी हेल्पर", icon: "🛵" },
  { id: "loader", en: "Loader / Porter", hi: "लोडर / कुली", icon: "📦" },
  { id: "labourer", en: "Labourer", hi: "मज़दूर", icon: "👷" },
  { id: "sweeper", en: "Sweeper", hi: "सफाईकर्मी", icon: "🧹" },
  { id: "housemaid", en: "House help", hi: "घरेलू सहायक", icon: "🏠" },
  { id: "cook", en: "Cook", hi: "रसोइया", icon: "🍳" },
  { id: "gardener", en: "Gardener", hi: "माली", icon: "🌱" },
  { id: "guard", en: "Security guard", hi: "सिक्योरिटी गार्ड", icon: "🛡️" },
  { id: "tailor", en: "Tailor", hi: "दर्ज़ी", icon: "🧵" },
  { id: "barber", en: "Barber", hi: "नाई", icon: "✂️" },
  { id: "other", en: "Other", hi: "कुछ और", icon: "🧰" },
];

/* ---------------- REGISTERED USERS ----------------
   professions: list of ids from above
   otherWorks: list of your own trades (only used if "other" is in professions)
   location: at(east, north, "Name") or { label, lat, lng }
   wageMin / wageMax: expected rupees per hour
   photo: leave "" (or paste an image URL)               */
export const users = [
  {
    id: "u1",
    name: "Ramesh Yadav",
    age: 38,
    phone: "9876543210",
    professions: ["plumber"],
    otherWorks: [],
    location: at(-2.5, 1.0, "Main Market"),
    wageMin: 200,
    wageMax: 300,
    photo: "",
    experience: [
      { id: "e1", text: "10 years fixing pipes in homes and shops", photo: "" },
      { id: "e2", text: "Bathroom fitting in more than 40 houses", photo: "" },
    ],
  },
  {
    id: "u2",
    name: "Sunita Devi",
    age: 32,
    phone: "9823012345",
    professions: ["sweeper", "housemaid"],
    otherWorks: [],
    location: at(3.5, -0.5, "Station Road"),
    wageMin: 120,
    wageMax: 180,
    photo: "",
    experience: [{ id: "e1", text: "6 years cleaning offices and apartments", photo: "" }],
  },
  {
    id: "u3",
    name: "Mohan Lal",
    age: 45,
    phone: "9890123456",
    professions: ["carpenter"],
    otherWorks: [],
    location: at(0.5, 0.5, "Old Bus Stand"),
    wageMin: 300,
    wageMax: 400,
    photo: "",
    experience: [{ id: "e1", text: "Made doors, windows and wardrobes for 20 years", photo: "" }],
  },
  {
    id: "u4",
    name: "Anil Shinde",
    age: 29,
    phone: "9765432109",
    professions: ["electrician", "ac"],
    otherWorks: [],
    location: at(-4, 3, "Temple Road"),
    wageMin: 250,
    wageMax: 350,
    photo: "",
    experience: [{ id: "e1", text: "House wiring, fan and light fitting, 7 years", photo: "" }],
  },
  {
    id: "u5",
    name: "Raju Pawar",
    age: 26,
    phone: "9112233445",
    professions: ["painter", "other"],
    otherWorks: ["Wall design", "Poster painting"],
    location: at(5, 4, "Industrial Area"),
    wageMin: 180,
    wageMax: 260,
    photo: "",
    experience: [{ id: "e1", text: "Interior and exterior painting, 4 years", photo: "" }],
  },
  {
    id: "u6",
    name: "Kisan More",
    age: 41,
    phone: "9001122334",
    professions: ["labourer", "loader"],
    otherWorks: [],
    location: at(2, -5, "Grain Market"),
    wageMin: 150,
    wageMax: 220,
    photo: "",
    experience: [{ id: "e1", text: "Loading, shifting and construction help", photo: "" }],
  },
];

/* ---------------- JOB LISTINGS ----------------
   trade: a profession id. Use "other" for jobs anyone can do
          (those are shown to every worker).
   description: optional, shown on the job card
   location: at(east, north, "Place name") or { label, lat, lng }
   date: day(n) = n days from today (or write "2026-11-05")
   days: 1 = daily wage, 2-14 = short-term, 15+ = long-term
   start / end: 24-hour time, per day

   FIXED PRICE job:  payPerHour: 250, end: "13:00"
   APPOINTMENT job (no price, paid by time worked):
                     payPerHour: null, end: null, days: 1
                     (start = the time the worker should arrive)  */
export const jobs = [
  { id: "j1", title: "Fix kitchen tap leak", description: "Kitchen tap drips all day. Washer needs changing.", trade: "plumber", employer: "Mrs. Kulkarni", location: at(-2, 1.5, "Main Market"), date: day(1), days: 1, start: "10:00", end: "13:00", payPerHour: 250 },
  { id: "j2", title: "New bathroom pipe fitting", description: "Pipes for a new bathroom in a flat. Material provided.", trade: "plumber", employer: "Patil Constructions", location: at(6, 5, "New Housing Colony"), date: day(2), days: 3, start: "09:00", end: "17:00", payPerHour: 280 },
  { id: "j3", title: "Clean office after renovation", description: "Remove dust and paint marks from floors and windows.", trade: "sweeper", employer: "BrightDesk Co.", location: at(4, 0, "Station Road"), date: day(1), days: 1, start: "08:00", end: "14:00", payPerHour: 160 },
  { id: "j4", title: "Daily society cleaning", description: "Clean stairs and lobby every morning.", trade: "sweeper", employer: "Sai Heights Society", location: at(-6, -3, "Garden Society"), date: day(3), days: 30, start: "06:00", end: "09:00", payPerHour: 140 },
  { id: "j5", title: "Make a wooden wardrobe", description: "Two-door wardrobe, wood will be bought by the owner.", trade: "carpenter", employer: "Mr. Deshmukh", location: at(1, 1, "Old Bus Stand"), date: day(2), days: 5, start: "10:00", end: "18:00", payPerHour: 380 },
  { id: "j6", title: "Repair 4 broken doors", description: "", trade: "carpenter", employer: "Government School", location: at(8, 6, "School Road"), date: day(4), days: 2, start: "09:00", end: "15:00", payPerHour: 340 },
  { id: "j7", title: "Fan and light fitting", description: "3 fans and 5 lights in a new flat.", trade: "electrician", employer: "Mrs. Joshi", location: at(-3, 2.5, "Temple Road"), date: day(1), days: 1, start: "11:00", end: "15:00", payPerHour: 320 },
  { id: "j8", title: "Wiring for new shop", description: "", trade: "electrician", employer: "Kamat Stores", location: at(10, -2, "Highway Junction"), date: day(5), days: 4, start: "09:00", end: "17:00", payPerHour: 330 },
  { id: "j9", title: "Paint 2 BHK flat", description: "All rooms, two coats. Paint provided.", trade: "painter", employer: "Mr. Iyer", location: at(5.5, 3.5, "Industrial Area"), date: day(2), days: 6, start: "09:00", end: "17:00", payPerHour: 230 },
  { id: "j10", title: "Touch up shop walls", description: "", trade: "painter", employer: "Fresh Mart", location: at(-1, -1, "Main Market"), date: day(3), days: 1, start: "08:00", end: "12:00", payPerHour: 210 },
  { id: "j11", title: "Unload truck and shift goods", description: "About 200 boxes, ground floor to godown.", trade: "labourer", employer: "Metro Traders", location: at(2, -4.5, "Grain Market"), date: day(1), days: 1, start: "07:00", end: "12:00", payPerHour: 190 },
  { id: "j12", title: "Construction site helper", description: "", trade: "labourer", employer: "Patil Constructions", location: at(12, 8, "New Housing Colony"), date: day(2), days: 20, start: "08:00", end: "17:00", payPerHour: 170 },
  { id: "j13", title: "Build boundary wall", description: "", trade: "mason", employer: "Mr. Chavan", location: at(-5, 4, "Farm Road"), date: day(2), days: 7, start: "08:00", end: "16:00", payPerHour: 300 },
  { id: "j14", title: "Cook for a small function", description: "Lunch for about 40 people.", trade: "cook", employer: "Mrs. Gupta", location: at(1, 3, "Temple Road"), date: day(3), days: 1, start: "07:00", end: "15:00", payPerHour: 220 },
  { id: "j15", title: "Garden cleaning and planting", description: "", trade: "gardener", employer: "Lotus Apartments", location: at(-2, -2, "Garden Society"), date: day(2), days: 2, start: "07:00", end: "11:00", payPerHour: 170 },
  { id: "j16", title: "Drive a tempo for house shifting", description: "Worker brings own tempo.", trade: "driver", employer: "Mr. Naik", location: at(3, 2, "Station Road"), date: day(1), days: 1, start: "09:00", end: "17:00", payPerHour: 240 },
  { id: "j17", title: "Hand out pamphlets", description: "", trade: "other", employer: "City Coaching Classes", location: at(0, 0, "Main Market"), date: day(2), days: 1, start: "10:00", end: "14:00", payPerHour: 120 },
  { id: "j18", title: "Wedding hall setup helper", description: "", trade: "other", employer: "Shubh Events", location: at(7, -1, "Marriage Hall Road"), date: day(4), days: 2, start: "08:00", end: "18:00", payPerHour: 160 },
  { id: "j19", title: "Help at a tea stall", description: "", trade: "other", employer: "Gopal Tea Stall", location: at(-1, 0.5, "Bus Stand"), date: day(1), days: 10, start: "06:00", end: "12:00", payPerHour: 110 },

  /* ----- appointment jobs: no price, paid by time worked ----- */
  { id: "a1", title: "Kitchen tap repair", description: "Tap in the kitchen is leaking. Please come, check and repair it. Not sure how long it will take.", trade: "plumber", employer: "Mrs. Phadke", location: at(-1.5, 0.8, "Main Market"), date: day(1), days: 1, start: "11:00", end: null, payPerHour: null },
  { id: "a2", title: "Ceiling fan not working", description: "Fan stopped suddenly. Need someone to find the problem and fix it.", trade: "electrician", employer: "Mr. Bhosale", location: at(-3.5, 2.8, "Temple Road"), date: day(1), days: 1, start: "16:00", end: null, payPerHour: null },
  { id: "a3", title: "Wardrobe door repair", description: "One door is loose and does not close properly.", trade: "carpenter", employer: "Mrs. Rao", location: at(1.5, 0.5, "Old Bus Stand"), date: day(2), days: 1, start: "10:00", end: null, payPerHour: null },
  { id: "a4", title: "Help shifting furniture to a new flat", description: "Need one or two helpers. Time depends on how much furniture there is.", trade: "other", employer: "Mr. Sawant", location: at(2.5, -4, "Grain Market"), date: day(1), days: 1, start: "09:00", end: null, payPerHour: null },
];