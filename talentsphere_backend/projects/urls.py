from django.urls import path
from . import views
from .views import PostedProjectsByOwnerView, MyTeamView, UpdateTeamView, TeamListCreateView, TeamDetailsView, LogoutView



urlpatterns = [
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list-create'),
    path("apply/", views.ApplyProjectView.as_view(), name="apply-project"),
    path("projects/apply/", views.ApplyProjectView.as_view(), name="apply-project"),
    path("schedule/", views.ScheduleInterviewView.as_view(), name="schedule-interview"),
    path("schedulenow/", views.ScheduleInterviewNow.as_view(), name="schedule-interview"),
    path('project-applications/', views.ProjectApplicationsView.as_view(), name='project-applications'),
    path("projects/post-by-owner/", PostedProjectsByOwnerView.as_view(), name="posted-projects"),
    path("my-team/", views.MyTeamView.as_view(), name="my-team"),
    path("<int:pk>/", views.UpdateTeamView.as_view(), name="update-team"),
    path("teams/", views.TeamListCreateView.as_view(), name="team-list-create"),
    path("user-team-details/", views.TeamDetailsView.as_view(), name="user-team-details"),
    path("logout/", LogoutView.as_view(), name="logout"),

]
