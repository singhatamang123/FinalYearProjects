from django.urls import path
from base.views import users_views as views


urlpatterns = [

    # url link for register
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('', views.getRoutes, name ='routes'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name='users-profile'),
    path('profile/update/', views.UserUpdateProfile, name='users-profile-update'),

    path('', views.getUsers, name='users'),

]
