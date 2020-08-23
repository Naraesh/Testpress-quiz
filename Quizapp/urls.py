from django.urls import path,include
from . import views
from rest_framework import routers
from .views import QuestionViewset, ExamViewset, ExamQuestionViewset


router = routers.DefaultRouter()
router.register('question',QuestionViewset)
router.register('exam',ExamViewset)
router.register('examquestion',ExamQuestionViewset)

urlpatterns = [
    path('api/',include(router.urls)),
    path('',views.index,name='home'),
    path('register/',views.register,name='register'),
    path('candidate/',views.canreg,name='canreg'),
    path('exam/',views.exam_page,name='exampage'),
     path('login/',views.log,name='login'),
    path('logout/',views.signout,name='logout')
    
]
