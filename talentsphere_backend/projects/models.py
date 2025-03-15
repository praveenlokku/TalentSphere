from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class Project(models.Model):
    project_owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="owned_projects"
    )
    project_name = models.CharField(max_length=255)
    description = models.TextField()
    deadline = models.DateTimeField()
    skills_required = models.JSONField()  # Expecting a list/array
    team_strength = models.IntegerField(null=True, blank=True)
    credits = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Optional: auto timestamp

    def __str__(self):
        return self.project_name

class Team(models.Model):
    team_name = models.CharField(max_length=255, unique=True)
    team_size = models.PositiveIntegerField(help_text="Number of members in the team")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.team_name


class TeamMember(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="members")
    name = models.CharField(max_length=255)
    skills = models.TextField(help_text="Comma-separated list of skills")
    role = models.CharField(max_length=100)  # e.g., "Student"
    college = models.CharField(max_length=255)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.role}) - {self.team.team_name}"
    
class ProjectApplication(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="applications")
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="applications")
    interview_scheduled = models.BooleanField(default=False)
    interview_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.team.team_name} applied for {self.project.project_name}"
    

class Interview(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
