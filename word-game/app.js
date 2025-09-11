// 主应用程序文件
class WordGameApp {
    constructor() {
        this.userData = null;
        this.currentLevel = 1;
        this.currentWordIndex = 0;
        this.currentWords = [];
        this.currentTest = null;
        this.lives = 3;
        this.points = 0;
        this.correctAnswers = 0;
        this.totalAnswers = 0;
        this.startTime = null;
        this.timer = null;
        this.soundEnabled = true;
        
        this.init();
    }
    
    init() {
        // 初始化用户数据
        this.userData = initializeData();
        
        // 绑定导航事件
        this.bindNavigation();
        
        // 初始化界面
        this.updateUI();
        
        // 绑定学习模式事件
        this.bindLearningEvents();
        
        // 绑定测试模式事件
        this.bindTestEvents();
        
        // 初始化热力图
        this.initHeatmap();
        
        // 检查成就
        this.checkAchievements();
        
        // 每日数据更新
        this.updateDailyData();
    }
    
    // 绑定导航事件
    bindNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const page = item.getAttribute('data-page');
                this.navigateTo(page);
                
                // 更新活动状态
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
    
    // 页面导航
    navigateTo(pageName) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        
        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.classList.add('active');
            this.loadPageData(pageName);
        }
    }
    
    // 加载页面数据
    loadPageData(pageName) {
        switch (pageName) {
            case 'home':
                this.loadHomePage();
                break;
            case 'learn':
                this.loadLearnPage();
                break;
            case 'test':
                this.loadTestPage();
                break;
            case 'progress':
                this.loadProgressPage();
                break;
            case 'achievements':
                this.loadAchievementsPage();
                break;
        }
    }
    
    // 加载首页数据
    loadHomePage() {
        document.getElementById('todayWords').textContent = this.userData.todayWords;
        document.getElementById('masteredWords').textContent = this.userData.masteredWords;
        document.getElementById('currentStreak').textContent = this.userData.streak;
        document.getElementById('achievementPoints').textContent = this.userData.points;
        
        // 更新进度条
        const todayProgress = (this.userData.todayWords / this.userData.settings.dailyGoal) * 100;
        document.getElementById('todayProgress').style.width = `${Math.min(todayProgress, 100)}%`;
        
        const masteryProgress = (this.userData.masteredWords / 3500) * 100;
        document.getElementById('masteryProgress').style.width = `${masteryProgress}%`;
    }
    
    // 加载学习页面
    loadLearnPage() {
        // 更新关卡进度
        this.updateLevelProgress();
        
        // 检查关卡解锁状态
        this.updateLevelUnlockStatus();
    }
    
    // 加载测试页面
    loadTestPage() {
        this.loadTestHistory();
    }
    
    // 加载进度页面
    loadProgressPage() {
        // 更新总体进度
        const totalProgress = (this.userData.masteredWords / 3500) * 100;
        document.getElementById('totalProgress').textContent = Math.round(totalProgress);
        
        // 计算本周学习进度
        const weekProgress = this.calculateWeekProgress();
        document.getElementById('weekProgress').textContent = weekProgress;
        
        // 计算月度目标完成度
        const goalProgress = this.calculateGoalProgress();
        document.getElementById('goalProgress').textContent = Math.round(goalProgress);
        
        // 更新词汇掌握分布
        this.updateMasteryDistribution();
    }
    
    // 加载成就页面
    loadAchievementsPage() {
        this.loadAchievements();
        this.loadLeaderboard();
    }
    
    // 更新UI
    updateUI() {
        // 更新用户信息
        document.querySelector('.username').textContent = this.userData.username;
        document.querySelector('.user-level').textContent = `Lv.${this.userData.level} ${this.getUserLevelTitle()}`;
        document.getElementById('userPoints').textContent = this.userData.points;
        document.getElementById('userStreak').textContent = this.userData.streak;
        
        // 更新首页数据
        this.loadHomePage();
    }
    
    // 获取用户等级称号
    getUserLevelTitle() {
        const titles = ['词汇学徒', '词汇战士', '词汇专家', '词汇大师', '词汇传奇'];
        const index = Math.min(Math.floor(this.userData.level / 10), titles.length - 1);
        return titles[index];
    }
    
    // 绑定学习模式事件
    bindLearningEvents() {
        // 学习模式选择
        const modeCards = document.querySelectorAll('.mode-card');
        modeCards.forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.getAttribute('onclick').match(/startLearningMode\('(.+)'\)/)[1];
                this.startLearningMode(mode);
            });
        });
        
        // 关卡选择
        const levelNodes = document.querySelectorAll('.level-node');
        levelNodes.forEach(node => {
            node.addEventListener('click', () => {
                const level = node.getAttribute('data-level');
                if (node.classList.contains('unlocked')) {
                    this.startLevel(level);
                }
            });
        });
    }
    
    // 绑定测试模式事件
    bindTestEvents() {
        // 测试模式选择
        const testModeCards = document.querySelectorAll('.test-mode-card');
        testModeCards.forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.getAttribute('onclick').match(/start(\w+)Test\(\)/)[1].toLowerCase();
                this.startTest(mode);
            });
        });
    }
    
    // 开始学习模式
    startLearningMode(mode) {
        this.currentMode = mode;
        this.lives = gameConfig.livesPerLevel;
        this.points = 0;
        this.correctAnswers = 0;
        this.totalAnswers = 0;
        
        // 根据模式选择单词
        this.selectWordsForMode(mode);
        
        // 显示学习模态框
        this.showLearningModal();
        
        // 开始学习
        this.nextWord();
    }
    
    // 根据模式选择单词
    selectWordsForMode(mode) {
        const level = `level${this.userData.level}`;
        
        switch (mode) {
            case 'new':
                this.currentWords = getRandomWords(level, learningAlgorithm.newWordsPerSession);
                break;
            case 'review':
                this.currentWords = getReviewWords(level, learningAlgorithm.reviewWordsPerSession);
                break;
            case 'mixed':
                const newWords = getRandomWords(level, learningAlgorithm.newWordsPerSession);
                const reviewWords = getReviewWords(level, learningAlgorithm.reviewWordsPerSession);
                this.currentWords = [...newWords, ...reviewWords];
                break;
            case 'focus':
                this.currentWords = getWeakWords(level, gameConfig.maxWordsPerSession);
                break;
        }
        
        this.currentWordIndex = 0;
    }
    
    // 获取薄弱单词
    getWeakWords(level, count) {
        const userData = getUserData();
        const weakWords = [];
        
        // 这里应该根据用户的错误记录获取薄弱单词
        // 暂时返回随机单词
        return getRandomWords(level, count);
    }
    
    // 显示学习模态框
    showLearningModal() {
        const modal = document.getElementById('learningModal');
        modal.classList.add('active');
        
        // 更新模态框状态
        this.updateModalStats();
    }
    
    // 更新模态框状态
    updateModalStats() {
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('modalPoints').textContent = this.points;
        document.getElementById('progress').textContent = `${this.currentWordIndex + 1}/${this.currentWords.length}`;
    }
    
    // 下一个单词
    nextWord() {
        if (this.currentWordIndex >= this.currentWords.length) {
            this.completeLearning();
            return;
        }
        
        const word = this.currentWords[this.currentWordIndex];
        this.displayWord(word);
    }
    
    // 显示单词
    displayWord(word) {
        document.getElementById('currentWord').textContent = word.word;
        document.getElementById('wordType').textContent = word.type;
        document.getElementById('questionText').textContent = '请选择正确的释义：';
        
        // 生成选项
        this.generateOptions(word);
        
        // 重置反馈区域
        this.hideFeedback();
    }
    
    // 生成选项
    generateOptions(correctWord) {
        const optionsGrid = document.getElementById('optionsGrid');
        optionsGrid.innerHTML = '';
        
        // 获取同级别的其他单词作为错误选项
        const level = `level${this.userData.level}`;
        const otherWords = vocabularyData[level].filter(w => w.word !== correctWord.word);
        const wrongOptions = this.shuffleArray(otherWords).slice(0, 3);
        
        // 创建选项数组并打乱
        const options = [
            { text: correctWord.meaning, correct: true },
            ...wrongOptions.map(w => ({ text: w.meaning, correct: false }))
        ];
        
        const shuffledOptions = this.shuffleArray(options);
        
        // 创建选项按钮
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option.text;
            button.addEventListener('click', () => this.selectOption(option, button));
            optionsGrid.appendChild(button);
        });
    }
    
    // 选择选项
    selectOption(option, button) {
        this.totalAnswers++;
        
        // 禁用所有选项
        const allButtons = document.querySelectorAll('.option-btn');
        allButtons.forEach(btn => btn.disabled = true);
        
        if (option.correct) {
            this.handleCorrectAnswer(button);
        } else {
            this.handleIncorrectAnswer(button);
        }
        
        // 更新用户数据
        this.updateUserData();
        
        // 显示反馈
        this.showFeedback(option.correct);
        
        // 延迟后进入下一个单词
        setTimeout(() => {
            this.currentWordIndex++;
            this.nextWord();
        }, 2000);
    }
    
    // 处理正确答案
    handleCorrectAnswer(button) {
        this.correctAnswers++;
        this.points += gameConfig.pointsPerWord;
        
        // 添加正确答案样式
        button.style.background = '#10b981';
        button.style.color = 'white';
        button.style.borderColor = '#10b981';
        
        // 播放音效
        this.playSound('correct');
    }
    
    // 处理错误答案
    handleIncorrectAnswer(button) {
        this.lives--;
        
        // 添加错误答案样式
        button.style.background = '#ef4444';
        button.style.color = 'white';
        button.style.borderColor = '#ef4444';
        
        // 显示正确答案
        const allButtons = document.querySelectorAll('.option-btn');
        allButtons.forEach(btn => {
            if (btn.textContent === this.currentWords[this.currentWordIndex].meaning) {
                btn.style.background = '#10b981';
                btn.style.color = 'white';
                btn.style.borderColor = '#10b981';
            }
        });
        
        // 播放音效
        this.playSound('incorrect');
        
        // 检查是否失败
        if (this.lives <= 0) {
            this.gameOver();
        }
    }
    
    // 显示反馈
    showFeedback(isCorrect) {
        const feedbackArea = document.getElementById('feedbackArea');
        feedbackArea.style.display = 'block';
        
        if (isCorrect) {
            feedbackArea.className = 'feedback-area correct';
            feedbackArea.innerHTML = `
                <div class="feedback-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>正确！</h3>
                    <p>太棒了！你答对了！</p>
                </div>
            `;
        } else {
            const word = this.currentWords[this.currentWordIndex];
            feedbackArea.className = 'feedback-area incorrect';
            feedbackArea.innerHTML = `
                <div class="feedback-content">
                    <i class="fas fa-times-circle"></i>
                    <h3>错误！</h3>
                    <p>正确答案是：${word.meaning}</p>
                    <p>例句：${word.example}</p>
                </div>
            `;
        }
        
        this.updateModalStats();
    }
    
    // 隐藏反馈
    hideFeedback() {
        const feedbackArea = document.getElementById('feedbackArea');
        feedbackArea.style.display = 'none';
    }
    
    // 完成学习
    completeLearning() {
        const modal = document.getElementById('learningModal');
        modal.classList.remove('active');
        
        // 更新用户数据
        this.userData.points += this.points;
        this.userData.todayWords += this.correctAnswers;
        this.userData.totalAnswers += this.totalAnswers;
        
        // 检查等级提升
        this.checkLevelUp();
        
        // 检查成就
        this.checkAchievements();
        
        // 保存数据
        saveUserData(this.userData);
        
        // 更新UI
        this.updateUI();
        
        // 显示完成提示
        this.showCompletionMessage();
    }
    
    // 游戏结束
    gameOver() {
        const modal = document.getElementById('learningModal');
        modal.classList.remove('active');
        
        // 显示游戏结束提示
        this.showGameOverMessage();
    }
    
    // 显示完成消息
    showCompletionMessage() {
        const accuracy = Math.round((this.correctAnswers / this.totalAnswers) * 100);
        const message = `
            <div class="completion-message">
                <h3>学习完成！</h3>
                <p>正确率：${accuracy}%</p>
                <p>获得积分：${this.points}</p>
                <p>掌握单词：${this.correctAnswers}</p>
            </div>
        `;
        
        this.showModalMessage(message);
    }
    
    // 显示游戏结束消息
    showGameOverMessage() {
        const message = `
            <div class="game-over-message">
                <h3>游戏结束！</h3>
                <p>生命值已用完</p>
                <p>正确率：${Math.round((this.correctAnswers / this.totalAnswers) * 100)}%</p>
                <p>获得积分：${this.points}</p>
            </div>
        `;
        
        this.showModalMessage(message);
    }
    
    // 显示模态消息
    showModalMessage(message) {
        // 创建临时消息容器
        const messageDiv = document.createElement('div');
        messageDiv.className = 'modal-message';
        messageDiv.innerHTML = message;
        document.body.appendChild(messageDiv);
        
        // 显示消息
        setTimeout(() => {
            messageDiv.style.display = 'block';
        }, 100);
        
        // 3秒后移除
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
    
    // 开始测试
    startTest(mode) {
        const testConfig = testModes[mode];
        if (!testConfig) return;
        
        this.currentTest = {
            mode: mode,
            config: testConfig,
            questions: [],
            currentQuestion: 0,
            correctAnswers: 0,
            startTime: Date.now(),
            timeRemaining: testConfig.duration * 60
        };
        
        // 生成测试题目
        this.generateTestQuestions();
        
        // 开始测试
        this.showTestInterface();
    }
    
    // 生成测试题目
    generateTestQuestions() {
        const allWords = [];
        Object.keys(vocabularyData).forEach(level => {
            allWords.push(...vocabularyData[level]);
        });
        
        const shuffledWords = this.shuffleArray(allWords);
        const questionCount = Math.min(this.currentTest.config.questionCount, shuffledWords.length);
        
        for (let i = 0; i < questionCount; i++) {
            const word = shuffledWords[i];
            const question = {
                word: word,
                options: this.generateTestOptions(word),
                correctAnswer: word.meaning
            };
            this.currentTest.questions.push(question);
        }
    }
    
    // 生成测试选项
    generateTestOptions(correctWord) {
        const allWords = [];
        Object.keys(vocabularyData).forEach(level => {
            allWords.push(...vocabularyData[level]);
        });
        
        const wrongOptions = allWords
            .filter(w => w.word !== correctWord.word)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(w => w.meaning);
        
        return this.shuffleArray([correctWord.meaning, ...wrongOptions]);
    }
    
    // 显示测试界面
    showTestInterface() {
        // 这里应该创建一个专门的测试界面
        // 暂时使用学习模态框
        this.showLearningModal();
        this.nextTestQuestion();
        
        // 开始计时
        this.startTestTimer();
    }
    
    // 下一个测试问题
    nextTestQuestion() {
        if (this.currentTest.currentQuestion >= this.currentTest.questions.length) {
            this.completeTest();
            return;
        }
        
        const question = this.currentTest.questions[this.currentTest.currentQuestion];
        this.displayTestQuestion(question);
    }
    
    // 显示测试问题
    displayTestQuestion(question) {
        document.getElementById('currentWord').textContent = question.word.word;
        document.getElementById('wordType').textContent = question.word.type;
        document.getElementById('questionText').textContent = '请选择正确的释义：';
        
        const optionsGrid = document.getElementById('optionsGrid');
        optionsGrid.innerHTML = '';
        
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.selectTestAnswer(option, button));
            optionsGrid.appendChild(button);
        });
    }
    
    // 选择测试答案
    selectTestAnswer(answer, button) {
        const question = this.currentTest.questions[this.currentTest.currentQuestion];
        const isCorrect = answer === question.correctAnswer;
        
        this.currentTest.totalAnswers = (this.currentTest.totalAnswers || 0) + 1;
        
        if (isCorrect) {
            this.currentTest.correctAnswers++;
            this.handleCorrectAnswer(button);
        } else {
            this.handleIncorrectAnswer(button);
        }
        
        // 延迟后进入下一题
        setTimeout(() => {
            this.currentTest.currentQuestion++;
            this.nextTestQuestion();
        }, 1500);
    }
    
    // 开始测试计时器
    startTestTimer() {
        this.timer = setInterval(() => {
            this.currentTest.timeRemaining--;
            
            if (this.currentTest.timeRemaining <= 0) {
                this.completeTest();
            }
        }, 1000);
    }
    
    // 完成测试
    completeTest() {
        clearInterval(this.timer);
        
        const accuracy = Math.round((this.currentTest.correctAnswers / this.currentTest.questions.length) * 100);
        const timeSpent = Math.round((Date.now() - this.currentTest.startTime) / 1000);
        
        // 计算积分
        let points = this.currentTest.config.points;
        if (this.currentTest.config.points === "multiplier") {
            points = this.currentTest.correctAnswers * 10;
        }
        
        // 更新用户数据
        this.userData.points += points;
        this.userData.history.tests.push({
            mode: this.currentTest.mode,
            accuracy: accuracy,
            timeSpent: timeSpent,
            date: new Date().toISOString()
        });
        
        // 保存数据
        saveUserData(this.userData);
        
        // 关闭模态框
        const modal = document.getElementById('learningModal');
        modal.classList.remove('active');
        
        // 显示测试结果
        this.showTestResults(accuracy, timeSpent, points);
    }
    
    // 显示测试结果
    showTestResults(accuracy, timeSpent, points) {
        const message = `
            <div class="test-results">
                <h3>测试完成！</h3>
                <p>正确率：${accuracy}%</p>
                <p>用时：${timeSpent}秒</p>
                <p>获得积分：${points}</p>
            </div>
        `;
        
        this.showModalMessage(message);
    }
    
    // 检查等级提升
    checkLevelUp() {
        const experienceNeeded = this.userData.level * 1000;
        if (this.userData.experience >= experienceNeeded) {
            this.userData.level++;
            this.userData.experience = 0;
            this.showLevelUpMessage();
        }
    }
    
    // 显示升级消息
    showLevelUpMessage() {
        const message = `
            <div class="level-up-message">
                <h3>恭喜升级！</h3>
                <p>你已升级到 Lv.${this.userData.level}</p>
                <p>新称号：${this.getUserLevelTitle()}</p>
            </div>
        `;
        
        this.showModalMessage(message);
    }
    
    // 检查成就
    checkAchievements() {
        const newlyUnlocked = checkAchievements(this.userData);
        
        if (newlyUnlocked.length > 0) {
            newlyUnlocked.forEach(achievement => {
                this.showAchievementUnlocked(achievement);
            });
        }
    }
    
    // 显示成就解锁
    showAchievementUnlocked(achievement) {
        const message = `
            <div class="achievement-unlocked">
                <h3>成就解锁！</h3>
                <i class="${achievement.icon}"></i>
                <p>${achievement.name}</p>
                <p>${achievement.description}</p>
                <p>获得 ${achievement.reward} 积分</p>
            </div>
        `;
        
        this.showModalMessage(message);
    }
    
    // 更新用户数据
    updateUserData() {
        this.userData.experience += 10;
        this.userData.totalAnswers = this.totalAnswers;
        
        // 更新今日学习进度
        if (this.userData.todayWords < this.userData.settings.dailyGoal) {
            this.userData.todayWords = Math.min(this.userData.todayWords + 1, this.userData.settings.dailyGoal);
        }
        
        saveUserData(this.userData);
    }
    
    // 更新每日数据
    updateDailyData() {
        const today = new Date().toDateString();
        const todayData = this.userData.history.daily.find(d => d.date === today);
        
        if (!todayData) {
            this.userData.history.daily.push({
                date: today,
                wordsLearned: 0,
                timeSpent: 0,
                accuracy: 0
            });
        }
        
        saveUserData(this.userData);
    }
    
    // 计算本周进度
    calculateWeekProgress() {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const weekData = this.userData.history.daily.filter(d => 
            new Date(d.date) >= weekAgo
        );
        
        return weekData.reduce((total, day) => total + day.wordsLearned, 0);
    }
    
    // 计算目标进度
    calculateGoalProgress() {
        const currentMonth = new Date().getMonth();
        const monthData = this.userData.history.daily.filter(d => 
            new Date(d.date).getMonth() === currentMonth
        );
        
        const monthProgress = monthData.reduce((total, day) => total + day.wordsLearned, 0);
        const monthlyGoal = this.userData.settings.dailyGoal * 30;
        
        return (monthProgress / monthlyGoal) * 100;
    }
    
    // 更新词汇掌握分布
    updateMasteryDistribution() {
        const masteryData = {
            mastered: this.userData.masteredWords,
            learning: 0,
            review: 0,
            new: 3500 - this.userData.masteredWords
        };
        
        // 这里应该根据学习状态计算更精确的分布
        document.querySelector('.mastery-fill.mastered').style.width = `${(masteryData.mastered / 3500) * 100}%`;
        document.querySelector('.mastery-fill.learning').style.width = `${(masteryData.learning / 3500) * 100}%`;
        document.querySelector('.mastery-fill.review').style.width = `${(masteryData.review / 3500) * 100}%`;
        document.querySelector('.mastery-fill.new').style.width = `${(masteryData.new / 3500) * 100}%`;
        
        document.querySelector('.mastery-count.mastered').textContent = masteryData.mastered;
        document.querySelector('.mastery-count.learning').textContent = masteryData.learning;
        document.querySelector('.mastery-count.review').textContent = masteryData.review;
        document.querySelector('.mastery-count.new').textContent = masteryData.new;
    }
    
    // 初始化热力图
    initHeatmap() {
        const heatmap = document.getElementById('heatmap');
        if (!heatmap) return;
        
        // 生成过去365天的热力图
        for (let i = 364; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'heatmap-day';
            
            // 检查这一天是否有学习记录
            const dateStr = date.toDateString();
            const dayData = this.userData.history.daily.find(d => d.date === dateStr);
            
            if (dayData && dayData.wordsLearned > 0) {
                dayElement.classList.add('active');
                dayElement.title = `${dateStr}: ${dayData.wordsLearned} 词`;
            }
            
            heatmap.appendChild(dayElement);
        }
    }
    
    // 更新关卡进度
    updateLevelProgress() {
        // 这里应该根据用户进度更新关卡地图
        // 暂时使用模拟数据
        const levelNodes = document.querySelectorAll('.level-node');
        levelNodes.forEach((node, index) => {
            if (index === 0) {
                node.classList.add('unlocked');
                node.querySelector('.level-status').className = 'level-status unlocked';
                node.querySelector('.level-status i').className = 'fas fa-check';
            } else if (index <= this.userData.level) {
                node.classList.add('unlocked');
                node.querySelector('.level-status').className = 'level-status locked';
                node.querySelector('.level-status i').className = 'fas fa-lock';
            } else {
                node.classList.add('locked');
                node.querySelector('.level-status').className = 'level-status locked';
                node.querySelector('.level-status i').className = 'fas fa-lock';
            }
        });
    }
    
    // 更新关卡解锁状态
    updateLevelUnlockStatus() {
        // 根据用户进度更新关卡解锁状态
        const levelProgress = this.userData.progress[`level${this.userData.level}`];
        if (levelProgress && levelProgress.completed >= levelProgress.total * 0.8) {
            // 解锁下一关
            this.userData.level = Math.min(this.userData.level + 1, 5);
            saveUserData(this.userData);
        }
    }
    
    // 加载成就
    loadAchievements() {
        const achievementsGrid = document.querySelector('.achievements-grid');
        if (!achievementsGrid) return;
        
        achievementsGrid.innerHTML = '';
        
        achievements.forEach(achievement => {
            const isUnlocked = this.userData.achievements.includes(achievement.id);
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            achievementElement.innerHTML = `
                <div class="achievement-icon">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                    <div class="achievement-reward">
                        <i class="fas fa-coins"></i>
                        <span>+${achievement.reward}</span>
                    </div>
                </div>
                <div class="achievement-status">
                    <i class="fas ${isUnlocked ? 'fa-check-circle' : 'fa-lock'}"></i>
                </div>
            `;
            
            achievementsGrid.appendChild(achievementElement);
        });
    }
    
    // 加载排行榜
    loadLeaderboard() {
        const leaderboardList = document.querySelector('.leaderboard-list');
        if (!leaderboardList) return;
        
        // 这里应该从服务器获取真实的排行榜数据
        // 暂时使用模拟数据
        const mockLeaderboard = [
            { rank: 1, name: "单词达人", level: 12, score: 2450 },
            { rank: 2, name: "词汇大师", level: 10, score: 2100 },
            { rank: 3, name: "英语学霸", level: 9, score: 1980 },
            { rank: 4, name: "记忆专家", level: 8, score: 1750 },
            { rank: 5, name: "学习先锋", level: 7, score: 1600 }
        ];
        
        leaderboardList.innerHTML = '';
        
        mockLeaderboard.forEach(player => {
            const playerElement = document.createElement('div');
            playerElement.className = 'leaderboard-item';
            
            playerElement.innerHTML = `
                <div class="rank">${player.rank}</div>
                <div class="player-info">
                    <div class="player-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="player-details">
                        <div class="player-name">${player.name}</div>
                        <div class="player-level">Lv.${player.level}</div>
                    </div>
                </div>
                <div class="player-score">${player.score.toLocaleString()}</div>
            `;
            
            leaderboardList.appendChild(playerElement);
        });
    }
    
    // 加载测试历史
    loadTestHistory() {
        const historyList = document.querySelector('.history-list');
        if (!historyList) return;
        
        const tests = this.userData.history.tests.slice(-5).reverse();
        
        historyList.innerHTML = '';
        
        tests.forEach(test => {
            const testElement = document.createElement('div');
            testElement.className = 'history-item';
            
            const date = new Date(test.date);
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            
            testElement.innerHTML = `
                <div class="history-info">
                    <div class="history-title">${test.mode === 'quick' ? '快速测试' : test.mode === 'deep' ? '深度测试' : test.mode === 'challenge' ? '挑战模式' : '拼写大赛'}</div>
                    <div class="history-time">${dateStr}</div>
                </div>
                <div class="history-result">
                    <div class="score">${test.accuracy}%</div>
                    <div class="details">${Math.round(test.accuracy * test.questions.length / 100)}/${test.questions.length}题</div>
                </div>
                <div class="history-reward">
                    <i class="fas fa-coins"></i>
                    <span>+${Math.round(test.accuracy * test.questions.length / 10)}</span>
                </div>
            `;
            
            historyList.appendChild(testElement);
        });
    }
    
    // 播放音效
    playSound(type) {
        if (!this.soundEnabled) return;
        
        // 这里应该播放实际的音效文件
        // 暂时使用Web Audio API生成简单音效
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'correct') {
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
        } else if (type === 'incorrect') {
            oscillator.frequency.value = 300;
            gainNode.gain.value = 0.1;
        }
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // 工具函数：打乱数组
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    // 工具函数：检查两个日期是否为同一天
    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }
}

// 全局变量
let app;

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    app = new WordGameApp();
});

// 全局函数（供HTML调用）
function navigateTo(page) {
    app.navigateTo(page);
}

function startQuickLearn() {
    app.startLearningMode('new');
}

function showLevelTest() {
    app.startTest('quick');
}

function startLearningMode(mode) {
    app.startLearningMode(mode);
}

function startLevel(level) {
    app.startLevel(level);
}

function startQuickTest() {
    app.startTest('quick');
}

function startDeepTest() {
    app.startTest('deep');
}

function startChallengeTest() {
    app.startTest('challenge');
}

function startSpellingTest() {
    app.startTest('spelling');
}

function startSpellingGame() {
    app.startLearningMode('focus');
}

function startListeningChallenge() {
    app.startTest('quick');
}

function startAdaptiveTest() {
    app.startTest('deep');
}

function playWordAudio() {
    // 播放单词发音
    app.playSound('correct');
}

function showWordHint() {
    // 显示单词提示
    const message = `
        <div class="hint-message">
            <h3>提示</h3>
            <p>这个词的词性是 ${app.currentWords[app.currentWordIndex].type}</p>
            <p>例句：${app.currentWords[app.currentWordIndex].example}</p>
        </div>
    `;
    
    app.showModalMessage(message);
}