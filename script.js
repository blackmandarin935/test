class QuizApp {
    constructor() {
        this.currentScreen = 'start';
        this.selectedTopic = null;
        this.selectedDifficulty = null;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 10;
        this.startTime = null;
        this.hintsUsed = 0;
        this.maxHints = 3;
        this.questions = [];
        
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeQuizData();
    }
    
    initializeElements() {
        // 화면 요소
        this.screens = {
            start: document.getElementById('start-screen'),
            quiz: document.getElementById('quiz-screen'),
            result: document.getElementById('result-screen')
        };
        
        // 시작 화면 요소
        this.topicButtons = document.querySelectorAll('.topic-btn');
        this.difficultyButtons = document.querySelectorAll('.difficulty-btn');
        this.startQuizBtn = document.getElementById('start-quiz');
        
        // 퀴즈 화면 요소
        this.questionText = document.getElementById('question-text');
        this.questionImage = document.getElementById('question-image');
        this.answersGrid = document.getElementById('answers-grid');
        this.questionCounter = document.getElementById('question-counter');
        this.scoreElement = document.getElementById('score');
        this.progressFill = document.querySelector('.progress-fill');
        this.hintBtn = document.getElementById('hint-btn');
        this.skipBtn = document.getElementById('skip-btn');
        
        // 결과 화면 요소
        this.finalScoreElement = document.getElementById('final-score');
        this.accuracyElement = document.getElementById('accuracy');
        this.timeTakenElement = document.getElementById('time-taken');
        this.performanceMessage = document.getElementById('performance-message');
        this.restartBtn = document.getElementById('restart-btn');
        this.homeBtn = document.getElementById('home-btn');
    }
    
    initializeEventListeners() {
        // 주제 선택
        this.topicButtons.forEach(btn => {
            btn.addEventListener('click', () => this.selectTopic(btn.dataset.topic));
        });
        
        // 난이도 선택
        this.difficultyButtons.forEach(btn => {
            btn.addEventListener('click', () => this.selectDifficulty(btn.dataset.level));
        });
        
        // 퀴즈 시작
        this.startQuizBtn.addEventListener('click', () => this.startQuiz());
        
        // 퀴즈 컨트롤
        this.hintBtn.addEventListener('click', () => this.useHint());
        this.skipBtn.addEventListener('click', () => this.skipQuestion());
        
        // 결과 화면 버튼
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.homeBtn.addEventListener('click', () => this.goToHome());
    }
    
    initializeQuizData() {
        this.quizData = {
            science: {
                easy: [
                    {
                        question: "물의 화학식은 무엇인가요?",
                        answers: ["H2O", "CO2", "O2", "N2"],
                        correct: 0,
                        hint: "수소 2개와 산소 1개로 이루어져 있습니다."
                    },
                    {
                        question: "태양계에서 가장 큰 행성은 무엇인가요?",
                        answers: ["지구", "화성", "목성", "토성"],
                        correct: 2,
                        hint: "대적점이라는 유명한 표면 특징이 있습니다."
                    },
                    {
                        question: "광합성에 필요한 것은 무엇인가요?",
                        answers: ["산소", "이산화탄소", "질소", "수소"],
                        correct: 1,
                        hint: "식물이 이산화탄소를 흡수합니다."
                    }
                ],
                medium: [
                    {
                        question: "원자번호 6인 원소는 무엇인가요?",
                        answers: ["산소", "질소", "탄소", "수소"],
                        correct: 2,
                        hint: "유기물의 기본이 되는 원소입니다."
                    },
                    {
                        question: "빛의 속도는 얼마인가요?",
                        answers: ["약 30만 km/s", "약 3만 km/s", "약 300만 km/s", "약 3천 km/s"],
                        correct: 0,
                        hint: "초당 약 30만 킬로미터입니다."
                    }
                ],
                hard: [
                    {
                        question: "양자역학에서 슈뢰딩거의 고양이 사고 실험의 목적은 무엇인가요?",
                        answers: ["고양이의 생존 실험", "중첩 상태의 모순 설명", "시간 여행 가능성", "동물 실험 윤리"],
                        correct: 1,
                        hint: "양자 중첩 상태의 문제점을 보여주는 사고 실험입니다."
                    }
                ]
            },
            history: {
                easy: [
                    {
                        question: "조선시대의 수도는 어디였나요?",
                        answers: ["부산", "대구", "한성(서울)", "광주"],
                        correct: 2,
                        hint: "현재 대한민국의 수도입니다."
                    },
                    {
                        question: "세종대왕이 만든 문자는 무엇인가요?",
                        answers: ["한자", "히라가나", "한글", "한문"],
                        correct: 2,
                        hint: "훈민정음으로 만들어진 한국의 고유 문자입니다."
                    }
                ],
                medium: [
                    {
                        question: "1894년에 일어난 농민 반란은 무엇인가요?",
                        answers: ["갑오개혁", "을미사변", "동학 농민 운동", "정미의병"],
                        correct: 2,
                        hint: "동학교와 관련된 농민 봉기입니다."
                    }
                ],
                hard: [
                    {
                        question: "고려시대의 과거 제도에서 최고 관등은 무엇인가요?",
                        answers: ["문과", "무과", "잡과", "승과"],
                        correct: 0,
                        hint: "문관을 뽑는 시험으로 최고의 관등이었습니다."
                    }
                ]
            },
            geography: {
                easy: [
                    {
                        question: "세계에서 가장 긴 강은 무엇인가요?",
                        answers: ["아마존강", "나일강", "미시시피강", "양쯔강"],
                        correct: 1,
                        hint: "아프리카를 흐르는 강입니다."
                    },
                    {
                        question: "대한민국에서 가장 높은 산은 무엇인가요?",
                        answers: ["북한산", "설악산", "한라산", "지리산"],
                        correct: 2,
                        hint: "제주도에 있는 화산입니다."
                    }
                ],
                medium: [
                    {
                        question: "사하라 사막은 어느 대륙에 있나요?",
                        answers: ["아시아", "아프리카", "오스트레일리아", "남아메리카"],
                        correct: 1,
                        hint: "세계에서 가장 큰 사막입니다."
                    }
                ],
                hard: [
                    {
                        question: "적도가 통과하지 않는 대륙은 무엇인가요?",
                        answers: ["아시아", "아프리카", "남아메리카", "오스트레일리아"],
                        correct: 3,
                        hint: "호주라고도 불리는 대륙입니다."
                    }
                ]
            },
            sports: {
                easy: [
                    {
                        question: "축구 경기는 몇 명으로 구성된가요?",
                        answers: ["9명", "10명", "11명", "12명"],
                        correct: 2,
                        hint: "한 팀당 11명씩 경기합니다."
                    },
                    {
                        question: "올림픽은 몇 년마다 열리나요?",
                        answers: ["2년", "3년", "4년", "5년"],
                        correct: 2,
                        hint: "4년 주기로 열립니다."
                    }
                ],
                medium: [
                    {
                        question: "야구에서 세 스트라이크 아웃되는 것을 무엇이라고 하나요?",
                        answers: ["볼넷", "삼진", "사구", "실책"],
                        correct: 1,
                        hint: "스트라이크 3개로 아웃됩니다."
                    }
                ],
                hard: [
                    {
                        question: "마라톤의 정확한 거리는 얼마인가요?",
                        answers: ["40.195km", "42.195km", "45.195km", "41.195km"],
                        correct: 1,
                        hint: "42.195킬로미터입니다."
                    }
                ]
            },
            movies: {
                easy: [
                    {
                        question: "\"아바타\" 영화의 감독은 누구인가요?",
                        answers: ["스티븐 스필버그", "제임스 카메론", "크리스토퍼 놀란", "조지 루카스"],
                        correct: 1,
                        hint: "\"타이타닉\"도 연출한 감독입니다."
                    }
                ],
                medium: [
                    {
                        question: "\"인터스텔라\"의 주인공이 탐험하는 우주 요소는 무엇인가요?",
                        answers: ["블랙홀", "백조자리 X-1", "은하수", "태양계"],
                        correct: 0,
                        hint: "중력이 매우 강한 천체입니다."
                    }
                ],
                hard: [
                    {
                        question: "아카데미 작품상을 가장 많이 받은 감독은 누구인가요?",
                        answers: ["스티븐 스필버그", "알프레드 히치콕", "존 포드", "마틴 스코세이지"],
                        correct: 2,
                        hint: "4번의 아카데미 작품상을 받았습니다."
                    }
                ]
            },
            music: {
                easy: [
                    {
                        question: "피아노는 몇 개의 건반이 있나요? (일반적으로)",
                        answers: ["76개", "88개", "92개", "100개"],
                        correct: 1,
                        hint: "88건반이 표준입니다."
                    }
                ],
                medium: [
                    {
                        question: "바하가 작곡한 \"평균율\"의 정식 제목은 무엇인가요?",
                        answers: ["평균율 클라비어곡집", "푸가의 기술", "마태 수난곡", "브란덴부르크 협주곡"],
                        correct: 0,
                        hint: "모든 장조와 단조를 포함한 곡집입니다."
                    }
                ],
                hard: [
                    {
                        question: "12음 기법을 창시한 작곡가는 누구인가요?",
                        answers: ["바하", "모차르트", "베토벤", "쇤베르크"],
                        correct: 3,
                        hint: "20세기 현대음악의 중요한 작곡가입니다."
                    }
                ]
            },
            nonsense: {
                easy: [
                    {
                        question: "김치는 어떤 색깔인가요?",
                        answers: ["파란색", "빨간색", "초록색", "노란색"],
                        correct: 1,
                        hint: "고춧가루 때문에 붉은색을 띱니다."
                    },
                    {
                        question: "하늘을 날 수 있는 새는 몇 개인가요?",
                        answers: ["1개", "2개", "3개", "4개"],
                        correct: 0,
                        hint: "새는 '하나'만 날 수 있습니다. '두 마리'의 새는 각각 날아야 합니다."
                    },
                    {
                        question: "사람이 가장 많이 먹는 음식은 무엇인가요?",
                        answers: ["공기", "물", "밥", "빵"],
                        correct: 0,
                        hint: "하루에 약 20,000번이나 먹는 음식입니다."
                    }
                ],
                medium: [
                    {
                        question: "세상에서 가장 높은 산은 무엇인가요?",
                        answers: ["에베레스트산", "한라산", "북한산", "내 어깨"],
                        correct: 3,
                        hint: "내 자신을 가장 높다고 생각하는 것이죠!"
                    },
                    {
                        question: "시간이 가장 빠를 때는 언제인가요?",
                        answers: ["불타오를 때", "놀 때", "잘 때", "쫓길 때"],
                        correct: 0,
                        hint: "BTS 노래 'Fire'의 가사를 생각해보세요!"
                    }
                ],
                hard: [
                    {
                        question: "세상에서 가장 무거운 것은 무엇인가요?",
                        answers: ["지구", "태양", "마음의 짐", "책가방"],
                        correct: 2,
                        hint: "보이지 않지만 가장 무겁게 느껴지는 것입니다."
                    },
                    {
                        question: "가장 큰 거짓말은 무엇인가요?",
                        answers: ["하늘이 파랗다", "1+1=2", "안 할게", "잘게"],
                        correct: 3,
                        hint: "어릴 때 부모님께 가장 많이 하는 말입니다!"
                    }
                ]
            }
        };
    }
    
    selectTopic(topic) {
        this.selectedTopic = topic;
        this.topicButtons.forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.topic === topic);
        });
        this.checkStartButton();
    }
    
    selectDifficulty(level) {
        this.selectedDifficulty = level;
        this.difficultyButtons.forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.level === level);
        });
        this.checkStartButton();
    }
    
    checkStartButton() {
        this.startQuizBtn.disabled = !(this.selectedTopic && this.selectedDifficulty);
    }
    
    startQuiz() {
        if (!this.selectedTopic || !this.selectedDifficulty) return;
        
        // 퀴즈 문제 가져오기
        this.questions = this.getRandomQuestions(this.selectedTopic, this.selectedDifficulty);
        
        // 게임 상태 초기화
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.hintsUsed = 0;
        this.startTime = Date.now();
        
        // 화면 전환
        this.switchScreen('quiz');
        this.displayQuestion();
    }
    
    getRandomQuestions(topic, difficulty) {
        const topicQuestions = this.quizData[topic]?.[difficulty] || [];
        const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
        
        // 문제가 부족하면 반복해서 채우기
        while (shuffled.length < this.totalQuestions) {
            shuffled.push(...topicQuestions.sort(() => Math.random() - 0.5));
        }
        
        return shuffled.slice(0, this.totalQuestions);
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // 질문 표시
        this.questionText.textContent = question.question;
        
        // 답변 버튼 생성
        this.answersGrid.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.addEventListener('click', () => this.selectAnswer(index));
            this.answersGrid.appendChild(button);
        });
        
        // 진행 상황 업데이트
        this.updateProgress();
        
        // 버튼 상태 초기화
        this.hintBtn.disabled = this.hintsUsed >= this.maxHints;
        this.skipBtn.disabled = false;
    }
    
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.questionCounter.textContent = `${this.currentQuestionIndex + 1}/${this.totalQuestions}`;
        this.scoreElement.textContent = `점수: ${this.score}`;
    }
    
    selectAnswer(answerIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const buttons = this.answersGrid.querySelectorAll('.answer-btn');
        
        // 정답 확인
        const isCorrect = answerIndex === question.correct;
        
        // 버튼 스타일 변경
        buttons[answerIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
        if (!isCorrect) {
            buttons[question.correct].classList.add('correct');
        }
        
        // 버튼 비활성화
        buttons.forEach(btn => btn.disabled = true);
        this.hintBtn.disabled = true;
        this.skipBtn.disabled = true;
        
        // 점수 계산
        if (isCorrect) {
            this.correctAnswers++;
            const difficultyBonus = this.selectedDifficulty === 'easy' ? 10 : 
                                  this.selectedDifficulty === 'medium' ? 15 : 20;
            this.score += difficultyBonus;
        }
        
        // 다음 문제로
        setTimeout(() => {
            this.nextQuestion();
        }, 1500);
    }
    
    useHint() {
        if (this.hintsUsed >= this.maxHints) return;
        
        const question = this.questions[this.currentQuestionIndex];
        alert(`힌트: ${question.hint}`);
        this.hintsUsed++;
        this.hintBtn.disabled = this.hintsUsed >= this.maxHints;
    }
    
    skipQuestion() {
        this.nextQuestion();
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.totalQuestions) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
        const accuracy = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        
        // 결과 데이터 표시
        this.finalScoreElement.textContent = this.score;
        this.accuracyElement.textContent = `${accuracy}%`;
        this.timeTakenElement.textContent = `${timeTaken}초`;
        
        // 성과 메시지
        let message = '';
        let messageClass = '';
        
        if (accuracy >= 90) {
            message = '🏆 완벽합니다! 당신은 퀴즈의 전문가입니다!';
            messageClass = 'excellent';
        } else if (accuracy >= 70) {
            message = '🌟 아주 잘했습니다! 퀴즈 실력이 뛰어나시네요!';
            messageClass = 'good';
        } else if (accuracy >= 50) {
            message = '👍 좋은 시도였습니다! 더 연습하면 더 나아질 거예요!';
            messageClass = 'average';
        } else {
            message = '💪 다음에는 더 잘할 수 있어요! 포기하지 마세요!';
            messageClass = 'poor';
        }
        
        this.performanceMessage.textContent = message;
        this.performanceMessage.className = `performance-message ${messageClass}`;
        
        // 화면 전환
        this.switchScreen('result');
    }
    
    restartQuiz() {
        this.startQuiz();
    }
    
    goToHome() {
        this.switchScreen('start');
        this.resetSelections();
    }
    
    resetSelections() {
        this.selectedTopic = null;
        this.selectedDifficulty = null;
        this.topicButtons.forEach(btn => btn.classList.remove('selected'));
        this.difficultyButtons.forEach(btn => btn.classList.remove('selected'));
        this.startQuizBtn.disabled = true;
    }
    
    switchScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        this.screens[screenName].classList.add('active');
        this.currentScreen = screenName;
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});