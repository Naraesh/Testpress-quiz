from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login,logout,authenticate
from django.http import JsonResponse
from rest_framework import viewsets
from Quizapp.models import Question, Exam
from .serializers import QuestionSerialzer, ExamSerializer


def index(request):
    return render(request,'index.html')

@login_required(login_url='/')
def exam_page(request):
    return render(request,'exam.html')

def register(request):
    return render(request,'register.html')

def canreg(request):
    if request.method=='POST':
        uname = request.POST.get('uname')
        mail = request.POST.get('email')
        password1 = request.POST.get('pwd1')
        password2 = request.POST.get('pwd2')
        if password1==password2:
            if User.objects.filter(username=uname).exists():
                return redirect('register')
            elif User.objects.filter(email=mail):
                return redirect('register')
            else:
                usr=User.objects.create_user(username=uname,email=mail,password=password1)
                user = authenticate(username=uname,password=password1)
                login(request,user)
                return redirect('exampage')
        else:
            return redirect('register')

def log(request):
    if request.method=='POST':
        uname = request.POST.get('uname')
        pwd = request.POST.get('pwd')
        user = authenticate(username=uname,password=pwd)
        if user is not None:
            if user.is_active:
                login(request,user)
                return redirect('exampage')
        else:   
            return redirect('/')
    
def signout(request):
    logout(request)
    return redirect('/')

class QuestionViewset(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerialzer


class ExamViewset(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class ExamQuestionViewset(viewsets.ModelViewSet):
    serializer_class = QuestionSerialzer
    queryset=Question.objects.all()
    def get_queryset(self):
        queryset=Question.objects.all()
        val= self.request.query_params.get('id',None)
        if val is not None:
            queryset = queryset.filter(exam_id=val)
        return queryset

        
        
            
        