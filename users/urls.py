from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("login/", views.loginPage, name="login"),
    path("logout/", views.logoutUser, name="logout"),
    path("check/", views.check, name="check"),
    path("update_password/", views.update_password, name="update_password"),
    path("delete/", views.delete, name="delete"),
    path("forget_password/", views.forget_password, name="forget_password"),
    path("active/", views.active_users, name="active_users"),
    path("toggleStatus/", views.toggleStatus, name='toggleStatus')
]