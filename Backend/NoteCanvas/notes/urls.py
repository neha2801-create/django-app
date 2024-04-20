from django.urls import path
from . import views

urlpatterns = [
    path('create/<int:canvas_order>/', views.create_note, name='create_note'),
    path('delete/<int:note_id>/', views.delete_note, name='delete_note'),
    path('update/<int:note_order>/', views.update_note, name='update_note'),
    path('pin/<int:note_id>/', views.pin_note, name='pin_note'),
]
