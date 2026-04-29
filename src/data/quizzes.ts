import type { GameId } from "./topics";
import type { Lang } from "@/i18n/strings";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

type QuizSet = Record<GameId, QuizQuestion[]>;

const EN: QuizSet = {
  "make-your-own-matter": [
    {
      question: "Which state has the most space between particles?",
      options: ["Solid", "Liquid", "Gas", "Ice"],
      correctIndex: 2,
      hint: "Try fewer particles and watch the gaps.",
    },
    {
      question: "Which is an example of a liquid?",
      options: ["Stone", "Oxygen", "Ocean", "Brick"],
      correctIndex: 2,
      hint: "Make a liquid, then combine items.",
    },
    {
      question: "Which state has particles packed closest together?",
      options: ["Gas", "Liquid", "Solid", "Steam"],
      correctIndex: 2,
      hint: "Fill the cube and compare spacing.",
    },
    {
      question: "Which state takes the shape of its container?",
      options: ["Solid", "Liquid", "Table", "Rock"],
      correctIndex: 1,
      hint: "Make each state and watch how it behaves.",
    },
    {
      question: "Which is an example of a gas?",
      options: ["Milk", "Oxygen", "Stone", "Wood"],
      correctIndex: 1,
      hint: "Make a gas, then toggle the items.",
    },
  ],
  "water-the-plant": [
    {
      question: "What happens when water is heated?",
      options: ["It freezes", "It turns into vapor", "It becomes a solid", "It disappears"],
      correctIndex: 1,
      hint: "Raise the temperature and watch the droplet.",
    },
    {
      question: "Why does the vapor move upward?",
      options: ["Because it is colder", "Because vapor rises", "Because plants pull it", "Because clouds push it"],
      correctIndex: 1,
      hint: "Heat the droplet and see where it goes.",
    },
    {
      question: "What is it called when water vapor cools and turns into tiny droplets?",
      options: ["Melting", "Freezing", "Condensation", "Boiling"],
      correctIndex: 2,
      hint: "Cool the vapor near the top.",
    },
    {
      question: "What do many tiny cooled droplets form together?",
      options: ["A rock", "A cloud", "A shadow", "Smoke"],
      correctIndex: 1,
      hint: "Collect enough vapor and look up.",
    },
    {
      question: "Which part of the water cycle waters the plant in this game?",
      options: ["Evaporation", "Condensation", "Precipitation", "Heating"],
      correctIndex: 2,
      hint: "Make the cloud rain on the plant.",
    },
  ],
  "wadi-crossing": [
    {
      question: "Which state helps the player move through a narrow rock crack?",
      options: ["Solid", "Liquid", "Gas", "Stone"],
      correctIndex: 1,
      hint: "Try the tight gap.",
    },
    {
      question: "Which state helps the player rise through a hot air vent?",
      options: ["Solid", "Liquid", "Gas", "Ice"],
      correctIndex: 2,
      hint: "Use the upward vent.",
    },
    {
      question: "Which state keeps its shape best on a windy crossing?",
      options: ["Liquid", "Gas", "Solid", "Steam"],
      correctIndex: 2,
      hint: "Test the windy part.",
    },
    {
      question: "What does a liquid do best?",
      options: ["Keeps a fixed shape", "Flows and fits spaces", "Floats upward", "Spreads everywhere"],
      correctIndex: 1,
      hint: "Watch how water moves.",
    },
    {
      question: "What is the main science idea in this game?",
      options: ["Plants make food", "Rocks are heavy", "Matter can change state and behave differently", "The Sun is a star"],
      correctIndex: 2,
      hint: "Switch states to cross.",
    },
  ],
  "mosque-systems": [
    {
      question: "Which state of matter keeps its shape best when building the mosque?",
      options: ["Liquid", "Gas", "Solid", "Steam"],
      correctIndex: 2,
      hint: "Test all 3 blocks.",
    },
    {
      question: "Why does the gas mosque fail the wind test?",
      options: ["Gas is too cold", "Gas spreads and moves easily", "Gas becomes heavier", "Gas turns solid"],
      correctIndex: 1,
      hint: "Watch what wind does to gas blocks.",
    },
    {
      question: "Why does the liquid mosque fail the earthquake test?",
      options: ["Liquid glows", "Liquid freezes", "Liquid flows and loses shape", "Liquid becomes gas"],
      correctIndex: 2,
      hint: "Shake the liquid build and observe it.",
    },
    {
      question: "Which state of matter takes the shape of its container?",
      options: ["Solid", "Liquid", "Gas", "Rock"],
      correctIndex: 1,
      hint: "Look at the liquid block behavior.",
    },
    {
      question: "Which mosque build passes both tests in the game?",
      options: ["Gas build", "Liquid build", "Solid build", "Cloud build"],
      correctIndex: 2,
      hint: "Press Test after each material.",
    },
  ],
};

const AR: QuizSet = {
  "make-your-own-matter": [
    {
      question: "أيّ حالة لها أكبر مسافة بين الجزيئات؟",
      options: ["الصلب", "السائل", "الغاز", "الجليد"],
      correctIndex: 2,
      hint: "جرّب عدداً أقل من الجزيئات وراقب الفجوات.",
    },
    {
      question: "أيٌّ من التالي مثالٌ على السائل؟",
      options: ["الحجر", "الأكسجين", "المحيط", "الطوب"],
      correctIndex: 2,
      hint: "اصنع سائلاً ثم جرّب دمج العناصر.",
    },
    {
      question: "أيّ حالة تكون فيها الجزيئات أكثر تقارباً؟",
      options: ["الغاز", "السائل", "الصلب", "البخار"],
      correctIndex: 2,
      hint: "املأ المكعب وقارن المسافات بين الجزيئات.",
    },
    {
      question: "أيّ حالة تأخذ شكل الوعاء الذي توضع فيه؟",
      options: ["الصلب", "السائل", "الطاولة", "الصخرة"],
      correctIndex: 1,
      hint: "اصنع كل حالة وراقب كيف تتصرف.",
    },
    {
      question: "أيٌّ من التالي مثالٌ على الغاز؟",
      options: ["الحليب", "الأكسجين", "الحجر", "الخشب"],
      correctIndex: 1,
      hint: "اصنع غازاً ثم بدّل بين العناصر.",
    },
  ],
  "water-the-plant": [
    {
      question: "ماذا يحدث عندما يُسخَّن الماء؟",
      options: ["يتجمد", "يتحول إلى بخار", "يصبح صلباً", "يختفي"],
      correctIndex: 1,
      hint: "ارفع درجة الحرارة وراقب القطرة.",
    },
    {
      question: "لماذا يتحرك البخار إلى أعلى؟",
      options: ["لأنه أبرد", "لأن البخار يرتفع", "لأن النبات يسحبه", "لأن السحاب يدفعه"],
      correctIndex: 1,
      hint: "سخّن القطرة وانظر أين تذهب.",
    },
    {
      question: "ما اسم العملية التي يبرد فيها بخار الماء ويتحول إلى قطرات صغيرة؟",
      options: ["الذوبان", "التجمد", "التكثف", "الغليان"],
      correctIndex: 2,
      hint: "برّد البخار بالقرب من الأعلى.",
    },
    {
      question: "ماذا تكوّن القطرات الصغيرة المبردة معاً؟",
      options: ["صخرة", "سحابة", "ظل", "دخان"],
      correctIndex: 1,
      hint: "اجمع كمية كافية من البخار وانظر إلى الأعلى.",
    },
    {
      question: "أيّ جزء من دورة الماء يروي النبات في هذه اللعبة؟",
      options: ["التبخر", "التكثف", "التساقط", "التسخين"],
      correctIndex: 2,
      hint: "اجعل السحابة تمطر على النبات.",
    },
  ],
  "wadi-crossing": [
    {
      question: "أيّ حالة تساعد اللاعب على المرور عبر شقّ ضيّق في الصخر؟",
      options: ["الصلب", "السائل", "الغاز", "الحجر"],
      correctIndex: 1,
      hint: "جرّب الفجوة الضيقة.",
    },
    {
      question: "أيّ حالة تساعد اللاعب على الارتفاع عبر فتحة هواء ساخن؟",
      options: ["الصلب", "السائل", "الغاز", "الجليد"],
      correctIndex: 2,
      hint: "استخدم فتحة الهواء الصاعد.",
    },
    {
      question: "أيّ حالة تحافظ على شكلها أكثر في العبور الريحي؟",
      options: ["السائل", "الغاز", "الصلب", "البخار"],
      correctIndex: 2,
      hint: "جرّب الجزء الريحي.",
    },
    {
      question: "ما أفضل ما يفعله السائل؟",
      options: ["يحافظ على شكل ثابت", "يتدفق ويملأ الفراغات", "يطفو للأعلى", "ينتشر في كل مكان"],
      correctIndex: 1,
      hint: "راقب كيف يتحرك الماء.",
    },
    {
      question: "ما الفكرة العلمية الرئيسية في هذه اللعبة؟",
      options: ["النباتات تصنع الغذاء", "الصخور ثقيلة", "يمكن للمادة أن تغيّر حالتها وتتصرف بشكل مختلف", "الشمس نجم"],
      correctIndex: 2,
      hint: "بدّل الحالات لتعبر.",
    },
  ],
  "mosque-systems": [
    {
      question: "أيّ حالة من المادة تحافظ على شكلها أكثر عند بناء المسجد؟",
      options: ["السائل", "الغاز", "الصلب", "البخار"],
      correctIndex: 2,
      hint: "جرّب الثلاثة كتل.",
    },
    {
      question: "لماذا يفشل المسجد الغازي في اختبار الرياح؟",
      options: ["الغاز بارد جداً", "الغاز ينتشر ويتحرك بسهولة", "الغاز يصبح أثقل", "الغاز يتحول إلى صلب"],
      correctIndex: 1,
      hint: "راقب ما تفعله الريح بالكتل الغازية.",
    },
    {
      question: "لماذا يفشل المسجد السائل في اختبار الزلزال؟",
      options: ["السائل يتوهج", "السائل يتجمد", "السائل يتدفق ويفقد شكله", "السائل يتحول إلى غاز"],
      correctIndex: 2,
      hint: "هزّ البناء السائل وراقب ما يحدث.",
    },
    {
      question: "أيّ حالة من المادة تأخذ شكل وعائها؟",
      options: ["الصلب", "السائل", "الغاز", "الصخر"],
      correctIndex: 1,
      hint: "انظر إلى سلوك الكتلة السائلة.",
    },
    {
      question: "أيّ بناء مسجد يجتاز الاختبارين في اللعبة؟",
      options: ["البناء الغازي", "البناء السائل", "البناء الصلب", "البناء السحابي"],
      correctIndex: 2,
      hint: "اضغط اختبار بعد كل مادة.",
    },
  ],
};

export function getQuiz(gameId: GameId, lang: Lang): QuizQuestion[] {
  return (lang === "ar" ? AR : EN)[gameId];
}
