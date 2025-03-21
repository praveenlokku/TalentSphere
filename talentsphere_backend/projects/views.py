from rest_framework import generics, permissions, status, serializers
from rest_framework.response import Response
from django.http import Http404
from django.urls import reverse
from django.views import View
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from .serializers import InterviewSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Project, Team, ProjectApplication, TeamMember, Interview # Remove Application if not present
from django.contrib.auth.models import User
from .serializers import get_notification_serializer
from .serializers import ProjectSerializer, TeamSerializer, ProjectApplicationSerializer, get_notification_serializer
from .serializers import InterviewSerializer, get_notification_serializer, StudentProfileSerializer


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
class ApplyProjectView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        project_id = request.data.get("project_id")
        team_id = request.data.get("team_id")

        try:
            project = Project.objects.get(id=project_id)
            team = Team.objects.get(id=team_id)
            application, created = ProjectApplication.objects.get_or_create(
                project=project, team=team
            )

            if not created:
                return Response({"message": "Your team has already applied. Thank you, do your best!"}, status=status.HTTP_400_BAD_REQUEST)
            
            interview_url = "/schedule-interview/:{projectId}"  # Django URL name
            return Response({"redirect_url": interview_url}, status=200)

        except (Project.DoesNotExist, Team.DoesNotExist):
            return Response({"error": "Invalid project or team"}, status=400)
            
            

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


class StudentDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user
        NotificationSerializer = get_notification_serializer()
        interviews = Interview.objects.filter(student=student, status="Scheduled")
        notifications = Notification.objects.filter(student=student, read=False)
        profile = StudentProfile.objects.get(user=student)

        return Response({
            "interviews": InterviewSerializer(interviews, many=True).data,
            "notifications": NotificationSerializer(notifications, many=True).data,
            "credits": profile.credits
        })



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
            team_member = TeamMember.objects.get(user=self.request.user)  # Ensure TeamMember instance
            return team_member.team  # Access the related team
        except ObjectDoesNotExist:
            raise NotFound("User is not part of any team")

class PostedProjectsByOwnerView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(project_owner=self.request.user)
    
class MyTeamView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            team = Team.objects.get(members__id=request.user.id)
            serializer = TeamSerializer(team)
            return Response(serializer.data)
        except Team.DoesNotExist:
            return Response({"error": "No team found"}, status=404)

class UpdateTeamView(generics.UpdateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

class StudentDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user
        interviews = Interview.objects.filter(student=student, status="Scheduled")
        notifications = Notification.objects.filter(student=student, read=False)
        profile = StudentProfile.objects.get(user=student)

        return Response({
            "interviews": InterviewSerializer(interviews, many=True).data,
            "notifications": NotificationSerializer(notifications, many=True).data,
            "credits": profile.credits
        })


# class ProjectOwnerDashboardView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         owner = request.user
#         projects = Project.objects.filter(owner=owner)
#         project_data = []

#         for project in projects:
#             applications = ProjectApplication.objects.filter(project=project)
#             project_data.append({
#                 "project": ProjectSerializer(project).data,
#                 "applications": ProjectApplicationSerializer(applications, many=True).data
#             })

#         return Response(project_data)

class ScheduleInterviewView(View):
    def get(self, request):
        return JsonResponse({"message": "Schedule Interview View"})