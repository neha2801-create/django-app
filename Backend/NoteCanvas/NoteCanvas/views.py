from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from canvas.models import Canvas
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import localtime

@csrf_exempt
@login_required
def dashboard(request):
    print(request.user)
    # if not request.user.is_authenticated:
    #     return JsonResponse({"error": "User not authenticated"}, status=403)

    userName = request.user.username
    canvases = Canvas.objects.filter(user=request.user).order_by('created_at').values('id', 'title', 'created_at')
    print(canvases)
    formatted_canvases = [
        {
            'id': index+1,
            'title': canvas['title'],
            'timestamp': localtime(canvas['created_at']).strftime('%Y-%m-%d %H:%M:%S')  # Adjust date format as needed
        }

        for index, canvas in enumerate(canvases)

    ]

    # Return the formatted canvas list along with a status code
    return JsonResponse({"canvases": formatted_canvases, "userName": userName}, status=200)  # You can use the appropriate HTTP status code

@csrf_exempt
@login_required
def userDetails(request):
    # print("in userdetails")
    userName = request.user.username
    userEmail = request.user.email
    full_name = request.user.full_name
    status = request.user.status
    return JsonResponse({"userName": userName, "email": userEmail, 'full_name':full_name, 'status': status}, status=200)

