from rest_framework import serializers
from .models import StudentProfile
from .models import Notification
from .models import Project, Team, ProjectApplication, TeamMember , Interview

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("project_owner", "created_at")
    def perform_create(self, serializer):
        serializer.save(project_owner=self.request.user)
class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = "__all__"

class TeamSerializer(serializers.ModelSerializer):
    members = TeamMemberSerializer(many=True, required=False)

    class Meta:
        model = Team
        fields = "__all__"

    def create(self, validated_data):
        members_data = validated_data.pop('members', [])
        team = Team.objects.create(**validated_data)
        for member_data in members_data:
            TeamMember.objects.create(team=team, **member_data)
        return team
    
class ProjectApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectApplication
        fields = "__all__"



class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = "__all__"

def get_notification_serializer():

    class NotificationSerializer(serializers.ModelSerializer):
        class Meta:
            model = Notification
            fields = "__all__"

    return NotificationSerializer

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile  # Ensure this model exists
        fields = '__all__'