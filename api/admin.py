from django.contrib import admin
from .models import Player, Team, Todo, TodoGroup


admin.site.register(Player)
admin.site.register(Team)
admin.site.register(Todo)
admin.site.register(TodoGroup)


