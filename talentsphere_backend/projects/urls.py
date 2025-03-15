from django.urls import path
from . import views
from .views import PostedProjectsByOwnerView

urlpatterns = [
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list-create'),
    path('teams/', views.TeamListCreateView.as_view(), name='team-list-create'),
    path('apply/', views.ApplyForProjectView.as_view(), name='apply-project'),
    path('schedule-interview/', views.ScheduleInterviewView.as_view(), name='schedule-interview'),
    path('student-interviews/', views.StudentInterviewsView.as_view(), name='student-interviews'),
    path('project-applications/', views.ProjectApplicationsView.as_view(), name='project-applications'),
    path("projects/post-by-owner/", PostedProjectsByOwnerView.as_view(), name="posted-projects"),
    path('team-details/', views.TeamDetailsView.as_view(), name='team-details'),
]
