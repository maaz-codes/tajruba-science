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
      question: "To cross a river, your droplet should become…",
      options: ["Gas to float over", "Solid (ice) to walk on", "Stay liquid", "Disappear"],
      correctIndex: 1,
      hint: "Ice is hard enough to step on.",
    },
    {
      question: "To slip through a narrow gap, become…",
      options: ["A big solid", "A flowing liquid", "Nothing", "Bigger"],
      correctIndex: 1,
      hint: "Liquids fit any shape.",
    },
    {
      question: "To rise over a tall wall, become…",
      options: ["Solid", "Liquid", "Gas", "Heavier"],
      correctIndex: 2,
      hint: "Gases float up.",
    },
    {
      question: "Which state is hardest to grab?",
      options: ["Solid", "Liquid", "Gas", "All easy"],
      correctIndex: 2,
      hint: "Try catching air with your hands!",
    },
    {
      question: "Heat usually makes matter…",
      options: ["Shrink", "Expand", "Vanish", "Freeze"],
      correctIndex: 1,
      hint: "Particles spread out when warm.",
    },
  ],
  "mosque-systems": [
    {
      question: "Which state of matter is best for the walls?",
      options: ["Solid", "Liquid", "Gas", "None"],
      correctIndex: 0,
      hint: "Walls must keep their shape!",
    },
    {
      question: "Water in the fountain is which state?",
      options: ["Solid", "Liquid", "Gas", "All"],
      correctIndex: 1,
      hint: "It flows and splashes.",
    },
    {
      question: "The air we breathe inside is which state?",
      options: ["Solid", "Liquid", "Gas", "None"],
      correctIndex: 2,
      hint: "You can't see it, but it's everywhere.",
    },
    {
      question: "Which state can take the shape of a cup?",
      options: ["Solid", "Liquid", "Both liquid and gas", "Solid only"],
      correctIndex: 2,
      hint: "Things that fit their container.",
    },
    {
      question: "A roof must be made of…",
      options: ["Gas so it floats", "Liquid so it flows", "Solid so it holds", "Nothing"],
      correctIndex: 2,
      hint: "What state keeps its shape?",
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
      question: "لتعبر النهر يجب أن تصبح القطرة…",
      options: ["غاز لتطفو فوقه", "صلبة (جليد) لتمشي عليها", "تبقى سائلة", "تختفي"],
      correctIndex: 1,
      hint: "الجليد قوي بما يكفي للوقوف عليه.",
    },
    {
      question: "للمرور من فجوة ضيقة، تصبح…",
      options: ["صلبة كبيرة", "سائلة متدفقة", "لا شيء", "أكبر"],
      correctIndex: 1,
      hint: "السوائل تتشكل بأي شكل.",
    },
    {
      question: "للارتفاع فوق جدار طويل تصبح…",
      options: ["صلبة", "سائلة", "غاز", "أثقل"],
      correctIndex: 2,
      hint: "الغازات تطفو للأعلى.",
    },
    {
      question: "أصعب حالة في إمساكها هي…",
      options: ["الصلبة", "السائلة", "الغازية", "كلها سهلة"],
      correctIndex: 2,
      hint: "حاول أن تمسك الهواء بيدك!",
    },
    {
      question: "الحرارة عادةً تجعل المادة…",
      options: ["تنكمش", "تتمدد", "تختفي", "تتجمد"],
      correctIndex: 1,
      hint: "الجزيئات تنتشر مع الدفء.",
    },
  ],
  "mosque-systems": [
    {
      question: "أيّ حالة من المادة هي الأفضل للجدران؟",
      options: ["الصلب", "السائل", "الغاز", "لا شيء"],
      correctIndex: 0,
      hint: "الجدران يجب أن تحافظ على شكلها!",
    },
    {
      question: "ماء النافورة في أي حالة؟",
      options: ["الصلب", "السائل", "الغاز", "كلها"],
      correctIndex: 1,
      hint: "يتدفق ويتطاير.",
    },
    {
      question: "الهواء الذي نتنفسه في الداخل في أي حالة؟",
      options: ["الصلب", "السائل", "الغاز", "لا شيء"],
      correctIndex: 2,
      hint: "لا تراه لكنه في كل مكان.",
    },
    {
      question: "أيّ حالة يمكنها أن تأخذ شكل الكوب؟",
      options: ["الصلب", "السائل", "السائل والغاز", "الصلب فقط"],
      correctIndex: 2,
      hint: "أشياء تتشكل بحاوياتها.",
    },
    {
      question: "السقف يجب أن يكون من…",
      options: ["غاز ليطفو", "سائل ليتدفق", "صلب ليتماسك", "لا شيء"],
      correctIndex: 2,
      hint: "أي حالة تحافظ على شكلها؟",
    },
  ],
};

export function getQuiz(gameId: GameId, lang: Lang): QuizQuestion[] {
  return (lang === "ar" ? AR : EN)[gameId];
}
