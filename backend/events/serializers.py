from rest_framework import serializers
from .models import Event

from rest_framework import serializers
from .models import Event, RSVP


class EventSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source="creator.username")
    attendees_count = serializers.SerializerMethodField()
    remaining_seats = serializers.SerializerMethodField()
    is_creator = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            "id",
            "creator",
            "title",
            "description",
            "date_time",
            "location",
            "capacity",
            "image",
            "created_at",
            "attendees_count",
            "remaining_seats",
            "is_creator",
        ]

    def get_attendees_count(self, obj):
        return obj.rsvps.count()

    def get_remaining_seats(self, obj):
        return obj.capacity - obj.rsvps.count()

    def get_is_creator(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.creator == request.user
        return False


class RSVPSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSVP
        fields = ["id", "user", "event", "created_at"]

