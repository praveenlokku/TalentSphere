from rest_framework import generics, permissions, status, serializers
from rest_framework.response import Response
from django.http import Http404
from .serializers import InterviewSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Project, Team, ProjectApplication, TeamMember, Interview
from .serializers import ProjectSerializer, TeamSerializer, ProjectApplicationSerializer

# Endpoint for project owners to list and create projects.
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically assign the logged-in user as the project owner
        serializer.save(project_owner=self.request.user)

# Endpoint for creating and listing teams.
class TeamListCreateView(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        request = self.request
        members = []
        for i in range(int(request.data.get("team_size", 0))):
            members.append({
                "name": request.data.get(f"member_{i}_name"),
                "skills": request.data.get(f"member_{i}_skills"),
                "role": request.data.get(f"member_{i}_role"),
                "college": request.data.get(f"member_{i}_college"),
                "resume": request.FILES.get(f"member_{i}_resume"),
            })

        team = serializer.save()
        for member_data in members:
            TeamMember.objects.create(team=team, **member_data)
# Endpoint for student teams to apply for a project.
class ApplyForProjectView(generics.CreateAPIView):
    serializer_class = ProjectApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Ensure the user is part of the team applying
        try:
            team = Team.objects.get(id=self.request.data["team"])
        except Team.DoesNotExist:
            raise serializers.ValidationError("Team does not exist.")

        if self.request.user not in team.members.all():
            raise serializers.ValidationError("You are not part of this team.")

        serializer.save()

# Endpoint for scheduling an interview (with AI integration placeholder).
class ScheduleInterviewView(generics.CreateAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

class StudentInterviewsView(generics.ListAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Interview.objects.filter(student=self.request.user)

class ProjectApplicationsView(generics.ListAPIView):
    serializer_class = InterviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Interview.objects.filter(project__project_owner=self.request.user)


class TeamDetailsView(generics.RetrieveAPIView):
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            # Use the 'user' field of TeamMember to match the current user.
            return Team.objects.get(members__user=self.request.user)
        except Team.DoesNotExist:
            raise Http404("No team found for this user")

class PostedProjectsByOwnerView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(project_owner=self.request.user)