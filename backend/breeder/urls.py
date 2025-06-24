from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FlockViewSet, BatchViewSet, DailyEntryViewSet, get_reports_by_date

router = DefaultRouter()
router.register(r'flocks', FlockViewSet)
router.register(r'batches', BatchViewSet)
router.register(r'daily-entries', DailyEntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('reports-by-date/', get_reports_by_date),
]
