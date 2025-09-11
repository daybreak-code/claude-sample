// 高考词汇数据库
const vocabularyData = {
    // Level 1 - 基础词汇
    level1: [
        { word: "abandon", type: "v.", meaning: "放弃，抛弃", example: "They abandoned the plan.", audio: "abandon.mp3" },
        { word: "ability", type: "n.", meaning: "能力，才能", example: "She has the ability to succeed.", audio: "ability.mp3" },
        { word: "absent", type: "adj.", meaning: "缺席的，不在的", example: "He was absent from class.", audio: "absent.mp3" },
        { word: "academy", type: "n.", meaning: "学院，研究院", example: "He joined the military academy.", audio: "academy.mp3" },
        { word: "accept", type: "v.", meaning: "接受，同意", example: "Please accept my apology.", audio: "accept.mp3" },
        { word: "accident", type: "n.", meaning: "事故，意外事件", example: "There was a car accident.", audio: "accident.mp3" },
        { word: "achieve", type: "v.", meaning: "实现，达到", example: "She achieved her goal.", audio: "achieve.mp3" },
        { word: "across", type: "prep.", meaning: "穿过，横过", example: "He walked across the street.", audio: "across.mp3" },
        { word: "act", type: "v.", meaning: "行动，表演", example: "She will act in the play.", audio: "act.mp3" },
        { word: "active", type: "adj.", meaning: "积极的，活跃的", example: "He is an active student.", audio: "active.mp3" },
        { word: "activity", type: "n.", meaning: "活动", example: "The school has many activities.", audio: "activity.mp3" },
        { word: "add", type: "v.", meaning: "添加，增加", example: "Add some sugar to the coffee.", audio: "add.mp3" },
        { word: "address", type: "n.", meaning: "地址，演讲", example: "What is your address?", audio: "address.mp3" },
        { word: "admire", type: "v.", meaning: "钦佩，赞赏", example: "I admire her courage.", audio: "admire.mp3" },
        { word: "admit", type: "v.", meaning: "承认，允许进入", example: "He admitted his mistake.", audio: "admit.mp3" },
        { word: "adopt", type: "v.", meaning: "采用，收养", example: "They adopted a child.", audio: "adopt.mp3" },
        { word: "adult", type: "n.", meaning: "成年人", example: "Adults must work.", audio: "adult.mp3" },
        { word: "advance", type: "v.", meaning: "前进，提前", example: "Technology has advanced greatly.", audio: "advance.mp3" },
        { word: "advantage", type: "n.", meaning: "优势，好处", example: "Height is an advantage in basketball.", audio: "advantage.mp3" },
        { word: "adventure", type: "n.", meaning: "冒险，奇遇", example: "The adventure was exciting.", audio: "adventure.mp3" },
        { word: "advice", type: "n.", meaning: "建议，忠告", example: "Can you give me some advice?", audio: "advice.mp3" },
        { word: "affect", type: "v.", meaning: "影响", example: "The weather affects my mood.", audio: "affect.mp3" },
        { word: "afford", type: "v.", meaning: "负担得起", example: "I can afford this car.", audio: "afford.mp3" },
        { word: "afraid", type: "adj.", meaning: "害怕的", example: "She is afraid of spiders.", audio: "afraid.mp3" },
        { word: "Africa", type: "n.", meaning: "非洲", example: "Africa is a large continent.", audio: "africa.mp3" },
        { word: "after", type: "prep.", meaning: "在...之后", example: "We will meet after class.", audio: "after.mp3" },
        { word: "afternoon", type: "n.", meaning: "下午", example: "We have class in the afternoon.", audio: "afternoon.mp3" },
        { word: "again", type: "adv.", meaning: "又，再次", example: "Please try again.", audio: "again.mp3" },
        { word: "against", type: "prep.", meaning: "反对，靠着", example: "He is against the plan.", audio: "against.mp3" },
        { word: "age", type: "n.", meaning: "年龄，时代", example: "What is your age?", audio: "age.mp3" }
    ],
    
    // Level 2 - 核心词汇
    level2: [
        { word: "behavior", type: "n.", meaning: "行为，举止", example: "His behavior was excellent.", audio: "behavior.mp3" },
        { word: "believe", type: "v.", meaning: "相信，认为", example: "I believe you are right.", audio: "believe.mp3" },
        { word: "belong", type: "v.", meaning: "属于", example: "This book belongs to me.", audio: "belong.mp3" },
        { word: "benefit", type: "n.", meaning: "好处，利益", example: "Exercise has many benefits.", audio: "benefit.mp3" },
        { word: "beside", type: "prep.", meaning: "在...旁边", example: "She sat beside me.", audio: "beside.mp3" },
        { word: "besides", type: "adv.", meaning: "而且，此外", example: "Besides, it's too expensive.", audio: "besides.mp3" },
        { word: "beyond", type: "prep.", meaning: "超过，在...之外", example: "The store is beyond the hill.", audio: "beyond.mp3" },
        { word: "bicycle", type: "n.", meaning: "自行车", example: "I ride my bicycle to school.", audio: "bicycle.mp3" },
        { word: "big", type: "adj.", meaning: "大的", example: "Elephants are big animals.", audio: "big.mp3" },
        { word: "bill", type: "n.", meaning: "账单，法案", example: "Please pay the bill.", audio: "bill.mp3" },
        { word: "bird", type: "n.", meaning: "鸟", example: "Birds can fly.", audio: "bird.mp3" },
        { word: "birth", type: "n.", meaning: "出生，诞生", example: "What is your date of birth?", audio: "birth.mp3" },
        { word: "birthday", type: "n.", meaning: "生日", example: "Happy birthday!", audio: "birthday.mp3" },
        { word: "bit", type: "n.", meaning: "小块，一点", example: "He ate a bit of cake.", audio: "bit.mp3" },
        { word: "bite", type: "v.", meaning: "咬", example: "Be careful, the dog bites.", audio: "bite.mp3" },
        { word: "bitter", type: "adj.", meaning: "苦的，痛苦的", example: "The medicine is bitter.", audio: "bitter.mp3" },
        { word: "black", type: "adj.", meaning: "黑色的", example: "The cat is black.", audio: "black.mp3" },
        { word: "blame", type: "v.", meaning: "责备，归咎于", example: "Don't blame me.", audio: "blame.mp3" },
        { word: "blind", type: "adj.", meaning: "瞎的，盲目的", example: "He is blind in one eye.", audio: "blind.mp3" },
        { word: "block", type: "n.", meaning: "街区，块", example: "I live two blocks away.", audio: "block.mp3" },
        { word: "blood", type: "n.", meaning: "血，血液", example: "Blood is red.", audio: "blood.mp3" },
        { word: "blow", type: "v.", meaning: "吹，打击", example: "The wind blows hard.", audio: "blow.mp3" },
        { word: "blue", type: "adj.", meaning: "蓝色的", example: "The sky is blue.", audio: "blue.mp3" },
        { word: "board", type: "n.", meaning: "木板，委员会", example: "He wrote on the board.", audio: "board.mp3" },
        { word: "boat", type: "n.", meaning: "小船", example: "We went fishing in a boat.", audio: "boat.mp3" },
        { word: "body", type: "n.", meaning: "身体，主体", example: "Exercise is good for the body.", audio: "body.mp3" },
        { word: "boil", type: "v.", meaning: "煮沸", example: "Water boils at 100°C.", audio: "boil.mp3" },
        { word: "bomb", type: "n.", meaning: "炸弹", example: "The bomb exploded.", audio: "bomb.mp3" },
        { word: "bond", type: "n.", meaning: "纽带，债券", example: "They have a strong bond.", audio: "bond.mp3" },
        { word: "bone", type: "n.", meaning: "骨头", example: "The dog buried the bone.", audio: "bone.mp3" },
        { word: "book", type: "n.", meaning: "书", example: "I am reading a book.", audio: "book.mp3" },
        { word: "boom", type: "n.", meaning: "繁荣，轰鸣声", example: "The economy is booming.", audio: "boom.mp3" },
        { word: "boost", type: "v.", meaning: "提升，促进", example: "The news boosted his confidence.", audio: "boost.mp3" }
    ],
    
    // Level 3 - 进阶词汇
    level3: [
        { word: "calculate", type: "v.", meaning: "计算，推测", example: "Calculate the total cost.", audio: "calculate.mp3" },
        { word: "calendar", type: "n.", meaning: "日历", example: "Check the calendar for the date.", audio: "calendar.mp3" },
        { word: "call", type: "v.", meaning: "打电话，称呼", example: "Call me tomorrow.", audio: "call.mp3" },
        { word: "calm", type: "adj.", meaning: "平静的", example: "The sea is calm today.", audio: "calm.mp3" },
        { word: "camera", type: "n.", meaning: "相机", example: "I took a photo with my camera.", audio: "camera.mp3" },
        { word: "camp", type: "n.", meaning: "营地", example: "We set up camp in the forest.", audio: "camp.mp3" },
        { word: "campaign", type: "n.", meaning: "运动，战役", example: "The advertising campaign was successful.", audio: "campaign.mp3" },
        { word: "campus", type: "n.", meaning: "校园", example: "The campus is beautiful.", audio: "campus.mp3" },
        { word: "can", type: "v.", meaning: "能，可以", example: "I can swim.", audio: "can.mp3" },
        { word: "canal", type: "n.", meaning: "运河", example: "The canal connects two rivers.", audio: "canal.mp3" },
        { word: "cancel", type: "v.", meaning: "取消", example: "They canceled the meeting.", audio: "cancel.mp3" },
        { word: "cancer", type: "n.", meaning: "癌症", example: "Doctors are researching cancer treatments.", audio: "cancer.mp3" },
        { word: "candidate", type: "n.", meaning: "候选人", example: "He is a candidate for president.", audio: "candidate.mp3" },
        { word: "capacity", type: "n.", meaning: "能力，容量", example: "The stadium has a large capacity.", audio: "capacity.mp3" },
        { word: "capital", type: "n.", meaning: "首都，资本", example: "Beijing is the capital of China.", audio: "capital.mp3" },
        { word: "captain", type: "n.", meaning: "船长，队长", example: "The captain led the team.", audio: "captain.mp3" },
        { word: "capture", type: "v.", meaning: "捕获，占领", example: "The police captured the thief.", audio: "capture.mp3" },
        { word: "car", type: "n.", meaning: "汽车", example: "She drives a red car.", audio: "car.mp3" },
        { word: "carbon", type: "n.", meaning: "碳", example: "Carbon is a chemical element.", audio: "carbon.mp3" },
        { word: "card", type: "n.", meaning: "卡片", example: "Send me a birthday card.", audio: "card.mp3" },
        { word: "care", type: "v.", meaning: "关心，在乎", example: "I care about you.", audio: "care.mp3" },
        { word: "career", type: "n.", meaning: "职业，生涯", example: "She has a successful career.", audio: "career.mp3" },
        { word: "careful", type: "adj.", meaning: "小心的", example: "Be careful with the glass.", audio: "careful.mp3" },
        { word: "careless", type: "adj.", meaning: "粗心的", example: "He made a careless mistake.", audio: "careless.mp3" },
        { word: "cargo", type: "n.", meaning: "货物", example: "The ship carried valuable cargo.", audio: "cargo.mp3" },
        { word: "carpet", type: "n.", meaning: "地毯", example: "We installed a new carpet.", audio: "carpet.mp3" },
        { word: "carry", type: "v.", meaning: "携带，搬运", example: "Can you carry this for me?", audio: "carry.mp3" },
        { word: "case", type: "n.", meaning: "情况，案例", example: "In that case, we should leave.", audio: "case.mp3" },
        { word: "cash", type: "n.", meaning: "现金", example: "Do you have any cash?", audio: "cash.mp3" },
        { word: "cast", type: "v.", meaning: "投掷，铸造", example: "The actor was cast in the role.", audio: "cast.mp3" },
        { word: "castle", type: "n.", meaning: "城堡", example: "The castle is very old.", audio: "castle.mp3" }
    ],
    
    // Level 4 - 高级词汇
    level4: [
        { word: "delicate", type: "adj.", meaning: "精致的，微妙的", example: "The vase is very delicate.", audio: "delicate.mp3" },
        { word: "delicious", type: "adj.", meaning: "美味的", example: "The food was delicious.", audio: "delicious.mp3" },
        { word: "delight", type: "n.", meaning: "高兴，快乐", example: "To my delight, I won the prize.", audio: "delight.mp3" },
        { word: "deliver", type: "v.", meaning: "递送，发表", example: "The mail is delivered at noon.", audio: "deliver.mp3" },
        { word: "demand", type: "v.", meaning: "要求，需求", example: "They demand better conditions.", audio: "demand.mp3" },
        { word: "democracy", type: "n.", meaning: "民主", example: "We live in a democracy.", audio: "democracy.mp3" },
        { word: "demonstrate", type: "v.", meaning: "证明，示威", example: "Can you demonstrate how it works?", audio: "demonstrate.mp3" },
        { word: "dense", type: "adj.", meaning: "密集的，浓密的", example: "The forest is very dense.", audio: "dense.mp3" },
        { word: "dental", type: "adj.", meaning: "牙科的", example: "She has a dental appointment.", audio: "dental.mp3" },
        { word: "deny", type: "v.", meaning: "否认，拒绝", example: "He denied the accusation.", audio: "deny.mp3" },
        { word: "depart", type: "v.", meaning: "离开，出发", example: "The train will depart soon.", audio: "depart.mp3" },
        { word: "depend", type: "v.", meaning: "依赖，取决于", example: "Children depend on their parents.", audio: "depend.mp3" },
        { word: "deposit", type: "v.", meaning: "存款，沉积", example: "She deposited money in the bank.", audio: "deposit.mp3" },
        { word: "depress", type: "v.", meaning: "使沮丧，压低", example: "The news depressed everyone.", audio: "depress.mp3" },
        { word: "depth", type: "n.", meaning: "深度", example: "The depth of the pool is 2 meters.", audio: "depth.mp3" },
        { word: "derive", type: "v.", meaning: "源于，推导", example: "We derive pleasure from helping others.", audio: "derive.mp3" },
        { word: "descend", type: "v.", meaning: "下降，下来", example: "The plane began to descend.", audio: "descend.mp3" },
        { word: "describe", type: "v.", meaning: "描述", example: "Can you describe the suspect?", audio: "describe.mp3" },
        { word: "desert", type: "n.", meaning: "沙漠", example: "Camels live in the desert.", audio: "desert.mp3" },
        { word: "deserve", type: "v.", meaning: "值得，应受", example: "You deserve a reward.", audio: "deserve.mp3" },
        { word: "design", type: "v.", meaning: "设计", example: "She designed the building.", audio: "design.mp3" },
        { word: "desire", type: "v.", meaning: "渴望，欲望", example: "I desire to travel the world.", audio: "desire.mp3" },
        { word: "desk", type: "n.", meaning: "书桌", example: "I work at my desk.", audio: "desk.mp3" },
        { word: "despair", type: "n.", meaning: "绝望", example: "He was in despair after the failure.", audio: "despair.mp3" },
        { word: "despite", type: "prep.", meaning: "尽管", example: "Despite the rain, we went out.", audio: "despite.mp3" },
        { word: "destroy", type: "v.", meaning: "破坏，毁灭", example: "The fire destroyed the house.", audio: "destroy.mp3" },
        { word: "detail", type: "n.", meaning: "细节", example: "Let me explain the details.", audio: "detail.mp3" },
        { word: "detect", type: "v.", meaning: "探测，发现", example: "The radar detected the aircraft.", audio: "detect.mp3" },
        { word: "determine", type: "v.", meaning: "决定，决心", example: "We need to determine the cause.", audio: "determine.mp3" },
        { word: "develop", type: "v.", meaning: "发展，开发", example: "The city is developing rapidly.", audio: "develop.mp3" }
    ],
    
    // Level 5 - 专家词汇
    level5: [
        { word: "elaborate", type: "adj.", meaning: "精心制作的，复杂的", example: "She made an elaborate plan.", audio: "elaborate.mp3" },
        { word: "elastic", type: "adj.", meaning: "有弹性的", example: "The rubber band is elastic.", audio: "elastic.mp3" },
        { word: "elect", type: "v.", meaning: "选举", example: "The people will elect their leaders.", audio: "elect.mp3" },
        { word: "electric", type: "adj.", meaning: "电的", example: "This is an electric car.", audio: "electric.mp3" },
        { word: "electricity", type: "n.", meaning: "电力", example: "The house has electricity.", audio: "electricity.mp3" },
        { word: "electron", type: "n.", meaning: "电子", example: "Electrons orbit the nucleus.", audio: "electron.mp3" },
        { word: "electronic", type: "adj.", meaning: "电子的", example: "I have an electronic device.", audio: "electronic.mp3" },
        { word: "elegant", type: "adj.", meaning: "优雅的", example: "She has elegant manners.", audio: "elegant.mp3" },
        { word: "element", type: "n.", meaning: "元素，要素", example: "Hydrogen is a chemical element.", audio: "element.mp3" },
        { word: "elementary", type: "adj.", meaning: "基本的，初级的", example: "This is elementary school.", audio: "elementary.mp3" },
        { word: "elevate", type: "v.", meaning: "提升，举起", example: "They elevated him to manager.", audio: "elevate.mp3" },
        { word: "elevator", type: "n.", meaning: "电梯", example: "Take the elevator to the 10th floor.", audio: "elevator.mp3" },
        { word: "eliminate", type: "v.", meaning: "消除，淘汰", example: "We need to eliminate the errors.", audio: "eliminate.mp3" },
        { word: "elite", type: "n.", meaning: "精英", example: "They are the elite of society.", audio: "elite.mp3" },
        { word: "embarrass", type: "v.", meaning: "使尴尬", example: "His question embarrassed her.", audio: "embarrass.mp3" },
        { word: "embrace", type: "v.", meaning: "拥抱，包含", example: "She embraced her child.", audio: "embrace.mp3" },
        { word: "emerge", type: "v.", meaning: "出现，浮现", example: "The sun emerged from the clouds.", audio: "emerge.mp3" },
        { word: "emergency", type: "n.", meaning: "紧急情况", example: "Call 911 in an emergency.", audio: "emergency.mp3" },
        { word: "emigrate", type: "v.", meaning: "移居国外", example: "They emigrated to Canada.", audio: "emigrate.mp3" },
        { word: "emit", type: "v.", meaning: "发出，排放", example: "The factory emits smoke.", audio: "emit.mp3" },
        { word: "emotion", type: "n.", meaning: "情感，情绪", example: "Love is a powerful emotion.", audio: "emotion.mp3" },
        { word: "emotional", type: "adj.", meaning: "情感的", example: "She is very emotional.", audio: "emotional.mp3" },
        { word: "emperor", type: "n.", meaning: "皇帝", example: "The emperor ruled the empire.", audio: "emperor.mp3" },
        { word: "emphasis", type: "n.", meaning: "强调，重点", example: "The teacher placed emphasis on grammar.", audio: "emphasis.mp3" },
        { word: "emphasize", type: "v.", meaning: "强调", example: "I emphasize the importance of practice.", audio: "emphasize.mp3" },
        { word: "empire", type: "n.", meaning: "帝国", example: "The Roman Empire was vast.", audio: "empire.mp3" },
        { word: "employ", type: "v.", meaning: "雇佣，使用", example: "The company employs 100 people.", audio: "employ.mp3" },
        { word: "employee", type: "n.", meaning: "员工", example: "She is a happy employee.", audio: "employee.mp3" },
        { word: "employer", type: "n.", meaning: "雇主", example: "The employer treated everyone well.", audio: "employer.mp3" },
        { word: "employment", type: "n.", meaning: "就业，雇佣", example: "The employment rate is high.", audio: "employment.mp3" }
    ]
};

// 成就系统数据
const achievements = [
    {
        id: "first_day",
        name: "初来乍到",
        description: "完成第一天学习",
        icon: "fas fa-star",
        reward: 100,
        unlocked: false,
        condition: { type: "days", value: 1 }
    },
    {
        id: "week_streak",
        name: "连续学习",
        description: "连续学习7天",
        icon: "fas fa-fire",
        reward: 300,
        unlocked: false,
        condition: { type: "streak", value: 7 }
    },
    {
        id: "word_master",
        name: "词汇大师",
        description: "掌握1000个单词",
        icon: "fas fa-brain",
        reward: 500,
        unlocked: false,
        condition: { type: "words", value: 1000 }
    },
    {
        id: "perfect_score",
        name: "完美表现",
        description: "单次测试达到100%准确率",
        icon: "fas fa-bullseye",
        reward: 200,
        unlocked: false,
        condition: { type: "perfect_test", value: 100 }
    },
    {
        id: "speed_learner",
        name: "快速学习者",
        description: "1分钟内完成10个单词",
        icon: "fas fa-bolt",
        reward: 150,
        unlocked: false,
        condition: { type: "speed", value: 10 }
    },
    {
        id: "early_bird",
        name: "早起的鸟儿",
        description: "连续5天在6点前学习",
        icon: "fas fa-sun",
        reward: 250,
        unlocked: false,
        condition: { type: "early_days", value: 5 }
    },
    {
        id: "night_owl",
        name: "夜猫子",
        description: "连续5天在10点后学习",
        icon: "fas fa-moon",
        reward: 250,
        unlocked: false,
        condition: { type: "late_days", value: 5 }
    },
    {
        id: "social_butterfly",
        name: "社交达人",
        description: "邀请5个好友加入",
        icon: "fas fa-users",
        reward: 300,
        unlocked: false,
        condition: { type: "invites", value: 5 }
    },
    {
        id: "vocabulary_hero",
        name: "词汇英雄",
        description: "掌握3000个单词",
        icon: "fas fa-crown",
        reward: 1000,
        unlocked: false,
        condition: { type: "words", value: 3000 }
    },
    {
        id: "consistency_king",
        name: "坚持之王",
        description: "连续学习30天",
        icon: "fas fa-medal",
        reward: 800,
        unlocked: false,
        condition: { type: "streak", value: 30 }
    }
];

// 用户数据模板
const userTemplate = {
    username: "冒险者",
    level: 1,
    experience: 0,
    points: 0,
    streak: 0,
    totalWords: 0,
    masteredWords: 0,
    todayWords: 0,
    lastLogin: null,
    loginStreak: 0,
    achievements: [],
    progress: {
        level1: { completed: 0, total: 30, mastered: [] },
        level2: { completed: 0, total: 30, mastered: [] },
        level3: { completed: 0, total: 30, mastered: [] },
        level4: { completed: 0, total: 30, mastered: [] },
        level5: { completed: 0, total: 30, mastered: [] }
    },
    history: {
        daily: [],
        tests: [],
        achievements: []
    },
    settings: {
        dailyGoal: 20,
        soundEnabled: true,
        theme: "default",
        difficulty: "normal"
    }
};

// 游戏配置
const gameConfig = {
    livesPerLevel: 3,
    pointsPerWord: 10,
    bonusPointsMultiplier: 2,
    timeBonusThreshold: 30,
    maxWordsPerSession: 20,
    reviewInterval: 24, // hours
    streakBonus: 50,
    perfectTestBonus: 100,
    dailyLoginBonus: 20
};

// 学习算法配置
const learningAlgorithm = {
    newWordsPerSession: 7,
    reviewWordsPerSession: 13,
    difficultyLevels: [1, 2, 3, 4, 5],
    correctThreshold: 3, // 连续答对3次认为掌握
    incorrectThreshold: 2, // 连续答错2次需要重点复习
    reviewWeights: {
        justLearned: 1,
        needReview: 2,
        mastered: 0.5
    }
};

// 测试模式配置
const testModes = {
    quick: {
        name: "快速测试",
        duration: 5,
        questionCount: 20,
        points: 50,
        timePerQuestion: 15
    },
    deep: {
        name: "深度测试",
        duration: 20,
        questionCount: 100,
        points: 200,
        timePerQuestion: 12
    },
    challenge: {
        name: "挑战模式",
        duration: 3,
        questionCount: Infinity,
        points: "multiplier",
        timePerQuestion: 10
    },
    spelling: {
        name: "拼写大赛",
        duration: 15,
        questionCount: 50,
        points: 150,
        timePerQuestion: 20
    }
};

// 初始化数据
function initializeData() {
    // 从localStorage加载用户数据
    let userData = localStorage.getItem('wordGameUserData');
    if (!userData) {
        userData = JSON.parse(JSON.stringify(userTemplate));
        localStorage.setItem('wordGameUserData', JSON.stringify(userData));
    } else {
        userData = JSON.parse(userData);
    }
    
    // 检查并更新连续登录天数
    checkAndUpdateStreak(userData);
    
    return userData;
}

// 检查并更新连续登录天数
function checkAndUpdateStreak(userData) {
    const today = new Date().toDateString();
    const lastLogin = userData.lastLogin ? new Date(userData.lastLogin).toDateString() : null;
    
    if (lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastLogin === yesterday.toDateString()) {
            userData.loginStreak++;
            userData.streak = userData.loginStreak;
            userData.points += gameConfig.dailyLoginBonus;
        } else {
            userData.loginStreak = 1;
            userData.streak = 1;
        }
        
        userData.lastLogin = new Date().toISOString();
        userData.todayWords = 0;
        
        // 每日登录奖励
        if (userData.loginStreak > 1) {
            userData.points += gameConfig.streakBonus;
        }
    }
    
    localStorage.setItem('wordGameUserData', JSON.stringify(userData));
}

// 获取用户数据
function getUserData() {
    return JSON.parse(localStorage.getItem('wordGameUserData') || JSON.stringify(userTemplate));
}

// 保存用户数据
function saveUserData(userData) {
    localStorage.setItem('wordGameUserData', JSON.stringify(userData));
}

// 获取指定级别的词汇
getVocabularyByLevel = function(level) {
    return vocabularyData[level] || [];
}

// 获取随机词汇
getRandomWords = function(level, count) {
    const words = vocabularyData[level] || [];
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 获取复习词汇
getReviewWords = function(level, count) {
    const userData = getUserData();
    const reviewWords = [];
    
    // 获取需要复习的单词
    Object.keys(userData.progress).forEach(levelKey => {
        const levelProgress = userData.progress[levelKey];
        if (levelProgress.mastered.length > 0) {
            // 添加一些已掌握的单词进行复习
            const masteredWords = vocabularyData[levelKey].filter(word => 
                levelProgress.mastered.includes(word.word)
            );
            reviewWords.push(...masteredWords.slice(0, Math.ceil(count / 2)));
        }
    });
    
    return reviewWords.slice(0, count);
}

// 检查成就
checkAchievements = function(userData) {
    const newlyUnlocked = [];
    
    achievements.forEach(achievement => {
        if (!achievement.unlocked && !userData.achievements.includes(achievement.id)) {
            let shouldUnlock = false;
            
            switch (achievement.condition.type) {
                case 'days':
                    shouldUnlock = userData.loginStreak >= achievement.condition.value;
                    break;
                case 'streak':
                    shouldUnlock = userData.streak >= achievement.condition.value;
                    break;
                case 'words':
                    shouldUnlock = userData.masteredWords >= achievement.condition.value;
                    break;
                case 'perfect_test':
                    // 检查最近是否有完美测试
                    const recentTests = userData.history.tests.slice(-5);
                    shouldUnlock = recentTests.some(test => test.accuracy === 100);
                    break;
            }
            
            if (shouldUnlock) {
                achievement.unlocked = true;
                userData.achievements.push(achievement.id);
                userData.points += achievement.reward;
                newlyUnlocked.push(achievement);
            }
        }
    });
    
    if (newlyUnlocked.length > 0) {
        saveUserData(userData);
    }
    
    return newlyUnlocked;
}