from django.urls import path
from .views import UserListCreateView
from .views import UserProfileView, LoginView, SignupView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list'),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('user-profile/', UserProfileView.as_view(), name='user-profile'),
]