// Combinatorics App - Main JavaScript File

// Global state
let currentGame = null;
let gameScore = 0;
let gameLevel = 1;

// User progress tracking
let userProgress = {
    problemsSolved: 0,
    gamesCompleted: 0,
    calculationsDone: 0,
    totalScore: 0,
    achievements: {
        firstProblem: false,
        gameMaster: false,
        calculatorPro: false
    },
    hasSeenWelcome: false
};

// Tour state
let currentTourStep = 0;
const tourSteps = [
    {
        title: "Welcome to Combinatorics App! 🎉",
        description: "This app helps you master combinatorics through real-world problems and fun games. Let's take a quick tour!",
        target: null
    },
    {
        title: "Navigation Menu",
        description: "Use these links to explore different sections. Each section has a specific purpose in your learning journey.",
        target: ".nav"
    },
    {
        title: "Quick Start Guide",
        description: "Follow these 4 steps to get the most out of the app. Start with learning the basics, then practice with the calculator.",
        target: ".quick-start"
    },
    {
        title: "Real-World Problems",
        description: "Solve practical problems like scheduling, route optimization, and security analysis. These problems show how combinatorics applies to real life.",
        target: ".feature-card:nth-child(1)"
    },
    {
        title: "Interactive Games",
        description: "Play fun games that reinforce your learning. Games make abstract concepts concrete and memorable.",
        target: ".feature-card:nth-child(2)"
    }
];

// Navigation
function showSection(sectionId) {
    // Use mobile full-screen mode for problems and learning on mobile
    if (isMobile() && (sectionId === 'problems' || sectionId === 'learn')) {
        startMobileSection(sectionId);
        return;
    }
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update desktop navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
    
    // Update mobile navigation
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Map section IDs to mobile nav items
    const sectionMap = {
        'home': 0,
        'problems': 1,
        'games': 2,
        'calculator': 3,
        'learn': 4
    };
    
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    if (mobileNavItems[sectionMap[sectionId]]) {
        mobileNavItems[sectionMap[sectionId]].classList.add('active');
    }
}

// Real-world Problems
const problems = {
    scheduling: {
        title: "Class Schedule Optimization",
        scenario: "A university needs to schedule 8 different classes across 5 time slots. Each class has specific room requirements and some students need to take multiple classes. How can we minimize scheduling conflicts?",
        problem: "Given the constraints below, find the optimal schedule that minimizes conflicts:",
        constraints: [
            "Math 101 and Physics 101 cannot be at the same time (shared students)",
            "Chemistry 101 needs a lab room (only available in slots 2, 4, 5)",
            "English 101 and History 101 share a professor (cannot overlap)",
            "Computer Science 101 needs a computer lab (slots 1, 3, 5)",
            "Biology 101 has 120 students (needs large room - slots 1, 2, 4)",
            "Art 101 needs an art studio (slots 2, 3, 4)",
            "Economics 101 can be in any slot",
            "Statistics 101 needs a room with projectors (slots 1, 2, 3, 4)"
        ],
        solution: "This is a graph coloring problem where we assign colors (time slots) to vertices (classes) such that adjacent vertices (conflicting classes) have different colors.",
        steps: [
            "Create a conflict graph where classes are vertices and conflicts are edges",
            "Apply graph coloring algorithm to find minimum number of colors needed",
            "If we need more than 5 colors, the problem has no solution",
            "If solvable, assign time slots based on the coloring"
        ],
        interactive: true
    },
    
    optimization: {
        title: "Delivery Route Optimization",
        scenario: "A delivery company needs to visit 6 locations in a city. Each location has specific delivery windows and the driver wants to minimize total travel time.",
        problem: "Find the optimal route that visits all locations exactly once while minimizing total distance:",
        locations: [
            { name: "Warehouse", x: 0, y: 0, window: "8:00-18:00" },
            { name: "Downtown Office", x: 3, y: 4, window: "9:00-17:00" },
            { name: "Shopping Mall", x: 7, y: 2, window: "10:00-20:00" },
            { name: "Residential Area", x: 2, y: 8, window: "8:00-19:00" },
            { name: "Industrial Zone", x: 9, y: 6, window: "7:00-16:00" },
            { name: "University", x: 5, y: 9, window: "9:00-17:00" }
        ],
        solution: "This is a Traveling Salesman Problem (TSP). We'll use a heuristic approach to find a good solution.",
        steps: [
            "Calculate distances between all pairs of locations",
            "Start with the nearest neighbor heuristic",
            "Apply 2-opt improvement to reduce total distance",
            "Consider delivery time windows in the final route"
        ],
        interactive: true
    },
    
    counting: {
        title: "Password Security Analysis",
        scenario: "A company needs to create secure passwords for their employees. They want to understand how many possible passwords exist under different security policies.",
        problem: "Calculate the number of possible passwords under these constraints:",
        policies: [
            "Policy A: 8 characters, letters and numbers only",
            "Policy B: 10 characters, must include uppercase, lowercase, numbers, and symbols",
            "Policy C: 12 characters, no repeated characters allowed",
            "Policy D: 8 characters, must start with a letter and end with a number"
        ],
        solution: "We'll use the fundamental counting principle and permutations/combinations to calculate possibilities.",
        steps: [
            "Policy A: 36^8 = 2,821,109,907,456 possibilities",
            "Policy B: 94^10 = 5,386,789,000,000,000,000,000 possibilities",
            "Policy C: 94!/(94-12)! = 4,750,000,000,000,000,000,000 possibilities",
            "Policy D: 26 × 94^6 × 10 = 1,500,000,000,000,000 possibilities"
        ],
        interactive: true
    },
    
    genetics: {
        title: "DNA Sequence Analysis",
        scenario: "A geneticist is analyzing DNA sequences to understand genetic diversity. They need to count different arrangements of nucleotide bases and calculate probabilities of genetic combinations.",
        problem: "Analyze the following DNA sequence and answer the combinatorial questions:",
        sequence: "ATCGATCGATCGATCG",
        questions: [
            "How many different 4-base sequences can be formed from this DNA?",
            "What's the probability of finding the sequence 'ATCG' in a random arrangement?",
            "How many ways can the bases be arranged if A and T must be adjacent?",
            "Calculate the number of possible genetic codes with these constraints"
        ],
        solution: "This involves permutations with repetition, conditional probability, and constrained arrangements.",
        steps: [
            "Count total bases: 16 bases (4 A, 4 T, 4 C, 4 G)",
            "Calculate 4-base sequences: 4^4 = 256 possibilities",
            "Find 'ATCG' probability: 1/256 ≈ 0.0039",
            "Calculate adjacent A-T arrangements using constrained permutations"
        ],
        interactive: true
    },
    
    cryptography: {
        title: "Password Security Analysis",
        scenario: "A cybersecurity expert needs to assess the strength of different password policies and encryption methods using combinatorial analysis.",
        problem: "Evaluate the security of these password systems:",
        policies: [
            "8 characters, letters and numbers only",
            "12 characters, must include uppercase, lowercase, numbers, symbols",
            "Variable length, no repeated characters",
            "Biometric + PIN combination system"
        ],
        solution: "Use combinatorial counting to determine the number of possible passwords and assess security strength.",
        steps: [
            "Policy 1: 36^8 = 2.8 trillion possibilities",
            "Policy 2: 94^12 = 4.7 × 10^23 possibilities", 
            "Policy 3: Use permutations without repetition",
            "Policy 4: Combine biometric probability with PIN combinations"
        ],
        interactive: true
    },
    
    network: {
        title: "Social Network Analysis",
        scenario: "A social media platform wants to analyze connection patterns and predict viral content spread using graph theory and combinatorics.",
        problem: "Analyze the network structure and answer these questions:",
        network_data: {
            nodes: 1000,
            edges: 5000,
            clusters: 15,
            avg_degree: 10
        },
        questions: [
            "How many possible paths exist between any two users?",
            "What's the probability of information spreading to 50% of users?",
            "Calculate the number of triangles (mutual connections) in the network",
            "Determine the most influential user using centrality measures"
        ],
        solution: "Apply graph theory, network analysis, and combinatorial optimization techniques.",
        steps: [
            "Use adjacency matrix to count paths",
            "Apply epidemic models for spread probability",
            "Count triangles using matrix multiplication",
            "Calculate betweenness and eigenvector centrality"
        ],
        interactive: true
    },
    
    finance: {
        title: "Portfolio Optimization",
        scenario: "A financial analyst needs to optimize an investment portfolio using combinatorial methods to maximize returns while minimizing risk.",
        problem: "Design an optimal portfolio with these constraints:",
        assets: [
            { name: "Stocks", return: 0.12, risk: 0.25, weight_limit: 0.6 },
            { name: "Bonds", return: 0.06, risk: 0.10, weight_limit: 0.4 },
            { name: "Commodities", return: 0.08, risk: 0.20, weight_limit: 0.3 },
            { name: "Real Estate", return: 0.10, risk: 0.15, weight_limit: 0.2 }
        ],
        constraints: [
            "Total weight must equal 1.0",
            "No single asset can exceed its weight limit",
            "Risk tolerance: maximum 0.18 portfolio risk",
            "Minimum expected return: 8%"
        ],
        solution: "Use combinatorial optimization to find the best asset allocation.",
        steps: [
            "Generate all valid weight combinations",
            "Calculate expected return and risk for each combination",
            "Filter combinations meeting constraints",
            "Select combination with highest return-to-risk ratio"
        ],
        interactive: true
    },
    
    probability: {
        title: "Risk Assessment for Investment Portfolio",
        scenario: "An investor wants to diversify their portfolio across 5 different sectors. They need to assess the probability of different outcomes based on historical data.",
        problem: "Calculate probabilities for various portfolio scenarios:",
        sectors: [
            { name: "Technology", success_rate: 0.7, weight: 0.3 },
            { name: "Healthcare", success_rate: 0.8, weight: 0.25 },
            { name: "Finance", success_rate: 0.6, weight: 0.2 },
            { name: "Energy", success_rate: 0.5, weight: 0.15 },
            { name: "Consumer", success_rate: 0.75, weight: 0.1 }
        ],
        questions: [
            "What's the probability that at least 3 sectors perform well?",
            "What's the expected return if 'success' means 10% gain and 'failure' means 5% loss?",
            "What's the probability of a positive overall return?"
        ],
        solution: "We'll use binomial probability and expected value calculations.",
        steps: [
            "Calculate individual sector probabilities",
            "Use binomial distribution for 'at least 3 successes'",
            "Calculate expected value using weighted probabilities",
            "Determine overall portfolio success probability"
        ],
        interactive: true
    }
};

function loadProblem(problemType) {
    const problem = problems[problemType];
    const workspace = document.getElementById('problem-workspace');
    const title = document.getElementById('problem-title');
    const content = document.getElementById('problem-content');
    
    title.textContent = problem.title;
    
    // Problem loaded - no progress tracking yet
    
    let html = `
        <div class="problem-scenario">
            <h4>Scenario:</h4>
            <p>${problem.scenario}</p>
        </div>
        
        <div class="problem-scenario">
            <h4>Problem:</h4>
            <p>${problem.problem}</p>
        </div>
    `;
    
    if (problem.constraints) {
        html += `
            <div class="problem-scenario">
                <h4>Constraints:</h4>
                <ul>
                    ${problem.constraints.map(constraint => `<li>${constraint}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (problem.locations) {
        html += `
            <div class="problem-scenario">
                <h4>Locations:</h4>
                <div class="locations-grid">
                    ${problem.locations.map(loc => `
                        <div class="location-item">
                            <strong>${loc.name}</strong><br>
                            Position: (${loc.x}, ${loc.y})<br>
                            Window: ${loc.window}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    if (problem.policies) {
        html += `
            <div class="problem-scenario">
                <h4>Security Policies:</h4>
                <ul>
                    ${problem.policies.map(policy => `<li>${policy}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (problem.sectors) {
        html += `
            <div class="problem-scenario">
                <h4>Investment Sectors:</h4>
                <div class="sectors-grid">
                    ${problem.sectors.map(sector => `
                        <div class="sector-item">
                            <strong>${sector.name}</strong><br>
                            Success Rate: ${(sector.success_rate * 100).toFixed(0)}%<br>
                            Portfolio Weight: ${(sector.weight * 100).toFixed(0)}%
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    html += `
        <div class="solution-steps">
            <h4>Solution Approach:</h4>
            <p>${problem.solution}</p>
            
            <h4>Step-by-step Solution:</h4>
            ${problem.steps.map((step, index) => `
                <div class="step">
                    <span class="step-number">${index + 1}.</span> ${step}
                </div>
            `).join('')}
        </div>
    `;
    
    if (problem.interactive) {
        html += `
            <div class="interactive-section">
                <h4>Try It Yourself:</h4>
                <button class="btn btn-primary" onclick="startInteractiveProblem('${problemType}')">
                    <i class="fas fa-play"></i> Interactive Demo
                </button>
            </div>
        `;
    }
    
    // Add solve button
    html += `
        <div class="problem-actions" style="margin-top: 2rem; text-align: center;">
            <button class="btn btn-primary" onclick="solveProblem()">
                <i class="fas fa-check"></i> Mark as Solved
            </button>
        </div>
    `;
    
    content.innerHTML = html;
    workspace.style.display = 'block';
}

function closeProblem() {
    document.getElementById('problem-workspace').style.display = 'none';
}

function solveProblem() {
    // Mark problem as solved
    updateProgress('problem');
    showAchievement('Problem Solver', 'Great job solving this real-world problem!');
    document.getElementById('problem-workspace').style.display = 'none';
}

// Mobile detection
function isMobile() {
    return window.innerWidth <= 768;
}

// Mobile game fullscreen mode
function startMobileGame(gameType) {
    if (!isMobile()) {
        startGame(gameType);
        return;
    }
    
    const game = games[gameType];
    if (!game) return;
    
    // Create fullscreen game container
    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.className = 'game-fullscreen';
    fullscreenContainer.id = 'mobile-game-container';
    
    fullscreenContainer.innerHTML = `
        <div class="game-header">
            <h3>${game.title}</h3>
            <button class="btn btn-outline" onclick="closeMobileGame()">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
        <div class="game-content" id="mobile-game-content"></div>
    `;
    
    document.body.appendChild(fullscreenContainer);
    
    // Set current game and score
    currentGame = gameType;
    gameScore = 0;
    
    // Generate the game content directly in mobile container
    const mobileGameContent = document.getElementById('mobile-game-content');
    
    // Call the game's start function with mobile content
    if (game.start) {
        // Temporarily set the game content to mobile container
        const originalGameContent = document.getElementById('game-content');
        const tempId = originalGameContent.id;
        originalGameContent.id = 'temp-game-content';
        mobileGameContent.id = 'game-content';
        
        // Start the game
        game.start();
        
        // Restore original IDs
        originalGameContent.id = tempId;
        mobileGameContent.id = 'mobile-game-content';
    }
}

function closeMobileGame() {
    const container = document.getElementById('mobile-game-container');
    if (container) {
        container.remove();
    }
    
    // Reset game state
    currentGame = null;
    gameScore = 0;
    
    // Hide the main game workspace
    const workspace = document.getElementById('game-workspace');
    if (workspace) {
        workspace.style.display = 'none';
    }
}

// Mobile section fullscreen mode (for problems and learning)
function startMobileSection(sectionId) {
    if (!isMobile()) {
        showSection(sectionId);
        return;
    }
    
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Create fullscreen section container
    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.className = 'section-fullscreen';
    fullscreenContainer.id = 'mobile-section-container';
    
    // Get section title
    const sectionTitles = {
        'problems': 'Real-World Problems',
        'learn': 'Learning Center'
    };
    
    fullscreenContainer.innerHTML = `
        <div class="section-header">
            <h3>${sectionTitles[sectionId] || sectionId}</h3>
            <button class="btn btn-outline" onclick="closeMobileSection()">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
        <div class="section-content" id="mobile-section-content"></div>
    `;
    
    document.body.appendChild(fullscreenContainer);
    
    // Copy section content to mobile container
    const mobileSectionContent = document.getElementById('mobile-section-content');
    const originalContent = section.innerHTML;
    mobileSectionContent.innerHTML = originalContent;
    
    // Update mobile navigation active state
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const sectionMap = {
        'problems': 1,
        'learn': 4
    };
    
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    if (mobileNavItems[sectionMap[sectionId]]) {
        mobileNavItems[sectionMap[sectionId]].classList.add('active');
    }
}

function closeMobileSection() {
    const container = document.getElementById('mobile-section-container');
    if (container) {
        container.remove();
    }
}

// Games
const games = {
    'permutation-puzzle': {
        title: "Permutation Puzzle",
        description: "Arrange the items in different orders to discover patterns!",
        start: function() {
            const items = ['A', 'B', 'C', 'D'];
            let currentPermutation = [...items];
            let targetPermutation = shuffleArray([...items]);
            let moves = 0;
            
            const gameContent = document.getElementById('game-content');
            gameContent.innerHTML = `
                <div class="game-instructions">
                    <h4>Goal: Arrange the items to match the target pattern</h4>
                    <p>Click on two items to swap their positions. Try to solve it in as few moves as possible!</p>
                </div>
                
                <div class="game-board">
                    <div class="target-pattern">
                        <h5>Target Pattern:</h5>
                        <div class="pattern-display">
                            ${targetPermutation.map(item => `<span class="pattern-item">${item}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="current-pattern">
                        <h5>Your Pattern:</h5>
                        <div class="pattern-display" id="current-pattern">
                            ${currentPermutation.map((item, index) => 
                                `<span class="pattern-item clickable" onclick="selectItem(${index})" data-index="${index}">${item}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="game-stats">
                    <p>Moves: <span id="moves">0</span></p>
                    <p>Status: <span id="status">Keep trying!</span></p>
                </div>
                
                <div class="game-controls">
                    <button class="btn btn-secondary" onclick="shuffleCurrent()">Shuffle</button>
                    <button class="btn btn-primary" onclick="checkSolution()">Check Solution</button>
                </div>
            `;
            
            window.currentPermutation = currentPermutation;
            window.targetPermutation = targetPermutation;
            window.moves = moves;
            window.selectedIndex = null;
        }
    },
    
    'combination-challenge': {
        title: "Combination Challenge",
        description: "Select the right combination of items to solve the puzzle!",
        start: function() {
            const items = [
                { name: "Red Ball", color: "red", value: 3 },
                { name: "Blue Ball", color: "blue", value: 5 },
                { name: "Green Ball", color: "green", value: 2 },
                { name: "Yellow Ball", color: "yellow", value: 4 },
                { name: "Purple Ball", color: "purple", value: 6 },
                { name: "Orange Ball", color: "orange", value: 1 }
            ];
            
            const targetSum = 12;
            let selectedItems = [];
            
            const gameContent = document.getElementById('game-content');
            gameContent.innerHTML = `
                <div class="game-instructions">
                    <h4>Goal: Select exactly 3 balls that sum to ${targetSum}</h4>
                    <p>Click on balls to select/deselect them. Find the combination that adds up to the target!</p>
                </div>
                
                <div class="game-board">
                    <div class="items-grid">
                        ${items.map((item, index) => `
                            <div class="game-item" onclick="toggleItem(${index})" data-index="${index}">
                                <div class="item-color" style="background-color: ${item.color}"></div>
                                <div class="item-name">${item.name}</div>
                                <div class="item-value">Value: ${item.value}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="game-stats">
                    <p>Selected: <span id="selected-count">0</span>/3</p>
                    <p>Current Sum: <span id="current-sum">0</span></p>
                    <p>Target: ${targetSum}</p>
                    <p>Status: <span id="status">Select 3 items</span></p>
                </div>
                
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="checkCombination()">Check Combination</button>
                    <button class="btn btn-secondary" onclick="clearSelection()">Clear All</button>
                </div>
            `;
            
            window.items = items;
            window.targetSum = targetSum;
            window.selectedItems = selectedItems;
        }
    },
    
    'probability-roulette': {
        title: "Probability Roulette",
        description: "Predict outcomes and calculate probabilities in real-time!",
        start: function() {
            const gameContent = document.getElementById('game-content');
            gameContent.innerHTML = `
                <div class="game-instructions">
                    <h4>Goal: Predict the probability of different outcomes</h4>
                    <p>You have a bag with 3 red balls, 2 blue balls, and 1 green ball. Make your predictions!</p>
                </div>
                
                <div class="game-board">
                    <div class="bag-display">
                        <h5>Bag Contents:</h5>
                        <div class="balls-display">
                            <span class="ball red">🔴</span>
                            <span class="ball red">🔴</span>
                            <span class="ball red">🔴</span>
                            <span class="ball blue">🔵</span>
                            <span class="ball blue">🔵</span>
                            <span class="ball green">🟢</span>
                        </div>
                    </div>
                    
                    <div class="prediction-section">
                        <h5>Make Your Predictions:</h5>
                        <div class="prediction-inputs">
                            <label>Probability of drawing a red ball:</label>
                            <input type="number" id="red-prob" min="0" max="1" step="0.01" placeholder="0.00">
                            
                            <label>Probability of drawing a blue ball:</label>
                            <input type="number" id="blue-prob" min="0" max="1" step="0.01" placeholder="0.00">
                            
                            <label>Probability of drawing a green ball:</label>
                            <input type="number" id="green-prob" min="0" max="1" step="0.01" placeholder="0.00">
                        </div>
                    </div>
                </div>
                
                <div class="game-stats">
                    <p>Correct Answers: <span id="correct-count">0</span>/3</p>
                    <p>Status: <span id="status">Make your predictions</span></p>
                </div>
                
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="checkPredictions()">Check Predictions</button>
                    <button class="btn btn-secondary" onclick="showCorrectAnswers()">Show Answers</button>
                </div>
            `;
        }
    },
    
    'sudoku-solver': {
        title: "Sudoku Solver",
        description: "Use combinatorial logic to solve Sudoku puzzles!",
        start: function() {
            const gameContent = document.getElementById('game-content');
            gameContent.innerHTML = `
                <div class="game-instructions">
                    <h4>Goal: Solve the Sudoku puzzle using combinatorial logic</h4>
                    <p>Click on empty cells to fill them. Use the elimination method and logical deduction!</p>
                </div>
                
                <div class="sudoku-grid">
                    ${generateSudokuGrid()}
                </div>
                
                <div class="game-stats">
                    <p>Hints Used: <span id="hints-used">0</span></p>
                    <p>Time: <span id="sudoku-time">00:00</span></p>
                    <p>Status: <span id="status">Start solving!</span></p>
                </div>
                
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="checkSudokuSolution()">Check Solution</button>
                    <button class="btn btn-secondary" onclick="getHint()">Get Hint</button>
                    <button class="btn btn-outline" onclick="resetSudoku()">Reset</button>
                </div>
            `;
            
            startSudokuTimer();
        }
    },
    
    'binomial-builder': {
        title: "Binomial Builder",
        description: "Build and explore Pascal's triangle and binomial expansions!",
        start: function() {
            const gameContent = document.getElementById('game-content');
            gameContent.innerHTML = `
                <div class="game-instructions">
                    <h4>Goal: Build Pascal's triangle and explore binomial expansions</h4>
                    <p>Click on cells to expand them and see the binomial coefficients!</p>
                </div>
                
                <div class="pascal-triangle">
                    ${generatePascalTriangle(8)}
                </div>
                
                <div class="binomial-expansion">
                    <h4>Binomial Expansion:</h4>
                    <div class="expansion-input">
                        <input type="number" id="binomial-n" min="0" max="10" value="3" onchange="updateBinomialExpansion()">
                        <span>(x + y)^<span id="binomial-power">3</span></span>
                    </div>
                    <div id="expansion-result" class="expansion-result"></div>
                </div>
                
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="updateBinomialExpansion()">Update Expansion</button>
                    <button class="btn btn-secondary" onclick="animateTriangle()">Animate Triangle</button>
                </div>
            `;
            
            updateBinomialExpansion();
        }
    },
    
    'sequence-predictor': {
        title: "Sequence Predictor",
        description: "Find patterns in number sequences using combinatorial analysis!",
        start: function() {
            const sequences = [
                { seq: [1, 1, 2, 3, 5, 8], type: "Fibonacci" },
                { seq: [1, 3, 6, 10, 15, 21], type: "Triangular" },
                { seq: [2, 4, 8, 16, 32, 64], type: "Powers of 2" },
                { seq: [1, 4, 9, 16, 25, 36], type: "Perfect Squares" }
            ];
            
            const currentSeq = sequences[Math.floor(Math.random() * sequences.length)];
            
            const gameContent = document.getElementById('game-content');
            gameContent.innerHTML = `
                <div class="game-instructions">
                    <h4>Goal: Predict the next numbers in the sequence</h4>
                    <p>Analyze the pattern and enter your predictions!</p>
                </div>
                
                <div class="sequence-display">
                    <h4>Sequence:</h4>
                    <div class="sequence-numbers">
                        ${currentSeq.seq.map((num, index) => 
                            `<span class="seq-number">${num}</span>`
                        ).join('')}
                        <span class="seq-number unknown">?</span>
                        <span class="seq-number unknown">?</span>
                        <span class="seq-number unknown">?</span>
                    </div>
                </div>
                
                <div class="prediction-inputs">
                    <label>Next number:</label>
                    <input type="number" id="pred-1" placeholder="?">
                    <label>Following number:</label>
                    <input type="number" id="pred-2" placeholder="?">
                    <label>Third number:</label>
                    <input type="number" id="pred-3" placeholder="?">
                </div>
                
                <div class="game-stats">
                    <p>Attempts: <span id="attempts">0</span></p>
                    <p>Status: <span id="status">Make your predictions</span></p>
                </div>
                
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="checkSequencePredictions()">Check Predictions</button>
                    <button class="btn btn-secondary" onclick="getSequenceHint()">Get Hint</button>
                </div>
            `;
            
            window.currentSequence = currentSeq;
        }
    },
    
    'multiplayer-challenge': {
        title: "Multiplayer Challenge",
        description: "Compete with friends in real-time combinatorics challenges!",
        start: function() {
            const gameContent = document.getElementById('game-content');
            gameContent.innerHTML = `
                <div class="game-instructions">
                    <h4>Goal: Compete in real-time combinatorics challenges</h4>
                    <p>Join a room or create your own to challenge friends!</p>
                </div>
                
                <div class="multiplayer-lobby">
                    <div class="room-actions">
                        <button class="btn btn-primary" onclick="createMultiplayerRoom()">
                            <i class="fas fa-plus"></i> Create Room
                        </button>
                        <button class="btn btn-secondary" onclick="joinMultiplayerRoom()">
                            <i class="fas fa-sign-in-alt"></i> Join Room
                        </button>
                    </div>
                    
                    <div class="room-code-section" style="display: none;">
                        <input type="text" id="multiplayer-room-code" placeholder="Enter room code">
                        <button class="btn btn-primary" onclick="connectToMultiplayerRoom()">Connect</button>
                    </div>
                </div>
                
                <div class="challenge-area" style="display: none;">
                    <h4>Current Challenge:</h4>
                    <div id="challenge-content" class="challenge-content"></div>
                    <div class="players-list">
                        <h5>Players:</h5>
                        <div id="players-list"></div>
                    </div>
                </div>
                
                <div class="game-stats">
                    <p>Room Code: <span id="room-code-display">-</span></p>
                    <p>Players: <span id="player-count">1</span></p>
                    <p>Status: <span id="status">Waiting for players...</span></p>
                </div>
            `;
        }
    },
    
    'graph-traversal': {
        title: "Graph Traversal Challenge",
        description: "Navigate the network and find the optimal path!",
        start: function() {
            const nodes = [
                { id: 'A', x: 100, y: 100, connections: ['B', 'C'] },
                { id: 'B', x: 200, y: 100, connections: ['A', 'C', 'D'] },
                { id: 'C', x: 150, y: 200, connections: ['A', 'B', 'D', 'E'] },
                { id: 'D', x: 250, y: 200, connections: ['B', 'C', 'E', 'F'] },
                { id: 'E', x: 200, y: 300, connections: ['C', 'D', 'F'] },
                { id: 'F', x: 300, y: 300, connections: ['D', 'E'] }
            ];
            
            const gameContent = document.getElementById('game-content');
            gameContent.innerHTML = `
                <div class="game-instructions">
                    <h4>Goal: Find the shortest path from A to F</h4>
                    <p>Click on nodes to build your path. Find the route with the minimum total distance!</p>
                </div>
                
                <div class="game-board">
                    <div class="graph-container">
                        <svg width="400" height="400" id="graph-svg">
                            <!-- Edges will be drawn here -->
                        </svg>
                    </div>
                </div>
                
                <div class="game-stats">
                    <p>Current Path: <span id="current-path">A</span></p>
                    <p>Total Distance: <span id="total-distance">0</span></p>
                    <p>Status: <span id="status">Click nodes to build path</span></p>
                </div>
                
                <div class="game-controls">
                    <button class="btn btn-primary" onclick="checkPath()">Check Path</button>
                    <button class="btn btn-secondary" onclick="resetPath()">Reset</button>
                </div>
            `;
            
            drawGraph(nodes);
            window.graphNodes = nodes;
            window.currentPath = ['A'];
            window.totalDistance = 0;
        }
    }
};

function startGame(gameType) {
    // Use mobile game mode if on mobile
    if (isMobile()) {
        startMobileGame(gameType);
        return;
    }
    
    const game = games[gameType];
    const workspace = document.getElementById('game-workspace');
    const title = document.getElementById('game-title');
    
    title.textContent = game.title;
    workspace.style.display = 'block';
    
    currentGame = gameType;
    gameScore = 0;
    gameLevel = 1;
    
    updateGameStats();
    game.start();
    
    // Game started - no progress tracking yet
}

function closeGame() {
    document.getElementById('game-workspace').style.display = 'none';
    currentGame = null;
}

function updateGameStats() {
    document.getElementById('score').textContent = `Score: ${gameScore}`;
    document.getElementById('level').textContent = `Level: ${gameLevel}`;
}

// Game helper functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Permutation Puzzle functions
function selectItem(index) {
    if (window.selectedIndex === null) {
        window.selectedIndex = index;
        document.querySelector(`[data-index="${index}"]`).classList.add('selected');
    } else if (window.selectedIndex === index) {
        window.selectedIndex = null;
        document.querySelector(`[data-index="${index}"]`).classList.remove('selected');
    } else {
        // Swap items
        const temp = window.currentPermutation[window.selectedIndex];
        window.currentPermutation[window.selectedIndex] = window.currentPermutation[index];
        window.currentPermutation[index] = temp;
        
        window.moves++;
        document.getElementById('moves').textContent = window.moves;
        
        // Update display
        updatePermutationDisplay();
        
        // Clear selection
        document.querySelectorAll('.pattern-item').forEach(item => {
            item.classList.remove('selected');
        });
        window.selectedIndex = null;
        
        checkPermutationSolution();
    }
}

function updatePermutationDisplay() {
    const patternDisplay = document.getElementById('current-pattern');
    patternDisplay.innerHTML = window.currentPermutation.map((item, index) => 
        `<span class="pattern-item clickable" onclick="selectItem(${index})" data-index="${index}">${item}</span>`
    ).join('');
}

function checkPermutationSolution() {
    const isCorrect = window.currentPermutation.every((item, index) => 
        item === window.targetPermutation[index]
    );
    
    if (isCorrect) {
        document.getElementById('status').textContent = 'Congratulations! You solved it!';
        gameScore += Math.max(0, 100 - window.moves * 5);
        updateGameStats();
        updateProgress('score', gameScore);
    }
}

function shuffleCurrent() {
    window.currentPermutation = shuffleArray([...window.currentPermutation]);
    updatePermutationDisplay();
    window.moves = 0;
    document.getElementById('moves').textContent = '0';
    document.getElementById('status').textContent = 'Keep trying!';
}

function checkSolution() {
    checkPermutationSolution();
}

// Combination Challenge functions
function toggleItem(index) {
    const item = document.querySelector(`[data-index="${index}"]`);
    const itemIndex = window.selectedItems.indexOf(index);
    
    if (itemIndex === -1 && window.selectedItems.length < 3) {
        window.selectedItems.push(index);
        item.classList.add('selected');
    } else if (itemIndex !== -1) {
        window.selectedItems.splice(itemIndex, 1);
        item.classList.remove('selected');
    }
    
    updateCombinationStats();
}

function updateCombinationStats() {
    const selectedCount = window.selectedItems.length;
    const currentSum = window.selectedItems.reduce((sum, index) => sum + window.items[index].value, 0);
    
    document.getElementById('selected-count').textContent = selectedCount;
    document.getElementById('current-sum').textContent = currentSum;
    
    if (selectedCount === 3) {
        if (currentSum === window.targetSum) {
            document.getElementById('status').textContent = 'Perfect! You found the right combination!';
        } else {
            document.getElementById('status').textContent = 'Wrong sum. Try again!';
        }
    } else {
        document.getElementById('status').textContent = `Select ${3 - selectedCount} more items`;
    }
}

function checkCombination() {
    const selectedCount = window.selectedItems.length;
    const currentSum = window.selectedItems.reduce((sum, index) => sum + window.items[index].value, 0);
    
    if (selectedCount === 3 && currentSum === window.targetSum) {
        document.getElementById('status').textContent = 'Excellent! You solved the combination challenge!';
        gameScore += 100;
        updateGameStats();
        updateProgress('score', 100);
        updateProgress('game'); // Track game completion
    } else if (selectedCount !== 3) {
        document.getElementById('status').textContent = 'Please select exactly 3 items';
    } else {
        document.getElementById('status').textContent = `Wrong sum. You got ${currentSum}, but need ${window.targetSum}`;
    }
}

function clearSelection() {
    window.selectedItems.forEach(index => {
        document.querySelector(`[data-index="${index}"]`).classList.remove('selected');
    });
    window.selectedItems = [];
    updateCombinationStats();
}

// Probability Roulette functions
function checkPredictions() {
    const redProb = parseFloat(document.getElementById('red-prob').value) || 0;
    const blueProb = parseFloat(document.getElementById('blue-prob').value) || 0;
    const greenProb = parseFloat(document.getElementById('green-prob').value) || 0;
    
    const correctRed = Math.abs(redProb - 0.5) < 0.01; // 3/6 = 0.5
    const correctBlue = Math.abs(blueProb - 0.333) < 0.01; // 2/6 ≈ 0.333
    const correctGreen = Math.abs(greenProb - 0.167) < 0.01; // 1/6 ≈ 0.167
    
    const correctCount = [correctRed, correctBlue, correctGreen].filter(Boolean).length;
    
    document.getElementById('correct-count').textContent = correctCount;
    
    if (correctCount === 3) {
        document.getElementById('status').textContent = 'Perfect! All predictions are correct!';
        gameScore += 150;
        updateGameStats();
        updateProgress('score', 150);
        updateProgress('game'); // Track game completion
    } else {
        document.getElementById('status').textContent = `You got ${correctCount}/3 correct. Try again!`;
    }
}

function showCorrectAnswers() {
    document.getElementById('red-prob').value = '0.5';
    document.getElementById('blue-prob').value = '0.333';
    document.getElementById('green-prob').value = '0.167';
    document.getElementById('status').textContent = 'Correct answers filled in!';
}

// Graph Traversal functions
function drawGraph(nodes) {
    const svg = document.getElementById('graph-svg');
    svg.innerHTML = '';
    
    // Draw edges
    nodes.forEach(node => {
        node.connections.forEach(connectionId => {
            const connectedNode = nodes.find(n => n.id === connectionId);
            if (connectedNode) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', node.x);
                line.setAttribute('y1', node.y);
                line.setAttribute('x2', connectedNode.x);
                line.setAttribute('y2', connectedNode.y);
                line.setAttribute('stroke', '#ccc');
                line.setAttribute('stroke-width', '2');
                svg.appendChild(line);
            }
        });
    });
    
    // Draw nodes
    nodes.forEach(node => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', '20');
        circle.setAttribute('fill', node.id === 'A' ? '#4ecdc4' : node.id === 'F' ? '#ff6b6b' : '#667eea');
        circle.setAttribute('stroke', '#fff');
        circle.setAttribute('stroke-width', '3');
        circle.setAttribute('cursor', 'pointer');
        circle.addEventListener('click', () => selectNode(node.id));
        svg.appendChild(circle);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-weight', 'bold');
        text.textContent = node.id;
        svg.appendChild(text);
    });
}

function selectNode(nodeId) {
    if (window.currentPath.length === 1 && nodeId === 'A') return;
    
    const lastNode = window.currentPath[window.currentPath.length - 1];
    const lastNodeObj = window.graphNodes.find(n => n.id === lastNode);
    
    if (lastNodeObj.connections.includes(nodeId)) {
        window.currentPath.push(nodeId);
        updatePathDisplay();
        
        if (nodeId === 'F') {
            checkPath();
        }
    }
}

function updatePathDisplay() {
    document.getElementById('current-path').textContent = window.currentPath.join(' → ');
    
    // Calculate total distance (simplified - just count edges)
    window.totalDistance = window.currentPath.length - 1;
    document.getElementById('total-distance').textContent = window.totalDistance;
}

function checkPath() {
    if (window.currentPath[0] === 'A' && window.currentPath[window.currentPath.length - 1] === 'F') {
        const optimalDistance = 3; // A → B → D → F
        if (window.totalDistance <= optimalDistance) {
            document.getElementById('status').textContent = 'Excellent! You found an optimal path!';
            gameScore += 200;
            updateProgress('score', 200);
        } else {
            document.getElementById('status').textContent = `Good path! Optimal distance is ${optimalDistance}`;
            gameScore += 100;
            updateProgress('score', 100);
        }
        updateGameStats();
    } else {
        document.getElementById('status').textContent = 'Path must start at A and end at F';
    }
}

function resetPath() {
    window.currentPath = ['A'];
    updatePathDisplay();
    document.getElementById('status').textContent = 'Click nodes to build path';
}

// Calculator
function updateCalculator() {
    const calcType = document.getElementById('calc-type').value;
    const n = parseInt(document.getElementById('n-value').value) || 0;
    const r = parseInt(document.getElementById('r-value').value) || 0;
    
    // Calculator updated - no progress tracking yet
    
    const rGroup = document.getElementById('r-group');
    if (calcType === 'factorial' || calcType === 'subsets') {
        rGroup.style.display = 'none';
    } else {
        rGroup.style.display = 'block';
    }
    
    let result = 0;
    let steps = [];
    
    switch (calcType) {
        case 'permutation':
            if (n >= r && r >= 0) {
                result = factorial(n) / factorial(n - r);
                steps = [
                    `P(${n}, ${r}) = ${n}! / (${n} - ${r})!`,
                    `P(${n}, ${r}) = ${n}! / ${n - r}!`,
                    `P(${n}, ${r}) = ${factorial(n)} / ${factorial(n - r)}`,
                    `P(${n}, ${r}) = ${result}`
                ];
            } else {
                result = 'Invalid input';
                steps = ['r must be between 0 and n'];
            }
            break;
            
        case 'combination':
            if (n >= r && r >= 0) {
                result = factorial(n) / (factorial(r) * factorial(n - r));
                steps = [
                    `C(${n}, ${r}) = ${n}! / (${r}! × (${n} - ${r})!)`,
                    `C(${n}, ${r}) = ${n}! / (${r}! × ${n - r}!)`,
                    `C(${n}, ${r}) = ${factorial(n)} / (${factorial(r)} × ${factorial(n - r)})`,
                    `C(${n}, ${r}) = ${factorial(n)} / ${factorial(r) * factorial(n - r)}`,
                    `C(${n}, ${r}) = ${result}`
                ];
            } else {
                result = 'Invalid input';
                steps = ['r must be between 0 and n'];
            }
            break;
            
        case 'factorial':
            result = factorial(n);
            steps = [
                `${n}! = ${n} × ${n-1} × ${n-2} × ... × 1`,
                `${n}! = ${result}`
            ];
            break;
            
        case 'subsets':
            result = Math.pow(2, n);
            steps = [
                `Number of subsets = 2^${n}`,
                `Number of subsets = ${result}`
            ];
            break;
    }
    
    document.getElementById('calc-answer').textContent = result;
    document.getElementById('calc-steps').innerHTML = steps.map(step => 
        `<div class="step">${step}</div>`
    ).join('');
    
    // Track calculation completion
    updateProgress('calculation');
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Learning Modules
const modules = {
    basics: {
        title: "Combinatorics Fundamentals",
        content: `
            <h4>What is Combinatorics?</h4>
            <p>Combinatorics is the branch of mathematics concerned with counting, arrangement, and selection of objects. It's fundamental to computer science, probability, and many real-world applications.</p>
            
            <h4>Basic Counting Principles</h4>
            <p><strong>Addition Principle:</strong> If you can do task A in m ways and task B in n ways, then you can do either A or B in m + n ways.</p>
            <p><strong>Multiplication Principle:</strong> If you can do task A in m ways and task B in n ways, then you can do both A and B in m × n ways.</p>
            
            <h4>Permutations</h4>
            <p>A permutation is an arrangement of objects in a specific order. The number of permutations of n objects taken r at a time is:</p>
            <p><strong>P(n,r) = n! / (n-r)!</strong></p>
            <p>Example: How many ways can you arrange 3 books on a shelf from 5 books? P(5,3) = 5! / 2! = 60 ways.</p>
            
            <h4>Combinations</h4>
            <p>A combination is a selection of objects where order doesn't matter. The number of combinations of n objects taken r at a time is:</p>
            <p><strong>C(n,r) = n! / (r! × (n-r)!)</strong></p>
            <p>Example: How many ways can you choose 3 books from 5 books? C(5,3) = 5! / (3! × 2!) = 10 ways.</p>
            
            <h4>Key Differences</h4>
            <p><strong>Permutations:</strong> Order matters (ABC ≠ BAC)</p>
            <p><strong>Combinations:</strong> Order doesn't matter (ABC = BAC)</p>
        `
    },
    
    advanced: {
        title: "Advanced Combinatorics Topics",
        content: `
            <h4>Generating Functions</h4>
            <p>Generating functions are powerful tools that encode sequences of numbers as coefficients of power series. They're particularly useful for solving recurrence relations and counting problems.</p>
            
            <h4>Recurrence Relations</h4>
            <p>A recurrence relation defines a sequence in terms of its previous terms. For example, the Fibonacci sequence: F(n) = F(n-1) + F(n-2).</p>
            
            <h4>Graph Theory</h4>
            <p>Graph theory studies networks of vertices connected by edges. It's essential for:</p>
            <ul>
                <li>Network analysis</li>
                <li>Route optimization</li>
                <li>Scheduling problems</li>
                <li>Social network analysis</li>
            </ul>
            
            <h4>Pigeonhole Principle</h4>
            <p>If n+1 objects are placed into n boxes, then at least one box contains more than one object. This simple principle has surprising applications in proving impossibility results.</p>
            
            <h4>Inclusion-Exclusion Principle</h4>
            <p>This principle helps count elements in the union of sets by accounting for overlaps. It's crucial for solving complex counting problems.</p>
        `
    },
    
    applications: {
        title: "Real-World Applications",
        content: `
            <h4>Computer Science</h4>
            <p><strong>Algorithm Design:</strong> Combinatorics helps design efficient algorithms for sorting, searching, and optimization.</p>
            <p><strong>Cryptography:</strong> Understanding permutations and combinations is essential for creating secure encryption systems.</p>
            <p><strong>Data Structures:</strong> Trees, graphs, and hash tables all rely on combinatorial principles.</p>
            
            <h4>Biology and Genetics</h4>
            <p><strong>DNA Sequencing:</strong> Combinatorial algorithms help reconstruct genetic sequences from fragments.</p>
            <p><strong>Protein Folding:</strong> Understanding how proteins fold involves complex combinatorial optimization.</p>
            <p><strong>Evolutionary Biology:</strong> Phylogenetic trees use graph theory to model evolutionary relationships.</p>
            
            <h4>Economics and Finance</h4>
            <p><strong>Portfolio Optimization:</strong> Finding optimal investment combinations uses combinatorial optimization.</p>
            <p><strong>Market Analysis:</strong> Understanding market dynamics involves probability and combinatorics.</p>
            <p><strong>Game Theory:</strong> Strategic decision-making relies heavily on combinatorial analysis.</p>
            
            <h4>Operations Research</h4>
            <p><strong>Supply Chain:</strong> Optimizing delivery routes and inventory management.</p>
            <p><strong>Manufacturing:</strong> Scheduling production lines and minimizing waste.</p>
            <p><strong>Transportation:</strong> Designing efficient public transit systems.</p>
            
            <h4>Everyday Applications</h4>
            <p><strong>Password Security:</strong> Understanding how many possible passwords exist helps create secure systems.</p>
            <p><strong>Lottery and Games:</strong> Calculating odds and probabilities in games of chance.</p>
            <p><strong>Social Networks:</strong> Analyzing connections and influence in social media.</p>
        `
    }
};

function showModule(moduleType) {
    const module = modules[moduleType];
    const content = document.getElementById('module-content');
    const title = document.getElementById('module-title');
    const text = document.getElementById('module-text');
    
    title.textContent = module.title;
    text.innerHTML = module.content;
    content.style.display = 'block';
}

function closeModule() {
    document.getElementById('module-content').style.display = 'none';
}

// Interactive Problem Demos
function startInteractiveProblem(problemType) {
    // This would implement interactive demos for each problem type
    alert(`Interactive demo for ${problemType} would be implemented here!`);
}

// Welcome Modal Functions
function showWelcomeModal() {
    if (!userProgress.hasSeenWelcome) {
        document.getElementById('welcome-modal').style.display = 'block';
        userProgress.hasSeenWelcome = true;
        saveProgress();
    }
}

function closeWelcomeModal() {
    document.getElementById('welcome-modal').style.display = 'none';
}

// Help Modal Functions
function showHelp() {
    document.getElementById('help-modal').style.display = 'block';
}

function closeHelpModal() {
    document.getElementById('help-modal').style.display = 'none';
}

// Progress Modal Functions
function showProgressModal() {
    updateProgressDisplay();
    document.getElementById('progress-modal').style.display = 'block';
}

function closeProgressModal() {
    document.getElementById('progress-modal').style.display = 'none';
}

function updateProgressDisplay() {
    document.getElementById('problems-solved').textContent = userProgress.problemsSolved;
    document.getElementById('games-completed').textContent = userProgress.gamesCompleted;
    document.getElementById('calculations-done').textContent = userProgress.calculationsDone;
    document.getElementById('total-score').textContent = userProgress.totalScore;
    
    // Update achievements
    const achievements = document.querySelectorAll('.achievement');
    if (achievements.length >= 3) {
        achievements[0].classList.toggle('locked', !userProgress.achievements.firstProblem);
        achievements[1].classList.toggle('locked', !userProgress.achievements.gameMaster);
        achievements[2].classList.toggle('locked', !userProgress.achievements.calculatorPro);
        
        // Update icons for unlocked achievements
        if (userProgress.achievements.firstProblem) {
            achievements[0].querySelector('i').className = 'fas fa-check-circle';
        }
        if (userProgress.achievements.gameMaster) {
            achievements[1].querySelector('i').className = 'fas fa-gamepad';
        }
        if (userProgress.achievements.calculatorPro) {
            achievements[2].querySelector('i').className = 'fas fa-calculator';
        }
    }
}

// Tour Functions
function startTour() {
    currentTourStep = 0;
    document.getElementById('tour-overlay').style.display = 'flex';
    updateTourStep();
}

function endTour() {
    document.getElementById('tour-overlay').style.display = 'none';
}

function nextTourStep() {
    if (currentTourStep < tourSteps.length - 1) {
        currentTourStep++;
        updateTourStep();
    } else {
        endTour();
    }
}

function previousTourStep() {
    if (currentTourStep > 0) {
        currentTourStep--;
        updateTourStep();
    }
}

function updateTourStep() {
    const step = tourSteps[currentTourStep];
    document.getElementById('tour-title').textContent = step.title;
    document.getElementById('tour-description').textContent = step.description;
    document.getElementById('tour-step').textContent = currentTourStep + 1;
    document.getElementById('tour-total').textContent = tourSteps.length;
    
    // Show/hide navigation buttons
    document.getElementById('tour-prev').style.display = currentTourStep > 0 ? 'block' : 'none';
    document.getElementById('tour-next').textContent = currentTourStep === tourSteps.length - 1 ? 'Finish' : 'Next';
}

// Progress Tracking Functions
function saveProgress() {
    localStorage.setItem('combinatoricsAppProgress', JSON.stringify(userProgress));
}

function loadProgress() {
    const saved = localStorage.getItem('combinatoricsAppProgress');
    if (saved) {
        userProgress = { ...userProgress, ...JSON.parse(saved) };
    }
}

function updateProgress(type, increment = 1) {
    switch (type) {
        case 'problem':
            userProgress.problemsSolved += increment;
            if (userProgress.problemsSolved === 1) {
                userProgress.achievements.firstProblem = true;
                showAchievement('First Problem', 'You solved your first real-world problem!');
            }
            break;
        case 'game':
            userProgress.gamesCompleted += increment;
            if (userProgress.gamesCompleted >= 4) {
                userProgress.achievements.gameMaster = true;
                showAchievement('Game Master', 'You completed all games!');
            }
            break;
        case 'calculation':
            userProgress.calculationsDone += increment;
            if (userProgress.calculationsDone >= 10) {
                userProgress.achievements.calculatorPro = true;
                showAchievement('Calculator Pro', 'You used the calculator 10 times!');
            }
            break;
        case 'score':
            userProgress.totalScore += increment;
            break;
    }
    saveProgress();
}

function showAchievement(title, description) {
    // Create a temporary achievement notification
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-content">
            <i class="fas fa-trophy"></i>
            <div>
                <strong>${title}</strong>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    // Add styles with Audi-inspired colors
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #dc2626, #b91c1c);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(220, 38, 38, 0.4);
        z-index: 4000;
        animation: slideIn 0.5s ease-out;
        max-width: 300px;
        border: 1px solid rgba(0, 180, 216, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function setTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.classList.remove('dark-theme');
        themeIcon.className = 'fas fa-moon';
    }
}

// Export Functions
function exportSolution() {
    const calcType = document.getElementById('calc-type').value;
    const n = document.getElementById('n-value').value;
    const r = document.getElementById('r-value').value;
    const result = document.getElementById('calc-answer').textContent;
    const steps = document.getElementById('calc-steps').innerHTML;
    
    const exportData = {
        type: calcType,
        parameters: { n, r },
        result: result,
        steps: steps,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `combinatorics-solution-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Data Visualization
function visualizeResult() {
    const workspace = document.getElementById('visualization-workspace');
    workspace.style.display = 'block';
    
    const ctx = document.getElementById('probabilityChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Permutations', 'Combinations', 'Factorials', 'Subsets'],
            datasets: [{
                label: 'Calculations',
                data: [userProgress.calculationsDone, userProgress.gamesCompleted, userProgress.problemsSolved, userProgress.totalScore],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(78, 205, 196, 0.8)',
                    'rgba(255, 107, 107, 0.8)',
                    'rgba(255, 193, 7, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Your Combinatorics Progress'
                }
            }
        }
    });
}

function closeVisualization() {
    document.getElementById('visualization-workspace').style.display = 'none';
}

function updateChart(type) {
    if (!window.chart) return;
    
    // Update chart type
    window.chart.config.type = type;
    
    // Adjust data and options for different chart types
    if (type === 'pie' || type === 'doughnut') {
        window.chart.config.data.datasets[0].data = [0.3, 0.4, 0.2, 0.1];
        window.chart.config.data.labels = ['Success', 'Partial', 'Failure', 'Unknown'];
        window.chart.config.options.plugins.legend.position = 'bottom';
    } else if (type === 'scatter') {
        window.chart.config.data.datasets[0].data = [
            {x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 1}, {x: 4, y: 4}, {x: 5, y: 2}
        ];
        window.chart.config.data.labels = undefined;
        window.chart.config.options.scales = {
            x: { type: 'linear', position: 'bottom' },
            y: { type: 'linear' }
        };
    } else if (type === 'radar') {
        window.chart.config.data.datasets[0].data = [0.8, 0.6, 0.9, 0.7, 0.5, 0.8];
        window.chart.config.data.labels = ['Speed', 'Accuracy', 'Efficiency', 'Quality', 'Innovation', 'Reliability'];
        window.chart.config.options.scales = {
            r: { beginAtZero: true, max: 1 }
        };
    } else {
        // Bar and Line charts
        window.chart.config.data.datasets[0].data = [0.3, 0.4, 0.2, 0.1];
        window.chart.config.data.labels = ['Category A', 'Category B', 'Category C', 'Category D'];
        window.chart.config.options.scales = {
            y: { beginAtZero: true, max: 1 }
        };
    }
    
    window.chart.update();
}

// Multiplayer Functions
function createRoom() {
    const roomCode = generateRoomCode();
    document.getElementById('room-code').value = roomCode;
    document.querySelector('.room-code-input').style.display = 'block';
    document.getElementById('status').textContent = `Room created! Code: ${roomCode}`;
}

function joinRoom() {
    document.querySelector('.room-code-input').style.display = 'block';
    document.getElementById('status').textContent = 'Enter room code to join';
}

function connectToRoom() {
    const roomCode = document.getElementById('room-code').value;
    if (roomCode) {
        document.getElementById('status').textContent = `Connecting to room ${roomCode}...`;
        // Simulate connection
        setTimeout(() => {
            document.getElementById('status').textContent = `Connected to room ${roomCode}!`;
        }, 1000);
    }
}

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Advanced Game Functions
function generateSudokuGrid() {
    // Generate a simple Sudoku grid
    const grid = Array(9).fill().map(() => Array(9).fill(0));
    // Add some pre-filled numbers
    const preFilled = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    
    return preFilled.map((row, i) => 
        `<div class="sudoku-row">${row.map((cell, j) => 
            `<input type="number" class="sudoku-cell" min="1" max="9" value="${cell || ''}" ${cell ? 'readonly' : ''}>`
        ).join('')}</div>`
    ).join('');
}

function generatePascalTriangle(rows) {
    let triangle = '';
    for (let i = 0; i < rows; i++) {
        triangle += '<div class="pascal-row">';
        for (let j = 0; j <= i; j++) {
            const value = binomialCoefficient(i, j);
            triangle += `<span class="pascal-cell" onclick="explainCoefficient(${i}, ${j})">${value}</span>`;
        }
        triangle += '</div>';
    }
    return triangle;
}

function binomialCoefficient(n, k) {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 0; i < k; i++) {
        result = result * (n - i) / (i + 1);
    }
    return Math.round(result);
}

function updateBinomialExpansion() {
    const n = parseInt(document.getElementById('binomial-n').value) || 0;
    document.getElementById('binomial-power').textContent = n;
    
    let expansion = '';
    for (let k = 0; k <= n; k++) {
        const coeff = binomialCoefficient(n, k);
        const xPower = n - k;
        const yPower = k;
        
        if (k > 0) expansion += ' + ';
        if (coeff !== 1) expansion += coeff;
        if (xPower > 0) expansion += `x${xPower > 1 ? `^${xPower}` : ''}`;
        if (yPower > 0) expansion += `y${yPower > 1 ? `^${yPower}` : ''}`;
    }
    
    document.getElementById('expansion-result').textContent = expansion;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load user progress
    loadProgress();
    
    // Show welcome modal for new users
    setTimeout(showWelcomeModal, 500);
    
    // Set up navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
    
    // Initialize calculator
    updateCalculator();
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    }
    
    // Initialize theme
    initializeTheme();
    
    // Add some CSS for game elements
    const style = document.createElement('style');
    style.textContent = `
        .locations-grid, .sectors-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .location-item, .sector-item {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            border-left: 3px solid #667eea;
        }
        
        .pattern-display {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            margin: 1rem 0;
        }
        
        .pattern-item {
            background: #667eea;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: bold;
            min-width: 40px;
            text-align: center;
        }
        
        .pattern-item.clickable {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .pattern-item.clickable:hover {
            background: #5a6fd8;
            transform: scale(1.1);
        }
        
        .pattern-item.selected {
            background: #ff6b6b;
        }
        
        .items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .item-color {
            width: 100%;
            height: 60px;
            border-radius: 8px;
            margin-bottom: 0.5rem;
        }
        
        .item-name {
            font-weight: bold;
            margin-bottom: 0.25rem;
        }
        
        .item-value {
            font-size: 0.9rem;
            color: #666;
        }
        
        .balls-display {
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            margin: 1rem 0;
        }
        
        .ball {
            font-size: 2rem;
        }
        
        .prediction-inputs {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .prediction-inputs label {
            font-weight: 600;
            color: #333;
        }
        
        .prediction-inputs input {
            padding: 0.5rem;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .graph-container {
            display: flex;
            justify-content: center;
            margin: 2rem 0;
        }
        
        .interactive-section {
            margin-top: 2rem;
            padding: 2rem;
            background: #f8f9fa;
            border-radius: 12px;
            text-align: center;
        }
        
        .achievement-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .achievement-content i {
            font-size: 1.5rem;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Mobile header scroll behavior
    let lastScrollTop = 0;
    let isScrolling = false;
    const header = document.querySelector('.header');
    
    function handleScroll() {
        if (!isMobile() || !header) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only trigger if scroll difference is significant (avoid jittery behavior)
        if (Math.abs(scrollTop - lastScrollTop) < 5) return;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide header
            header.classList.remove('visible');
            header.classList.add('hidden');
        } else {
            // Scrolling up - show header
            header.classList.remove('hidden');
            header.classList.add('visible');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Throttle scroll events for better performance
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Add scroll listener with throttling
    window.addEventListener('scroll', throttle(handleScroll, 10));
    
    // Initialize header as visible
    if (isMobile() && header) {
        header.classList.add('visible');
    }
    
    // Mobile navigation toggle function
    window.toggleMobileNav = function() {
        const mobileNav = document.getElementById('mobile-nav');
        const overlay = document.getElementById('mobile-nav-overlay');
        const hamburgerBtn = document.getElementById('hamburger-btn');
        
        if (!mobileNav || !overlay) {
            console.log('Mobile nav elements not found');
            return;
        }
        
        const isOpen = mobileNav.classList.contains('open');
        console.log('Mobile nav is open:', isOpen);
        
        if (isOpen) {
            // Close the menu
            mobileNav.classList.remove('open');
            overlay.classList.remove('show');
            if (hamburgerBtn) {
                hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        } else {
            // Open the menu
            mobileNav.classList.add('open');
            overlay.classList.add('show');
            if (hamburgerBtn) {
                hamburgerBtn.innerHTML = '<i class="fas fa-times"></i>';
            }
        }
    };
});
