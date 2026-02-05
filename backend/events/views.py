from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Event
from .serializers import EventSerializer


@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "User created successfully",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(creator=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def list_events(request):
    events = Event.objects.all()

    # Search by title
    title = request.GET.get('title')
    if title:
        events = events.filter(title__icontains=title)

    # Filter by location
    location = request.GET.get('location')
    if location:
        events = events.filter(location__icontains=location)

    # Filter by date
    date = request.GET.get('date')
    if date:
        events = events.filter(date_time__date=date)

    serializer = EventSerializer(events, many=True, context={'request': request})
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_event(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=404)

    if event.creator != request.user:
        return Response({"error": "Not allowed"}, status=403)

    serializer = EventSerializer(event, data=request.data)
    if serializer.is_valid():
        serializer.save(creator=request.user)
    return Response(serializer.data, status=201)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=404)

    if event.creator != request.user:
        return Response({"error": "Not allowed"}, status=403)

    event.delete()
    return Response({"message": "Event deleted"})

from django.db import transaction
from .models import RSVP


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rsvp_event(request, event_id):
    user = request.user

    try:
        with transaction.atomic():
            event = Event.objects.select_for_update().get(id=event_id)

            # Check duplicate
            if RSVP.objects.filter(user=user, event=event).exists():
                return Response({"error": "Already RSVPed"}, status=400)

            # Check capacity
            if event.rsvps.count() >= event.capacity:
                return Response({"error": "Event is full"}, status=400)

            RSVP.objects.create(user=user, event=event)

            return Response({"message": "RSVP successful"}, status=200)

    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=404)
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cancel_rsvp(request, event_id):
    user = request.user

    try:
        rsvp = RSVP.objects.get(user=user, event_id=event_id)
        rsvp.delete()
        return Response({"message": "RSVP cancelled successfully"}, status=200)
    except RSVP.DoesNotExist:
        return Response({"error": "You have not RSVPed to this event"}, status=400)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Event, RSVP
from .serializers import EventSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_dashboard(request):
    user = request.user

    # Events created by user
    created_events = Event.objects.filter(creator=user)

    # Events joined by user
    joined_events = Event.objects.filter(rsvps__user=user)

    return Response({
        "created_events": EventSerializer(created_events, many=True).data,
        "joined_events": EventSerializer(joined_events, many=True).data
    })
