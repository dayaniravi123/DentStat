// Full client-side script (moved from templates/script.js)
// Global state
let currentDifficulty = 'beginner';
let activeStoryFocus = 'spark';
let mainChart = null;
let survivalChartInstance = null;
let simulationIntervals = {};
let animationFrameIds = {};

// Simulation state
const simState = {
    centralLimit: {
        running: false,
        sampleSize: 30,
        draws: 0,
        means: [],
        rawValues: [],
        viewMode: 'population',
        data: []
    },
    probability: {
        trials: 0,
        successes: 0,
        probability: 0.5
    },
    distribution: {
        mean: 0,
        std: 1,
        points: []
    }
};

// Concept data by difficulty
const conceptsData = {
    beginner: [
        {
            title: "Measures of Central Tendency",
            icon: "align-center",
            description: "Mean, Median, and Mode for continuous data like DMFT scores",
            content: "The mean (average) is sensitive to outliers, while the median represents the middle value. In dental epidemiology, median DMFT is often reported due to skewed distributions.",
            example: "Example: DMFT scores [2, 3, 4, 4, 5, 8, 12] - Mean: 5.4, Median: 4",
            file: 'central-tendency.html'
        },
        {
            title: "Standard Deviation",
            icon: "arrow-left-right",
            description: "Measuring dispersion in periodontal pocket depths",
            content: "Standard deviation quantifies variability. In implant studies, SD > 1.5mm for marginal bone loss may indicate problematic outcomes.",
            example: "Lower SD = more consistent measurements",
            file: 'standard-deviation.html'
        },
        {
            title: "Basic Probability",
            icon: "percent",
            description: "Understanding chance in caries risk assessment",
            content: "Probability ranges 0-1. If caries prevalence is 30% in a population, P(caries) = 0.30 for a randomly selected patient.",
            example: "Risk calculators use baseline probabilities",
            file: 'basic-probability.html'
        },
        {
            title: "2×2 Tables",
            icon: "grid-2x2",
            description: "Contingency tables for diagnostic tests",
            content: "Organizing data by exposure and outcome. Essential for calculating sensitivity, specificity, and predictive values.",
            example: "Caries + vs Caries - vs Test + vs Test -",
            file: 'two-by-two.html'
        },
        {
            title: "Sample Size Basics",
            icon: "users",
            description: "Why 30+ subjects matter for normality",
            content: "Central Limit Theorem: With n > 30, sampling distribution approximates normal regardless of population distribution.",
            example: "Minimum 30 per group for parametric tests",
            file: 'sample-size.html'
        },
        {
            title: "Confidence Intervals",
            icon: "target",
            description: "Precision of prevalence estimates",
            content: "95% CI indicates range containing true population parameter 95% of the time. Narrower CIs = more precise estimates.",
            example: "Caries prevalence: 25% (95% CI: 22%-28%)",
            file: 'confidence-intervals.html'
        }
    ],
    intermediate: [
        {
            title: "Hypothesis Testing",
            icon: "git-commit",
            description: "Null vs Alternative hypotheses",
            content: "...",
            example: "Example: fluoride vs placebo differences",
            file: "hypothesis-testing.html"
        },
        {
            title: "p-values & Significance",
            icon: "alert-circle",
            description: "Interpreting statistical significance",
            content: "...",
            example: "Example: p=0.03 at α=0.05",
            file: "pvalues-significance.html"
        },
        {
            title: "Chi-Square Test",
            icon: "grid",
            description: "Comparing categorical variables",
            content: "...",
            example: "Example: treatment group vs outcome",
            file: "chi-square.html"
        },
        {
            title: "Risk Measures",
            icon: "scale",
            description: "Relative Risk and Odds Ratios",
            content: "...",
            example: "Example: OR=2.5 (higher odds)",
            file: "risk-measures.html"
        },
        {
            title: "t-Tests",
            icon: "activity",
            description: "Comparing means between groups",
            content: "...",
            example: "Example: plaque index before/after",
            file: "t-tests.html"
        },
        {
            title: "ANOVA Basics",
            icon: "bar-chart-2",
            description: "Analysis of Variance for >2 groups",
            content: "...",
            example: "Example: compare 3 fluoride treatments",
            file: "anova.html"
        }
    ],
    advanced: [
        {
            title: "Multiple Regression",
            icon: "git-branch",
            description: "Controlling for confounders",
            content: "...",
            example: "Example: bone loss ~ age + smoking + diabetes",
            file: "multiple-regression.html"
        },
        {
            title: "Logistic Regression",
            icon: "curve",
            description: "Modeling binary outcomes",
            content: "...",
            example: "Example: implant failure (yes/no)",
            file: "logistic-regression.html"
        },
        {
            title: "Survival Analysis",
            icon: "clock",
            description: "Time-to-event for implants",
            content: "...",
            example: "Example: Kaplan–Meier implant survival",
            file: "survival-analysis.html"
        },
        {
            title: "Cox Regression",
            icon: "trending-down",
            description: "Proportional hazards modeling",
            content: "...",
            example: "Example: HR=1.5 (higher hazard)",
            file: "cox-regression.html"
        },
        {
            title: "ROC Curves",
            icon: "move",
            description: "Diagnostic accuracy optimization",
            content: "...",
            example: "Example: choose best threshold",
            file: "roc-curves.html"
        },
        {
            title: "Meta-Analysis",
            icon: "layers",
            description: "Synthesizing evidence",
            content: "...",
            example: "Example: random-effects pooling",
            file: "meta-analysis.html"
        }
    ]
};

// Modal content data
const modalData = {
    descriptive: {
        title: "Descriptive Statistics in Dentistry",
        content: `
            <h3 class="mb-3 font-bold">Descriptive Statistics in Dentistry</h3>
            <p class="text-sm mb-3">Descriptive statistics summarize dental research data so patterns and trends are easy to understand. They are the first step before performing advanced analyses.</p>

            <h4 class="font-semibold mb-2">Key Statistical Measures</h4>
            <h5 class="font-medium">Mean (Average)</h5>
            <p class="text-sm mb-2">The mean is the average of all values. Calculated by summing observations and dividing by n. Useful when data are approximately normal.</p>
            <div class="bg-white border rounded-lg p-3 mb-3">
                <strong>Dental example:</strong> Mean age = <em>35.4 years</em>
                <div class="text-sm text-gray-600">Report usually as mean ± SD to show variability</div>
            </div>

            <h5 class="font-medium">Median</h5>
            <p class="text-sm mb-2">The median is the middle value in ordered data. It is robust to outliers and preferred for skewed distributions.</p>
            <div class="bg-white border rounded-lg p-3 mb-3">
                <strong>Dental example:</strong> Median pocket depth = <em>4 mm</em>
            </div>

            <h5 class="font-medium">Mode</h5>
            <p class="text-sm mb-3">The mode is the most frequent value and is useful for categorical variables (e.g., most commonly affected tooth).</p>

            <h4 class="font-semibold mb-2">Measures of Data Spread</h4>
            <h5 class="font-medium">Standard Deviation (SD)</h5>
            <p class="text-sm mb-2">SD quantifies average deviation from the mean. Small SD = values close to mean; large SD = more variability.</p>
            <div class="bg-white border rounded-lg p-3 mb-3">
                <strong>Dental example:</strong> Mean plaque index = <em>1.8 ± 0.5</em>
            </div>

            <h5 class="font-medium">Interquartile Range (IQR)</h5>
            <p class="text-sm mb-2">IQR = Q3 − Q1; shows the middle 50% of values and is robust to outliers.</p>
            <div class="bg-white border rounded-lg p-3 mb-3">
                <strong>Dental example:</strong> Median pocket depth = <em>4 mm (IQR: 3–6 mm)</em>
            </div>

            <h4 class="font-semibold mb-2">Additional Measures</h4>
            <p class="text-sm mb-2"><strong>Range:</strong> Max − Min (sensitive to outliers)</p>
            <p class="text-sm mb-2"><strong>Frequency distribution:</strong> Presented with tables, histograms, or bar charts (useful for DMFT, disease severity, age groups).</p>

            <h4 class="font-semibold mb-2">Why they matter in dentistry</h4>
            <ul class="list-disc pl-5 mb-3 text-sm space-y-1">
                <li>Summarize large datasets</li>
                <li>Identify trends and outliers</li>
                <li>Inform choice of statistical tests (mean vs median)</li>
                <li>Communicate results clearly in tables and figures</li>
            </ul>

            <h4 class="font-semibold mb-2">Reporting examples</h4>
            <div class="overflow-auto mb-3">
                <table class="table-auto w-full text-sm border-collapse">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-3 py-2 text-left">Variable</th>
                            <th class="px-3 py-2 text-left">Mean ± SD</th>
                            <th class="px-3 py-2 text-left">Median (IQR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="px-3 py-2">Age (years)</td>
                            <td class="px-3 py-2">34.5 ± 8.2</td>
                            <td class="px-3 py-2">—</td>
                        </tr>
                        <tr class="bg-gray-50">
                            <td class="px-3 py-2">Pocket Depth (mm)</td>
                            <td class="px-3 py-2">—</td>
                            <td class="px-3 py-2">4 (3–6)</td>
                        </tr>
                        <tr>
                            <td class="px-3 py-2">DMFT Score</td>
                            <td class="px-3 py-2">—</td>
                            <td class="px-3 py-2">5 (2–9)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400 text-sm">
                <strong>Guidance:</strong> Use mean ± SD for approximately normal data; use median (IQR) for skewed clinical measurements; report frequencies (%) for categorical variables.
            </div>

            <p class="text-xs text-gray-500 mt-3">Proper reporting improves clarity, reproducibility, and scientific transparency in dental research.</p>
            <div class="mt-4">
                <a href="/learning/descriptive/descriptive-statistics.html" class="inline-block px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">Open full page</a>
            </div>
        `
    },
    hypothesis: {
        title: "Hypothesis Testing Framework",
        content: `
            <h4 class="font-semibold mb-2">The Testing Process</h4>
            <ol class="list-decimal pl-5 mb-4 space-y-1">
                <li>State Null (H₀) and Alternative (H₁) hypotheses</li>
                <li>Select significance level (α = 0.05 typical)</li>
                <li>Calculate test statistic</li>
                <li>Determine p-value</li>
                <li>Draw conclusion (reject or fail to reject H₀)</li>
            </ol>
            <h4 class="font-semibold mb-2">Error Types</h4>
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="bg-red-50 p-3 rounded border-l-4 border-red-400">
                    <p class="font-medium text-red-700">Type I Error (α)</p>
                    <p class="text-sm">False positive - claiming treatment works when it doesn't</p>
                </div>
                <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                    <p class="font-medium text-orange-700">Type II Error (β)</p>
                    <p class="text-sm">False negative - missing true treatment effect</p>
                </div>
            </div>
            <p class="text-sm"><strong>Power:</strong> 1-β, typically 0.80 or 0.90. Probability of detecting true effect.</p>
        `
    },
    regression: {
        title: "Regression Models in Dental Research",
        content: `
            <h4 class="font-semibold mb-2">Linear Regression</h4>
            <p class="mb-2 text-sm">Continuous outcome: Y = β₀ + β₁X + ε</p>
            <p class="mb-3 text-sm">Example: Predicting attachment level from age and smoking status.</p>
           
            <h4 class="font-semibold mb-2">Logistic Regression</h4>
            <p class="mb-2 text-sm">Binary outcome: ln(P/1-P) = β₀ + β₁X</p>
            <p class="mb-3 text-sm">Example: Factors associated with implant failure (yes/no).</p>
           
            <h4 class="font-semibold mb-2">Model Assumptions</h4>
            <ul class="list-disc pl-5 mb-3 text-sm space-y-1">
                <li>Independence of observations</li>
                <li>Linearity (for linear regression)</li>
                <li>No multicollinearity (VIF &lt; 10)</li>
                <li>Adequate sample size (EPV ≥ 10 for logistic)</li>
            </ul>
            <div class="bg-green-50 p-3 rounded text-sm border-l-4 border-green-400">
                <strong>Events Per Variable (EPV):</strong> For logistic regression, need at least 10 outcome events per predictor variable.
            </div>
        `
    }
};

const storyCopyData = {
    audience: {
        title: "Built for students, clinicians, and researchers",
        description: "Students need intuition, clinicians need clear interpretation, and researchers need a bridge from methods to evidence. DentalStats keeps all three in one guided learning space."
    },
    spark: {
        title: "It started with one classroom frustration",
        description: "Statistics often felt too abstract for dental students, so DentalStats began as a visual way to make probability, sampling, and confidence feel concrete."
    },
    build: {
        title: "Then concepts became interactive tools",
        description: "Animations, calculators, and guided lessons turned formulas into something learners can test, see, and remember instead of just memorizing."
    },
    goal: {
        title: "The goal is confidence with real dental data",
        description: "DentalStats helps users move from memorizing formulas to reading results calmly, asking better questions, and making evidence-based decisions with more clarity."
    }
};

const mobileDifficultyCopy = {
    beginner: "Start with visual simulations and guided intuition builders. Perfect for dental students who are new to statistics and want concepts to feel concrete before formulas get heavier.",
    intermediate: "Build confidence with hypothesis testing, confidence intervals, and study interpretation. This level is great when you want to read papers more critically and connect results to real clinical questions.",
    advanced: "Dive into regression, survival analysis, and multivariable thinking. Use this level when you are ready to work through deeper dental research methods and publication-style analysis."
};

// Calculator Functions
function calculateSampleSize() {
    const p1 = parseFloat(document.getElementById('ss-p1').value) / 100;
    const p2 = parseFloat(document.getElementById('ss-p2').value) / 100;
    const alpha = parseFloat(document.getElementById('ss-alpha').value);
    const power = parseFloat(document.getElementById('ss-power').value);
   
    if (!p1 || !p2) {
        alert('Please enter both proportions');
        return;
    }
   
    // Standard normal deviates
    const z_alpha = alpha === 0.05 ? 1.96 : alpha === 0.01 ? 2.576 : 1.645;
    const z_beta = power === 0.8 ? 0.84 : power === 0.9 ? 1.28 : 1.645;
   
    // Pooled proportion
    const p = (p1 + p2) / 2;
   
    // Sample size per group
    const n = Math.ceil(
        (2 * p * (1 - p) * Math.pow(z_alpha + z_beta, 2)) / Math.pow(p1 - p2, 2)
    );
   
    const resultDiv = document.getElementById('ss-result');
    resultDiv.classList.remove('hidden');
    document.getElementById('ss-value').textContent = n;
    document.getElementById('ss-total').textContent = n * 2;
}

function calculateDiagnosticTest() {
    const tp = parseFloat(document.getElementById('dt-tp').value) || 0;
    const fp = parseFloat(document.getElementById('dt-fp').value) || 0;
    const fn = parseFloat(document.getElementById('dt-fn').value) || 0;
    const tn = parseFloat(document.getElementById('dt-tn').value) || 0;
   
    const sensitivity = tp / (tp + fn);
    const specificity = tn / (tn + fp);
    const ppv = tp / (tp + fp);
    const npv = tn / (tn + fn);
   
    document.getElementById('dt-sens').textContent = (sensitivity * 100).toFixed(1) + '%';
    document.getElementById('dt-spec').textContent = (specificity * 100).toFixed(1) + '%';
    document.getElementById('dt-ppv').textContent = (ppv * 100).toFixed(1) + '%';
    document.getElementById('dt-npv').textContent = (npv * 100).toFixed(1) + '%';
}

function calculateCI() {
    const events = parseFloat(document.getElementById('ci-events').value);
    const total = parseFloat(document.getElementById('ci-total').value);
   
    if (!events || !total || events > total) {
        alert('Please enter valid numbers');
        return;
    }
   
    const p = events / total;
    const se = Math.sqrt((p * (1 - p)) / total);
    const z = 1.96;
   
    const lower = Math.max(0, p - z * se);
    const upper = Math.min(1, p + z * se);
   
    document.getElementById('ci-result').classList.remove('hidden');
    document.getElementById('ci-prop').textContent = (p * 100).toFixed(1) + '%';
    document.getElementById('ci-range').textContent = (lower * 100).toFixed(1) + '% - ' + (upper * 100).toFixed(1) + '%';
    document.getElementById('ci-lower-label').textContent = (lower * 100).toFixed(1) + '%';
    document.getElementById('ci-upper-label').textContent = (upper * 100).toFixed(1) + '%';
   
    // Update visual bar
    const bar = document.getElementById('ci-bar');
    const range = upper - lower;
    bar.style.left = (lower * 100) + '%';
    bar.style.width = (range * 100) + '%';
}

function calculateOR() {
    const a = parseFloat(document.getElementById('or-a').value) || 0;
    const b = parseFloat(document.getElementById('or-b').value) || 0;
    const c = parseFloat(document.getElementById('or-c').value) || 0;
    const d = parseFloat(document.getElementById('or-d').value) || 0;
   
    if (a === 0 || b === 0 || c === 0 || d === 0) {
        alert('Please fill in all 2x2 table cells with values > 0');
        return;
    }
   
    const or = (a * d) / (b * c);
    const rr = (a / (a + b)) / (c / (c + d));
   
    document.getElementById('or-value').textContent = or.toFixed(2);
    document.getElementById('rr-value').textContent = rr.toFixed(2);
   
    let interpretation = '';
    if (or > 1) interpretation = `Exposure associated with ${or.toFixed(2)}x higher odds of outcome`;
    else if (or < 1) interpretation = `Exposure associated with ${(1/or).toFixed(2)}x lower odds of outcome (protective)`;
    else interpretation = 'No association between exposure and outcome';
   
    document.getElementById('or-interpretation').textContent = interpretation;
}

function calculateTTest() {
    const mean1 = parseFloat(document.getElementById('t-mean1').value);
    const sd1 = parseFloat(document.getElementById('t-sd1').value);
    const n1 = parseFloat(document.getElementById('t-n1').value);
    const mean2 = parseFloat(document.getElementById('t-mean2').value);
    const sd2 = parseFloat(document.getElementById('t-sd2').value);
    const n2 = parseFloat(document.getElementById('t-n2').value);
   
    if (!mean1 || !sd1 || !n1 || !mean2 || !sd2 || !n2) {
        alert('Please fill in all fields');
        return;
    }
   
    // Pooled standard error
    const se = Math.sqrt(((sd1 * sd1) / n1) + ((sd2 * sd2) / n2));
    const t = (mean1 - mean2) / se;
    const df = n1 + n2 - 2;
   
    // Approximate p-value (simplified)
    const p = Math.abs(t) > 1.96 ? (Math.abs(t) > 2.58 ? 0.01 : 0.05) : 0.10;
   
    const resultDiv = document.getElementById('t-result');
    resultDiv.classList.remove('hidden');
    document.getElementById('t-stat').textContent = t.toFixed(3);
    document.getElementById('t-pvalue').textContent = '<0.05 (significant)';
    document.getElementById('t-df').textContent = df;
   
    const conclusion = document.getElementById('t-conclusion');
    if (Math.abs(t) > 1.96) {
        conclusion.className = 'mt-3 p-2 rounded text-center text-sm font-medium bg-green-100 text-green-800';
        conclusion.textContent = 'Statistically significant difference detected (p < 0.05)';
    } else {
        conclusion.className = 'mt-3 p-2 rounded text-center text-sm font-medium bg-gray-100 text-gray-700';
        conclusion.textContent = 'No significant difference (p ≥ 0.05)';
    }
}

function calculateSurvival() {
    const timeStr = document.getElementById('sf-time').value;
    const riskStr = document.getElementById('sf-risk').value;
    const eventsStr = document.getElementById('sf-events').value;
   
    if (!timeStr || !riskStr || !eventsStr) {
        alert('Please enter all values (comma-separated)');
        return;
    }
   
    const times = timeStr.split(',').map(s => parseFloat(s.trim()));
    const risk = riskStr.split(',').map(s => parseFloat(s.trim()));
    const events = eventsStr.split(',').map(s => parseFloat(s.trim()));
   
    if (times.length !== risk.length || times.length !== events.length) {
        alert('Arrays must have same length');
        return;
    }
   
    // Calculate survival probabilities
    const survival = [];
    let currentSurvival = 1;
   
    for (let i = 0; i < times.length; i++) {
        if (risk[i] > 0) {
            currentSurvival = currentSurvival * (1 - (events[i] / risk[i]));
        }
        survival.push(currentSurvival * 100);
    }
   
    // Update chart
    const ctx = document.getElementById('survivalChart').getContext('2d');
   
    if (survivalChartInstance) {
        survivalChartInstance.destroy();
    }
   
    survivalChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: times.map(t => t + ' mo'),
            datasets: [{
                label: 'Survival Probability (%)',
                data: survival,
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                stepped: true,
                fill: true,
                tension: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Survival %' }
                },
                x: {
                    title: { display: true, text: 'Time' }
                }
            },
            plugins: {
                legend: { display: true }
            }
        }
    });
   
    const summary = document.getElementById('survival-summary');
    summary.innerHTML = `Survival at ${times[times.length-1]} months: <strong>${survival[survival.length-1].toFixed(1)}%</strong>`;
}

// Difficulty management
function setDifficulty(level) {
    currentDifficulty = level;
   
    // Update all difficulty buttons across desktop and mobile layouts
    document.querySelectorAll('.difficulty-btn[data-difficulty-level]').forEach(btn => {
        const isActive = btn.getAttribute('data-difficulty-level') === level;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

        if (btn.classList.contains('home-hero-difficulty-btn')) {
            btn.classList.toggle('bg-white', isActive);
            btn.classList.toggle('text-teal-900', isActive);
            btn.classList.toggle('scale-105', isActive);
            btn.classList.toggle('bg-white/20', !isActive);
            btn.classList.toggle('text-white', !isActive);
        }

        if (btn.classList.contains('home-mobile-level-tab')) {
            btn.classList.toggle('is-active', isActive);
        }
    });
   
    // Update banner
    const banner = document.getElementById('difficulty-banner');
    const badge = document.getElementById('level-badge');
   
    if (badge) {
        badge.className = `difficulty-badge-${level} text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg`;
        badge.textContent = level.toUpperCase();
    }
   
    if (banner) {
        if (level === 'beginner') {
            banner.style.borderLeftColor = '#10b981';
        } else if (level === 'intermediate') {
            banner.style.borderLeftColor = '#f59e0b';
        } else {
            banner.style.borderLeftColor = '#ef4444';
        }
    }

    const visualPlayground = document.getElementById('visual-playground');
    if (visualPlayground) {
        visualPlayground.style.display = 'block';
    }

    renderStoryFocus();
    renderMobileDifficultyPanel();
   
    // Update concepts grid
    updateConceptsGrid();
   
    // Filter calculators
    filterCalculators();
   
    // Update visualizations
    updateVisualizationsForLevel();
}

function updateConceptsGrid() {
    const grid = document.getElementById('concepts-grid');
    grid.innerHTML = '';
   
    const concepts = conceptsData[currentDifficulty];
    concepts.forEach((concept, index) => {
        const card = document.createElement('div');
        const ex = concept.example || "Click to open the full lesson";
        card.className = 'bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer border-t-4';
        card.style.borderColor = currentDifficulty === 'beginner' ? '#10b981' : currentDifficulty === 'intermediate' ? '#f59e0b' : '#ef4444';
        // Open the full concept page (navigate) instead of modal
        card.onclick = () => {
            if (concept.file) {
                const slug = concept.file.replace('.html', '');
                window.location.href = `/concepts/?topic=${slug}`;
            } else {
                showConceptDetail(index);
            }
        };
       
        card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <i data-lucide="${concept.icon}" class="w-5 h-5 text-gray-700"></i>
                </div>
                <span class="text-xs font-medium px-2 py-1 rounded-full ${currentDifficulty === 'beginner' ? 'bg-green-100 text-green-800' : currentDifficulty === 'intermediate' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}">${currentDifficulty}</span>
            </div>
            <h3 class="font-bold text-gray-800 mb-2">${concept.title}</h3>
            <p class="text-sm text-gray-600 mb-3">${concept.description}</p>
            <div class="text-xs text-gray-500 italic">${ex.substring(0, 50)}...</div>
        `;
       
        grid.appendChild(card);
    });
   
    lucide.createIcons();
}

function showConceptDetail(index) {
    const concept = conceptsData[currentDifficulty][index];
    const modal = document.getElementById('info-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    title.textContent = concept.title;

    // If a file is specified for the concept, try to fetch the full HTML and inject it.
    if (concept.file) {
        const path = `concepts/${concept.file}`;
        fetch(path)
            .then(resp => {
                if (!resp.ok) throw new Error('Not found');
                return resp.text();
            })
            .then(html => {
                // Place the fetched HTML inside the modal. We extract the body content when possible.
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const body = doc.body.innerHTML || html;
                content.innerHTML = body;

                // Execute any inline scripts from the fetched HTML by re-creating them inside modal
                const scripts = doc.querySelectorAll('script');
                scripts.forEach((s) => {
                    try {
                        const newScript = document.createElement('script');
                        if (s.src) {
                            // External scripts: load them as-is
                            newScript.src = s.src;
                            newScript.async = false;
                        } else {
                            newScript.textContent = s.textContent;
                        }
                        content.appendChild(newScript);
                    } catch (e) {
                        console.warn('Could not execute embedded script for concept:', e);
                    }
                });

                modal.classList.remove('hidden');
                lucide.createIcons();
            })
            .catch(err => {
                // Fallback to inline content if fetch fails
                content.innerHTML = `
                    <p class="mb-4 text-lg">${concept.description}</p>
                    <div class="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                        <h4 class="font-semibold text-blue-900 mb-2">Explanation</h4>
                        <p class="text-blue-800">${concept.content}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-gray-800 mb-2">Example</h4>
                        <p class="text-gray-700">${concept.example}</p>
                    </div>
                `;
                modal.classList.remove('hidden');
                lucide.createIcons();
            });
    } else {
        // No file: use inline content as before
        content.innerHTML = `
            <p class="mb-4 text-lg">${concept.description}</p>
            <div class="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                <h4 class="font-semibold text-blue-900 mb-2">Explanation</h4>
                <p class="text-blue-800">${concept.content}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold text-gray-800 mb-2">Example</h4>
                <p class="text-gray-700">${concept.example}</p>
            </div>
        `;
        modal.classList.remove('hidden');
        lucide.createIcons();
    }
}

function renderStoryFocus() {
    const data = storyCopyData[activeStoryFocus];
    const title = document.getElementById('current-level-title');
    const desc = document.getElementById('current-level-desc');
    if (!data || !title || !desc) return;

    title.textContent = data.title;
    desc.textContent = data.description;

    document.querySelectorAll('[data-story-focus]').forEach(trigger => {
        const isActive = trigger.getAttribute('data-story-focus') === activeStoryFocus;
        trigger.classList.toggle('is-active', isActive);
        trigger.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

function renderMobileDifficultyPanel() {
    const desc = document.getElementById('mobile-level-desc');
    if (!desc) return;

    desc.textContent = mobileDifficultyCopy[currentDifficulty] || mobileDifficultyCopy.beginner;
}

function setStoryFocus(type) {
    if (!storyCopyData[type]) return;
    activeStoryFocus = type;
    renderStoryFocus();
}

function openStoryModal(type) {
    const data = storyCopyData[type];
    if (!data) return;
    setStoryFocus(type);
}

function filterCalculators() {
    document.querySelectorAll('.calculator-card').forEach(card => {
        const cardDiff = card.getAttribute('data-difficulty');
        if (cardDiff === currentDifficulty ||
            (currentDifficulty === 'intermediate' && cardDiff === 'beginner') ||
            (currentDifficulty === 'advanced')) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Visualization functions
function initializeCharts() {
    showViz('normal');
}

function showViz(type) {
    // Update tabs
    document.querySelectorAll('.viz-tab').forEach(tab => tab.classList.remove('tab-active', 'bg-teal-50'));
    document.getElementById(`tab-${type}`).classList.add('tab-active', 'bg-teal-50');
   
    const ctx = document.getElementById('mainChart').getContext('2d');
   
    if (mainChart) {
        mainChart.destroy();
    }
   
    let data, labels, explanation;
   
    if (type === 'normal') {
        // Read interactive mean and sd controls if present
        const meanControl = document.getElementById('viz-mean');
        const sdControl = document.getElementById('viz-sd');
        const mean = meanControl ? parseFloat(meanControl.value) : 0;
        const sd = sdControl ? parseFloat(sdControl.value) : 15;

        // Update labels showing current values
        const meanLabel = document.getElementById('viz-mean-label');
        const sdLabel = document.getElementById('viz-sd-label');
        if (meanLabel) meanLabel.textContent = mean;
        if (sdLabel) sdLabel.textContent = sd;

        labels = Array.from({length: 200}, (_, i) => i - 100);
        data = labels.map(x => {
            return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / sd, 2));
        });
       
        explanation = `
            <strong>Normal Distribution:</strong> Bell-shaped curve describing continuous data like salivary pH or age.
            68% of data falls within ±1 SD, 95% within ±2 SD, 99.7% within ±3 SD.
            Many parametric tests assume normality.
        `;
       
        mainChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Probability Density',
                    data: data,
                    borderColor: '#0f766e',
                    backgroundColor: 'rgba(15, 118, 110, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Normal Distribution (μ=0, σ=15)' }
                },
                scales: {
                    x: { title: { display: true, text: 'Value' } },
                    y: { display: false }
                }
            }
        });
    } else if (type === 'binomial') {
        labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const p = 0.3;
        data = labels.map(k => {
            return combinations(10, k) * Math.pow(p, k) * Math.pow(1-p, 10-k);
        });
       
        explanation = `
            <strong>Binomial Distribution:</strong> Models binary outcomes (success/failure).
            Example: Number of patients developing caries out of 10 high-risk patients.
            Shows probability of k successes in n trials with probability p.
        `;
       
        mainChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Probability',
                    data: data,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Binomial Distribution (n=10, p=0.3)' }
                }
            }
        });
    } else if (type === 'correlation') {
        // Generate correlated data
        const n = 50;
        const x = Array.from({length: n}, () => Math.random() * 100);
        const y = x.map(xi => 0.7 * xi + (Math.random() - 0.5) * 40);
       
        explanation = `
            <strong>Correlation:</strong> Measures linear association between variables (-1 to +1).
            Shown: Positive correlation between age and periodontal attachment loss.
            r = 0.7 indicates strong positive relationship. r² = 0.49 means 49% of variance explained.
        `;
       
        mainChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Data Points',
                    data: x.map((xi, i) => ({x: xi, y: y[i]})),
                    backgroundColor: 'rgba(245, 158, 11, 0.6)',
                    borderColor: 'rgb(245, 158, 11)',
                }, {
                    type: 'line',
                    label: 'Regression Line',
                    data: [{x: 0, y: 0}, {x: 100, y: 70}],
                    borderColor: 'rgb(220, 38, 38)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Scatter Plot with r = 0.7' }
                },
                scales: {
                    x: { title: { display: true, text: 'Age (years)' }, min: 0, max: 100 },
                    y: { title: { display: true, text: 'Attachment Loss (mm)' }, min: 0, max: 100 }
                }
            }
        });
    }
   
    document.getElementById('viz-explanation').innerHTML = explanation;
}

function combinations(n, k) {
    if (k > n) return 0;
    let result = 1;
    for (let i = 0; i < k; i++) {
        result *= (n - i) / (i + 1);
    }
    return result;
}

function updateVisualizationsForLevel() {
    // Reset simulations when difficulty changes
    resetCLT();
    resetLLN();
    resetCIDance();
}

// ==================== CENTRAL LIMIT THEOREM SIMULATION ====================
function initCLTCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const cltCanvas = document.getElementById('cltCanvas');
    if (cltCanvas) {
        cltCanvas.width = cltCanvas.offsetWidth * dpr;
        cltCanvas.height = cltCanvas.offsetHeight * dpr;
    }
    const popCanvas = document.getElementById('populationCanvas');
    if (popCanvas) {
        popCanvas.width = popCanvas.offsetWidth * dpr;
        popCanvas.height = popCanvas.offsetHeight * dpr;
        drawPopulationDistribution();
    }
}

function drawPopulationDistribution() {
    const canvas = document.getElementById('populationCanvas');
    if (!canvas) return;
    const type = document.getElementById('clt-distribution').value;
    const dpr = window.devicePixelRatio || 1;
    const dw = canvas.offsetWidth || 250;
    const dh = canvas.offsetHeight || 150;
    canvas.width = dw * dpr;
    canvas.height = dh * dpr;

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(dpr, dpr);

    const W = dw, H = dh;
    const PAD = { top: 22, right: 10, bottom: 18, left: 10 };
    const pw = W - PAD.left - PAD.right;
    const ph = H - PAD.top - PAD.bottom;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Build curve points (t in [0,1])
    const N = 300;
    const raw = [];
    for (let i = 0; i <= N; i++) {
        const t = i / N;
        let y;
        if (type === 'uniform') {
            y = 0.6;
        } else if (type === 'exponential') {
            y = Math.exp(-t * 2);
        } else if (type === 'bimodal') {
            y = (Math.exp(-Math.pow((t - 0.3) * 9, 2)) + Math.exp(-Math.pow((t - 0.7) * 9, 2))) / 2;
        } else {
            y = (1 / (0.08 + t * 0.5)) * Math.exp(-t * 2.2);
        }
        raw.push({ t, y });
    }
    const maxY = Math.max(...raw.map(p => p.y));
    const pts = raw.map(p => ({ t: p.t, y: p.y / maxY }));

    // Compute stats numerically
    let modePt = pts.reduce((b, p) => p.y > b.y ? p : b, pts[0]).t;
    const totalArea = pts.slice(1).reduce((s, p, i) => s + (p.y + pts[i].y) / 2 / N, 0);
    let cumArea = 0, medianPt = 0.5;
    for (let i = 1; i < pts.length; i++) {
        cumArea += (pts[i].y + pts[i - 1].y) / 2 / N;
        if (cumArea >= totalArea / 2) { medianPt = pts[i].t; break; }
    }
    const meanPt = pts.slice(1).reduce((s, p) => s + p.t * p.y / N, 0) / (totalArea || 1);

    // Clamp
    const clamp = v => Math.min(0.97, Math.max(0.03, v));

    // Draw filled area
    ctx.beginPath();
    ctx.moveTo(PAD.left, PAD.top + ph);
    pts.forEach(p => ctx.lineTo(PAD.left + p.t * pw, PAD.top + ph - p.y * ph * 0.88));
    ctx.lineTo(PAD.left + pw, PAD.top + ph);
    ctx.closePath();
    const fillGrad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + ph);
    fillGrad.addColorStop(0, 'rgba(13,148,136,0.3)');
    fillGrad.addColorStop(1, 'rgba(13,148,136,0.08)');
    ctx.fillStyle = fillGrad;
    ctx.fill();

    // Draw curve
    ctx.beginPath();
    ctx.strokeStyle = '#0d9488';
    ctx.lineWidth = 2.5;
    let first = true;
    pts.forEach(p => {
        const x = PAD.left + p.t * pw;
        const y = PAD.top + ph - p.y * ph * 0.88;
        if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '600 8px Inter,sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Population preview', PAD.left, 10);

    // X axis
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD.left, PAD.top + ph);
    ctx.lineTo(PAD.left + pw, PAD.top + ph);
    ctx.stroke();

    // Draw stat lines
    const drawStat = (tPos, color, label, labelRow) => {
        const x = PAD.left + clamp(tPos) * pw;
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(x, PAD.top + ph);
        ctx.lineTo(x, PAD.top - 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = color;
        ctx.font = 'bold 8px Inter,sans-serif';
        ctx.textAlign = 'center';
        // Stagger labels in 3 rows above chart
        const labelY = PAD.top - 12 + labelRow * 8;
        ctx.fillText(label, x, Math.max(6, labelY));
        ctx.restore();
    };

    if (type === 'uniform') {
        drawStat(0.5, '#6b7280', 'Mean = Median = Mode', 0);
    } else if (type === 'bimodal') {
        drawStat(0.3, '#8b5cf6', 'Mode₁', 0);
        drawStat(0.7, '#8b5cf6', 'Mode₂', 0);
        drawStat(0.5, '#ef4444', 'Mean', 1);
        drawStat(0.5, '#f59e0b', 'Median', 2);
    } else {
        // Right-skewed: Mode < Median < Mean
        drawStat(modePt, '#8b5cf6', 'Mode', 0);
        drawStat(medianPt, '#f59e0b', 'Median', 1);
        drawStat(meanPt, '#ef4444', 'Mean', 2);
    }

    // Legend at bottom
    if (type !== 'uniform') {
        ctx.font = '7.5px Inter,sans-serif';
        ctx.textAlign = 'left';
        const items = type === 'bimodal'
            ? [['Mode', '#8b5cf6'], ['Mean/Med', '#ef4444']]
            : [['Mode', '#8b5cf6'], ['Median', '#f59e0b'], ['Mean', '#ef4444']];
        items.forEach(([label, color], i) => {
            ctx.fillStyle = color;
            ctx.fillText('— ' + label, PAD.left + i * 55, H - 4);
        });
    }

    ctx.restore();
}

function updateCLTDistribution() {
    simState.centralLimit.viewMode = 'population';
    drawPopulationDistribution();
    resetCLT();
    updateCLTNote();
    syncCLTViewControls();
    syncMobileCLTControls();
}

function updateCLTParams() {
    const slider = document.getElementById('clt-n');
    const nLabel = document.getElementById('clt-n-val');
    if (!slider) return;
    const n = slider.value;
    if (nLabel) nLabel.textContent = `n=${n}`;
    simState.centralLimit.sampleSize = parseInt(n);
    resetCLT();
    updateCLTNote();
    syncMobileCLTControls();
}

function updateCLTSpeedIndicator() {
    const speedSlider = document.getElementById('clt-speed');
    const indicator = document.getElementById('clt-speed-indicator');
    if (!speedSlider || !indicator) return;
    indicator.textContent = `×${speedSlider.value}`;
}

function syncMobileCLTControls() {
    const distributionSelect = document.getElementById('clt-distribution');
    const mobileDistributionSelect = document.getElementById('clt-distribution-mobile');
    const sampleSlider = document.getElementById('clt-n');
    if (!distributionSelect || !sampleSlider) return;

    if (mobileDistributionSelect) {
        mobileDistributionSelect.value = distributionSelect.value;
    }

    document.querySelectorAll('[data-clt-dist]').forEach((button) => {
        const isActive = button.dataset.cltDist === distributionSelect.value;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    const currentSampleSize = parseInt(sampleSlider.value, 10);
    const presetValues = [1, 30, 100];
    const activePreset = presetValues.reduce((closest, value) => {
        return Math.abs(value - currentSampleSize) < Math.abs(closest - currentSampleSize) ? value : closest;
    }, presetValues[0]);

    document.querySelectorAll('[data-clt-n]').forEach((button) => {
        const isActive = parseInt(button.dataset.cltN, 10) === activePreset;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

function syncCLTViewControls() {
    const populationBtn = document.getElementById('clt-view-population');
    const title = document.getElementById('clt-chart-mode-title');
    const overlayTitle = document.getElementById('clt-overlay-title');
    const overlayCopy = document.getElementById('clt-overlay-copy');
    const footerCopy = document.getElementById('clt-chart-footer-copy');
    simState.centralLimit.viewMode = 'population';

    if (title) {
        title.textContent = 'Population Values';
    }

    if (overlayTitle) {
        overlayTitle.textContent = 'Click Start to Draw Values';
    }

    if (overlayCopy) {
        overlayCopy.textContent = 'The right chart will show raw simulated values from the selected population, with mean, median, and mode guides.';
    }

    if (footerCopy) {
        footerCopy.textContent = 'This view shows raw simulated population values with mean, median, and mode reference guides.';
    }

    if (populationBtn) {
        populationBtn.setAttribute('aria-pressed', 'true');
    }
}

function setCLTViewMode() {
    simState.centralLimit.viewMode = 'population';
    syncCLTViewControls();
    updateCLTNote();
    drawCLTHistogram();
}

function selectMobileCLTDistribution(type) {
    const distributionSelect = document.getElementById('clt-distribution');
    if (!distributionSelect) return;
    distributionSelect.value = type;
    updateCLTDistribution();
}

function selectMobileCLTDistributionFromDropdown(type) {
    const distributionSelect = document.getElementById('clt-distribution');
    if (!distributionSelect) return;
    distributionSelect.value = type;
    updateCLTDistribution();
}

function selectMobileCLTSampleSize(n) {
    const sampleSlider = document.getElementById('clt-n');
    if (!sampleSlider) return;
    sampleSlider.value = String(n);
    updateCLTParams();
}

function initHomeMobileSimulationControls() {
    syncMobileCLTControls();
    updateCLTSpeedIndicator();
    syncCLTViewControls();
}

function updateCLTNote() {
    const note = document.getElementById('clt-sampling-note');
    const distributionSelect = document.getElementById('clt-distribution');
    const sampleSlider = document.getElementById('clt-n');
    if (!note || !distributionSelect || !sampleSlider) return;

    const type = distributionSelect.value;
    const n = parseInt(sampleSlider.value, 10);
    const labels = {
        uniform: 'Uniform',
        exponential: 'Exponential',
        bimodal: 'Bimodal',
        dental: 'Dental DMFT'
    };
    const selectedLabel = labels[type] || 'Selected';

    note.innerHTML = `
        <span class="font-semibold text-slate-700">Selected population:</span> ${selectedLabel}.
        The right chart is currently showing <span class="font-semibold text-slate-700">raw simulated population values</span>,
        so its shape should resemble the preview on the left, including the <span class="font-semibold text-slate-700">mean, median, and mode guide lines</span>.
        <span class="block mt-1 text-sky-700 font-medium">Use Start to keep drawing values from the selected population and watch the raw shape fill in.</span>
    `;
}

// Helper: generate a standard normal random variable (Box-Muller)
function gaussianRandom() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Generate one random value from the selected population distribution
function generateCLTValue(type) {
    if (type === 'uniform') {
        return Math.random();
    } else if (type === 'exponential') {
        return -Math.log(1 - Math.random()) / 2;
    } else if (type === 'bimodal') {
        return Math.random() > 0.5
            ? 0.3 + gaussianRandom() * 0.08
            : 0.7 + gaussianRandom() * 0.08;
    } else { // dental
        return Math.pow(Math.random(), 2) * 0.8;
    }
}

function getCLTPopulationRange(type) {
    const populationRanges = {
        uniform: { min: 0, max: 1 },
        exponential: { min: 0, max: 2.5 },
        bimodal: { min: 0, max: 1 },
        dental: { min: 0, max: 0.85 }
    };
    return populationRanges[type] || populationRanges.uniform;
}

function getMedianValue(values) {
    if (!values.length) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function getCLTPopulationReferenceStats(type, values, counts, rangeMin, binWidth) {
    if (type === 'uniform') {
        return [
            { value: 0.5, color: '#6b7280', dash: [4, 4], label: 'Mean = Median = Mode', labelY: 18 }
        ];
    }

    if (type === 'bimodal') {
        return [
            { value: 0.3, color: '#8b5cf6', dash: [4, 4], label: 'Mode₁', labelY: 16 },
            { value: 0.5, color: '#ef4444', dash: [4, 4], label: 'Mean', labelY: 16 },
            { value: 0.5, color: '#f59e0b', dash: [7, 4], label: 'Median', labelY: 30 },
            { value: 0.7, color: '#8b5cf6', dash: [4, 4], label: 'Mode₂', labelY: 16 }
        ];
    }

    if (type === 'exponential') {
        return [
            { value: 0.0, color: '#8b5cf6', dash: [4, 4], label: 'Mode', labelY: 16 },
            { value: Math.log(2) / 2, color: '#f59e0b', dash: [7, 4], label: 'Median', labelY: 30 },
            { value: 0.5, color: '#ef4444', dash: [4, 4], label: 'Mean', labelY: 16 }
        ];
    }

    if (type === 'dental') {
        return [
            { value: 0.0, color: '#8b5cf6', dash: [4, 4], label: 'Mode', labelY: 16 },
            { value: 0.2, color: '#f59e0b', dash: [7, 4], label: 'Median', labelY: 30 },
            { value: 0.8 / 3, color: '#ef4444', dash: [4, 4], label: 'Mean', labelY: 16 }
        ];
    }

    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    const median = getMedianValue(values);
    const maxBin = counts.indexOf(Math.max(...counts));
    const mode = rangeMin + (maxBin + 0.5) * binWidth;
    return [
        { value: mode, color: '#8b5cf6', dash: [4, 4], label: 'Mode', labelY: 16 },
        { value: median, color: '#f59e0b', dash: [7, 4], label: 'Median', labelY: 30 },
        { value: mean, color: '#ef4444', dash: [4, 4], label: 'Mean', labelY: 16 }
    ];
}

// Get a stable expected range for each distribution type so the axis doesn't jump
function getCLTExpectedRange(type, sampleSize) {
    const popStats = {
        uniform:     { mean: 0.5,   std: 1 / Math.sqrt(12) },
        exponential: { mean: 0.5,   std: 0.5 },
        bimodal:     { mean: 0.5,   std: 0.22 },
        dental:      { mean: 0.267, std: 0.22 }
    };
    const s = popStats[type] || popStats.uniform;
    const seMean = s.std / Math.sqrt(Math.max(1, sampleSize));
    // Show ±4.5 standard errors around the expected mean
    const halfWidth = Math.max(seMean * 4.5, 0.08);
    return { min: s.mean - halfWidth, max: s.mean + halfWidth };
}

// Falling dots for visual feedback
let cltFallingDots = [];

function startCLTSimulation() {
    if (simState.centralLimit.running) {
        simState.centralLimit.running = false;
        clearInterval(simState.centralLimit.intervalId);
        document.getElementById('clt-start').innerHTML = '<i data-lucide="play" class="w-4 h-4 mr-1"></i> Resume';
        lucide.createIcons();
        return;
    }

    simState.centralLimit.running = true;
    document.getElementById('clt-overlay').classList.add('hidden');
    document.getElementById('clt-start').innerHTML = '<i data-lucide="pause" class="w-4 h-4 mr-1"></i> Pause';
    lucide.createIcons();

    const speed = parseInt(document.getElementById('clt-speed').value);
    const samplesPerSec = speed <= 5 ? speed : speed * 2;
    const interval = Math.max(30, 1000 / samplesPerSec);

    simState.centralLimit.intervalId = setInterval(() => {
        drawOneSample();
    }, interval);

    animateCLT();
}

function drawOneSample() {
    const n = parseInt(document.getElementById('clt-n').value);
    const type = document.getElementById('clt-distribution').value;
    let sum = 0;
    const rawSample = [];

    for (let i = 0; i < n; i++) {
        const value = generateCLTValue(type);
        rawSample.push(value);
        sum += value;
    }

    const mean = sum / n;
    simState.centralLimit.means.push(mean);
    simState.centralLimit.rawValues.push(...rawSample);
    simState.centralLimit.draws++;

    if (simState.centralLimit.means.length > 4000) {
        simState.centralLimit.means.splice(0, simState.centralLimit.means.length - 4000);
    }
    if (simState.centralLimit.rawValues.length > 6000) {
        simState.centralLimit.rawValues.splice(0, simState.centralLimit.rawValues.length - 6000);
    }

    // Animated falling dot
    cltFallingDots.push({ x: mean, y: 0, vy: 0, age: 0 });
    if (cltFallingDots.length > 25) cltFallingDots.shift();

    document.getElementById('clt-count').textContent = simState.centralLimit.draws;

    const grandMean = simState.centralLimit.means.reduce((a, b) => a + b, 0) / simState.centralLimit.means.length;
    document.getElementById('clt-grand-mean').textContent = grandMean.toFixed(3);
}

function animateCLT() {
    if (!simState.centralLimit.running) return;
    drawCLTHistogram();
    requestAnimationFrame(animateCLT);
}

function drawCLTHistogram() {
    const canvas = document.getElementById('cltCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const dw = canvas.offsetWidth;
    const dh = canvas.offsetHeight;
    if (dw === 0 || dh === 0) return;
    canvas.width = dw * dpr;
    canvas.height = dh * dpr;
    ctx.save();
    ctx.scale(dpr, dpr);
    const w = dw, h = dh;
    const PAD = { top: 36, right: 16, bottom: 52, left: 48 };
    const pw = w - PAD.left - PAD.right;
    const ph = h - PAD.top - PAD.bottom;

    ctx.clearRect(0, 0, w, h);

    const means = simState.centralLimit.means;
    const rawValues = simState.centralLimit.rawValues;
    const type = document.getElementById('clt-distribution').value;
    const sampleSize = parseInt(document.getElementById('clt-n').value);
    const viewMode = simState.centralLimit.viewMode || 'population';
    const dataSeries = viewMode === 'population' ? rawValues : means;
    if (dataSeries.length === 0) { ctx.restore(); return; }

    // Stable range based on chosen view mode
    const expectedRange = viewMode === 'population'
        ? getCLTPopulationRange(type)
        : getCLTExpectedRange(type, sampleSize);
    let rangeMin = expectedRange.min;
    let rangeMax = expectedRange.max;

    // Keep population views on a stable theoretical range so long-tail outliers
    // do not flatten the whole chart and make the preview feel mismatched.
    if (viewMode !== 'population') {
        for (let i = 0; i < dataSeries.length; i++) {
            if (dataSeries[i] < rangeMin) rangeMin = dataSeries[i] - 0.02;
            if (dataSeries[i] > rangeMax) rangeMax = dataSeries[i] + 0.02;
        }
    }
    const dataRange = rangeMax - rangeMin;

    // Build histogram — adaptive bin count based on sample size
    const bins = Math.max(8, Math.min(40, Math.ceil(Math.sqrt(dataSeries.length))));
    const counts = new Array(bins).fill(0);
    const binWidth = dataRange / bins;
    dataSeries.forEach(value => {
        const bin = Math.min(Math.max(Math.floor((value - rangeMin) / binWidth), 0), bins - 1);
        counts[bin]++;
    });
    const maxCount = Math.max(...counts, 1);

    // Background
    ctx.fillStyle = '#f8fffe';
    ctx.fillRect(PAD.left, PAD.top, pw, ph);

    // Grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    const gridLines = 5;
    for (let i = 1; i <= gridLines; i++) {
        const y = PAD.top + ph - (i / gridLines) * ph;
        ctx.beginPath();
        ctx.moveTo(PAD.left, y);
        ctx.lineTo(PAD.left + pw, y);
        ctx.stroke();
        ctx.fillStyle = '#9ca3af';
        ctx.font = '9px Inter,system-ui,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round((i / gridLines) * maxCount), PAD.left - 6, y + 3);
    }

    // Axes
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD.left, PAD.top);
    ctx.lineTo(PAD.left, PAD.top + ph);
    ctx.lineTo(PAD.left + pw, PAD.top + ph);
    ctx.stroke();

    // Histogram bars with rounded tops
    const barGap = 1;
    const barW = Math.max(2, pw / bins - barGap);
    counts.forEach((count, i) => {
        if (count === 0) return;
        const barH = (count / maxCount) * ph;
        const x = PAD.left + (i / bins) * pw + barGap / 2;
        const yTop = PAD.top + ph - barH;

        const grad = ctx.createLinearGradient(0, yTop, 0, PAD.top + ph);
        grad.addColorStop(0, 'rgba(13,148,136,0.85)');
        grad.addColorStop(0.5, 'rgba(13,148,136,0.65)');
        grad.addColorStop(1, 'rgba(204,251,241,0.9)');
        ctx.fillStyle = grad;

        const r = Math.min(3, barW / 2, barH / 2);
        ctx.beginPath();
        ctx.moveTo(x, PAD.top + ph);
        ctx.lineTo(x, yTop + r);
        ctx.quadraticCurveTo(x, yTop, x + r, yTop);
        ctx.lineTo(x + barW - r, yTop);
        ctx.quadraticCurveTo(x + barW, yTop, x + barW, yTop + r);
        ctx.lineTo(x + barW, PAD.top + ph);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(13,148,136,0.25)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
    });

    // X-axis tick labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '9px Inter,system-ui,sans-serif';
    ctx.textAlign = 'center';
    const numTicks = 6;
    for (let i = 0; i <= numTicks; i++) {
        const xPos = PAD.left + (i / numTicks) * pw;
        const val = rangeMin + (i / numTicks) * dataRange;
        ctx.fillText(val.toFixed(2), xPos, PAD.top + ph + 14);
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xPos, PAD.top + ph);
        ctx.lineTo(xPos, PAD.top + ph + 4);
        ctx.stroke();
    }

    // Axis labels
    ctx.fillStyle = '#374151';
    ctx.font = '11px Inter,system-ui,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Population Value', PAD.left + pw / 2, PAD.top + ph + 34);
    ctx.save();
    ctx.translate(12, PAD.top + ph / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Frequency', 0, 0);
    ctx.restore();

    const drawReferenceLabel = (xPos, text, color, yPos) => {
        const clampedX = Math.min(Math.max(xPos, PAD.left + 40), PAD.left + pw - 40);
        ctx.save();
        ctx.font = 'bold 10px Inter,system-ui,sans-serif';
        ctx.textAlign = 'center';
        const textWidth = ctx.measureText(text).width;
        ctx.fillStyle = 'rgba(255,255,255,0.94)';
        ctx.fillRect(clampedX - textWidth / 2 - 5, yPos - 11, textWidth + 10, 14);
        ctx.fillStyle = color;
        ctx.fillText(text, clampedX, yPos);
        ctx.restore();
    };

    const referenceStats = getCLTPopulationReferenceStats(type, dataSeries, counts, rangeMin, binWidth);
    referenceStats.forEach(({ value, color, dash, label, labelY }) => {
        const xPos = PAD.left + ((value - rangeMin) / dataRange) * pw;
        if (xPos < PAD.left || xPos > PAD.left + pw) return;

        ctx.strokeStyle = color;
        ctx.lineWidth = color === '#f59e0b' ? 1.8 : 1.5;
        ctx.setLineDash(dash || [4, 4]);
        ctx.beginPath();
        ctx.moveTo(xPos, PAD.top);
        ctx.lineTo(xPos, PAD.top + ph);
        ctx.stroke();
        ctx.setLineDash([]);

        if (label) {
            drawReferenceLabel(xPos, label, color, PAD.top - 10 + (labelY || 16));
        }
    });

    ctx.restore();
}

function resetCLT() {
    simState.centralLimit.running = false;
    simState.centralLimit.means = [];
    simState.centralLimit.rawValues = [];
    simState.centralLimit.draws = 0;
    clearInterval(simState.centralLimit.intervalId);
    cltFallingDots = [];

    document.getElementById('clt-count').textContent = '0';
    document.getElementById('clt-grand-mean').textContent = '-';
    document.getElementById('clt-start').innerHTML = '<i data-lucide="play" class="w-4 h-4 mr-1"></i> Start';
    document.getElementById('clt-overlay').classList.remove('hidden');

    const canvas = document.getElementById('cltCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    updateCLTNote();
    syncCLTViewControls();
    syncMobileCLTControls();
    lucide.createIcons();
}

// ==================== LAW OF LARGE NUMBERS SIMULATION ====================
function initLLNChart() {
    const ctx = document.getElementById('llnChart').getContext('2d');
    simState.probability.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Observed Rate',
                data: [],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: false,
                tension: 0.1
            }, {
                label: 'True Rate',
                data: [],
                borderColor: '#ef4444',
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Number of Patients' }, min: 0 },
                y: { title: { display: true, text: 'Caries Rate' }, min: 0, max: 1 }
            },
            animation: false
        }
    });
}

function updateLLNParams() {
    const p = document.getElementById('lln-true-p').value / 100;
    document.getElementById('lln-true-val').textContent = `${(p * 100).toFixed(0)}%`;
    resetLLN();
}

function startLLNSimulation() {
    const btn = document.getElementById('lln-start');
    if (btn.textContent === 'Stop') {
        btn.textContent = 'Simulate Patients';
        clearInterval(simState.probability.interval);
        return;
    }
   
    btn.textContent = 'Stop';
    const trueP = parseInt(document.getElementById('lln-true-p').value) / 100;
    const container = document.getElementById('lln-patients');
   
    // Clear initial text
    if (simState.probability.trials === 0) {
        container.innerHTML = '';
    }
   
    simState.probability.interval = setInterval(() => {
        // Add 5 patients at a time for speed
        for (let i = 0; i < 5; i++) {
            const hasCaries = Math.random() < trueP;
            simState.probability.trials++;
            if (hasCaries) simState.probability.successes++;
           
            // Visual patient icon
            const patient = document.createElement('div');
            patient.className = `w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${hasCaries ? 'bg-red-100 text-red-700 border-2 border-red-400' : 'bg-green-100 text-green-700 border-2 border-green-400'} transform scale-0 transition-transform`;
            patient.innerHTML = hasCaries ? '🦷' : '😁';
            patient.title = `Patient ${simState.probability.trials}: ${hasCaries ? 'Caries +' : 'Caries -'}`;
            container.appendChild(patient);
           
            // Animate in
            setTimeout(() => patient.classList.remove('scale-0'), 10 * i);
        }
       
        // Update counts
        document.getElementById('lln-caries-count').textContent = simState.probability.successes;
        document.getElementById('lln-healthy-count').textContent = simState.probability.trials - simState.probability.successes;
       
        // Ensure chart exists (it may have been cleared by reset)
        if (!simState.probability.chart) {
            try { initLLNChart(); } catch (e) { console.warn('Could not initialize LLN chart', e); }
        }

        // Update chart
        const observed = simState.probability.successes / simState.probability.trials;
        if (simState.probability.chart && simState.probability.chart.data) {
            simState.probability.chart.data.labels.push(simState.probability.trials);
            simState.probability.chart.data.datasets[0].data.push(observed);
            simState.probability.chart.data.datasets[1].data.push(trueP);
            simState.probability.chart.update('none');
        }
       
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
       
        // Auto-stop at 1000
        if (simState.probability.trials >= 1000) {
            clearInterval(simState.probability.interval);
            btn.textContent = 'Simulate Patients';
        }
    }, 50);
}

function resetLLN() {
    clearInterval(simState.probability.interval);
    // preserve chart instance; just reset counters
    simState.probability.trials = 0;
    simState.probability.successes = 0;
    simState.probability.probability = 0.5;
    simState.probability.interval = null;
   
    document.getElementById('lln-caries-count').textContent = '0';
    document.getElementById('lln-healthy-count').textContent = '0';
    document.getElementById('lln-patients').innerHTML = '<div class="text-gray-400 text-sm flex items-center">Click Simulate to add patients...</div>';
    document.getElementById('lln-start').textContent = 'Simulate Patients';
   
    if (simState.probability.chart && simState.probability.chart.data) {
        simState.probability.chart.data.labels = [];
        simState.probability.chart.data.datasets.forEach(ds => ds.data = []);
        simState.probability.chart.update();
    }
}

// ==================== CONFIDENCE INTERVAL DANCE ====================
const CI_TOTAL = 100;
const CI_TRUE_MEAN = 50;
const CI_SCALE = [15, 85]; // display range
let ciData = [];
let ciRunning = false;

function drawCICanvas() {
    const canvas = document.getElementById('ciDanceCanvas');
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const dw = canvas.offsetWidth;
    const dh = canvas.offsetHeight;
    if (dw === 0 || dh === 0) return;
    canvas.width = dw * dpr;
    canvas.height = dh * dpr;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(dpr, dpr);
    const W = dw, H = dh;

    const PAD = { top: 36, right: 20, bottom: 28, left: 20 };
    const pw = W - PAD.left - PAD.right;
    const ph = H - PAD.top - PAD.bottom;

    ctx.clearRect(0, 0, W, H);

    // Soft background
    ctx.fillStyle = '#f8fafe';
    ctx.fillRect(0, 0, W, H);

    const toX = v => PAD.left + ((v - CI_SCALE[0]) / (CI_SCALE[1] - CI_SCALE[0])) * pw;
    const tx = toX(CI_TRUE_MEAN);

    // Subtle vertical grid
    ctx.strokeStyle = '#f0f0f5';
    ctx.lineWidth = 0.5;
    for (let v = 20; v <= 80; v += 5) {
        const x = toX(v);
        ctx.beginPath(); ctx.moveTo(x, PAD.top); ctx.lineTo(x, PAD.top + ph); ctx.stroke();
    }

    // True mean highlight band (subtle)
    ctx.fillStyle = 'rgba(220, 38, 38, 0.04)';
    ctx.fillRect(tx - 1.5, PAD.top, 3, ph);

    // True mean vertical line
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(tx, PAD.top);
    ctx.lineTo(tx, PAD.top + ph);
    ctx.stroke();

    // True mean label with badge
    ctx.fillStyle = '#dc2626';
    const labelW = 48, labelH = 18;
    ctx.beginPath();
    ctx.fillRect(tx - labelW / 2, PAD.top - 28, labelW, labelH);
    ctx.fill();
    // Triangle pointer
    ctx.beginPath();
    ctx.moveTo(tx - 5, PAD.top - 10); ctx.lineTo(tx + 5, PAD.top - 10); ctx.lineTo(tx, PAD.top - 4); ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Inter,system-ui,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('\u03BC = 50', tx, PAD.top - 15);

    // Legend
    ctx.font = '10px Inter,system-ui,sans-serif';
    const legendY = 10;
    // Blue captures
    ctx.fillStyle = 'rgba(59,130,246,0.15)';
    ctx.fillRect(PAD.left, legendY - 2, 70, 16);
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath(); ctx.arc(PAD.left + 8, legendY + 5, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#374151';
    ctx.textAlign = 'left';
    ctx.fillText('Captures \u03BC', PAD.left + 16, legendY + 9);
    // Red misses
    ctx.fillStyle = 'rgba(239,68,68,0.15)';
    ctx.fillRect(PAD.left + 80, legendY - 2, 60, 16);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(PAD.left + 88, legendY + 5, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#374151';
    ctx.fillText('Misses \u03BC', PAD.left + 96, legendY + 9);

    // Draw intervals
    if (ciData.length > 0) {
        const rowH = Math.max(2.5, ph / CI_TOTAL);
        ciData.forEach((d, i) => {
            const y = PAD.top + i * rowH + rowH / 2;
            const lx = Math.max(PAD.left, toX(d.lower));
            const ux = Math.min(PAD.left + pw, toX(d.upper));
            const mx = Math.max(lx + 1, Math.min(ux - 1, toX(d.mean)));

            if (d.captures) {
                // Blue with subtle gradient
                ctx.globalAlpha = 0.7;
                ctx.strokeStyle = '#3b82f6';
                ctx.lineWidth = rowH > 5 ? 2.5 : 1.8;
            } else {
                // Red — more prominent
                ctx.globalAlpha = 0.9;
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = rowH > 5 ? 2.5 : 2;
            }

            // Interval line
            ctx.beginPath();
            ctx.moveTo(lx, y);
            ctx.lineTo(ux, y);
            ctx.stroke();

            // End caps
            const cap = Math.min(rowH * 0.45, 4);
            ctx.beginPath();
            ctx.moveTo(lx, y - cap); ctx.lineTo(lx, y + cap); ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(ux, y - cap); ctx.lineTo(ux, y + cap); ctx.stroke();

            // Centre dot
            ctx.globalAlpha = 1;
            ctx.fillStyle = d.captures ? '#3b82f6' : '#ef4444';
            ctx.beginPath();
            ctx.arc(mx, y, rowH > 5 ? 3 : 2, 0, Math.PI * 2);
            ctx.fill();

            // Newest interval glow effect
            if (i === ciData.length - 1) {
                ctx.globalAlpha = 0.25;
                ctx.fillStyle = d.captures ? '#3b82f6' : '#ef4444';
                ctx.fillRect(lx, y - rowH / 2, ux - lx, rowH);
                ctx.globalAlpha = 1;
            }
        });
    } else {
        // Placeholder
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#9ca3af';
        ctx.font = '14px Inter,system-ui,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Click "Run 100 Samples" to watch the dance', W / 2, H / 2 - 10);
        ctx.font = '11px Inter,system-ui,sans-serif';
        ctx.fillStyle = '#c0c0c0';
        ctx.fillText('Each line is a 95% confidence interval — blue captures the true mean, red misses it', W / 2, H / 2 + 12);
    }

    ctx.globalAlpha = 1;

    // X-axis tick labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '9px Inter,system-ui,sans-serif';
    ctx.textAlign = 'center';
    for (let v = 20; v <= 80; v += 10) {
        const x = toX(v);
        ctx.fillText(v, x, PAD.top + ph + 16);
        // Tick mark
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, PAD.top + ph); ctx.lineTo(x, PAD.top + ph + 4); ctx.stroke();
    }

    ctx.restore();
}

function initCICanvas() {
    const canvas = document.getElementById('ciDanceCanvas');
    if (!canvas) return;
    drawCICanvas();
}

function startCIDance() {
    const btn = document.getElementById('ci-dance-start');

    if (ciRunning) {
        ciRunning = false;
        clearInterval(simState.ciInterval);
        btn.textContent = 'Run 100 Samples';
        return;
    }

    ciData = [];
    ciRunning = true;
    btn.textContent = 'Stop';
    initCICanvas();

    let count = 0;
    let captured = 0;

    simState.ciInterval = setInterval(() => {
        for (let i = 0; i < 2; i++) {
            if (count >= CI_TOTAL) {
                clearInterval(simState.ciInterval);
                ciRunning = false;
                btn.textContent = 'Run Again';
                drawCICanvas();
                return;
            }
            const sampleMean = CI_TRUE_MEAN + (Math.random() - 0.5) * 28;
            const se = 7 + Math.random() * 6;
            const lower = sampleMean - 1.96 * se;
            const upper = sampleMean + 1.96 * se;
            const captures = lower <= CI_TRUE_MEAN && upper >= CI_TRUE_MEAN;
            ciData.push({ lower, upper, mean: sampleMean, captures });
            if (captures) captured++;
            count++;
        }
        drawCICanvas();
        document.getElementById('ci-capture-count').textContent = captured;
        document.getElementById('ci-total-count').textContent = count;
        document.getElementById('ci-percentage').textContent = count > 0 ? ((captured / count) * 100).toFixed(1) : '0';
    }, 120);
}

function resetCIDance() {
    clearInterval(simState.ciInterval);
    ciRunning = false;
    ciData = [];
    initCICanvas();
    document.getElementById('ci-capture-count').textContent = '0';
    document.getElementById('ci-total-count').textContent = '0';
    document.getElementById('ci-percentage').textContent = '0';
    document.getElementById('ci-dance-start').textContent = 'Run 100 Samples';
}

// Initialize all
window.addEventListener('resize', () => {
    initCLTCanvas();
    initCICanvas();
});

function openModal(type) {
    const data = modalData[type];
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-content').innerHTML = data.content;
    document.getElementById('info-modal').classList.remove('hidden');
    lucide.createIcons();
}

function closeModal() {
    document.getElementById('info-modal').classList.add('hidden');
}

function initSeoFlipCards() {
    document.querySelectorAll('.seo-flip-card').forEach((card) => {
        if (card.dataset.flipBound === 'true') return;

        card.dataset.flipBound = 'true';
        card.addEventListener('click', () => {
            const nextState = !card.classList.contains('is-flipped');
            card.classList.toggle('is-flipped', nextState);
            card.setAttribute('aria-pressed', nextState ? 'true' : 'false');
        });
    });
}

// Close modal on outside click
const infoModal = document.getElementById('info-modal');
if (infoModal) {
    infoModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// DOM ready initialization (was inline in index.html)
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide && lucide.createIcons) lucide.createIcons();
    initSeoFlipCards();

    const safeInit = (fn) => {
        try {
            fn();
        } catch (err) {
            // Individual homepage widgets should not block each other.
        }
    };

    // Initialize with beginner level
    safeInit(() => setDifficulty('beginner'));
    safeInit(() => initializeCharts());
    safeInit(() => initCLTCanvas());
    safeInit(() => initHomeMobileSimulationControls());
    safeInit(() => updateCLTNote());
    safeInit(() => initCICanvas());
    safeInit(() => initLLNChart());

    // Handle window resize for canvas
    window.addEventListener('resize', () => {
        safeInit(() => initCLTCanvas());
        safeInit(() => initCICanvas());
        safeInit(() => syncMobileCLTControls());
        safeInit(() => {
            if (simState.probability.chart) {
                simState.probability.chart.resize();
            }
        });
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            if (navLinks.classList.contains('hidden')) navLinks.classList.remove('hidden');
            else navLinks.classList.add('hidden');
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            // hide mobile nav on escape
            if (navLinks && !navLinks.classList.contains('hidden')) navLinks.classList.add('hidden');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // collapse mobile nav after click
                if (navLinks && !navLinks.classList.contains('hidden')) navLinks.classList.add('hidden');
            }
        });
    });

    // Visualization controls: update normal chart when sliders change
    const vizMean = document.getElementById('viz-mean');
    const vizSd = document.getElementById('viz-sd');
    if (vizMean) vizMean.addEventListener('input', () => showViz('normal'));
    if (vizSd) vizSd.addEventListener('input', () => showViz('normal'));
});
