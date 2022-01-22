from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('',views.getResponse,name='response'),
    path('user/profile',views.getUsers,name='user'),
    path('products/',views.getProducts,name='products'),
    path('products/<str:pk>',views.getProduct,name='product'),
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]