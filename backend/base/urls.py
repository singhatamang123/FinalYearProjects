from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)

urlpatterns = [

    #url link for register
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('', views.getRoutes, name ='routes'),
    path('users/register', views.registerUser, name='register'),
    path('users/profile', views.getUserProfile, name ='users-profile'),
    path('users/', views.getUsers, name ='users'),

    # url link for product
    path('products/', views.getProducts, name ='products'),
    path('products/<str:pk>/', views.getProduct, name ='product')

]
