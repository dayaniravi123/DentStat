STAT_METHOD_GROUPS = [
    {
        "slug": "anova-mean-comparison",
        "title": "ANOVA and Mean Comparison",
        "summary": "Compare means across study arms, repeated measurements, and modeled group designs.",
        "methods": [
            "One-Way ANOVA",
            "ANCOVA",
            "General Linear Models (GLM)",
            "Repeated Measures ANOVA",
            "Mixed-Model Repeated Measures",
            "MANOVA",
            "MANCOVA",
            "Balanced Design Analysis",
            "Latin Square ANOVA",
            "Crossover ANOVA",
            "Multiple Comparisons and Contrasts",
            "Area Under the Curve Analysis",
            "Box-Cox Transformation",
        ],
    },
    {
        "slug": "descriptive-statistics",
        "title": "Descriptive Statistics",
        "summary": "Summarize distributions, check assumptions, and inspect data quality before modeling.",
        "methods": [
            "Descriptive Statistics",
            "Summary Tables",
            "Summary Lists",
            "Frequency Tables",
            "Data Screening",
            "Data Simulation",
            "Normality Tests",
            "Outlier Detection (Grubbs)",
            "Tolerance Intervals",
            "Circular Data Analysis",
        ],
    },
    {
        "slug": "probability-proportions",
        "title": "Probability and Proportions",
        "summary": "Work with proportions, categorical outcomes, and exact or asymptotic proportion procedures.",
        "methods": [
            "One Proportion",
            "Two Proportions",
            "Two Correlated Proportions",
            "Contingency Tables",
            "Cochran's Q Test",
            "Mantel-Haenszel Test",
            "Loglinear Models",
            "Exact Binomial Procedures",
        ],
    },
    {
        "slug": "t-tests",
        "title": "T-Tests and Mean Tests",
        "summary": "Compare one mean, paired measurements, or independent groups with interval estimates.",
        "methods": [
            "One-Sample T-Test",
            "Paired T-Test",
            "Two-Sample T-Test",
            "Equivalence T-Tests",
            "Non-Inferiority T-Tests",
            "Superiority by Margin T-Tests",
            "2x2 Cross-Over T-Tests",
            "Confidence Intervals for Means",
        ],
    },
    {
        "slug": "regression",
        "title": "Regression",
        "summary": "Model continuous, count, binary, and time-to-event outcomes with structured regression tools.",
        "methods": [
            "Simple Linear Regression",
            "Multiple Linear Regression",
            "Logistic Regression",
            "Conditional Logistic Regression",
            "Cox Regression",
            "Poisson Regression",
            "Negative Binomial Regression",
            "Zero-Inflated Poisson Regression",
            "Zero-Inflated Negative Binomial Regression",
            "Geometric Regression",
            "Ridge Regression",
            "Robust Regression",
            "Principal Components Regression",
            "Response Surface Regression",
            "Nonlinear Regression",
            "Harmonic Regression",
            "Two-Stage Least Squares",
            "Mediation Analysis",
        ],
    },
    {
        "slug": "correlation-agreement",
        "title": "Correlation and Agreement",
        "summary": "Study association, concordance, and method-comparison performance between measures.",
        "methods": [
            "Pearson Correlation",
            "Spearman Correlation",
            "Kendall's Tau",
            "Correlation Matrix",
            "Point-Biserial Correlation",
            "Biserial Correlation",
            "Canonical Correlation",
            "Lin's Concordance Correlation",
            "Bland-Altman Analysis",
            "Deming Regression",
            "Passing-Bablok Regression",
        ],
    },
    {
        "slug": "diagnostic-roc",
        "title": "Diagnostic Tests and ROC",
        "summary": "Evaluate diagnostic accuracy, thresholds, and classification performance.",
        "methods": [
            "Binary Diagnostic Tests",
            "One ROC Curve and Cutoff Analysis",
            "Comparing Two ROC Curves",
            "ROC Curves",
            "Cutpoint Optimization",
        ],
    },
    {
        "slug": "survival-analysis",
        "title": "Survival Analysis and Reliability",
        "summary": "Analyze time-to-event outcomes and compare survival experiences across groups.",
        "methods": [
            "Kaplan-Meier Curves",
            "Life-Table Analysis",
            "Cumulative Incidence",
            "Weibull Survival Regression",
            "Cox Regression",
            "Survival Non-Inferiority Tests",
            "Survival Superiority Tests",
            "Survival Equivalence Tests",
            "Hazard-Rate Group-Sequential Analysis",
        ],
    },
    {
        "slug": "meta-analysis",
        "title": "Meta-Analysis",
        "summary": "Combine evidence across studies using common effect-size families.",
        "methods": [
            "Meta-Analysis of Two Proportions",
            "Meta-Analysis of Correlated Proportions",
            "Meta-Analysis of Two Means",
            "Meta-Analysis of Standardized Mean Differences",
            "Meta-Analysis of Hazard Ratios",
        ],
    },
    {
        "slug": "cluster-analysis",
        "title": "Cluster Analysis",
        "summary": "Group observations into natural structure using partitioning and hierarchical approaches.",
        "methods": [
            "Hierarchical Clustering",
            "K-Means Clustering",
            "Fuzzy Clustering",
            "Medoid Partitioning",
            "Regression Clustering",
            "Clustered Heat Maps",
        ],
    },
    {
        "slug": "multivariate",
        "title": "Multivariate and Dimension Reduction",
        "summary": "Handle multiple outcomes or high-dimensional variables through projection and structure-finding methods.",
        "methods": [
            "Factor Analysis",
            "Principal Components Analysis",
            "Discriminant Analysis",
            "Hotelling's T-Squared",
            "Correspondence Analysis",
            "Multidimensional Scaling",
            "Equality of Covariance Tests",
            "Canonical Correlation",
        ],
    },
    {
        "slug": "nonparametric",
        "title": "Nonparametric Methods",
        "summary": "Use rank-based and distribution-free tools when classical assumptions are not appropriate.",
        "methods": [
            "Kruskal-Wallis Test",
            "Mann-Whitney U Test",
            "Wilcoxon Rank-Sum Test",
            "Wilcoxon Signed-Rank Test",
            "McNemar Test",
            "Cochran's Q Test",
            "Friedman's Rank Test",
            "Kolmogorov-Smirnov Test",
            "Dunn's Test",
            "Dwass-Steel-Critchlow-Fligner Test",
            "Sign Test",
            "Quantile Test",
            "Runs Test",
        ],
    },
    {
        "slug": "distribution-fitting",
        "title": "Distribution Fitting",
        "summary": "Fit theoretical distributions and compare observed data against probability models.",
        "methods": [
            "Beta Distribution Fitting",
            "Weibull Distribution Fitting",
            "Gamma Distribution Fitting",
            "Probability Plots",
            "Probability Plot Comparison",
        ],
    },
    {
        "slug": "doe",
        "title": "Design of Experiments",
        "summary": "Build efficient experimental plans, randomization schemes, and structured design matrices.",
        "methods": [
            "Randomization Lists",
            "Balanced Incomplete Block Designs",
            "Fractional Factorial Designs",
            "Latin Square Designs",
            "Response Surface Designs",
            "Screening Designs",
            "Taguchi Designs",
            "Two-Level Designs",
            "D-Optimal Designs",
            "Design Generator",
        ],
    },
    {
        "slug": "quality-control",
        "title": "Quality Control and Process Monitoring",
        "summary": "Monitor process stability and manufacturing or lab quality with control charts and capability tools.",
        "methods": [
            "X-bar and R Charts",
            "X-bar and s Charts",
            "CUSUM Charts",
            "EWMA Charts",
            "Moving Average Charts",
            "Individuals and Moving Range Charts",
            "Levey-Jennings Charts",
            "P Charts",
            "NP Charts",
            "C Charts",
            "U Charts",
            "Process Capability Analysis",
            "Pareto Charts",
            "Gauge R&R Studies",
            "Acceptance Sampling",
        ],
    },
    {
        "slug": "time-series",
        "title": "Time Series and Forecasting",
        "summary": "Analyze serial dependence and produce forecasts from temporal data.",
        "methods": [
            "ARIMA",
            "Automatic ARMA",
            "Theoretical ARMA",
            "Autocorrelations",
            "Cross-Correlations",
            "Spectral Analysis",
            "Decomposition Forecasting",
            "Exponential Smoothing",
            "Harmonic Regression",
            "Analysis of Runs",
        ],
    },
    {
        "slug": "reference-intervals",
        "title": "Reference Intervals and Tolerance",
        "summary": "Estimate ranges for healthy values or expected coverage in applied data settings.",
        "methods": [
            "Reference Intervals",
            "Age-Specific Reference Intervals",
            "Robust Linear Regression for Reference Intervals",
            "Tolerance Intervals",
        ],
    },
    {
        "slug": "item-survey",
        "title": "Item and Survey Analysis",
        "summary": "Evaluate questionnaires, item performance, and structured survey summaries.",
        "methods": [
            "Item Analysis",
            "Item Response Analysis",
            "Survey Crosstabs",
            "Survey Frequency Tables",
            "Cluster Randomization Tools",
        ],
    },
    {
        "slug": "nondetects",
        "title": "Nondetects Data",
        "summary": "Work with censored or below-detection-limit outcomes in comparisons and regression.",
        "methods": [
            "Nondetects-Data Group Comparison",
            "Nondetects-Data Regression",
        ],
    },
    {
        "slug": "operations-research",
        "title": "Operations Research",
        "summary": "Optimize allocation, routing, and constrained decision problems.",
        "methods": [
            "Linear Programming",
            "Mixed Integer Programming",
            "Quadratic Programming",
            "Assignment",
            "Maximum Flow",
            "Minimum Cost Capacitated Flow",
            "Minimum Spanning Tree",
            "Shortest Route",
            "Transportation",
            "Transshipment",
        ],
    },
]

GROUP_WINDOW_COPY = {
    "anova-mean-comparison": "This family is useful when the main research question is about differences in averages across treatment groups, follow-up visits, or structured study designs. It is often the next step after descriptive statistics when you want to move from describing data to formally comparing groups.",
    "descriptive-statistics": "These methods help you understand the shape, center, spread, and quality of your dataset before making bigger analytical decisions. They are often the starting point for any good clinical or public-health analysis.",
    "probability-proportions": "These tools are helpful when the outcome is a chance, rate, or proportion rather than a continuous measurement. They are especially common in screening studies, prevalence work, and binary clinical outcomes.",
    "t-tests": "Use this family when the question is centered on one average or the difference between two averages. These methods are often chosen in small-to-medium clinical studies with straightforward comparison goals.",
    "regression": "Regression methods are used when you want to explain, predict, or adjust an outcome using one or more predictors. They become especially valuable when several patient or treatment factors matter at the same time.",
    "correlation-agreement": "This group is designed for questions about association, consistency, and whether two measures or methods tell a similar story. It is helpful for validation work, instrument comparison, and reproducibility checks.",
    "diagnostic-roc": "These methods help you judge how well a test separates disease from non-disease and how different cutoffs change performance. They are essential when evaluating screening tools and diagnostic workflows.",
    "survival-analysis": "This family focuses on time-to-event questions, such as how long a restoration lasts or when failure happens. It is useful whenever both timing and event occurrence matter together.",
    "meta-analysis": "Meta-analysis methods combine evidence from multiple studies into one broader estimate. They are helpful when you want a stronger summary than any single paper can provide.",
    "cluster-analysis": "These methods look for natural groupings in data without starting from a preset outcome variable. They are often used to discover patient profiles, behavior patterns, or hidden structure in complex datasets.",
    "multivariate": "This family is useful when you need to study many variables together, reduce complexity, or understand how measurements move as a set. It can help uncover structure that is not obvious from one variable at a time.",
    "nonparametric": "These methods are useful when the usual assumptions behind parametric tests are weak, questionable, or clearly violated. They often rely on ranks or order rather than raw numerical values.",
    "distribution-fitting": "Use this group when the question is about which probability model best represents your data or whether observed values follow an expected distribution. It is often part of model checking and reliability work.",
    "doe": "Design-of-experiments methods help plan studies so that you learn efficiently from the data you collect. They are especially valuable when resources are limited and study structure matters.",
    "quality-control": "These tools are built for monitoring consistency, process stability, and operational quality over time. They fit well in laboratory workflows, manufacturing studies, and clinic process improvement.",
    "time-series": "This family is helpful when observations arrive in time order and nearby measurements influence one another. It is commonly used for forecasting, tracking trends, and understanding serial patterns.",
    "reference-intervals": "These methods estimate expected ranges or coverage intervals that are meaningful in applied measurement settings. They are often useful in laboratory, biomarker, and quality-assurance contexts.",
    "item-survey": "This group supports questionnaires, surveys, and item-level assessment tools by showing how well items behave individually and together. It is especially relevant for patient-reported outcomes and educational instruments.",
    "nondetects": "These methods are used when part of the data falls below a detection limit rather than being fully observed. They help prevent bias when low values are censored or only partly known.",
    "operations-research": "Operations-research methods focus on optimization, routing, allocation, and decision-making under constraints. They are useful when the goal is to improve systems rather than compare patient outcomes directly.",
}

GROUP_METHOD_PURPOSE = {
    "anova-mean-comparison": "compare averages across treatments, visits, or study arms",
    "descriptive-statistics": "describe the dataset clearly before deeper analysis",
    "probability-proportions": "work with chances, proportions, and yes-or-no outcomes",
    "t-tests": "compare one mean or two means in a focused way",
    "regression": "study how predictors relate to an outcome",
    "correlation-agreement": "check whether measures move together or agree well",
    "diagnostic-roc": "evaluate how well a test classifies patients",
    "survival-analysis": "study when an event happens over follow-up time",
    "meta-analysis": "combine evidence from several studies",
    "cluster-analysis": "find hidden groupings within a dataset",
    "multivariate": "analyze several related variables together",
    "nonparametric": "answer a question without leaning heavily on strict distribution assumptions",
    "distribution-fitting": "match observed data to an underlying probability model",
    "doe": "plan or study efficient experimental designs",
    "quality-control": "monitor whether a process stays stable and reliable",
    "time-series": "analyze values that evolve over time",
    "reference-intervals": "estimate meaningful expected ranges",
    "item-survey": "evaluate survey items and questionnaire structure",
    "nondetects": "work carefully with values below detection limits",
    "operations-research": "optimize flow, allocation, or routing decisions",
}


METHOD_DETAILS = {
    "One-Way ANOVA": {
        "theory": "Tests whether the average value differs across three or more independent groups.",
        "example": "Compare mean plaque scores across patients using manual, sonic, and powered toothbrushes.",
    },
    "ANCOVA": {
        "theory": "Compares group means while adjusting for a continuous covariate that may influence the outcome.",
        "example": "Compare postoperative pain between treatment groups after adjusting for baseline pain score.",
    },
    "General Linear Models (GLM)": {
        "theory": "Provides a flexible framework for modeling continuous outcomes with multiple predictors and group effects.",
        "example": "Model probing depth using smoking status, age, treatment group, and oral hygiene score together.",
    },
    "Repeated Measures ANOVA": {
        "theory": "Evaluates mean changes when the same subjects are measured at multiple time points.",
        "example": "Track gingival index before treatment, at one month, and at three months in the same patients.",
    },
    "Mixed-Model Repeated Measures": {
        "theory": "Extends repeated-measures analysis by allowing subject-level random effects and incomplete follow-up.",
        "example": "Analyze implant stability scores over follow-up visits even when some patients miss appointments.",
    },
    "MANOVA": {
        "theory": "Tests group differences across several related outcomes at the same time.",
        "example": "Compare plaque score, bleeding index, and probing depth together across treatment arms.",
    },
    "MANCOVA": {
        "theory": "Extends MANOVA by adjusting several related outcomes for one or more covariates.",
        "example": "Compare multiple periodontal outcomes across groups while adjusting for age and baseline severity.",
    },
    "Balanced Design Analysis": {
        "theory": "Analyzes experiments where observations are evenly distributed across treatment combinations.",
        "example": "Study material type and polishing technique when each combination has the same number of tooth samples.",
    },
    "Latin Square ANOVA": {
        "theory": "Controls for two nuisance sources of variation while testing one main treatment factor.",
        "example": "Compare disinfectants while controlling for clinic room and operator differences in a laboratory rotation.",
    },
    "Crossover ANOVA": {
        "theory": "Analyzes studies in which participants receive multiple treatments in a planned sequence.",
        "example": "Compare two mouthrinses in the same participants when each rinse is used in different study periods.",
    },
    "Multiple Comparisons and Contrasts": {
        "theory": "Identifies which specific group differences explain an overall ANOVA finding.",
        "example": "After finding a difference among restorative materials, test which pairs actually differ in wear.",
    },
    "Area Under the Curve Analysis": {
        "theory": "Summarizes repeated measurements over time into a single total exposure or response value.",
        "example": "Summarize postoperative pain ratings across a week into one overall pain burden score.",
    },
    "Box-Cox Transformation": {
        "theory": "Finds a power transformation that can make skewed data closer to normal for modeling.",
        "example": "Transform highly skewed bacterial count data before comparing treatment groups.",
    },
    "Descriptive Statistics": {
        "theory": "Summarizes the center, spread, and range of a dataset using values such as mean and standard deviation.",
        "example": "Describe DMFT scores in a school survey using mean, median, standard deviation, and range.",
    },
    "Summary Tables": {
        "theory": "Presents key summary measures for variables in a compact table for quick interpretation.",
        "example": "Create one table showing age, DMFT score, probing depth, and plaque index for all study participants.",
    },
    "Summary Lists": {
        "theory": "Lists selected statistics in a straightforward report-style format instead of a full table.",
        "example": "Generate a short clinic report with mean implant survival time and median follow-up duration.",
    },
    "Frequency Tables": {
        "theory": "Counts how often each category or value occurs in a dataset.",
        "example": "Count how many patients fall into each caries-risk category: low, medium, or high.",
    },
    "Data Screening": {
        "theory": "Checks data for missing values, unusual values, coding problems, and assumption issues before analysis.",
        "example": "Review a periodontal dataset for impossible ages, missing probing depths, and duplicate patient IDs.",
    },
    "Data Simulation": {
        "theory": "Creates artificial data from a chosen model to explore how an analysis behaves under known conditions.",
        "example": "Simulate implant success outcomes to see how sample size affects confidence interval width.",
    },
    "Normality Tests": {
        "theory": "Assesses whether a variable follows a roughly normal distribution.",
        "example": "Test whether salivary biomarker levels are normal before choosing a t-test or nonparametric alternative.",
    },
    "Outlier Detection (Grubbs)": {
        "theory": "Looks for unusually extreme values that may not fit the rest of the sample.",
        "example": "Detect one abnormally high pocket-depth value that may reflect a recording error.",
    },
    "Tolerance Intervals": {
        "theory": "Estimates an interval that should contain a specified proportion of the population.",
        "example": "Find a range expected to cover most enamel hardness values in a manufacturing study.",
    },
    "Circular Data Analysis": {
        "theory": "Analyzes measurements that wrap around a circle, such as angles or directions.",
        "example": "Study preferred angulation directions for implant placement measured in degrees.",
    },
    "One Proportion": {
        "theory": "Estimates or tests a single population proportion.",
        "example": "Estimate the proportion of children with untreated caries in one district.",
    },
    "Two Proportions": {
        "theory": "Compares proportions between two independent groups.",
        "example": "Compare implant success rates between smokers and non-smokers.",
    },
    "Two Correlated Proportions": {
        "theory": "Compares paired yes-or-no outcomes measured on the same subjects or matched units.",
        "example": "Compare pre- and post-intervention plaque presence in the same patients.",
    },
    "Contingency Tables": {
        "theory": "Summarizes the relationship between two categorical variables in a cross-tabulation.",
        "example": "Cross-tabulate restoration type by postoperative sensitivity outcome.",
    },
    "Cochran's Q Test": {
        "theory": "Tests whether three or more related binary treatments or conditions have equal response rates.",
        "example": "Compare the presence of plaque after three oral hygiene methods tested on the same participants.",
    },
    "Mantel-Haenszel Test": {
        "theory": "Combines stratified two-by-two tables to estimate an adjusted association.",
        "example": "Estimate the association between sugar exposure and caries after stratifying by age group.",
    },
    "Loglinear Models": {
        "theory": "Models counts in multiway contingency tables to study associations among categorical variables.",
        "example": "Model the joint relationship between clinic site, treatment type, and healing outcome.",
    },
    "Exact Binomial Procedures": {
        "theory": "Uses exact probability calculations for binary outcomes, especially with small samples.",
        "example": "Estimate the success rate of a new sealant from a small pilot group without relying on large-sample approximations.",
    },
    "One-Sample T-Test": {
        "theory": "Tests whether the sample mean differs from a known or target value.",
        "example": "Check whether mean fluorosis score in one community differs from a published benchmark.",
    },
    "Paired T-Test": {
        "theory": "Compares the mean difference between paired measurements on the same subjects.",
        "example": "Compare mean pain score before and after a desensitizing treatment in the same patients.",
    },
    "Two-Sample T-Test": {
        "theory": "Compares means between two independent groups.",
        "example": "Compare mean healing time between two suturing techniques.",
    },
    "Equivalence T-Tests": {
        "theory": "Tests whether two means are close enough to be considered practically equivalent.",
        "example": "Show that two impression materials produce equivalent average fit within a preset clinical margin.",
    },
    "Non-Inferiority T-Tests": {
        "theory": "Tests whether a new treatment is not worse than a standard by more than an acceptable margin.",
        "example": "Show that a shorter polishing protocol is not meaningfully worse than the standard protocol.",
    },
    "Superiority by Margin T-Tests": {
        "theory": "Tests whether a new treatment exceeds a control by at least a clinically meaningful margin.",
        "example": "Show that a whitening system improves shade score more than control by a preset minimum difference.",
    },
    "2x2 Cross-Over T-Tests": {
        "theory": "Analyzes paired crossover studies with two treatments and two periods.",
        "example": "Compare two chewing gums on salivary flow in a two-period crossover dental study.",
    },
    "Confidence Intervals for Means": {
        "theory": "Estimates a plausible range for the true population mean.",
        "example": "Report the confidence interval for mean probing depth in a periodontal survey.",
    },
    "Simple Linear Regression": {
        "theory": "Models how one continuous predictor relates to one continuous outcome.",
        "example": "Relate daily sugar intake to DMFT score using a straight-line model.",
    },
    "Multiple Linear Regression": {
        "theory": "Models a continuous outcome using several predictors at the same time.",
        "example": "Predict plaque score from brushing frequency, age, smoking, and orthodontic status.",
    },
    "Logistic Regression": {
        "theory": "Models the probability of a binary outcome using one or more predictors.",
        "example": "Predict implant failure versus success from smoking, diabetes, and bone quality.",
    },
    "Conditional Logistic Regression": {
        "theory": "Handles matched or stratified binary outcome data where comparisons happen within sets.",
        "example": "Analyze matched case-control data comparing patients with and without oral cancer lesions.",
    },
    "Cox Regression": {
        "theory": "Models how predictors affect the hazard, or instantaneous risk, of a time-to-event outcome.",
        "example": "Assess how smoking changes the hazard of implant failure over follow-up time.",
    },
    "Poisson Regression": {
        "theory": "Models count outcomes, especially when the outcome is the number of events in a time or exposure window.",
        "example": "Model the number of new carious lesions per child over one school year.",
    },
    "Negative Binomial Regression": {
        "theory": "Models count outcomes when variability is larger than a Poisson model can handle.",
        "example": "Model the number of bleeding sites when patient counts vary more than expected under Poisson assumptions.",
    },
    "Zero-Inflated Poisson Regression": {
        "theory": "Models count data with many zeros by combining a zero process with a Poisson count process.",
        "example": "Study the number of decayed teeth when many children have zero lesions but some have several.",
    },
    "Zero-Inflated Negative Binomial Regression": {
        "theory": "Handles overdispersed count data with excess zeros by mixing a zero model and a negative binomial model.",
        "example": "Model lesion counts in a preventive program where most patients have no lesions but a small group has many.",
    },
    "Geometric Regression": {
        "theory": "Models counts or waiting-type outcomes under a geometric distribution framework.",
        "example": "Study the number of visits until a patient first achieves plaque control.",
    },
    "Ridge Regression": {
        "theory": "Shrinks regression coefficients to reduce instability when predictors are highly correlated.",
        "example": "Model periodontal severity using many overlapping inflammatory markers without overfitting.",
    },
    "Robust Regression": {
        "theory": "Fits a regression line that is less sensitive to outliers or influential observations.",
        "example": "Relate age to attachment loss when a few extreme patients would otherwise distort the fit.",
    },
    "Principal Components Regression": {
        "theory": "Reduces correlated predictors into components before using them in regression.",
        "example": "Compress many oral-health behavior variables into components before predicting caries risk.",
    },
    "Response Surface Regression": {
        "theory": "Models curved relationships between several inputs and one response, often in optimization studies.",
        "example": "Optimize laser power and exposure time to maximize bond strength while limiting enamel damage.",
    },
    "Nonlinear Regression": {
        "theory": "Fits relationships that do not follow a straight-line form.",
        "example": "Model dose-response behavior of a fluoride varnish when the effect curve bends.",
    },
    "Harmonic Regression": {
        "theory": "Models cyclic or seasonal patterns using sine and cosine terms.",
        "example": "Track seasonal patterns in emergency dental visits across the calendar year.",
    },
    "Two-Stage Least Squares": {
        "theory": "Estimates causal-type relationships when a predictor may be endogenous and an instrument is available.",
        "example": "Estimate the effect of dental visit frequency on outcomes using distance to clinic as an instrument.",
    },
    "Mediation Analysis": {
        "theory": "Tests whether part of an effect works through an intermediate variable.",
        "example": "Assess whether oral-health education improves DMFT partly through better brushing frequency.",
    },
    "Pearson Correlation": {
        "theory": "Measures the strength and direction of a linear relationship between two continuous variables.",
        "example": "Measure correlation between plaque index and gingival bleeding score.",
    },
    "Spearman Correlation": {
        "theory": "Measures monotonic association using ranked values rather than raw scores.",
        "example": "Relate ranked oral hygiene habits to ranked disease severity when data are not normal.",
    },
    "Kendall's Tau": {
        "theory": "Measures rank association based on concordant and discordant pairs.",
        "example": "Assess agreement between two ranked orthodontic severity scales.",
    },
    "Correlation Matrix": {
        "theory": "Displays pairwise correlations across many variables in one table.",
        "example": "Review correlations among DMFT, plaque, bleeding, probing depth, and age before modeling.",
    },
    "Point-Biserial Correlation": {
        "theory": "Measures association between one continuous variable and one true binary variable.",
        "example": "Relate probing depth to smoker versus non-smoker status.",
    },
    "Biserial Correlation": {
        "theory": "Estimates association when one variable is artificially dichotomized from an underlying continuum.",
        "example": "Relate a continuous biomarker to a thresholded caries-risk classification.",
    },
    "Canonical Correlation": {
        "theory": "Studies association between two sets of variables rather than just one pair.",
        "example": "Relate a set of oral hygiene behaviors to a set of periodontal outcome measures.",
    },
    "Lin's Concordance Correlation": {
        "theory": "Measures how well two continuous measurements agree, not just how strongly they correlate.",
        "example": "Compare digital and manual caliper readings for tooth dimensions.",
    },
    "Bland-Altman Analysis": {
        "theory": "Assesses agreement between two measurement methods by looking at differences against averages.",
        "example": "Compare pocket-depth measurements taken by two periodontal probes.",
    },
    "Deming Regression": {
        "theory": "Fits a method-comparison line when both measurement methods have error.",
        "example": "Compare salivary biomarker concentration from two laboratory platforms.",
    },
    "Passing-Bablok Regression": {
        "theory": "A robust nonparametric method-comparison regression less sensitive to outliers and distribution assumptions.",
        "example": "Compare two devices for measuring enamel thickness in a calibration study.",
    },
    "Binary Diagnostic Tests": {
        "theory": "Calculates sensitivity, specificity, predictive values, and related accuracy measures for a diagnostic test.",
        "example": "Evaluate how well a caries screening tool identifies disease compared with the gold standard.",
    },
    "One ROC Curve and Cutoff Analysis": {
        "theory": "Uses one ROC curve to assess discrimination and choose a threshold for a continuous marker.",
        "example": "Find the best salivary biomarker cutoff for detecting active periodontal disease.",
    },
    "Comparing Two ROC Curves": {
        "theory": "Tests whether one diagnostic model or marker has better discrimination than another.",
        "example": "Compare ROC curves for two risk scores used to predict implant failure.",
    },
    "ROC Curves": {
        "theory": "Shows the tradeoff between sensitivity and false-positive rate across all possible thresholds.",
        "example": "Visualize how different plaque-score cutoffs classify high caries risk.",
    },
    "Cutpoint Optimization": {
        "theory": "Searches for the threshold that best balances diagnostic goals such as sensitivity and specificity.",
        "example": "Choose the most useful bleeding-index cutoff for screening periodontal inflammation.",
    },
    "Kaplan-Meier Curves": {
        "theory": "Estimates survival probability over time when follow-up lengths differ across subjects.",
        "example": "Plot implant survival over five years after placement.",
    },
    "Life-Table Analysis": {
        "theory": "Summarizes survival experience in grouped time intervals rather than exact event times.",
        "example": "Report denture retention failure rates by yearly follow-up intervals.",
    },
    "Cumulative Incidence": {
        "theory": "Estimates the proportion of subjects who experience an event over time in the presence of competing risks or follow-up structure.",
        "example": "Estimate the cumulative incidence of peri-implantitis during long-term follow-up.",
    },
    "Weibull Survival Regression": {
        "theory": "Fits a parametric survival model when event times follow a Weibull-type pattern.",
        "example": "Model time until orthodontic appliance failure when hazard may rise or fall over time.",
    },
    "Survival Non-Inferiority Tests": {
        "theory": "Tests whether a new treatment's survival profile is not worse than standard by more than a margin.",
        "example": "Check whether a lower-cost implant system has non-inferior survival compared with the standard system.",
    },
    "Survival Superiority Tests": {
        "theory": "Tests whether one survival curve is better than another by a clinically meaningful amount.",
        "example": "Show that one periodontal maintenance protocol leads to better long-term tooth retention.",
    },
    "Survival Equivalence Tests": {
        "theory": "Assesses whether two survival experiences are practically similar within prespecified bounds.",
        "example": "Show that two implant-abutment designs have equivalent long-term survival performance.",
    },
    "Hazard-Rate Group-Sequential Analysis": {
        "theory": "Supports interim monitoring of time-to-event studies while controlling error across repeated looks.",
        "example": "Monitor an ongoing implant study with planned interim safety reviews.",
    },
    "Meta-Analysis of Two Proportions": {
        "theory": "Pools event rates or prevalences from several studies into an overall estimate.",
        "example": "Combine caries prevalence estimates from multiple school-based surveys.",
    },
    "Meta-Analysis of Correlated Proportions": {
        "theory": "Pools paired proportion outcomes across studies where responses are linked within subjects.",
        "example": "Combine before-and-after mucositis proportions reported in similar intervention studies.",
    },
    "Meta-Analysis of Two Means": {
        "theory": "Combines mean differences from multiple studies measuring the same continuous outcome.",
        "example": "Pool mean probing-depth reductions from several periodontal therapy trials.",
    },
    "Meta-Analysis of Standardized Mean Differences": {
        "theory": "Combines study effects when outcomes are measured on different scales by standardizing them.",
        "example": "Pool pain-reduction effects from studies using different postoperative pain scales.",
    },
    "Meta-Analysis of Hazard Ratios": {
        "theory": "Combines time-to-event effect estimates from multiple survival studies.",
        "example": "Pool hazard ratios for implant loss comparing smokers and non-smokers across studies.",
    },
    "Hierarchical Clustering": {
        "theory": "Builds a tree of clusters by progressively joining similar observations or variables.",
        "example": "Group patients into natural oral-health profiles using plaque, bleeding, and DMFT measures.",
    },
    "K-Means Clustering": {
        "theory": "Partitions observations into a chosen number of clusters based on distance to cluster centers.",
        "example": "Segment patients into low, moderate, and high caries-risk clusters from multiple variables.",
    },
    "Fuzzy Clustering": {
        "theory": "Allows one observation to belong partly to more than one cluster rather than forcing a hard assignment.",
        "example": "Classify borderline periodontal cases that show features of both mild and moderate clusters.",
    },
    "Medoid Partitioning": {
        "theory": "Clusters observations around actual representative cases instead of mathematical centroids.",
        "example": "Find representative patient profiles for common combinations of oral disease markers.",
    },
    "Regression Clustering": {
        "theory": "Clusters observations based on how their regression relationships differ.",
        "example": "Identify patient subgroups where age and hygiene affect DMFT in different ways.",
    },
    "Clustered Heat Maps": {
        "theory": "Displays a heat map while clustering rows and columns to reveal structure patterns.",
        "example": "Visualize biomarker patterns across patients and simultaneously cluster similar profiles.",
    },
    "Factor Analysis": {
        "theory": "Finds hidden latent factors that explain correlations among many observed variables.",
        "example": "Reduce multiple oral-health questionnaire items into underlying constructs such as hygiene and anxiety.",
    },
    "Principal Components Analysis": {
        "theory": "Condenses many correlated variables into a smaller set of components that capture most variation.",
        "example": "Reduce several periodontal measurements into a few overall disease dimensions.",
    },
    "Discriminant Analysis": {
        "theory": "Builds functions that separate predefined groups based on measured variables.",
        "example": "Classify patients into disease stages using clinical and radiographic predictors.",
    },
    "Hotelling's T-Squared": {
        "theory": "Compares multivariate mean vectors between groups or against a target profile.",
        "example": "Compare the overall biomarker profile of periodontitis patients versus healthy controls.",
    },
    "Correspondence Analysis": {
        "theory": "Maps relationships among categories in a contingency table into a low-dimensional display.",
        "example": "Visualize how caries severity categories relate to diet-pattern categories.",
    },
    "Multidimensional Scaling": {
        "theory": "Places observations in a low-dimensional space so distances reflect dissimilarity.",
        "example": "Map perceived similarity among dental material properties from expert ratings.",
    },
    "Equality of Covariance Tests": {
        "theory": "Checks whether groups have similar covariance structures across several variables.",
        "example": "Test whether treatment groups have similar joint variability in plaque, bleeding, and pocket depth.",
    },
    "Kruskal-Wallis Test": {
        "theory": "Compares three or more groups using ranked data when ANOVA assumptions are weak.",
        "example": "Compare ranked pain scores across three extraction techniques.",
    },
    "Mann-Whitney U Test": {
        "theory": "Compares two independent groups using ranks rather than raw values.",
        "example": "Compare plaque scores between two mouthwash groups when the data are skewed.",
    },
    "Wilcoxon Rank-Sum Test": {
        "theory": "A rank-based alternative to the two-sample t-test for independent groups.",
        "example": "Compare healing scores between two surgical materials when the sample is small and non-normal.",
    },
    "Wilcoxon Signed-Rank Test": {
        "theory": "A rank-based alternative to the paired t-test for matched or repeated data.",
        "example": "Compare pre- and post-treatment sensitivity scores in the same patients.",
    },
    "McNemar Test": {
        "theory": "Tests paired binary data for a change in response before versus after an intervention.",
        "example": "Check whether the proportion of plaque-positive patients changes after oral-hygiene counseling.",
    },
    "Friedman's Rank Test": {
        "theory": "Compares three or more repeated conditions using ranks.",
        "example": "Compare comfort ratings for three denture-cleaning products tested by the same participants.",
    },
    "Kolmogorov-Smirnov Test": {
        "theory": "Compares a sample distribution with a reference distribution or compares two distributions directly.",
        "example": "Check whether enamel roughness measurements follow the expected model distribution.",
    },
    "Dunn's Test": {
        "theory": "Performs pairwise rank-based comparisons after a significant Kruskal-Wallis result.",
        "example": "Identify which periodontal treatment groups differ after an overall nonparametric group test.",
    },
    "Dwass-Steel-Critchlow-Fligner Test": {
        "theory": "Provides nonparametric pairwise multiple comparisons among several groups.",
        "example": "Compare all pairs of restorative materials using ranked wear outcomes.",
    },
    "Sign Test": {
        "theory": "Tests whether paired differences tend to go mostly in one direction without using their size.",
        "example": "Check whether more patients improve than worsen after a preventive intervention.",
    },
    "Quantile Test": {
        "theory": "Tests hypotheses about medians or other quantiles rather than means.",
        "example": "Compare the median number of decayed teeth between two communities.",
    },
    "Runs Test": {
        "theory": "Assesses whether the order of observations appears random or shows a pattern.",
        "example": "Check whether equipment calibration errors occur randomly across successive patient measurements.",
    },
    "Beta Distribution Fitting": {
        "theory": "Fits a beta distribution to proportions or rates bounded between zero and one.",
        "example": "Model site-level bleeding proportions recorded for patients at a periodontal visit.",
    },
    "Weibull Distribution Fitting": {
        "theory": "Fits a Weibull model to lifetimes or failure times.",
        "example": "Model time until bracket bond failure under routine use.",
    },
    "Gamma Distribution Fitting": {
        "theory": "Fits a gamma model to positive, right-skewed measurements.",
        "example": "Model treatment duration when procedure times are positive and skewed.",
    },
    "Probability Plots": {
        "theory": "Checks whether data follow a chosen theoretical distribution using a diagnostic plot.",
        "example": "Inspect whether implant follow-up times look compatible with a Weibull distribution.",
    },
    "Probability Plot Comparison": {
        "theory": "Compares how well different candidate distributions fit the same data.",
        "example": "Compare gamma versus lognormal fit for procedure-time data.",
    },
    "Randomization Lists": {
        "theory": "Creates random treatment assignment schedules for controlled studies.",
        "example": "Generate random group assignments for a fluoride-varnish clinical trial.",
    },
    "Balanced Incomplete Block Designs": {
        "theory": "Assigns treatments efficiently when not every block can receive every treatment.",
        "example": "Evaluate many dental materials when each operator can only test a subset in one session.",
    },
    "Fractional Factorial Designs": {
        "theory": "Studies several factors with fewer runs than a full factorial design.",
        "example": "Screen multiple polishing variables without testing every possible combination.",
    },
    "Latin Square Designs": {
        "theory": "Controls for two nuisance factors while testing treatments in an efficient square layout.",
        "example": "Control for operator and day effects while comparing four etching protocols.",
    },
    "Response Surface Designs": {
        "theory": "Designs experiments for estimating curved response surfaces and optimization targets.",
        "example": "Optimize curing time and light intensity for resin bond strength.",
    },
    "Screening Designs": {
        "theory": "Quickly identifies which factors matter most among many possible inputs.",
        "example": "Screen several formulation ingredients to find which ones affect varnish retention.",
    },
    "Taguchi Designs": {
        "theory": "Uses robust design principles to find settings that perform well under noise or variation.",
        "example": "Find orthodontic bonding settings that stay reliable across small environmental changes.",
    },
    "Two-Level Designs": {
        "theory": "Studies factors at low and high settings to estimate main effects and interactions.",
        "example": "Test low versus high etch time and low versus high curing power in a bonding experiment.",
    },
    "D-Optimal Designs": {
        "theory": "Selects the most informative experimental runs when standard factorial layouts are impractical.",
        "example": "Build an efficient material-testing plan when some treatment combinations cannot be used together.",
    },
    "Design Generator": {
        "theory": "Creates experimental design matrices tailored to the chosen design family and factor structure.",
        "example": "Generate the run sheet for a laboratory study of sealant formulation factors.",
    },
    "X-bar and R Charts": {
        "theory": "Monitors process mean and within-sample range over time using subgrouped data.",
        "example": "Track daily batch consistency of fluoride concentration from repeated subgroup samples.",
    },
    "X-bar and s Charts": {
        "theory": "Monitors process mean and within-sample standard deviation over time.",
        "example": "Track average and variability of bracket width measurements from production subgroups.",
    },
    "CUSUM Charts": {
        "theory": "Accumulates small shifts over time to detect gradual process drift earlier than standard charts.",
        "example": "Detect a slow calibration drift in radiographic density measurements.",
    },
    "EWMA Charts": {
        "theory": "Uses weighted moving averages to detect small process shifts while smoothing noise.",
        "example": "Monitor gradual changes in the average strength of bonding material lots.",
    },
    "Moving Average Charts": {
        "theory": "Tracks the average of recent observations to reveal smoother process trends over time.",
        "example": "Monitor the rolling average of weekly procedure times in a dental surgery unit.",
    },
    "Individuals and Moving Range Charts": {
        "theory": "Monitors one observation at a time when subgroup sampling is not available.",
        "example": "Track one daily sterilization-cycle duration when only one reading is recorded each day.",
    },
    "Levey-Jennings Charts": {
        "theory": "Plots quality-control measurements against control limits, commonly in laboratory monitoring.",
        "example": "Monitor daily salivary-assay control samples in a dental research lab.",
    },
    "P Charts": {
        "theory": "Tracks the proportion of defective or positive outcomes over time.",
        "example": "Monitor the proportion of incomplete sterilization checks each week.",
    },
    "NP Charts": {
        "theory": "Tracks the count of defective items when subgroup sizes stay constant.",
        "example": "Track the number of failed instrument packs per inspection batch.",
    },
    "C Charts": {
        "theory": "Tracks the count of defects per inspection unit when the area of opportunity is constant.",
        "example": "Count the number of visible voids in each radiographic film sample.",
    },
    "U Charts": {
        "theory": "Tracks defect counts per unit when the size of the inspection unit varies.",
        "example": "Monitor charting errors per patient record when record length differs.",
    },
    "Process Capability Analysis": {
        "theory": "Assesses whether a stable process fits within engineering or clinical specification limits.",
        "example": "Check whether fabricated aligner thickness consistently stays within tolerance.",
    },
    "Pareto Charts": {
        "theory": "Ranks problem categories from most common to least common to focus improvement efforts.",
        "example": "Rank the main reasons for appointment delays in a dental clinic.",
    },
    "Gauge R&R Studies": {
        "theory": "Measures how much of observed variability comes from the measurement system itself.",
        "example": "Assess whether different clinicians measure periodontal pocket depth consistently.",
    },
    "Acceptance Sampling": {
        "theory": "Provides rules for accepting or rejecting a batch based on a sample inspection.",
        "example": "Inspect a sample of disposable probes from a shipment before accepting the lot.",
    },
    "ARIMA": {
        "theory": "Models time-series data using autoregressive, differencing, and moving-average components.",
        "example": "Forecast monthly emergency dental visits from past clinic counts.",
    },
    "Automatic ARMA": {
        "theory": "Automatically searches autoregressive and moving-average models to fit a time series.",
        "example": "Find a suitable forecasting model for monthly restorative procedure demand.",
    },
    "Theoretical ARMA": {
        "theory": "Explores or fits autoregressive-moving-average structures under specified assumptions.",
        "example": "Study the dependence structure in weekly orthodontic appointment volume.",
    },
    "Autocorrelations": {
        "theory": "Measures how strongly a time series relates to its own past values at different lags.",
        "example": "Check whether weekly no-show rates resemble the rates from previous weeks.",
    },
    "Cross-Correlations": {
        "theory": "Measures whether one time series is associated with lagged values of another series.",
        "example": "Check whether advertising activity is followed by a later rise in implant consultations.",
    },
    "Spectral Analysis": {
        "theory": "Studies cyclic patterns in a time series by decomposing variation into frequency components.",
        "example": "Look for seasonal cycles in emergency endodontic visits across several years.",
    },
    "Decomposition Forecasting": {
        "theory": "Separates trend, seasonality, and residual variation before forecasting forward.",
        "example": "Forecast demand for hygiene appointments while accounting for seasonal patterns.",
    },
    "Exponential Smoothing": {
        "theory": "Forecasts future values by weighting recent observations more strongly than older ones.",
        "example": "Predict near-future weekly appointment volume from recent clinic history.",
    },
    "Analysis of Runs": {
        "theory": "Evaluates whether sequences show clustering, alternation, or non-random order.",
        "example": "Check whether a series of failed sterilization tests appears randomly scattered over time.",
    },
    "Reference Intervals": {
        "theory": "Estimates the range expected for a healthy or typical population.",
        "example": "Define a reference interval for salivary flow rate in healthy adults.",
    },
    "Age-Specific Reference Intervals": {
        "theory": "Builds different reference ranges for different age groups when the outcome changes with age.",
        "example": "Create age-specific reference intervals for eruption timing in pediatric dental patients.",
    },
    "Robust Linear Regression for Reference Intervals": {
        "theory": "Uses robust regression to estimate reference intervals while limiting the influence of unusual values.",
        "example": "Build age-related reference bands for biomarker levels with a few extreme observations present.",
    },
    "Item Analysis": {
        "theory": "Evaluates how well questionnaire items discriminate, vary, and contribute to a total score.",
        "example": "Assess which oral-health literacy survey questions best separate strong and weak performers.",
    },
    "Item Response Analysis": {
        "theory": "Models the probability of a response as a function of a person's latent trait level.",
        "example": "Study how dental anxiety survey items behave across different underlying anxiety levels.",
    },
    "Survey Crosstabs": {
        "theory": "Produces cross-tabulations designed for survey-style data summaries.",
        "example": "Cross-tabulate brushing frequency with clinic type in a student oral-health survey.",
    },
    "Survey Frequency Tables": {
        "theory": "Summarizes response counts and percentages for survey questions.",
        "example": "Report how often patients choose each response on a satisfaction questionnaire.",
    },
    "Cluster Randomization Tools": {
        "theory": "Supports studies where randomization happens at the group or site level rather than by person.",
        "example": "Randomize whole schools to oral-health education programs instead of randomizing individual children.",
    },
    "Nondetects-Data Group Comparison": {
        "theory": "Compares groups when some measurements fall below the laboratory detection limit.",
        "example": "Compare salivary marker levels between two groups when many values are reported as below detection.",
    },
    "Nondetects-Data Regression": {
        "theory": "Models relationships involving outcomes that include values below detection limits.",
        "example": "Relate a salivary inflammatory marker to periodontal severity when many samples are censored low.",
    },
    "Linear Programming": {
        "theory": "Optimizes a linear objective subject to linear constraints.",
        "example": "Allocate chair time across services to maximize completed treatments within staffing limits.",
    },
    "Mixed Integer Programming": {
        "theory": "Optimizes decisions when some variables must be whole numbers or yes-or-no choices.",
        "example": "Schedule operators and rooms when some assignments must be all-or-none decisions.",
    },
    "Quadratic Programming": {
        "theory": "Optimizes an objective that includes squared terms under constraints.",
        "example": "Balance clinic resource allocation while penalizing large deviations from desired service targets.",
    },
    "Assignment": {
        "theory": "Finds the best one-to-one matching between tasks and resources.",
        "example": "Assign clinicians to operatories to minimize setup mismatch.",
    },
    "Maximum Flow": {
        "theory": "Finds the greatest amount that can move through a network without breaking capacity limits.",
        "example": "Model the maximum patient flow through registration, radiography, and treatment stations.",
    },
    "Minimum Cost Capacitated Flow": {
        "theory": "Moves flow through a network at minimum cost while respecting capacities.",
        "example": "Plan supply delivery routes to clinics while respecting storage and transport limits.",
    },
    "Minimum Spanning Tree": {
        "theory": "Connects all nodes in a network with the smallest total link cost.",
        "example": "Plan a least-total-distance supply route linking several outreach dental camps.",
    },
    "Shortest Route": {
        "theory": "Finds the minimum-distance or minimum-cost path between locations in a network.",
        "example": "Identify the fastest transport route for urgent dental materials between labs and clinics.",
    },
    "Transportation": {
        "theory": "Optimizes shipping from several sources to several destinations at lowest overall cost.",
        "example": "Distribute instrument packs from central sterilization to multiple clinic locations efficiently.",
    },
    "Transshipment": {
        "theory": "Extends transportation models by allowing goods to pass through intermediate nodes.",
        "example": "Route supplies from a warehouse to clinics through regional storage hubs.",
    },
}


def get_method_details(method_name):
    details = METHOD_DETAILS.get(method_name)
    if details:
        return details
    return {
        "theory": "Explains a specific statistical procedure used to summarize data, compare groups, or build an analysis model.",
        "example": f"In a dental setting, {method_name.lower()} could be used to answer a focused question about caries, implants, periodontal outcomes, or patient-reported measures.",
    }


def get_group_window_copy(group):
    return GROUP_WINDOW_COPY.get(
        group["slug"],
        f"{group['title']} collects methods that help researchers answer a shared type of statistical question in a more structured way."
    )


def build_method_window_note(method_name, group):
    purpose = GROUP_METHOD_PURPOSE.get(group["slug"], "answer a focused statistical question")

    if "Regression" in method_name:
        return f"{method_name} is a model-based method used when you want to {purpose} while accounting for one or more predictors."
    if "Test" in method_name or "Tests" in method_name:
        return f"{method_name} is a decision-focused method used when you want to {purpose} and judge whether the observed pattern is strong enough to support a conclusion."
    if "Curve" in method_name or "Curves" in method_name:
        return f"{method_name} is a visual method used when you want to {purpose} and understand performance across a range of possible thresholds or times."
    if "Analysis" in method_name:
        return f"{method_name} is an analysis approach used when you want to {purpose} in a structured and interpretable way."
    if "Intervals" in method_name or "Interval" in method_name:
        return f"{method_name} is used when you want to {purpose} and express the result as a plausible range rather than a single value."
    return f"{method_name} is a practical method used when you want to {purpose} in a clear, study-ready format."


def build_stats_method_groups():
    groups = []
    for group in STAT_METHOD_GROUPS:
        method_entries = []
        for method_name in group["methods"]:
            detail = get_method_details(method_name)
            method_entries.append(
                {
                    "name": method_name,
                    "theory": detail["theory"],
                    "example": detail["example"],
                    "window_note": build_method_window_note(method_name, group),
                }
            )
        groups.append(
            {
                **group,
                "window_intro": get_group_window_copy(group),
                "methods": method_entries,
            }
        )
    return groups
