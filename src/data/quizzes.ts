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
      question: "Which state of matter has a fixed shape?",
      options: ["Gas", "Liquid", "Solid", "All of them"],
      correctIndex: 2,
      hint: "Think of an ice cube — it keeps its shape!",
    },
    {
      question: "What happens to particles when it gets colder?",
      options: [
        "They move faster and spread out.",
        "They stay the same.",
        "They slow down and get closer together.",
        "They disappear.",
      ],
      correctIndex: 2,
      hint: "Try lowering the temperature and watch what happens!",
    },
    {
      question: "Which one takes the shape of its container?",
      options: ["Solid only", "Liquid and gas", "Gas only", "Solid and gas"],
      correctIndex: 1,
      hint: "Pour water into a cup — what shape is it now?",
    },
    {
      question: "When water boils, it turns into…",
      options: ["Ice (solid)", "Steam (gas)", "Sand", "Nothing"],
      correctIndex: 1,
      hint: "Look at a kettle when it whistles — that cloud is steam!",
    },
    {
      question: "Which has the most space between particles?",
      options: ["Solid", "Liquid", "Gas", "They are all the same"],
      correctIndex: 2,
      hint: "Gas particles love to spread out everywhere!",
    },
  ],
  "water-the-plant": [
    {
      question: "Plants need water in which state to drink it up?",
      options: ["Solid", "Liquid", "Gas", "Any state"],
      correctIndex: 1,
      hint: "Roots sip up water — it must flow!",
    },
    {
      question: "How can ice become water?",
      options: ["By freezing it", "By heating it", "By shaking it", "By hiding it"],
      correctIndex: 1,
      hint: "Warm things make solids melt.",
    },
    {
      question: "Steam rising from a hot pot is in which state?",
      options: ["Solid", "Liquid", "Gas", "All of them"],
      correctIndex: 2,
      hint: "It floats up into the air.",
    },
    {
      question: "Which would help a droplet climb up faster?",
      options: ["Become a heavy solid", "Become a light gas", "Stay still", "Get colder"],
      correctIndex: 1,
      hint: "Light things rise!",
    },
    {
      question: "What is the same in ice, water, and steam?",
      options: [
        "Their shape",
        "Their state",
        "They are all made of water particles",
        "Nothing",
      ],
      correctIndex: 2,
      hint: "Only the state changes — the stuff is the same.",
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
      question: "أي حالة من حالات المادة لها شكل ثابت؟",
      options: ["الغاز", "السائل", "الصلب", "كلها"],
      correctIndex: 2,
      hint: "فكّر في مكعب الثلج — يحافظ على شكله!",
    },
    {
      question: "ماذا يحدث للجزيئات عندما يصبح الجو أكثر برودة؟",
      options: [
        "تتحرك بشكل أسرع وتنتشر.",
        "تبقى كما هي.",
        "تبطئ وتتقارب من بعضها.",
        "تختفي.",
      ],
      correctIndex: 2,
      hint: "جرّب خفض درجة الحرارة وشاهد ماذا يحدث!",
    },
    {
      question: "أيّها يأخذ شكل الوعاء الذي يوضع فيه؟",
      options: ["الصلب فقط", "السائل والغاز", "الغاز فقط", "الصلب والغاز"],
      correctIndex: 1,
      hint: "اسكب الماء في كوب — ما شكله الآن؟",
    },
    {
      question: "عندما يغلي الماء يتحول إلى…",
      options: ["جليد (صلب)", "بخار (غاز)", "رمل", "لا شيء"],
      correctIndex: 1,
      hint: "انظر إلى الإبريق عندما يصفر — هذا البخار!",
    },
    {
      question: "أيّها له أكبر مسافة بين جزيئاته؟",
      options: ["الصلب", "السائل", "الغاز", "كلها متشابهة"],
      correctIndex: 2,
      hint: "جزيئات الغاز تحب أن تنتشر في كل مكان!",
    },
  ],
  "water-the-plant": [
    {
      question: "النباتات تحتاج الماء بأي حالة لتشربه؟",
      options: ["صلب", "سائل", "غاز", "أي حالة"],
      correctIndex: 1,
      hint: "الجذور ترتشف الماء — يجب أن يتدفق!",
    },
    {
      question: "كيف يتحول الجليد إلى ماء؟",
      options: ["بتجميده", "بتسخينه", "بهزّه", "بإخفائه"],
      correctIndex: 1,
      hint: "الحرارة تذيب المواد الصلبة.",
    },
    {
      question: "البخار المتصاعد من القدر الساخن في أي حالة؟",
      options: ["صلب", "سائل", "غاز", "كلها"],
      correctIndex: 2,
      hint: "يطفو إلى الأعلى في الهواء.",
    },
    {
      question: "ما الذي يساعد القطرة على الصعود بسرعة؟",
      options: ["أن تصبح صلبة ثقيلة", "أن تصبح غاز خفيف", "البقاء ساكنة", "أن تبرد"],
      correctIndex: 1,
      hint: "الأشياء الخفيفة ترتفع!",
    },
    {
      question: "ما المشترك بين الجليد والماء والبخار؟",
      options: ["شكلها", "حالتها", "كلها مكوّنة من جزيئات الماء", "لا شيء"],
      correctIndex: 2,
      hint: "تتغير الحالة فقط — المادة هي نفسها.",
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
