from django.urls import path
from . import views
from .views import PostedProjectsByOwnerView, MyTeamView, UpdateTeamView

urlpatterns = [
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list-create'),
    path('teams/', views.TeamListCreateView.as_view(), name='team-list-create'),
    path("apply/", views.ApplyProjectView.as_view(), name="apply-project"),
    path("projects/apply/", views.ApplyProjectView.as_view(), name="apply-project"),
    path("schedule/", views.ScheduleInterviewView.as_view(), name="schedule-interview"),
    path("projects/schedule/", views.ScheduleInterviewView.as_view(), name="schedule-interview"),
    path('project-applications/', views.ProjectApplicationsView.as_view(), name='project-applications'),
    path("projects/post-by-owner/", PostedProjectsByOwnerView.as_view(), name="posted-projects"),
    path("my-team/", MyTeamView.as_view(), name="my-team"),
    path("teams/my-team/", MyTeamView.as_view(), name="my-team"),
    path("<int:pk>/", UpdateTeamView.as_view(), name="update-team"),
    path("user-team-details/", views.TeamDetailsView.as_view(), name="user-team-details"),
]
