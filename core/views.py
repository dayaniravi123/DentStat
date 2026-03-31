from django.shortcuts import render, redirect
from django.http import Http404, JsonResponse
from django.template import TemplateDoesNotExist
from django.views.decorators.http import require_http_methods
from django.views.decorators.clickjacking import xframe_options_sameorigin
from datetime import date
import json
import math
from .stats_methods import STAT_METHOD_GROUPS, build_stats_method_groups
try:
	from scipy import stats as scipy_stats
except Exception:
	scipy_stats = None


CONCEPT_GROUPS = [
	{
		'label': 'Beginner Concepts',
		'concepts': [
			{'slug': 'central-tendency', 'title': 'Measures of Central Tendency', 'description': 'Mean, median, and mode for continuous dental data like DMFT scores.'},
			{'slug': 'standard-deviation', 'title': 'Standard Deviation', 'description': 'Understand spread and variability in periodontal and implant outcomes.'},
			{'slug': 'basic-probability', 'title': 'Basic Probability', 'description': 'Build intuition for chance, events, and risk in dental research.'},
			{'slug': 'two-by-two', 'title': '2×2 Tables', 'description': 'Work with diagnostic test tables, sensitivity, specificity, and predictive values.'},
			{'slug': 'sample-size', 'title': 'Sample Size Basics', 'description': 'See why sample size matters for precision, power, and normality.'},
			{'slug': 'confidence-intervals', 'title': 'Confidence Intervals', 'description': 'Explore how precision and uncertainty appear in prevalence estimates.'},
		],
	},
	{
		'label': 'Intermediate Concepts',
		'concepts': [
			{'slug': 'hypothesis-testing', 'title': 'Hypothesis Testing', 'description': 'Understand null and alternative hypotheses with dental examples.'},
			{'slug': 'pvalues-significance', 'title': 'p-values & Significance', 'description': 'Interpret significance carefully instead of relying on cutoffs alone.'},
			{'slug': 'chi-square', 'title': 'Chi-Square Test', 'description': 'Compare categorical outcomes such as treatment group versus result.'},
			{'slug': 'risk-measures', 'title': 'Risk Measures', 'description': 'Work with relative risk, odds ratios, and effect interpretation.'},
			{'slug': 't-tests', 'title': 't-Tests', 'description': 'Compare means between dental groups or before-and-after conditions.'},
			{'slug': 'anova', 'title': 'ANOVA Basics', 'description': 'Compare more than two groups with structured variance analysis.'},
		],
	},
	{
		'label': 'Advanced Concepts',
		'concepts': [
			{'slug': 'multiple-regression', 'title': 'Multiple Regression', 'description': 'Model outcomes while controlling for multiple predictors and confounders.'},
			{'slug': 'logistic-regression', 'title': 'Logistic Regression', 'description': 'Predict binary outcomes such as implant failure or treatment success.'},
			{'slug': 'survival-analysis', 'title': 'Survival Analysis', 'description': 'Study time-to-event outcomes like implant survival over time.'},
			{'slug': 'cox-regression', 'title': 'Cox Regression', 'description': 'Interpret hazards and proportional hazards modeling in clinical studies.'},
			{'slug': 'roc-curves', 'title': 'ROC Curves', 'description': 'Evaluate diagnostic accuracy and threshold selection visually.'},
			{'slug': 'meta-analysis', 'title': 'Meta-Analysis', 'description': 'Combine evidence across studies to synthesize stronger conclusions.'},
		],
	},
]

CONCEPT_LOOKUP = {
	concept['slug']: {
		'title': concept['title'],
		'description': concept['description'],
		'group': group['label'],
	}
	for group in CONCEPT_GROUPS
	for concept in group['concepts']
}

LEARNING_SITEMAP_PAGES = [
	{'path': '/learning/descriptive/descriptive-statistics.html', 'changefreq': 'monthly', 'priority': '0.80'},
	{'path': '/learning/hypothesis/hypothesis-testing.html', 'changefreq': 'monthly', 'priority': '0.80'},
	{'path': '/learning/regression/regression-analysis.html', 'changefreq': 'monthly', 'priority': '0.80'},
]

PRIMARY_SITEMAP_PAGES = [
	{'path': '/', 'changefreq': 'weekly', 'priority': '1.0'},
	{'path': '/concepts/', 'changefreq': 'weekly', 'priority': '0.95'},
	{'path': '/stats-methods/', 'changefreq': 'monthly', 'priority': '0.86'},
	{'path': '/examples/basic-probability/', 'changefreq': 'monthly', 'priority': '0.82'},
	{'path': '/calculator/', 'changefreq': 'weekly', 'priority': '0.90'},
	{'path': '/visualization/live-graph', 'changefreq': 'weekly', 'priority': '0.90'},
	{'path': '/about/', 'changefreq': 'monthly', 'priority': '0.70'},
]


def build_sitemap_entries(base_url):
	entries = []

	for page in PRIMARY_SITEMAP_PAGES + LEARNING_SITEMAP_PAGES:
		entries.append({
			'loc': f"{base_url}{page['path']}",
			'changefreq': page['changefreq'],
			'priority': page['priority'],
		})

	for group in CONCEPT_GROUPS:
		for concept in group['concepts']:
			entries.append({
				'loc': f"{base_url}/concepts/{concept['slug']}.html",
				'changefreq': 'monthly',
				'priority': '0.78',
			})

	return entries


def index(request):
	return render(request, 'index.html')


def robots_txt(request):
	base_url = request.build_absolute_uri('/').rstrip('/')
	return render(
		request,
		'robots.txt',
		{'base_url': base_url},
		content_type='text/plain',
	)


def sitemap_xml(request):
	base_url = request.build_absolute_uri('/').rstrip('/')
	context = {
		'sitemap_entries': build_sitemap_entries(base_url),
		'lastmod': date.today().isoformat(),
	}
	return render(request, 'sitemap.xml', context, content_type='application/xml')


def concepts_hub(request):
	context = {
		'concept_groups': CONCEPT_GROUPS,
	}
	return render(request, 'concepts/hub.html', context)


def stats_methods_page(request):
	method_groups = build_stats_method_groups()
	total_methods = sum(len(group['methods']) for group in method_groups)
	context = {
		'method_groups': method_groups,
		'method_group_count': len(method_groups),
		'total_methods': total_methods,
	}
	return render(request, 'stats-methods.html', context)


@xframe_options_sameorigin
def concept_page(request, page):
	if page in {'basic-probability-examples', 'basic-probability-examples.html'}:
		return redirect('basic_probability_examples_page')
	if not page.endswith('.html'):
		tpl_name = f'concepts/{page}.html'
	else:
		tpl_name = f'concepts/{page}'
	try:
		return render(request, tpl_name)
	except TemplateDoesNotExist:
		raise Http404(f'Concept page not found: {page}')


def learning_page(request, page):
	if not page.endswith('.html'):
		tpl_name = f'learning/{page}.html'
	else:
		tpl_name = f'learning/{page}'
	try:
		return render(request, tpl_name)
	except TemplateDoesNotExist:
		raise Http404(f'Learning page not found: {page}')


def visualization_page(request, page):
	if not page.endswith('.html'):
		tpl_name = f'visualization/{page}.html'
	else:
		tpl_name = f'visualization/{page}'
	try:
		return render(request, tpl_name)
	except TemplateDoesNotExist:
		raise Http404(f'Visualization page not found: {page}')


def calculator_page(request):
	try:
		return render(request, 'calculator/calc.html')
	except TemplateDoesNotExist:
		raise Http404('Calculator page not found')


def basic_probability_examples_page(request):
	return render(request, 'concepts/basic-probability-examples.html')


def about_page(request):
	return render(request, 'aboutus.html')


@require_http_methods(["POST"])
def calculate_statistics(request):
	try:
		data = json.loads(request.body)
	except Exception:
		return JsonResponse({'error': 'Invalid JSON'}, status=400)
	# Backwards-compatible: support client using {numbers: [...], operation: 'all'}
	numbers = data.get('numbers')
	operation = data.get('operation')

	# Old-style payloads use 'samples' + 'method'
	samples = data.get('samples', None)
	method = data.get('method', None)
	true_prob = data.get('true_prob', 30) / 100 if data.get('true_prob') is not None else 0.3

	try:
		# Client-side calculator posts {numbers: [...], operation: 'all'}
		if numbers is not None:
			if operation == 'all':
				# Compute descriptive statistics server-side to match client computeClientSide()
				result = calculate_descriptive_stats(numbers)
				return JsonResponse({'success': True, 'result': result})
			else:
				# Unsupported operation from this client
				return JsonResponse({'error': 'Unknown operation'}, status=400)

		# Legacy/alternate API: samples + method
		if samples is None:
			return JsonResponse({'error': 'No samples provided'}, status=400)

		if method is None:
			# default to LLN if method not provided
			method = 'lln'

		if method == 'lln':
			result = calculate_lln(samples, true_prob)
		elif method == 'mle':
			result = calculate_mle(samples, true_prob)
		elif method == 'ci':
			result = calculate_confidence_interval(samples)
		elif method == 'hypothesis':
			result = calculate_hypothesis_test(samples, true_prob)
		elif method == 'regression':
			result = calculate_regression(samples)
		elif method == 'distribution':
			result = calculate_distribution(samples)
		else:
			return JsonResponse({'error': 'Unknown method'}, status=400)
		return JsonResponse(result)
	except Exception as e:
		return JsonResponse({'error': str(e)}, status=500)


def calculate_descriptive_stats(numbers):
	# Ensure numeric list
	nums = [float(x) for x in numbers]
	n = len(nums)
	if n == 0:
		return {}
	sorted_nums = sorted(nums)
	total = sum(nums)
	mean = total / n

	# median
	mid = (n - 1) / 2.0
	def interp(p):
		idx = (p/100.0) * (n - 1)
		lo = int(math.floor(idx))
		hi = int(math.ceil(idx))
		if lo == hi:
			return sorted_nums[lo]
		frac = idx - lo
		return sorted_nums[lo] * (1 - frac) + sorted_nums[hi] * frac

	median = interp(50)
	q1 = interp(25)
	q3 = interp(75)
	iqr = q3 - q1

	# sample variance (n-1) to match client
	variance = 0.0
	if n > 1:
		variance = sum((x - mean) ** 2 for x in nums) / (n - 1)
	std_dev = math.sqrt(variance) if variance >= 0 else 0
	cv = (std_dev / mean * 100) if mean != 0 else 0

	return {
		'count': n,
		'mean': round(mean, 4),
		'median': round(median, 4),
		'min': sorted_nums[0],
		'max': sorted_nums[-1],
		'range': round(sorted_nums[-1] - sorted_nums[0], 4),
		'sum': round(total, 4),
		'variance': round(variance, 4),
		'std_dev': round(std_dev, 4),
		'q1': round(q1, 4),
		'q3': round(q3, 4),
		'iqr': round(iqr, 4),
		'cv': round(cv, 2)
	}


def calculate_lln(samples, true_prob):
	n = len(samples)
	successes = sum(samples)
	observed = successes / n if n > 0 else 0
	convergence_history = []
	cum_success = 0
	for i, sample in enumerate(samples):
		cum_success += sample
		convergence_history.append((cum_success / (i + 1)) * 100)
	return {
		'method': 'Law of Large Numbers',
		'n_samples': n,
		'successes': successes,
		'failures': n - successes,
		'observed_prob': observed * 100,
		'true_prob': true_prob * 100,
		'difference': abs(observed - true_prob) * 100,
		'convergence_history': convergence_history,
		'is_converged': abs(observed - true_prob) < 0.05,
	}


def calculate_mle(samples, true_prob):
	n = len(samples)
	successes = sum(samples)
	mle_estimate = successes / n if n > 0 else 0
	log_likelihood = 0
	if 0 < mle_estimate < 1:
		log_likelihood = successes * math.log(mle_estimate) + (n - successes) * math.log(1 - mle_estimate)
	return {
		'method': 'Maximum Likelihood Estimation',
		'n_samples': n,
		'successes': successes,
		'mle_estimate': mle_estimate * 100,
		'true_param': true_prob * 100,
		'log_likelihood': log_likelihood,
	}


def calculate_confidence_interval(samples, confidence=0.95):
	n = len(samples)
	successes = sum(samples)
	p = successes / n if n > 0 else 0
	z = scipy_stats.norm.ppf((1 + confidence) / 2) if scipy_stats else 1.96
	se = math.sqrt((p * (1 - p)) / n) if n > 0 else 0
	me = z * se
	lower = max(0, (p - me) * 100)
	upper = min(100, (p + me) * 100)
	return {
		'method': 'Confidence Interval',
		'confidence_level': confidence * 100,
		'n_samples': n,
		'point_estimate': p * 100,
		'lower_bound': lower,
		'upper_bound': upper,
		'margin_of_error': me * 100,
	}


def calculate_hypothesis_test(samples, true_prob):
	n = len(samples)
	successes = sum(samples)
	observed = successes / n if n > 0 else 0
	se = math.sqrt((true_prob * (1 - true_prob)) / n) if n > 0 else 1
	z_stat = (observed - true_prob) / se
	p_value = 2 * (1 - (scipy_stats.norm.cdf(abs(z_stat)) if scipy_stats else 0.5))
	alpha = 0.05
	is_significant = p_value < alpha
	return {
		'method': 'Hypothesis Testing',
		'n_samples': n,
		'observed_prob': observed * 100,
		'true_prob': true_prob * 100,
		'z_statistic': z_stat,
		'p_value': p_value,
		'alpha': alpha,
		'is_significant': is_significant,
	}


def calculate_regression(samples):
	n = len(samples)
	if n < 2:
		return {'error': 'Need at least 2 samples'}
	y = []
	cum_success = 0
	for i, sample in enumerate(samples):
		cum_success += sample
		y.append((cum_success / (i + 1)) * 100)
	x = list(range(1, n + 1))
	x_mean = sum(x) / n
	y_mean = sum(y) / n
	numerator = sum((x[i] - x_mean) * (y[i] - y_mean) for i in range(n))
	denominator = sum((x[i] - x_mean) ** 2 for i in range(n))
	slope = numerator / denominator if denominator != 0 else 0
	intercept = y_mean - slope * x_mean
	ss_res = sum((y[i] - (intercept + slope * x[i])) ** 2 for i in range(n))
	ss_tot = sum((y[i] - y_mean) ** 2 for i in range(n))
	r_squared = 1 - (ss_res / ss_tot) if ss_tot != 0 else 0
	return {
		'method': 'Linear Regression',
		'n_samples': n,
		'slope': slope,
		'intercept': intercept,
		'r_squared': r_squared,
	}


def calculate_distribution(samples):
	n = len(samples)
	successes = sum(samples)
	failures = n - successes
	p = successes / n if n > 0 else 0
	mean = n * p
	variance = n * p * (1 - p)
	std_dev = math.sqrt(variance) if variance > 0 else 0
	skewness = (1 - 2 * p) / std_dev if std_dev > 0 else 0
	kurtosis = (1 - 6 * p * (1 - p)) / (n * p * (1 - p)) if (n * p * (1 - p)) > 0 else 0
	return {
		'method': 'Binomial Distribution Analysis',
		'n_trials': n,
		'successes': successes,
		'failures': failures,
		'probability': p,
		'mean': mean,
		'variance': variance,
		'std_dev': std_dev,
		'skewness': skewness,
		'kurtosis': kurtosis,
		'success_rate': p * 100,
		'failure_rate': (1 - p) * 100,
	}


@require_http_methods(["POST"])
def export_data(request):
	try:
		data = json.loads(request.body)
		samples = data.get('samples', [])
		return JsonResponse({
			'data': samples,
			'summary': {
				'total_samples': len(samples),
				'successes': sum(samples),
				'failures': len(samples) - sum(samples),
				'success_rate': (sum(samples) / len(samples) * 100) if samples else 0
			}
		})
	except Exception as e:
		return JsonResponse({'error': str(e)}, status=500)
