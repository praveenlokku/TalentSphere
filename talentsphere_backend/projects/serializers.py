from rest_framework import serializers
from .models import Project, Team, ProjectApplication, TeamMembers , Interview

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("project_owner", "created_at")
    def perform_create(self, serializer):
        serializer.save(project_owner=self.request.user)
class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMembers
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
            TeamMembers.objects.create(team=team, **member_data)
        return team
    
class ProjectApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectApplication
        fields = "__all__"



class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = "__all__"