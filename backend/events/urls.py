from django.urls import path
from .views import register_user
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import create_event, list_events, update_event, delete_event
from .views import my_dashboard
urlpatterns = [
    path('register/', register_user),
    path('login/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
]

urlpatterns += [
    path('events/', list_events),
    path('events/create/', create_event),
    path('events/update/<int:event_id>/', update_event),
    path('events/delete/<int:event_id>/', delete_event),
]

from .views import rsvp_event

urlpatterns += [
    path('events/<int:event_id>/rsvp/', rsvp_event),
]

from .views import cancel_rsvp

urlpatterns += [
    path('events/<int:event_id>/cancel/', cancel_rsvp),
    path('dashboard/', my_dashboard),
]


