from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('index.html', views.index, name='index_html'),
    path('concepts/', views.concepts_hub, name='concepts_hub'),
    path('concepts/<path:page>', views.concept_page, name='concept_page'),
    path('learning/<path:page>', views.learning_page, name='learning_page'),
    path('visualization/<path:page>', views.visualization_page, name='visualization_page'),
    path('calculator/', views.calculator_page, name='calculator_page'),
    path('about/', views.about_page, name='about_page'),
]
