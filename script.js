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
                        correct: 0
                    },
                    {
                        question: "태양계에서 가장 큰 행성은 무엇인가요?",
                        answers: ["지구", "화성", "목성", "토성"],
                        correct: 2
                    },
                    {
                        question: "광합성에 필요한 것은 무엇인가요?",
                        answers: ["산소", "이산화탄소", "질소", "수소"],
                        correct: 1
                    },
                    {
                        question: "무지개의 색깔 수는 몇 개인가요?",
                        answers: ["5개", "6개", "7개", "8개"],
                        correct: 2
                    },
                    {
                        question: "지구의 위성은 무엇인가요?",
                        answers: ["태양", "달", "화성", "금성"],
                        correct: 1
                    },
                    {
                        question: "물이 끓는 온도는 몇 도인가요?",
                        answers: ["90°C", "100°C", "110°C", "120°C"],
                        correct: 1
                    },
                    {
                        question: "인체에서 가장 큰 장기는 무엇인가요?",
                        answers: ["심장", "간", "뇌", "피부"],
                        correct: 3
                    },
                    {
                        question: "꿀을 만드는 곤충은 무엇인가요?",
                        answers: ["나비", "벌", "잠자리", "사슴벌레"],
                        correct: 1
                    },
                    {
                        question: "눈이 보이는 기관은 무엇인가요?",
                        answers: ["코", "입", "귀", "눈"],
                        correct: 3
                    },
                    {
                        question: "하늘에서 별이 가장 많이 보이는 시간은 언제인가요?",
                        answers: ["아침", "점심", "저녁", "밤"],
                        correct: 3
                    }
                ],
                medium: [
                    {
                        question: "원자번호 6인 원소는 무엇인가요?",
                        answers: ["산소", "질소", "탄소", "수소"],
                        correct: 2
                    },
                    {
                        question: "빛의 속도는 얼마인가요?",
                        answers: ["약 30만 km/s", "약 3만 km/s", "약 300만 km/s", "약 3천 km/s"],
                        correct: 0
                    },
                    {
                        question: "DNA의 전체 이름은 무엇인가요?",
                        answers: ["리보핵산", "디옥시리보핵산", "아미노산", "단백질"],
                        correct: 1
                    },
                    {
                        question: "인체의 혈액형은 몇 가지인가요?",
                        answers: ["2가지", "3가지", "4가지", "5가지"],
                        correct: 2
                    },
                    {
                        question: "태양은 어떤 종류의 항성인가요?",
                        answers: ["거성", "백색왜성", "황색왜성", "적색왜성"],
                        correct: 2
                    },
                    {
                        question: "전기를 발견한 과학자는 누구인가요?",
                        answers: ["뉴턴", "에디슨", "프랭클린", "아인슈타인"],
                        correct: 2
                    },
                    {
                        question: "주기율표에서 원소 기호 'Au'는 무엇인가요?",
                        answers: ["은", "금", "구리", "철"],
                        correct: 1
                    },
                    {
                        question: "인체의 뼈는 총 몇 개인가요?",
                        answers: ["106개", "126개", "206개", "306개"],
                        correct: 2
                    },
                    {
                        question: "사운드의 속도는 얼마인가요?",
                        answers: ["약 240m/s", "약 340m/s", "약 440m/s", "약 540m/s"],
                        correct: 1
                    },
                    {
                        question: "태양계에서 두 번째 행성은 무엇인가요?",
                        answers: ["수성", "금성", "지구", "화성"],
                        correct: 1
                    }
                ],
                hard: [
                    {
                        question: "양자역학에서 슈뢰딩거의 고양이 사고 실험의 목적은 무엇인가요?",
                        answers: ["고양이의 생존 실험", "중첩 상태의 모순 설명", "시간 여행 가능성", "동물 실험 윤리"],
                        correct: 1
                    },
                    {
                        question: "아인슈타인의 유명한 공식 E=mc²에서 c는 무엇을 의미하나요?",
                        answers: ["속도", "광속", "전하", "질량"],
                        correct: 1
                    },
                    {
                        question: "PCR 기법을 개발한 과학자는 누구인가요?",
                        answers: ["왓슨", "크릭", "멀리스", "다윈"],
                        correct: 2
                    },
                    {
                        question: "보어의 원자 모형에서 전자는 어떻게 움직인다고 했나요?",
                        answers: ["자유롭게", "원심 궤도", "불규칙하게", "정지해있음"],
                        correct: 1
                    },
                    {
                        question: "허블 망원경이 위치한 곳은 어디인가요?",
                        answers: ["지상", "달", "저궤도", "성운"],
                        correct: 2
                    },
                    {
                        question: "플랑크 상수는 어떤 단위를 갖나요?",
                        answers: ["m/s", "J·s", "N/m", "W/m²"],
                        correct: 1
                    },
                    {
                        question: "입자 가속기 LHC는 어느 나라에 있나요?",
                        answers: ["미국", "독일", "스위스", "일본"],
                        correct: 2
                    },
                    {
                        question: "RNA 스플라이싱이 일어나는 세포 기관은 무엇인가요?",
                        answers: ["리보솜", "미토콘드리아", "핵", "골지체"],
                        correct: 2
                    },
                    {
                        question: "맥스웰 방정식이 설명하는 현상은 무엇인가요?",
                        answers: ["중력", "전자기학", "열역학", "양자역학"],
                        correct: 1
                    },
                    {
                        question: "중성자 발견자는 누구인가요?",
                        answers: ["러더퍼드", "채드윅", "톰슨", "보어"],
                        correct: 1
                    }
                ]
            },
            history: {
                easy: [
                    {
                        question: "조선시대의 수도는 어디였나요?",
                        answers: ["부산", "대구", "한성(서울)", "광주"],
                        correct: 2
                    },
                    {
                        question: "세종대왕이 만든 문자는 무엇인가요?",
                        answers: ["한자", "히라가나", "한글", "한문"],
                        correct: 2
                    },
                    {
                        question: "삼국시대에 해당하지 않는 나라는?",
                        answers: ["고구려", "백제", "신라", "발해"],
                        correct: 3
                    },
                    {
                        question: "한글이 창제된 연도는?",
                        answers: ["1392년", "1443년", "1492년", "1592년"],
                        correct: 1
                    },
                    {
                        question: "임진왜란은 몇 년도에 일어났나요?",
                        answers: ["1582년", "1592년", "1602년", "1612년"],
                        correct: 1
                    },
                    {
                        question: "조선을 건국한 사람은 누구인가요?",
                        answers: ["왕건", "이성계", "정몽주", "이순신"],
                        correct: 1
                    },
                    {
                        question: "고려의 마지막 왕은 누구인가요?",
                        answers: ["광종", "성종", "공양왕", "충렬왕"],
                        correct: 2
                    },
                    {
                        question: "한국사에서 최초의 여왕은 누구인가요?",
                        answers: ["선덕여왕", "진덕여왕", "진흥왕", "태종"],
                        correct: 0
                    },
                    {
                        question: "세계 최초의 금속활자는 어느 나라에서 만들었나요?",
                        answers: ["중국", "일본", "한국", "베트남"],
                        correct: 2
                    },
                    {
                        question: "이순신 장군이 사용한 거북선은 몇 층으로 되어있나요?",
                        answers: ["1층", "2층", "3층", "4층"],
                        correct: 1
                    }
                ],
                medium: [
                    {
                        question: "1894년에 일어난 농민 반란은 무엇인가요?",
                        answers: ["갑오개혁", "을미사변", "동학 농민 운동", "정미의병"],
                        correct: 2
                    },
                    {
                        question: "을사조약이 체결된 연도는?",
                        answers: ["1905년", "1910년", "1919년", "1945년"],
                        correct: 0
                    },
                    {
                        question: "광복이 일어난 해는?",
                        answers: ["1942년", "1943년", "1944년", "1945년"],
                        correct: 3
                    },
                    {
                        question: "대한민국 임시정부가 수립된 곳은?",
                        answers: ["서울", "상하이", "북경", "도쿄"],
                        correct: 1
                    },
                    {
                        question: "3.1 운동이 일어난 년도는?",
                        answers: ["1915년", "1917년", "1919년", "1921년"],
                        correct: 2
                    },
                    {
                        question: "신라의 화백제도는 어떤 기관이었나요?",
                        answers: ["군사기관", "의회기관", "행정기관", "사법기관"],
                        correct: 1
                    },
                    {
                        question: "고려시대 최고의 교육기관은?",
                        answers: ["서당", "향교", "성균관", "국학"],
                        correct: 2
                    },
                    {
                        question: "발해를 건국한 사람은?",
                        answers: ["대조영", "걸걸중상", "대무예", "대인수"],
                        correct: 0
                    },
                    {
                        question: "조선시대의 세종 시기 과학자가 아닌 사람은?",
                        answers: ["장영실", "이순지", "정약용", "이천"],
                        correct: 2
                    },
                    {
                        question: "한일합방이 일어난 연도는?",
                        answers: ["1908년", "1909년", "1910년", "1911년"],
                        correct: 2
                    }
                ],
                hard: [
                    {
                        question: "고려시대의 과거 제도에서 최고 관등은 무엇인가요?",
                        answers: ["문과", "무과", "잡과", "승과"],
                        correct: 0
                    },
                    {
                        question: "조선시대 5군영에 해당하지 않는 것은?",
                        answers: ["어영청", "총융청", "수어청", "금위영"],
                        correct: 3
                    },
                    {
                        question: "갑오개혁이 시작된 연도는?",
                        answers: ["1892년", "1893년", "1894년", "1895년"],
                        correct: 2
                    },
                    {
                        question: "삼국사기의 편찬자는?",
                        answers: ["김부식", "일연", "이승휴", "최치원"],
                        correct: 0
                    },
                    {
                        question: "조선시대 당인재를 뽑는 시험과 거의 같은 과거는?",
                        answers: ["문과", "무과", "잡과", "생원시"],
                        correct: 3
                    },
                    {
                        question: "고려시대의 전시과는 어떤 제도인가?",
                        answers: ["세금 제도", "토지 분배 제도", "군사 제도", "교육 제도"],
                        correct: 1
                    },
                    {
                        question: "조선의 붕당정치가 시작된 임금은?",
                        answers: ["선조", "광해군", "인조", "영조"],
                        correct: 0
                    },
                    {
                        question: "정약용이 저술한 실학 저서는?",
                        answers: ["성호사설", "동국문헌비고", "목민심서", "조선통사"],
                        correct: 2
                    },
                    {
                        question: "대한제국이 선포된 연도는?",
                        answers: ["1895년", "1896년", "1897년", "1898년"],
                        correct: 2
                    },
                    {
                        question: "6.25 전쟁이 일어난 연도는?",
                        answers: ["1948년", "1949년", "1950년", "1951년"],
                        correct: 2
                    }
                ]
            },
            geography: {
                easy: [
                    {
                        question: "세계에서 가장 긴 강은 무엇인가요?",
                        answers: ["아마존강", "나일강", "미시시피강", "양쯔강"],
                        correct: 1
                    },
                    {
                        question: "대한민국에서 가장 높은 산은 무엇인가요?",
                        answers: ["북한산", "설악산", "한라산", "지리산"],
                        correct: 2
                    },
                    {
                        question: "대한민국의 수도는 어디인가요?",
                        answers: ["부산", "대구", "서울", "광주"],
                        correct: 2
                    },
                    {
                        question: "일본의 수도는 어디인가요?",
                        answers: ["오사카", "도쿄", "교토", "나고야"],
                        correct: 1
                    },
                    {
                        question: "세계에서 가장 넓은 대양은?",
                        answers: ["대서양", "인도양", "북극해", "태평양"],
                        correct: 3
                    },
                    {
                        question: "한반도는 어느 반도에 속하나요?",
                        answers: ["인도차이나반도", "아라비아반도", "발레아레스반도", "자체반도"],
                        correct: 3
                    },
                    {
                        question: "중국의 수도는 어디인가요?",
                        answers: ["상하이", "북경", "홍콩", "천진"],
                        correct: 1
                    },
                    {
                        question: "미국의 수도는 어디인가요?",
                        answers: ["뉴욕", "로스앤젤레스", "워싱턴 D.C.", "시카고"],
                        correct: 2
                    },
                    {
                        question: "세계에서 가장 작은 대륙은?",
                        answers: ["아시아", "유럽", "오세아니아", "남극"],
                        correct: 2
                    },
                    {
                        question: "강원도는 어느 지역에 있나요?",
                        answers: ["남부", "중부", "북부", "제주"],
                        correct: 1
                    }
                ],
                medium: [
                    {
                        question: "사하라 사막은 어느 대륙에 있나요?",
                        answers: ["아시아", "아프리카", "오스트레일리아", "남아메리카"],
                        correct: 1
                    },
                    {
                        question: "에베레스트 산은 어느 국가에 있나요?",
                        answers: ["인도", "중국/네팔", "파키스탄", "티베트"],
                        correct: 1
                    },
                    {
                        question: "리오그란데 강은 어느 두 국가의 국경을 이루나요?",
                        answers: ["미국/캐나다", "미국/멕시코", "브라질/아르헨티나", "프랑스/스페인"],
                        correct: 1
                    },
                    {
                        question: "세계에서 가장 깊은 바다는?",
                        answers: ["태평양", "대서양", "인도양", "북극해"],
                        correct: 0
                    },
                    {
                        question: "지중해는 어느 대륙들 사이에 있나요?",
                        answers: ["아시아/유럽", "유럽/아프리카", "아프리카/아시아", "남미/북미"],
                        correct: 1
                    },
                    {
                        question: "세계에서 가장 긴 해안선을 가진 국가는?",
                        answers: ["미국", "러시아", "캐나다", "호주"],
                        correct: 2
                    },
                    {
                        question: "알프스 산맥은 어느 대륙에 있나요?",
                        answers: ["아시아", "아프리카", "유럽", "남아메리카"],
                        correct: 2
                    },
                    {
                        question: "나일 강의 발원지는 어디인가요?",
                        answers: ["콩고", "케냐", "에티오피아", "이집트"],
                        correct: 2
                    },
                    {
                        question: "세계에서 가장 큰 섬은?",
                        answers: ["영국", "일본", "그린란드", "뉴기니"],
                        correct: 2
                    },
                    {
                        question: "흑해는 어느 대륙에 인접해 있나요?",
                        answers: ["아시아와 유럽", "아프리카와 아시아", "유럽과 아프리카", "남미와 북미"],
                        correct: 0
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