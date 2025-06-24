from rest_framework import serializers
from .models import Flock, Batch, DailyEntry

class FlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flock
        fields = '__all__'

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = '__all__'

class DailyEntrySerializer(serializers.ModelSerializer):
    # batch_number=serializers.StringRelatedField()
    batch_number = serializers.PrimaryKeyRelatedField(queryset=Flock.objects.all())

    
    class Meta:
        model = DailyEntry
        fields = '__all__'
