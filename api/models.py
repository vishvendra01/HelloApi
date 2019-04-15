from django.db import models


# Create your models here.
class Team(models.Model):
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=200)


class Player(models.Model):
    name = models.CharField(max_length=200)
    team_name = models.CharField(max_length=200)


class TodoGroup(models.Model):
    title = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Todo(models.Model):
    title = models.TextField()
    group = models.ForeignKey(TodoGroup, on_delete=models.DO_NOTHING)
    done = models.BooleanField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

