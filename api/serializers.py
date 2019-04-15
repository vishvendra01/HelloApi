from rest_framework import serializers
from . import models


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Player
        fields = ('name', 'team_name')


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = ('name', 'country')


class TodoGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TodoGroup
        fields = ('id', 'title')


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Todo
        fields = ('id', 'title', 'group', 'done', 'created')