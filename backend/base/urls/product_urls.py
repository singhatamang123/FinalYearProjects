from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name='products'),
    path('category/', views.getCategory, name='category'),
    path('create/', views.createProduct, name='product-create'),
    path('upload/', views.uploadImage, name='image-upload'),
    path('<str:pk>/reviews', views.createProductReview, name='reviews'),
    path('top/', views.getTopProducts, name='top_products'),
    path('recommended/', views.getRecommendations, name="recommended"),
    path('<str:pk>/', views.getProduct, name='product'),
    path('update/<str:pk>/', views.updateProduct, name='update_product'),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),

]
