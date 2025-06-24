from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Flock, Batch, DailyEntry
from .serializers import FlockSerializer, BatchSerializer, DailyEntrySerializer
from datetime import datetime


class FlockViewSet(viewsets.ModelViewSet):
    queryset = Flock.objects.all()
    serializer_class = FlockSerializer

class BatchViewSet(viewsets.ModelViewSet):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer

class DailyEntryViewSet(viewsets.ModelViewSet):
    queryset = DailyEntry.objects.all()
    serializer_class = DailyEntrySerializer

@api_view(['GET'])
def get_reports_by_date(request):
    date_str = request.GET.get('date')
    # print(date_str)
    if date_str:
        try:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
            # print("Parsed date object:", date_obj)  # 👈 ADD THIS TOO
            reports = DailyEntry.objects.filter(date=date_obj)
            # print("Matching reports:", reports)  # 👈 SHOW MATCHING
            serializer = DailyEntrySerializer(reports, many=True)
            return Response(serializer.data)
        except Exception as e:
            # print("Parsing error:", e)
            return Response({"error": "Invalid date format"}, status=400)
    return Response({"error": "Date is required"}, status=400)