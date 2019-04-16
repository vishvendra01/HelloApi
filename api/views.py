from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import (
    AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
)
from . import serializers
from . import models
from core import renderers


class PlayerViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PlayerSerializer
    queryset = models.Player.objects.all()


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TeamSerializer
    queryset = models.Team.objects.all()


class TodoGroupViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TodoGroupSerializer
    queryset = models.TodoGroup.objects.all()
    renderer_classes = (renderers.CoreJSONRenderer,)


class TodoViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (renderers.CoreJSONRenderer,)
    serializer_class = serializers.TodoSerializer
    queryset = models.Todo.objects.all()

    def get_queryset(self):
        queryset = models.Todo.objects.all()
        qroup_value = self.request.query_params.get('group', None)
        if qroup_value is not None:
            queryset = queryset.filter(group=qroup_value)
        return queryset
