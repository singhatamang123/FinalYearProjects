from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name='products'),

    path('<str:pk>/reviews', views.createProductReview, name='reviews'),
    path('top/', views.getTopProducts, name='top_products'),
    path('<str:pk>/', views.getProduct, name='product'),


]
