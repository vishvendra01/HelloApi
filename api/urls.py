from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('players', views.PlayerViewSet)
router.register('teams', views.TeamViewSet)
router.register('todo_groups', views.TodoGroupViewSet)
router.register('todos', views.TodoViewSet)