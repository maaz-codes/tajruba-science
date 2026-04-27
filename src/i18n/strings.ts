export type Lang = "en" | "ar";

export const STRINGS = {
  en: {
    brandTagline: "Science",
    heroTitle: "Let's explore, experiment\n& discover!",
    heroSubtitle: "Tajruba Science is your place to play, learn and do awesome science.",
    letsGo: "Let's go!",
    comingSoon: "Coming Soon",
    soManyTopics: "So many topics to explore!",
    allTopics: "All Topics",
    backToTopic: "Back to topic",
    audio: "Audio",
    soundOn: "Sound on",
    soundOff: "Sound off",
    english: "English",
    arabic: "العربية",

    // Topic page
    statesOfMatterTitle: "States of Matter",
    statesOfMatterIntro1: "Everything around us is made of tiny particles.",
    statesOfMatterIntro2: "They can be solid, liquid, or gas!",
    solid: "Solid",
    liquid: "Liquid",
    gas: "Gas",
    letsExploreMatter: "Let's explore the world of matter together!",
    startHere: "Start here!",
    playInOrder: "Play the games in order to become a Matter Explorer!",

    // Games meta
    games: {
      "make-your-own-matter": {
        title: "Make Your Own Matter",
        desc: "Drop particles into a container and watch them form a solid, liquid, or gas.",
        subtitle: "Add particles and change the temperature.",
      },
      "water-the-plant": {
        title: "Water the Plant",
        desc: "Change a droplet's state to climb up a tall building and reach a thirsty plant.",
        subtitle: "Help the droplet reach the plant.",
      },
      "wadi-crossing": {
        title: "Wadi Crossing",
        desc: "Switch states to get past rivers, gaps, and obstacles in a desert valley.",
        subtitle: "Cross the valley by switching states.",
      },
      "mosque-systems": {
        title: "Mosque Systems",
        desc: "Pick the right state of matter for each part of a big building.",
        subtitle: "Match each material to its job.",
      },
    },

    // Game UI
    particlesAdded: "Particles added",
    chooseParticles: "Choose particles",
    dragHint: "Drag a particle type and drop it in the container.",
    temperature: "Temperature",
    cool: "Cool",
    hot: "Hot",
    solidLegend: "Stays in shape",
    liquidLegend: "Flows around",
    gasLegend: "Spreads everywhere",
    gasShort: "Light & spread out",
    liquidShort: "Close & flow around",
    solidShort: "Packed & fixed shape",

    // Quiz
    quiz: "Quiz",
    questionOf: (n: number, t: number) => `Question ${n} of ${t}`,
    getHint: "Get a hint",
    starsYouCanEarn: "Stars you can earn",
    quizCompleteTitle: "Great job!",
    quizCompleteSub: (s: number) => `You earned ${s} star${s === 1 ? "" : "s"}.`,
    backToTopicBtn: "Back to topic",
    comingSoonBody: "This game is coming soon. Finish the first game to keep exploring!",
  },
  ar: {
    brandTagline: "العلوم",
    heroTitle: "هيا نستكشف ونجرب ونكتشف!",
    heroSubtitle: "تجربة العلوم هي مكانك للعب والتعلم وعمل تجارب رائعة.",
    letsGo: "هيا بنا!",
    comingSoon: "قريباً",
    soManyTopics: "هناك الكثير من المواضيع لاستكشافها!",
    allTopics: "كل المواضيع",
    backToTopic: "العودة للموضوع",
    audio: "الصوت",
    soundOn: "الصوت مفعل",
    soundOff: "الصوت مغلق",
    english: "English",
    arabic: "العربية",

    statesOfMatterTitle: "حالات المادة",
    statesOfMatterIntro1: "كل شيء حولنا يتكون من جزيئات صغيرة.",
    statesOfMatterIntro2: "يمكن أن تكون صلبة أو سائلة أو غازية!",
    solid: "صلب",
    liquid: "سائل",
    gas: "غاز",
    letsExploreMatter: "هيا نستكشف عالم المادة معاً!",
    startHere: "ابدأ هنا!",
    playInOrder: "العب الألعاب بالترتيب لتصبح مستكشف المادة!",

    games: {
      "make-your-own-matter": {
        title: "اصنع مادتك بنفسك",
        desc: "ضع جزيئات في الوعاء وشاهدها تتحول إلى صلب أو سائل أو غاز.",
        subtitle: "أضف جزيئات وغيّر درجة الحرارة.",
      },
      "water-the-plant": {
        title: "اسقِ النبتة",
        desc: "غيّر حالة قطرة الماء لتتسلق المبنى وتصل إلى النبتة العطشى.",
        subtitle: "ساعد القطرة على الوصول للنبتة.",
      },
      "wadi-crossing": {
        title: "عبور الوادي",
        desc: "بدّل الحالات لتجتاز الأنهار والفجوات في وادٍ صحراوي.",
        subtitle: "اعبر الوادي بتبديل الحالات.",
      },
      "mosque-systems": {
        title: "أنظمة المسجد",
        desc: "اختر حالة المادة المناسبة لكل جزء من المبنى الكبير.",
        subtitle: "طابق كل مادة مع وظيفتها.",
      },
    },

    particlesAdded: "الجزيئات المضافة",
    chooseParticles: "اختر الجزيئات",
    dragHint: "اسحب نوع جزيء وأفلته في الوعاء.",
    temperature: "درجة الحرارة",
    cool: "بارد",
    hot: "ساخن",
    solidLegend: "يحافظ على شكله",
    liquidLegend: "يتدفق حوله",
    gasLegend: "ينتشر في كل مكان",
    gasShort: "خفيف ومنتشر",
    liquidShort: "متقارب ومتدفق",
    solidShort: "متراص وثابت الشكل",

    quiz: "اختبار",
    questionOf: (n: number, t: number) => `السؤال ${n} من ${t}`,
    getHint: "احصل على تلميح",
    starsYouCanEarn: "النجوم التي يمكنك كسبها",
    quizCompleteTitle: "أحسنت!",
    quizCompleteSub: (s: number) => `لقد ربحت ${s} نجمة.`,
    backToTopicBtn: "العودة للموضوع",
    comingSoonBody: "هذه اللعبة قريباً. أكمل اللعبة الأولى لمتابعة الاستكشاف!",
  },
} as const;

export type Strings = typeof STRINGS.en;
