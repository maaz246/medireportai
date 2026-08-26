export interface BlogPost {
  id: string;
  slug: string;
  image: string;
  date: string;
  readTime: {
    en: string;
    ur: string;
  };
  category: {
    en: string;
    ur: string;
  };
  title: {
    en: string;
    ur: string;
  };
  excerpt: {
    en: string;
    ur: string;
  };
  content: {
    en: string[];
    ur: string[];
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "how-it-works",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    date: "Aug 22, 2026",
    readTime: {
      en: "4 min read",
      ur: "۴ منٹ مطالعہ"
    },
    category: {
      en: "Architecture & Tech",
      ur: "ٹیکنالوجی اور ڈیزائن"
    },
    title: {
      en: "How MediReport AI Works",
      ur: "میڈی رپورٹ AI کیسے کام کرتا ہے"
    },
    excerpt: {
      en: "Discover how our advanced neural networks break down complex lab tests into simple, understandable insights in seconds.",
      ur: "جانئے کہ ہمارا جدید نیورل نیٹ ورک کس طرح پیچیدہ لیب ٹیسٹوں کو سیکنڈوں میں سادہ اور فہم بصیرت میں تبدیل کرتا ہے۔"
    },
    content: {
      en: [
        "Medical reports are traditionally written in dense clinical terminology that can feel overwhelming to non-medical readers. MediReport AI bridge this gap using optical character recognition (OCR) and specialized medical language models.",
        "When a user uploads a PDF or photo of a medical report, our optical engine securely extracts raw numerical data, lab ranges, and diagnostic notes.",
        "Next, our fine-tuned AI analyzes reference ranges based on age, gender, and standard medical benchmarks. It highlights key metrics such as hemoglobin, blood sugar, lipid profiles, and liver enzymes.",
        "Finally, the platform converts these findings into plain language summaries, risk indicators, and tailored questions you can ask your primary healthcare physician during your next visit."
      ],
      ur: [
        "طبی رپورٹس رواں دواں ڈاکٹری اصطلاحات میں لکھی جاتی ہیں جو عام مریض کے لیے سمجھنا کافی مشکل ہوتی ہیں۔ میڈی رپورٹ AI اس خلا کو جدید ٹیکنالوجی کے ذریعے پر کرتا ہے۔",
        "جب صارف طبی رپورٹ کی تصویر یا فائل اپ لوڈ کرتا ہے، تو ہمارا اینجن ڈیٹا اور لیبارٹری ویلیوز کو محفوظ طریقے سے سکین کرتا ہے۔",
        "اس کے بعد ہمارا ذی ہوش ای آئی ماڈل حوالہ جات کے مطابق عمر اور جنس کے تناسب سے ان کا موازنہ کرتا ہے۔",
        "آخر میں، پلیٹ فارم تمام نتائج کو سادہ اور واضح الفاظ میں پیش کرتا ہے تاکہ آپ اپنے ڈاکٹر کے ساتھ بہتر مشاورت کر سکیں۔"
      ]
    }
  },
  {
    id: "2",
    slug: "ai-in-medicine",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
    date: "Aug 20, 2026",
    readTime: {
      en: "5 min read",
      ur: "۵ منٹ مطالعہ"
    },
    category: {
      en: "Medical AI Innovation",
      ur: "طبی ای آئی جدت"
    },
    title: {
      en: "The Importance of AI in Modern Medicine",
      ur: "جدید طبی سائنس میں AI کی اہمیت"
    },
    excerpt: {
      en: "Exploring how artificial intelligence reduces diagnostic errors, speeds up triage, and empowers patients globally.",
      ur: "جانئے کہ مصنوعی ذہانت کس طرح تشخیصی غلطیوں کو کم کرتی ہے اور مریضوں کو بااختیار بناتی ہے۔"
    },
    content: {
      en: [
        "Artificial Intelligence is revolutionizing modern healthcare by serving as an intelligent copilot for medical professionals and patients alike.",
        "By processing millions of anonymized data points in seconds, AI algorithms can detect subtle anomalies in bloodwork, radiology scans, and genetic markers long before visible symptoms appear.",
        "Beyond diagnostic accuracy, AI drastically improves accessibility. Patients living in remote or underserved regions gain immediate clarity on their diagnostic reports without waiting days for initial interpretation.",
        "As AI technology continues to evolve, the combination of clinical expertise and predictive algorithms will usher in an era of preventive, highly personalized medicine."
      ],
      ur: [
        "مصنوعی ذہانت جدید صحت کی دیکھ بھال میں ایک بہترین معاون کے طور پر انقلاب برپا کر رہی ہے۔",
        "لاکھوں ڈیٹا پوائنٹس کا تیزی سے تجزیہ کر کے ای آئی الگورتھم خون کی رپورٹس اور اٹیچمنٹس میں باریک تر نسیجی تبدیلیاں پکڑ سکتے ہیں۔",
        "تشخیصی درستگی کے علاوہ، ای آئی ریموٹ علاقوں میں رہنے والے مریضوں کو فوری بصیرت فراہم کرتی ہے۔",
        "جیسے جیسے یہ ٹیکنالوجی مزید ترقی کرے گی، طبی تجربے اور ای آئی کا امتزاج انسدادی علاج کے ایک نئے دور کو جنم دے گا۔"
      ]
    }
  },
  {
    id: "3",
    slug: "understanding-lab-tests",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    date: "Aug 18, 2026",
    readTime: {
      en: "6 min read",
      ur: "۶ منٹ مطالعہ"
    },
    category: {
      en: "Patient Empowerment",
      ur: "صحت آگاہی"
    },
    title: {
      en: "Understanding Lab Test Results with AI",
      ur: "ای آئی کی مدد سے لیب ٹیسٹ کے نتائج کو سمجھنا"
    },
    excerpt: {
      en: "Learn what blood markers, CBC, and metabolic panels mean for your health with instant AI breakdown.",
      ur: "بلڈ مارکرز اور میٹابولک پینل کے نتائج کا آسان الفاظ میں تجزیہ حاصل کریں۔"
    },
    content: {
      en: [
        "Complete Blood Count (CBC), Comprehensive Metabolic Panels (CMP), and Thyroid profiles contain vital indicators of your internal organ health.",
        "Understanding these values allows individuals to proactively adjust their diet, lifestyle, and exercise routine long before minor deviations turn into chronic conditions.",
        "MediReport AI translates cryptic abbreviations like WBC, HbA1c, ALT, and TSH into clear progress bars and digestible explanations.",
        "Equipped with this knowledge, patients can engage in more meaningful discussions with doctors and take active ownership of their long-term wellness."
      ],
      ur: [
        "سی بی سی، میٹابولک پینل اور تھائرائیڈ پروفائل آپ کے اندرونی اعضاء کی صحت کے اہم اشاریے فراہم کرتے ہیں۔",
        "ان اقدار کو سمجھنے سے فرد کو اپنی خوراک اور لائف سٹائل میں وقت پر بہتری لانے کا موقع ملتا ہے۔",
        "میڈی رپورٹ AI مشکل اصطلاحات کو سادہ چارٹس اور واضح وضاحتوں میں بدل دیتا ہے۔",
        "اس علم کے ساتھ مریض اپنے ڈاکٹر سے زیادہ نتیجہ خیز بات چیت کر سکتے ہیں۔"
      ]
    }
  },
  {
    id: "4",
    slug: "future-of-healthcare",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    date: "Aug 15, 2026",
    readTime: {
      en: "4 min read",
      ur: "۴ منٹ مطالعہ"
    },
    category: {
      en: "Future Vision",
      ur: "مستقبل کی وژن"
    },
    title: {
      en: "The Future of Personalized Healthcare",
      ur: "شخصی نوعیت کی صحت کی دیکھ بھال کا مستقبل"
    },
    excerpt: {
      en: "How predictive analytics and AI insights enable proactive wellness and early disease detection.",
      ur: "پیش گوئی کے تجزیات اور ای آئی بصیرتیں کس طرح بیماریاں پہلے سے معلوم کرنے میں مددگار ہوتی ہیں۔"
    },
    content: {
      en: [
        "Healthcare is rapidly shifting from reactive disease treatment to proactive, personalized longevity optimization.",
        "With continuous health data from wearables combined with periodic lab reports, AI models construct dynamic digital twins of patient health.",
        "This holistic view allows algorithms to alert patients to early biomarker shifts long before symptom onset.",
        "MediReport AI is proud to pioneer this user-centric transformation, placing medical intelligence directly into the hands of every individual."
      ],
      ur: [
        "صحت کی دیکھ بھال اب بیماری کے بعد کے علاج سے آگے بڑھ کر بروقت تندرستی کی طرف منتقل ہو رہی ہے۔",
        "ذی ہوش ای آئی ماڈلز آپ کی صحت کی تاریخ کا جائزہ لے کر مستقبل کی پیشن گوئی کرتے ہیں۔",
        "یہ طریقہ کار مریض کوعلامات ظاہر ہونے سے بہت پہلے خبردار کر دیتا ہے۔",
        "میڈی رپورٹ AI اس جدید مستقبل کی باگ ڈور ہر فرد کے ہاتھ میں دینے کے لیے کوشاں ہے۔"
      ]
    }
  }
];
