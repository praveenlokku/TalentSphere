from rest_framework import generics, permissions, status, serializers
from rest_framework.response import Response
from django.http import Http404
from django.urls import reverse
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from .serializers import InterviewSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Project, Team, ProjectApplication, TeamMembers, Interview  # Remove Application if not present
from django.contrib.auth.models import User
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
            TeamMembers.objects.create(team=team, **member_data)

            
# Endpoint for student teams to apply for a project.
class ApplyProjectView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        project_id = request.data.get("project_id")
        team_id = request.data.get("team_id")

        if not project_id or not team_id:
            return Response({"error": "Project ID and Team ID are required"}, status=400)
        
        try:
            project = Project.objects.get(id=project_id)
            team = Team.objects.get(id=team_id)
            application, created = ProjectApplication.objects.get_or_create(
                project=project, team=team
            )

            if not created:
                return Response({"message": "Already applied!"}, status=400)
            
            interview_url = "/schedule-interview/:{projectId}"  # Django URL name
            return Response({"redirect_url": interview_url}, status=200)

        except Project.DoesNotExist:
            return Response({"error": "Invalid project"}, status=400)
        except Team.DoesNotExist:
            return Response({"error": "Invalid team ID"}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
            
        

# Endpoint for scheduling an interview (with AI integration placeholder).
# class ScheduleInterviewView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request):
#         project_id = request.data.get("project_id")
#         date = request.data.get("date")
#         time = request.data.get("time")

#         try:
#             project = Project.objects.get(id=project_id)
#             team = Team.objects.get(members__id=request.user.id)

#             interview, created = Interview.objects.get_or_create(
#                 project=project, team=team, defaults={"date": date, "time": time}
#             )

#             if not created:
#                 return Response({"message": "Interview already scheduled!"}, status=400)

#             return Response({"message": "Interview scheduled successfully!"})
#         except (Project.DoesNotExist, Team.DoesNotExist):
#             return Response({"error": "Invalid project or team"}, status=400)


class ScheduleInterviewView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        project_id = request.data.get("project_id")
        date = request.data.get("date")
        time = request.data.get("time")
        
        try:
            project = Project.objects.get(id=project_id)
            team = Team.objects.get(members__id=request.user.id)  # Get user’s team
            Interview.objects.create(project=project, team=team, date=date, time=time)
            return Response({"message": "Interview scheduled successfully!"})
        except Project.DoesNotExist:
            return Response({"error": "Invalid project"}, status=400)
        except Team.DoesNotExist:
            return Response({"error": "Team not found"}, status=400)



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
            team_member = TeamMembers.objects.get(user=self.request.user)  # Ensure TeamMember instance
            return team_member.team  # Access the related team
        except ObjectDoesNotExist:
            raise NotFound("User is not part of any team")

class PostedProjectsByOwnerView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(project_owner=self.request.user)
    
class MyTeamView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            team = Team.objects.get(members__id=request.user.id)
            serializer = TeamSerializer(team)
            data = TeamSerializer(team).data
            data["id"] = team.id
            return Response(serializer.data)
        except Team.DoesNotExist:
            return Response({"error": "No team found"}, status=404)

class UpdateTeamView(generics.UpdateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]