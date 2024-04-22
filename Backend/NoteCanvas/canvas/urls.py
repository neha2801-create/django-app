from django.urls import path
from . import views


urlpatterns = [
    path('get/<int:canvas_order>/', views.get, name='get'),
    path('create/', views.create_canvas, name='create_canvas'),
    path('delete/<int:canvas_order>/', views.delete, name='delete_canvas'),
    path('update/<int:canvas_order>/', views.update, name='update_canvas')
]